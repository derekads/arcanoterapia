import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    describeAnnularSector,
    eclipticToVisualDegree,
    formatDegreeInSign,
    getAspectStyle,
    getMidEclipticAngle,
    polarToCartesian,
    spreadOverlappingBodies,
    ELEMENT_COLORS,
    ZODIAC_SIGNS
} from '../../utils/astroRenderUtils';
import type { ChartAspect, ChartBody, ChartCusp } from '../../utils/mapaAstralAdapter';

export interface MapaSVGProps {
    /** Corpos celestes desenhados na roda (sem os eixos). */
    astros: ChartBody[];
    /** Eixos AC e MC — desenhados na borda, não como planetas. */
    angulos?: ChartBody[];
    /** As 12 cúspides reais, em longitude eclíptica. */
    cuspides: ChartCusp[];
    aspectos?: ChartAspect[];
    /** Longitude eclíptica do Ascendente: ancora a rotação da roda. */
    ascendenteGraus: number;
    astroAtivo: string | null;
    onAstroClick: (nome: string) => void;
    className?: string;
    /** Oculta as linhas de aspecto (útil em telas pequenas). */
    mostrarAspectos?: boolean;
}

// Geometria da roda — centro em (210, 210); a viewBox reserva margem para os
// rótulos dos eixos e para a legenda de aspectos abaixo do círculo.
const CX = 210;
const CY = 210;
const R_ZODIAC_OUTER = 202;
const R_ZODIAC_INNER = 170;
const R_PLANET_RING = 140;
const R_DEGREE_MARK = 118;
const R_HOUSE_LABEL = 104;
const R_HOUSE_INNER = 92;

/** Eixos angulares que ganham rótulo na borda. */
const EIXOS = [
    { casa: 1, label: 'AC' },
    { casa: 4, label: 'IC' },
    { casa: 7, label: 'DC' },
    { casa: 10, label: 'MC' }
] as const;

export const MapaSVG: React.FC<MapaSVGProps> = ({
    astros,
    angulos = [],
    cuspides,
    aspectos = [],
    ascendenteGraus,
    astroAtivo,
    onAstroClick,
    className = '',
    mostrarAspectos = true
}) => {
    const toVisual = React.useCallback(
        (eclipticDegree: number) => eclipticToVisualDegree(eclipticDegree, ascendenteGraus),
        [ascendenteGraus]
    );

    // ─── Setores das 12 casas, a partir das cúspides REAIS ───
    const setoresCasas = useMemo(() => {
        if (!cuspides.length) return [];
        return cuspides.map((cusp, i) => {
            const proxima = cuspides[(i + 1) % cuspides.length];
            const startVisual = toVisual(cusp.longitude);
            const endVisual = toVisual(proxima.longitude);
            const midEcliptic = getMidEclipticAngle(cusp.longitude, proxima.longitude);

            return {
                casa: cusp.casa,
                eixo: cusp.eixo,
                amplitude: cusp.amplitude,
                startVisual,
                endVisual,
                labelPoint: polarToCartesian(CX, CY, R_HOUSE_LABEL, toVisual(midEcliptic)),
                cuspOuter: polarToCartesian(CX, CY, R_ZODIAC_INNER, startVisual),
                cuspInner: polarToCartesian(CX, CY, R_HOUSE_INNER, startVisual),
                path: describeAnnularSector(CX, CY, R_HOUSE_INNER, R_ZODIAC_INNER, startVisual, endVisual)
            };
        });
    }, [cuspides, toVisual]);

    // ─── Anel do zodíaco ───
    const setoresZodiaco = useMemo(() => {
        return ZODIAC_SIGNS.map((sign, i) => {
            const startEcliptic = i * 30;
            const startVisual = toVisual(startEcliptic);
            const endVisual = toVisual(startEcliptic + 30);
            const midVisual = toVisual(startEcliptic + 15);

            return {
                ...sign,
                path: describeAnnularSector(CX, CY, R_ZODIAC_INNER, R_ZODIAC_OUTER, startVisual, endVisual),
                symbolPoint: polarToCartesian(CX, CY, (R_ZODIAC_OUTER + R_ZODIAC_INNER) / 2, midVisual),
                divisorOuter: polarToCartesian(CX, CY, R_ZODIAC_OUTER, startVisual),
                divisorInner: polarToCartesian(CX, CY, R_ZODIAC_INNER, startVisual)
            };
        });
    }, [toVisual]);

    // ─── Marcações de grau (5 em 5, com destaque a cada 10) ───
    const ticks = useMemo(() => {
        return Array.from({ length: 72 }).map((_, i) => {
            const ecliptic = i * 5;
            const visual = toVisual(ecliptic);
            const destaque = i % 2 === 0;
            const comprimento = destaque ? 6 : 3;
            return {
                key: `tick-${i}`,
                from: polarToCartesian(CX, CY, R_ZODIAC_INNER, visual),
                to: polarToCartesian(CX, CY, R_ZODIAC_INNER - comprimento, visual),
                opacity: destaque ? 0.22 : 0.1
            };
        });
    }, [toVisual]);

    // ─── Astros posicionados, com desempilhamento de glifos ───
    const astrosPosicionados = useMemo(() => {
        const espalhados = spreadOverlappingBodies<ChartBody>(
            astros.map(a => ({ item: a, degree: a.longitude })),
            9
        );

        return espalhados.map(({ item, degree, displayDegree }) => {
            const visualGlyph = toVisual(displayDegree);
            const visualReal = toVisual(degree);
            const glyphPos = polarToCartesian(CX, CY, R_PLANET_RING, visualGlyph);

            return {
                astro: item,
                color: ELEMENT_COLORS[item.elemento],
                x: glyphPos.x,
                y: glyphPos.y,
                // Régua ligando o glifo ao grau exato na borda interna do zodíaco
                markOuter: polarToCartesian(CX, CY, R_ZODIAC_INNER - 8, visualReal),
                markInner: polarToCartesian(CX, CY, R_DEGREE_MARK, visualReal),
                aspectAnchor: polarToCartesian(CX, CY, R_HOUSE_INNER - 4, visualReal)
            };
        });
    }, [astros, toVisual]);

    // Âncoras para as linhas de aspecto, por nome do astro
    const ancoras = useMemo(() => {
        const map: Record<string, { x: number; y: number }> = {};
        astrosPosicionados.forEach(p => {
            map[p.astro.nome] = p.aspectAnchor;
        });
        angulos.forEach(a => {
            map[a.nome] = polarToCartesian(CX, CY, R_HOUSE_INNER - 4, toVisual(a.longitude));
        });
        return map;
    }, [astrosPosicionados, angulos, toVisual]);

    // ─── Linhas de aspecto ───
    const linhasAspecto = useMemo(() => {
        if (!mostrarAspectos) return [];

        return aspectos
            .map((asp, idx) => {
                const p1 = ancoras[asp.astroA];
                const p2 = ancoras[asp.astroB];
                if (!p1 || !p2) return null;

                const estilo = getAspectStyle(asp.tipo);
                const envolveAtivo =
                    astroAtivo !== null && (asp.astroA === astroAtivo || asp.astroB === astroAtivo);
                const algumSelecionado = astroAtivo !== null;

                // Aspectos exatos aparecem mais firmes; ao selecionar um astro,
                // apenas os aspectos dele permanecem em evidência.
                const opacidadeBase = 0.25 + asp.forca * 0.5;
                const opacidade = algumSelecionado ? (envolveAtivo ? 0.95 : 0.06) : opacidadeBase;

                return (
                    <line
                        key={`aspect-${idx}-${asp.astroA}-${asp.astroB}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={estilo.color}
                        strokeWidth={envolveAtivo ? 1.6 : 1}
                        strokeDasharray={estilo.dash}
                        strokeOpacity={opacidade}
                        strokeLinecap="round"
                    />
                );
            })
            .filter(Boolean);
    }, [aspectos, ancoras, astroAtivo, mostrarAspectos]);

    // ─── Rótulos dos eixos AC/IC/DC/MC ───
    const rotulosEixos = useMemo(() => {
        return EIXOS.map(eixo => {
            const cusp = cuspides.find(c => c.casa === eixo.casa);
            if (!cusp) return null;
            const visual = toVisual(cusp.longitude);
            const pos = polarToCartesian(CX, CY, R_ZODIAC_OUTER + 12, visual);
            const marca = formatDegreeInSign(cusp.longitude);
            return { ...eixo, pos, visual, texto: `${marca.grau}°${marca.signo.symbol}` };
        }).filter(Boolean) as Array<{
            casa: number;
            label: string;
            pos: { x: number; y: number };
            visual: number;
            texto: string;
        }>;
    }, [cuspides, toVisual]);

    const casaAtiva = astros.find(a => a.nome === astroAtivo)?.casa ?? null;

    return (
        <div className={`relative ${className}`}>
            <svg
                viewBox="-20 -16 460 500"
                className="w-full h-full select-none overflow-visible"
                role="img"
                aria-label="Roda do mapa astral com signos, casas, planetas e aspectos"
            >
                <defs>
                    <radialGradient id="mapa-sky" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0b1120" stopOpacity="0.95" />
                        <stop offset="65%" stopColor="#050810" stopOpacity="1" />
                        <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                    </radialGradient>
                    <radialGradient id="mapa-core" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(245,158,11,0.10)" />
                        <stop offset="100%" stopColor="rgba(2,6,23,0)" />
                    </radialGradient>
                </defs>

                {/* Fundo */}
                <circle cx={CX} cy={CY} r={R_ZODIAC_OUTER} fill="url(#mapa-sky)" stroke="rgba(255,255,255,0.07)" />
                <circle cx={CX} cy={CY} r={R_HOUSE_INNER} fill="url(#mapa-core)" stroke="rgba(255,255,255,0.06)" />

                {/* ── Anel do zodíaco ── */}
                {setoresZodiaco.map(sign => (
                    <g key={`zod-${sign.sign}`}>
                        <path d={sign.path} fill={ELEMENT_COLORS[sign.elemento]} fillOpacity={0.07} />
                        <line
                            x1={sign.divisorOuter.x}
                            y1={sign.divisorOuter.y}
                            x2={sign.divisorInner.x}
                            y2={sign.divisorInner.y}
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1"
                        />
                        <text
                            x={sign.symbolPoint.x}
                            y={sign.symbolPoint.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={ELEMENT_COLORS[sign.elemento]}
                            fillOpacity={0.85}
                            fontSize="15"
                            className="font-serif"
                        >
                            {sign.symbol}
                        </text>
                    </g>
                ))}

                {/* Régua de graus */}
                {ticks.map(t => (
                    <line
                        key={t.key}
                        x1={t.from.x}
                        y1={t.from.y}
                        x2={t.to.x}
                        y2={t.to.y}
                        stroke="#ffffff"
                        strokeOpacity={t.opacity}
                        strokeWidth="1"
                    />
                ))}

                {/* ── Casas com cúspides reais ── */}
                {setoresCasas.map(casa => {
                    const isAngular = Boolean(casa.eixo);
                    const isAtiva = casaAtiva === casa.casa;
                    return (
                        <g key={`casa-${casa.casa}`}>
                            {isAtiva && <path d={casa.path} fill="rgba(245,158,11,0.07)" />}
                            <line
                                x1={casa.cuspInner.x}
                                y1={casa.cuspInner.y}
                                x2={casa.cuspOuter.x}
                                y2={casa.cuspOuter.y}
                                stroke={isAngular ? 'rgba(245,158,11,0.55)' : 'rgba(255,255,255,0.10)'}
                                strokeWidth={isAngular ? 1.6 : 1}
                                strokeDasharray={isAngular ? 'none' : '2 4'}
                            />
                            <text
                                x={casa.labelPoint.x}
                                y={casa.labelPoint.y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={isAtiva ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.28)'}
                                fontSize="9"
                                className="font-serif"
                            >
                                {casa.casa}
                            </text>
                        </g>
                    );
                })}

                {/* ── Linhas de aspecto ── */}
                <g>{linhasAspecto}</g>

                {/* ── Rótulos dos eixos AC / IC / DC / MC ── */}
                {rotulosEixos.map(eixo => (
                    <g key={`eixo-${eixo.label}`}>
                        <text
                            x={eixo.pos.x}
                            y={eixo.pos.y - 3}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="rgba(251,191,36,0.85)"
                            fontSize="10"
                            fontWeight="bold"
                            letterSpacing="0.5"
                        >
                            {eixo.label}
                        </text>
                        <text
                            x={eixo.pos.x}
                            y={eixo.pos.y + 7}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="rgba(255,255,255,0.35)"
                            fontSize="7"
                        >
                            {eixo.texto}
                        </text>
                    </g>
                ))}

                {/* ── Astros ── */}
                {astrosPosicionados.map(({ astro, color, x, y, markOuter, markInner }) => {
                    const isActive = astroAtivo === astro.nome;
                    return (
                        <motion.g
                            key={astro.nome}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.94 }}
                            style={{ transformOrigin: `${x}px ${y}px` }}
                            onClick={e => {
                                e.stopPropagation();
                                onAstroClick(astro.nome);
                            }}
                            className="cursor-pointer outline-none focus-visible:outline-none"
                            tabIndex={0}
                            role="button"
                            aria-pressed={isActive}
                            aria-label={`${astro.nome} em ${astro.signo} ${astro.grauTexto}, casa ${astro.casa}${astro.retrogrado ? ', retrógrado' : ''}`}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onAstroClick(astro.nome);
                                }
                            }}
                        >
                            {/* Régua até o grau exato — o glifo pode estar deslocado, o grau não */}
                            <line
                                x1={markOuter.x}
                                y1={markOuter.y}
                                x2={markInner.x}
                                y2={markInner.y}
                                stroke={color}
                                strokeOpacity={isActive ? 0.8 : 0.3}
                                strokeWidth="1"
                            />

                            {/* Alvo de toque generoso (≥ 44px na renderização real) */}
                            <circle cx={x} cy={y} r="19" fill="transparent" />

                            {isActive && (
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="17"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1.4"
                                    opacity="0.75"
                                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                                    className="pointer-events-none"
                                />
                            )}

                            <circle
                                cx={x}
                                cy={y}
                                r="12"
                                fill="#060a14"
                                stroke={isActive ? color : 'rgba(255,255,255,0.22)'}
                                strokeWidth="1.4"
                                className="pointer-events-none transition-colors duration-300"
                            />

                            <text
                                x={x}
                                y={y + 0.5}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.8)'}
                                fontSize="12"
                                fontWeight="bold"
                                className="pointer-events-none transition-colors duration-300"
                            >
                                {astro.symbol}
                            </text>

                            {/* Marcador de retrogradação */}
                            {astro.retrogrado && (
                                <text
                                    x={x + 10}
                                    y={y - 9}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fill="#fb7185"
                                    fontSize="8"
                                    fontWeight="bold"
                                    className="pointer-events-none"
                                >
                                    ℞
                                </text>
                            )}
                        </motion.g>
                    );
                })}

                {/* ── Legenda dos aspectos ── */}
                {mostrarAspectos && (
                    <g transform="translate(-6, 458)">
                        {['Conjunção', 'Sextil', 'Quadratura', 'Trígono', 'Oposição'].map((tipo, i) => {
                            const estilo = getAspectStyle(tipo);
                            const x = i * 87;
                            return (
                                <g key={`legenda-${tipo}`}>
                                    <line
                                        x1={x}
                                        y1={0}
                                        x2={x + 16}
                                        y2={0}
                                        stroke={estilo.color}
                                        strokeWidth="1.6"
                                        strokeDasharray={estilo.dash}
                                    />
                                    <text
                                        x={x + 22}
                                        y={0}
                                        dominantBaseline="central"
                                        fill="rgba(255,255,255,0.45)"
                                        fontSize="9"
                                    >
                                        {estilo.symbol} {estilo.label}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                )}
            </svg>
        </div>
    );
};

export default MapaSVG;
