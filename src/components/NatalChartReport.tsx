
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Sun, Moon, Zap, Shield, Heart, Briefcase, Globe, Award, Hexagon } from 'lucide-react';
import { MapaAstralCalculado } from '../types';
import { generateNatalReport } from '../utils/astrologyEngine';

interface NatalChartReportProps {
    mapa: MapaAstralCalculado;
    onClose: () => void;
    userName: string;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnim = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export const NatalChartReport: React.FC<NatalChartReportProps> = ({ mapa, onClose, userName }) => {
    const report = useMemo(() => generateNatalReport(mapa), [mapa]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-xl overflow-y-auto custom-scrollbar"
        >
            <div className="max-w-4xl mx-auto p-6 pb-20">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#0a0a0b]/80 backdrop-blur-md py-4 z-10 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-light text-white/90">Mapa Astral de <span className="text-purple-400 font-medium">{userName}</span></h2>
                        <p className="text-sm text-white/50">Leitura astrológica avançada</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="text-white/70" />
                    </button>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    {/* IDENTIDADE (Sol & Ascendente) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Sun className="text-amber-400" size={24} />
                            <h3 className="text-xl font-light text-white">Identidade & Propósito</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <motion.div variants={itemAnim} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-xs text-amber-400/80 uppercase tracking-widest mb-2">Sol em {report.identity.sun.sign} • Casa {report.identity.sun.house}</div>
                                <h4 className="text-lg font-medium text-white mb-3">Sua Essência Vital</h4>
                                <p className="text-white/70 leading-relaxed text-sm">{report.identity.sun.text || "Interpretação não disponível para esta combinação."}</p>
                            </motion.div>

                            <motion.div variants={itemAnim} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <div className="text-xs text-purple-400/80 uppercase tracking-widest mb-2">Ascendente em {report.identity.rising.sign}</div>
                                <h4 className="text-lg font-medium text-white mb-3">Sua Máscara Social</h4>
                                <p className="text-white/70 leading-relaxed text-sm">{report.identity.rising.text || "O Ascendente define como você inicia as coisas e como o mundo te vê."}</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* EMOÇÕES (Lua) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Moon className="text-blue-300" size={24} />
                            <h3 className="text-xl font-light text-white">Mundo Emocional</h3>
                        </div>
                        <motion.div variants={itemAnim} className="bg-gradient-to-br from-blue-900/20 to-transparent p-6 rounded-2xl border border-blue-500/20">
                            <div className="text-xs text-blue-300/80 uppercase tracking-widest mb-2">Lua em {report.emotional.moon.sign} • Casa {report.emotional.moon.house}</div>
                            <h4 className="text-lg font-medium text-white mb-3">Sua Natureza Instintiva</h4>
                            <p className="text-white/70 leading-relaxed text-sm">{report.emotional.moon.text}</p>
                        </motion.div>
                    </section>

                    {/* PLANETAS PESSOAIS (Mercúrio, Vênus, Marte) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="text-emerald-400" size={24} />
                            <h3 className="text-xl font-light text-white">Potenciais Pessoais</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Mercúrio */}
                            <motion.div variants={itemAnim} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 text-xs font-bold">Hg</div>
                                    <div className="text-sm font-medium text-white">Mente & Comunicação</div>
                                </div>
                                <div className="text-xs text-white/40 mb-2">Em {report.mental.mercury.sign} • Casa {report.mental.mercury.house}</div>
                                <p className="text-xs text-white/60 leading-relaxed">{report.mental.mercury.text}</p>
                            </motion.div>

                            {/* Vênus */}
                            <motion.div variants={itemAnim} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300 text-xs font-bold">Ve</div>
                                    <div className="text-sm font-medium text-white">Amor & Valores</div>
                                </div>
                                <div className="text-xs text-white/40 mb-2">Em {report.affective.venus.sign} • Casa {report.affective.venus.house}</div>
                                <p className="text-xs text-white/60 leading-relaxed">{report.affective.venus.text}</p>
                            </motion.div>

                            {/* Marte */}
                            <motion.div variants={itemAnim} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 text-xs font-bold">Ma</div>
                                    <div className="text-sm font-medium text-white">Ação & Desejo</div>
                                </div>
                                <div className="text-xs text-white/40 mb-2">Em {report.action.mars.sign} • Casa {report.action.mars.house}</div>
                                <p className="text-xs text-white/60 leading-relaxed">{report.action.mars.text}</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* PLANETAS SOCIAIS (Júpiter, Saturno) */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="text-indigo-400" size={24} />
                            <h3 className="text-xl font-light text-white">Crescimento & Estrutura</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <motion.div variants={itemAnim} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <div className="text-indigo-300 font-medium mb-1">Júpiter em {report.expansion.jupiter.sign}</div>
                                <div className="text-xs text-white/40 mb-3">Casa {report.expansion.jupiter.house}</div>
                                <p className="text-sm text-white/70">{report.expansion.jupiter.text}</p>
                            </motion.div>
                            <motion.div variants={itemAnim} className="bg-white/5 p-5 rounded-2xl border border-white/10">
                                <div className="text-slate-300 font-medium mb-1">Saturno em {report.structure.saturn.sign}</div>
                                <div className="text-xs text-white/40 mb-3">Casa {report.structure.saturn.house}</div>
                                <p className="text-sm text-white/70">{report.structure.saturn.text}</p>
                            </motion.div>
                        </div>
                    </section>

                    {/* DIGNIDADES (Se houver) */}
                    {report.dignities.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="text-yellow-500" size={24} />
                                <h3 className="text-xl font-light text-white">Dignidades Planetárias</h3>
                            </div>
                            <div className="grid gap-3">
                                {report.dignities.map((dig, idx) => (
                                    <motion.div key={idx} variants={itemAnim} className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                                        <Star className="text-yellow-500 shrink-0 mt-1" size={16} fill="currentColor" />
                                        <div>
                                            <h4 className="text-yellow-200 font-medium text-sm">{dig.planet} em {dig.type}</h4>
                                            <p className="text-white/60 text-xs mt-1">{dig.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ASPECTOS */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Hexagon className="text-rose-400" size={24} />
                            <h3 className="text-xl font-light text-white">Aspectos Principais</h3>
                        </div>
                        <div className="grid gap-3">
                            {report.aspects.map((aspect, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemAnim}
                                    className={`p-4 rounded-xl border ${aspect.type === 'Oposição' || aspect.type === 'Quadratura'
                                            ? 'bg-rose-500/5 border-rose-500/20'
                                            : 'bg-emerald-500/5 border-emerald-500/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-white font-medium text-sm">{aspect.pair}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${aspect.type === 'Oposição' || aspect.type === 'Quadratura'
                                                ? 'bg-rose-500/20 text-rose-300'
                                                : 'bg-emerald-500/20 text-emerald-300'
                                            }`}>
                                            {aspect.type}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-xs leading-relaxed">{aspect.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                </motion.div>

                <div className="mt-12 text-center text-white/30 text-xs">
                    <p>Os textos apresentados são interpretações arquetípicas. A astrologia é uma linguagem simbólica de autoconhecimento.</p>
                </div>
            </div>
        </motion.div>
    );
};
