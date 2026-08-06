import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export interface PlanetaProps {
    planeta: string;
    symbol: string;
    signo: string;
    casa: number;
    grau: string;
    elemento: string;
    interpretacao?: {
        titulo: string;
        potencialLuz: string;
        desafioSombra: string;
        acaoPratica: string;
    };
}

interface PlanetAccordionProps {
    dados: PlanetaProps;
    isActive: boolean;
    onClick: () => void;
    index: number;
}

export const PlanetAccordion: React.FC<PlanetAccordionProps> = ({ dados, isActive, onClick, index }) => {
    // Normalizar elemento para português para mapeamento de cores
    const normElement = {
        fogo: 'fogo', fire: 'fogo',
        terra: 'terra', earth: 'terra',
        ar: 'ar', air: 'ar',
        agua: 'agua', water: 'agua',
    }[dados.elemento.toLowerCase()] || 'terra';

    // Borda colorida baseada no elemento
    const elementBorderColor = {
        fogo: 'border-orange-500',
        terra: 'border-emerald-500',
        ar: 'border-sky-400',
        agua: 'border-violet-500',
    }[normElement];

    return (
        <div
            id={`planeta-card-${dados.planeta.toLowerCase()}`}
            className={`relative w-full overflow-hidden transition-all duration-300 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 border-l-4 ${elementBorderColor}`}
        >
            {/* HEADER TAPPABLE */}
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-lg md:text-xl shadow-lg group-hover:bg-white/10 transition-colors">
                        {dados.symbol}
                    </div>

                    <div>
                        <h3 className="font-serif text-lg md:text-xl text-slate-100 uppercase tracking-wider flex items-center gap-2">
                            {dados.planeta} EM {dados.signo}
                        </h3>
                        <div className="flex gap-2 text-[10px] md:text-xs text-slate-400 font-sans tracking-widest uppercase mt-1">
                            <span>Casa {dados.casa}</span>
                            <span className="text-slate-600">•</span>
                            <span>{dados.grau}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-amber-500/80">{dados.elemento}</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400"
                >
                    <ChevronDown size={16} />
                </motion.div>
            </button>

            {/* CONTEÚDO EXPANDIDO */}
            <AnimatePresence initial={false}>
                {isActive && dados.interpretacao && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-5 pt-0 border-t border-white/5 mt-2">

                            {/* Síntese Premium */}
                            <div className="my-4 p-4 rounded-xl bg-white/5 border border-white/10 relative">
                                <Sparkles size={14} className="absolute top-4 left-4 text-amber-500/50" />
                                <p className="text-slate-200 text-sm md:text-base leading-relaxed pl-6 font-serif tracking-wide italic">
                                    "{dados.interpretacao.titulo}"
                                </p>
                            </div>

                            {/* Grid Luz vs Sombra */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-950/40 to-transparent border border-emerald-500/20">
                                    <h4 className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-emerald-500 mb-1.5 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-emerald-500" /> Potencial da Luz
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">{dados.interpretacao.potencialLuz}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-gradient-to-br from-rose-950/40 to-transparent border border-rose-500/20">
                                    <h4 className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-rose-400 mb-1.5 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-rose-500" /> Desafio da Sombra
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">{dados.interpretacao.desafioSombra}</p>
                                </div>
                            </div>

                            {/* Prática Diária */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                <div className="shrink-0 text-indigo-400 hidden sm:block">❖</div>
                                <div className="text-xs text-indigo-200 font-light">
                                    <strong className="font-bold uppercase tracking-widest text-[10px] text-indigo-400 block sm:inline sm:mr-1 mb-1 sm:mb-0">Ação Prática:</strong>
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
