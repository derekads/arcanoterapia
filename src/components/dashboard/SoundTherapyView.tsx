import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Wind, Headphones, Play, Pause, Info, Sparkles, Volume2, Mic } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { cn } from '../../utils';
import { deArcano } from '../../utils/calculos';
import { useFrequencyTone } from '../../hooks/useFrequencyTone';

interface Props {
    arcano: ArcanoAdvanced;
}

export const SoundTherapyView: React.FC<Props> = ({ arcano }) => {
    const frequenciaHz = parseInt(String(arcano.frequencia), 10) || 432;
    const { tocando, niveis, alternar, suportado } = useFrequencyTone({ frequencia: frequenciaHz });

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
                        Esta frequência ressoa com a energia {deArcano(arcano.nome)}, auxiliando na {arcano.numero === 22 ? 'limpeza de medos' : 'ativação do potencial'}.
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

                            <div className="pt-6 flex flex-wrap items-center gap-4">
                                <button
                                    onClick={alternar}
                                    disabled={!suportado}
                                    aria-pressed={tocando}
                                    className={cn(
                                        "flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all",
                                        tocando
                                            ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                            : "bg-amber-500 text-black hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.3)]",
                                        !suportado && "opacity-40 cursor-not-allowed"
                                    )}
                                >
                                    {tocando ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                    {tocando ? `Tocando ${frequenciaHz}Hz` : 'Iniciar Meditação'}
                                </button>

                                {/* Visualizador ligado ao analisador: reflete o som real. */}
                                {tocando && (
                                    <div className="flex items-end gap-1 px-4 h-12" aria-hidden>
                                        {niveis.map((nivel, i) => (
                                            <div
                                                key={i}
                                                className="w-1.5 rounded-full bg-amber-500/60 transition-[height] duration-100"
                                                style={{ height: `${8 + nivel * 32}px` }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {tocando && (
                                    <span className="text-[10px] uppercase tracking-widest text-white/30">
                                        Use fones para sentir a vibração
                                    </span>
                                )}

                                {!suportado && (
                                    <span className="text-[11px] text-white/40">
                                        Seu navegador não permite gerar áudio nesta página.
                                    </span>
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
