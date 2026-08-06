
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Star, Clock, Sparkles } from 'lucide-react';
import { UserBirthData, Trimestre } from '../../types';
import { calcularAnoPessoal, getPrevisao2026 } from '../../utils/arcanoUtils';
import { cn } from '../../utils';

interface Props {
    userData: UserBirthData;
}

const QUARTERS = [
    { id: 'Q1' as Trimestre, months: 'Jan—Mar', label: '1º Trimestre' },
    { id: 'Q2' as Trimestre, months: 'Abr—Jun', label: '2º Trimestre' },
    { id: 'Q3' as Trimestre, months: 'Jul—Set', label: '3º Trimestre' },
    { id: 'Q4' as Trimestre, months: 'Out—Dez', label: '4º Trimestre' }
];

export const TimeView: React.FC<Props> = ({ userData }) => {
    const anoPessoalNumero = calcularAnoPessoal(userData.dataNascimento);
    const previsao2026 = getPrevisao2026(anoPessoalNumero);
    const [expandedQ, setExpandedQ] = useState<string | null>('Q1');

    return (
        <div className="pb-32 px-8 pt-12">
            {/* HERO NUMÉRICO */}
            <header className="text-center mb-16 space-y-2">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] uppercase tracking-[0.3em] text-purple-400/60 font-bold"
                >
                    Seu Ano Pessoal
                </motion.span>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-9xl font-serif text-purple-500 py-4"
                >
                    {anoPessoalNumero}
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-serif text-white uppercase tracking-widest"
                >
                    {previsao2026?.nome}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/40 max-w-[80%] mx-auto text-sm leading-relaxed"
                >
                    "{previsao2026?.resumo}"
                </motion.p>
            </header>

            {/* TIMELINE TRIMESTRAL */}
            <section className="relative space-y-6">
                {/* Linha Vertical */}
                <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-purple-500/50 to-cyan-500/20" />

                {QUARTERS.map((q, idx) => {
                    const isExpanded = expandedQ === q.id;
                    const insight = previsao2026?.trimestres[q.id] || "Insight em processamento...";

                    return (
                        <div key={q.id} className="relative pl-8">
                            {/* Dot */}
                            <div className={cn(
                                "absolute left-0 w-4 h-4 rounded-full border-2 border-slate-950 transition-all duration-300 z-10",
                                isExpanded ? "bg-purple-500 shadow-[0_0_10px_rgba(167,139,250,0.8)] scale-125" : "bg-purple-900 border-purple-500/50"
                            )} />

                            <motion.button
                                onClick={() => setExpandedQ(isExpanded ? null : q.id)}
                                className={cn(
                                    "w-full text-left p-6 rounded-3xl transition-all duration-300 border",
                                    isExpanded ? "bg-purple-500/10 border-purple-500/30 ring-1 ring-purple-500/10" : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{q.id}</span>
                                        <span className="text-white/20 font-light">•</span>
                                        <span className="text-xs text-white/40 font-bold uppercase tracking-widest">{q.months}</span>
                                    </div>
                                    <div className={cn("transition-transform duration-300", isExpanded && "rotate-180")}>
                                        <ChevronDown size={16} className="text-white/20" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2">{q.label}</h3>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-white/60 leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                                                {insight}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    );
                })}
            </section>

            {/* RITUAL DO ANO */}
            <section className="mt-12">
                <div className="p-8 rounded-[3rem] bg-gradient-to-br from-purple-900/40 to-indigo-950/40 border border-purple-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Sparkles size={120} className="text-purple-400" />
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                            <Calendar size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Ritual do Ano {anoPessoalNumero}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Ativação da vibração {previsao2026?.nome}</p>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed max-w-[80%]">
                            Prática recomendada para alinhar sua energia com o propósito sagrado deste ciclo.
                        </p>
                        <button className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] border-b border-purple-400/30 pb-0.5 hover:border-purple-400 transition-all">
                            Ver Prática
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
