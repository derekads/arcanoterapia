import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, AlertTriangle, Clock, Play, Pause, RotateCcw, BookOpen, Flame, Zap, AlertCircle } from 'lucide-react';
import { ShadowPattern, FrequenciaSombra } from '../../types';
import clsx from 'clsx';

interface Props {
    pattern: ShadowPattern;
    isIntegrated: boolean;
    onToggleIntegration: () => void;
    onOpenJournal: () => void;
}

const SEVERITY_CONFIG: Record<FrequenciaSombra, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
    BAIXA: { label: 'Leve', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <Zap className="w-3 h-3" /> },
    MEDIA: { label: 'Moderada', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <AlertCircle className="w-3 h-3" /> },
    ALTA: { label: 'Intensa', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: <AlertTriangle className="w-3 h-3" /> },
    CRONICA: { label: 'Crônica', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <Flame className="w-3 h-3" /> },
};

export const ShadowPatternCard: React.FC<Props> = ({
    pattern,
    isIntegrated,
    onToggleIntegration,
    onOpenJournal,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(pattern.exercicioPratico.duracaoMinutos * 60);
    const [timerCompleted, setTimerCompleted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const severity = SEVERITY_CONFIG[pattern.frequenciaSombra];

    useEffect(() => {
        if (timerActive && timerSeconds > 0) {
            timerRef.current = setInterval(() => {
                setTimerSeconds(prev => {
                    if (prev <= 1) {
                        setTimerActive(false);
                        setTimerCompleted(true);
                        if (timerRef.current) clearInterval(timerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerActive, timerSeconds]);

    const formatTime = (s: number) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const resetTimer = () => {
        setTimerActive(false);
        setTimerCompleted(false);
        setTimerSeconds(pattern.exercicioPratico.duracaoMinutos * 60);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                'rounded-2xl border overflow-hidden transition-all duration-300',
                isIntegrated
                    ? 'bg-gradient-to-br from-rose-950/30 to-slate-900/50 border-rose-500/30'
                    : 'bg-slate-900/60 border-white/10 hover:border-rose-400/30'
            )}
        >
            {/* Card Header */}
            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Integration Checkbox */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleIntegration(); }}
                        className={clsx(
                            'mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300',
                            isIntegrated
                                ? 'bg-rose-500 border-rose-500 shadow-lg shadow-rose-500/30'
                                : 'border-white/20 hover:border-rose-400/50'
                        )}
                    >
                        {isIntegrated && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h3 className={clsx(
                                'text-base font-serif font-semibold transition-colors',
                                isIntegrated ? 'text-rose-300 line-through opacity-60' : 'text-white'
                            )}>
                                {pattern.nomePadrao}
                            </h3>
                            <span className={clsx(
                                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-sans',
                                severity.bg, severity.border, severity.color, 'border'
                            )}>
                                {severity.icon}
                                {severity.label}
                            </span>
                        </div>
                        <p className="text-sm text-white/50 font-sans leading-relaxed line-clamp-2">
                            {pattern.descricao}
                        </p>
                    </div>

                    {/* Expand Toggle */}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-1 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all flex-shrink-0"
                    >
                        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className="w-4 h-4 text-white/40" />
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
                            {/* Warning Signs */}
                            <div>
                                <h4 className="text-xs font-sans text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                                    Sinais de Atenção
                                </h4>
                                <div className="space-y-2">
                                    {pattern.sinaisAtencao.map((sinal, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400/50 mt-2 flex-shrink-0" />
                                            <span className="text-sm text-white/50 font-sans">{sinal}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Antidote / Cure */}
                            <div className="bg-gradient-to-r from-emerald-950/30 to-transparent rounded-xl p-4 border border-emerald-500/10">
                                <h4 className="text-xs font-sans text-emerald-400/80 uppercase tracking-wider mb-2">
                                    💊 Antídoto
                                </h4>
                                <p className="text-sm text-white/60 font-sans leading-relaxed">
                                    {pattern.antidoto}
                                </p>
                            </div>

                            {/* Practical Exercise */}
                            <div className="bg-slate-800/40 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-sans text-white/40 uppercase tracking-wider flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5" />
                                        Exercício: {pattern.exercicioPratico.titulo}
                                    </h4>
                                    <span className="text-xs text-white/30 font-sans">
                                        {pattern.exercicioPratico.duracaoMinutos} min
                                    </span>
                                </div>

                                {/* Instructions */}
                                <ol className="space-y-2 mb-4">
                                    {pattern.exercicioPratico.instrucoes.map((inst, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-xs font-bold text-rose-400/60 mt-0.5 flex-shrink-0 w-4">
                                                {i + 1}.
                                            </span>
                                            <span className="text-sm text-white/50 font-sans">{inst}</span>
                                        </li>
                                    ))}
                                </ol>

                                {/* Materials */}
                                {pattern.exercicioPratico.materialNecessario.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {pattern.exercicioPratico.materialNecessario.map((mat, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/30 font-sans border border-white/5">
                                                {mat}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Timer */}
                                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                                    <div className={clsx(
                                        'text-lg font-mono font-bold tabular-nums',
                                        timerCompleted ? 'text-emerald-400' : timerActive ? 'text-rose-400' : 'text-white/40'
                                    )}>
                                        {timerCompleted ? '✓ Completo!' : formatTime(timerSeconds)}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setTimerActive(!timerActive)}
                                            disabled={timerCompleted}
                                            className={clsx(
                                                'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                                                timerActive
                                                    ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                                                    : 'bg-white/5 text-white/40 hover:bg-white/10',
                                                timerCompleted && 'opacity-40 cursor-not-allowed'
                                            )}
                                        >
                                            {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={resetTimer}
                                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white/50 transition-all"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Journal Button */}
                            <button
                                onClick={onOpenJournal}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300/80 hover:bg-rose-500/10 hover:text-rose-300 transition-all text-sm font-sans"
                            >
                                <BookOpen className="w-4 h-4" />
                                Abrir Jornal da Sombra
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
