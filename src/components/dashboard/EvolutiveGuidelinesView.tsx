import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Flame, Clock, Target, Zap, Globe, CheckCircle, Droplets } from 'lucide-react';
import { ArcanoAdvanced, DiretrizEvolutiva } from '../../types';
import { getGuidelinesForArcano, CATEGORIA_LABELS } from '../../data/evolutiveGuidelines';
import { useUserProgress } from '../../hooks/useUserProgress';
import { ActionBottomSheet } from './ActionBottomSheet';
import { variaveisDaPaleta, paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';
import { cn } from '../../utils';
import { deArcano } from '../../utils/calculos';

/**
 * PRÁTICAS DIÁRIAS — o que fazer com o arcano hoje.
 *
 * A tela era verde-água fixa: barra de progresso teal→emerald, card prioritário
 * teal, botão teal, tudo isso dentro de um app que pinta o cabeçalho com a cor
 * do arcano. A sequência de dias era âmbar e a conquista, roxa. Quatro cores
 * arbitrárias. Agora tudo vem de `--arc-*`; só o verde de "feito" sobreviveu,
 * porque ali a cor não é decoração — é o sinal de conclusão, e ele precisa
 * significar a mesma coisa nos vinte e dois arcanos.
 *
 * Dois botões não faziam nada. O grande, escrito "Fiz isso agora", não tinha
 * `onClick`: o clique subia para o card e abria a folha de detalhes, de modo que
 * o botão mais afirmativo da tela era o único que não registrava nada. E o
 * relógio ao lado dele nunca teve função alguma. O primeiro agora marca o
 * check-in de verdade — e mostra que já foi marcado; o segundo saiu.
 *
 * A barra de progresso dividia por `totalPraticas` sem verificar se havia
 * práticas: um arcano sem diretrizes deixava `NaN%` na largura.
 */

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

const ICONES: Record<string, React.ReactNode> = {
    Target: <Target size={20} />,
    Zap: <Zap size={20} />,
    Globe: <Globe size={20} />,
    CheckCircle: <Check size={20} />,
    Clock: <Clock size={20} />,
    Sparkles: <Sparkles size={20} />,
    Droplets: <Droplets size={20} />,
};

/** Verde de conclusão — deliberadamente igual em todos os arcanos. */
const FEITO = '#34d399';

export const EvolutiveGuidelinesView: React.FC<Props> = ({ arcano, embedded }) => {
    const [selectedPratica, setSelectedPratica] = useState<DiretrizEvolutiva | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const { progress, checkinGuideline, isGuidelineCheckedToday } = useUserProgress(arcano.numero);
    const praticas = getGuidelinesForArcano(arcano.numero);

    const paleta = useMemo(
        () => paletaDoArcano((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );
    const variaveis = useMemo(
        () => variaveisDaPaleta((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );

    const completedToday = praticas.filter(p => isGuidelineCheckedToday(p.id)).length;
    const totalPraticas = praticas.length;
    const percentual = totalPraticas > 0 ? (completedToday / totalPraticas) * 100 : 0;

    const abrir = (p: DiretrizEvolutiva) => {
        setSelectedPratica(p);
        setSheetOpen(true);
    };

    const prioritaria = praticas.find(p => p.prioritaria) || praticas[0];
    const restantes = praticas.filter(p => p.id !== prioritaria?.id);
    const prioritariaFeita = prioritaria ? isGuidelineCheckedToday(prioritaria.id) : false;

    const icone = (nome: string) => ICONES[nome] ?? <Target size={20} />;

    return (
        <div
            className={cn('max-w-3xl mx-auto px-4 py-8', embedded ? '' : 'min-h-screen bg-[#050505]')}
            style={variaveis}
        >
            {/* ── CABEÇALHO ─────────────────────────────────────────────── */}
            <div className="mb-6">
                <h2 className="text-2xl font-serif text-white mb-1">Práticas de Integração</h2>
                <p className="text-white/50 text-sm">
                    Ações concretas para viver o arquétipo {deArcano(arcano.nome)} hoje
                </p>
            </div>

            {/* ── PROGRESSO DO DIA ──────────────────────────────────────── */}
            <div className="mb-8">
                <div className="flex justify-between text-xs text-white/40 mb-2 uppercase tracking-wider">
                    <span>Progresso de hoje</span>
                    <span className="font-bold" style={{ color: completedToday > 0 ? FEITO : 'var(--arc-tinta)' }}>
                        {completedToday}/{totalPraticas} {totalPraticas === 1 ? 'prática' : 'práticas'}
                    </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentual}%` }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${paleta.tinta}, ${FEITO})` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* ── SEQUÊNCIA ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border"
                    style={{ background: 'var(--arc-lavagem)', borderColor: 'var(--arc-borda)' }}
                >
                    <Flame size={16} style={{ color: 'var(--arc-tinta)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--arc-tinta)' }}>
                        {progress.streakAtual} {progress.streakAtual === 1 ? 'dia seguido' : 'dias seguidos'}
                    </span>
                </div>

                {progress.maiorStreak >= 5 && (
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border"
                        style={{ background: `${paleta.apoio}14`, borderColor: `${paleta.apoio}33` }}
                    >
                        <Sparkles size={16} style={{ color: paleta.apoio }} />
                        <span className="text-sm" style={{ color: paleta.apoio }}>Integrador Focado</span>
                    </div>
                )}
            </div>

            {/* ── A PRÁTICA PRIORITÁRIA ─────────────────────────────────── */}
            {prioritaria && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[2rem] p-8 mb-8 overflow-hidden"
                    style={bordaGradiente(paleta, `linear-gradient(150deg, ${paleta.lavagem}, transparent 75%)`)}
                >
                    <div className="absolute top-6 right-6">
                        <span
                            className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full border"
                            style={{ color: 'var(--arc-tinta)', background: 'var(--arc-lavagem)', borderColor: 'var(--arc-borda)' }}
                        >
                            Prática Prioritária
                        </span>
                    </div>

                    <button
                        onClick={() => abrir(prioritaria)}
                        className="flex items-center gap-5 mb-6 text-left group w-full pr-32"
                    >
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                            style={{ background: 'var(--arc-forte)', color: 'var(--arc-tinta)' }}
                        >
                            {icone(prioritaria.icone)}
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-2xl leading-snug transition-colors group-hover:opacity-80">
                                {prioritaria.titulo}
                            </h3>
                            <div className="flex items-center gap-2 mt-1.5">
                                <Clock size={14} className="text-white/30" />
                                <span className="text-white/40 text-xs">{prioritaria.tempo || '5 min'}</span>
                                <span className="text-white/15">·</span>
                                <span className="text-white/40 text-xs">
                                    {CATEGORIA_LABELS[prioritaria.categoria] ?? prioritaria.categoria}
                                </span>
                            </div>
                        </div>
                    </button>

                    {prioritaria.descricao && (
                        <p className="text-white/70 text-base mb-8 leading-relaxed italic">
                            {prioritaria.descricao}
                        </p>
                    )}

                    <button
                        onClick={() => checkinGuideline(prioritaria.id)}
                        disabled={prioritariaFeita}
                        aria-pressed={prioritariaFeita}
                        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg disabled:active:scale-100 disabled:cursor-default"
                        style={prioritariaFeita
                            ? { background: `${FEITO}1f`, color: FEITO, border: `1px solid ${FEITO}4d` }
                            : { background: 'var(--arc-tinta)', color: '#000', boxShadow: `0 10px 30px -12px ${paleta.brilho}` }}
                    >
                        <Check size={20} />
                        {prioritariaFeita ? 'Feito hoje' : 'Fiz isso agora'}
                    </button>
                </motion.div>
            )}

            {/* ── AS DEMAIS ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
                {restantes.map((pratica, idx) => {
                    const feita = isGuidelineCheckedToday(pratica.id);
                    return (
                        <motion.button
                            key={pratica.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => abrir(pratica)}
                            className="p-5 rounded-2xl border text-left transition-all active:scale-95 relative overflow-hidden group hover:bg-white/[0.06]"
                            style={feita
                                ? { background: `${FEITO}14`, borderColor: `${FEITO}4d` }
                                : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={feita
                                        ? { background: `${FEITO}33`, color: FEITO }
                                        : { background: 'var(--arc-lavagem)', color: 'var(--arc-tinta)' }}
                                >
                                    {icone(pratica.icone)}
                                </div>
                                {feita && <CheckCircle size={18} style={{ color: FEITO }} />}
                            </div>

                            <h4
                                className={cn('font-serif text-base mb-2 leading-snug', feita && 'line-through opacity-60')}
                                style={{ color: feita ? FEITO : '#fff' }}
                            >
                                {pratica.titulo}
                            </h4>

                            {pratica.descricao && (
                                <p className="text-white/40 text-[11px] leading-snug line-clamp-2 mb-4">
                                    {pratica.descricao}
                                </p>
                            )}

                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-white/20 mt-4">
                                <Clock size={12} />
                                {pratica.tempo || '5 min'}
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <ActionBottomSheet
                isOpen={sheetOpen}
                onClose={() => setSheetOpen(false)}
                pratica={selectedPratica}
                onComplete={() => selectedPratica && checkinGuideline(selectedPratica.id)}
            />
        </div>
    );
};
