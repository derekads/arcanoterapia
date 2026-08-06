import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InterpretationData, interpretationsDB, getGenericInterpretation } from '../../data/astrologyInterpretations';
import { aspectsDB, getGenericAspectInterpretation } from '../../data/aspectData';
import { PlanetPosition } from './AstroWheel';
import { X, Sparkles, AlertCircle, Briefcase, Eye, Activity, Heart, Bookmark, Share2 } from 'lucide-react';
import { PLANET_UNICODE, ZODIAC_SIGNS } from '../../utils/astroRenderUtils';
import clsx from 'clsx';

interface AspectPreview {
    planet1: string;
    planet2: string;
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
}

interface Props {
    planet: PlanetPosition | null;
    onClose: () => void;
    aspects: AspectPreview[]; // Aspectos associados a este planeta
}

export const InterpretationDrawer: React.FC<Props> = ({ planet, onClose, aspects }) => {
    const [activeTab, setActiveTab] = useState<'essence' | 'shadow' | 'practical' | 'spiritual' | 'connections'>('essence');
    const [data, setData] = useState<InterpretationData | null>(null);

    useEffect(() => {
        if (planet) {
            const dbKey = `${planet.key}_${planet.sign}`;
            if (interpretationsDB[dbKey]) {
                setData(interpretationsDB[dbKey]);
            } else {
                setData(getGenericInterpretation(planet.key, planet.sign));
            }
            setActiveTab('essence');
        } else {
            setData(null);
        }
    }, [planet]);

    if (!planet || !data) return null;

    const signName = ZODIAC_SIGNS.find(s => s.sign === planet.sign)?.name || planet.sign.toUpperCase();
    const dignityColors = {
        domicile: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        exaltation: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
        neutral: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
        detriment: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
        fall: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
    };

    const dignityLabels = {
        domicile: 'Domicílio',
        exaltation: 'Exaltação',
        neutral: 'Peregrino',
        detriment: 'Exílio',
        fall: 'Queda'
    };

    return (
        <AnimatePresence>
            <motion.div
                key="drawer-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:flex md:justify-end"
                onClick={onClose}
            >
                <motion.div
                    key="drawer-content"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute bottom-0 left-0 w-full h-[85vh] md:relative md:h-full md:w-[500px] bg-[#0A0A14] md:border-l border-t md:border-t-0 border-white/10 shadow-2xl rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none flex flex-col overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header Sticky */}
                    <div className="sticky top-0 z-20 bg-[#0A0A14]/90 backdrop-blur-xl border-b border-white/5 p-6 pb-0">
                        {/* Grab handle for touch */}
                        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 md:hidden" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                                    {PLANET_UNICODE[planet.key] || '?'}
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-serif text-white tracking-wide uppercase">
                                        {planet.key} em {signName}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-400">{Math.floor(planet.degree % 30)}°{Math.floor((planet.degree % 1) * 60)}'</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                                        <span className={clsx("text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border", dignityColors[data.dignity])}>
                                            {dignityLabels[data.dignity]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"><Bookmark size={14} /></button>
                                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"><X size={14} /></button>
                            </div>
                        </div>

                        {/* TAB MENU */}
                        <div className="flex overflow-x-auto no-scrollbar gap-6 border-b border-white/10">
                            {[
                                { id: 'essence', label: 'Essência', icon: Sparkles },
                                { id: 'shadow', label: 'Luz & Sombra', icon: AlertCircle },
                                { id: 'practical', label: 'Vida Prática', icon: Briefcase },
                                { id: 'spiritual', label: 'Revelação', icon: Eye },
                                { id: 'connections', label: 'Aspectos', icon: Share2 }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={clsx(
                                        "pb-3 text-xs uppercase tracking-widest font-bold whitespace-nowrap flex items-center gap-2 transition-colors relative",
                                        activeTab === tab.id ? "text-amber-400" : "text-white/40 hover:text-white/70"
                                    )}
                                >
                                    <tab.icon size={12} />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {activeTab === 'essence' && (
                                    <>
                                        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-amber-200/80 mb-2 italic">
                                            Arquétipo: {data.archetype}
                                        </div>
                                        <p className="text-slate-300 leading-loose text-sm md:text-base font-light text-justify">
                                            {data.essence}
                                        </p>
                                    </>
                                )}

                                {activeTab === 'shadow' && (
                                    <div className="space-y-8">
                                        <div className="bg-rose-950/20 p-6 rounded-2xl border border-rose-500/20">
                                            <h4 className="flex items-center gap-2 text-rose-400 text-xs uppercase font-bold tracking-widest mb-3">
                                                <AlertCircle size={14} /> Sombra Profunda
                                            </h4>
                                            <p className="text-rose-200/80 text-sm leading-relaxed">{data.shadow}</p>
                                        </div>
                                        <div className="bg-emerald-950/20 p-6 rounded-2xl border border-emerald-500/20">
                                            <h4 className="flex items-center gap-2 text-emerald-400 text-xs uppercase font-bold tracking-widest mb-3">
                                                <Sparkles size={14} /> Luz e Dom
                                            </h4>
                                            <p className="text-emerald-200/80 text-sm leading-relaxed">{data.light}</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'practical' && (
                                    <div className="space-y-4">
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="flex items-center gap-2 text-blue-400 text-xs uppercase font-bold tracking-widest mb-2">
                                                <Briefcase size={14} /> Carreira
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">{data.practical.career}</p>
                                        </div>
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="flex items-center gap-2 text-pink-400 text-xs uppercase font-bold tracking-widest mb-2">
                                                <Heart size={14} /> Relacionamentos
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">{data.practical.love}</p>
                                        </div>
                                        <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <h4 className="flex items-center gap-2 text-emerald-400 text-xs uppercase font-bold tracking-widest mb-2">
                                                <Activity size={14} /> Saúde e Corpo
                                            </h4>
                                            <p className="text-slate-300 text-sm leading-relaxed">{data.practical.health}</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'spiritual' && (
                                    <div className="text-center p-8 bg-gradient-to-b from-[#111122] to-[#0A0A14] border border-white/5 rounded-3xl">
                                        <Eye size={32} className="mx-auto mb-4 text-violet-400 opacity-50" />
                                        <h3 className="text-lg font-serif text-violet-300 mb-4">Missão Transpessoal</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed italic">
                                            "A alquimia desta configuração não se resume a confortos terrenos. Seu karma exige a transmutação constante dos apegos inferiores para construir a fundação da sua individuação máxima através do(a) {signName}."
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'connections' && (
                                    <div className="space-y-4">
                                        {aspects.length > 0 ? aspects.map((asp, i) => {
                                            const dbKey = `${asp.planet1}_${asp.type}_${asp.planet2}`;
                                            const aspData = aspectsDB[dbKey] || getGenericAspectInterpretation(asp.type, asp.planet1, asp.planet2);
                                            const typeColors = {
                                                conjunction: 'text-purple-400',
                                                trine: 'text-emerald-400',
                                                sextile: 'text-blue-400',
                                                square: 'text-rose-400',
                                                opposition: 'text-orange-400'
                                            };
                                            return (
                                                <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xl">{PLANET_UNICODE[asp.planet1]}</span>
                                                            <span className={clsx("text-[10px] uppercase font-bold tracking-widest", typeColors[asp.type])}>{asp.type}</span>
                                                            <span className="text-xl">{PLANET_UNICODE[asp.planet2]}</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500">Orb: {asp.orb.toFixed(1)}°</span>
                                                    </div>
                                                    <p className="text-slate-300 text-sm leading-relaxed">{aspData}</p>
                                                </div>
                                            );
                                        }) : (
                                            <p className="text-center text-slate-500 text-sm italic mt-10">Este planeta repousa solitário, sem aspectos maiores exatos no seu mapa natal.</p>
                                        )}
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
