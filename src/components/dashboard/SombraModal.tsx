import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Eye, Sparkles, Play, Pause, RotateCcw, ChevronDown, ChevronUp,
    Check, Clock, BookOpen, AlertTriangle, Zap, AlertCircle, Flame,
} from 'lucide-react';
import { ShadowPattern, FrequenciaSombra } from '../../types';
import clsx from 'clsx';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProgressoSombra {
    status: 'novo' | 'em_progresso' | 'completa';
    diasCompletos: number[];
    jornal: string;
    ultimaAtividade: string;
}

interface Dia {
    numero: number;
    titulo: string;
    descricao: string;
    exercicio: string;
    duracao: string;
}

interface Props {
    sombra: ShadowPattern | null;
    arcanoNumero: number;
    isOpen: boolean;
    onClose: () => void;
    onProgressChange?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<FrequenciaSombra, { label: string; color: string; bg: string; border: string; icon: React.ReactNode; emoji: string }> = {
    BAIXA: { label: 'Leve', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: <Zap size={12} />, emoji: '🌿' },
    MEDIA: { label: 'Moderada', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: <AlertCircle size={12} />, emoji: '🌑' },
    ALTA: { label: 'Intensa', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: <AlertTriangle size={12} />, emoji: '🔥' },
    CRONICA: { label: 'Crônica', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: <Flame size={12} />, emoji: '💀' },
};

function getProgressoKey(arcanoNumero: number, sombraId: string) {
    return `shadow-progress-${arcanoNumero}-${sombraId}`;
}

export function getProgressoSombra(arcanoNumero: number, sombraId: string): ProgressoSombra | null {
    try {
        const raw = localStorage.getItem(getProgressoKey(arcanoNumero, sombraId));
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function saveProgressoSombra(arcanoNumero: number, sombraId: string, progresso: ProgressoSombra) {
    localStorage.setItem(getProgressoKey(arcanoNumero, sombraId), JSON.stringify(progresso));
}

function gerarDiasIntegracao(sombra: ShadowPattern): Dia[] {
    const ex = sombra.exercicioPratico;
    const primeiraInstrucao = ex.instrucoes?.[0] || sombra.antidoto;

    const dias: Dia[] = [];

    // FASE 1: OBSERVAÇÃO (Dias 1-7)
    dias.push({ numero: 1, titulo: 'Reconhecimento', descricao: `Identifique quando "${sombra.sinaisAtencao[0]?.split(',')[0]}" apareceu recentemente`, exercicio: primeiraInstrucao, duracao: '15 min' });
    dias.push({ numero: 2, titulo: 'O Antídoto', descricao: 'Prática ativa do remédio terapêutico', exercicio: sombra.antidoto, duracao: '20 min' });
    dias.push({ numero: 3, titulo: 'Somatização', descricao: 'Onde você sente esta sombra no corpo?', exercicio: 'Body scan: 5 respirações profundas, observe tensões físicas. Anote onde a sombra mora no corpo.', duracao: '15 min' });
    dias.push({ numero: 4, titulo: 'Gatilhos', descricao: 'O que dispara este padrão automaticamente?', exercicio: 'Observe 3 situações hoje que te tiraram do centro. O padrão tentou te "proteger"?', duracao: 'O dia todo' });
    dias.push({ numero: 5, titulo: 'Espelhamento', descricao: 'Quem ao seu redor manifesta este mesmo padrão?', exercicio: 'Projeção: o que te irrita nos outros é o que você nega em si. Identifique 1 pessoa.', duracao: '15 min' });
    dias.push({ numero: 6, titulo: 'Diálogo Interno', descricao: 'Escute a voz da sombra sem julgar', exercicio: 'Escreva: "Se minha sombra pudesse falar, ela diria que está preocupada com..."', duracao: '20 min' });
    dias.push({ numero: 7, titulo: 'Consolidação 1', descricao: 'Revisão da primeira semana de observação', exercicio: 'Leia suas anotações. Qual foi o maior aprendizado sobre este padrão até agora?', duracao: '15 min' });

    // FASE 2: DESCONSTRUÇÃO (Dias 8-14)
    dias.push({ numero: 8, titulo: 'Origem Primordial', descricao: 'Quando este padrão começou a te proteger?', exercicio: 'Escrita automática: "Este padrão nasceu quando eu..." — escreva sem censura.', duracao: '20 min' });
    dias.push({ numero: 9, titulo: 'Custo da Proteção', descricao: 'O que você perde ao manter este padrão ativo?', exercicio: 'Liste 3 oportunidades ou conexões que foram prejudicadas por esta sombra.', duracao: '15 min' });
    dias.push({ numero: 10, titulo: 'Necessidade Oculta', descricao: 'O que sua alma realmente deseja através disso?', exercicio: 'Atrás de cada sombra há uma necessidade legítima (segurança, amor, valor). Qual é a sua?', duracao: '15 min' });
    dias.push({ numero: 11, titulo: 'Perdoando a Defesa', descricao: 'Libere a culpa por ter precisado deste padrão', exercicio: 'Diga: "Eu te honro por ter me protegido, mas agora eu escolho novos caminhos."', duracao: '10 min' });
    dias.push({ numero: 12, titulo: 'A Sombra no Futuro', descricao: 'Como sua vida será daqui a 1 ano sem este peso?', exercicio: 'Visualize-se agindo com o antídoto de forma natural e sem esforço.', duracao: '15 min' });
    dias.push({ numero: 13, titulo: 'Sombra e Poder', descricao: 'Qual é o talento escondido neste desafio?', exercicio: 'Transformação: a raiva pode ser coragem; o medo pode ser prudência. E o seu?', duracao: '20 min' });
    dias.push({ numero: 14, titulo: 'Consolidação 2', descricao: 'Revisão da descida às raízes', exercicio: 'O que mudou na sua percepção sobre a "maldade" desta sombra?', duracao: '15 min' });

    // FASE 3: ALQUIMIA (Dias 15-21)
    dias.push({ numero: 15, titulo: 'Ação Inversa', descricao: 'Faça o oposto deliberado do padrão', exercicio: `Desafio: ${sombra.antidoto} aplicado em uma situação real hoje.`, duracao: 'O dia todo' });
    dias.push({ numero: 16, titulo: 'Vulnerabilidade', descricao: 'Exponha sua humanidade para alguém', exercicio: 'Compartilhe um dos seus desafios de integração com alguém de confiança.', duracao: '20 min' });
    dias.push({ numero: 17, titulo: 'Mantendo o Centro', descricao: 'Sustente o antídoto sob pressão', exercicio: 'Em um momento de estresse, respire e escolha a resposta consciente, não a reativa.', duracao: '15 min' });
    dias.push({ numero: 18, titulo: 'Gratidão Profunda', descricao: 'Agradeça à sombra pela jornada', exercicio: 'Carta final: "Obrigado por ser meu mestre. Agora eu sigo como o capitão."', duracao: '20 min' });
    dias.push({ numero: 19, titulo: 'Novo Nome', descricao: 'Rebatize esta energia integrada', exercicio: 'Em vez de "Medo", talvez agora seja "Sentinela". Qual o novo nome do seu padrão?', duracao: '10 min' });
    dias.push({ numero: 20, titulo: 'Sustentabilidade', descricao: 'Como manter esta integração viva?', exercicio: 'Crie um lembrete visual ou físico (um cristal ou objeto) para sua nova consciência.', duracao: '15 min' });
    dias.push({ numero: 21, titulo: 'Libertação Final', descricao: 'Ritual de encerramento e integração', exercicio: 'Ritual simbólico: queime o papel com o nome antigo e celebre sua nova soberania.', duracao: '30 min' });

    return dias;
}

// ─── Timer Component ──────────────────────────────────────────────────────────

const PraticaTimer: React.FC<{ minutos: number; onComplete: () => void }> = ({ minutos, onComplete }) => {
    const [seconds, setSeconds] = useState(minutos * 60);
    const [active, setActive] = useState(false);
    const [completed, setCompleted] = useState(false);
    const ref = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (active && seconds > 0) {
            ref.current = setInterval(() => {
                setSeconds(p => {
                    if (p <= 1) {
                        setActive(false); setCompleted(true);
                        if (ref.current) clearInterval(ref.current);
                        onComplete();
                        return 0;
                    }
                    return p - 1;
                });
            }, 1000);
        }
        return () => { if (ref.current) clearInterval(ref.current); };
    }, [active, seconds, onComplete]);

    const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const reset = () => { setActive(false); setCompleted(false); setSeconds(minutos * 60); };
    const pct = ((minutos * 60 - seconds) / (minutos * 60)) * 100;

    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/20 border border-white/10">
            {/* Circular progress */}
            <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
                    <circle cx="28" cy="28" r="24" fill="none"
                        stroke={completed ? '#10b981' : '#14b8a6'}
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (1 - pct / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={clsx('text-xs font-mono font-bold', completed ? 'text-emerald-400' : 'text-white/80')}>
                        {completed ? '✓' : fmt(seconds)}
                    </span>
                </div>
            </div>
            <div className="flex-1">
                <p className="text-white/50 text-xs mb-2">{completed ? 'Consciência Integrada ✨' : active ? 'Em plena transmutação...' : 'Pronto para respirar e agir?'}</p>
                <div className="flex gap-2">
                    <button
                        onClick={() => !completed && setActive(p => !p)}
                        disabled={completed}
                        className={clsx(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                            completed ? 'opacity-40 cursor-not-allowed bg-white/5 text-white/30' :
                                active ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    'bg-teal-600 hover:bg-teal-500 text-white'
                        )}
                    >
                        {active ? <><Pause size={12} /> Pausar</> : <><Play size={12} /> {seconds === minutos * 60 ? 'Iniciar' : 'Continuar'}</>}
                    </button>
                    <button onClick={reset} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white/50 transition-all">
                        <RotateCcw size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────

export const SombraModal: React.FC<Props> = ({ sombra, arcanoNumero, isOpen, onClose, onProgressChange }) => {
    const [planoExpanded, setPlanoExpanded] = useState(false);
    const [progresso, setProgresso] = useState<ProgressoSombra | null>(null);
    const [jornal, setJornal] = useState('');
    const [jornalDirty, setJornalDirty] = useState(false);

    // Load progress when shadow changes
    useEffect(() => {
        if (!sombra) return;
        const p = getProgressoSombra(arcanoNumero, sombra.id);
        setProgresso(p);
        setJornal(p?.jornal || '');
        setJornalDirty(false);
        setPlanoExpanded(false);
    }, [sombra, arcanoNumero]);

    // Save journal on unmount or shadow change if dirty
    useEffect(() => {
        return () => {
            if (jornalDirty && sombra) {
                flushJornal(sombra.id, jornal);
            }
        };
    }, [jornalDirty, sombra, jornal]);

    const flushJornal = useCallback((sombraId: string, text: string) => {
        const atual = getProgressoSombra(arcanoNumero, sombraId) || {
            status: 'novo' as const, diasCompletos: [], jornal: '', ultimaAtividade: new Date().toISOString(),
        };
        const novo = { ...atual, jornal: text };
        if (text && atual.status === 'novo') novo.status = 'em_progresso';
        saveProgressoSombra(arcanoNumero, sombraId, novo);
        setProgresso(novo);
        setJornalDirty(false);
        onProgressChange?.();
    }, [arcanoNumero, onProgressChange]);

    const completarDia = useCallback((diaNumero: number) => {
        if (!sombra) return;
        const atual = progresso || { status: 'novo' as const, diasCompletos: [], jornal: '', ultimaAtividade: '' };
        const novosDias = atual.diasCompletos.includes(diaNumero)
            ? atual.diasCompletos.filter(d => d !== diaNumero)
            : [...atual.diasCompletos, diaNumero];
        const novoStatus: ProgressoSombra['status'] = novosDias.length >= 21 ? 'completa' : novosDias.length > 0 ? 'em_progresso' : 'novo';
        const novo: ProgressoSombra = { ...atual, diasCompletos: novosDias, status: novoStatus, ultimaAtividade: new Date().toISOString() };
        saveProgressoSombra(arcanoNumero, sombra.id, novo);
        setProgresso(novo);
        onProgressChange?.();
    }, [sombra, progresso, arcanoNumero, onProgressChange]);

    const onTimerComplete = useCallback(() => {
        // Auto-mark day 1 as complete after timer
        if (!progresso?.diasCompletos.includes(1)) completarDia(1);
    }, [completarDia, progresso]);

    if (!sombra) return null;

    const sev = SEVERITY_CONFIG[sombra.frequenciaSombra];
    const dias = gerarDiasIntegracao(sombra);
    const feito = progresso?.diasCompletos || [];
    const percentual = Math.round((feito.length / 21) * 100);

    const gradientBySev: Record<FrequenciaSombra, string> = {
        BAIXA: 'from-emerald-950/40 via-slate-950 to-slate-950',
        MEDIA: 'from-amber-950/40 via-slate-950 to-slate-950',
        ALTA: 'from-orange-950/40 via-slate-950 to-slate-950',
        CRONICA: 'from-red-950/40 via-slate-950 to-slate-950',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] overflow-y-auto"
                    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <div className="min-h-screen p-4 md:p-8 flex items-start justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="w-full max-w-2xl bg-[#0d0d1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* ── Header ── */}
                            <div className={clsx('relative h-44 bg-gradient-to-b p-6 flex flex-col justify-end', gradientBySev[sombra.frequenciaSombra])}>
                                <button
                                    onClick={() => { if (jornalDirty) flushJornal(sombra.id, jornal); onClose(); }}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-white/60 hover:bg-black/50 hover:text-white transition-all"
                                >
                                    <X size={18} />
                                </button>

                                {/* Status badge top-left */}
                                {progresso?.status === 'completa' && (
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                                        <Check size={11} /> Integrada
                                    </div>
                                )}
                                {progresso?.status === 'em_progresso' && (
                                    <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                                        <Clock size={11} /> {percentual}% concluída
                                    </div>
                                )}

                                <div className="flex items-end gap-4">
                                    <span className="text-5xl">{sev.emoji}</span>
                                    <div>
                                        <span className={clsx('inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border mb-2', sev.bg, sev.border, sev.color)}>
                                            {sev.icon} {sev.label}
                                        </span>
                                        <h2 className="text-2xl font-serif text-white leading-tight">{sombra.nomePadrao}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* ── Body ── */}
                            <div className="p-6 space-y-7">

                                {/* Quote */}
                                <blockquote className="text-center text-white/70 italic font-serif text-base leading-relaxed px-4 border-l-2 border-white/10 pl-4 text-left">
                                    "{sombra.descricao.length > 140 ? sombra.descricao.substring(0, 137) + '…' : sombra.descricao}"
                                </blockquote>

                                {/* ── Sinais de Atenção ── */}
                                <section>
                                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <Eye size={13} /> Sinais de Atenção
                                    </h3>
                                    <ul className="space-y-2.5">
                                        {sombra.sinaisAtencao.map((sinal, idx) => (
                                            <li key={idx} className="flex items-start gap-3 bg-white/5 px-4 py-3 rounded-xl">
                                                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-white/75 text-sm leading-relaxed">{sinal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                {/* ── Antídoto ── */}
                                <section className="bg-gradient-to-br from-teal-950/50 to-emerald-950/30 border border-teal-500/20 rounded-2xl p-5">
                                    <h3 className="text-teal-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Sparkles size={13} /> Antídoto Terapêutico
                                    </h3>
                                    <p className="text-white text-sm leading-relaxed mb-5">{sombra.antidoto}</p>
                                    <PraticaTimer
                                        minutos={sombra.exercicioPratico.duracaoMinutos || 15}
                                        onComplete={onTimerComplete}
                                    />
                                </section>

                                {/* ── Plano de 7 Dias ── */}
                                <section>
                                    <button
                                        onClick={() => setPlanoExpanded(p => !p)}
                                        className="w-full flex items-center justify-between py-3 border-y border-white/8 text-white/60 hover:text-white transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-medium uppercase tracking-widest">Portal das 21 Luas</span>
                                            {feito.length > 0 && (
                                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/50">
                                                    {feito.length}/21
                                                </span>
                                            )}
                                        </div>
                                        {planoExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    <AnimatePresence>
                                        {planoExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 space-y-8">
                                                    {[
                                                        { label: 'Fase I: O Olhar Profundo', range: [1, 7] },
                                                        { label: 'Fase II: A Dissolução do Ego', range: [8, 14] },
                                                        { label: 'Fase III: A Alquimia do Ser', range: [15, 21] }
                                                    ].map((week, wIdx) => (
                                                        <div key={wIdx} className="space-y-4">
                                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 pl-2">
                                                                {week.label}
                                                            </h4>
                                                            <div className="space-y-2.5">
                                                                {dias.filter(d => d.numero >= week.range[0] && d.numero <= week.range[1]).map((dia) => {
                                                                    const done = feito.includes(dia.numero);
                                                                    return (
                                                                        <div
                                                                            key={dia.numero}
                                                                            className={clsx(
                                                                                'flex items-start gap-4 p-4 rounded-xl border transition-all',
                                                                                done ? 'bg-emerald-500/8 border-emerald-500/25' : 'bg-white/4 border-white/8'
                                                                            )}
                                                                        >
                                                                            {/* Day circle */}
                                                                            <button
                                                                                onClick={() => completarDia(dia.numero)}
                                                                                className={clsx(
                                                                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all',
                                                                                    done ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' : 'bg-white/10 text-white/50 hover:bg-white/20'
                                                                                )}
                                                                            >
                                                                                {done ? <Check size={14} /> : dia.numero}
                                                                            </button>

                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                                                    <h4 className={clsx('text-sm font-medium', done ? 'text-emerald-400 line-through opacity-60' : 'text-white')}>
                                                                                        {dia.titulo}
                                                                                    </h4>
                                                                                    <span className="text-xs text-white/25 flex-shrink-0 flex items-center gap-1">
                                                                                        <Clock size={10} /> {dia.duracao}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-white/45 text-xs leading-relaxed">{dia.descricao}</p>
                                                                                {!done && (
                                                                                    <p className="text-white/30 text-xs mt-1.5 italic line-clamp-2">{dia.exercicio}</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* Progress bar */}
                                                    {feito.length > 0 && (
                                                        <div className="pt-2 border-t border-white/5 mt-4">
                                                            <div className="flex justify-between text-xs text-white/30 mb-1.5">
                                                                <span>Progresso da Jornada</span>
                                                                <span>{percentual}%</span>
                                                            </div>
                                                            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                                                                <div
                                                                    className={clsx('h-full rounded-full transition-all duration-700', feito.length >= 21 ? 'bg-emerald-500' : 'bg-amber-500')}
                                                                    style={{ width: `${percentual}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </section>

                                {/* ── Jornal da Sombra ── */}
                                <section className="border-t border-white/8 pt-6">
                                    <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <BookOpen size={13} /> Diário das Profundezas
                                    </h3>
                                    <textarea
                                        placeholder={`Como "${sombra.nomePadrao}" se manifesta em você hoje?...`}
                                        className="w-full bg-black/25 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-white/25 focus:border-teal-500/50 focus:outline-none min-h-[110px] resize-none leading-relaxed transition-colors"
                                        value={jornal}
                                        onChange={e => { setJornal(e.target.value); setJornalDirty(true); }}
                                        onBlur={() => { if (jornalDirty) flushJornal(sombra.id, jornal); }}
                                    />
                                    {jornalDirty && (
                                        <button
                                            onClick={() => flushJornal(sombra.id, jornal)}
                                            className="mt-2 text-xs text-teal-400/70 hover:text-teal-400 transition-colors"
                                        >
                                            Salvar reflexão →
                                        </button>
                                    )}
                                </section>

                                {/* ── Celebration ── */}
                                <AnimatePresence>
                                    {progresso?.status === 'completa' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-5 text-center"
                                        >
                                            <div className="text-3xl mb-2">💎</div>
                                            <h3 className="text-emerald-400 font-serif text-lg mb-1">Padrão Integrado!</h3>
                                            <p className="text-emerald-400/60 text-sm">Você concluiu a jornada mística de integração desta sombra. A luz agora brilha onde antes havia mistério.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
