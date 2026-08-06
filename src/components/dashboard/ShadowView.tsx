import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Skull, Check, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { ArcanoAdvanced, ShadowPattern } from '../../types';
import { getShadowPatternsForArcano } from '../../data/shadowPatterns';
import { SombraModal, getProgressoSombra, ProgressoSombra } from './SombraModal';
import { cn } from '../../utils';

interface Props {
  arcano: ArcanoAdvanced;
  onClose: () => void;
  embedded?: boolean;
}

export const ShadowView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
  const [selectedSombra, setSelectedSombra] = useState<ShadowPattern | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get rich shadow patterns
  const richPatterns = useMemo(() => {
    return getShadowPatternsForArcano(arcano.numero);
  }, [arcano.numero]);

  const getStatus = useCallback((sombraId: string) => {
    const p = getProgressoSombra(arcano.numero, sombraId);
    if (!p) return 'latente';
    if (p.status === 'completa') return 'integrada';
    return 'transmutando';
  }, [arcano.numero, refreshKey]);

  const getProgresso = useCallback((sombraId: string) => {
    return getProgressoSombra(arcano.numero, sombraId);
  }, [arcano.numero, refreshKey]);

  const abrirSombra = (sombra: ShadowPattern) => {
    setSelectedSombra(sombra);
    setModalOpen(true);
  };

  const handleProgressChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={cn("max-w-4xl mx-auto px-4 py-8", embedded ? '' : 'min-h-screen bg-[#0a0a0f]')}>
      {/* ── HEADER ── */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-serif text-white mb-2">Alquimia das Sombras</h1>
        <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
          {arcano.nome} revela 4 padrões para transmutação.
          Escolha um portal para iniciar seu processo alquímico.
        </p>

        {/* Progresso Geral (Dots) */}
        <div className="mt-6 flex justify-center gap-2.5">
          {richPatterns.map((s) => {
            const status = getStatus(s.id);
            return (
              <div
                key={s.id}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-sm",
                  status === 'transmutando' ? "bg-amber-500 shadow-amber-500/20" :
                    "bg-white/10"
                )}
                title={s.nomePadrao}
              />
            );
          })}
        </div>
      </div>

      {/* ── GRID DE SOMBRAS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {richPatterns.map((sombra, idx) => {
          const status = getStatus(sombra.id);
          const prog = getProgresso(sombra.id);
          const percentual = prog ? Math.round((prog.diasCompletos.length / 21) * 100) : 0;

          return (
            <motion.div
              key={sombra.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative group rounded-[2rem] border p-7 transition-all cursor-pointer overflow-hidden",
                status === 'integrada' ? "bg-emerald-950/20 border-emerald-500/30" :
                  status === 'transmutando' ? "bg-amber-950/20 border-amber-500/30" :
                    "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              )}
              onClick={() => abrirSombra(sombra)}
            >
              {/* Glow background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Badge de Status */}
              <div className="absolute top-5 right-5 z-10">
                {status === 'integrada' && (
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Check size={11} strokeWidth={3} /> Integrada
                  </span>
                )}
                {status === 'transmutando' && (
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                    <Clock size={11} strokeWidth={3} /> {percentual}%
                  </span>
                )}
              </div>

              <div className="flex items-start gap-4 relative z-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner",
                  status === 'completo' ? "bg-emerald-500/20" :
                    status === 'iniciado' ? "bg-amber-500/20" :
                      "bg-white/10"
                )}>
                  {sombra.frequenciaSombra === 'BAIXA' ? '🌿' :
                    sombra.frequenciaSombra === 'MEDIA' ? '🌑' :
                      sombra.frequenciaSombra === 'ALTA' ? '🔥' : '💀'}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-white text-lg mb-1.5 flex items-center gap-2 group-hover:text-teal-300 transition-colors">
                    {sombra.nomePadrao}
                  </h3>

                  <div className="flex gap-1.5 mb-3">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-sans border uppercase tracking-widest",
                      sombra.frequenciaSombra === 'ALTA' || sombra.frequenciaSombra === 'CRONICA' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                        sombra.frequenciaSombra === 'MEDIA' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                      {sombra.frequenciaSombra}
                    </span>
                  </div>

                  <p className="text-white/40 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {sombra.descricao}
                  </p>

                  {/* Preview do Antídoto */}
                  <div className="flex items-center gap-2 text-xs text-teal-400/80 bg-teal-400/5 px-3 py-2 rounded-xl border border-teal-400/10">
                    <Sparkles size={12} className="flex-shrink-0" />
                    <span className="truncate">{sombra.antidoto}</span>
                  </div>
                </div>
              </div>

              {/* Barra de Progresso Individual (se iniciada) */}
              <div className="mt-5 relative z-10">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentual}%` }}
                    className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 pt-5 border-t border-white/5 flex justify-between items-center relative z-10">
                <span className="text-[11px] uppercase tracking-widest text-white/30 font-bold group-hover:text-white/50 transition-colors">
                  {status === 'latente' ? "Clique para explorar" :
                    status === 'transmutando' ? "Retomar Transmutação" :
                      "Ver Alquimia"}
                </span>
                <ArrowRight size={16} className="text-white/20 group-hover:translate-x-1 group-hover:text-white/60 transition-all" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── MODAL DE DETALHES ── */}
      <SombraModal
        sombra={selectedSombra}
        arcanoNumero={arcano.numero}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onProgressChange={handleProgressChange}
      />
    </div>
  );
};
