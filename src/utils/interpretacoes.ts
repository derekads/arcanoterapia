import * as Astronomy from 'astronomy-engine';

/**
 * UTILS/INTERPRETACOES.TS
 * O Oráculo Dinâmico: Lógica de Textos e Afirmações
 */

const MOON_PHASES: Record<number, string> = {
    0: "Lua Nova (Inícios e Semeadura)",
    1: "Quarto Crescente (Ação e Crescimento)",
    2: "Lua Cheia (Clareza e Transbordamento)",
    3: "Quarto Minguante (Liberação e Reflexão)"
};

/**
 * Gera uma afirmação dinâmica combinando múltiplos fatores
 */
export const gerarAfirmacaoInteligente = (
    arcanoPessoal: string,
    arcanoDia: string,
    data: Date = new Date()
) => {
    // 1. Calcular Fase da Lua
    const dateObj = data;
    const illumination = Astronomy.Illumination("Moon" as Astronomy.Body, dateObj);
    const phase = Astronomy.MoonPhase(dateObj); // 0-360

    let moonDesc = "";
    if (phase < 90) moonDesc = MOON_PHASES[0];
    else if (phase < 180) moonDesc = MOON_PHASES[1];
    else if (phase < 270) moonDesc = MOON_PHASES[2];
    else moonDesc = MOON_PHASES[3];

    // 2. Templates de Afirmação
    const templates = [
        `Hoje, o vigor do ${arcanoDia} encontra seu propósito em ${arcanoPessoal}. Sob a influência da ${moonDesc}, declare: 'Eu sou the canal da minha própria maestria.'`,
        `A energia do dia (${arcanoDia}) ilumina seu caminho como ${arcanoPessoal}. A ${moonDesc} favorece sua entrega ao processo sagrado.`,
        `Com a força de ${arcanoPessoal} e a oportunidade de ${arcanoDia}, você navega pela ${moonDesc} com sabedoria e proteção.`
    ];

    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
};

/**
 * Traduz Aspectos para linguagem terapêutica
 */
export const interpretarAspectoTerminal = (tipo: string, astroA: string, astroB: string) => {
    const descricoes: Record<string, string> = {
        "Conjunção": `Foco intenso e união de propósitos entre ${astroA} e ${astroB}.`,
        "Oposição": `Desafio de equilíbrio e espelhamento entre ${astroA} e ${astroB}.`,
        "Trígono": `Fluxo harmonioso e talentos naturais unindo ${astroA} e ${astroB}.`,
        "Quadratura": `Tensão produtiva que exige ação e mudança entre ${astroA} e ${astroB}.`,
        "Sextil": `Oportunidade de colaboração e aprendizado entre ${astroA} e ${astroB}.`
    };

    return descricoes[tipo] || "Aspecto em movimento cósmico.";
};
