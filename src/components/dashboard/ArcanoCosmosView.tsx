
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, AlignCenter, Globe, Compass, Sun, Moon, Sparkles } from 'lucide-react';
import { ArcanoAdvanced, MapaAstralCalculado } from '../../types';
import { calculateArcanoAlignment } from '../../utils/astroConnectionUtils';
import { cn } from '../../utils';

interface Props {
    arcano: ArcanoAdvanced;
    mapa: MapaAstralCalculado | null;
    insights?: any;
}

export const ArcanoCosmosView: React.FC<Props> = ({ arcano, mapa, insights }) => {
    const alignment = calculateArcanoAlignment(arcano, mapa);

    if (!mapa) {
        return (
            <div className="p-12 text-center">
                <Compass size={48} className="mx-auto text-slate-500 mb-4 animate-pulse" />
                <p className="text-slate-400">Mapa astral não carregado para este perfil.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12 pb-24">
            {/* ALIGNMENT SCORE HEADER */}
            <section className="text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block relative p-[2px] rounded-full bg-gradient-to-tr from-cyan-500 via-amber-500 to-purple-500"
                >
                    <div className="bg-[#050505] rounded-full px-8 py-4 flex items-center gap-4 border border-white/5">
                        <div className="relative">
                            <svg className="w-12 h-12 rotate-[-90deg]">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                <motion.circle
                                    cx="24" cy="24" r="20" fill="none"
                                    stroke="url(#gradient-cosmos)" strokeWidth="4"
                                    strokeDasharray="125.6"
                                    initial={{ strokeDashoffset: 125.6 }}
                                    animate={{ strokeDashoffset: 125.6 - (125.6 * alignment.alignmentScore) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="gradient-cosmos" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#fbbf24" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                                {alignment.alignmentScore}%
                            </div>
                        </div>
                        <div className="text-left">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Alinhamento Cósmico</h3>
                            <p className="text-lg font-serif text-white">Sincronicidade de Alma</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* REGENT INFO CARDS */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sign Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                            <Star size={120} className="text-purple-400" />
                        </motion.div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                            <Sparkles size={24} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400/60 mb-2">Personalidade Híbrida</h4>
                        <p className="text-3xl font-serif text-white mb-2">{arcano.nome} em {mapa.sunSign}</p>
                        <p className="text-sm text-slate-400 font-light leading-relaxed italic border-l-2 border-purple-500/30 pl-4 mb-4">
                            {insights?.signo?.perfil || `A fusão entre o arquétipo d${arcano.nome} e o Sol em ${mapa.sunSign} cria uma expressão única de individualidade.`}
                        </p>
                        {insights?.signo?.ponto_cego && (
                            <div className="text-[10px] uppercase font-bold text-rose-400/70 border border-rose-500/20 rounded-lg p-2 bg-rose-500/5">
                                ⚠️ Ponto Cego: {insights.signo.ponto_cego}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Planet Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        >
                            <Globe size={120} className="text-cyan-400" />
                        </motion.div>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
                            <Star size={24} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400/60 mb-2">Astro Regente</h4>
                        <p className="text-3xl font-serif text-white mb-2">{arcano.planeta_regente || 'N/A'}</p>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">
                            A força ativa deste Arcano vem de {arcano.planeta_regente}, o astro que governa {arcano.numero === 1 ? 'a destreza e os novos começos' : 'a estrutura e o potencial divino'}.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* DETAILED ALIGNMENT MAP */}
            <section className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Compass size={20} />
                    </div>
                    <h2 className="text-2xl font-serif text-white">Mapa de Sincronicidade</h2>
                </div>

                <div className="space-y-6">
                    {alignment.insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="mt-1">
                                {insight.includes('Sol') ? <Sun size={20} className="text-amber-400" /> :
                                    insight.includes('Lua') ? <Moon size={20} className="text-slate-300" /> :
                                        insight.includes('Ascendente') ? <Sparkles size={20} className="text-cyan-400" /> :
                                            <Star size={20} className="text-purple-400" />}
                            </div>
                            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                                {insight}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* RITUAL COSMICO */}
            <section className="relative rounded-[2.5rem] bg-gradient-to-r from-amber-500 to-orange-600 p-8 md:p-12 overflow-hidden group">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Zap size={150} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="text-center md:text-left flex-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 mb-2 block">Desafio Alquímico</span>
                        <h3 className="text-3xl font-serif text-black mb-4">Ação de Alinhamento</h3>
                        <p className="text-black/80 font-medium leading-relaxed max-w-xl">
                            "Hoje, dedique 5 minutos para contemplar em silêncio como a energia de {arcano.planeta_regente} pode servir de base para seu {mapa.ascendente.signo} brilhar com mais autenticidade."
                        </p>
                    </div>
                    <button className="px-8 py-4 rounded-2xl bg-black text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                        Marcar Prática
                    </button>
                </div>
            </section>
        </div>
    );
};
