import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlanetaV2 } from '../../data/mockMapaAstralV2';

interface AstroChartProps {
    planetas: PlanetaV2[];
    selectedPlanet: string | null;
    onSelectPlanet: (key: string) => void;
    ascendantDegree?: number; // Grau eclíptico para calcular a rotação em relação a Casa 1
}

export const AstroChartVertical: React.FC<AstroChartProps> = ({
    planetas,
    selectedPlanet,
    onSelectPlanet,
    ascendantDegree = 0 // Offset para alinhar Áries/Ascendente se necessário futuramente
}) => {

    // Parâmetros Físicos do SVG
    const cx = 200;
    const cy = 200;
    const raioFundo = 180;
    const raioPlanetas = 135; // Distância do centro onde os planetas pousam

    // Cálculo Trigonométrico em Memo
    const planetasCalculados = useMemo(() => {
        return planetas.map(p => {
            // Offset de -90 graus para que 0 grau (Áries/Asc) comece na Orelha Direita (ou topo)
            // Ajuste clássico de astrologia: Ascendente fica na esquerda (180 graus no CSS)
            const rad = ((p.degree - ascendantDegree + 180) % 360) * (Math.PI / 180);
            return {
                ...p,
                x: cx + raioPlanetas * Math.cos(rad),
                y: cy + raioPlanetas * Math.sin(rad),
            };
        });
    }, [planetas, ascendantDegree]);

    return (
        <div className="w-full max-w-[500px] mx-auto aspect-square relative flex items-center justify-center overflow-hidden rounded-[40px] shadow-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent border border-white/5">

            {/* Container de Animação com Drag limits e Pinch-to-Zoom Nativo do Framer */}
            <motion.div
                className="w-[90%] h-[90%]"
                drag
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                dragElastic={0.1}
                animate={{ rotate: 360 }}
                transition={{ duration: 250, repeat: Infinity, ease: 'linear' }}
                whileTap={{ cursor: 'grabbing' }}
                style={{ cursor: 'grab' }} // Cancela a rotação contínua e permite interagir ao segurar
            >
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">

                    {/* Eixos Guia Celestiais Transparentes */}
                    <circle cx={cx} cy={cy} r={raioFundo} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <circle cx={cx} cy={cy} r={raioPlanetas} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="4 8" />

                    <line x1={cx} y1={cy - raioFundo} x2={cx} y2={cy + raioFundo} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1={cx - raioFundo} y1={cy} x2={cx + raioFundo} y2={cy} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                    {/* Anéis Internos de Design */}
                    <circle cx={cx} cy={cy} r="60" fill="rgba(15, 23, 42, 0.4)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <circle cx={cx} cy={cy} r="40" fill="rgba(245, 158, 11, 0.05)" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" />

                    {/* Renderização Vetorial dos Planetas */}
                    {planetasCalculados.map(p => {
                        const isActive = selectedPlanet === p.key;

                        // Definição de Cores Base por Elemento Puxando do Card
                        const glowColors = {
                            fogo: '#f97316',
                            terra: '#10b981',
                            ar: '#38bdf8',
                            agua: '#8b5cf6',
                        };
                        const planetColor = glowColors[p.element] || '#cbd5e1';

                        return (
                            <motion.g
                                key={p.key}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.stopPropagation(); onSelectPlanet(p.key); }} // Anti-propagation to prevent dragging interference
                                onTouchEnd={(e) => { e.stopPropagation(); onSelectPlanet(p.key); }} // Fallback Mobile HIG
                                className="cursor-pointer outline-none"
                            >
                                {/* Hitbox Invisível Massiva Mobile-First (HIG = min 44px) */}
                                <circle cx={p.x} cy={p.y} r="28" fill="transparent" />

                                {/* Aura Glow Condicional do SelectionState */}
                                {isActive && (
                                    <circle
                                        cx={p.x} cy={p.y} r="22"
                                        fill="none" stroke={planetColor} strokeWidth="1.5"
                                        className="opacity-60 pointer-events-none"
                                        style={{ filter: `drop-shadow(0 0 8px ${planetColor})` }}
                                    />
                                )}

                                {/* Bg Metálico do Planeta */}
                                <circle
                                    cx={p.x} cy={p.y} r="14"
                                    fill="#030305" stroke={isActive ? planetColor : 'rgba(255,255,255,0.15)'}
                                    strokeWidth="2"
                                    className="transition-colors duration-300 pointer-events-none"
                                />

                                {/* Símbolo Astrológico Text(Font) Fixado para Rotate SVG */}
                                <text
                                    x={p.x} y={p.y + 1}
                                    fill={isActive ? '#fff' : 'rgba(255,255,255,0.7)'}
                                    fontSize="16"
                                    fontFamily="sans-serif"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    className="pointer-events-none transition-colors duration-300 font-bold"
                                // Contra-rotação (Se o SVG pai gira 360, o texto deve contra-girar para não ficar de ponta cabeça)
                                // Mas como usamos drag native, a rotação é manipulada no div externo. Não é necessário text transform estático aqui
                                >
                                    {p.symbol}
                                </text>
                            </motion.g>
                        );
                    })}
                </svg>
            </motion.div>
        </div>
    );
};
