import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check, Flame, Clock, Plus, Target, Zap, Globe, CheckCircle } from 'lucide-react';
import { ArcanoAdvanced, DiretrizEvolutiva } from '../../types';
import { getGuidelinesForArcano, CATEGORIA_LABELS, CATEGORIA_COLORS } from '../../data/evolutiveGuidelines';
import { useUserProgress } from '../../hooks/useUserProgress';
import { ActionBottomSheet } from './ActionBottomSheet';
import { cn } from '../../utils'; // Assuming cn exists or using a simple version

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

export const EvolutiveGuidelinesView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const [selectedPratica, setSelectedPratica] = useState<DiretrizEvolutiva | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const { progress, checkinGuideline, getGuidelineCheckinCount, isGuidelineCheckedToday } = useUserProgress(arcano.numero);
    const praticas = getGuidelinesForArcano(arcano.numero);

    const completedToday = praticas.filter(p => isGuidelineCheckedToday(p.id)).length;
    const totalPraticas = praticas.length;

    const openAction = (p: DiretrizEvolutiva) => {
        setSelectedPratica(p);
        setSheetOpen(true);
    };

    const priorityPratica = praticas.find(p => p.prioritaria) || praticas[0];
    const gridPraticas = praticas.filter(p => p.id !== priorityPratica?.id);

    // Fallback icon map
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Target': return <Target size={20} />;
            case 'Zap': return <Zap size={20} />;
            case 'Globe': return <Globe size={20} />;
            case 'CheckCircle': return <Check size={20} />;
            case 'Clock': return <Clock size={20} />;
            case 'Sparkles': return <Sparkles size={20} />;
            default: return <span>🎯</span>;
        }
    };

    return (
        <div className={cn("max-w-3xl mx-auto px-4 py-8", embedded ? '' : 'min-h-screen bg-[#050505]')}>
            {/* 1. HEADER ACIONÁVEL */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-white mb-1">Práticas de Integração</h2>
                    <p className="text-white/50 text-sm">
                        Ações concretas para viver o arcano hoje • {completedToday}/{totalPraticas} realizadas
                    </p>
                </div>
                {!embedded && (
                    <button className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {/* GAMIFICAÇÃO: Barra de progresso diária */}
            <div className="mb-8">
                <div className="flex justify-between text-xs text-white/40 mb-2 uppercase tracking-wider">
                    <span>Progresso de hoje</span>
                    <span className="text-teal-400 font-bold">{completedToday}/{totalPraticas} práticas</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedToday / totalPraticas) * 100}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
            </div>

            {/* GAMIFICAÇÃO: Streak e Conquistas */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full whitespace-nowrap">
                    <Flame size={16} className="text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">{progress.streakAtual} dias seguidos</span>
                </div>

                {progress.maiorStreak >= 5 && (
                    <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full whitespace-nowrap">
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="text-purple-400 text-sm">Integrador Focado</span>
                    </div>
                )}
            </div>

            {/* 2. SISTEMA DE CARDS DE AÇÃO */}

            {/* OPÇÃO A: Card Principal do Dia (Destaque) */}
            {priorityPratica && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => openAction(priorityPratica)}
                    className="relative bg-gradient-to-br from-teal-900/30 to-purple-900/30 border border-teal-500/30 rounded-[2rem] p-8 mb-8 cursor-pointer group hover:border-teal-500/50 transition-all overflow-hidden"
                >
                    <div className="absolute top-6 right-6">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
                            Prática Prioritária
                        </span>
                    </div>

                    <div className="flex items-center gap-5 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 flex items-center justify-center text-3xl shadow-inner">
                            {getIcon(priorityPratica.icone)}
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-2xl group-hover:text-teal-300 transition-colors">
                                {priorityPratica.titulo}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock size={14} className="text-white/30" />
                                <span className="text-white/40 text-xs">{priorityPratica.tempo || '5 min'}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-white/70 text-base mb-8 leading-relaxed italic">
                        {priorityPratica.descricao}
                    </p>

                    <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-teal-600 hover:bg-teal-500 rounded-2xl text-white font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-teal-900/40">
                            <Check size={20} />
                            Fiz isso agora
                        </button>
                        <button className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-2xl text-white/40 flex items-center justify-center transition-all">
                            <Clock size={20} />
                        </button>
                    </div>
                </motion.div>
            )}

            {/* OPÇÃO B: Grid de Micro-Ações Rápidas */}
            <div className="grid grid-cols-2 gap-4">
                {gridPraticas.map((pratica, idx) => {
                    const feita = isGuidelineCheckedToday(pratica.id);
                    return (
                        <motion.button
                            key={pratica.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => openAction(pratica)}
                            className={cn(
                                "p-5 rounded-2xl border text-left transition-all active:scale-95 relative overflow-hidden group",
                                feita
                                    ? "bg-emerald-500/10 border-emerald-500/30"
                                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                            )}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    feita ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/60"
                                )}>
                                    {getIcon(pratica.icone)}
                                </div>
                                {feita && <CheckCircle size={18} className="text-emerald-400" />}
                            </div>

                            <h4 className={cn(
                                "font-serif text-base mb-2 group-hover:text-teal-300 transition-colors",
                                feita ? "text-emerald-400 line-through opacity-60" : "text-white"
                            )}>
                                {pratica.titulo}
                            </h4>

                            <p className="text-white/40 text-[11px] leading-snug line-clamp-2 mb-4">
                                {pratica.descricao}
                            </p>

                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-white/20">
                                <Clock size={12} />
                                {pratica.tempo || '5 min'}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* 3. SISTEMA DE CHECK-IN IMEDIATO (Action Sheet) */}
            <ActionBottomSheet
                isOpen={sheetOpen}
                onClose={() => setSheetOpen(false)}
                pratica={selectedPratica}
                onComplete={() => selectedPratica && checkinGuideline(selectedPratica.id)}
            />
        </div>
    );
};
