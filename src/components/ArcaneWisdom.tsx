import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Sparkles, ShieldAlert, Info } from 'lucide-react';

export const ArcaneWisdom = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-5xl mx-auto mb-8 px-1 md:px-0"
    >
      {/* Container Principal com Efeito Glassmorphism Profundo */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-2xl group max-w-4xl mx-auto">
        
        {/* 1. Textura de Ruído (Noise) */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} 
        />
        
        {/* 2. Iluminação de Leitura (Top Radial Glow) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />
        
        {/* 3. Borda Superior Brilhante (Rim Light) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70" />

        <div className="relative z-10 p-6 md:p-8">
          
          {/* Layout: Cabeçalho e Corpo */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            
            {/* Esquerda: Título e Texto */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                  <Scroll size={16} className="text-amber-400" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg md:text-xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-300">
                    A CIÊNCIA SAGRADA DO NOME
                  </h2>
                </div>
              </div>
              
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500/60 mb-4 pl-1">
                Método da Tabela de Bongo & Kabbalah
              </h3>

              <p className="text-slate-300/90 font-light text-sm leading-relaxed">
                Um estudo fascinante que une a Gematria aos Arcanos Maiores. 
                Este cálculo revela a lâmina oculta que rege sua identidade, servindo como o mapa da sua alma.
              </p>
            </div>

            {/* Direita: Box de Regras Compacto */}
            <div className="w-full md:w-auto md:min-w-[320px]">
               <div className="bg-black/30 rounded-xl border border-white/5 p-4 relative overflow-hidden hover:border-white/10 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500/40 to-transparent" />
                  
                  <div className="flex items-center gap-2 mb-3 opacity-80">
                    <ShieldAlert size={14} className="text-amber-400" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-100/70">Regras do Oráculo</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Regra 1 */}
                    <div className="flex items-start gap-3 text-xs text-slate-400">
                       <span className="mt-0.5">🛑</span>
                       <p>
                         <strong className="text-slate-200 block mb-0.5">Mulheres Casadas:</strong>
                         Use apenas o nome de solteira (batismo).
                       </p>
                    </div>

                    {/* Regra 2 */}
                    <div className="flex items-start gap-3 text-xs text-slate-400">
                       <span className="mt-0.5">🛑</span>
                       <p>
                         <strong className="text-slate-200 block mb-0.5">Sufixos:</strong>
                         Ignore 'Júnior', 'Filho', 'Neto', etc.
                       </p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};