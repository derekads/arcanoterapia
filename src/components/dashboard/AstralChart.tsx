import React from 'react';
import { Sun, Moon, ArrowUpCircle } from 'lucide-react';
import { AstrologyData } from '../../types';

interface Props {
  astrology: AstrologyData;
}

const SignRow = ({ icon: Icon, label, sign, color }: { icon: any, label: string, sign?: string, color: string }) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full bg-${color}-500/10`}>
        <Icon size={18} className={`text-${color}-400`} />
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-white font-serif font-bold text-lg">{sign || 'Calculando...'}</p>
      </div>
    </div>
  </div>
);

export const AstralChart: React.FC<Props> = ({ astrology }) => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Sun className="text-orange-400" size={20} />
        <h3 className="text-white font-serif text-lg">Tríade Astral</h3>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <SignRow 
          icon={Sun} 
          label="Signo Solar (Essência)" 
          sign={astrology.sunSign} 
          color="orange" 
        />
        <SignRow 
          icon={ArrowUpCircle} 
          label="Ascendente (Máscara)" 
          sign={astrology.risingSign} 
          color="blue" 
        />
        <SignRow 
          icon={Moon} 
          label="Signo Lunar (Emoção)" 
          sign={astrology.moonSign} 
          color="purple" 
        />
      </div>

      <div className="mt-auto pt-4 relative z-10">
         <p className="text-[10px] text-gray-500 text-center leading-relaxed">
           Esta tríade compõe a base da sua personalidade cósmica, influenciando como você brilha, como o mundo te vê e como você sente.
         </p>
      </div>
    </div>
  );
};
