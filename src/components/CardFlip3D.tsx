import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    frontImage: string;
    backImage: string;
    isRevealed: boolean;
    arcanoNumero: number;
}

export const CardFlip3D: React.FC<Props> = ({
    frontImage,
    backImage,
    isRevealed,
    arcanoNumero,
}) => {
    // Generate static particle data to avoid re-renders inconsistent with motion
    const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i / 12) * Math.PI * 2,
        velocity: 50 + Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 0.5
    })), []);

    return (
        <div className="relative w-[280px] h-[480px] preserve-3d cursor-pointer perspective-1000 group">
            <motion.div
                className="w-full h-full relative"
                initial={false}
                animate={{
                    rotateY: isRevealed ? 0 : 180,
                    scale: isRevealed ? [1, 1.05, 1] : 1,
                    z: isRevealed ? [0, 50, 0] : 0
                }}
                transition={{
                    rotateY: { duration: 1.2, type: 'spring', stiffness: 100, damping: 15 },
                    scale: { duration: 0.6, delay: 0.2 },
                    z: { duration: 0.6, delay: 0.2 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Verso da Carta */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <img
                        src={backImage}
                        alt="Verso da carta"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-amber-900/40 mix-blend-overlay" />
                    <div className="absolute inset-0 border-2 border-amber-500/10 rounded-2xl" />
                </div>

                {/* Face da Carta (Revelada) */}
                <div
                    className="absolute inset-0 w-full h-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden border-2 border-amber-500/40"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                    }}
                >
                    <img
                        src={frontImage}
                        alt={`Arcano ${arcanoNumero}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Efeito de Brilho Místico (Sweep) */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                        initial={{ x: '-150%', skewX: -20 }}
                        animate={isRevealed ? { x: '150%' } : {}}
                        transition={{ duration: 1.8, delay: 1, ease: 'easeInOut' }}
                    />

                    {/* Aura Glow */}
                    <AnimatePresence>
                        {isRevealed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.4, 0.2] }}
                                className="absolute inset-0 bg-amber-500/10 mix-blend-screen"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Partículas de energia ao revelar (Emana da carta) */}
            <AnimatePresence>
                {isRevealed && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full"
                                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                animate={{
                                    x: Math.cos(p.angle) * p.velocity,
                                    y: Math.sin(p.angle) * p.velocity,
                                    scale: [0, 1.5, 0],
                                    opacity: [1, 0.8, 0],
                                }}
                                transition={{
                                    duration: 2.2,
                                    delay: 0.5 + p.delay,
                                    ease: "easeOut",
                                }}
                                style={{
                                    filter: 'blur(1px) drop-shadow(0 0 5px rgba(245,158,11,0.8))',
                                }}
                            />
                        ))}

                        {/* Shockwave effect */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.5, 2], opacity: [0, 0.3, 0] }}
                            transition={{ duration: 1.2, delay: 0.4 }}
                            className="absolute inset-0 border-4 border-amber-400/30 rounded-full blur-md"
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Hook para gerenciar o estado de revelação
export const useCardReveal = (delay: number = 0) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsRevealed(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return { isRevealed, setIsRevealed };
};
