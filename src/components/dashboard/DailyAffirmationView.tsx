import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Heart, TrendingUp, AlertTriangle, Shuffle, Check, Copy } from 'lucide-react';
import { ArcanoAdvanced, TipoAfirmacao } from '../../types';
import { getDailyAffirmations, getAffirmationsForArcano } from '../../data/affirmations';
import { paletaDoArcano } from '../../utils/arcanoPalette';

const TIPOS: Record<TipoAfirmacao, { label: string; icon: React.FC<{ className?: string }>; }> = {
    MANHA: { label: 'Manhã', icon: Sun },
    NOITE: { label: 'Noite', icon: Moon },
    CRISIS: { label: 'Crise', icon: AlertTriangle },
    PROSPERIDADE: { label: 'Prosperidade', icon: TrendingUp },
    AMOR: { label: 'Amor', icon: Heart },
};

const ORDEM: TipoAfirmacao[] = ['MANHA', 'NOITE', 'CRISIS', 'PROSPERIDADE', 'AMOR'];

/** O tipo que combina com a hora: manhã até o meio-dia, noite a partir das 18h. */
function tipoDaHora(hora: number): TipoAfirmacao {
    if (hora < 12) return 'MANHA';
    if (hora >= 18) return 'NOITE';
    return 'PROSPERIDADE';
}

const SAUDACAO: Record<TipoAfirmacao, string> = {
    MANHA: 'Para começar o dia',
    NOITE: 'Para fechar o dia',
    CRISIS: 'Para atravessar a tormenta',
    PROSPERIDADE: 'Para o meio do caminho',
    AMOR: 'Para o coração',
};

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

const REPETICOES = 3;

export const DailyAffirmationView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const paleta = useMemo(
        () => paletaDoArcano((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );

    const [tipoFiltro, setTipoFiltro] = useState<TipoAfirmacao | null>(null);
    const [variacao, setVariacao] = useState(0);
    const [repeticoes, setRepeticoes] = useState(0);
    const [copiada, setCopiada] = useState(false);

    const todas = useMemo(() => getAffirmationsForArcano(arcano.numero), [arcano.numero]);

    // A "de agora" respeita a hora: quem abre o app às 7h recebe a de manhã.
    const tipoAgora = useMemo(() => tipoDaHora(new Date().getHours()), []);

    const doDia = useMemo(
        () => getDailyAffirmations(arcano.numero, 3, variacao),
        [arcano.numero, variacao]
    );

    /**
     * De onde sai o verbo em destaque.
     *
     * Com um filtro ativo, só aquele momento. Sem filtro, a primeira vista é o
     * verbo da hora — mas o sorteio percorre TODOS os verbos do arcano, não só
     * os daquela hora. A maioria dos arcanos tem um único verbo por momento, e
     * restringir o sorteio ao momento deixava o botão sem efeito visível.
     */
    const conjunto = useMemo(() => {
        if (tipoFiltro) return todas.filter(a => a.tipo === tipoFiltro);
        const daHora = todas.filter(a => a.tipo === tipoAgora);
        if (variacao === 0) return daHora.length ? daHora : (doDia.length ? doDia : todas);
        return todas;
    }, [todas, doDia, tipoFiltro, tipoAgora, variacao]);

    const destaque = useMemo(
        () => (conjunto.length ? conjunto[variacao % conjunto.length] : null),
        [conjunto, variacao]
    );

    /** Sem um segundo verbo para onde ir, o botão de sortear não aparece. */
    const podeSortear = (tipoFiltro ? conjunto.length : todas.length) > 1;

    const restantes = useMemo(() => {
        const base = tipoFiltro ? todas.filter(a => a.tipo === tipoFiltro) : doDia;
        return base.filter(a => a.id !== destaque?.id);
    }, [todas, doDia, tipoFiltro, destaque]);

    // Trocar de verbo zera a contagem: o ritual é por afirmação, não acumulado.
    useEffect(() => { setRepeticoes(0); setCopiada(false); }, [destaque?.id]);

    const contarRepeticao = useCallback(() => {
        setRepeticoes(r => (r >= REPETICOES ? 0 : r + 1));
    }, []);

    const copiar = useCallback(async () => {
        if (!destaque) return;
        try {
            await navigator.clipboard.writeText(`"${destaque.texto}" — ${arcano.nome}`);
            setCopiada(true);
            setTimeout(() => setCopiada(false), 2000);
        } catch {
            // Sem permissão de área de transferência (http, iOS antigo): silencioso.
        }
    }, [destaque, arcano.nome]);

    const completo = repeticoes >= REPETICOES;
    const tiposDisponiveis = useMemo(
        () => ORDEM.filter(t => todas.some(a => a.tipo === t)),
        [todas]
    );

    return (
        <div className={embedded ? 'relative overflow-hidden' : 'min-h-screen bg-[#030305] relative overflow-hidden'}>
            {/* Respiração ao fundo, na cor do arcano */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[420px] h-[420px] max-w-[130%] rounded-full"
                    style={{ background: `radial-gradient(circle, ${paleta.brilho} 0%, transparent 70%)` }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {!embedded && (
                <div className="sticky top-0 z-10 bg-[#030305]/85 backdrop-blur-xl border-b relative" style={{ borderColor: paleta.borda }}>
                    <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Voltar"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <div>
                            <h1 className="text-lg font-serif text-white">Verbos de Poder</h1>
                            <p className="text-xs font-sans" style={{ color: paleta.tintaSuave }}>
                                {arcano.numeroRomano} — {arcano.nome}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">

                {/* ── O VERBO EM DESTAQUE ─────────────────────────────── */}
                {destaque && (
                    <AnimatePresence mode="wait">
                        <motion.section
                            key={destaque.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.45 }}
                            className="relative rounded-[1.75rem] border overflow-hidden p-7 md:p-10 text-center"
                            style={{
                                borderColor: paleta.borda,
                                background: `linear-gradient(165deg, ${paleta.lavagem}, transparent 75%)`,
                                boxShadow: `0 24px 60px -32px ${paleta.brilho}`,
                            }}
                        >
                            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: paleta.gradiente }} />

                            <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: paleta.tinta }}>
                                {SAUDACAO[destaque.tipo]}
                            </p>

                            <blockquote className="font-serif text-[1.35rem] md:text-[1.7rem] leading-[1.5] text-white/90 m-0">
                                {destaque.texto}
                            </blockquote>

                            {/* ── O RITUAL: repetir três vezes ────────────── */}
                            <div className="mt-9 pt-7 border-t" style={{ borderColor: paleta.borda }}>
                                <p className="text-[11px] text-white/45 mb-4">
                                    {completo
                                        ? 'Três vezes. O verbo está dito.'
                                        : `Respire fundo, diga em voz alta e marque. Faltam ${REPETICOES - repeticoes}.`}
                                </p>

                                <div className="flex items-center justify-center gap-3">
                                    {Array.from({ length: REPETICOES }, (_, i) => (
                                        <motion.span
                                            key={i}
                                            className="w-2.5 h-2.5 rounded-full"
                                            animate={{
                                                backgroundColor: i < repeticoes ? paleta.bruta : 'rgba(255,255,255,0.12)',
                                                scale: i === repeticoes - 1 ? [1, 1.6, 1] : 1,
                                            }}
                                            transition={{ duration: 0.35 }}
                                        />
                                    ))}
                                </div>

                                <div className="mt-5 flex items-center justify-center gap-2">
                                    <button
                                        onClick={contarRepeticao}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium border transition-colors"
                                        style={{
                                            borderColor: paleta.borda,
                                            color: completo ? paleta.tinta : '#ffffffd0',
                                            background: completo ? paleta.lavagem : 'rgba(255,255,255,0.04)',
                                        }}
                                    >
                                        {completo ? 'Recomeçar' : 'Eu disse'}
                                    </button>
                                    {podeSortear && (
                                        <button
                                            onClick={() => setVariacao(v => v + 1)}
                                            className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-white/5 transition-colors"
                                            style={{ borderColor: paleta.borda }}
                                            title="Outro verbo"
                                            aria-label="Outro verbo"
                                        >
                                            <Shuffle className="w-4 h-4" style={{ color: paleta.tinta }} />
                                        </button>
                                    )}
                                    <button
                                        onClick={copiar}
                                        className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-white/5 transition-colors"
                                        style={{ borderColor: paleta.borda }}
                                        title="Copiar"
                                        aria-label="Copiar o verbo"
                                    >
                                        {copiada
                                            ? <Check className="w-4 h-4" style={{ color: paleta.tinta }} />
                                            : <Copy className="w-4 h-4" style={{ color: paleta.tinta }} />}
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    </AnimatePresence>
                )}

                {/* ── FILTRO POR MOMENTO ──────────────────────────────── */}
                {tiposDisponiveis.length > 1 && (
                    <div className="flex flex-wrap gap-2 justify-center mt-9">
                        <button
                            onClick={() => setTipoFiltro(null)}
                            className="px-3 py-1.5 rounded-full text-xs border transition-colors"
                            style={tipoFiltro === null
                                ? { borderColor: paleta.borda, background: paleta.lavagem, color: paleta.tinta }
                                : { borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.45)' }}
                        >
                            Do dia
                        </button>
                        {tiposDisponiveis.map(tipo => {
                            const Icone = TIPOS[tipo].icon;
                            const ativo = tipoFiltro === tipo;
                            return (
                                <button
                                    key={tipo}
                                    onClick={() => setTipoFiltro(ativo ? null : tipo)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors"
                                    style={ativo
                                        ? { borderColor: paleta.borda, background: paleta.lavagem, color: paleta.tinta }
                                        : { borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.45)' }}
                                >
                                    <Icone className="w-3 h-3" />
                                    {TIPOS[tipo].label}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ── OS OUTROS VERBOS ────────────────────────────────── */}
                {restantes.length > 0 && (
                    <div className="mt-8 space-y-3">
                        {restantes.map((aff, i) => {
                            const Icone = TIPOS[aff.tipo].icon;
                            return (
                                <motion.blockquote
                                    key={aff.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    className="flex gap-3.5 items-start rounded-2xl border p-4 m-0"
                                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                                >
                                    <Icone className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: paleta.tintaSuave }} />
                                    <div>
                                        <p className="text-[9.5px] uppercase tracking-[0.18em] mb-1" style={{ color: paleta.tintaSuave }}>
                                            {TIPOS[aff.tipo].label}
                                        </p>
                                        <p className="text-sm text-white/70 leading-relaxed">{aff.texto}</p>
                                    </div>
                                </motion.blockquote>
                            );
                        })}
                    </div>
                )}

                {todas.length === 0 && (
                    <p className="text-center text-white/30 text-sm py-12">
                        Este arcano ainda não tem verbos de poder cadastrados.
                    </p>
                )}
            </div>
        </div>
    );
};
