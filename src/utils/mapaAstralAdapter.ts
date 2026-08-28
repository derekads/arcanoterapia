// src/utils/mapaAstralAdapter.ts

/**
 * Adaptador entre o motor de cálculo (`calcularMapaAstral`) e a camada visual
 * do Mapa Astral. Concentra aqui o enriquecimento com interpretações, a
 * estatística de elementos/modalidades e a montagem das cúspides, para que os
 * componentes de UI recebam um modelo pronto e sem perda de informação.
 */

import type { MapaAstralCalculado, PosicaoCelestial, UserBirthData } from '../types';
import { interpretationsDB, getGenericInterpretation } from '../data/astrologyInterpretations';
import { formatarOffset } from './timezone';
import {
    ELEMENT_LABELS,
    MODALITY_LABELS,
    PLANET_SYMBOLS_PT,
    formatDegreeInSign,
    getSignMeta,
    normalizeDegree,
    normalizeElemento,
    type ElementoChave,
    type ModalidadeChave
} from './astroRenderUtils';

export interface ChartInterpretation {
    titulo: string;
    potencialLuz: string;
    desafioSombra: string;
    acaoPratica: string;
}

export type CategoriaAstro = 'planeta' | 'ponto' | 'eixo';

export interface ChartBody {
    nome: string;
    /** planeta = corpo físico · ponto = ponto calculado (nós, Lilith) · eixo = AC/MC. */
    categoria: CategoriaAstro;
    symbol: string;
    longitude: number;
    signo: string;
    signoSymbol: string;
    grau: number;
    minuto: number;
    grauTexto: string;
    elemento: ElementoChave;
    elementoLabel: string;
    modalidade: ModalidadeChave;
    casa: number;
    retrogrado: boolean;
    /** Eixos (AC/MC) são pontos calculados, não corpos celestes. */
    isAngulo: boolean;
    resumo: string;
    interpretacao: ChartInterpretation;
}

export interface ChartAspect {
    astroA: string;
    astroB: string;
    tipo: string;
    graus: number;
    orb: number;
    /** 0–1: quanto mais próximo de 1, mais exato o aspecto. */
    forca: number;
}

export interface ChartCusp {
    casa: number;
    longitude: number;
    signo: string;
    signoSymbol: string;
    grauTexto: string;
    /** Amplitude da casa em graus — evidencia casas interceptadas/esticadas. */
    amplitude: number;
    /** Rótulo do eixo, quando a cúspide é angular. */
    eixo?: 'AC' | 'IC' | 'DC' | 'MC';
}

export interface DistributionSlice<K extends string> {
    chave: K;
    label: string;
    total: number;
    percentual: number;
}

export interface MapaViewModel {
    nome: string;
    /** Corpos celestes propriamente ditos (Sol → Plutão e pontos lunares). */
    astros: ChartBody[];
    /** Eixos AC e MC. */
    angulos: ChartBody[];
    /** Astros + ângulos, na ordem de exibição da lista. */
    todos: ChartBody[];
    cuspides: ChartCusp[];
    aspectos: ChartAspect[];
    ascendenteGraus: number;
    sol: ChartBody;
    lua: ChartBody;
    ascendente: ChartBody;
    mc: ChartBody;
    elementos: DistributionSlice<ElementoChave>[];
    modalidades: DistributionSlice<ModalidadeChave>[];
    /** Metadados exibidos no cabeçalho — nada de valores fixos na UI. */
    meta: {
        cidade: string;
        dataNascimento: string;
        horaNascimento: string;
        fusoHorario: string;
        /** true quando o offset veio de um perfil antigo, sem horário de verão. */
        fusoAproximado: boolean;
        sistemaCasas: string;
        coordenadas: string;
    };
}

const PLANET_PT_TO_EN: Record<string, string> = {
    'Sol': 'sun',
    'Lua': 'moon',
    'Mercúrio': 'mercury',
    'Vênus': 'venus',
    'Marte': 'mars',
    'Júpiter': 'jupiter',
    'Saturno': 'saturn',
    'Urano': 'uranus',
    'Netuno': 'neptune',
    'Plutão': 'pluto',
    'Nó Norte': 'northnode',
    'Lilith': 'lilith',
    'Ascendente': 'ascendant',
    'MC': 'midheaven'
};

const SIGN_PT_TO_EN: Record<string, string> = {
    'Áries': 'aries',
    'Touro': 'taurus',
    'Gêmeos': 'gemini',
    'Câncer': 'cancer',
    'Leão': 'leo',
    'Virgem': 'virgo',
    'Libra': 'libra',
    'Escorpião': 'scorpio',
    'Sagitário': 'sagittarius',
    'Capricórnio': 'capricorn',
    'Aquário': 'aquarius',
    'Peixes': 'pisces'
};

/** Ordem tradicional de leitura de um mapa natal. */
const ORDEM_ASTROS = [
    'Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte',
    'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão',
    'Nó Norte', 'Lilith', 'Quíron'
];

/** Pontos calculados que não são corpos físicos. */
const PONTOS_CALCULADOS = ['Nó Norte', 'Lilith'];

const EIXOS_POR_CASA: Record<number, ChartCusp['eixo']> = {
    1: 'AC',
    4: 'IC',
    7: 'DC',
    10: 'MC'
};

/** Orbes máximos por aspecto, espelhando o motor de cálculo. */
const ORB_MAXIMO: Record<string, number> = {
    'Conjunção': 8,
    'Oposição': 8,
    'Trígono': 8,
    'Quadratura': 8,
    'Sextil': 6
};

function buildInterpretation(nome: string, signo: string): ChartInterpretation {
    const pKey = PLANET_PT_TO_EN[nome] || nome.toLowerCase();
    const sKey = SIGN_PT_TO_EN[signo] || signo.toLowerCase();
    const entry = interpretationsDB[`${pKey}_${sKey}`] || getGenericInterpretation(nome, signo);

    return {
        titulo: entry.hook || `A energia de ${nome} em ${signo}`,
        potencialLuz: entry.yourPower || entry.youAre || 'Potencial evolutivo a ser consciente.',
        desafioSombra: entry.yourTrap || entry.hook || 'Sombra a integrar.',
        acaoPratica: entry.tryThis || `Observe como ${nome} em ${signo} age no seu dia.`
    };
}

function toChartBody(p: PosicaoCelestial): ChartBody {
    const signMeta = getSignMeta(p.signo);
    const elemento = normalizeElemento(p.elemento);
    const isAngulo = p.nome === 'Ascendente' || p.nome === 'MC';
    const categoria: CategoriaAstro = isAngulo
        ? 'eixo'
        : PONTOS_CALCULADOS.includes(p.nome)
            ? 'ponto'
            : 'planeta';

    return {
        nome: p.nome,
        categoria,
        symbol: PLANET_SYMBOLS_PT[p.nome] || '✦',
        longitude: normalizeDegree(p.longitude),
        signo: p.signo,
        signoSymbol: signMeta.symbol,
        grau: p.grau,
        minuto: p.minuto,
        grauTexto: `${String(p.grau).padStart(2, '0')}°${String(p.minuto).padStart(2, '0')}'`,
        elemento,
        elementoLabel: ELEMENT_LABELS[elemento],
        modalidade: signMeta.modalidade,
        casa: p.casa,
        retrogrado: Boolean(p.retrogrado),
        isAngulo,
        resumo: p.interpretacao,
        interpretacao: buildInterpretation(p.nome, p.signo)
    };
}

function buildCuspides(casas: number[]): ChartCusp[] {
    return casas.map((longitude, i) => {
        const casa = i + 1;
        const proxima = casas[(i + 1) % 12];
        const fmt = formatDegreeInSign(longitude);
        return {
            casa,
            longitude: normalizeDegree(longitude),
            signo: fmt.signo.name,
            signoSymbol: fmt.signo.symbol,
            grauTexto: fmt.texto,
            amplitude: Number(normalizeDegree(proxima - longitude).toFixed(1)),
            eixo: EIXOS_POR_CASA[casa]
        };
    });
}

function buildDistribution<K extends string>(
    bodies: ChartBody[],
    pick: (b: ChartBody) => K,
    labels: Record<K, string>,
    ordem: K[]
): DistributionSlice<K>[] {
    const contagem = ordem.reduce((acc, k) => ({ ...acc, [k]: 0 }), {} as Record<K, number>);
    bodies.forEach(b => {
        contagem[pick(b)] += 1;
    });
    const total = bodies.length || 1;

    return ordem.map(chave => ({
        chave,
        label: labels[chave],
        total: contagem[chave],
        percentual: Math.round((contagem[chave] / total) * 100)
    }));
}

function formatarData(iso: string | undefined): string {
    if (!iso) return '—';
    const [ano, mes, dia] = iso.split('-');
    if (!ano || !mes || !dia) return iso;
    return `${dia}/${mes}/${ano}`;
}

function formatarCoordenada(valor: number | undefined, positivo: string, negativo: string): string {
    if (typeof valor !== 'number' || Number.isNaN(valor)) return '—';
    const abs = Math.abs(valor);
    const grau = Math.floor(abs);
    const minuto = Math.round((abs - grau) * 60);
    return `${grau}°${String(minuto).padStart(2, '0')}'${valor >= 0 ? positivo : negativo}`;
}

/**
 * Constrói o modelo de visualização completo do Mapa Astral.
 * Nenhum dado calculado é descartado: MC, retrogradação, cúspides reais e
 * longitudes absolutas seguem para a camada visual.
 */
export function buildMapaViewModel(
    mapa: MapaAstralCalculado,
    userData: UserBirthData | null | undefined,
    sistemaCasas = 'Porphyry (quadrantes trisseccionados)'
): MapaViewModel {
    const astros = [...mapa.astros]
        .sort((a, b) => {
            const ia = ORDEM_ASTROS.indexOf(a.nome);
            const ib = ORDEM_ASTROS.indexOf(b.nome);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        })
        .map(toChartBody);

    const ascendente = toChartBody(mapa.ascendente);
    const mc = toChartBody(mapa.mc);
    const angulos = [ascendente, mc];

    const aspectos: ChartAspect[] = mapa.aspectos.map(a => {
        const orbMax = ORB_MAXIMO[a.tipo] ?? 8;
        return {
            astroA: a.astroA,
            astroB: a.astroB,
            tipo: a.tipo,
            graus: a.graus,
            orb: a.orb,
            forca: Math.max(0, Math.min(1, 1 - a.orb / orbMax))
        };
    });

    const sol = astros.find(a => a.nome === 'Sol') || toChartBody(mapa.sol);
    const lua = astros.find(a => a.nome === 'Lua') || toChartBody(mapa.lua);

    // A distribuição considera os dez planetas e os dois eixos, como é praxe.
    // Nós lunares e Lilith são pontos calculados e ficam de fora da contagem.
    const baseDistribuicao = [...astros.filter(a => a.categoria === 'planeta'), ...angulos];

    return {
        nome: userData?.nome || 'Iniciado',
        astros,
        angulos,
        todos: [...astros, ...angulos],
        cuspides: buildCuspides(mapa.casas),
        aspectos,
        ascendenteGraus: normalizeDegree(mapa.ascendente.longitude),
        sol,
        lua,
        ascendente,
        mc,
        elementos: buildDistribution(
            baseDistribuicao,
            b => b.elemento,
            ELEMENT_LABELS,
            ['fogo', 'terra', 'ar', 'agua']
        ),
        modalidades: buildDistribution(
            baseDistribuicao,
            b => b.modalidade,
            MODALITY_LABELS,
            ['cardinal', 'fixo', 'mutavel']
        ),
        meta: {
            cidade: userData?.localizacao?.nomeCidade || 'Local não informado',
            dataNascimento: formatarData(userData?.dataNascimento),
            horaNascimento: userData?.horaNascimento || '—',
            fusoHorario: formatarOffset(mapa.fuso.offsetHoras),
            fusoAproximado: mapa.fuso.origem !== 'iana',
            sistemaCasas,
            coordenadas: [
                formatarCoordenada(userData?.localizacao?.latitude, 'N', 'S'),
                formatarCoordenada(userData?.localizacao?.longitude, 'L', 'O')
            ].join(' · ')
        }
    };
}
