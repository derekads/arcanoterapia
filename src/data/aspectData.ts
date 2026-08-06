// src/data/aspectData.ts

export interface AspectData {
    planet1: string;
    planet2: string;
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
    interpretation: string;
}

export const aspectsDB: Record<string, string> = {
    "sun_opposition_moon": "Tensão arquetípica entre a vontade do ego (Pai/Herói) e a necessidade enraizada de segurança emocional (Mãe/Criança Interior). Exige o constante balanceamento entre metas na vida pública versus a vida de repouso.",
    "venus_conjunction_mars": "O princípio feminino do Eros atrativo puramente costurado à Força guerreira criacional. O amor exige ação direta, sem rodeios; alta carga libidinosa magnética unindo beleza com assertividade.",
    "venus_opposition_jupiter": "Sede expansiva de prazer. Tensão entre o valor material/afetivo tangível contra a filosofia teórica excessivamente alta caindo no consumismo relacional e de expectativas idealizadas no parceiro, gerando exacerbações de gula (ou orgulho na esfera sentimental no plano ético). Excesso de doçura que deve ser polido na contenção sábia do sagrado.",
    "sun_square_saturn": "Conflito duríssimo na juventude, forjando a alma a marteladas de dúvida e peso nas costas nas costas contra complexo de Inferioridade à figura paterna e medos limitantes, para enfim coroar-se Senhor inconteste do seu Destino apenas através dos ombros testados pacientemente pela dor constante e tempo transmutando o Carvão no Ouro."
};

// Exemplo genérico fallback caso aspecto não seja encontrado pelo hash
export function getGenericAspectInterpretation(type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition', p1: string, p2: string) {
    const t = type === 'conjunction' ? "Forte união simbiótica onde os traços se confundem. Eles agem atados num núcleo só de pura concentração arquetípica psíquica."
        : type === 'trine' ? "Sinergia harmônica nativa incrivelmente fluida na individuação que requer zero esforço (Dharma puro, bênção inata e talento fácil)."
            : type === 'sextile' ? "Ponte cooperativa amigável entre funções racionais das eras, pedindo pequeno estímulo de aprendizado amigável de colaboração e conexão mútua."
                : type === 'square' ? "Tensão interna cármica dinâmica geradora de atrito altíssimo e exacerbações neuróticas em certas áreas, que uma vez superadas via pressão da quebra cristalina geram os maiores eixos motivacionais diamantes e construtores de civilizações inteiras."
                    : "Polarização extremista dolorosa projetada. Uma balança constante de corda bamba psíquica de oscilação; requer a integração do seu outro pólo sombrio espelhado nos relacionamentos cruéis até descobrir o fiel do Meio do balanço equânime.";
    return `${t} (Combinação de arquétipos focalizada de ${p1.toUpperCase()} com a energia vibracional formadora do arquétipo de ${p2.toUpperCase()}).`;
}
