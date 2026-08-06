// src/utils/astroRenderUtils.ts

/**
 * Astro SVG Native Engine
 * Pure math for calculating SVG (x, y) coordinates on a 360 circle.
 */

export interface Point2D {
    x: number;
    y: number;
}

// O ASCENDENTE fica em 270° (Esquerda/9h). O Zodíaco gira no sentido anti-horário.
export const ASCENDANT_CHART_DEGREE = 270;

/**
 * Converte um grau astrológico puro (0 a 360) da eclíptica real 
 * para o ângulo visual do SVG, considerando o Ascendente como o ponto de partida (Esquerda = 270°).
 * 
 * Exemplo visual: 
 * Se o AC está em 11° de Leão (131° da Eclíptica), e o AC precisa ficar às 9h visualmente (270° SVG).
 * Rotação Chart = 270 - 131 = 139°.
 * Entao se Vênus está em 72° (Gêmeos):
 * Ângulo visual = (72 + 139) % 360 = 211°
 */
export function eclipticToVisualDegree(eclipticDegree: number, ascendantEclipticDegree: number): number {
    const chartRotation = ASCENDANT_CHART_DEGREE - ascendantEclipticDegree;
    let visualDegree = (eclipticDegree + chartRotation) % 360;
    if (visualDegree < 0) visualDegree += 360;
    return visualDegree;
}

/**
 * Retorna as coordenadas SVG exatas dado:
 * Centro C(cx,cy), Raio R, e Ângulo V (graus)
 * Atenção: O SVG cresce Y para BAIXO, mas na trigonometria Y cresce para cima.
 * Então y = cy + r * Math.sin(rad)
 */
export function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): Point2D {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

/**
 * Cria o SVG `d` path force para um ARC SVG (utilizado para desenhar as texturas dos signos na borda).
 */
export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    // Calcula se o arco passa de 180 graus (para a flag large-arc no SVG)
    let diff = endAngle - startAngle;
    if (diff < 0) diff += 360;
    const largeArcFlag = diff <= 180 ? "0" : "1";

    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

/**
 * Calcula o centro num arco para text path (Ex: ícones dos signos)
 */
export function getMidAngle(startAngle: number, endAngle: number): number {
    if (endAngle < startAngle) {
        // cruza o eixo 0 (ex: 350 a 10)
        let mid = (startAngle + endAngle + 360) / 2;
        return mid % 360;
    }
    return (startAngle + endAngle) / 2;
}

export const DIGNITY_COLORS = {
    domicile: { fill: '#FFD700', glow: '0 0 10px #FFD700', opacity: 1, strokeDash: 'none' },
    exaltation: { fill: '#FF9F43', glow: '0 0 8px #FF9F43', opacity: 1, strokeDash: 'none' },
    neutral: { fill: '#74B9FF', glow: 'none', opacity: 0.9, strokeDash: 'none' },
    detriment: { fill: '#A29BFE', glow: 'none', opacity: 0.7, strokeDash: '4,2' },
    fall: { fill: '#FD79A8', glow: 'none', opacity: 0.6, strokeDash: '2,2' }
};

export const ZODIAC_SIGNS = [
    { sign: 'aries', symbol: '♈', name: 'Áries' },
    { sign: 'taurus', symbol: '♉', name: 'Touro' },
    { sign: 'gemini', symbol: '♊', name: 'Gêmeos' },
    { sign: 'cancer', symbol: '♋', name: 'Câncer' },
    { sign: 'leo', symbol: '♌', name: 'Leão' },
    { sign: 'virgo', symbol: '♍', name: 'Virgem' },
    { sign: 'libra', symbol: '♎', name: 'Libra' },
    { sign: 'scorpio', symbol: '♏', name: 'Escorpião' },
    { sign: 'sagittarius', symbol: '♐', name: 'Sagitário' },
    { sign: 'capricorn', symbol: '♑', name: 'Capricórnio' },
    { sign: 'aquarius', symbol: '♒', name: 'Aquário' },
    { sign: 'pisces', symbol: '♓', name: 'Peixes' }
];

// Map dos símbolos Unicode clássicos para uso SVG sem fontes customizadas pesadas
export const PLANET_UNICODE: Record<string, string> = {
    sun: '☉',
    moon: '☽',
    mercury: '☿',
    venus: '♀',
    mars: '♂',
    jupiter: '♃',
    saturn: '♄',
    uranus: '♅',
    neptune: '♆',
    pluto: '♇',
    ascendant: 'AC',
    midheaven: 'MC',
    descendant: 'DC',
    ic: 'IC'
};
