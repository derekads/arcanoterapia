import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Wind, Headphones, Play, Pause, Sparkles, Volume2, Mic, Timer } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { cn } from '../../utils';
import { useFrequencyTone } from '../../hooks/useFrequencyTone';
import { variaveisDaPaleta, paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';
import { frequenciaDe, chacraDe } from '../../data/frequencias';

/**
 * FREQUÊNCIAS — o som do arcano.
 *
 * A aba tinha três problemas de uma vez. O primeiro era de cor: o card da
 * frequência era âmbar e o da nota musical era índigo, fixos, enquanto a aba
 * ativa no topo já vinha pintada com a cor do arcano — dourado dentro de uma
 * tela verde-água n'O Mundo. Agora a paleta desce por `--arc-*` e as duas
 * colunas usam a cor principal e a secundária do próprio arcano, que é o que
 * elas eram desde sempre no JSON.
 *
 * O segundo era de conteúdo: o número aparecia sozinho, seguido de uma frase
 * montada com `arcano.numero === 22 ? 'limpeza de medos' : 'ativação do
 * potencial'` — vinte e um arcanos com o mesmo texto. As dez frequências agora
 * têm nome, origem e intenção próprias em `frequencias.ts`, e o chacra regente
 * deixou de ser uma etiqueta ("Foco: Laringe (Vishuddha)") para dizer o que
 * aquele centro governa e como se percebe que está fechado.
 *
 * O terceiro era de prática: apertar "Iniciar Meditação" ligava um tom que
 * durava até alguém lembrar de desligá-lo. Uma meditação sem duração não é uma
 * meditação — é um ruído de fundo. Agora se escolhe de quanto tempo ela é, e o
 * anel ao redor do botão mostra quanto falta.
 */

interface Props {
    arcano: ArcanoAdvanced;
}

/** Durações oferecidas, em minutos. Três é o mínimo em que o tom deixa de ser novidade. */
const DURACOES = [3, 5, 10] as const;

export const SoundTherapyView: React.FC<Props> = ({ arcano }) => {
    const frequenciaHz = parseInt(String(arcano.frequencia), 10) || 432;
    const { tocando, niveis, alternar, parar, suportado } = useFrequencyTone({ frequencia: frequenciaHz });

    const paleta = useMemo(
        () => paletaDoArcano((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );
    const variaveis = useMemo(
        () => variaveisDaPaleta((arcano as any).cor, (arcano as any).cor_secundaria),
        [(arcano as any).cor, (arcano as any).cor_secundaria]
    );

    const info = frequenciaDe(arcano.frequencia);
    const chacra = chacraDe(arcano.chacra_regente);

    // ── O CRONÔMETRO ────────────────────────────────────────────────────────
    const [duracao, setDuracao] = useState<number>(5);
    const [restante, setRestante] = useState<number | null>(null);

    const fimRef = React.useRef<number>(0);

    React.useEffect(() => {
        if (!tocando) { setRestante(null); return; }

        fimRef.current = Date.now() + duracao * 60_000;
        setRestante(duracao * 60);

        const id = window.setInterval(() => {
            // O relógio vem do horário de término, não de um contador que soma
            // ticks: uma aba em segundo plano recebe menos ticks do que os
            // segundos que passaram, e a sessão terminaria tarde demais.
            const faltam = Math.max(0, Math.round((fimRef.current - Date.now()) / 1000));
            setRestante(faltam);
            if (faltam === 0) {
                window.clearInterval(id);
                parar();
            }
        }, 250);

        return () => window.clearInterval(id);
        // `duracao` de propósito fora: mudar o tempo no meio não reinicia a sessão.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tocando]);

    const decorrido = restante === null ? 0 : 1 - restante / (duracao * 60);
    const relogio = restante === null
        ? null
        : `${String(Math.floor(restante / 60)).padStart(2, '0')}:${String(restante % 60).padStart(2, '0')}`;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12" style={variaveis}>
            {/* ── FREQUÊNCIA & NOTA ─────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[2rem] flex flex-col items-center text-center group"
                    style={bordaGradiente(paleta, `linear-gradient(160deg, ${paleta.lavagem}, transparent 75%)`)}
                >
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                        style={{ background: 'var(--arc-forte)' }}
                    >
                        <Volume2 style={{ color: 'var(--arc-tinta)' }} size={32} />
                    </div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--arc-suave)' }}>
                        {info?.silaba ? `Solfeggio · ${info.silaba}` : 'Frequência regente'}
                    </h3>
                    <p className="text-4xl font-serif text-white">{arcano.frequencia}Hz</p>
                    {info && (
                        <>
                            <p className="mt-1 font-serif text-lg" style={{ color: 'var(--arc-tinta)' }}>{info.nome}</p>
                            <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">{info.tradicao}</p>
                            <p className="mt-3 text-[11px] text-white/35 leading-relaxed">{info.origem}</p>
                        </>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-[2rem] flex flex-col items-center text-center group"
                    style={{
                        border: '1.5px solid transparent',
                        background:
                            `linear-gradient(160deg, ${paleta.brutaSecundaria}14, transparent 75%) padding-box, ` +
                            `linear-gradient(#050505, #050505) padding-box, ` +
                            `linear-gradient(135deg, ${paleta.apoio}, ${paleta.tinta}) border-box`,
                    }}
                >
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500"
                        style={{ background: `${paleta.apoio}33` }}
                    >
                        <Music style={{ color: paleta.apoio }} size={32} />
                    </div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: `${paleta.apoio}aa` }}>
                        Nota musical regente
                    </h3>
                    <p className="text-4xl font-serif text-white">{arcano.nota_musical || '—'}</p>
                    <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                        Cante esta nota junto com o tom, uma oitava abaixo se ela estiver alta demais.
                        A voz encontrando a frequência é o que faz a vibração ser sentida, e não só ouvida.
                    </p>
                </motion.div>
            </section>

            {/* ── A INTENÇÃO DA ESCUTA ──────────────────────────────────── */}
            {info && (
                <section
                    className="rounded-[1.75rem] p-6 md:p-7"
                    style={bordaGradiente(paleta, 'linear-gradient(#08070a, #08070a)')}
                >
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--arc-tinta)' }}>
                        Enquanto o tom durar
                    </p>
                    <p className="text-[15px] text-white/80 leading-relaxed">{info.intencao}</p>
                </section>
            )}

            {/* ── MEDITAÇÃO GUIADA ──────────────────────────────────────── */}
            <section>
                <div className="relative rounded-[2.5rem] bg-slate-900/40 border border-white/5 overflow-hidden p-8 md:p-12">
                    <div className="absolute top-0 right-0 p-12 opacity-5" aria-hidden>
                        <Mic size={160} className="text-white" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Headphones style={{ color: 'var(--arc-tinta)' }} size={24} />
                            <h2 className="text-2xl font-serif text-white">Meditação do Arcano</h2>
                        </div>

                        <p className="text-xl text-slate-200 font-light leading-relaxed italic mb-8">
                            “{arcano.meditacao_guiada}”
                        </p>

                        {/* Duração — escolhida antes, não durante. */}
                        <div className="flex items-center gap-3 mb-6">
                            <Timer size={14} className="text-white/30" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mr-1">Duração</span>
                            {DURACOES.map(min => {
                                const ativo = duracao === min;
                                return (
                                    <button
                                        key={min}
                                        onClick={() => setDuracao(min)}
                                        disabled={tocando}
                                        aria-pressed={ativo}
                                        className="px-3.5 py-1.5 rounded-full text-xs border transition-colors disabled:opacity-40"
                                        style={{
                                            borderColor: ativo ? 'var(--arc-borda-forte)' : 'rgba(255,255,255,0.1)',
                                            background: ativo ? 'var(--arc-lavagem)' : 'transparent',
                                            color: ativo ? 'var(--arc-tinta)' : 'rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        {min} min
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {/* O anel de progresso envolve o botão: o tempo restante fica
                                onde a mão já está, sem um cronômetro separado na tela. */}
                            <div className="relative">
                                {tocando && (
                                    <svg className="absolute -inset-1.5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                                        <rect
                                            x="1" y="1" width="98" height="98" rx="14"
                                            fill="none" stroke="var(--arc-a30)" strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            strokeDasharray="392" strokeDashoffset={392 * (1 - decorrido)}
                                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                                        />
                                    </svg>
                                )}
                                <button
                                    onClick={alternar}
                                    disabled={!suportado}
                                    aria-pressed={tocando}
                                    className={cn(
                                        'relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all',
                                        tocando ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'text-black hover:scale-105',
                                        !suportado && 'opacity-40 cursor-not-allowed'
                                    )}
                                    style={tocando ? undefined : {
                                        background: 'var(--arc-tinta)',
                                        boxShadow: `0 0 30px ${paleta.brilho}`,
                                    }}
                                >
                                    {tocando ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                    {tocando ? (relogio ?? `${frequenciaHz}Hz`) : `Iniciar · ${duracao} min`}
                                </button>
                            </div>

                            {/* Visualizador ligado ao analisador: reflete o som real. */}
                            {tocando && (
                                <div className="flex items-end gap-1 px-2 h-12" aria-hidden>
                                    {niveis.map((nivel, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 rounded-full transition-[height] duration-100"
                                            style={{ height: `${8 + nivel * 32}px`, background: 'var(--arc-a60)' }}
                                        />
                                    ))}
                                </div>
                            )}

                            {tocando && (
                                <span className="text-[10px] uppercase tracking-widest text-white/30">
                                    Use fones para sentir a vibração
                                </span>
                            )}

                            {!suportado && (
                                <span className="text-[11px] text-white/40">
                                    Seu navegador não permite gerar áudio nesta página.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── O CHACRA REGENTE ──────────────────────────────────────── */}
            {chacra && (
                <section className="rounded-[1.75rem] border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
                        <Wind size={16} style={{ color: 'var(--arc-tinta)' }} className="self-center" />
                        <h3 className="font-serif text-xl text-white/90">{chacra.nome}</h3>
                        <span className="text-xs italic text-white/35">{chacra.sanscrito}</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 ml-auto">{chacra.local}</span>
                    </div>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-5 m-0">
                        <div>
                            <dt className="text-[9.5px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--arc-suave)' }}>
                                O que rege
                            </dt>
                            <dd className="m-0 text-sm text-white/75 leading-relaxed">{chacra.rege}</dd>
                        </div>
                        <div>
                            <dt className="text-[9.5px] uppercase tracking-[0.18em] mb-1.5" style={{ color: 'var(--arc-suave)' }}>
                                Como notar que fechou
                            </dt>
                            <dd className="m-0 text-sm text-white/75 leading-relaxed">{chacra.sinalDeBloqueio}</dd>
                        </div>
                    </dl>
                </section>
            )}

            {/* ── PLAYLIST ──────────────────────────────────────────────── */}
            {arcano.musicas_recomendadas && arcano.musicas_recomendadas.length > 0 && (
                <section>
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-white/10" />
                        Playlist Alquímica
                        <span className="w-12 h-[1px] bg-white/10" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {arcano.musicas_recomendadas.map((music, i) => (
                            <div key={music} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 group hover:bg-white/[0.05] transition-all">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold shrink-0"
                                    style={{ background: 'var(--arc-lavagem)', color: 'var(--arc-tinta)' }}
                                >
                                    {i + 1}
                                </div>
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{music}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── RITUAL DE SINTONIA ────────────────────────────────────── */}
            {arcano.conselho_diario && arcano.conselho_diario.length > 0 && (
                <section
                    className="rounded-3xl p-8"
                    style={bordaGradiente(paleta, `linear-gradient(150deg, ${paleta.lavagem}, transparent 80%)`)}
                >
                    <h3 className="font-serif text-xl mb-4 flex items-center gap-3" style={{ color: 'var(--arc-tinta)' }}>
                        <Sparkles size={20} />
                        Ritual de Sintonia
                    </h3>
                    <ul className="space-y-4 list-none p-0 m-0">
                        {arcano.conselho_diario.map((tip, i) => (
                            <li key={i} className="flex gap-4 text-slate-300 text-sm font-light">
                                <span className="font-bold shrink-0" style={{ color: 'var(--arc-tinta)' }}>{i + 1}.</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};
