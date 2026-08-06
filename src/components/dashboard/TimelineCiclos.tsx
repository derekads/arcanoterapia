import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Briefcase, Crown, Target, Activity } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';

interface Props {
  ciclos: ArcanoAdvanced['ciclos'];
}

export const TimelineCiclos: React.FC<Props> = ({ ciclos }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-blue-400" size={20} />
        <h3 className="text-white font-serif text-lg">Linha do Tempo Arquetípica</h3>
      </div>

      <div className="relative flex-1 space-y-8 pl-4 border-l-2 border-white/5 ml-2">
        
        {/* Jovem */}
        <div className="relative group">
          <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-blue-400 border-4 border-midnight-blue shadow-[0_0_10px_rgba(96,165,250,0.5)] group-hover:scale-125 transition-transform" />
          <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
            <Baby size={14} /> Fase Jovem (0-20)
          </h4>
          <p className="text-gray-300 text-sm font-light leading-relaxed">{ciclos.faseJovem}</p>
        </div>

        {/* Adulta */}
        <div className="relative group">
          <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-amber-400 border-4 border-midnight-blue shadow-[0_0_10px_rgba(251,191,36,0.5)] group-hover:scale-125 transition-transform" />
          <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
            <Briefcase size={14} /> Fase Adulta (21-50)
          </h4>
          <p className="text-gray-300 text-sm font-light leading-relaxed">{ciclos.faseAdulta}</p>
        </div>

        {/* Sabedoria */}
        <div className="relative group">
          <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-purple-400 border-4 border-midnight-blue shadow-[0_0_10px_rgba(167,139,250,0.5)] group-hover:scale-125 transition-transform" />
          <h4 className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
            <Crown size={14} /> Sabedoria (50+)
          </h4>
          <p className="text-gray-300 text-sm font-light leading-relaxed">{ciclos.faseSabedoria}</p>
        </div>
      </div>

      {/* Desafio Atual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-6 bg-gradient-to-r from-white/5 to-transparent rounded-xl p-4 border border-white/10"
      >
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <Target size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Foco Evolutivo Atual</span>
        </div>
        <p className="text-white text-sm italic">"{ciclos.desafioAtual}"</p>
      </motion.div>
    </div>
  );
};