import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Gem, Leaf, Play, Pause, Waves, Sparkles, Droplets, Apple, Activity, Headphones } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { variaveisDaPaleta, paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';

/**
 * BOTICA SAGRADA — os apoios materiais do arcano.
 *
 * O card mostrava um cristal e uma erva. O arcanos.json guarda três de cada,
 * para os vinte e dois arcanos, mais três coisas que nunca apareceram em lugar
 * nenhum do app: `banho_terapeutico`, `alimentacao` e `movimento_corporal` —
 * completos nos vinte e dois, escritos por alguém, e invisíveis. Um `grep` por
 * "banho_terapeutico" em todo o `src/` não devolvia nenhum componente.
 *
 * Agora a botica mostra o que existe: os três cristais, as três ervas, o banho,
 * o que comer e como mover o corpo. E a cor deixou de ser dourada e ciano fixas
 * — só o verde da erva ficou, porque ali o verde não é tema, é a folha.
 *
 * O tom binaural continua o mesmo, com o aviso que faltava: uma batida binaural
 * não existe sem fones. Nos alto-falantes os dois canais se somam no ar e o
 * efeito simplesmente não acontece.
 */

interface Props {
    arcano: ArcanoAdvanced;
}

/** Diferença entre os dois canais, em Hz. Cinco cai na faixa teta. */
const BATIDA_HZ = 5;

export const FarmaciaAlquimica: React.FC<Props> = ({ arcano }) => {
    const [tocando, setTocando] = useState(false);
    const [barras, setBarras] = useState<number[]>(() => Array(12).fill(4));

    const ctxRef = useRef<AudioContext | null>(null);
    const osciladoresRef = useRef<OscillatorNode[]>([]);
    const analisadorRef = useRef<AnalyserNode | null>(null);
    const quadroRef = useRef<number | null>(null);

    const paleta = useMemo(
        () => paletaDoArcano((arcano as any)?.cor, (arcano as any)?.cor_secundaria),
        [(arcano as any)?.cor, (arcano as any)?.cor_secundaria]
    );
    const variaveis = useMemo(
        () => variaveisDaPaleta((arcano as any)?.cor, (arcano as any)?.cor_secundaria),
        [(arcano as any)?.cor, (arcano as any)?.cor_secundaria]
    );

    const alquimia = arcano.alquimia;
    const cristais = (arcano as any).cristais as string[] | undefined;
    const ervas = (arcano as any).ervas as string[] | undefined;
    const banho = (arcano as any).banho_terapeutico as string | undefined;
    const alimentacao = (arcano as any).alimentacao as string[] | undefined;
    const movimento = (arcano as any).movimento_corporal as string | undefined;

    const frequencia = alquimia?.frequenciaHz || parseInt(String(arcano.frequencia), 10) || 432;
    const mantra = alquimia?.mantra;

    const parar = () => {
        osciladoresRef.current.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch { /* já parado */ }
        });
        osciladoresRef.current = [];
        if (quadroRef.current !== null) {
            cancelAnimationFrame(quadroRef.current);
            quadroRef.current = null;
        }
        analisadorRef.current = null;
        setTocando(false);
        setBarras(Array(12).fill(4));
    };

    // Parar ao sair da tela e ao trocar de arcano — antes o tom do arcano
    // anterior continuava tocando por cima do novo.
    useEffect(() => parar, []);
    useEffect(() => { parar(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [frequencia]);

    const iniciar = () => {
        try {
            if (!ctxRef.current) {
                const Ctor = window.AudioContext || (window as any).webkitAudioContext;
                if (!Ctor) return;
                ctxRef.current = new Ctor();
            }
            const ctx = ctxRef.current!;
            if (ctx.state === 'suspended') void ctx.resume();

            const ganho = ctx.createGain();
            ganho.gain.value = 0.1;

            const analisador = ctx.createAnalyser();
            analisador.fftSize = 64;

            // Osciladores → ganho → analisador → saída.
            ganho.connect(analisador);
            analisador.connect(ctx.destination);
            analisadorRef.current = analisador;

            const canal = (hz: number, lado: number) => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = hz;
                const pan = ctx.createStereoPanner();
                pan.pan.value = lado;
                osc.connect(pan).connect(ganho);
                osc.start();
                return osc;
            };

            osciladoresRef.current = [canal(frequencia, -1), canal(frequencia + BATIDA_HZ, 1)];
            setTocando(true);

            const dados = new Uint8Array(analisador.frequencyBinCount);
            const passo = Math.max(1, Math.floor(analisador.frequencyBinCount / 12));
            const desenhar = () => {
                const a = analisadorRef.current;
                if (!a) return;
                a.getByteFrequencyData(dados);
                setBarras(Array.from({ length: 12 }, (_, i) => Math.max(4, dados[i * passo] / 6)));
                quadroRef.current = requestAnimationFrame(desenhar);
            };
            desenhar();
        } catch (e) {
            console.error('[FarmaciaAlquimica] Web Audio indisponível:', e);
            parar();
        }
    };

    return (
        <div
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col group relative overflow-hidden"
            style={variaveis}
        >
            <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] transition-opacity opacity-60 group-hover:opacity-100"
                style={{ background: paleta.lavagem }}
                aria-hidden
            />

            <div className="flex items-center gap-2 mb-6 relative z-10">
                <Gem style={{ color: 'var(--arc-tinta)' }} size={20} />
                <h3 className="text-white font-serif text-lg">Alquimia das Plantas e Frequências</h3>
            </div>

            {/* ── CRISTAIS & ERVAS ──────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center">
                    <div
                        className="w-12 h-12 rounded-full mb-3 flex items-center justify-center border"
                        style={{ background: 'var(--arc-lavagem)', borderColor: 'var(--arc-borda)' }}
                    >
                        <Gem size={20} style={{ color: 'var(--arc-tinta)' }} />
                    </div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">
                        {cristais && cristais.length > 1 ? 'Cristais de Poder' : 'Cristal de Poder'}
                    </span>
                    <ul className="list-none p-0 m-0 space-y-0.5">
                        {(cristais?.length ? cristais : [alquimia?.cristal || '—']).map(c => (
                            <li key={c} className="text-white font-serif text-sm">{c}</li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-900/30 mb-3 flex items-center justify-center border border-green-500/30">
                        <Leaf size={20} className="text-green-400" />
                    </div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5">
                        {ervas && ervas.length > 1 ? 'Ervas de Cura' : 'Erva de Cura'}
                    </span>
                    <ul className="list-none p-0 m-0 space-y-0.5">
                        {(ervas?.length ? ervas : [alquimia?.erva || '—']).map(e => (
                            <li key={e} className="text-white font-serif text-sm">{e}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── O CORPO ───────────────────────────────────────────────── */}
            {(banho || alimentacao?.length || movimento) && (
                <dl className="space-y-2.5 mb-5 relative z-10 m-0">
                    {banho && (
                        <div className="flex gap-3">
                            <dt className="shrink-0 mt-0.5" title="Banho terapêutico">
                                <Droplets size={14} style={{ color: 'var(--arc-suave)' }} />
                                <span className="sr-only">Banho terapêutico</span>
                            </dt>
                            <dd className="m-0 text-[12.5px] text-white/60 leading-relaxed">{banho}</dd>
                        </div>
                    )}
                    {alimentacao && alimentacao.length > 0 && (
                        <div className="flex gap-3">
                            <dt className="shrink-0 mt-0.5" title="Alimentação">
                                <Apple size={14} style={{ color: 'var(--arc-suave)' }} />
                                <span className="sr-only">Alimentação</span>
                            </dt>
                            <dd className="m-0 text-[12.5px] text-white/60 leading-relaxed">{alimentacao.join(' · ')}</dd>
                        </div>
                    )}
                    {movimento && (
                        <div className="flex gap-3">
                            <dt className="shrink-0 mt-0.5" title="Movimento corporal">
                                <Activity size={14} style={{ color: 'var(--arc-suave)' }} />
                                <span className="sr-only">Movimento corporal</span>
                            </dt>
                            <dd className="m-0 text-[12.5px] text-white/60 leading-relaxed">{movimento}</dd>
                        </div>
                    )}
                </dl>
            )}

            {/* ── O TOM BINAURAL ────────────────────────────────────────── */}
            <div
                className="mt-auto rounded-xl p-4 relative overflow-hidden shadow-lg"
                style={bordaGradiente(paleta, `linear-gradient(120deg, ${paleta.bruta}26, #0b0a14 70%)`)}
            >
                <div className="relative z-10 flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--arc-tinta)' }}>
                            <Waves size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Frequência Binaural</span>
                        </div>
                        <div className="text-2xl font-serif text-white font-bold">
                            {frequencia} <span className="text-sm font-sans font-normal opacity-70">Hz</span>
                        </div>
                        <p className="flex items-center gap-1.5 text-[10px] text-white/35 mt-1">
                            <Headphones size={11} />
                            Batida de {BATIDA_HZ}Hz entre os ouvidos — só funciona com fones
                        </p>
                    </div>

                    <button
                        onClick={() => (tocando ? parar() : iniciar())}
                        aria-pressed={tocando}
                        aria-label={tocando ? 'Parar o tom binaural' : 'Tocar o tom binaural'}
                        className="w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 shrink-0"
                        style={{ background: 'var(--arc-forte)', borderColor: 'var(--arc-borda-forte)' }}
                    >
                        {tocando ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
                    </button>
                </div>

                <div className="flex items-end justify-center gap-1 h-8 mt-2 opacity-60" aria-hidden>
                    {barras.map((altura, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: altura }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-1.5 rounded-t-full"
                            style={{ background: 'var(--arc-a60)' }}
                        />
                    ))}
                </div>
            </div>

            {mantra && (
                <div
                    className="mt-4 p-3 rounded-lg text-center"
                    style={bordaGradiente(paleta, 'linear-gradient(#0a0910, #0a0910)', '#050505', 1)}
                >
                    <Sparkles size={12} style={{ color: 'var(--arc-tinta)' }} className="inline-block mb-1" />
                    <p className="text-xs italic" style={{ color: 'var(--arc-suave)' }}>“{mantra}”</p>
                </div>
            )}
        </div>
    );
};
