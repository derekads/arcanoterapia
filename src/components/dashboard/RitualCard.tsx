import React from 'react';
import { Flame, Check, Scroll } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';

interface Props {
  ritual: ArcanoAdvanced['ritual'];
}

export const RitualCard: React.FC<Props> = ({ ritual }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
      
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-500" size={20} />
        <h3 className="text-white font-serif text-lg">Magia do Arcano</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-serif text-mystic-gold mb-1">{ritual.titulo}</h4>
        <p className="text-xs text-gray-400 italic">Objetivo: {ritual.objetivo}</p>
      </div>

      {/* Materials */}
      <div className="mb-6 bg-white/5 rounded-xl p-4 border border-white/5">
         <h5 className="text-[10px] text-mystic-gold uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
            <Scroll size={12} /> Materiais Necessários
         </h5>
         <ul className="grid grid-cols-1 gap-2">
            {ritual.materiais.map((mat, i) => (
               <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50"></span>
                  {mat}
               </li>
            ))}
         </ul>
      </div>

      {/* Steps */}
      <div className="space-y-4">
         {ritual.passos.map((step) => (
            <div key={step.passo} className="flex gap-3">
               <div className="flex-shrink-0 w-6 h-6 rounded-full bg-mystic-gold/10 text-mystic-gold border border-mystic-gold/20 flex items-center justify-center text-xs font-bold font-serif">
                  {step.passo}
               </div>
               <p className="text-sm text-gray-200 leading-relaxed">
                  {step.texto}
               </p>
            </div>
         ))}
      </div>
    </div>
  );
};
