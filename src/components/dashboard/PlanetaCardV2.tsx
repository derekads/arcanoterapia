import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { PlanetaV2 } from '../../data/mockMapaAstralV2';

interface PlanetaCardProps {
    planeta: PlanetaV2;
    isExpanded: boolean;
    onToggle: () => void;
}

export const PlanetaCardV2: React.FC<PlanetaCardProps> = ({ planeta, isExpanded, onToggle }) => {

    // Dynamic Border based on Element
    const elementBorderColor = {
        fogo: 'border-orange-500',
        terra: 'border-emerald-500',
        ar: 'border-sky-400',
        agua: 'border-violet-500',
    }[planeta.element] || 'border-slate-500';

    return (
        <div
            id={`planeta-card-${planeta.key}`}
            className={`relative w-full overflow-hidden transition-all duration-300 rounded-2xl bg-[#0f172a99] backdrop-blur-xl border border-white/5 border-l-4 ${elementBorderColor}`}
        >
            {/* HEADER (Always visible) */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none group"
            >
                <div className="flex items-center gap-4">
                    {/* Ícone */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-xl shadow-lg transition-colors group-hover:bg-white/10`}>
                        {planeta.symbol}
                    </div>

                    {/* Títulos */}
                    <div>
                        <h3 className="font-serif text-xl md:text-2xl text-slate-100 flex items-center gap-2">
                            {planeta.name} em {planeta.sign}
                        </h3>
                        <div className="flex gap-2 text-xs md:text-sm text-slate-400 font-sans tracking-wide">
                            <span>Casa {planeta.house}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600 self-center" />
                            <span>{planeta.degreeText}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600 self-center" />
                            <span className="capitalize">{planeta.element}</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>

            {/* CONTEÚDO EXPANDIDO (Accordion Body) */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 border-t border-white/5 mt-2">

                            {/* Síntese Premium (Zero Filler) */}
                            <div className="my-5 p-4 rounded-xl bg-white/5 border border-white/10 relative">
                                <Sparkles size={14} className="absolute top-4 left-4 text-amber-500/50" />
                                <p className="text-slate-200 text-sm md:text-base leading-relaxed pl-6 font-serif tracking-wide">
                                    {planeta.interpretacao.sintese}
                                </p>
                            </div>

                            {/* Grid Luz vs Sombra */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 mb-2">✦ Potencial de Luz</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">{planeta.interpretacao.luz}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-rose-400 mb-2">✧ Desafio Sombra</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">{planeta.interpretacao.sombra}</p>
                                </div>
                            </div>

                            {/* Prática Diária */}
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-xs text-indigo-300"><strong className="text-indigo-200 font-bold uppercase tracking-widest">Ação Prática: </strong> {planeta.interpretacao.pratica}</span>
                            </div>

                            {/* Footer Button (Aesthetics Multi-depth) */}
                            <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-bold uppercase tracking-[0.2em] text-slate-300 transition-colors">
                                Portal Completo {planeta.name}
                            </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
