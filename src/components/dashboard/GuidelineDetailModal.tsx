import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, CheckCircle, Calendar } from 'lucide-react';
import { DiretrizEvolutiva } from '../../types';
import { CATEGORIA_LABELS } from '../../data/evolutiveGuidelines';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    diretriz: DiretrizEvolutiva | null;
    checkinCount: number;
    isCheckedToday: boolean;
    onCheckin: () => void;
}

export const GuidelineDetailModal: React.FC<Props> = ({
    isOpen,
    onClose,
    diretriz,
    checkinCount,
    isCheckedToday,
    onCheckin,
}) => {
    if (!isOpen || !diretriz) return null;

    const categoryLabel = CATEGORIA_LABELS[diretriz.categoria] || diretriz.categoria;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    {/* Colored top bar */}
                    <div className="h-1" style={{ backgroundColor: diretriz.corCard }} />

                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <span
                                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-sans mb-3"
                                    style={{
                                        backgroundColor: `${diretriz.corCard}15`,
                                        color: diretriz.corCard,
                                        border: `1px solid ${diretriz.corCard}30`
                                    }}
                                >
                                    {categoryLabel}
                                </span>
                                <h3 className="text-xl font-serif text-white mb-2">{diretriz.titulo}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4 text-white/60" />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 pb-4">
                        <p className="text-sm text-white/60 font-sans leading-relaxed">
                            {diretriz.descricao}
                        </p>
                    </div>

                    {/* Practical Action Box */}
                    <div className="mx-6 mb-4 p-4 rounded-xl border border-white/5 bg-white/5">
                        <h4 className="text-xs font-sans text-white/40 uppercase tracking-wider mb-2">
                            🎯 Ação Prática
                        </h4>
                        <p className="text-sm text-white/70 font-sans leading-relaxed">
                            {diretriz.acaoPratica}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mx-6 mb-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-white/30" />
                            <span className="text-sm text-white/40 font-sans">
                                {checkinCount} check-in{checkinCount !== 1 ? 's' : ''} realizados
                            </span>
                        </div>
                        {checkinCount >= 3 && (
                            <div className="flex items-center gap-1">
                                <Flame className="w-4 h-4 text-orange-400" />
                                <span className="text-sm text-orange-400 font-sans font-medium">
                                    Em série!
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Check-in Button */}
                    {diretriz.checkinDiario && (
                        <div className="p-6 border-t border-white/5">
                            <button
                                onClick={() => { if (!isCheckedToday) onCheckin(); }}
                                disabled={isCheckedToday}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans font-medium text-sm transition-all ${isCheckedToday
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                                        : 'bg-gradient-to-r text-white hover:shadow-lg'
                                    }`}
                                style={!isCheckedToday ? {
                                    backgroundImage: `linear-gradient(to right, ${diretriz.corCard}, ${diretriz.corCard}CC)`,
                                    boxShadow: `0 4px 14px ${diretriz.corCard}30`
                                } : undefined}
                            >
                                <CheckCircle className="w-4 h-4" />
                                {isCheckedToday ? 'Check-in realizado hoje ✓' : 'Pratiquei hoje!'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
