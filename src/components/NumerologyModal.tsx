
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator } from 'lucide-react';
import { getNumerologyDetails } from '../utils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    name: string;
}

export const NumerologyModal: React.FC<Props> = ({ isOpen, onClose, name }) => {
    if (!isOpen) return null;

    const details = getNumerologyDetails(name);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px]" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <Calculator className="text-purple-300 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-white">Numerologia do Nome</h2>
                            <p className="text-sm text-white/40">Cálculo do Arcano Pessoal</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <label className="text-xs text-white/40 uppercase font-bold tracking-widest block mb-2">Nome Analisado</label>
                            <div className="text-lg text-white font-mono tracking-wide break-words">
                                {details.cleanName}
                            </div>
                            <div className="mt-2 text-xs text-purple-300">
                                Total de letras: <span className="font-bold">{details.initialValue}</span>
                            </div>
                        </div>

                        <div className="relative pl-4 border-l-2 border-white/10 space-y-3">
                            {details.steps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="text-sm text-white/70"
                                >
                                    {step}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-white/60 text-sm">Arcano Resultante</span>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-serif text-purple-400 font-bold">{details.finalValue}</span>
                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                                    {details.finalValue === 22 ? "O Louco (22)" : `Arcano ${details.finalValue}`}
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-white/30 text-center mt-4">
                            Baseado na redução teosófica para os 22 Arcanos Maiores.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
