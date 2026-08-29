import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { paletaDoArcano } from '../../utils/arcanoPalette';
import {
    ArrowLeft, Heart, Wallet, Activity, Briefcase, Users, Compass,
    ChevronLeft, ChevronRight, History, Sparkles, Save, FileText,
    Lock, CheckCircle2, TrendingUp, Calendar, X, Check, Target,
    Zap, RefreshCw, AlertTriangle, Star, ChevronDown
} from 'lucide-react';
import { ArcanoAdvanced, AreaDaVida, Trimestre, SubMeta, MicroAcao } from '../../types';
import { AREA_LABELS, AREA_COLORS } from '../../data/lifeAreaInterpretations';
import { useUserProgress } from '../../hooks/useUserProgress';
import { getSeasonalInsight } from '../../data/seasonalInsights';
import { cn } from '../../utils';

const AREA_ICONS: Record<string, React.FC<{ className?: string; size?: number }>> = {
    AMOR: Heart, DINHEIRO: Wallet, SAUDE: Activity,
    CARREIRA: Briefcase, FAMILIA: Users, PROPOSITO: Compass,
};

const AREAS: AreaDaVida[] = ['AMOR', 'DINHEIRO', 'SAUDE', 'CARREIRA', 'FAMILIA', 'PROPOSITO'];
const QUARTERS: { id: Trimestre; label: string; months: string }[] = [
    { id: 'Q1', label: 'Q1', months: 'Jan-Mar' },
    { id: 'Q2', label: 'Q2', months: 'Abr-Jun' },
    { id: 'Q3', label: 'Q3', months: 'Jul-Set' },
    { id: 'Q4', label: 'Q4', months: 'Out-Dez' },
];

const QUARTER_COPY: Record<Trimestre, { title: string; msg: string; icon: string }> = {
    Q1: { title: 'Tempo de Plantar', msg: 'Início do ciclo. Defina intenções claras. Notas baixas agora são sementes, não falhas.', icon: '🌱' },
    Q2: { title: 'Tempo de Agir', msg: 'Momento de ação. Revise suas metas Q1. O que funcionou? Ajuste o curso com coragem.', icon: '🔥' },
    Q3: { title: 'Tempo de Colher', msg: 'Colheita parcial. Celebre os avanços, mesmo que pequenos. A transformação é real.', icon: '✨' },
    Q4: { title: 'Tempo de Integrar', msg: 'O que você aprendeu este ano? Honre seu caminho e prepare-se para o ciclo seguinte.', icon: '🌙' },
};

const SATISFACTION_LABEL = (n: number) =>
    n <= 3 ? 'Sobrevivendo' : n <= 6 ? 'Equilibrando' : 'Florescendo';

const SATISFACTION_COLOR = (n: number) =>
    n <= 3 ? 'text-rose-400' : n <= 6 ? 'text-[var(--rv-tinta)]' : 'text-emerald-400';

const DEFAULT_MICRO_ACOES = [
    '15 min de planejamento',
    'Conversar com alguém de confiança',
    'Pesquisar recursos sobre o tema',
];

interface Props { arcano: ArcanoAdvanced; onClose: () => void; embedded?: boolean; }

// ─── RADAR SVG ────────────────────────────────────────────────────────────────
/**
 * As variáveis que substituem o âmbar fixo desta tela.
 *
 * A Roda da Vida pintava tudo de `amber-500`, independentemente do arcano — a
 * aba ficava dourada mesmo quando o cabeçalho e a aba ativa estavam na cor do
 * arcano. Aqui as classes viraram `var(--rv-*)` e estas são as definições,
 * derivadas da mesma paleta acessível que a Essência usa.
 *
 * Os preenchimentos sólidos usam `tinta`, não a cor bruta: arcanos escuros
 * (A Lua, O Eremita) deixariam a barra do slider quase invisível no fundo preto.
 */
function variaveisDaPaleta(cor?: string, corSecundaria?: string): React.CSSProperties {
    const p = paletaDoArcano(cor, corSecundaria);
    return {
        '--rv-tinta': p.tinta,
        '--rv-suave': p.tintaSuave,
        '--rv-apoio': p.apoio,
        '--rv-forte': `${p.tinta}33`,
        '--rv-lavagem': p.lavagem,
        '--rv-borda': p.borda,
        '--rv-borda-forte': `${p.tinta}66`,
        // degraus de alfa para brilhos e para o preenchimento do radar
        '--rv-a05': `${p.tinta}0d`,
        '--rv-a18': `${p.tinta}2e`,
        '--rv-a30': `${p.tinta}4d`,
        '--rv-a50': `${p.tinta}80`,
        '--rv-a60': `${p.tinta}99`,
    } as React.CSSProperties;
}

function RadarChart({ currentData, prevData, goalData, pulsing }: {
    currentData: number[]; prevData: number[] | null; goalData: number[];
    pulsing?: boolean;
}) {
    const cx = 150, cy = 150, maxR = 110;
    const angleStep = (2 * Math.PI) / AREAS.length;

    const pts = (data: number[]) => data.map((val, i) => {
        const r = (val / 10) * maxR;
        const angle = angleStep * i - Math.PI / 2;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });

    const poly = (points: { x: number; y: number }[]) => points.map(p => `${p.x},${p.y}`).join(' ');

    const currentPts = pts(currentData);
    const goalPts = pts(goalData);
    const prevPts = prevData ? pts(prevData) : null;

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_var(--rv-a18)]">
            {/* Grid */}
            {[2, 4, 6, 8, 10].map(r => (
                <circle key={r} cx={cx} cy={cy} r={(r / 10) * maxR} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
            ))}
            {AREAS.map((_, i) => {
                const angle = angleStep * i - Math.PI / 2;
                return <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(angle)} y2={cy + maxR * Math.sin(angle)} stroke="white" strokeOpacity="0.08" strokeWidth="1" />;
            })}

            {/* Goal layer */}
            <polygon points={poly(goalPts)} fill="var(--rv-a05)" stroke="var(--rv-tinta)" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.5" />

            {/* Prev layer */}
            {prevPts && <polygon points={poly(prevPts)} fill="rgba(255,255,255,0.04)" stroke="white" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" />}

            {/* Current layer */}
            <motion.polygon
                layout points={poly(currentPts)}
                fill="var(--rv-a18)" stroke="var(--rv-tinta)" strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 8px var(--rv-a30))' }}
            />
            {currentPts.map((p, i) => (
                <motion.circle key={i} layout cx={p.x} cy={p.y} r="4" fill="var(--rv-tinta)" />
            ))}
            {goalPts.map((p, i) => (
                <circle key={`g${i}`} cx={p.x} cy={p.y} r="3" fill="none" stroke="var(--rv-tinta)" strokeWidth="1.5" opacity="0.6" />
            ))}

            {/* Labels */}
            {AREAS.map((area, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const r = maxR + 45;
                return (
                    <text key={area} x={cx + r * Math.cos(angle)} y={cy + r * Math.sin(angle)}
                        textAnchor="middle" dominantBaseline="middle"
                        fill={pulsing ? 'var(--rv-a60)' : 'rgba(255,255,255,0.35)'}
                        fontSize="9" fontWeight="bold" className="font-sans uppercase tracking-[0.1em]">
                        {AREA_LABELS[area]}
                    </text>
                );
            })}
        </svg>
    );
}

// ─── ONBOARDING WIZARD ────────────────────────────────────────────────────────
function OnboardingWizard({ arcano, onComplete, progress, updateLifeArea, getLifeAreaRating, getCurrentYearAndQuarter, embedded }: any) {
    const [step, setStep] = useState(0);
    const [selectedPriorities, setSelectedPriorities] = useState<AreaDaVida[]>([]);
    const [goalText, setGoalText] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const { ano, trimestre: currentQ } = getCurrentYearAndQuarter();

    const getAreaScore = (area: AreaDaVida) =>
        getLifeAreaRating(area, ano, currentQ)?.nota ?? 5;

    const filledCount = AREAS.filter(a => {
        const r = getLifeAreaRating(a, ano, currentQ);
        return r && r.nota !== 5;
    }).length;

    const canAdvanceStep0 = filledCount >= 3;

    const togglePriority = (area: AreaDaVida) => {
        setSelectedPriorities(prev =>
            prev.includes(area) ? prev.filter(a => a !== area)
                : prev.length < 2 ? [...prev, area] : prev
        );
    };

    const finish = () => {
        setShowConfetti(true);
        setTimeout(() => onComplete(selectedPriorities), 1500);
    };

    const steps = [
        {
            title: 'Avalie Sua Realidade',
            subtitle: 'Toque em cada área e arraste o ponto para sua satisfação atual.',
            hint: '0 = insatisfação total · 10 = realização plena',
        },
        {
            title: 'Escolha Seu Foco',
            subtitle: `O Arcano ${arcano.nome} indica onde sua energia deve fluir este trimestre. Selecione até 2 áreas prioritárias.`,
            hint: 'Sugestão do Oráculo marcada em dourado',
        },
        {
            title: 'Defina Sua Meta Arcana',
            subtitle: 'Uma intenção clara é o início de toda transformação.',
            hint: 'Mínimo 10 caracteres',
        },
    ];

    return (
        // `min-h-screen` + centralização vertical dentro da aba empurrava o
        // conteúdo para o meio de uma viewport inteira, deixando ~500px de
        // vazio acima do "Passo 1 de 3". Embutido, o assistente começa no topo.
        <div
            className={cn(
                'p-6',
                embedded ? '' : 'min-h-screen bg-[#020617] flex items-center justify-center'
            )}
            style={variaveisDaPaleta((arcano as any)?.cor, (arcano as any)?.cor_secundaria)}
        >
            {showConfetti && (
                <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                    <div className="text-8xl animate-bounce">✨</div>
                </div>
            )}

            <div className="w-full max-w-2xl mx-auto">
                {/* Progress bar */}
                <div className="flex gap-2 mb-10">
                    {steps.map((_, i) => (
                        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                            <motion.div animate={{ width: i <= step ? '100%' : '0%' }}
                                transition={{ duration: 0.4 }}
                                className="h-full bg-[var(--rv-tinta)]" />
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <div className="mb-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--rv-suave)] mb-2">Passo {step + 1} de 3</p>
                            <h2 className="text-3xl font-serif text-slate-100 mb-2">{steps[step].title}</h2>
                            <p className="text-slate-400 text-sm">{steps[step].subtitle}</p>
                            <p className="text-[var(--rv-suave)] text-[11px] mt-2 italic">{steps[step].hint}</p>
                        </div>

                        {step === 0 && (
                            <div className="space-y-3">
                                {AREAS.map(area => {
                                    const Icon = AREA_ICONS[area];
                                    const nota = getAreaScore(area);
                                    return (
                                        <div key={area} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <Icon size={16} className="text-[var(--rv-tinta)]" />
                                                    <span className="text-sm font-serif text-slate-200">{AREA_LABELS[area]}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn('text-xs font-bold', SATISFACTION_COLOR(nota))}>{SATISFACTION_LABEL(nota)}</span>
                                                    <span className="text-[var(--rv-tinta)] font-mono font-bold text-sm w-5 text-right">{nota}</span>
                                                </div>
                                            </div>
                                            <input type="range" min="0" max="10" value={nota}
                                                onChange={e => updateLifeArea(area, +e.target.value, undefined, { ano, trimestre: currentQ })}
                                                className="w-full h-1.5 appearance-none bg-white/10 rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[var(--rv-tinta)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_12px_var(--rv-borda-forte)]"
                                                style={{ background: `linear-gradient(to right,var(--rv-tinta) 0%,var(--rv-tinta) ${nota * 10}%,rgba(255,255,255,0.05) ${nota * 10}%)` }}
                                            />
                                        </div>
                                    );
                                })}
                                <div className="text-center text-[11px] text-slate-500 mt-2">
                                    {filledCount < 3
                                        ? `Avalie mais ${3 - filledCount} ${3 - filledCount === 1 ? 'área' : 'áreas'} para continuar`
                                        : `✓ ${filledCount} ${filledCount === 1 ? 'área avaliada' : 'áreas avaliadas'}`}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="grid grid-cols-2 gap-3">
                                {AREAS.map(area => {
                                    const Icon = AREA_ICONS[area];
                                    const nota = getAreaScore(area);
                                    const isPriority = selectedPriorities.includes(area);
                                    const isOraculo = area === arcano.areaFoco || nota <= 4;
                                    return (
                                        <button key={area} onClick={() => togglePriority(area)}
                                            className={cn(
                                                'p-4 rounded-2xl border transition-all text-left',
                                                isPriority ? 'bg-[var(--rv-forte)] border-[var(--rv-borda-forte)] shadow-[0_0_20px_var(--rv-a18)]' : 'bg-slate-900/50 border-white/5 hover:border-white/20'
                                            )}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon size={16} className={isPriority ? 'text-[var(--rv-tinta)]' : 'text-slate-400'} />
                                                <span className={cn('text-sm font-serif', isPriority ? 'text-[var(--rv-tinta)]' : 'text-slate-300')}>{AREA_LABELS[area]}</span>
                                                {isOraculo && <span className="ml-auto text-[9px] bg-[var(--rv-forte)] text-[var(--rv-tinta)] px-1.5 py-0.5 rounded font-bold">Oráculo</span>}
                                            </div>
                                            <div className="text-xs text-slate-500">Atual: <span className="font-mono text-[var(--rv-tinta)]">{nota}</span>/10</div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="bg-slate-900/60 border border-[var(--rv-borda)] rounded-2xl p-6">
                                    <p className="text-[10px] uppercase tracking-widest text-[var(--rv-suave)] mb-3 font-bold">Foco Escolhido: {selectedPriorities.map(a => AREA_LABELS[a]).join(' + ') || 'Não definido'}</p>
                                    <label className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 block">Sua Meta Arcana para este trimestre</label>
                                    <textarea rows={4}
                                        placeholder={`Ex: Cultivar 2 novos hábitos que ativem a ${arcano.nome === 'O Louco' ? 'criatividade' : 'força'} do Arcano ${arcano.nome} até o fim do trimestre, medido por...`}
                                        value={goalText}
                                        onChange={e => setGoalText(e.target.value)}
                                        className="w-full bg-slate-950/80 border border-white/5 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-700 focus:border-[var(--rv-borda-forte)] transition-all outline-none resize-none"
                                    />
                                    <p className="text-[10px] text-slate-600 mt-2">
                                        {goalText.length < 10 ? `${10 - goalText.length} caracteres para uma meta válida` : '✓ Meta definida com clareza'}
                                    </p>
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {['Específica', 'Mensurável', 'Arcana'].map(label => (
                                            <div key={label} className="text-center p-2 bg-white/[0.02] rounded-lg border border-white/5">
                                                <p className="text-[9px] uppercase tracking-widest text-[var(--rv-suave)] font-bold">{label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="flex gap-3 mt-8">
                    {step > 0 && (
                        <button onClick={() => setStep(s => s - 1)}
                            className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-slate-400 text-sm">
                            <ChevronLeft size={16} />
                        </button>
                    )}
                    <button
                        onClick={() => step < 2 ? setStep(s => s + 1) : finish()}
                        disabled={step === 0 && !canAdvanceStep0 || step === 2 && goalText.length < 10}
                        className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[var(--rv-tinta)] to-[var(--rv-apoio)] text-black font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_var(--rv-a30)] hover:shadow-[0_0_40px_var(--rv-a50)] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        {step < 2 ? 'Continuar →' : '✨ Selar Minha Intenção'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── AREA CARD (expanded) ─────────────────────────────────────────────────────
function AreaCard({ area, arcano, rating, updateLifeArea, updateLifeAreaGoal, toggleSubMeta, toggleMicroAcao, period, prevNota, allRatings }: any) {
    const Icon = AREA_ICONS[area];
    const nota = rating?.nota ?? 5;
    const notaAlvo = rating?.notaAlvo ?? nota;
    const metaGoal = rating?.metaGoal ?? rating?.meta ?? '';
    const subMetas: SubMeta[] = rating?.subMetas ?? [];
    const microAcoes: MicroAcao[] = rating?.microAcoes ?? DEFAULT_MICRO_ACOES.map((t, i) => ({ id: `ma-${i}`, texto: t, done: false }));
    const insight = getSeasonalInsight(arcano.numero, period.trimestre, area);
    const diff = prevNota !== null ? nota - prevNota : 0;

    const [showGoalForm, setShowGoalForm] = useState(false);
    const [goalDraft, setGoalDraft] = useState(metaGoal);
    const [targetDraft, setTargetDraft] = useState(notaAlvo);

    const saveGoal = () => {
        const defaultSubs: SubMeta[] = [
            { id: 's1', texto: 'Dar o primeiro passo esta semana', done: false },
            { id: 's2', texto: 'Revisar progresso em 30 dias', done: false },
            { id: 's3', texto: 'Celebrar quando atingir a meta', done: false },
        ];
        updateLifeAreaGoal(area, {
            metaGoal: goalDraft,
            notaAlvo: targetDraft,
            microAcoes: microAcoes.length ? microAcoes : DEFAULT_MICRO_ACOES.map((t, i) => ({ id: `ma-${i}`, texto: t, done: false })),
            subMetas: subMetas.length ? subMetas : defaultSubs,
        }, period);
        setShowGoalForm(false);
    };

    // Evolution timeline from history
    const timeline = QUARTERS.map(q => {
        const r = allRatings.find((a: any) => a.area === area && a.trimestre === q.id && a.ano === period.ano);
        return { q: q.id, val: r?.nota ?? null };
    }).filter(t => t.val !== null);

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="group bg-slate-900/40 hover:bg-slate-900/60 rounded-[2.5rem] border border-white/5 hover:border-[var(--rv-borda)] transition-all overflow-hidden">
            <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--rv-lavagem)] flex items-center justify-center border border-[var(--rv-borda)] group-hover:border-[var(--rv-borda-forte)] transition-colors">
                            <Icon size={26} className="text-[var(--rv-tinta)] drop-shadow-[0_0_8px_var(--rv-a50)]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-serif text-slate-100">{AREA_LABELS[area]}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={cn('text-[11px] font-bold', SATISFACTION_COLOR(nota))}>{SATISFACTION_LABEL(nota)}</span>
                                {diff !== 0 && (
                                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-bold', diff > 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10')}>
                                        {diff > 0 ? '↑' : '↓'}{Math.abs(diff)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-mono font-light text-[var(--rv-tinta)]">{nota}</span>
                        {notaAlvo !== nota && <div className="text-[9px] text-[var(--rv-suave)] font-bold uppercase tracking-widest">Alvo: {notaAlvo}</div>}
                    </div>
                </div>

                {/* Slider */}
                <div className="relative mb-6">
                    <input type="range" min="0" max="10" value={nota}
                        onChange={e => updateLifeArea(area, +e.target.value, undefined, period)}
                        className="w-full h-1.5 appearance-none bg-white/10 rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[var(--rv-tinta)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_15px_var(--rv-borda-forte)]"
                        style={{ background: `linear-gradient(to right,var(--rv-tinta) 0%,var(--rv-tinta) ${nota * 10}%,rgba(255,255,255,0.05) ${nota * 10}%)` }}
                    />
                    <div className="flex justify-between text-[9px] text-slate-700 font-bold uppercase mt-1.5">
                        <span>Sobrevivendo</span><span>Equilibrando</span><span>Florescendo</span>
                    </div>
                </div>

                {/* Meta / Goal section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            <Target size={11} /> objetivo trimestral
                        </div>
                        <button onClick={() => setShowGoalForm(!showGoalForm)} className="text-[10px] text-[var(--rv-suave)] hover:text-[var(--rv-tinta)] transition-colors">
                            {showGoalForm ? 'Fechar' : metaGoal ? 'Editar' : '+ Definir'}
                        </button>
                    </div>

                    {metaGoal && !showGoalForm && (
                        <p className="text-[12px] text-slate-300 bg-white/[0.02] p-4 rounded-2xl border border-[var(--rv-borda)] italic">"{metaGoal}"</p>
                    )}

                    {/* PRO DESCRIPTION */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={nota}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 rounded-2xl bg-slate-950/40 border border-white/5"
                        >
                            <p className="text-[11px] text-white/70 leading-relaxed">
                                <span className="text-[var(--rv-tinta)] font-bold uppercase mr-1">Visão do Arcano:</span>
                                {(() => {
                                    const areaKey = area.toLowerCase();
                                    const interpretation = arcano.rodadaVida?.[areaKey];
                                    if (!interpretation) return 'Nenhuma interpretação disponível.';
                                    if (nota <= 3) return interpretation.baixa;
                                    if (nota <= 7) return interpretation.media;
                                    return interpretation.alta;
                                })()}
                            </p>
                            {(() => {
                                const areaKey = area.toLowerCase();
                                const interpretation = arcano.rodadaVida?.[areaKey];
                                if (interpretation?.check_diario) {
                                    return (
                                        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                                            <CheckCircle2 size={12} className="text-[var(--rv-suave)]" />
                                            <p className="text-[10px] text-[var(--rv-suave)] font-medium italic">
                                                {interpretation.check_diario}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })()}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence>
                        {showGoalForm && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                <div className="space-y-3 bg-slate-900/60 rounded-2xl p-4 border border-white/5">
                                    <textarea rows={3} value={goalDraft} onChange={e => setGoalDraft(e.target.value)}
                                        placeholder="O que você quer criar/transformar nesta área?"
                                        className="w-full bg-slate-950 border border-white/5 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-700 focus:border-[var(--rv-borda-forte)] outline-none resize-none" />
                                    <div className="flex items-center gap-3">
                                        <label className="text-[10px] text-slate-500 uppercase tracking-widest">Alvo:</label>
                                        <input type="number" min="1" max="10" value={targetDraft} onChange={e => setTargetDraft(+e.target.value)}
                                            className="w-16 bg-slate-950 border border-white/10 rounded-lg p-2 text-sm text-[var(--rv-tinta)] text-center outline-none focus:border-[var(--rv-borda-forte)]" />
                                        <span className="text-[10px] text-slate-600">/10 até fim do trimestre</span>
                                    </div>
                                    <button onClick={saveGoal} className="w-full py-2 bg-[var(--rv-forte)] hover:bg-[var(--rv-forte)] border border-[var(--rv-borda-forte)] rounded-xl text-[var(--rv-tinta)] text-[11px] font-bold uppercase tracking-widest transition-all">
                                        Salvar Objetivo
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sub-metas */}
                    {subMetas.length > 0 && (
                        <div className="space-y-2">
                            {subMetas.map(sm => (
                                <button key={sm.id} onClick={() => toggleSubMeta(area, sm.id, period)}
                                    className="w-full flex items-center gap-3 text-left group/sm">
                                    <div className={cn('w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0', sm.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 group-hover/sm:border-[var(--rv-borda-forte)]')}>
                                        {sm.done && <Check size={10} className="text-black" />}
                                    </div>
                                    <span className={cn('text-[11px]', sm.done ? 'line-through text-slate-600' : 'text-slate-400')}>{sm.texto}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Micro-ações */}
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2 flex items-center gap-1"><Zap size={10} /> Ação de Hoje</p>
                        <div className="flex flex-wrap gap-2">
                            {microAcoes.slice(0, 3).map(ma => (
                                <button key={ma.id} onClick={() => toggleMicroAcao(area, ma.id, period)}
                                    className={cn('text-[10px] px-3 py-1.5 rounded-full border transition-all font-medium', ma.done ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 line-through' : 'bg-white/5 border-white/10 text-slate-400 hover:border-[var(--rv-borda-forte)] hover:text-[var(--rv-tinta)]')}>
                                    {ma.texto}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Insight */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--rv-suave)]">
                            <Sparkles size={11} className="text-[var(--rv-tinta)]" /> Insight Sazonal
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-400 italic">"{insight}"</p>
                    </div>

                    {/* Evolution timeline */}
                    {timeline.length >= 2 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                            <History size={10} className="text-slate-600" />
                            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-600">
                                {timeline.map((t, i) => (
                                    <React.Fragment key={t.q}>
                                        <span className={cn(t.q === QUARTERS[QUARTERS.findIndex(q => q.id === t.q)].id ? 'text-[var(--rv-suave)]' : '')}>{t.q}:{t.val}</span>
                                        {i < timeline.length - 1 && <span className="text-slate-800">→</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const LifeWheelView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const {
        progress, updateLifeArea, updateLifeAreaGoal, toggleSubMeta,
        toggleMicroAcao, setOnboardingComplete, getLifeAreaRating, getCurrentYearAndQuarter
    } = useUserProgress(arcano.numero);

    const { ano: currentYear, trimestre: currentQuarter } = getCurrentYearAndQuarter();
    const [selectedQuarter, setSelectedQuarter] = useState<Trimestre>(currentQuarter);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [bannerDismissed, setBannerDismissed] = useState(false);

    const period = { ano: currentYear, trimestre: selectedQuarter };

    const isOnboarding = !progress.onboardingRodaComplete;

    const getQuarterData = (q: Trimestre) =>
        AREAS.map(area => getLifeAreaRating(area, currentYear, q)?.nota ?? 5);

    const currentData = getQuarterData(selectedQuarter);
    const goalData = AREAS.map(area => getLifeAreaRating(area, currentYear, selectedQuarter)?.notaAlvo ?? getLifeAreaRating(area, currentYear, selectedQuarter)?.nota ?? 5);
    const prevQuarterIndex = QUARTERS.findIndex(q => q.id === selectedQuarter) - 1;
    const prevData = prevQuarterIndex >= 0 ? getQuarterData(QUARTERS[prevQuarterIndex].id) : null;

    const isFuture = (q: Trimestre) => QUARTERS.findIndex(i => i.id === q) > QUARTERS.findIndex(i => i.id === currentQuarter);
    const isPast = (q: Trimestre) => QUARTERS.findIndex(i => i.id === q) < QUARTERS.findIndex(i => i.id === currentQuarter);

    // Days since last update check
    const lastUpdate = progress.areasVida
        .filter(a => a.trimestre === selectedQuarter && a.ano === currentYear)
        .map(a => a.lastCheckIn || a.dataRegistro)
        .sort()
        .pop();
    const daysSinceUpdate = lastUpdate
        ? Math.floor((Date.now() - new Date(lastUpdate).getTime()) / 86400000)
        : 999;
    const showCheckinAlert = daysSinceUpdate >= 7;

    const { conquistasAno, areasAlerta } = useMemo(() => {
        const conquistas = AREAS.filter(area => {
            const maxNota = Math.max(...QUARTERS.map(q => getLifeAreaRating(area, currentYear, q.id)?.nota ?? 0));
            return maxNota >= 8;
        });

        const alertas = AREAS.filter(area => {
            const lowCount = QUARTERS.filter(q => (getLifeAreaRating(area, currentYear, q.id)?.nota ?? 5) < 5).length;
            return lowCount >= 2;
        });

        return { conquistasAno: conquistas, areasAlerta: alertas };
    }, [currentYear, progress.areasVida, getLifeAreaRating]);

    if (isOnboarding) {
        return (
            <OnboardingWizard
                embedded={embedded}
                arcano={arcano}
                onComplete={(prioridades: AreaDaVida[]) => setOnboardingComplete(prioridades)}
                progress={progress}
                updateLifeArea={updateLifeArea}
                getLifeAreaRating={getLifeAreaRating}
                getCurrentYearAndQuarter={getCurrentYearAndQuarter}
            />
        );
    }

    const qCopy = QUARTER_COPY[selectedQuarter];

    return (
        <div
            className={cn('text-white', embedded ? '' : 'min-h-screen bg-[#020617] p-4 md:p-8')}
            style={variaveisDaPaleta((arcano as any).cor, (arcano as any).cor_secundaria)}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-4">
                    {!embedded && (
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 border border-white/5 transition-all">
                            <ArrowLeft size={18} className="text-white/60" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-serif font-light tracking-wide text-slate-100">Roda da Vida Evolutiva</h1>
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                            <Calendar size={14} className="text-[var(--rv-tinta)]" /> Ciclo {currentYear} — <span className="text-[var(--rv-tinta)] font-medium">{arcano.nome}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {showCheckinAlert && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--rv-lavagem)] border border-[var(--rv-borda-forte)] rounded-full animate-pulse">
                            <RefreshCw size={13} className="text-[var(--rv-tinta)]" />
                            <span className="text-[11px] text-[var(--rv-tinta)] font-bold">Ritual de Check-in</span>
                        </div>
                    )}
                    {/* Quarter selector */}
                    <div className="flex bg-slate-900/50 p-1 rounded-full border border-white/5 shadow-xl">
                        {QUARTERS.map(q => {
                            const active = selectedQuarter === q.id;
                            const future = isFuture(q.id);
                            const past = isPast(q.id);
                            return (
                                <button key={q.id} disabled={future} onClick={() => setSelectedQuarter(q.id)}
                                    className={cn('relative px-4 py-2.5 rounded-full transition-all flex flex-col items-center min-w-[80px]',
                                        active ? 'bg-[var(--rv-lavagem)]' : 'hover:bg-white/5',
                                        future && 'opacity-40 cursor-not-allowed')}>
                                    {active && <motion.div layoutId="q-pill" className="absolute inset-0 rounded-full border border-[var(--rv-borda-forte)]" />}
                                    <span className={cn('text-xs font-bold tracking-widest uppercase', active ? 'text-[var(--rv-tinta)]' : 'text-slate-400')}>{q.label}</span>
                                    <span className="text-[8px] uppercase tracking-widest text-slate-500">{q.months}</span>
                                    {q.id === currentQuarter && !active && <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[var(--rv-tinta)] animate-pulse" />}
                                    {past && <CheckCircle2 size={10} className="absolute top-1 right-2 text-emerald-500/60" />}
                                    {future && <Lock size={10} className="absolute top-1 right-2 text-slate-600" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Contextual Banner */}
            <AnimatePresence>
                {!bannerDismissed && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mb-6 bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{qCopy.icon}</span>
                            <div>
                                <p className="text-xs font-bold text-[var(--rv-tinta)] uppercase tracking-widest">{qCopy.title}</p>
                                <p className="text-sm text-slate-400">{qCopy.msg}</p>
                            </div>
                        </div>
                        <button onClick={() => setBannerDismissed(true)} className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left: Radar */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
                    <div className="relative w-full aspect-square flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-[var(--rv-lavagem)] rounded-full blur-[100px] pointer-events-none" />
                        <RadarChart currentData={currentData} prevData={prevData} goalData={goalData} />
                    </div>
                    <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
                        <div className="flex gap-3 text-[9px] text-slate-600 font-bold uppercase tracking-widest justify-center">
                            <span className="flex items-center gap-1"><span className="w-3 border-t-2 border-[var(--rv-borda-forte)] inline-block" /> Atual</span>
                            <span className="flex items-center gap-1"><span className="w-3 border-t-2 border-[var(--rv-borda-forte)] border-dashed inline-block" /> Meta</span>
                            {prevData && <span className="flex items-center gap-1"><span className="w-3 border-t border-white/20 border-dashed inline-block" /> Anterior</span>}
                        </div>
                        <button onClick={() => setShowHistoryModal(true)}
                            className="flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                            <History size={14} /> Visão Anual
                        </button>
                    </div>
                </div>

                {/* Right: Area Cards */}
                <div className="lg:col-span-7 space-y-4 pb-20">
                    {AREAS.map(area => {
                        const rating = getLifeAreaRating(area, currentYear, selectedQuarter);
                        const pqi = QUARTERS.findIndex(q => q.id === selectedQuarter) - 1;
                        const prevR = pqi >= 0 ? getLifeAreaRating(area, currentYear, QUARTERS[pqi].id) : null;
                        return (
                            <AreaCard key={area} area={area} arcano={arcano} rating={rating}
                                updateLifeArea={updateLifeArea}
                                updateLifeAreaGoal={updateLifeAreaGoal}
                                toggleSubMeta={toggleSubMeta}
                                toggleMicroAcao={toggleMicroAcao}
                                period={period}
                                prevNota={prevR?.nota ?? null}
                                allRatings={progress.areasVida}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Annual Modal */}
            <AnimatePresence>
                {showHistoryModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowHistoryModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-[#12121a] border border-white/10 rounded-[3rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-2xl font-serif">Curva de Evolução {currentYear}</h2>
                                    <p className="text-white/40 text-xs">6 áreas · 4 trimestres</p>
                                </div>
                                <button onClick={() => setShowHistoryModal(false)} className="text-white/40 hover:text-white bg-white/5 px-4 py-2 rounded-xl transition-colors">Fechar</button>
                            </div>

                            <div className="relative w-full h-[300px] bg-white/[0.01] rounded-[2rem] border border-white/5 p-6 mb-8">
                                <svg viewBox="0 0 800 250" className="w-full h-full overflow-visible">
                                    {[0, 2, 4, 6, 8, 10].map(v => (
                                        <g key={v}>
                                            <line x1="50" y1={200 - v * 18} x2="750" y2={200 - v * 18} stroke="white" strokeOpacity="0.05" />
                                            <text x="35" y={204 - v * 18} fill="white" fillOpacity="0.2" fontSize="10" textAnchor="end">{v}</text>
                                        </g>
                                    ))}
                                    {QUARTERS.map((q, i) => (
                                        <text key={q.id} x={100 + i * 200} y="230" fill="white" fillOpacity="0.4" fontSize="12" textAnchor="middle" fontWeight="bold">{q.label}</text>
                                    ))}
                                    {AREAS.map((area) => {
                                        const color = AREA_COLORS[area];
                                        const pathData = QUARTERS.map((q, qi) => {
                                            const nota = getLifeAreaRating(area, currentYear, q.id)?.nota ?? 5;
                                            return `${qi === 0 ? 'M' : 'L'} ${100 + qi * 200} ${200 - nota * 18}`;
                                        }).join(' ');
                                        return (
                                            <g key={area}>
                                                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
                                                    d={pathData} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                    style={{ filter: `drop-shadow(0 0 4px ${color}50)` }} />
                                                {QUARTERS.map((q, qi) => {
                                                    const nota = getLifeAreaRating(area, currentYear, q.id)?.nota ?? 5;
                                                    return <circle key={q.id} cx={100 + qi * 200} cy={200 - nota * 18} r="4" fill={color} />;
                                                })}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* Conquistas & Alertas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Star size={14} className="text-emerald-400" />
                                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Conquistas do Ano</h3>
                                    </div>
                                    {conquistasAno.length === 0
                                        ? <p className="text-xs text-emerald-900">Atingir 8+ em qualquer área este ano</p>
                                        : conquistasAno.map(area => {
                                            const Icon = AREA_ICONS[area];
                                            return <div key={area} className="flex items-center gap-2 text-sm text-emerald-300 mb-1"><Icon size={12} /> {AREA_LABELS[area]}</div>;
                                        })
                                    }
                                </div>
                                <div className="bg-rose-950/30 border border-rose-500/20 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertTriangle size={14} className="text-rose-400" />
                                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-rose-400">Áreas em Alerta</h3>
                                    </div>
                                    {areasAlerta.length === 0
                                        ? <p className="text-xs text-rose-900">Nenhuma área abaixo de 5 por 2+ trimestres</p>
                                        : areasAlerta.map(area => {
                                            const Icon = AREA_ICONS[area];
                                            return <div key={area} className="flex items-center gap-2 text-sm text-rose-300 mb-1"><Icon size={12} /> {AREA_LABELS[area]}</div>;
                                        })
                                    }
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {QUARTERS.map(q => {
                                    const avg = AREAS.reduce((acc, area) => acc + (getLifeAreaRating(area, currentYear, q.id)?.nota ?? 0), 0) / 6;
                                    return (
                                        <div key={q.id} className={cn('p-4 rounded-2xl border text-center', isFuture(q.id) ? 'bg-white/[0.02] border-white/5 opacity-50' : 'bg-white/5 border-white/10')}>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">{q.id}</p>
                                            <p className="text-xl font-serif text-white">{avg > 0 ? avg.toFixed(1) : '-'}</p>
                                            <p className="text-[9px] text-white/20 uppercase tracking-widest mt-1">Média</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
                                {AREAS.map(area => (
                                    <div key={area} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREA_COLORS[area] }} />
                                        <span className="text-[10px] font-bold uppercase tracking-tighter text-white/60">{AREA_LABELS[area]}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
