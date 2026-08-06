import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Save, Sparkles,
  ChevronDown, Layers, Fingerprint,
  User, Quote, Stars, Wind, Droplets, Mountain, Flame,
  BookOpen, Info, Heart, Briefcase, Activity, Lightbulb, AlertTriangle, ShieldCheck,
  Skull, Compass, Sun, PenTool, Gem, Headphones, Globe
} from 'lucide-react';
import { ArcanoAdvanced, UserBirthData, MapaAstralCalculado, ViewState, ArcanoTab } from '../../types';
import clsx from 'clsx';

// Tab components (embedded mode)
// Tab components (embedded mode)
import { ShadowView } from './ShadowView';
import { EvolutiveGuidelinesView } from './EvolutiveGuidelinesView';
import { LifeWheelView } from './LifeWheelView';
import { DailyAffirmationView } from './DailyAffirmationView';
import { JournalView } from './JournalView';
import { FarmaciaAlquimica } from './FarmaciaAlquimica';
import { SoundTherapyView } from './SoundTherapyView';
import { ArcanoCosmosView } from './ArcanoCosmosView';
import { SombraQuiz } from '../terapia/SombraQuiz';
import { TrilhaTransmutacao } from '../terapia/TrilhaTransmutacao';
import { useArcano } from '../../context/ArcanoContext';

interface Props {
  arcano: ArcanoAdvanced;
  userData: UserBirthData;
  mapa: MapaAstralCalculado | null;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
  initialTab?: ArcanoTab;
}

// --- THEME ENGINE ---
function getArcanaTheme(element: string) {
  switch (element?.toLowerCase()) {
    case 'fogo':
      return {
        gradient: 'from-orange-600 to-red-700',
        text: 'text-orange-400',
        accent: 'text-orange-400',
        border: 'border-orange-500/30',
        bgIcon: 'bg-orange-900/30',
        glow: 'shadow-[0_0_40px_rgba(234,88,12,0.3)]',
        particleColor: '#f97316',
        icon: Flame,
      };
    case 'água':
    case 'agua':
      return {
        gradient: 'from-blue-600 to-cyan-700',
        text: 'text-blue-400',
        accent: 'text-blue-400',
        border: 'border-blue-500/30',
        bgIcon: 'bg-blue-900/30',
        glow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
        particleColor: '#3b82f6',
        icon: Droplets,
      };
    case 'terra':
      return {
        gradient: 'from-emerald-600 to-green-700',
        text: 'text-emerald-400',
        accent: 'text-emerald-400',
        border: 'border-emerald-500/30',
        bgIcon: 'bg-emerald-900/30',
        glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
        particleColor: '#10b981',
        icon: Mountain,
      };
    case 'ar':
      return {
        gradient: 'from-violet-600 to-purple-700',
        text: 'text-violet-400',
        accent: 'text-violet-400',
        border: 'border-violet-500/30',
        bgIcon: 'bg-violet-900/30',
        glow: 'shadow-[0_0_40px_rgba(139,92,246,0.3)]',
        particleColor: '#8b5cf6',
        icon: Wind,
      };
    default:
      return {
        gradient: 'from-amber-500 to-yellow-700',
        text: 'text-amber-400',
        accent: 'text-amber-400',
        border: 'border-amber-500/30',
        bgIcon: 'bg-amber-900/30',
        glow: 'shadow-[0_0_40px_rgba(245,158,11,0.3)]',
        particleColor: '#d4af37',
        icon: Stars,
      };
  }
}

// --- PARTICLE COMPONENT ---
function ParticleField({ color }: { color: string }) {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 1 + Math.random() * 3,
    }))
    , []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -30],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// --- TAB DEFINITIONS ---
const TABS: { id: ArcanoTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'essencia', label: 'Essência', icon: Fingerprint },
  { id: 'sombras', label: 'Alquimia das Sombras', icon: Skull },
  { id: 'diretrizes', label: 'Práticas Diárias', icon: Sparkles },
  { id: 'roda', label: 'Roda da Vida', icon: Compass },
  { id: 'afirmacoes', label: 'Verbos de Poder', icon: Sun },
  { id: 'jornal', label: 'Diário Místico', icon: PenTool },
  { id: 'farmacia', label: 'Alquimia das Plantas e Frequências', icon: Gem },
  { id: 'som', label: 'Frequências', icon: Headphones },
  { id: 'cosmos', label: 'Teia do Destino', icon: Globe },
];

export const ArcanoExpandidoView: React.FC<Props> = ({
  arcano,
  userData,
  mapa,
  onClose,
  initialTab = 'essencia',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ArcanoTab>(initialTab);
  const { insightsCombinados } = useArcano();

  // Dynamic Theme
  const theme = getArcanaTheme(arcano.elemento as string);
  const ElementIcon = theme.icon;

  // Extract Data with safe fallbacks
  const luz = arcano.conteudo?.luz || [];
  const sombra = arcano.conteudo?.sombra || [];
  const conselho = arcano.conteudo?.conselho || [];
  const essenciaFull = arcano.conteudo?.essencia || "";
  const { saude, relacionamentos, carreira } = arcano;

  // Split Essence
  const essenciaParts = essenciaFull.split('. ');
  const essenciaHighlight = essenciaParts[0];
  const essenciaBody = essenciaParts.slice(1).join('. ');

  // Scroll to top when switching tabs
  const switchTab = (tab: ArcanoTab) => {
    setActiveTab(tab);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render the Essência tab content (original expanded view content)
  const renderEssenciaTab = () => (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-20">
      {/* SÍNTESE PESSOAL */}
      <section>
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
          <div className={clsx("absolute inset-0 opacity-10 bg-gradient-to-r", theme.gradient)} />
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3 text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12">
              <div className={clsx("w-24 h-24 mx-auto md:ml-auto rounded-full border-2 flex items-center justify-center mb-4 shadow-2xl", theme.border, theme.bgIcon)}>
                <User size={48} className={theme.text} />
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">{userData.nome.split(' ')[0]}</h3>
              <p className="text-xs uppercase tracking-widest text-white/50">{userData.localizacao.nomeCidade.split(',')[0]}</p>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-4 opacity-60">
                <Stars size={16} className={theme.accent} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">O Mapa do Instante</span>
              </div>
              <div className="text-lg md:text-xl font-serif leading-relaxed text-white/90">
                <p className="mb-4">
                  A energia d{arcano.nome} manifesta-se em sua vida trazendo o poder de <span className={theme.accent}>{arcano.palavrasChave[0]}</span>.
                </p>
                <blockquote className={clsx("pl-6 border-l-4 italic text-xl md:text-2xl", theme.text, theme.border.replace('border-', 'border-l-'))}>
                  "{conselho[0]?.split(':')[0]}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESSÊNCIA PROFUNDA */}
      <section>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative">
          <Quote className={clsx("absolute -top-12 left-0 w-16 h-16 opacity-10 rotate-180", theme.text)} />
          <h2 className={clsx("text-xs font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-4", theme.accent)}>
            <span className="w-12 h-[1px] bg-white/20" />
            A Alma do Arquétipo
            <span className="w-12 h-[1px] bg-white/20" />
          </h2>
          <div className="relative mb-12">
            <p className="text-2xl md:text-4xl font-serif text-white leading-tight mb-6 drop-shadow-lg">
              <span className={clsx("text-transparent bg-clip-text bg-gradient-to-r", theme.gradient)}>
                {essenciaHighlight}
              </span>.
            </p>
            <div className="w-16 h-1 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
            <p className="text-lg md:text-xl text-slate-300 font-light leading-loose text-justify px-4 md:px-8">
              {essenciaBody}
            </p>
          </div>
          <div className={clsx("p-1 bg-gradient-to-r rounded-2xl w-full max-w-2xl", theme.gradient)}>
            <div className="bg-[#0a0a0a] p-6 rounded-xl relative overflow-hidden text-center">
              <Sparkles size={20} className={clsx("mx-auto mb-3", theme.accent)} />
              <p className="text-lg text-white font-serif italic">"{arcano.mantra}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* LUZ & SOMBRA */}
      <section>
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-4 text-white/40">
          <span className="w-12 h-[1px] bg-white/20" />
          Luz & Sombra
          <span className="w-12 h-[1px] bg-white/20" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Sparkles size={20} className="text-yellow-400" />
              <h3 className="text-xl font-serif text-white">Luz & Potencial</h3>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                {luz.map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-300 text-sm md:text-base font-light leading-relaxed group">
                    <span className={clsx("mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover:scale-125", theme.accent, "bg-current shadow-[0_0_8px_currentColor]")} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-rose-900/10">
              <Layers size={20} className="text-rose-400" />
              <h3 className="text-xl font-serif text-white">Sombra & Desafios</h3>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                {sombra.map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-300 text-sm md:text-base font-light leading-relaxed group">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] transition-all group-hover:scale-125" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DA VIDA */}
      <section>
        <h2 className={clsx("text-xs font-bold uppercase tracking-[0.4em] mb-8 flex items-center gap-4", theme.accent)}>
          <span className="w-8 h-[1px] bg-white/10" />
          Influência Prática
          <span className="w-8 h-[1px] bg-white/10" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
            <Briefcase className="text-blue-400 mb-4" size={24} />
            <h4 className="text-white font-serif text-lg mb-2">Carreira & Missão</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{carreira}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors">
            <Heart className="text-rose-400 mb-4" size={24} />
            <h4 className="text-white font-serif text-lg mb-2">Amor & Relações</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{relacionamentos}</p>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-colors flex flex-col">
            <Activity className="text-emerald-400 mb-4" size={24} />
            <h4 className="text-white font-serif text-lg mb-2">Vitalidade & Corpo</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">{saude.vulnerabilidade}</p>
            <div className="mt-auto space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 flex items-center gap-1 mb-1">
                  <AlertTriangle size={10} /> Sintomas Comuns
                </span>
                <div className="flex flex-wrap gap-1">
                  {saude.sintomas.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-red-500/10 text-red-200 text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <ShieldCheck size={10} /> Prevenção
                </span>
                <ul className="text-xs text-slate-400 list-disc list-inside">
                  {saude.prevencao.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSELHOS */}
      <section className="pb-10">
        <div className="bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className={clsx("absolute top-0 left-0 w-full h-1 bg-gradient-to-r", theme.gradient)} />
          <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
            <Lightbulb className={clsx(theme.accent)} />
            Diretrizes Evolutivas
          </h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-4">
            {conselho.map((item, i) => (
              <div key={i} className="break-inside-avoid bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  "{item}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'essencia':
        return renderEssenciaTab();
      case 'sombras':
        return (
          <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
            <SombraQuiz />
            <TrilhaTransmutacao />
            <div className="opacity-40">
              <ShadowView arcano={arcano} onClose={onClose} embedded />
            </div>
          </div>
        );
      case 'diretrizes':
        return <EvolutiveGuidelinesView arcano={arcano} onClose={onClose} embedded />;
      case 'roda':
        return <LifeWheelView arcano={arcano} onClose={onClose} embedded />;
      case 'afirmacoes':
        return <DailyAffirmationView arcano={arcano} onClose={onClose} embedded />;
      case 'jornal':
        return <JournalView arcano={arcano} onClose={onClose} embedded />;
      case 'farmacia':
        return (
          <div className="max-w-3xl mx-auto px-6 py-10">
            <FarmaciaAlquimica alquimia={arcano.alquimia} />
          </div>
        );
      case 'som':
        return <SoundTherapyView arcano={arcano} />;
      case 'cosmos':
        return <ArcanoCosmosView arcano={arcano} mapa={mapa} insights={insightsCombinados} />;
      default:
        return renderEssenciaTab();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#050505] text-white overflow-y-auto custom-scrollbar scroll-smooth"
    >
      {/* --- FIXED HEADER with Arcano context + Tabs --- */}
      <div className="sticky top-0 z-[60] bg-[#050505]/90 backdrop-blur-2xl border-b border-white/5">
        {/* Top bar: Back + Arcano name */}
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all hover:scale-105 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium tracking-wide text-sm hidden sm:inline">Voltar</span>
          </button>

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={clsx(
              "w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0",
              theme.border, theme.bgIcon
            )}>
              <span className={clsx("font-serif text-sm font-bold", theme.accent)}>
                {arcano.numeroRomano}
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-serif text-white truncate">{arcano.nome}</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-wider truncate">
                {arcano.elemento} • {arcano.planeta}
              </p>
            </div>
          </div>
        </div>

        {/* Tab navigation (Pill Menu) */}
        <div className="overflow-x-auto no-scrollbar py-4">
          <div className="flex items-center justify-center gap-2 px-6 min-w-max max-w-5xl mx-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className={clsx(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                    isActive
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "text-slate-400 hover:text-slate-200 bg-transparent border-transparent hover:bg-white/5"
                  )}
                >
                  <Icon size={14} className={clsx(isActive ? "text-amber-500" : "text-slate-500")} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- TAB CONTENT --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="min-h-[70vh]"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="text-center pb-16 text-white/10 text-xs uppercase tracking-[0.5em] font-serif border-t border-white/5 pt-8 mt-10">
        Arcano {arcano.numeroRomano} • {arcano.nome}
      </div>
    </div>
  );
};
