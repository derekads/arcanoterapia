import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
    eclipticToVisualDegree,
    polarToCartesian,
    describeArc,
    DIGNITY_COLORS,
    ZODIAC_SIGNS,
    PLANET_UNICODE,
    ASCENDANT_CHART_DEGREE
} from '../../utils/astroRenderUtils';
import clsx from 'clsx';

export interface PlanetPosition {
    key: string;       // e.g., 'sun', 'moon', 'venus'
    sign: string;      // e.g., 'leo'
    degree: number;    // Ecliptic degree 0-360
    dignity: keyof typeof DIGNITY_COLORS;
}

interface Props {
    ascendantEclipticDegree: number; // 0-360
    planets: PlanetPosition[];
    selectedPlanet: PlanetPosition | null;
    onSelectPlanet: (planet: PlanetPosition) => void;
}

export const AstroWheel: React.FC<Props> = ({
    ascendantEclipticDegree,
    planets,
    selectedPlanet,
    onSelectPlanet
}) => {
    // SVG Constants (Escaláveis por CSS viewBox)
    const CX = 400;
    const CY = 400;
    const R_ZODIAC_OUTER = 380;
    const R_ZODIAC_INNER = 320;
    const R_HOUSES_INNER = 260;

    // As casas são divididas em Sistema Igual (Equal House)
    // Cada casa é um traçado geométrico puro a partir do AC dividindo 360/12 = 30°
    const houses = useMemo(() => Array.from({ length: 12 }, (_, i) => {
        // A casa 1 COMEÇA no AC (Visual = 270°). Mas em relação ao círculo visual
        // O zodíaco gira anti-horário. O start da casa 1 é 270°, end é 240° (porque é na direção real contrária no relógio, mas na trig é sentido trigonométrico)
        // Astrologicamente as casas vao de 1 a 12 de baixo para cima esquerda.
        // ASC está em 270°. Casa 1 vai de 270° a 300° no círculo polar padrão do HTML SVG (Anti-horario Y descendo).
        // O eixo Y svg inverte o anti-horário trigonométrico. 
        // Vamos fixar as posições baseadas em ângulos trigonométricos (onde seno e cosseno já tratam SVG inversion)
        // Para simplificar: na Roda Tardia (Astrology padrão), casa 1 é de ASC(9h) descendo para IC(6h)...
        return {
            index: i + 1,
            // No SVG angle, casa 1 = 270 pra cima (anti-horário no SVG inverte o ponteiro) -> 270 a 300 (Y inverteu) -> Na verdade, as casas progridem anti-horário (AC, Casa 2, Casa 3..IC).
            // AC = 270°. Casa 2 = ASC + 30°
            startCoord: (ASCENDANT_CHART_DEGREE + i * 30) % 360,
            endCoord: (ASCENDANT_CHART_DEGREE + (i + 1) * 30) % 360
        };
    }), [ascendantEclipticDegree]);

    return (
        <div className="w-full relative touch-none bg-[#030305] rounded-[2rem] overflow-hidden border border-white/5 mx-auto" style={{ maxWidth: '800px', aspectRatio: '1/1' }}>
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                wheel={{ step: 0.1 }}
            >
                <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                    <svg viewBox="0 0 800 800" className="w-full h-full text-slate-300 drop-shadow-2xl">
                        <defs>
                            <filter id="glow-sun"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                        </defs>

                        {/* Fundo do Wheel */}
                        <circle cx={CX} cy={CY} r={R_ZODIAC_OUTER} fill="rgba(10,10,20,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <circle cx={CX} cy={CY} r={R_ZODIAC_INNER} fill="rgba(15,15,30,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <circle cx={CX} cy={CY} r={R_HOUSES_INNER} fill="rgba(20,20,40,0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                        {/* CASAS (Divisões de 30 graus) */}
                        {houses.map((house) => {
                            const startAngle = house.startCoord;
                            const pointOuter = polarToCartesian(CX, CY, R_ZODIAC_INNER, startAngle);
                            const pointInner = polarToCartesian(CX, CY, R_HOUSES_INNER, startAngle);
                            const pointCenter = polarToCartesian(CX, CY, 30, startAngle);

                            // Número da casa
                            const midAngle = startAngle + 15;
                            const numPos = polarToCartesian(CX, CY, R_HOUSES_INNER + 20, midAngle);

                            // Cúspides angulares ganham destaque (AC/C1, IC/C4, DC/C7, MC/C10)
                            const isAngular = [1, 4, 7, 10].includes(house.index);

                            return (
                                <g key={`house-${house.index}`}>
                                    <line
                                        x1={pointOuter.x} y1={pointOuter.y}
                                        x2={pointCenter.x} y2={pointCenter.y}
                                        stroke="rgba(255,255,255,0.1)" strokeWidth={isAngular ? 2 : 1}
                                    />
                                    {isAngular && (
                                        <line
                                            x1={pointOuter.x} y1={pointOuter.y}
                                            x2={polarToCartesian(CX, CY, R_ZODIAC_OUTER + 10, startAngle).x}
                                            y2={polarToCartesian(CX, CY, R_ZODIAC_OUTER + 10, startAngle).y}
                                            stroke="rgba(255,255,255,0.5)" strokeWidth="2"
                                        />
                                    )}
                                    <text
                                        x={numPos.x} y={numPos.y}
                                        textAnchor="middle" alignmentBaseline="middle"
                                        fill="rgba(255,255,255,0.3)" fontSize="28" fontFamily="serif"
                                        transform={`rotate(${midAngle + 90}, ${numPos.x}, ${numPos.y})`}
                                    >
                                        {house.index}
                                    </text>
                                </g>
                            );
                        })}

                        {/* ZODÍACO SIGNOS (12 Signos começando de Àries offsettado pelo Ascendente) */}
                        {ZODIAC_SIGNS.map((sign, i) => {
                            // ecliptic degree original = i * 30 (0=aries, 30=taurus...)
                            const visualStart = eclipticToVisualDegree(i * 30, ascendantEclipticDegree);
                            // o simbolo do signo no meio da fatia do zodian
                            const midVisual = (visualStart + 15) % 360;
                            const symPos = polarToCartesian(CX, CY, (R_ZODIAC_OUTER + R_ZODIAC_INNER) / 2, midVisual);

                            // Divisorias de signo no anel de fora
                            const divOuter = polarToCartesian(CX, CY, R_ZODIAC_OUTER, visualStart);
                            const divInner = polarToCartesian(CX, CY, R_ZODIAC_INNER, visualStart);

                            return (
                                <g key={`sign-${sign.sign}`}>
                                    <line x1={divOuter.x} y1={divOuter.y} x2={divInner.x} y2={divInner.y} stroke="rgba(255,255,255,0.15)" />
                                    <text
                                        x={symPos.x} y={symPos.y}
                                        textAnchor="middle" alignmentBaseline="middle"
                                        fill="rgba(255,255,255,0.6)" fontSize="42"
                                        transform={`rotate(${midVisual + 90}, ${symPos.x}, ${symPos.y})`}
                                    >
                                        {sign.symbol}
                                    </text>
                                </g>
                            );
                        })}

                        {/* PLANETAS */}
                        {planets.map((planet) => {
                            const visualAngle = eclipticToVisualDegree(planet.degree, ascendantEclipticDegree);
                            const pPos = polarToCartesian(CX, CY, R_HOUSES_INNER - 40, visualAngle);
                            const houseEdge = polarToCartesian(CX, CY, R_HOUSES_INNER, visualAngle);

                            const isSelected = selectedPlanet?.key === planet.key;
                            const dignityStyle = DIGNITY_COLORS[planet.dignity];

                            return (
                                <g
                                    key={planet.key}
                                    className="cursor-pointer transition-transform"
                                    onClick={(e) => { e.stopPropagation(); onSelectPlanet(planet); }}
                                    onTouchEnd={(e) => { e.stopPropagation(); onSelectPlanet(planet); }}
                                    style={{ transformOrigin: `${pPos.x}px ${pPos.y}px` }}
                                >
                                    <line
                                        x1={CX} y1={CY}
                                        x2={houseEdge.x} y2={houseEdge.y}
                                        stroke={dignityStyle.fill}
                                        strokeWidth={isSelected ? "2" : "1"}
                                        strokeOpacity="0.4"
                                        strokeDasharray={dignityStyle.strokeDash !== 'none' ? dignityStyle.strokeDash : undefined}
                                    />

                                    {/* Planet Base Glow (CSS Filter) */}
                                    {isSelected && (
                                        <circle cx={pPos.x} cy={pPos.y} r="45" fill="none" stroke={dignityStyle.fill} strokeWidth="3" strokeOpacity="0.3" className="animate-pulse" />
                                    )}

                                    {/* Planet Base Circle */}
                                    <motion.circle
                                        cx={pPos.x} cy={pPos.y} r="22"
                                        fill={dignityStyle.fill}
                                        opacity={dignityStyle.opacity}
                                        whileHover={{ scale: 1.3 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    />

                                    {/* Hit Area (Touch-friendly invisible circle) */}
                                    <circle cx={pPos.x} cy={pPos.y} r="60" fill="transparent" />

                                    {/* Unicode Symbol */}
                                    <text
                                        x={pPos.x} y={pPos.y + 2}
                                        textAnchor="middle" alignmentBaseline="middle"
                                        fill="#000" fontSize="30" fontWeight="bold"
                                        className="pointer-events-none select-none"
                                    >
                                        {PLANET_UNICODE[planet.key] || '?'}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Centro Estético */}
                        <circle cx={CX} cy={CY} r="25" fill="#0A0A14" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                        <circle cx={CX} cy={CY} r="5" fill="#FFF" opacity="0.5" />
                    </svg>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};
