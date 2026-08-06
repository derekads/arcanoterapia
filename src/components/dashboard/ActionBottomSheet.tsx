import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock } from 'lucide-react';
import { DiretrizEvolutiva } from '../../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    pratica: DiretrizEvolutiva | null;
    onComplete: () => void;
}

export const ActionBottomSheet: React.FC<Props> = ({
    isOpen,
    onClose,
    pratica,
    onComplete,
}) => {
    const [timer, setTimer] = useState<number>(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        if (pratica?.tempo && pratica.temTimer) {
            const minutes = parseInt(pratica.tempo);
            if (!isNaN(minutes)) {
                setTimer(minutes * 60);
            }
        }
    }, [pratica]);

    useEffect(() => {
        let interval: any;
        if (isTimerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timer]);

    if (!pratica) return null;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[101] bg-[#1a1a2e] border-t border-white/10 p-6 rounded-t-[2.5rem] shadow-2xl max-w-2xl mx-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-serif text-xl">{pratica.titulo}</h3>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X size={24} className="text-white/40" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                                <h4 className="text-teal-400 text-xs uppercase tracking-widest font-bold mb-2">Ação Prática</h4>
                                <p className="text-white text-base leading-relaxed">{pratica.acaoPratica}</p>
                            </div>

                            {/* Timer Embutido (se aplicável) */}
                            {pratica.temTimer && (
                                <div className="flex flex-col items-center justify-center py-6 bg-white/5 rounded-2xl">
                                    <div className="text-5xl font-mono text-white font-light mb-4">
                                        {formatTime(timer)}
                                    </div>
                                    <button
                                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                                        className="px-6 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                    >
                                        {isTimerRunning ? 'Pausar Timer' : 'Começar Timer'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 pb-4">
                            <button
                                onClick={() => {
                                    onComplete();
                                    onClose();
                                }}
                                className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl text-white font-bold text-lg hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                Marcar como Realizado
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-white/5 rounded-xl text-white/60 text-sm font-medium hover:bg-white/10 transition-all"
                            >
                                Preciso fazer depois (salvar na fila)
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
