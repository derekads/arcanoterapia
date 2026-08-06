import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Wind, Headphones, Play, Pause, Info, Sparkles, Volume2, Mic } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { cn } from '../../utils';

interface Props {
    arcano: ArcanoAdvanced;
}

export const SoundTherapyView: React.FC<Props> = ({ arcano }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
            {/* HEADER: FREQUÊNCIA & NOTA */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 flex flex-col items-center text-center group"
                >
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Volume2 className="text-amber-500" size={32} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500/60 mb-2">Frequência Solfeggio</h3>
                    <p className="text-4xl font-serif text-white">{arcano.frequencia}Hz</p>
                    <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                        Esta frequência ressoa com a energia d{arcano.nome}, auxiliando na {arcano.numero === 0 ? 'limpeza de medos' : 'ativação do potencial'}.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 flex flex-col items-center text-center group"
                >
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Music className="text-indigo-500" size={32} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400/60 mb-2">Nota Musical Regente</h3>
                    <p className="text-4xl font-serif text-white">{arcano.nota_musical || 'N/A'}</p>
                    <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                        Vibre nesta nota para sintonizar seu corpo físico com o arquétipo.
                    </p>
                </motion.div>
            </section>

            {/* MEDITAÇÃO GUIADA */}
            <section>
                <div className="relative rounded-[2.5rem] bg-slate-900/40 border border-white/5 overflow-hidden p-8 md:p-12">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Mic size={160} className="text-white" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Headphones className="text-amber-500" size={24} />
                            <h2 className="text-2xl font-serif text-white">Meditação do Arcano</h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-xl text-slate-200 font-light leading-relaxed italic">
                                "{arcano.meditacao_guiada}"
                            </p>

                            <div className="pt-6 flex flex-wrap gap-4">
                                {isPlaying ? (
                                    <div className="flex items-end gap-1 px-4 h-12">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(bar => (
                                            <motion.div
                                                key={bar}
                                                animate={{
                                                    height: [8, 24, 12, 32, 16],
                                                }}
                                                transition={{
                                                    duration: 0.8 + Math.random() * 0.5,
                                                    repeat: Infinity,
                                                    repeatType: 'reverse',
                                                    delay: bar * 0.1
                                                }}
                                                className="w-1.5 rounded-full bg-amber-500/60"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                                    >
                                        <Play size={20} fill="currentColor" />
                                        Iniciar Meditação
                                    </button>
                                )}

                                {isPlaying && (
                                    <button
                                        onClick={() => setIsPlaying(false)}
                                        className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors uppercase tracking-widest text-xs font-bold"
                                    >
                                        Parar
                                    </button>
                                )}

                                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-xs font-medium uppercase tracking-widest">
                                    <Wind size={16} />
                                    Foco: {arcano.chacra_regente || 'Equilíbrio'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RECOMENDAÇÕES MUSICAIS */}
            {arcano.musicas_recomendadas && arcano.musicas_recomendadas.length > 0 && (
                <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-white/10" />
                        Playlist Alquímica
                        <span className="w-12 h-[1px] bg-white/10" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {arcano.musicas_recomendadas.map((music, i) => (
                            <div key={music} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 group hover:bg-white/[0.05] transition-all">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                                    {i + 1}
                                </div>
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{music}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* DAILY TIP */}
            {arcano.conselho_diario && arcano.conselho_diario.length > 0 && (
                <section className="bg-amber-900/10 border border-amber-500/20 rounded-3xl p-8">
                    <h3 className="text-amber-500 font-serif text-xl mb-4 flex items-center gap-3">
                        <Sparkles size={20} />
                        Ritual de Sintonia
                    </h3>
                    <ul className="space-y-4">
                        {arcano.conselho_diario.map((tip, i) => (
                            <li key={i} className="flex gap-4 text-slate-300 text-sm font-light">
                                <span className="text-amber-500 font-bold">{i + 1}.</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
