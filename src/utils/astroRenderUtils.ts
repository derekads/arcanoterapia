// src/utils/astroRenderUtils.ts

/**
 * Seletor de variação U+FE0E: força o navegador a desenhar os glifos
 * astrológicos como TEXTO, e não como emoji colorido (♈ ♋ ♀ ♂ etc.).
 */
const TEXTO = '\uFE0E';

/**
 * Astro SVG Native Engine
 * Matemática pura para converter longitudes eclípticas (0–360°) em
 * coordenadas (x, y) de um SVG circular.
 *
 * CONVENÇÃO DO SVG
 * ----------------
 * O eixo Y do SVG cresce para BAIXO. Portanto, em `polarToCartesian`:
 *   ângulo   0° → direita (3h)
 *   ângulo  90° → baixo   (6h)
 *   ângulo 180° → esquerda (9h)
 *   ângulo 270° → topo    (12h)
 * ou seja, ângulos crescentes giram no sentido HORÁRIO na tela.
 *
 * CONVENÇÃO ASTROLÓGICA
 * ---------------------
 * O Ascendente fica à ESQUERDA (9h) e o zodíaco corre no sentido
 * ANTI-HORÁRIO: a partir do AC descemos para a Casa 1, 2, 3 até o
 * Fundo do Céu (baixo), seguimos até o Descendente (direita) e subimos
 * até o Meio do Céu (topo).
 *
 * Como ângulos crescentes do SVG são horários, a projeção precisa
 * INVERTER o sentido — daí o sinal negativo em `eclipticToVisualDegree`.
 */

export interface Point2D {
    x: number;
    y: number;
}

/** Posição visual do Ascendente: 180° = esquerda (9h). */
export const ASCENDANT_CHART_DEGREE = 180;

export function normalizeDegree(deg: number): number {
    const d = deg % 360;
    return d < 0 ? d + 360 : d;
}

/**
 * Converte um grau da eclíptica (0–360) para o ângulo visual do SVG,
 * ancorando o Ascendente à esquerda e mantendo o zodíaco anti-horário.
 *
 * Exemplo: AC em 11° de Leão (131° eclípticos)
 *   131° → 180° (esquerda, 9h)
 *   221° (AC + 90) →  90° (baixo, 6h)
 *   311° (AC + 180) →  0° (direita, 3h)
 *    41° (AC + 270) → 270° (topo, 12h)
 */
export function eclipticToVisualDegree(eclipticDegree: number, ascendantEclipticDegree: number): number {
    return normalizeDegree(ASCENDANT_CHART_DEGREE - (eclipticDegree - ascendantEclipticDegree));
}

/**
 * Retorna as coordenadas SVG dado centro C(cx,cy), raio R e ângulo V (graus).
 */
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): Point2D {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

/**
 * Path `d` de um arco SVG entre dois ângulos VISUAIS, percorrido no
 * sentido anti-horário da eclíptica (ou seja, horário decrescente no SVG).
 * `startAngle` e `endAngle` já devem estar em graus visuais.
 */
export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);

    // Varredura no sentido decrescente de ângulo visual (sweep-flag 0)
    let sweep = normalizeDegree(startAngle - endAngle);
    const largeArcFlag = sweep > 180 ? '1' : '0';

    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
}

/**
 * Path de um setor anelar (donut slice) entre dois raios e dois ângulos visuais.
 * Usado para pintar as fatias das casas e dos signos.
 */
export function describeAnnularSector(
    cx: number,
    cy: number,
    rInner: number,
    rOuter: number,
    startAngle: number,
    endAngle: number
): string {
    const sweep = normalizeDegree(startAngle - endAngle);
    const largeArcFlag = sweep > 180 ? '1' : '0';

    const oStart = polarToCartesian(cx, cy, rOuter, startAngle);
    const oEnd = polarToCartesian(cx, cy, rOuter, endAngle);
    const iEnd = polarToCartesian(cx, cy, rInner, endAngle);
    const iStart = polarToCartesian(cx, cy, rInner, startAngle);

    return [
        'M', oStart.x, oStart.y,
        'A', rOuter, rOuter, 0, largeArcFlag, 0, oEnd.x, oEnd.y,
        'L', iEnd.x, iEnd.y,
        'A', rInner, rInner, 0, largeArcFlag, 1, iStart.x, iStart.y,
        'Z'
    ].join(' ');
}

/**
 * Ponto médio entre dois graus ECLÍPTICOS, respeitando a passagem por 0°.
 * (Ex.: meio entre 350° e 20° é 5°, não 185°.)
 */
export function getMidEclipticAngle(startDegree: number, endDegree: number): number {
    const span = normalizeDegree(endDegree - startDegree);
    return normalizeDegree(startDegree + span / 2);
}

/**
 * Distância angular mínima entre dois graus (0–180).
 */
export function angularDistance(a: number, b: number): number {
    const diff = Math.abs(normalizeDegree(a) - normalizeDegree(b));
    return diff > 180 ? 360 - diff : diff;
}

export interface SpreadInput<T> {
    item: T;
    /** Grau eclíptico real do astro. */
    degree: number;
}

export interface SpreadResult<T> {
    item: T;
    /** Grau eclíptico real (usado para a marcação na régua). */
    degree: number;
    /** Grau eclíptico deslocado para desenhar o glifo sem sobreposição. */
    displayDegree: number;
    /** Índice dentro do agrupamento, para escalonar o raio se necessário. */
    clusterIndex: number;
    clusterSize: number;
}

/**
 * Afasta angularmente astros muito próximos para que os glifos não se
 * sobreponham, preservando a ordem zodiacal e o grau real de cada um.
 *
 * @param minSeparation separação mínima em graus entre dois glifos
 */
export function spreadOverlappingBodies<T>(
    bodies: SpreadInput<T>[],
    minSeparation = 9
): SpreadResult<T>[] {
    if (bodies.length === 0) return [];

    const sorted = [...bodies].sort((a, b) => normalizeDegree(a.degree) - normalizeDegree(b.degree));

    // 1. Agrupar astros cuja distância ao vizinho é menor que a separação mínima.
    const clusters: SpreadInput<T>[][] = [];
    let current: SpreadInput<T>[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        const curr = sorted[i];
        if (angularDistance(prev.degree, curr.degree) < minSeparation) {
            current.push(curr);
        } else {
            clusters.push(current);
            current = [curr];
        }
    }
    clusters.push(current);

    // 2. Reunir o primeiro e o último grupo se eles se tocarem através de 0°/360°.
    if (clusters.length > 1) {
        const first = clusters[0];
        const last = clusters[clusters.length - 1];
        if (angularDistance(last[last.length - 1].degree, first[0].degree) < minSeparation) {
            clusters[0] = [...last, ...first];
            clusters.pop();
        }
    }

    // 3. Distribuir cada grupo simetricamente em torno do seu centro.
    const results: SpreadResult<T>[] = [];
    clusters.forEach(cluster => {
        const size = cluster.length;
        if (size === 1) {
            results.push({
                item: cluster[0].item,
                degree: normalizeDegree(cluster[0].degree),
                displayDegree: normalizeDegree(cluster[0].degree),
                clusterIndex: 0,
                clusterSize: 1
            });
            return;
        }

        // Centro do grupo calculado a partir do primeiro elemento, para
        // evitar distorção quando o grupo cruza 0°.
        const base = cluster[0].degree;
        const offsets = cluster.map(b => normalizeDegree(b.degree - base));
        const center = base + offsets.reduce((acc, o) => acc + o, 0) / size;
        const start = center - (minSeparation * (size - 1)) / 2;

        cluster.forEach((b, i) => {
            results.push({
                item: b.item,
                degree: normalizeDegree(b.degree),
                displayDegree: normalizeDegree(start + i * minSeparation),
                clusterIndex: i,
                clusterSize: size
            });
        });
    });

    return results;
}

export const DIGNITY_COLORS = {
    domicile: { fill: '#FFD700', glow: '0 0 10px #FFD700', opacity: 1, strokeDash: 'none' },
    exaltation: { fill: '#FF9F43', glow: '0 0 8px #FF9F43', opacity: 1, strokeDash: 'none' },
    neutral: { fill: '#74B9FF', glow: 'none', opacity: 0.9, strokeDash: 'none' },
    detriment: { fill: '#A29BFE', glow: 'none', opacity: 0.7, strokeDash: '4,2' },
    fall: { fill: '#FD79A8', glow: 'none', opacity: 0.6, strokeDash: '2,2' }
};

export type ElementoChave = 'fogo' | 'terra' | 'ar' | 'agua';
export type ModalidadeChave = 'cardinal' | 'fixo' | 'mutavel';

export interface ZodiacSignMeta {
    sign: string;
    symbol: string;
    name: string;
    elemento: ElementoChave;
    modalidade: ModalidadeChave;
    regente: string;
}

export const ZODIAC_SIGNS: ZodiacSignMeta[] = [
    { sign: 'aries', symbol: '♈' + TEXTO, name: 'Áries', elemento: 'fogo', modalidade: 'cardinal', regente: 'Marte' },
    { sign: 'taurus', symbol: '♉' + TEXTO, name: 'Touro', elemento: 'terra', modalidade: 'fixo', regente: 'Vênus' },
    { sign: 'gemini', symbol: '♊' + TEXTO, name: 'Gêmeos', elemento: 'ar', modalidade: 'mutavel', regente: 'Mercúrio' },
    { sign: 'cancer', symbol: '♋' + TEXTO, name: 'Câncer', elemento: 'agua', modalidade: 'cardinal', regente: 'Lua' },
    { sign: 'leo', symbol: '♌' + TEXTO, name: 'Leão', elemento: 'fogo', modalidade: 'fixo', regente: 'Sol' },
    { sign: 'virgo', symbol: '♍' + TEXTO, name: 'Virgem', elemento: 'terra', modalidade: 'mutavel', regente: 'Mercúrio' },
    { sign: 'libra', symbol: '♎' + TEXTO, name: 'Libra', elemento: 'ar', modalidade: 'cardinal', regente: 'Vênus' },
    { sign: 'scorpio', symbol: '♏' + TEXTO, name: 'Escorpião', elemento: 'agua', modalidade: 'fixo', regente: 'Plutão' },
    { sign: 'sagittarius', symbol: '♐' + TEXTO, name: 'Sagitário', elemento: 'fogo', modalidade: 'mutavel', regente: 'Júpiter' },
    { sign: 'capricorn', symbol: '♑' + TEXTO, name: 'Capricórnio', elemento: 'terra', modalidade: 'cardinal', regente: 'Saturno' },
    { sign: 'aquarius', symbol: '♒' + TEXTO, name: 'Aquário', elemento: 'ar', modalidade: 'fixo', regente: 'Urano' },
    { sign: 'pisces', symbol: '♓' + TEXTO, name: 'Peixes', elemento: 'agua', modalidade: 'mutavel', regente: 'Netuno' }
];

export const ELEMENT_COLORS: Record<ElementoChave, string> = {
    fogo: '#f97316',
    terra: '#10b981',
    ar: '#38bdf8',
    agua: '#8b5cf6'
};

export const ELEMENT_LABELS: Record<ElementoChave, string> = {
    fogo: 'Fogo',
    terra: 'Terra',
    ar: 'Ar',
    agua: 'Água'
};

export const MODALITY_LABELS: Record<ModalidadeChave, string> = {
    cardinal: 'Cardinal',
    fixo: 'Fixo',
    mutavel: 'Mutável'
};

/** Normaliza rótulos de elemento vindos em PT ou EN para a chave interna. */
export function normalizeElemento(raw: string | undefined): ElementoChave {
    switch ((raw || '').toLowerCase()) {
        case 'fogo':
        case 'fire':
            return 'fogo';
        case 'ar':
        case 'air':
            return 'ar';
        case 'agua':
        case 'água':
        case 'water':
            return 'agua';
        default:
            return 'terra';
    }
}

/** Metadados do signo a partir do nome em português. */
export function getSignMeta(nome: string): ZodiacSignMeta {
    return ZODIAC_SIGNS.find(s => s.name === nome) || ZODIAC_SIGNS[0];
}

/** Índice 0–11 do signo a partir de uma longitude eclíptica. */
export function signIndexFromLongitude(longitude: number): number {
    return Math.floor(normalizeDegree(longitude) / 30) % 12;
}

// Map dos símbolos Unicode clássicos para uso SVG sem fontes customizadas pesadas
export const PLANET_UNICODE: Record<string, string> = {
    sun: '☉' + TEXTO,
    moon: '☽' + TEXTO,
    mercury: '☿' + TEXTO,
    venus: '♀' + TEXTO,
    mars: '♂' + TEXTO,
    jupiter: '♃' + TEXTO,
    saturn: '♄' + TEXTO,
    uranus: '♅' + TEXTO,
    neptune: '♆' + TEXTO,
    pluto: '♇' + TEXTO,
    northnode: '☊' + TEXTO,
    lilith: '⚸' + TEXTO,
    ascendant: 'AC',
    midheaven: 'MC',
    descendant: 'DC',
    ic: 'IC'
};

/** Glifos por nome em português — usado pelo SVG e pelas listas. */
export const PLANET_SYMBOLS_PT: Record<string, string> = {
    'Sol': '☉' + TEXTO,
    'Lua': '☽' + TEXTO,
    'Mercúrio': '☿' + TEXTO,
    'Vênus': '♀' + TEXTO,
    'Marte': '♂' + TEXTO,
    'Júpiter': '♃' + TEXTO,
    'Saturno': '♄' + TEXTO,
    'Urano': '♅' + TEXTO,
    'Netuno': '♆' + TEXTO,
    'Plutão': '♇' + TEXTO,
    'Nó Norte': '☊' + TEXTO,
    'Lilith': '⚸' + TEXTO,
    'Quíron': '⚷' + TEXTO,
    'Ascendente': 'AC',
    'MC': 'MC'
};

export interface AspectStyle {
    symbol: string;
    color: string;
    dash: string;
    label: string;
    natureza: 'harmônico' | 'tenso' | 'neutro';
}

/** Estilo visual por tipo de aspecto — chaves em português, como o motor de cálculo emite. */
export const ASPECT_STYLES: Record<string, AspectStyle> = {
    'Conjunção': { symbol: '☌' + TEXTO, color: '#f59e0b', dash: 'none', label: 'Conjunção', natureza: 'neutro' },
    'Oposição': { symbol: '☍' + TEXTO, color: '#ef4444', dash: 'none', label: 'Oposição', natureza: 'tenso' },
    'Trígono': { symbol: '△' + TEXTO, color: '#10b981', dash: 'none', label: 'Trígono', natureza: 'harmônico' },
    'Quadratura': { symbol: '□' + TEXTO, color: '#a78bfa', dash: '4 3', label: 'Quadratura', natureza: 'tenso' },
    'Sextil': { symbol: '⚹' + TEXTO, color: '#38bdf8', dash: '2 3', label: 'Sextil', natureza: 'harmônico' }
};

export const DEFAULT_ASPECT_STYLE: AspectStyle = {
    symbol: '•' + TEXTO,
    color: '#94a3b8',
    dash: '1 4',
    label: 'Aspecto',
    natureza: 'neutro'
};

export function getAspectStyle(tipo: string): AspectStyle {
    return ASPECT_STYLES[tipo] || DEFAULT_ASPECT_STYLE;
}

/** Formata uma longitude absoluta como "18°59' ♌ Leão". */
export function formatDegreeInSign(longitude: number): { grau: number; minuto: number; signo: ZodiacSignMeta; texto: string } {
    const lon = normalizeDegree(longitude);
    const idx = signIndexFromLongitude(lon);
    const resto = lon % 30;
    const grau = Math.floor(resto);
    const minuto = Math.round((resto - grau) * 60);
    const signo = ZODIAC_SIGNS[idx];
    return {
        grau,
        minuto,
        signo,
        texto: `${String(grau).padStart(2, '0')}°${String(minuto).padStart(2, '0')}' ${signo.name}`
    };
}
