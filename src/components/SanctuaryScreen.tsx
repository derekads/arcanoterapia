
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Users, Sparkles, X, Sun, Eye, Route,
  ChevronRight, Maximize2, ArrowRight, Heart, Briefcase, Activity, Calculator,
  Compass, BookOpen, Flame, PenTool, Gem, Moon, CheckCircle2, Zap
} from 'lucide-react';
import { useMapaAstral } from '../hooks/useMapaAstral';
import { TimelineView } from './dashboard/TimelineView';
import { MapaAstralView } from './dashboard/MapaAstralView';
import { buildMapaViewModel } from '../utils/mapaAstralAdapter';
import { ArcanoExpandidoView } from './dashboard/ArcanoExpandidoView';
import { FarmaciaAlquimica } from './dashboard/FarmaciaAlquimica';
import { BottomNavigation } from './dashboard/BottomNavigation';
import { OracleView } from './dashboard/OracleView';
import { TimeView } from './dashboard/TimeView';
import { CosmosView } from './dashboard/CosmosView';
import { ChatOraculo } from './dashboard/ChatOraculo';
import { NumerologyModal } from './NumerologyModal';
import { Previsao2026Modal } from './Previsao2026Modal';
import { getPrevisao2026, calcularAnoPessoal } from '../utils/arcanoUtils';
import { ArcanoAdvanced, UserBirthData, ViewState, ArcanoTab, FeatureSelection, UniverseView } from '../types';
import { getDailyAffirmations } from '../data/affirmations';
import { EVOLUTIVE_GUIDELINES } from '../data/evolutiveGuidelines';
import { MAJOR_ARCANA } from '../lib/cardImages';
import { calculateArcanoAlignment } from '../utils/astroConnectionUtils';
import { getShadowPatternsForArcano } from '../data/shadowPatterns';
import { useArcano } from '../context/ArcanoContext';

// Fix for framer-motion type issues in this environment
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// Helper to merge class names
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface Props {
  onReset: () => void;
  onOpenProfiles: () => void;
  onSaveProfile: () => void;
  hasProfiles: boolean;
}

export const SanctuaryScreen: React.FC<Props> = ({
  onReset,
  onOpenProfiles,
  onSaveProfile,
  hasProfiles
}) => {
  const { userData, arcanoPessoal: arcana, arcanoDia, insightsCombinados: insights } = useArcano();

  // Main Hooks
  const { mapa, loading, error, recalcular } = useMapaAstral(userData as any);

  // UI States
  const [viewAtiva, setViewAtiva] = useState<ViewState>('ORACLE');
  const [initialTab, setInitialTab] = useState<ArcanoTab>('essencia');

  // Helper to open ArcanoExpandido at specific tab
  const openExpanded = (tab: ArcanoTab) => {
    setInitialTab(tab);
    setViewAtiva('ARCANO_EXPANDED');
  };

  // Loading global
  if (loading && !mapa) {
    return <LoadingView userData={userData} />;
  }

  // Error state
  if (error) {
    return <ErrorView error={error} onRetry={recalcular} />;
  }

  // Determine if we show the main dashboard (OracleView is now DashboardView in this context)
  const isDashboard = viewAtiva === 'ORACLE';

  return (
    <div className="min-h-screen bg-[#030305] text-white overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {isDashboard && (
          <MotionDiv
            key="dashboard-hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <DashboardView
              userData={userData}
              mapa={mapa}
              arcano={arcana}
              arcanoDia={arcanoDia}
              insights={insights}
              onNavigate={setViewAtiva as any}
              openExpanded={openExpanded}
              onOpenProfiles={onOpenProfiles}
              onSaveProfile={onSaveProfile}
              hasProfiles={hasProfiles}
              onReset={onReset}
            />
          </MotionDiv>
        )}

        {viewAtiva === 'ARCANO_EXPANDED' && (
          <MotionDiv
            key="arcano-expanded"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[60] bg-[#030305]"
          >
            <ArcanoExpandidoView
              arcano={arcana}
              userData={userData}
              mapa={mapa}
              onClose={() => setViewAtiva('ORACLE')}
              onNavigate={setViewAtiva}
              initialTab={initialTab}
            />
          </MotionDiv>
        )}

        {!isDashboard && viewAtiva !== 'ARCANO_EXPANDED' && (
          <ExpandedViewWrapper view={viewAtiva} onClose={() => setViewAtiva('ORACLE')}>
            {viewAtiva === 'ASTROLOGY_DETAIL' && (
              mapa
                ? <MapaAstralView mapa={buildMapaViewModel(mapa, userData as any)} />
                : (
                  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 text-center">
                    <p className="text-sm text-slate-400 font-serif italic max-w-xs">
                      O céu ainda está sendo calculado. Confirme sua data, hora e local de nascimento
                      para abrir o mapa.
                    </p>
                  </div>
                )
            )}
            {viewAtiva === 'TIMELINE' && <TimelineView userData={userData} arcanoCiclos={arcana.ciclos} />}
            {viewAtiva === 'ALCHEMY' && (
              <div className="min-h-screen bg-[#030305] p-6 md:p-12">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 text-center uppercase tracking-widest">Botica Sagrada</h1>
                  <p className="text-white/40 text-center mb-10">Ferramentas de cura para o Arcano {arcana.nome}</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ minHeight: '500px' }}>
                    <FarmaciaAlquimica alquimia={arcana.alquimia} />
                    <ChatOraculo arcano={arcana} arcanaName={arcana.nome} />
                  </div>
                </div>
              </div>
            )}
            {/* ... rest of the views (HEALTH, CAREER, RELATIONSHIPS) remain same but with updated styling if needed */}
            {viewAtiva === 'HEALTH' && (
              <div className="min-h-screen bg-slate-950 p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="inline-block p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                      <Activity className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-2">Saúde do Arcano</h1>
                    <p className="text-white/40">Mapa de vulnerabilidades e prevenção para {arcana.nome}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-6">
                    <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4">Vulnerabilidade Principal</h3>
                    <p className="text-white/80 leading-relaxed">{arcana.saude.vulnerabilidade}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-6">
                      <h3 className="text-rose-400 font-bold text-sm uppercase tracking-widest mb-4">⚠️ Sintomas de Alerta</h3>
                      <ul className="space-y-3">
                        {arcana.saude.sintomas.map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6">
                      <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4">🛡️ Prevenção</h3>
                      <ul className="space-y-3">
                        {arcana.saude.prevencao.map((p: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {viewAtiva === 'CAREER' && (
              <div className="min-h-screen bg-slate-950 p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                      <Briefcase className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-2">Vocação & Carreira</h1>
                    <p className="text-white/40">O caminho profissional do Arcano {arcana.nome}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                    <p className="text-white/80 leading-relaxed text-lg">{arcana.carreira}</p>
                  </div>
                </div>
              </div>
            )}
            {viewAtiva === 'RELATIONSHIPS' && (
              <div className="min-h-screen bg-slate-950 p-6 md:p-12">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="inline-block p-4 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
                      <Heart className="w-8 h-8 text-pink-400" />
                    </div>
                    <h1 className="text-4xl font-serif text-white mb-2">Relacionamentos</h1>
                    <p className="text-white/40">Padrões afetivos do Arcano {arcana.nome}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                    <p className="text-white/80 leading-relaxed text-lg">{arcana.relacionamentos}</p>
                  </div>
                </div>
              </div>
            )}
          </ExpandedViewWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

// Wrapper for expanded views to have a consistent close button/background
function ExpandedViewWrapper({ view, onClose, children }: { view: ViewState, onClose: () => void, children?: React.ReactNode }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto"
    >
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </MotionDiv>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function SyncInsightWidget({ insights, arcanoDia, onClick }: any) {
  if (!insights) return null;

  return (
    <BentoCard
      title="Sincronicidade do Dia"
      subtitle={`${insights.faseLua.toUpperCase()} • ARCANO ${arcanoDia?.numero || '?'}`}
      icon={Zap}
      delay={0.5}
      glowColor="rgba(245,158,11,0.2)"
      iconColor="text-amber-400"
      className="md:col-span-1 border-amber-500/30"
      onClick={onClick}
    >
      <div className="mt-4 space-y-4">
        {insights.dia ? (
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[11px] text-amber-200/90 leading-relaxed font-serif italic">
              "{insights.dia.insight}"
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-white/2 border border-white/5 text-center">
            <p className="text-[10px] text-white/30 italic">Nenhuma sincronia específica detectada para hoje.</p>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-center">
            <span className="block text-[8px] uppercase text-indigo-400 font-bold mb-1">Ação</span>
            <span className="text-[10px] text-indigo-100">{insights.dia?.acao || 'Presença'}</span>
          </div>
          <div className="flex-1 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
            <span className="block text-[8px] uppercase text-rose-400 font-bold mb-1">Alerta</span>
            <span className="text-[10px] text-rose-100">{insights.dia?.alerta || 'Fluxo'}</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

function DashboardView({
  userData,
  mapa,
  openExpanded,
  arcano,
  arcanoDia,
  insights,
  onNavigate,
  onOpenProfiles,
  onSaveProfile,
  hasProfiles,
  onReset
}: any) {
  const [showNumerology, setShowNumerology] = useState(false);
  const [showPrevisao, setShowPrevisao] = useState(false);

  // Calculate Personal Year Arcano for 2026
  const anoPessoalNumero = calcularAnoPessoal(userData.dataNascimento);
  const previsao2026 = getPrevisao2026(anoPessoalNumero);

  // Stage 4: Calculate Cosmic Alignment Score for the dashboard highlight
  const cosmicAlignment = calculateArcanoAlignment(arcano, mapa);

  // Shadow progress sync (Stage 4 refined)
  const [shadowProgress, setShadowProgress] = useState(0);
  useEffect(() => {
    if (arcano?.numero) {
      const patterns = getShadowPatternsForArcano(arcano.numero);

      let totalDays = 0;
      let completedDays = 0;

      patterns.forEach(p => {
        totalDays += 21;
        const key = `shadow-progress-${arcano.numero}-${p.id}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            completedDays += (data.diasCompletos?.length || 0);
          } catch { }
        }
      });

      setShadowProgress(totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0);
    }
  }, [arcano, mapa]); // mapa added to trigger on navigation back from details if needed

  return (
    <div className="min-h-screen bg-[#030305] text-slate-200 p-4 md:p-8 pb-32">
      <header className="mb-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-900/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-serif text-2xl text-amber-500 tracking-wide">Arcanoterapia</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 hidden sm:block">Olá, <span className="text-slate-300 font-medium">{userData.nome}</span></span>
          <div className="flex items-center gap-2">
            <button onClick={onOpenProfiles} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Users size={18} className="text-slate-400" />
            </button>
            <button onClick={onSaveProfile} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Save size={18} className="text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {/* WIDGET A - O ALTAR (Span 2x2) */}
        <div
          onClick={() => openExpanded('essencia')}
          className="md:col-span-2 md:row-span-2 rounded-[2.5rem] border border-amber-500/20 relative overflow-hidden group min-h-[420px] cursor-pointer shadow-[0_8px_48px_rgba(0,0,0,0.5)] transition-transform active:scale-[0.99]"
        >
          {/* Background image */}
          <img
            src={MAJOR_ARCANA[arcano.numero]?.file || MAJOR_ARCANA[0].file}
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-transform duration-[2s] group-hover:scale-105"
            alt={arcano.nome}
            loading="lazy"
          />
          {/* Depth overlays */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]/40" />
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-amber-900/20 via-transparent to-violet-900/10" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08)_0%,_transparent_60%)]" />

          <div className="relative z-20 h-full flex flex-col justify-between p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]">
                  <Sparkles size={18} className="text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-bold">Seu Arcano Pessoal</span>
              </div>

              <div>
                <h2 className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-600 leading-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  {arcano.nome}
                </h2>
                <p className="text-amber-200/60 text-sm md:text-base mt-2 flex items-center gap-2 tracking-[0.15em] uppercase font-light">
                  <span className="font-serif font-bold text-amber-500/70 tracking-widest">{arcano.numeroRomano}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-700/60" />
                  <span>{arcano.elemento}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-700/60" />
                  <span>{arcano.planeta_regente || arcano.planeta}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3" onClick={(e) => e.stopPropagation()}>
              {/* Primary Expanded Detail Button */}
              <button
                onClick={() => openExpanded('essencia')}
                className="group/btn relative w-full py-4 px-6 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-500/40 backdrop-blur-md rounded-xl group-hover/btn:border-amber-400/70 transition-colors duration-500" />
                <span className="relative flex items-center justify-center gap-3 text-amber-100 font-bold tracking-[0.25em] text-xs uppercase">
                  Detalhes da Essência
                  <ChevronRight size={16} className="text-amber-400" />
                </span>
              </button>

              <div className="flex gap-2">
                {/* Secondary Preview Button */}
                <button
                  onClick={() => setShowPrevisao(true)}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 text-[10px] uppercase tracking-widest text-slate-400 font-bold hover:text-amber-200"
                >
                  Previsão 2026
                </button>
                <button onClick={() => setShowNumerology(true)} className="py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 text-slate-400 hover:text-white"><Calculator size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* WIDGET B - MAPA ASTRAL VIVO (Span 1x2) */}
        <BentoCard
          title="Seu Cosmos"
          subtitle="Sincronicidade de Alma"
          icon={Moon}
          bgImage="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800"
          glowColor="rgba(139,92,246,0.2)"
          iconColor="text-violet-400"
          className="md:col-span-1 md:row-span-2 border-violet-500/20"
          onClick={() => onNavigate('ASTROLOGY_DETAIL')}
          delay={0.1}
        >
          {mapa ? (
            <div className="space-y-4 mt-6">
              {/* Soul Sync Score Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 mb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-10 h-10 -rotate-90">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="2" />
                      <motion.circle
                        cx="20" cy="20" r="18" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        strokeDasharray={113}
                        initial={{ strokeDashoffset: 113 }}
                        animate={{ strokeDashoffset: 113 - (113 * cosmicAlignment.alignmentScore) / 100 }}
                        className="text-violet-400"
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </svg>
                    <span className="absolute text-[8px] font-black text-violet-200">{cosmicAlignment.alignmentScore}%</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-violet-300 font-bold">Alinhamento</h4>
                    <p className="text-xs text-white/60 font-serif italic">Sincronicidade</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Sun size={14} className="text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  </div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sol</span>
                </div>
                <span className="font-serif text-lg text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] leading-none">{mapa.sol.signo} <span className="text-xs opacity-60 italic">{mapa.sol.grau}°</span></span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100/10 flex items-center justify-center border border-white/10">
                    <Moon size={14} className="text-slate-200 drop-shadow-[0_0_8px_rgba(226,232,240,0.5)]" />
                  </div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lua</span>
                </div>
                <span className="font-serif text-lg text-slate-200 drop-shadow-[0_0_8px_rgba(226,232,240,0.3)] leading-none">{mapa.lua.signo} <span className="text-xs opacity-60 italic">{mapa.lua.grau}°</span></span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <Sparkles size={14} className="text-violet-300 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                  </div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Asc</span>
                </div>
                <span className="font-serif text-lg text-violet-300 drop-shadow-[0_0_8px_rgba(167,139,250,0.4)] leading-none">{mapa.ascendente.signo} <span className="text-xs opacity-60 italic">{mapa.ascendente.grau}°</span></span>
              </div>

              <div className="pt-2">
                <button className="w-full text-[10px] text-violet-400 hover:text-violet-300 font-black uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2">
                  Mapa Astral Completo <ArrowRight size={10} />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-700 animate-pulse font-serif italic">Codificando as estrelas...</div>
          )}
        </BentoCard>

        {/* WIDGETS C-F - FERRAMENTAS (Span 1x1 cada) */}
        <BentoCard
          title="Alquimia das Sombras"
          subtitle="Integração Interior"
          icon={Moon}
          bgImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop"
          glowColor="rgba(139,92,246,0.15)"
          iconColor="text-violet-400"
          onClick={() => openExpanded('sombras')}
          delay={0.2}
        >
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - shadowProgress / 100)} className={shadowProgress > 0 ? "text-violet-500" : "text-slate-700"} style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.6))' }} />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-violet-300">{shadowProgress}%</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{shadowProgress === 0 ? 'Iniciar Integração' : `${shadowProgress}% integradas`}</span>
          </div>
        </BentoCard>

        <BentoCard
          title="Mandala do Ser"
          subtitle="Equilíbrio Trimestral"
          icon={Compass}
          bgImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop"
          glowColor="rgba(245,158,11,0.15)"
          iconColor="text-amber-400"
          onClick={() => openExpanded('roda')}
          delay={0.3}
        >
          <div className="mt-4">
            <PreviewRodaVida arcanoNumero={arcano.numero} />
          </div>
        </BentoCard>

        <BentoCard
          title="Diretrizes"
          subtitle="Chama Evolutiva"
          icon={Sparkles}
          bgImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop"
          glowColor="rgba(249,115,22,0.15)"
          iconColor="text-orange-400"
          onClick={() => openExpanded('diretrizes')}
          delay={0.4}
        >
          <div className="mt-4">
            <PreviewDiretrizes arcanoNumero={arcano.numero} />
          </div>
        </BentoCard>

        {/* WIDGET G - SINCRONICIDADE (NOVO) */}
        <SyncInsightWidget insights={insights} arcanoDia={arcanoDia} onClick={() => openExpanded('cosmos')} />

        {/* WIDGET H - PRÁTICA DIÁRIA (Span 2x1 wide) */}
        <DailyPracticeWidget arcano={arcano} openExpanded={openExpanded} />

        <BentoCard
          title="Diário do Ser"
          subtitle="Registros do Ser"
          icon={PenTool}
          bgImage="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop"
          glowColor="rgba(6,182,212,0.15)"
          iconColor="text-cyan-400"
          onClick={() => openExpanded('jornal')}
          delay={0.6}
        >
          <div className="mt-4">
            <PreviewJornal arcanoNumero={arcano.numero} />
          </div>
        </BentoCard>
      </div>

      {/* MODALS */}
      <NumerologyModal isOpen={showNumerology} onClose={() => setShowNumerology(false)} name={userData.nome} />
      <Previsao2026Modal
        isOpen={showPrevisao}
        onClose={() => setShowPrevisao(false)}
        previsao={previsao2026}
        arcanoNome={previsao2026?.nome || ''}
        transitionInsight={insights?.transicao}
      />
    </div>
  );
}

// --- DAILY PRACTICE WIDGET ---
function DailyPracticeWidget({ arcano, openExpanded }: { arcano: ArcanoAdvanced; openExpanded: (tab: ArcanoTab) => void }) {
  const guidelines = EVOLUTIVE_GUIDELINES[arcano.numero] || [];
  const dailyCheckinGuidelines = guidelines.filter(g => g.checkinDiario);

  // Pick today's directive based on day of year for rotation
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const todayDirective = dailyCheckinGuidelines.length > 0
    ? dailyCheckinGuidelines[dayOfYear % dailyCheckinGuidelines.length]
    : guidelines[0];

  // Check-in state from localStorage
  const storageKey = `guidelines_progress_${arcano.numero}`;
  const today = new Date().toISOString().split('T')[0];

  const [checkedToday, setCheckedToday] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        setStreak(data.streak || 0);
        if (data.lastCheckin === today) setCheckedToday(true);
      }
    } catch { }
  }, [storageKey, today]);

  const handleCheckin = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      const data = saved ? JSON.parse(saved) : { streak: 0, totalCheckins: 0, lastCheckin: '' };
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = data.lastCheckin === yesterday ? data.streak + 1 : data.lastCheckin === today ? data.streak : 1;
      const updated = { ...data, streak: newStreak, totalCheckins: (data.totalCheckins || 0) + 1, lastCheckin: today };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setCheckedToday(true);
      setStreak(newStreak);
    } catch { }
  };

  if (!todayDirective) return null;

  return (
    <MotionButton
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openExpanded('diretrizes')}
      className={cn(
        "md:col-span-2 text-left rounded-[2rem] backdrop-blur-xl border overflow-hidden",
        "h-full flex flex-col group relative",
        "shadow-[0_8px_32px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]",
        checkedToday
          ? "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40"
          : "bg-white/[0.02] border-amber-500/20 hover:border-amber-500/40"
      )}
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${checkedToday ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.1)'}` }} />

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-500",
              checkedToday
                ? "bg-emerald-500/15 border-emerald-500/30"
                : "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/15"
            )}>
              {checkedToday
                ? <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]" strokeWidth={1.5} />
                : <Flame className="w-5 h-5 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.8)]" strokeWidth={1.5} />
              }
            </div>
            <div>
              <h3 className="font-serif text-lg text-amber-50/90 tracking-wide">Prática do Dia</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{todayDirective.categoria.toLowerCase()}</p>
            </div>
          </div>

          {/* Streak badge */}
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Zap size={11} className="text-amber-400" />
              <span className="text-[11px] font-bold text-amber-400">{streak}</span>
              <span className="text-[9px] text-amber-500/60 uppercase tracking-wider">dias</span>
            </div>
          )}
        </div>

        {/* Directive content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-200 mb-1">{todayDirective.titulo}</p>
          <p className="text-xs text-slate-400/80 leading-relaxed line-clamp-2">{todayDirective.acaoPratica}</p>
        </div>

        {/* Footer action */}
        <div className="mt-4 flex items-center gap-3">
          {!checkedToday ? (
            <div
              onClick={(e) => { e.stopPropagation(); handleCheckin(); }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-500 text-amber-300 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={13} /> Concluir Prática
            </div>
          ) : (
            <div className="flex-1 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 size={13} /> Prática Concluída ✓
            </div>
          )}
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-amber-500/60 transition-colors duration-500">
            Ver Todas →
          </span>
        </div>
      </div>
    </MotionButton>
  );
}

// --- PREVIEW COMPONENTS (compact status for dashboard cards) ---

function PreviewDiretrizes({ arcanoNumero }: { arcanoNumero: number }) {
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    try {
      const key = `guidelines_progress_${arcanoNumero}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        setStreak(data.streak || 0);
        setTotal(data.totalCheckins || 0);
      }
    } catch { }
  }, [arcanoNumero]);
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-2xl font-serif text-emerald-300">{streak}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-wider">Streak</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <div className="text-2xl font-serif text-emerald-300">{total}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-wider">Check-ins</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Lê o progresso salvo pelo `useUserProgress`.
 *
 * Estes cartões liam `life_wheel_<n>` e `journal_entries_<n>`, chaves que
 * NADA no app escreve — o progresso real sempre morou em
 * `arcanoterapia_user_progress_<n>`. Resultado: por mais que o usuário
 * preenchesse a Roda da Vida ou escrevesse no Diário, os cartões do painel
 * continuavam dizendo "Avalie 6 áreas da sua vida" e "Comece a escrever
 * suas reflexões".
 */
function lerProgresso(arcanoNumero: number): any | null {
  try {
    const raw = localStorage.getItem(`arcanoterapia_user_progress_${arcanoNumero}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function PreviewRodaVida({ arcanoNumero }: { arcanoNumero: number }) {
  const [avg, setAvg] = useState(0);
  useEffect(() => {
    const progresso = lerProgresso(arcanoNumero);
    const notas = (progresso?.areasVida || [])
      .map((a: any) => a?.nota)
      .filter((n: any) => typeof n === 'number');
    if (notas.length > 0) {
      setAvg(Math.round((notas.reduce((a: number, b: number) => a + b, 0) / notas.length) * 10) / 10);
    } else {
      setAvg(0);
    }
  }, [arcanoNumero]);
  return (
    <div className="mt-4">
      {avg > 0 ? (
        <div className="flex items-center gap-3">
          <div className="text-3xl font-serif text-amber-300">{avg}</div>
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">Média Geral</div>
            <div className="text-xs text-white/50">de 10 pontos</div>
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-xs">Avalie 6 áreas da sua vida.</p>
      )}
    </div>
  );
}

function PreviewAfirmacao({ arcanoNumero }: { arcanoNumero: number }) {
  const daily = getDailyAffirmations(arcanoNumero, 1);
  const texto = daily[0]?.texto || 'Abra para receber suas afirmações diárias.';
  return (
    <div className="mt-4">
      <p className="text-white/50 text-xs italic leading-relaxed line-clamp-3">"{texto.substring(0, 90)}..."</p>
    </div>
  );
}

function PreviewJornal({ arcanoNumero }: { arcanoNumero: number }) {
  const [count, setCount] = useState(0);
  const [lastDate, setLastDate] = useState('');
  useEffect(() => {
    const entries: any[] = lerProgresso(arcanoNumero)?.journalEntries || [];
    setCount(entries.length);

    // `addJournalEntry` insere no início da lista, então a mais recente é a
    // primeira — pegar a última invertia a data mostrada.
    const maisRecente = entries[0];
    const iso = maisRecente?.data || maisRecente?.date;
    const d = iso ? new Date(iso) : null;
    setLastDate(d && !isNaN(d.getTime())
      ? d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
      : '');
  }, [arcanoNumero]);
  return (
    <div className="mt-4">
      {count > 0 ? (
        <div className="flex items-center gap-3">
          <div className="text-2xl font-serif text-violet-300">{count}</div>
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-wider">Entradas</div>
            {lastDate && <div className="text-xs text-white/40">Última: {lastDate}</div>}
          </div>
        </div>
      ) : (
        <p className="text-white/40 text-xs">Comece a escrever suas reflexões.</p>
      )}
    </div>
  );
}

// Componente BentoCard reutilizável v4.5 — Dark Temple Premium
function BentoCard({ title, subtitle, icon: Icon, color, onClick, delay, children, className, bgImage, glowColor, iconColor }: any) {
  return (
    <MotionButton
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -10,
        scale: 1.02,
        z: 20,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "text-left rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.05]",
        "hover:bg-white/[0.06] hover:border-white/[0.2] transition-all duration-500",
        "h-full flex flex-col group shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]",
        className
      )}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Background image layer with parallax-like effect */}
      {bgImage && (
        <motion.img
          src={bgImage}
          whileHover={{ scale: 1.15, x: 10, y: 10 }}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.15] transition-all duration-1000 mix-blend-overlay z-0"
          alt=""
          loading="lazy"
        />
      )}

      {/* Premium Light Sweep */}
      <motion.div
        className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${glowColor || 'rgba(255,255,255,0.05)'} 50%, transparent 100%)`,
        }}
        initial={{ x: '-100%', skewX: -20 }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* External Glow Glow */}
      <div
        className="absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[1] pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${glowColor?.replace('0.2', '0.1') || 'rgba(245,158,11,0.05)'}`,
          background: `radial-gradient(circle at center, ${glowColor || 'rgba(255,158,11,0.05)'} 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex flex-col mb-6 w-full gap-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className={cn(
              "w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:bg-amber-500/10",
            )}
          >
            <Icon
              className={cn('w-6 h-6 transition-colors duration-500', iconColor || 'text-slate-400 group-hover:text-amber-400')}
              strokeWidth={1}
            />
          </motion.div>
          <div>
            <h3 className="font-serif text-xl text-amber-50 tracking-wide group-hover:text-amber-200 transition-colors">{title}</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">{subtitle}</p>
          </div>
        </div>

        <div className="flex-1 w-full">
          {children}
        </div>

        <div className={cn(
          'mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500',
          iconColor ? `text-slate-500 group-hover:${iconColor}` : 'text-slate-600 group-hover:text-amber-500'
        )}>
          <span>Explorar</span>
          <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
    </MotionButton>
  );
}

// Telas de estado
function LoadingView({ userData }: any) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-indigo-300 text-lg mb-2">Calculando posições astrais...</p>
        <p className="text-white/40 text-sm">{userData.nome} • {userData.localizacao.nomeCidade}</p>
      </div>
    </div>
  );
}

function ErrorView({ error, onRetry }: any) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-rose-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
