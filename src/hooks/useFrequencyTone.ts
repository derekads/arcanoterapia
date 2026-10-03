import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Gerador de tom senoidal para as frequências dos arcanos.
 *
 * A aba de Frequências anunciava "Frequência Solfeggio 174Hz" e um botão
 * "Iniciar Meditação" que só animava barras — nenhum som era emitido. Este
 * hook produz o tom de verdade, com rampa de ganho na entrada e na saída para
 * não estalar, e devolve o nível do sinal para a visualização acompanhar o
 * áudio real em vez de simulá-lo.
 */

export interface UseFrequencyToneOptions {
    /** Frequência em Hz. */
    frequencia: number;
    /** Volume final, 0 a 1. Baixo por padrão: é som contínuo. */
    volume?: number;
    /** Segundos de rampa ao iniciar e ao parar. */
    fadeSegundos?: number;
    /** Quantas barras o visualizador espera. */
    bandas?: number;
}

export interface UseFrequencyToneReturn {
    tocando: boolean;
    /** Alturas normalizadas (0–1) para o visualizador. */
    niveis: number[];
    alternar: () => void;
    parar: () => void;
    /** `false` quando o navegador não expõe a Web Audio API. */
    suportado: boolean;
}

export function useFrequencyTone({
    frequencia,
    volume = 0.12,
    fadeSegundos = 0.4,
    bandas = 12
}: UseFrequencyToneOptions): UseFrequencyToneReturn {
    const ctxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const frameRef = useRef<number | null>(null);

    const [tocando, setTocando] = useState(false);
    const [niveis, setNiveis] = useState<number[]>(() => Array(bandas).fill(0));

    const suportado =
        typeof window !== 'undefined' &&
        Boolean(window.AudioContext || (window as any).webkitAudioContext);

    const pararInterno = useCallback((imediato = false) => {
        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }

        const ctx = ctxRef.current;
        const gain = gainRef.current;
        const osc = oscRef.current;

        if (ctx && gain && osc) {
            const fim = ctx.currentTime + (imediato ? 0 : fadeSegundos);
            try {
                gain.gain.cancelScheduledValues(ctx.currentTime);
                gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.0001, fim);
                osc.stop(fim + 0.02);
            } catch {
                // O oscilador já pode ter sido parado; nada a fazer.
            }
        }

        oscRef.current = null;
        gainRef.current = null;
        analyserRef.current = null;
        setTocando(false);
        setNiveis(Array(bandas).fill(0));
    }, [bandas, fadeSegundos]);

    const iniciar = useCallback(async () => {
        if (!suportado || !Number.isFinite(frequencia) || frequencia <= 0) return;

        try {
            if (!ctxRef.current) {
                const Ctor = window.AudioContext || (window as any).webkitAudioContext;
                ctxRef.current = new Ctor();
            }
            const ctx = ctxRef.current!;

            // Navegadores suspendem o contexto até um gesto do usuário.
            if (ctx.state === 'suspended') await ctx.resume();

            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequencia, ctx.currentTime);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + fadeSegundos);

            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            analyser.smoothingTimeConstant = 0.8;

            osc.connect(gain);
            gain.connect(analyser);
            analyser.connect(ctx.destination);
            osc.start();

            oscRef.current = osc;
            gainRef.current = gain;
            analyserRef.current = analyser;
            setTocando(true);

            const buffer = new Uint8Array(analyser.frequencyBinCount);
            const passo = Math.max(1, Math.floor(analyser.frequencyBinCount / bandas));

            const desenhar = () => {
                const a = analyserRef.current;
                if (!a) return;
                a.getByteFrequencyData(buffer);
                setNiveis(
                    Array.from({ length: bandas }, (_, i) => Math.min(1, buffer[i * passo] / 200))
                );
                frameRef.current = requestAnimationFrame(desenhar);
            };
            desenhar();
        } catch (e) {
            console.error('[useFrequencyTone] Web Audio indisponível:', e);
            pararInterno(true);
        }
    }, [bandas, fadeSegundos, frequencia, pararInterno, suportado, volume]);

    const alternar = useCallback(() => {
        if (tocando) pararInterno();
        else void iniciar();
    }, [iniciar, pararInterno, tocando]);

    // Trocar de arcano com o som ligado deve parar o tom antigo.
    useEffect(() => {
        pararInterno(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequencia]);

    useEffect(() => {
        return () => {
            pararInterno(true);
            ctxRef.current?.close().catch(() => undefined);
            ctxRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { tocando, niveis, alternar, parar: () => pararInterno(), suportado };
}
