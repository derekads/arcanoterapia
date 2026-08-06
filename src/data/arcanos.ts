import arcanosData from './arcanos.json';

import { ArcanoAdvanced as ArcanoCompleto, SombraPro } from '../types';

// ArcanoCompleto renamed via import to ArcanoAdvanced

const arcanos = (arcanosData as unknown as { arcanos: ArcanoCompleto[] }).arcanos;

export const ArcanoPessoalDB = {
    getByNumero: (num: number): ArcanoCompleto | undefined => {
        const lookup = num;
        const raw = arcanos.find(a => a.numero === lookup);
        if (!raw) return undefined;

        // Adapt the JSON data for component compatibility
        const ROMANOS = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII'];

        return {
            ...raw,
            numeroRomano: ROMANOS[raw.numero] || String(raw.numero),
            planeta: raw.planeta_regente || (raw as any).planeta || "Urano",
            palavrasChave: (raw.subtitulo || "").split(' • '),
            mantra: (raw as any).afirmacoes?.manha || "",
            carreira: (raw as any).rodadaVida?.carreira?.media || "Expansão profissional e novos horizontes.",
            relacionamentos: (raw as any).rodadaVida?.amor?.media || "Harmonia e conexões profundas.",
            saude: {
                vulnerabilidade: (raw as any).previsao2026?.alerta_saude || "Equilíbrio energético e vitalidade.",
                sintomas: ["Cansaço", "Tensão"],
                prevencao: ["Meditação", "Pausa ativa"]
            },
            conteudo: {
                essencia: raw.essencia,
                luz: raw.diretrizes || [],
                sombra: raw.sombras.map((s: any) => s.nome),
                conselho: raw.conselho_diario || []
            },
            // Legacy mapping for components that expect 'shadowWork' or 'insights'
            shadowWork: raw.sombras.map((s: any, i: number) => ({
                id: `shadow-${i}`,
                sombra: s.nome,
                cura: s.antidoto,
                reconhecido: false,
                modalidade_terapia: s.modalidade_terapia
            })),
            insights: {
                luz: raw.diretrizes || [],
                sombra: raw.sombras.map((s: any) => s.nome),
                conselho: raw.conselho_diario || [],
                essencia: [raw.essencia]
            },
            // Ensure cycles and other dynamic properties exist
            ciclos: raw.previsao2026 || {
                faseJovem: "",
                faseAdulta: "",
                faseSabedoria: "",
                desafioAtual: ""
            },
            personaAI: {
                tomDeVoz: "Sábio e Ancestral",
                fraseBoasVindas: `Eu sou ${raw.nome}. O que deseja desvendar hoje?`
            },
            // Alquimia mapping if needed
            alquimia: {
                cristal: raw.cristais?.[0] || "",
                cristalImg: `https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=400`,
                erva: raw.ervas?.[0] || "",
                mantra: (raw as any).afirmacoes?.manha || "",
                frequenciaHz: parseInt(raw.frequencia) || 432
            }
        } as unknown as ArcanoCompleto;
    },
    getByDataNascimento: (dia: number, mes: number) => {
        // Lógica do Arcano Pessoal (soma dia + mês)
        // Nota: O usuário sugeriu dia+mes, mas geralmente é dia+mes+ano. 
        // Vou seguir a sugestão do usuário para dia+mes.
        const soma = dia + mes;
        const numero = soma > 22 ? (soma % 22 || 22) : soma;
        return ArcanoPessoalDB.getByNumero(numero);
    },
    getPrevisao2026: (numero: number) => {
        const arcano = ArcanoPessoalDB.getByNumero(numero);
        if (!arcano) return null;

        return {
            id: arcano.numero,
            nome: arcano.nome,
            ano: 2026,
            tema: arcano.previsao2026.anoPessoal,
            fraseGuia: arcano.previsao2026.ciclos,
            conselho: arcano.previsao2026.conselho,
            amor: arcano.relacionamentos || "Ano de conexões sinceras e profundas.",
            carreira: arcano.carreira || "Momento de expansão e foco nos seus talentos.",
            saude: arcano.previsao2026.alerta_saude || arcano.saude?.vulnerabilidade || "Atenção ao equilíbrio vital.",
            resumo: arcano.previsao2026.conselho,
            trimestres: {
                Q1: "Inícios e Ativação",
                Q2: "Expansão e Movimento",
                Q3: "Pausa e Planejamento",
                Q4: "Realização e Colheita"
            }
        };
    }
};

/**
 * Lookup arcano by number.
 */
export function getArcanoByNumero(numero: number): ArcanoCompleto | undefined {
    return ArcanoPessoalDB.getByNumero(numero);
}

/**
 * Returns all arcanos.
 */
export function getAllArcanos(): ArcanoCompleto[] {
    return arcanos;
}
