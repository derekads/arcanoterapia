import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, PenLine, Trash2, Clock, X } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { useUserProgress } from '../../hooks/useUserProgress';
import { deArcano } from '../../utils/calculos';
import { variaveisDaPaleta, paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';

/**
 * DIÁRIO MÍSTICO — escrever a partir da pergunta do arcano.
 *
 * Esta aba não funcionava. O único caminho para escrever era o botão "Nova
 * Entrada", e ele vivia dentro de `{!embedded && (...)}` — o cabeçalho da versão
 * de tela cheia. Só que a `JournalView` nunca é usada em tela cheia: o
 * ArcanoExpandidoView a renderiza sempre com `embedded`. O resultado era uma aba
 * onde o estado vazio dizia «Clique em "Nova Entrada" para começar» apontando
 * para um botão que não existia em lugar nenhum da tela. Nada podia ser escrito.
 *
 * Agora a entrada é o próprio conteúdo: os quatro prompts do arcano ficam
 * visíveis, e tocar num deles abre o editor já com a frase. Quem quiser escrever
 * sem pergunta tem a folha em branco ao lado.
 *
 * De quebra: o botão que escondia os prompts também sumia junto com eles, sem
 * volta; apagar uma entrada era imediato, num ícone que só aparecia no hover,
 * sem confirmação nenhuma; e a cor era violeta fixa, em uma tela dentro de um
 * app que se pinta com a cor do arcano.
 */

const PROMPTS_PADRAO = [
    'O que senti de mais forte hoje foi...',
    'Uma sombra que reconheci em mim hoje...',
    'Sou grato(a) por...',
];

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

/**
 * Os prompts do JSON vêm com o nome do arcano entre colchetes — «Hoje [O Louco]
 * me ensina que...». O marcador nunca foi substituído por nada: o nome já está
 * lá dentro. Os colchetes só aparecem na tela como ruído.
 */
function semColchetes(texto: string): string {
    return texto.replace(/\[([^\]]+)\]/g, '$1');
}

export const JournalView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const { progress, addJournalEntry, deleteJournalEntry } = useUserProgress(arcano.numero);
    const [escrevendo, setEscrevendo] = useState(false);
    const [texto, setTexto] = useState('');
    const [promptEscolhido, setPromptEscolhido] = useState<string | null>(null);
    const [confirmandoExclusao, setConfirmandoExclusao] = useState<string | null>(null);
    const areaRef = useRef<HTMLTextAreaElement>(null);

    const paleta = useMemo(
        () => paletaDoArcano((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );
    const variaveis = useMemo(
        () => variaveisDaPaleta((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );

    const prompts = (arcano.jornalTemplates?.length ? arcano.jornalTemplates : PROMPTS_PADRAO)
        .map(semColchetes);

    const abrirCom = (prompt: string | null) => {
        setPromptEscolhido(prompt);
        setTexto(prompt ? `${prompt}\n\n` : '');
        setEscrevendo(true);
        // O foco tem de esperar o textarea existir no DOM.
        window.setTimeout(() => {
            const el = areaRef.current;
            if (!el) return;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
        }, 60);
    };

    const fechar = () => {
        setEscrevendo(false);
        setTexto('');
        setPromptEscolhido(null);
    };

    const salvar = () => {
        const limpo = texto.trim();
        if (!limpo) return;
        addJournalEntry(limpo, promptEscolhido || undefined);
        fechar();
    };

    const formatarData = (iso: string) =>
        new Date(iso).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        });

    const entradas = progress.journalEntries;

    return (
        <div
            className={embedded ? '' : 'min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}
            style={variaveis}
        >
            {!embedded && (
                <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Voltar"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--arc-lavagem)', color: 'var(--arc-tinta)' }}
                            >
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-lg font-serif text-white">Jornal Terapêutico</h1>
                                <p className="text-xs text-white/40">{arcano.numeroRomano} — {arcano.nome}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* ── AS PERGUNTAS DO ARCANO ────────────────────────────── */}
                <AnimatePresence initial={false}>
                    {!escrevendo && (
                        <motion.section
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-10"
                        >
                            <header className="mb-4">
                                <p className="text-[10px] uppercase tracking-[0.3em] mb-1.5" style={{ color: 'var(--arc-tinta)' }}>
                                    Por onde começar
                                </p>
                                <h2 className="font-serif text-xl text-white/90">
                                    As perguntas {deArcano(arcano.nome)}
                                </h2>
                            </header>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {prompts.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => abrirCom(p)}
                                        className="text-left p-4 rounded-2xl transition-colors hover:bg-white/[0.04]"
                                        style={bordaGradiente(paleta, 'linear-gradient(#08070a, #08070a)')}
                                    >
                                        <span className="text-sm text-white/75 leading-relaxed">{p}</span>
                                    </button>
                                ))}

                                <button
                                    onClick={() => abrirCom(null)}
                                    className="text-left p-4 rounded-2xl border border-dashed border-white/12 hover:border-white/25 hover:bg-white/[0.03] transition-colors flex items-center gap-2.5"
                                >
                                    <PenLine size={15} className="text-white/30 shrink-0" />
                                    <span className="text-sm text-white/45">Escrever sem pergunta</span>
                                </button>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* ── O EDITOR ──────────────────────────────────────────── */}
                <AnimatePresence>
                    {escrevendo && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mb-10"
                        >
                            <div
                                className="rounded-2xl p-6"
                                style={bordaGradiente(paleta, 'linear-gradient(#0b0a0e, #0b0a0e)')}
                            >
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--arc-suave)' }}>
                                        {promptEscolhido ? 'Respondendo' : 'Folha em branco'}
                                    </p>
                                    <button
                                        onClick={fechar}
                                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-colors shrink-0"
                                        aria-label="Fechar o editor"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                <textarea
                                    ref={areaRef}
                                    value={texto}
                                    onChange={e => setTexto(e.target.value)}
                                    placeholder="Escreva livremente..."
                                    className="w-full h-52 bg-black/30 border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed resize-none focus:outline-none placeholder-white/20 custom-scrollbar"
                                    style={{ caretColor: paleta.tinta }}
                                />

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-[11px] text-white/25">
                                        {texto.trim() ? `${texto.trim().length} caracteres` : 'Nada é enviado para fora deste aparelho.'}
                                    </span>
                                    <button
                                        onClick={salvar}
                                        disabled={!texto.trim()}
                                        className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        style={{ background: 'var(--arc-tinta)', color: '#000' }}
                                    >
                                        Salvar Entrada
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── AS ENTRADAS ───────────────────────────────────────── */}
                {entradas.length > 0 ? (
                    <>
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
                            {entradas.length} {entradas.length === 1 ? 'entrada' : 'entradas'}
                        </h3>
                        <div className="space-y-4">
                            {entradas.map((entry, idx) => {
                                const confirmando = confirmandoExclusao === entry.id;
                                return (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: Math.min(idx, 6) * 0.05 }}
                                        className="bg-white/[0.02] rounded-2xl border border-white/[0.08] p-6 group"
                                    >
                                        <div className="flex items-center justify-between mb-3 gap-3">
                                            <div className="flex items-center gap-2 text-xs text-white/30">
                                                <Clock className="w-3 h-3" />
                                                {formatarData(entry.data)}
                                            </div>

                                            {/* Apagar em dois toques: o primeiro pergunta.
                                                Uma entrada de diário não volta. */}
                                            {confirmando ? (
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        onClick={() => { deleteJournalEntry(entry.id); setConfirmandoExclusao(null); }}
                                                        className="text-[11px] px-2.5 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-500/25 hover:bg-red-500/25 transition-colors"
                                                    >
                                                        Apagar
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmandoExclusao(null)}
                                                        className="text-[11px] px-2.5 py-1 rounded-lg text-white/40 hover:text-white/70 transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmandoExclusao(entry.id)}
                                                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                                                    aria-label="Apagar esta entrada"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>

                                        {entry.template && (
                                            <p className="text-xs italic mb-2" style={{ color: 'var(--arc-suave)' }}>
                                                {semColchetes(entry.template)}
                                            </p>
                                        )}
                                        <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap">
                                            {entry.texto}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    !escrevendo && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-14">
                            <BookOpen className="w-10 h-10 text-white/10 mx-auto mb-4" />
                            <p className="text-white/30 text-sm">Nenhuma entrada ainda</p>
                            <p className="text-white/15 text-xs max-w-xs mx-auto mt-1.5">
                                Escolha uma das perguntas acima. O que você escrever fica guardado só neste aparelho.
                            </p>
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
};
