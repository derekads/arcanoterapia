import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Heart, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { ArcanoAdvanced, TipoAfirmacao } from '../../types';
import { getDailyAffirmations, getAffirmationsForArcano } from '../../data/affirmations';

const TYPE_CONFIG: Record<TipoAfirmacao, { label: string; icon: React.FC<{ className?: string }>; color: string }> = {
    MANHA: { label: 'Manhã', icon: Sun, color: '#F59E0B' },
    NOITE: { label: 'Noite', icon: Moon, color: '#8B5CF6' },
    CRISIS: { label: 'Crise', icon: AlertTriangle, color: '#EF4444' },
    PROSPERIDADE: { label: 'Prosperidade', icon: TrendingUp, color: '#10B981' },
    AMOR: { label: 'Amor', icon: Heart, color: '#F43F5E' },
};

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

export const DailyAffirmationView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const [selectedType, setSelectedType] = useState<TipoAfirmacao | null>(null);
    const [shuffleKey, setShuffleKey] = useState(0);

    const allAffirmations = useMemo(() => getAffirmationsForArcano(arcano.numero), [arcano.numero]);
    const dailyAffirmations = useMemo(() => getDailyAffirmations(arcano.numero, 3), [arcano.numero, shuffleKey]);

    const displayAffirmations = selectedType
        ? allAffirmations.filter(a => a.tipo === selectedType)
        : dailyAffirmations;

    const shuffle = () => setShuffleKey(k => k + 1);

    return (
        <div className={embedded ? 'relative overflow-hidden' : 'min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden'}>
            {/* Breathing Animation - Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)' }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </div>

            {/* Header */}
            {!embedded && (
                <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 relative">
                    <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <Sun className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h1 className="text-lg font-serif text-white">Afirmações</h1>
                                <p className="text-xs text-white/40 font-sans">{arcano.numeroRomano} — {arcano.nome}</p>
                            </div>
                        </div>
                        <button
                            onClick={shuffle}
                            className="ml-auto w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            title="Novas afirmações"
                        >
                            <RefreshCw className="w-4 h-4 text-white/40" />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
                {/* Type Filters */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <button
                        onClick={() => setSelectedType(null)}
                        className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${selectedType === null
                            ? 'bg-mystic-gold/20 text-mystic-gold border border-mystic-gold/30'
                            : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                            }`}
                    >
                        ✨ Diárias
                    </button>
                    {Object.entries(TYPE_CONFIG).map(([type, config]) => {
                        const Icon = config.icon;
                        return (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type as TipoAfirmacao)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all ${selectedType === type
                                    ? 'border'
                                    : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                                    }`}
                                style={selectedType === type ? {
                                    backgroundColor: `${config.color}15`,
                                    color: config.color,
                                    borderColor: `${config.color}30`,
                                } : undefined}
                            >
                                <Icon className="w-3 h-3" />
                                {config.label}
                            </button>
                        );
                    })}
                </div>

                {/* Affirmation Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedType}-${shuffleKey}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {displayAffirmations.length > 0 ? (
                            displayAffirmations.map((aff, idx) => {
                                const config = TYPE_CONFIG[aff.tipo];
                                const Icon = config.icon;
                                return (
                                    <motion.div
                                        key={aff.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.15 }}
                                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6"
                                    >
                                        {/* Type indicator */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div
                                                className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: `${config.color}15` }}
                                            >
                                                <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                                            </div>
                                            <span
                                                className="text-xs font-sans"
                                                style={{ color: `${config.color}AA` }}
                                            >
                                                {config.label}
                                            </span>
                                        </div>

                                        {/* Affirmation text */}
                                        <p className="text-base text-white/80 font-sans leading-relaxed italic">
                                            "{aff.texto}"
                                        </p>

                                        {/* Decorative glow */}
                                        <div
                                            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5"
                                            style={{ backgroundColor: config.color }}
                                        />
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-white/30 font-sans text-sm">
                                    Nenhuma afirmação disponível para este arcano nesta categoria.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Breathing instruction */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center text-xs text-white/20 font-sans mt-12"
                >
                    Respire fundo e repita cada afirmação 3 vezes em voz alta ou silenciosamente
                </motion.p>
            </div>
        </div>
    );
};
