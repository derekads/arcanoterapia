
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Ghost, Flame, Map, Book, Gem, Sun, CheckCircle2 } from 'lucide-react';
import { ArcanoAdvanced, UserBirthData, UserProgress } from '../../types';
import { cn } from '../../utils';
import { useUserProgress } from '../../hooks/useUserProgress';
import { MAJOR_ARCANA } from '../../lib/cardImages';

interface Props {
    arcano: ArcanoAdvanced;
    userData: UserBirthData;
    onNavigate: (view: any) => void;
    openExpanded: (tab: any) => void;
}

export const OracleView: React.FC<Props> = ({ arcano, userData, onNavigate, openExpanded }) => {
    const { progress } = useUserProgress(arcano.numero);

    return (
        <div className="pb-32">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex flex-col justify-end p-8 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={MAJOR_ARCANA[arcano.numero]?.file || "/Cards/00-TheFool.jpg"}
                        alt={arcano.nome}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent" />
                </motion.div>

                <div className="relative z-10 space-y-2">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] uppercase tracking-[0.2em] text-amber-500/60 font-bold"
                    >
                        Arcano Pessoal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent uppercase"
                    >
                        {arcano.nome}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/40 text-lg font-light tracking-wide"
                    >
                        {arcano.numeroRomano} • {arcano.elemento} • {arcano.planeta}
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openExpanded('essencia')}
                        className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-all"
                    >
                        Expandir Visão <ArrowUpRight size={16} />
                    </motion.button>
                </div>
            </section>

            {/* CARROSSEL: JORNADA INICIADA */}
            <section className="mt-8">
                <h2 className="text-xl font-light text-white/80 px-8 mb-6 tracking-wide">Continuar Jornada</h2>
                <div className="flex gap-4 overflow-x-auto px-8 pb-8 no-scrollbar snap-x snap-mandatory">
                    <JourneyCard
                        title="Mandala do Equilíbrio"
                        subtitle="Q1 • 2 dias atrás"
                        progress={85}
                        icon={Sparkles}
                        color="text-amber-400"
                        bg="bg-amber-400/10"
                        onClick={() => openExpanded('roda')}
                    />
                    <JourneyCard
                        title="Alquimia das Sombras"
                        subtitle={`${progress.sombrasIntegradas.length}/22 Integradas`}
                        progress={progress.percentualIntegracao}
                        icon={Ghost}
                        color="text-rose-400"
                        bg="bg-rose-400/10"
                        onClick={() => openExpanded('sombras')}
                    />
                    <JourneyCard
                        title="Compromissos com o Destino"
                        subtitle={`Streak ${progress.streakAtual} dias`}
                        progress={Math.min((progress.checkinsDiarios.length / 7) * 100, 100)}
                        icon={Flame}
                        color="text-emerald-400"
                        bg="bg-emerald-400/10"
                        onClick={() => openExpanded('diretrizes')}
                    />
                    <JourneyCard
                        title="Linha do Destino"
                        subtitle="Fase Adulta • 33 anos"
                        progress={45}
                        icon={Map}
                        color="text-indigo-400"
                        bg="bg-indigo-400/10"
                        onClick={() => onNavigate('TIMELINE')}
                    />
                    <JourneyCard
                        title="Diário do Ser"
                        subtitle={progress.journalEntries.length > 0 ? `Última: ${new Date(progress.journalEntries[0].data).toLocaleDateString()}` : 'Sem registros'}
                        progress={0}
                        icon={Book}
                        color="text-violet-400"
                        bg="bg-violet-400/10"
                        onClick={() => openExpanded('jornal')}
                    />
                </div>
            </section>

            {/* GRID: PRÁTICAS DIÁRIAS */}
            <section className="mt-4 px-8">
                <h2 className="text-xl font-light text-white/80 mb-6 tracking-wide">Práticas Diárias</h2>
                <div className="grid grid-cols-2 gap-4">
                    <PracticeCard
                        title="Botica Sagrada"
                        desc={`${arcano.alquimia?.cristal || arcano.cristais?.[0] || 'Cristal'} ativo`}
                        icon={Gem}
                        color="text-purple-400"
                        bg="bg-purple-900/20"
                        onClick={() => openExpanded('farmacia')}
                    />
                    <PracticeCard
                        title="Palavras de Poder"
                        desc="Afirmação do Dia"
                        icon={Sun}
                        color="text-amber-400"
                        bg="bg-amber-900/20"
                        onClick={() => openExpanded('afirmacoes')}
                    />
                </div>
            </section>

            {/* JUNGIAN REFLECTION */}
            {arcano.pergunta_junguiana && (
                <section className="mt-12 px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles size={120} className="text-indigo-400" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400/60 mb-4 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-indigo-500/30" />
                                Pergunta Junguiana
                            </h3>
                            <p className="text-xl md:text-2xl font-serif text-white/90 leading-relaxed italic pr-12">
                                "{arcano.pergunta_junguiana}"
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-[10px] text-indigo-400/40 uppercase tracking-widest font-bold">
                                <Book size={12} />
                                Auto-investigação Profunda
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}
        </div>
    );
};

const JourneyCard = ({ title, subtitle, progress, icon: Icon, color, bg, onClick }: any) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex-shrink-0 w-72 aspect-[16/9] relative rounded-3xl bg-[#0f0f15] border border-white/5 overflow-hidden group snap-start"
    >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        <div className="absolute top-4 right-4 z-20">
            <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <span className="text-[10px] font-bold text-white">{progress}%</span>
            </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Icon size={80} className={color} />
        </div>

        <div className="absolute bottom-6 left-6 z-20 text-left">
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest">{subtitle}</p>
        </div>
    </motion.button>
);

const PracticeCard = ({ title, desc, icon: Icon, color, bg, onClick }: any) => (
    <motion.button
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
            "p-6 rounded-[2.5rem] border border-white/5 flex flex-col gap-4 text-left transition-all",
            bg
        )}
    >
        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center bg-black/20", color)}>
            <Icon size={20} />
        </div>
        <div>
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none">{desc}</p>
        </div>
    </motion.button>
);
