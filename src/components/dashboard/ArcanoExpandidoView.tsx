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
import { deArcano } from '../../utils/calculos';
import { paletaDoArcano, bordaGradiente, type PaletaArcano } from '../../utils/arcanoPalette';
import { MAJOR_ARCANA } from '../../lib/cardImages';

interface Props {
  arcano: ArcanoAdvanced;
  userData: UserBirthData;
  mapa: MapaAstralCalculado | null;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
  initialTab?: ArcanoTab;
}

/** Cartão de atributo da assinatura numérica. */
const Atributo: React.FC<{ rotulo: string; valor: string; paleta: PaletaArcano }> = ({ rotulo, valor, paleta }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
    <p className="text-[9.5px] uppercase tracking-[0.18em] mb-1.5" style={{ color: paleta.tinta }}>
      {rotulo}
    </p>
    <p className="text-[14.5px] text-white/85 leading-snug">{valor}</p>
  </div>
);

// --- THEME ENGINE ---
function getArcanaTheme(element: string) {
  // Alguns arcanos têm elemento composto ("Água/Fogo" n'O Carro, regido por
  // Lua e Marte). O tema segue o primeiro, que é o dominante.
  const principal = (element || '').split('/')[0].trim().toLowerCase();

  switch (principal) {
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
  // Paleta do próprio arcano, com a luminosidade ajustada para o texto ficar
  // legível sobre o fundo escuro. Ver utils/arcanoPalette.ts.
  const paleta = useMemo(
    () => paletaDoArcano((arcano as any).cor, (arcano as any).cor_secundaria),
    [(arcano as any).cor, (arcano as any).cor_secundaria]
  );

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
  const renderEssenciaTab = () => {
    // Atributos do arcano que estavam gravados no JSON e nenhuma aba exibia.
    const ficha = [
      { rotulo: 'Elemento', valor: arcano.elemento },
      { rotulo: 'Regente', valor: arcano.planeta_regente || arcano.planeta },
      { rotulo: 'Signo', valor: arcano.signo_zodiacal },
      { rotulo: 'Dia', valor: (arcano as any).dia_semana },
      { rotulo: 'Chacra', valor: arcano.chacra_regente },
      { rotulo: 'Número', valor: (arcano as any).numero_sorte },
    ].filter(f => f.valor && f.valor !== 'N/A');

    const numerologia = (arcano as any).numerologia as
      | { alma: number; personalidade: string; caminho: string; desafio: string }
      | undefined;
    const pergunta = (arcano as any).pergunta_junguiana as string | undefined;
    const cartaOposta = (arcano as any).carta_oposta as string | undefined;

    return (
    <div className="max-w-4xl mx-auto px-5 md:px-6 py-10 space-y-14 md:space-y-20">

      {/* ═══ CARTUCHO DE IDENTIDADE ═══ */}
      <section>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={bordaGradiente(paleta, `linear-gradient(160deg, ${paleta.lavagem}, transparent 70%)`)}
        >

          <div className="relative p-7 md:p-10">
            <div className="flex items-start gap-5 md:gap-8">
              {/* A carta em si. Proporção 300×527 do baralho. */}
              <figure
                className="shrink-0 w-[92px] md:w-[132px] rounded-lg overflow-hidden border m-0"
                style={{
                  borderColor: paleta.borda,
                  boxShadow: `0 12px 38px -12px ${paleta.brilho}, 0 0 0 1px rgba(0,0,0,0.4)`
                }}
              >
                <img
                  src={MAJOR_ARCANA[arcano.numero]?.file || MAJOR_ARCANA[0].file}
                  alt={`Carta ${arcano.nome}`}
                  width={300}
                  height={527}
                  loading="lazy"
                  className="block w-full h-auto"
                />
              </figure>

              <div className="min-w-0 flex-1 pt-1">
                <p
                  className="font-mono text-[11px] tracking-[0.28em] mb-1.5"
                  style={{ color: paleta.tinta }}
                >
                  {arcano.numeroRomano} · ARCANO {arcano.numero}
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-white leading-none mb-3 text-balance">
                  {arcano.nome}
                </h2>
                <p className="text-sm md:text-base text-white/50 font-light">
                  {(arcano as any).subtitulo || arcano.palavrasChave?.join(' • ')}
                </p>

                {/* Ficha ao lado da carta, para aproveitar a altura dela. */}
                {ficha.length > 0 && (
                  <dl
                    className="hidden md:grid mt-7 grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t"
                    style={{ borderColor: paleta.borda }}
                  >
                    {ficha.map(f => (
                      <div key={f.rotulo}>
                        <dt className="text-[9.5px] uppercase tracking-[0.18em] text-white/30 mb-0.5">{f.rotulo}</dt>
                        <dd className="text-sm text-white/85 leading-snug">{f.valor}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>

            {/* No mobile a ficha vai abaixo, em largura cheia. */}
            {ficha.length > 0 && (
              <dl className="md:hidden mt-7 grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t" style={{ borderColor: paleta.borda }}>
                {ficha.map(f => (
                  <div key={f.rotulo}>
                    <dt className="text-[9.5px] uppercase tracking-[0.18em] text-white/30 mb-0.5">{f.rotulo}</dt>
                    <dd className="text-sm text-white/85 leading-snug">{f.valor}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* ═══ A ALMA DO ARQUÉTIPO ═══ */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: paleta.tinta }}>
          A alma do arquétipo
        </h3>
        <p className="font-serif text-2xl md:text-3xl leading-[1.3] text-white mb-6 text-balance">
          {essenciaHighlight}.
        </p>
        <p className="text-base md:text-lg text-white/60 font-light leading-relaxed max-w-[62ch]">
          {essenciaBody}
        </p>

        <div
          className="mt-9 rounded-2xl border px-6 py-5 flex items-start gap-4"
          style={{ borderColor: paleta.borda, background: paleta.lavagem }}
        >
          <Sparkles size={17} className="mt-1 shrink-0" style={{ color: paleta.tinta }} />
          <p className="font-serif italic text-lg md:text-xl text-white/90 leading-snug">
            “{arcano.mantra}”
          </p>
        </div>
      </section>

      {/* ═══ A PERGUNTA ═══ */}
      {pergunta && (
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-white/35">
            A pergunta que este arcano faz
          </h3>
          <blockquote
            className="border-l-2 pl-6 md:pl-8 font-serif text-xl md:text-2xl leading-snug text-white/90 text-balance"
            style={{ borderColor: paleta.tinta }}
          >
            {pergunta}
          </blockquote>
        </section>
      )}

      {/* ═══ LUZ & SOMBRA ═══ */}
      <section>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-white/35">
          Luz e sombra
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <h4 className="text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: paleta.tinta }}>
              Potencial
            </h4>
            <ul className="space-y-3">
              {luz.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14.5px] text-white/70 font-light leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: paleta.tinta }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-6">
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-rose-300/80 mb-4">Sombra</h4>
            <ul className="space-y-3">
              {sombra.map((item, i) => (
                <li key={i} className="flex gap-3 text-[14.5px] text-white/70 font-light leading-relaxed">
                  <span className="mt-[7px] w-1 h-1 rounded-full shrink-0 bg-rose-400/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ NUMEROLOGIA E CARTA OPOSTA ═══ */}
      {(numerologia || cartaOposta) && (
        <section>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-white/35">
            Assinatura numérica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {numerologia && (
              <>
                <Atributo rotulo="Personalidade" valor={numerologia.personalidade} paleta={paleta} />
                <Atributo rotulo="Caminho" valor={numerologia.caminho} paleta={paleta} />
                <Atributo rotulo="Desafio" valor={numerologia.desafio} paleta={paleta} />
              </>
            )}
          </div>

          {cartaOposta && (
            <div
              className="mt-4 rounded-2xl border px-6 py-5 flex flex-wrap items-baseline gap-x-3 gap-y-1"
              style={{ borderColor: paleta.borda }}
            >
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-white/30">Carta complementar</span>
              <span className="font-serif text-lg text-white/90">{cartaOposta}</span>
              <span className="text-[13px] text-white/40 font-light basis-full mt-1">
                O arquétipo que equilibra {deArcano(arcano.nome)} — o que falta quando este está em excesso.
              </span>
            </div>
          )}
        </section>
      )}

      {/* ═══ CONSELHO ═══ */}
      {conselho.length > 0 && (
        <section className="pb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-white/35">
            Conselho do arcano
          </h3>
          <ol className="space-y-3">
            {conselho.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <span
                  className="font-mono text-[11px] shrink-0 mt-0.5 tabular-nums"
                  style={{ color: paleta.tinta }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14.5px] text-white/70 font-light leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'essencia':
        return renderEssenciaTab();
      case 'sombras':
        return (
          <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
            {/*
              O `opacity-40` que ficava aqui deixava o conteúdo REAL das sombras
              — os 4 padrões do arcano, com antídoto, exercício e o programa de
              21 dias — a 40% de opacidade, atrás de um quiz genérico e de uma
              trilha de progresso falso. Era o material completo escondido para
              destacar o que era mockup.
            */}
            <SombraQuiz />
            <ShadowView arcano={arcano} onClose={onClose} embedded />
            <TrilhaTransmutacao />
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
            <FarmaciaAlquimica arcano={arcano} />
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
            <div
              className="w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: paleta.borda, background: paleta.lavagem }}
            >
              <span className="font-serif text-sm font-bold" style={{ color: paleta.tinta }}>
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
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                    isActive
                      ? "border"
                      : "text-slate-400 hover:text-slate-200 bg-transparent border-transparent hover:bg-white/5"
                  )}
                  style={isActive ? {
                    color: paleta.tinta,
                    background: paleta.lavagem,
                    borderColor: paleta.borda,
                    boxShadow: `0 0 16px ${paleta.lavagem}`
                  } : undefined}
                >
                  <Icon size={14} className={clsx(!isActive && "text-slate-500")} />
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
