import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sun, Crown, Flame } from 'lucide-react';

interface DecanateRevealProps {
    planet: string;
    sign: string;
    degree: number;
    isExpanded: boolean;
    combinationData?: {
        decanModifiers: {
            decan1: { ruler: string; effect: string; shadow: string };
            decan2: { ruler: string; effect: string; shadow: string };
            decan3: { ruler: string; effect: string; shadow: string };
        };
    };
}

export const DecanateReveal: React.FC<DecanateRevealProps> = ({
    degree, isExpanded, combinationData
}) => {
    const getDecanate = (deg: number) => {
        const num = Math.floor(deg / 10) + 1;
        return {
            number: num,
            startDeg: (num - 1) * 10,
            endDeg: num * 10,
            data: num === 1 ? combinationData?.decanModifiers.decan1 :
                num === 2 ? combinationData?.decanModifiers.decan2 :
                    combinationData?.decanModifiers.decan3
        };
    };

    const decan = getDecanate(degree);

    const config = {
        1: { icon: Flame, color: 'from-red-500 to-orange-600', label: 'Semente', keyword: 'Impulso' },
        2: { icon: Sun, color: 'from-amber-400 to-yellow-600', label: 'Floração', keyword: 'Brilho' },
        3: { icon: Crown, color: 'from-purple-500 to-indigo-600', label: 'Frutificação', keyword: 'Maestria' }
    };

    // Safe fallback if number goes out of 1-3 bounds somehow
    const decanNumber = Math.max(1, Math.min(3, decan.number));
    const Icon = config[decanNumber as keyof typeof config].icon;
    const colors = config[decanNumber as keyof typeof config].color;

    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                >
                    <div className="relative bg-gradient-to-br from-slate-900/90 via-black/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6 shadow-[0_0_40px_rgba(245,158,11,0.15)]">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-full bg-gradient-to-br ${colors} shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-amber-400 font-bold text-lg tracking-wider uppercase">
                                        Decanato {decan.number}º
                                    </h4>
                                    <p className="text-amber-200/60 text-sm">
                                        {config[decanNumber as keyof typeof config].label}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <span className="text-2xl font-bold text-white">
                                    {decan.startDeg}° - {decan.endDeg}°
                                </span>
                                <p className="text-xs text-amber-400/60 uppercase tracking-widest mt-1">
                                    Regência: {decan.data?.ruler}
                                </p>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <h5 className="text-amber-300 text-sm font-semibold mb-2 uppercase tracking-wider">
                                    Efeito Sutil
                                </h5>
                                <p className="text-slate-200 leading-relaxed">
                                    {decan.data?.effect}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl p-4 border border-red-500/20">
                                <h5 className="text-red-300 text-sm font-semibold mb-2 uppercase tracking-wider">
                                    Sombra do Decanato
                                </h5>
                                <p className="text-slate-300 leading-relaxed">
                                    {decan.data?.shadow}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex justify-between text-xs text-amber-400/60 mb-2 uppercase tracking-widest">
                                <span>Início do Decanato</span>
                                <span>Seu Grau: {degree}°</span>
                                <span>Fim</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((degree % 10) / 10) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className={`h-full bg-gradient-to-r ${colors}`}
                                />
                            </div>
                        </div>

                        {/* Keyword Badge */}
                        <div className="mt-4 flex justify-center">
                            <span className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-sm font-medium">
                                {config[decanNumber as keyof typeof config].keyword} Ativo
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
