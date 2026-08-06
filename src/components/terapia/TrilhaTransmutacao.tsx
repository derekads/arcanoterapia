import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Sprout, Lock, CheckCircle2 } from 'lucide-react';
import { useArcano } from '../../context/ArcanoContext';

/**
 * TRILHA DE TRANSMUTAÇÃO
 * UI Estilo Skill Tree para Trabalho de Sombras
 */

interface TrailNodeProps {
    index: number;
    title: string;
    description: string;
    isLocked: boolean;
    isCompleted: boolean;
}

const TrailNode: React.FC<TrailNodeProps> = ({ index, title, description, isLocked, isCompleted }) => (
    <div className="relative flex flex-col items-center group">
        {/* Conector Vertical */}
        {index > 0 && (
            <div className={`absolute -top-12 w-0.5 h-12 ${isCompleted ? 'bg-amber-500/40' : 'bg-white/10'}`} />
        )}

        <motion.div
            whileHover={!isLocked ? { scale: 1.05 } : {}}
            className={`
                w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-all duration-500
                ${isCompleted ? 'bg-amber-500/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' :
                    isLocked ? 'bg-white/5 border-white/10 opacity-40' : 'bg-white/10 border-white/20 cursor-pointer hover:border-amber-500/40'}
                border-2
            `}
        >
            {isCompleted ? <CheckCircle2 className="text-amber-400" size={24} /> :
                isLocked ? <Lock className="text-slate-500" size={20} /> :
                    index === 0 ? <Flame className="text-amber-500" size={24} /> :
                        index === 1 ? <Sparkles className="text-amber-400" size={24} /> :
                            <Sprout className="text-emerald-400" size={24} />}

            {/* Glow Aura */}
            {!isLocked && !isCompleted && (
                <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full animate-pulse" />
            )}
        </motion.div>

        <div className="mt-4 text-center max-w-[200px]">
            <h4 className={`text-xs font-bold uppercase tracking-widest ${isLocked ? 'text-slate-600' : 'text-amber-200/90'}`}>
                Passo {index + 1}: {title}
            </h4>
            <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                {isLocked ? "Complete o passo anterior" : description}
            </p>
        </div>
    </div>
);

export const TrilhaTransmutacao: React.FC = () => {
    const { arcanoPessoal } = useArcano();

    // Mock de progresso (futuramente virá do Context/LocalStorage)
    const steps = [
        { title: "Observação", description: "Identificar o gatilho emocional no momento da reação." },
        { title: "Diálogo Interno", description: "Questionar a intenção positiva da sombra (proteção)." },
        { title: "Integração", description: "Agir de forma consciente apesar do impulso da sombra." }
    ];

    if (!arcanoPessoal) return null;

    return (
        <div className="py-12 px-6 flex flex-col items-center space-y-12">
            <header className="text-center space-y-2">
                <h3 className="font-serif text-3xl text-amber-100">Caminho de Alquimia</h3>
                <p className="text-xs text-amber-500/60 uppercase tracking-[0.3em]">Sombras do {arcanoPessoal.nome}</p>
            </header>

            <div className="flex flex-col items-center gap-12">
                {steps.map((step, idx) => (
                    <TrailNode
                        key={idx}
                        index={idx}
                        title={step.title}
                        description={step.description}
                        isCompleted={idx === 0} // Mock: primeiro completo
                        isLocked={idx > 1}      // Mock: terceiro bloqueado
                    />
                ))}
            </div>

            <div className="pt-8 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest max-w-xs mx-auto">
                    A transmutação é um processo contínuo. Repita o ciclo a cada novo gatilho.
                </p>
            </div>
        </div>
    );
};
