
import React from 'react';
import { motion } from 'framer-motion';
import { Star, RefreshCw, Zap, Sparkles } from 'lucide-react';
import { ArcanoAdvanced } from '../types';

interface Props {
  arcana: ArcanoAdvanced;
  userName: string;
  onReset: () => void;
}

const ResultScreen: React.FC<Props> = ({ arcana, userName, onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen py-12 px-4 flex flex-col items-center justify-start overflow-y-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-2">Arcano Revelado para</p>
        <h2 className="text-2xl font-serif text-white">{userName}</h2>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative group">
        
        {/* Card Header Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-50 pointer-events-none" />

        {/* Arcana Content */}
        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          
          {/* Number Badge */}
          <div className="w-12 h-12 rounded-full border-2 border-mystic-gold flex items-center justify-center text-mystic-gold font-serif text-xl font-bold mb-6 shadow-[0_0_15px_rgba(253,224,71,0.3)]">
            {arcana.numero}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-md uppercase">
            {arcana.nome}
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent my-6" />

          {/* Placeholder Image / Visual Representation */}
          <div className="w-full aspect-square max-w-[200px] mb-8 relative rounded-full overflow-hidden border-4 border-white/5 shadow-inner bg-black/30 flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://picsum.photos/400/400?grayscale&blur=2')] opacity-60 bg-cover bg-center"></div>
             <div className="z-10 text-6xl opacity-80">✨</div>
          </div>

          {/* Keywords */}
          <div className="mb-8">
            <h3 className="text-mystic-gold text-sm uppercase tracking-widest mb-2 font-bold">Essência</h3>
            <p className="text-xl text-blue-100 font-light italic">"{arcana.palavrasChave.join(', ')}"</p>
          </div>

          {/* Essence Text (Updated for Long Form Content) */}
          <div className="w-full text-left bg-black/20 rounded-xl p-6 border border-white/5">
            <h3 className="text-white/80 text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
               <Sparkles size={14} className="text-neon-cyan" /> A Alma do Arquétipo
            </h3>
            
            {/* Display full essence text properly */}
            <div className="text-gray-200 text-sm leading-relaxed font-light space-y-4 text-justify">
               {arcana.conteudo.essencia.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upsell / CTA Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-10 w-full max-w-md"
      >
        <button className="w-full group relative overflow-hidden bg-gradient-to-r from-mystic-gold to-orange-400 p-[1px] rounded-xl transition-transform hover:scale-[1.02]">
           <div className="bg-slate-900/90 hover:bg-slate-900/80 transition-colors rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Zap className="text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Quero ir além</p>
                  <p className="text-gray-400 text-xs">Mapa Completo + Astral</p>
                </div>
              </div>
              <ArrowRightIcon />
           </div>
        </button>

        <button 
          onClick={onReset}
          className="mt-6 text-white/40 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <RefreshCw size={14} />
          Calcular outro nome
        </button>
      </motion.div>
    </motion.div>
  );
};

// Small helper component for the arrow
const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export default ResultScreen;
