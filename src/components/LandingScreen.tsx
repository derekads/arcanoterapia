import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, Star, Users, ChevronDown } from 'lucide-react';
import { ArcaneWisdom } from './ArcaneWisdom';

// Fix for framer-motion type issues
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface Props {
  onStart: () => void;
  onOpenProfiles: () => void;
  hasProfiles: boolean;
}

const LandingScreen: React.FC<Props> = ({ onStart, onOpenProfiles, hasProfiles }) => {
  return (
    <div className="min-h-screen font-sans text-gray-100 flex flex-col items-center justify-start pt-12 md:pt-24 p-6 relative overflow-y-auto overflow-x-hidden custom-scrollbar">

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-deep-purple/20 to-midnight-blue pointer-events-none" />

      {/* HEADER SECTION */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto z-10 text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-lg">
          <Sparkles size={14} className="text-neon-cyan" />
          <span className="text-xs uppercase tracking-widest text-blue-200">Portal Arcanoterapia</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-white/60 mb-6 drop-shadow-2xl leading-tight">
          O Mistério da Sua <br /> Alma Revelado
        </h1>

        <p className="text-lg md:text-xl font-light text-blue-100/70 max-w-xl mx-auto leading-relaxed mb-8">
          Decifre os códigos ocultos em seu nome, sua origem e nas estrelas. Desperte seu Arcano pessoal e harmonize sua egrégora interior.
        </p>

        {/* Feature Preview List (Static Visuals) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 opacity-80">
          {['Mapa Numerológico', 'Carta Astral', 'Oráculo IA', 'Alquimia das Plantas e Frequências'].map((item, i) => (
            <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-xs text-mystic-gold uppercase tracking-wider bg-black/20 flex items-center gap-2">
              <Star size={10} /> {item}
            </span>
          ))}
        </div>
      </MotionDiv>

      {/* MAIN CTA ACTIONS */}
      <div className="flex flex-col md:flex-row items-center gap-4 z-10 mb-20">
        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onStart}
          className="group relative px-12 py-5 bg-mystic-gold text-black font-serif font-bold tracking-wider rounded-full overflow-hidden hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.3)] min-w-[280px]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <Compass size={20} />
            INICIAR JORNADA
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </MotionButton>

        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onOpenProfiles}
          className="group px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-serif font-bold tracking-wider rounded-full transition-all min-w-[280px] flex items-center justify-center gap-3"
        >
          <Users size={20} className={hasProfiles ? "text-neon-cyan" : "text-gray-400"} />
          <span>MEUS MAPAS</span>
          {hasProfiles && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
          )}
        </MotionButton>
      </div>

      {/* ARCANE WISDOM SECTION */}
      <div className="w-full z-10 max-w-5xl mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8 opacity-50"
        >
          <span className="text-xs uppercase tracking-[0.3em] mb-2 text-white">Entenda o Método</span>
          <ChevronDown className="animate-bounce text-white" size={16} />
        </motion.div>

        <ArcaneWisdom />
      </div>

      <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest z-10 pb-10">
        Privacidade absoluta e sigilo hermético
      </p>

    </div>
  );
};

export default LandingScreen;