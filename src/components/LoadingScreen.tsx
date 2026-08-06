import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const FRASES = [
  "Sintonizando energias...",
  "Embaralhando o destino...",
  "Consultando os arquétipos...",
  "Revelando o caminho...",
];

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [fraseIndex, setFraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % FRASES.length);
    }, 600);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1.6, 100));
    }, 30);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearInterval(textTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Create cards for shuffle effect
  const cardItems = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #1a0b2e 0%, #0a0514 100%)',
      }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/[0.03] blur-[150px] animate-pulse" />

      {/* 🔮 3D CARD SHUFFLE ANIMATION */}
      <div className="relative w-48 h-72 mb-20" style={{ perspective: '1000px' }}>
        {cardItems.map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full rounded-xl border border-amber-500/20 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2e1065 0%, #0f172a 100%)',
              zIndex: 10 - i,
            }}
            initial={{ rotateY: 0, x: 0, y: 0 }}
            animate={{
              rotateY: [0, 15, -15, 0],
              x: [0, (i - 2) * 40, -(i - 2) * 40, 0],
              y: [0, i * 5, -i * 5, 0],
              rotateZ: [0, i * 2, -i * 2, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          >
            {/* Pattern on back of cards */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#f59e0b_1px,_transparent_1px)] bg-[length:12px_12px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-amber-500/20 font-serif">✦</span>
            </div>

            {/* Light sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          </motion.div>
        ))}

        {/* Central Glow */}
        <div className="absolute inset-0 bg-amber-500/5 rounded-xl blur-3xl scale-125 z-0" />
      </div>

      {/* RITUALISTIC TEXT */}
      <div className="h-12 flex flex-col items-center justify-center space-y-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={fraseIndex}
            initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, scale: 1, letterSpacing: '0.4em' }}
            exit={{ opacity: 0, scale: 1.1, letterSpacing: '0.6em' }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="text-xs md:text-sm font-serif text-amber-200/60 uppercase text-center"
          >
            {FRASES[fraseIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Mystic Progress Bar */}
        <div className="relative w-40 h-1 mt-4 group">
          <div className="absolute inset-0 bg-white/5 rounded-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute -inset-1 border border-amber-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;