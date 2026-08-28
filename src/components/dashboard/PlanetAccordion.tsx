import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { ELEMENT_COLORS } from '../../utils/astroRenderUtils';
import type { ChartBody } from '../../utils/mapaAstralAdapter';

interface PlanetAccordionProps {
    dados: ChartBody;
    isActive: boolean;
    onClick: () => void;
}

const ELEMENT_BORDER: Record<string, string> = {
    fogo: 'border-l-orange-500',
    terra: 'border-l-emerald-500',
    ar: 'border-l-sky-400',
    agua: 'border-l-violet-500'
};

export const PlanetAccordion: React.FC<PlanetAccordionProps> = ({ dados, isActive, onClick }) => {
    const corElemento = ELEMENT_COLORS[dados.elemento];

    return (
        <div
            id={`astro-card-${dados.nome.toLowerCase().replace(/\s+/g, '-')}`}
            className={`relative w-full overflow-hidden transition-all duration-300 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 border-l-4 ${
                ELEMENT_BORDER[dados.elemento]
            } ${isActive ? 'ring-1 ring-amber-500/30' : ''}`}
        >
            <button
                onClick={onClick}
                aria-expanded={isActive}
                className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/40 group"
            >
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center border text-lg md:text-xl shadow-lg transition-colors"
                        style={{
                            color: corElemento,
                            borderColor: `${corElemento}44`,
                            backgroundColor: `${corElemento}12`
                        }}
                        aria-hidden
                    >
                        {dados.symbol}
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-serif text-base md:text-xl text-slate-100 uppercase tracking-wider flex items-center gap-2 flex-wrap">
                            <span className="truncate">
                                {dados.nome} em {dados.signo}
                            </span>
                            <span className="text-slate-500 text-sm" aria-hidden>
                                {dados.signoSymbol}
                            </span>
                            {dados.retrogrado && (
                                <span
                                    className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold tracking-normal"
                                    title="Retrógrado"
                                >
                                    ℞ retrógrado
                                </span>
                            )}
                            {dados.categoria === 'eixo' && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-bold tracking-normal">
                                    eixo
                                </span>
                            )}
                            {dados.categoria === 'ponto' && (
                                <span className="px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 text-[10px] font-bold tracking-normal">
                                    ponto calculado
                                </span>
                            )}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-[10px] md:text-xs text-slate-400 font-sans tracking-widest uppercase mt-1">
                            <span>Casa {dados.casa}</span>
                            <span className="text-slate-600">•</span>
                            <span>{dados.grauTexto}</span>
                            <span className="text-slate-600">•</span>
                            <span style={{ color: corElemento }}>{dados.elementoLabel}</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-slate-800 text-slate-400"
                >
                    <ChevronDown size={16} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-5 pt-0 border-t border-white/5 mt-2">
                            <div className="my-4 p-4 rounded-xl bg-white/5 border border-white/10 relative">
                                <Sparkles size={14} className="absolute top-4 left-4 text-amber-500/50" />
                                <p className="text-slate-200 text-sm md:text-base leading-relaxed pl-6 font-serif tracking-wide italic">
                                    “{dados.interpretacao.titulo}”
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-950/40 to-transparent border border-emerald-500/20">
                                    <h4 className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-emerald-500 mb-1.5 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-emerald-500" /> Potencial da Luz
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                                        {dados.interpretacao.potencialLuz}
                                    </p>
                                </div>
                                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-950/40 to-transparent border border-rose-500/20">
                                    <h4 className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-rose-400 mb-1.5 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-rose-500" /> Desafio da Sombra
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                                        {dados.interpretacao.desafioSombra}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                <div className="shrink-0 text-indigo-400 hidden sm:block">❖</div>
                                <div className="text-xs text-indigo-200 font-light">
                                    <strong className="font-bold uppercase tracking-widest text-[10px] text-indigo-400 block sm:inline sm:mr-1 mb-1 sm:mb-0">
                                        Ação Prática:
                                    </strong>
                                    {dados.interpretacao.acaoPratica}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlanetAccordion;
