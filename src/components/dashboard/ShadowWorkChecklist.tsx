import React, { useState } from 'react';
import { Eye, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  shadows: ArcanoAdvanced['shadowWork'];
}

export const ShadowWorkChecklist: React.FC<Props> = ({ shadows }) => {
  // Local state to simulate checking off items during the session
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = (Object.values(checkedItems).filter(Boolean).length / shadows.length) * 100;

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Eye className="text-red-400" size={20} />
          <h3 className="text-white font-serif text-lg">Trabalho de Sombra</h3>
        </div>
        <span className="text-xs text-gray-500 font-mono">{Math.round(progress)}% Integrado</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/5 rounded-full mb-6 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-red-500 to-purple-500"
        />
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {shadows.map((item, idx) => {
          const isChecked = checkedItems[item.id] || item.reconhecido;

          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => toggleItem(item.id)}
              className={clsx(
                "p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden",
                isChecked 
                  ? "bg-red-900/10 border-red-500/20" 
                  : "bg-white/5 border-white/10 hover:border-red-400/30"
              )}
            >
              <div className="flex items-start gap-3 relative z-10">
                <div className={clsx("mt-1 transition-colors", isChecked ? "text-red-400" : "text-gray-600 group-hover:text-red-400")}>
                  {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                
                <div className="flex-1">
                  <h4 className={clsx(
                    "font-bold text-sm mb-1 transition-all",
                    isChecked ? "text-gray-400 line-through decoration-red-500/50" : "text-gray-200"
                  )}>
                    {item.sombra}
                  </h4>
                  <div className={clsx("flex items-center gap-1 text-xs", isChecked ? "opacity-50" : "opacity-100")}>
                    <AlertCircle size={10} className="text-mystic-gold" />
                    <span className="text-gray-400">
                      <span className="text-mystic-gold font-bold uppercase text-[10px] mr-1">Cura:</span>
                      {item.cura}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <p className="mt-4 text-[10px] text-center text-gray-500 uppercase tracking-widest">
        O que você nega, te submete.
      </p>
    </div>
  );
};