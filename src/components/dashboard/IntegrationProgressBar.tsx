import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    percentage: number;
    integrated: number;
    total: number;
}

function getProgressColor(pct: number): string {
    if (pct <= 25) return 'from-red-600 to-red-500';
    if (pct <= 50) return 'from-red-500 to-orange-500';
    if (pct <= 75) return 'from-orange-500 to-yellow-500';
    return 'from-yellow-500 to-amber-400';
}

function getProgressGlow(pct: number): string {
    if (pct <= 25) return 'rgba(239,68,68,0.4)';
    if (pct <= 50) return 'rgba(249,115,22,0.4)';
    if (pct <= 75) return 'rgba(234,179,8,0.4)';
    return 'rgba(212,175,55,0.5)';
}

function getStatusText(pct: number): string {
    if (pct === 0) return 'Inicie sua jornada de integração';
    if (pct <= 25) return 'O reconhecimento é o primeiro passo da cura';
    if (pct <= 50) return 'Você está confrontando suas sombras com coragem';
    if (pct <= 75) return 'A integração está se aprofundando';
    if (pct < 100) return 'Quase lá — a transformação está próxima';
    return '✨ Todas as sombras foram integradas!';
}

export const IntegrationProgressBar: React.FC<Props> = ({ percentage, integrated, total }) => {
    const colorClass = getProgressColor(percentage);
    const glowColor = getProgressGlow(percentage);
    const statusText = getStatusText(percentage);

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-sans text-white/60">Integração das Sombras</span>
                <span className="text-sm font-sans text-white/80 font-bold">
                    {integrated} de {total} padrões
                </span>
            </div>

            <div className="relative h-3 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ boxShadow: `0 0 12px ${glowColor}` }}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-white/40 font-sans italic">
                    {statusText}
                </p>
                <span className="text-xs font-bold text-white/60">{percentage}%</span>
            </div>
        </div>
    );
};
