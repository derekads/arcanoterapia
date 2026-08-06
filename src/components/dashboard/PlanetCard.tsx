import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, Sparkles, Briefcase, Eye, Target, Zap, Clock, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { InterpretationData } from '../../data/astrologyInterpretations';
import { decansDB } from '../../data/astrologyDecans';
import { combinationsDB } from '../../data/astrologyCombinations';
import { astrologyHabits } from '../../data/astrologyHabits';
import { DecanateReveal } from '../astrology/DecanateReveal';
import { getCombination, AdvancedAstrologyCombination } from '../../data/combinations';

export interface PlanetCardData {
    key: string; // e.g., 'sun'
    name: string; // 'Sol'
    symbol: string; // '☉'
    sign: string; // 'Câncer'
    signSymbol: string;
    degreeText: string; // "18°59'"
    degree: number; // for wheel
    house: number;
    dignity: 'domicile' | 'exaltation' | 'neutral' | 'detriment' | 'fall';
    retrograde: boolean;
    element: 'fire' | 'earth' | 'air' | 'water';
}

const SIGN_SLUG_MAP: Record<string, string> = {
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

const ELEMENT_COLORS: Record<string, string> = {
    fire: 'border-orange-500 hover:bg-orange-500/5',
    earth: 'border-emerald-500 hover:bg-emerald-500/5',
    air: 'border-yellow-400 hover:bg-yellow-400/5',
    water: 'border-blue-500 hover:bg-blue-500/5',
};

const DIGNITY_LABELS: Record<string, string> = {
    domicile: 'Domicílio',
    exaltation: 'Exaltação',
    neutral: 'Peregrino',
    detriment: 'Exílio',
    fall: 'Queda'
};

interface Props {
    data: PlanetCardData;
    interpretation: InterpretationData;
    isExpanded: boolean;
    onClick: () => void;
}

export const PlanetCard: React.FC<Props> = ({ data, interpretation, isExpanded, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Auto-scroll para este card quando ele for expandido
    useEffect(() => {
        if (isExpanded && cardRef.current) {
            setTimeout(() => {
                cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [isExpanded]);

    const signSlug = SIGN_SLUG_MAP[data.sign] || '';
    const comboKey = `${data.key}_${signSlug}_house${data.house}`;
    const combinationData = combinationsDB[comboKey];

    const advancedCombinationData = getCombination(data.key, signSlug, data.house);

    let decanData = null;
    if (data.key === 'sun') {
        const localDegree = data.degree % 30;
        const decanNumber = Math.floor(localDegree / 10) + 1;
        const decanKey = `${signSlug}_${decanNumber}`;
        decanData = decansDB[decanKey];
    }



    return (
        <div
            ref={cardRef}
            className={clsx(
                "rounded-xl overflow-hidden bg-slate-900/50 border border-white/5 transition-all cursor-pointer shadow-lg",
                "hover:-translate-y-[2px]",
                ELEMENT_COLORS[data.element],
                "border-l-4",
                isExpanded ? "ring-1 ring-amber-500/50" : ""
            )}
        >
            {/* HEADER DO CARD (Sempre Visível) */}
            <div
                className="p-4 flex items-center justify-between"
                onClick={onClick}
            >
                <div className="flex items-center gap-4 flex-1">
                    {/* Icon/Symbol */}
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl text-amber-200">
                        {data.symbol}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-serif text-lg leading-tight uppercase tracking-wide flex items-center gap-2">
                            {data.name} <span className="text-amber-400 text-sm">{data.signSymbol}</span> <span className="text-slate-300">{data.sign}</span>
                        </h3>

                        <div className="flex flex-wrap items-center gap-2 mt-1 font-mono">
                            <span className="text-amber-200/80 text-sm">{data.degreeText}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest">
                                Casa {data.house}
                            </span>

                            {data.retrograde && (
                                <span className="text-[10px] text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded font-bold">
                                    Rx
                                </span>
                            )}

                            {data.dignity !== 'neutral' && (
                                <span className="text-[10px] text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">
                                    {DIGNITY_LABELS[data.dignity]}
                                </span>
                            )}
                        </div>

                        {/* Preview text */}
                        {!isExpanded && (
                            <p className="text-slate-400 italic text-[13px] mt-3 leading-relaxed">
                                "{interpretation.hook}"
                            </p>
                        )}
                    </div>
                </div>

                <div className="pl-4">
                    <ChevronDown
                        className={clsx("text-white/40 transition-transform duration-300", isExpanded && "rotate-180")}
                    />
                </div>
            </div>

            {/* CONTEÚDO EXPANDIDO */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-6 border-t border-white/5 space-y-6 pt-2 bg-black/20">

                            {/* HOOK TITLE */}
                            <div>
                                <h4 className="flex items-center gap-2 text-amber-400 text-sm font-serif italic mb-3">
                                    <Sparkles size={14} className="text-amber-500/50" /> {interpretation.hook}
                                </h4>
                            </div>

                            {/* COMBINAÇÃO ESPECÍFICA (A Trindade Vital) */}
                            {advancedCombinationData ? (
                                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-1 rounded-xl mb-6 shadow-xl shadow-indigo-900/20">
                                    <div className="bg-slate-950/90 p-5 rounded-lg border border-indigo-500/30">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="text-indigo-400" size={16} />
                                            <h5 className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest">{advancedCombinationData.archetypeName}</h5>
                                        </div>

                                        <p className="text-slate-200 text-sm leading-relaxed mb-4 font-medium italic">
                                            Estilo Cinematográfico: <span className="text-indigo-300">{advancedCombinationData.netflixCategory}</span>
                                        </p>

                                        <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/20 mb-4">
                                            <h6 className="text-indigo-400/80 text-[10px] uppercase font-bold mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                A Trindade Vital (Comportamento Core)
                                            </h6>
                                            <ul className="space-y-3">
                                                <li className="text-indigo-100/80 text-[13px] flex items-start gap-2">
                                                    <span className="text-indigo-500/50 mt-1">»</span>
                                                    <span><strong>Atitude:</strong> {advancedCombinationData.triad.keyBehavior}</span>
                                                </li>
                                                <li className="text-indigo-100/80 text-[13px] flex items-start gap-2">
                                                    <span className="text-indigo-500/50 mt-1">»</span>
                                                    <span><strong>Estrutura:</strong> {advancedCombinationData.triad.lifeStructure}</span>
                                                </li>
                                                <li className="text-rose-200/80 text-[13px] flex items-start gap-2">
                                                    <span className="text-rose-500/50 mt-1">»</span>
                                                    <span><strong>Grande Conflito:</strong> {advancedCombinationData.triad.greatConflict}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
                                                <h6 className="text-emerald-400 text-[10px] uppercase font-bold mb-2 flex items-center gap-1">
                                                    <Sparkles size={12} /> Talento Único
                                                </h6>
                                                <p className="text-emerald-100/90 text-[13px] leading-relaxed">{advancedCombinationData.triad.uniqueTalent}</p>
                                            </div>
                                            <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20">
                                                <h6 className="text-amber-400/80 text-[10px] uppercase font-bold mb-2 flex items-center gap-1">
                                                    <Zap size={12} /> Combustível Elemental
                                                </h6>
                                                <p className="text-amber-100/90 text-[13px] leading-relaxed">{advancedCombinationData.elementalFuel}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 p-4 bg-purple-950/20 rounded-xl border border-purple-500/20 mb-4">
                                            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg">☾</div></div>
                                            <div>
                                                <h6 className="text-purple-400 text-[10px] uppercase font-bold mb-1">Trabalho de Sombra (Desafio Prático)</h6>
                                                <p className="text-purple-100/90 text-[13px] leading-relaxed">{advancedCombinationData.shadowWork}</p>
                                            </div>
                                        </div>

                                        <div className="text-center p-4 bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5">
                                            <h6 className="text-slate-400 text-[10px] uppercase font-bold mb-2">Mantra de Poder</h6>
                                            <p className="text-slate-200 text-sm font-serif italic">"{advancedCombinationData.powerMantra}"</p>
                                        </div>
                                    </div>
                                </div>
                            ) : combinationData ? (
                                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-1 rounded-xl mb-6 shadow-xl shadow-indigo-900/20">
                                    <div className="bg-slate-950/90 p-5 rounded-lg border border-indigo-500/30">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="text-indigo-400" size={16} />
                                            <h5 className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest">A Trindade Vital (Sua Assinatura)</h5>
                                        </div>

                                        <p className="text-slate-200 text-sm leading-relaxed mb-4 font-medium">
                                            {combinationData.manifestation}
                                        </p>

                                        <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/20 mb-4">
                                            <h6 className="text-indigo-400/80 text-[10px] uppercase font-bold mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                Comportamento-Chave
                                            </h6>
                                            <ul className="space-y-2">
                                                {combinationData.dailyBehavior.map((b: string, i: number) => (
                                                    <li key={i} className="text-indigo-100/80 text-[13px] flex items-start gap-2">
                                                        <span className="text-indigo-500/50 mt-1">»</span>
                                                        <span>{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <h6 className="text-slate-400 text-[10px] uppercase font-bold mb-2">Estrutura de Vida</h6>
                                                <p className="text-slate-300 text-[13px] leading-relaxed">{combinationData.lifeStructure}</p>
                                            </div>
                                            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/20">
                                                <h6 className="text-rose-400/80 text-[10px] uppercase font-bold mb-2">O Grande Conflito</h6>
                                                <p className="text-rose-200/90 text-[13px] leading-relaxed">{combinationData.typicalConflict}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20">
                                            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">⭐</div></div>
                                            <div>
                                                <h6 className="text-emerald-400 text-[10px] uppercase font-bold mb-1">Seu Talento Único</h6>
                                                <p className="text-emerald-100/90 text-[13px] leading-relaxed">{combinationData.uniqueGift}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {/* VOCÊ É ASSIM */}
                            {interpretation.youAre && (
                                <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                    <h5 className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-2">A Base Essencial</h5>
                                    <p className="text-slate-200 text-sm leading-relaxed">{interpretation.youAre}</p>
                                </div>
                            )}

                            {/* DECANATO (Sutil/Solar) */}
                            {data.key === 'sun' && advancedCombinationData ? (
                                <DecanateReveal
                                    planet={data.key}
                                    sign={signSlug}
                                    degree={data.degree}
                                    isExpanded={isExpanded}
                                    combinationData={advancedCombinationData}
                                />
                            ) : decanData ? (
                                <div className="bg-amber-950/30 p-5 rounded-xl border border-amber-500/30">
                                    <h5 className="text-amber-500/80 text-[10px] uppercase font-bold tracking-widest mb-1">
                                        Seu Efeito Sutil ({decanData.decan.split('_')[1]}º Decanato - Regido por {decanData.ruler})
                                    </h5>
                                    <h4 className="text-amber-300 text-[15px] font-serif font-bold mb-3">{decanData.title}</h4>
                                    <p className="text-amber-100/90 text-[13px] leading-relaxed mb-4">
                                        {decanData.differentiation}
                                    </p>
                                    <div className="bg-black/20 p-4 rounded-lg">
                                        <ul className="space-y-2">
                                            {decanData.behavior.map((b: string, i: number) => (
                                                <li key={i} className="text-amber-200/70 text-[12px] flex items-start gap-2">
                                                    <span className="text-amber-500/50 mt-0.5">•</span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : null}

                            {/* LUZ E SOMBRA COLUMNS */}
                            {interpretation.yourPower && interpretation.yourTrap && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-emerald-950/20 p-5 rounded-xl border border-emerald-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl -mr-8 -mt-8" />
                                        <h5 className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest mb-2">Seu Ponto Forte</h5>
                                        <p className="text-emerald-100/90 text-[13px] leading-relaxed relative z-10">{interpretation.yourPower}</p>
                                    </div>
                                    <div className="bg-rose-950/20 p-5 rounded-xl border border-rose-500/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl -mr-8 -mt-8" />
                                        <h5 className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
                                            <AlertCircle size={12} /> Onde Você Tropeça
                                        </h5>
                                        <p className="text-rose-100/90 text-[13px] leading-relaxed relative z-10">{interpretation.yourTrap}</p>
                                    </div>
                                </div>
                            )}

                            {/* LUNAR */}
                            {interpretation.comfort && (
                                <div className="bg-purple-950/20 p-5 rounded-xl border border-purple-500/20">
                                    <h5 className="text-purple-400 text-[10px] uppercase font-bold tracking-widest mb-2">Seu Refúgio (Como se Conforta)</h5>
                                    <p className="text-purple-100/90 text-[13px] leading-relaxed">{interpretation.comfort}</p>
                                </div>
                            )}

                            {/* VIDA PRÁTICA (Generic/Sol) */}
                            {(interpretation.inLove || interpretation.atWork) && (
                                <div className="space-y-4">
                                    {interpretation.inLove && (
                                        <div className="bg-indigo-950/20 p-5 rounded-xl border border-indigo-500/20 flex gap-4">
                                            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">❤</div></div>
                                            <div>
                                                <h5 className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest mb-1">Como Você Ama</h5>
                                                <p className="text-indigo-100/80 text-[13px] leading-relaxed">{interpretation.inLove}</p>
                                            </div>
                                        </div>
                                    )}
                                    {interpretation.atWork && (
                                        <div className="bg-blue-950/20 p-5 rounded-xl border border-blue-500/20 flex gap-4">
                                            <div className="mt-1"><Briefcase size={24} className="text-blue-400 p-1 bg-blue-500/20 rounded-full w-8 h-8" /></div>
                                            <div>
                                                <h5 className="text-blue-300 text-[10px] uppercase font-bold tracking-widest mb-1">No Trabalho</h5>
                                                <p className="text-blue-100/80 text-[13px] leading-relaxed">{interpretation.atWork}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ASCENDENTE */}
                            {interpretation.mask && (
                                <div className="space-y-4">
                                    <div className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-700">
                                        <h5 className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mb-2">A Máscara Social</h5>
                                        <p className="text-zinc-200 text-[13px] leading-relaxed">{interpretation.mask}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.firstImpression && (
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Primeira Impressão</h5>
                                                <p className="text-slate-300 text-[13px]">{interpretation.firstImpression}</p>
                                            </div>
                                        )}
                                        {interpretation.physical && (
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                                <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Traços Físicos (Geral)</h5>
                                                <p className="text-slate-300 text-[13px]">{interpretation.physical}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.howOthersSee && (
                                        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20 flex gap-4">
                                            <div className="mt-1"><Eye size={20} className="text-amber-500/70" /></div>
                                            <div>
                                                <h5 className="text-amber-500/70 text-[10px] uppercase font-bold tracking-widest mb-1">Como Te Veem</h5>
                                                <p className="text-amber-100/80 text-[13px]">{interpretation.howOthersSee}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* VÊNUS */}
                            {interpretation.loveStyle && (
                                <div className="space-y-4">
                                    <div className="bg-pink-950/20 p-5 rounded-xl border border-pink-500/20">
                                        <h5 className="text-pink-400 text-[10px] uppercase font-bold tracking-widest mb-2">Seu Estilo de Amar</h5>
                                        <p className="text-pink-100/90 text-[13px] leading-relaxed">{interpretation.loveStyle}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.attraction && (
                                            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/20">
                                                <h5 className="text-rose-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">O que te atrai</h5>
                                                <p className="text-rose-100/80 text-[13px]">{interpretation.attraction}</p>
                                            </div>
                                        )}
                                        {interpretation.gift && (
                                            <div className="bg-fuchsia-950/20 p-4 rounded-xl border border-fuchsia-500/20">
                                                <h5 className="text-fuchsia-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Como te conquistar</h5>
                                                <p className="text-fuchsia-100/80 text-[13px]">{interpretation.gift}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.relationship && (
                                        <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                            <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">Relacionamento</h5>
                                            <p className="text-slate-300 text-[13px] leading-relaxed">{interpretation.relationship}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* MARTE */}
                            {interpretation.actionStyle && (
                                <div className="space-y-4">
                                    <div className="bg-red-950/20 p-5 rounded-xl border border-red-500/20">
                                        <h5 className="text-red-400 text-[10px] uppercase font-bold tracking-widest mb-2">Como Você Age</h5>
                                        <p className="text-red-100/90 text-[13px] leading-relaxed">{interpretation.actionStyle}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.anger && (
                                            <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/20">
                                                <h5 className="text-orange-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Como Você Briga (Raiva)</h5>
                                                <p className="text-orange-100/80 text-[13px]">{interpretation.anger}</p>
                                            </div>
                                        )}
                                        {interpretation.sexDrive && (
                                            <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-500/20">
                                                <h5 className="text-rose-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Desejo Puro</h5>
                                                <p className="text-rose-100/80 text-[13px]">{interpretation.sexDrive}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.workDrive && (
                                        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                                            <h5 className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Ambição no Trabalho</h5>
                                            <p className="text-slate-300 text-[13px] leading-relaxed">{interpretation.workDrive}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* MERCÚRIO */}
                            {interpretation.thinkingStyle && (
                                <div className="space-y-4">
                                    <div className="bg-cyan-950/20 p-5 rounded-xl border border-cyan-500/20">
                                        <h5 className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-2">Sua Mente</h5>
                                        <p className="text-cyan-100/90 text-[13px] leading-relaxed">{interpretation.thinkingStyle}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.communication && (
                                            <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-500/20">
                                                <h5 className="text-blue-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Comunicação</h5>
                                                <p className="text-blue-100/80 text-[13px]">{interpretation.communication}</p>
                                            </div>
                                        )}
                                        {interpretation.learning && (
                                            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
                                                <h5 className="text-emerald-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Aprendizado</h5>
                                                <p className="text-emerald-100/80 text-[13px]">{interpretation.learning}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.mentalTrap && (
                                        <div className="bg-rose-950/20 p-5 rounded-xl border border-rose-500/20">
                                            <h5 className="text-rose-400 text-[10px] uppercase font-bold tracking-widest mb-2">Armadilha Mental</h5>
                                            <p className="text-rose-100/90 text-[13px] leading-relaxed">{interpretation.mentalTrap}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* JÚPITER */}
                            {interpretation.growthStyle && (
                                <div className="space-y-4">
                                    <div className="bg-yellow-950/20 p-5 rounded-xl border border-yellow-500/20">
                                        <h5 className="text-yellow-400 text-[10px] uppercase font-bold tracking-widest mb-2">Como Você Cresce</h5>
                                        <p className="text-yellow-100/90 text-[13px] leading-relaxed">{interpretation.growthStyle}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.luckArea && (
                                            <div className="bg-green-950/20 p-4 rounded-xl border border-green-500/20">
                                                <h5 className="text-green-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Sua Sorte</h5>
                                                <p className="text-green-100/80 text-[13px]">{interpretation.luckArea}</p>
                                            </div>
                                        )}
                                        {interpretation.excessTrap && (
                                            <div className="bg-orange-950/20 p-4 rounded-xl border border-orange-500/20">
                                                <h5 className="text-orange-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Armadilha do Excesso</h5>
                                                <p className="text-orange-100/80 text-[13px]">{interpretation.excessTrap}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.wisdom && (
                                        <div className="bg-amber-950/20 p-5 rounded-xl border border-amber-500/20 flex gap-4">
                                            <div className="mt-1"><Sparkles size={20} className="text-amber-500/70" /></div>
                                            <div>
                                                <h5 className="text-amber-500/70 text-[10px] uppercase font-bold tracking-widest mb-1">Sabedoria</h5>
                                                <p className="text-amber-100/80 text-[13px]">{interpretation.wisdom}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SATURNO */}
                            {interpretation.challenge && (
                                <div className="space-y-4">
                                    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                                        <h5 className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">O Desafio Maior</h5>
                                        <p className="text-slate-200 text-[13px] leading-relaxed">{interpretation.challenge}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {interpretation.responsibility && (
                                            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-600">
                                                <h5 className="text-slate-400/70 text-[10px] uppercase font-bold tracking-widest mb-1">Sua Responsabilidade</h5>
                                                <p className="text-slate-300 text-[13px]">{interpretation.responsibility}</p>
                                            </div>
                                        )}
                                        {interpretation.fear && (
                                            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                                                <h5 className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">O Medo Profundo</h5>
                                                <p className="text-zinc-400 text-[13px]">{interpretation.fear}</p>
                                            </div>
                                        )}
                                    </div>
                                    {interpretation.maturity && (
                                        <div className="bg-zinc-800/50 p-5 rounded-xl border border-zinc-600">
                                            <h5 className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mb-2">Sua Maturidade</h5>
                                            <p className="text-zinc-200 text-[13px] leading-relaxed">{interpretation.maturity}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* REVELAÇÃO / DICA DIÁRIA */}
                            <div className="text-center p-6 bg-gradient-to-b from-white/5 to-transparent rounded-xl border border-white/5 mt-4">
                                <h5 className="text-amber-500/70 text-[10px] uppercase font-bold tracking-widest mb-3">Dica Prática</h5>
                                <p className="text-slate-300 text-[13px] italic max-w-lg mx-auto">
                                    "{interpretation.tryThis}"
                                </p>
                            </div>

                            {/* HÁBITOS DE INSPEÇÃO JUNGUIANA */}
                            {astrologyHabits[`${data.key}_${signSlug}`] && (
                                <div className="mt-8 border-t border-indigo-500/20 pt-6">
                                    <h4 className="flex items-center gap-2 text-indigo-400 text-xs font-serif uppercase tracking-widest mb-4">
                                        <Eye size={14} className="text-indigo-500/70" />
                                        Protocolo de Integração
                                    </h4>

                                    <div className="bg-indigo-950/20 rounded-xl border border-indigo-500/20 p-5 space-y-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <Target size={16} className="text-indigo-400" />
                                            </div>
                                            <div>
                                                <h5 className="text-indigo-300 text-[10px] uppercase font-bold tracking-widest mb-1">Prática: {astrologyHabits[`${data.key}_${signSlug}`].practice}</h5>
                                                <p className="text-indigo-100/90 text-[13px] leading-relaxed">
                                                    {astrologyHabits[`${data.key}_${signSlug}`].action}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-indigo-500/10">
                                            <div>
                                                <h6 className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold mb-1">
                                                    <Zap size={10} className="text-amber-500" /> Gatilho
                                                </h6>
                                                <p className="text-slate-300 text-xs">{astrologyHabits[`${data.key}_${signSlug}`].trigger}</p>
                                            </div>
                                            <div>
                                                <h6 className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold mb-1">
                                                    <Clock size={10} className="text-emerald-500" /> Duração
                                                </h6>
                                                <p className="text-slate-300 text-xs">{astrologyHabits[`${data.key}_${signSlug}`].duration}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-indigo-500/10">
                                            <h6 className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold mb-2">
                                                Ponto de Inspeção (Sombra)
                                            </h6>
                                            <p className="text-rose-200/80 text-xs italic border-l-2 border-rose-500/30 pl-3">
                                                {astrologyHabits[`${data.key}_${signSlug}`].inspection_point}
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <div className="flex items-center gap-2 bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-500/20">
                                                <CheckCircle size={14} className="text-emerald-500" />
                                                <span className="text-emerald-400 text-[10px] uppercase font-bold">Métrica:</span>
                                                <span className="text-emerald-100/90 text-xs">{astrologyHabits[`${data.key}_${signSlug}`].metric}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
