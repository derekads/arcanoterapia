import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Flame, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { useArcano } from '../../context/ArcanoContext';
import { getShadowPatternsForArcano } from '../../data/shadowPatterns';
import { paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';
import type { FrequenciaSombra, ShadowPattern } from '../../types';

/**
 * O ESPELHO — qual sombra está ativa agora
 *
 * Antes esta tela tinha uma tabela `SHADOW_QUESTIONS` com perguntas escritas à
 * mão para dois arcanos e um comentário admitindo o resto: "Mock para outros
 * arcanos (será expandido no JSON)". Quem não fosse O Mago recebia as cinco
 * perguntas de O Louco — sobre largar tudo sem plano e medo de perder a
 * liberdade — sob um título dizendo "Mergulho nas Sombras de A Morte". As
 * perguntas erradas, com o nome certo em cima.
 *
 * Não era preciso escrever nada: os 22 arcanos já têm 4 sombras cada, com 3
 * sinais próprios e uma severidade — 88 sombras, 264 sinais, tudo preenchido
 * no arcanos.json. Agora o espelho pergunta por esses sinais, e o resultado
 * aponta a sombra do próprio arcano, com o antídoto e o exercício que já
 * existem para ela.
 */

/** Peso de cada severidade no cálculo da sombra dominante. */
const PESO: Record<FrequenciaSombra, number> = {
    BAIXA: 1,
    MEDIA: 1.5,
    ALTA: 2,
    CRONICA: 2.5,
};

const ROTULO_SEVERIDADE: Record<FrequenciaSombra, string> = {
    BAIXA: 'Leve',
    MEDIA: 'Moderada',
    ALTA: 'Intensa',
    CRONICA: 'Crônica',
};

interface Resultado {
    sombra: ShadowPattern;
    marcados: number;
    intensidade: number;
}

export const SombraQuiz: React.FC = () => {
    const { arcanoPessoal } = useArcano();
    const [marcados, setMarcados] = useState<Set<string>>(new Set());
    const [revelado, setRevelado] = useState(false);

    const sombras = useMemo(
        () => (arcanoPessoal ? getShadowPatternsForArcano(arcanoPessoal.numero) : []),
        [arcanoPessoal?.numero]
    );

    const paleta = useMemo(
        () => paletaDoArcano((arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria),
        [(arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria]
    );

    const alternar = useCallback((chave: string) => {
        setMarcados(anterior => {
            const proximo = new Set(anterior);
            if (proximo.has(chave)) proximo.delete(chave);
            else proximo.add(chave);
            return proximo;
        });
    }, []);

    /**
     * A sombra dominante: proporção de sinais reconhecidos, ponderada pela
     * severidade. Proporção e não contagem — sombras com mais sinais listados
     * não podem ganhar só por serem mais descritas.
     */
    const resultado = useMemo<Resultado | null>(() => {
        let melhor: Resultado | null = null;
        for (const s of sombras) {
            const total = s.sinaisAtencao.length || 1;
            const n = s.sinaisAtencao.filter((_, i) => marcados.has(`${s.id}:${i}`)).length;
            if (n === 0) continue;
            const intensidade = (n / total) * (PESO[s.frequenciaSombra] ?? 1.5);
            if (!melhor || intensidade > melhor.intensidade) {
                melhor = { sombra: s, marcados: n, intensidade };
            }
        }
        return melhor;
    }, [sombras, marcados]);

    if (!arcanoPessoal || sombras.length === 0) return null;

    const totalSinais = sombras.reduce((acc, s) => acc + s.sinaisAtencao.length, 0);
    const nenhum = marcados.size === 0;

    return (
        <section
            className="rounded-[1.5rem] overflow-hidden"
            style={bordaGradiente(paleta, `linear-gradient(170deg, ${paleta.lavagem}, transparent 70%)`)}
        >

            <div className="p-6 md:p-8">
                <header className="text-center mb-7">
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: paleta.tinta }}>
                        O Espelho
                    </p>
                    <h3 className="font-serif text-2xl text-white/90 mb-2">
                        Qual sombra está ativa agora
                    </h3>
                    <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
                        Marque o que você reconhece em si nas últimas semanas. Nada aqui é
                        diagnóstico — é um espelho para escolher por onde começar.
                    </p>
                </header>

                {/* ── OS SINAIS, AGRUPADOS POR SOMBRA ─────────────────── */}
                <div className="space-y-5">
                    {sombras.map(sombra => (
                        <div
                            key={sombra.id}
                            className="rounded-2xl border p-4"
                            style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-baseline justify-between gap-3 mb-3">
                                <h4 className="font-serif text-white/80 text-[15px]">{sombra.nomePadrao}</h4>
                                <span className="text-[9.5px] uppercase tracking-[0.16em] shrink-0" style={{ color: paleta.tintaSuave }}>
                                    {ROTULO_SEVERIDADE[sombra.frequenciaSombra]}
                                </span>
                            </div>

                            <ul className="space-y-1.5 list-none p-0 m-0">
                                {sombra.sinaisAtencao.map((sinal, i) => {
                                    const chave = `${sombra.id}:${i}`;
                                    const ativo = marcados.has(chave);
                                    return (
                                        <li key={chave}>
                                            <button
                                                onClick={() => { alternar(chave); setRevelado(false); }}
                                                aria-pressed={ativo}
                                                className="w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-xl border transition-colors"
                                                style={{
                                                    borderColor: ativo ? paleta.borda : 'transparent',
                                                    background: ativo ? paleta.lavagem : 'transparent',
                                                }}
                                            >
                                                <span
                                                    className="mt-0.5 w-4 h-4 rounded-[5px] border shrink-0 flex items-center justify-center"
                                                    style={{
                                                        borderColor: ativo ? paleta.tinta : 'rgba(255,255,255,0.22)',
                                                        background: ativo ? paleta.tinta : 'transparent',
                                                    }}
                                                >
                                                    {ativo && <Check size={11} className="text-black" strokeWidth={3} />}
                                                </span>
                                                <span className={ativo ? 'text-sm text-white/85' : 'text-sm text-white/55'}>
                                                    {sinal}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── AÇÃO ────────────────────────────────────────────── */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setRevelado(true)}
                        disabled={nenhum}
                        className="px-6 py-3 rounded-xl text-sm font-medium border transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
                        style={{ borderColor: paleta.borda, background: paleta.lavagem, color: paleta.tinta }}
                    >
                        {nenhum
                            ? 'Marque ao menos um sinal'
                            : `Revelar a sombra ativa (${marcados.size} de ${totalSinais})`}
                        {!nenhum && <ChevronRight size={14} className="inline ml-1.5 -mt-0.5" />}
                    </button>
                    {marcados.size > 0 && (
                        <button
                            onClick={() => { setMarcados(new Set()); setRevelado(false); }}
                            className="w-11 h-11 rounded-xl border flex items-center justify-center hover:bg-white/5 transition-colors"
                            style={{ borderColor: paleta.borda }}
                            title="Limpar"
                            aria-label="Limpar as marcações"
                        >
                            <RotateCcw size={15} style={{ color: paleta.tinta }} />
                        </button>
                    )}
                </div>

                {/* ── O RESULTADO ─────────────────────────────────────── */}
                <AnimatePresence>
                    {revelado && resultado && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mt-7 pt-7 border-t"
                            style={{ borderColor: paleta.borda }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Flame size={14} style={{ color: paleta.tinta }} />
                                <p className="text-[10px] uppercase tracking-[0.24em]" style={{ color: paleta.tinta }}>
                                    Sombra mais ativa
                                </p>
                            </div>

                            <h4 className="font-serif text-xl text-white/90 mb-1">
                                {resultado.sombra.nomePadrao}
                            </h4>
                            <p className="text-xs text-white/40 mb-5">
                                {resultado.marcados} de {resultado.sombra.sinaisAtencao.length} sinais reconhecidos ·
                                intensidade {ROTULO_SEVERIDADE[resultado.sombra.frequenciaSombra].toLowerCase()}
                            </p>

                            <dl className="space-y-4 m-0">
                                <div>
                                    <dt className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.18em] mb-1.5" style={{ color: paleta.tintaSuave }}>
                                        <ShieldCheck size={11} /> Antídoto
                                    </dt>
                                    <dd className="m-0 text-sm text-white/75 leading-relaxed">
                                        {resultado.sombra.antidoto}
                                    </dd>
                                </div>
                                {resultado.sombra.exercicio && (
                                    <div>
                                        <dt className="text-[9.5px] uppercase tracking-[0.18em] mb-1.5" style={{ color: paleta.tintaSuave }}>
                                            Primeiro passo
                                        </dt>
                                        <dd className="m-0 text-sm text-white/75 leading-relaxed">
                                            {resultado.sombra.exercicio}
                                        </dd>
                                    </div>
                                )}
                            </dl>

                            <p className="mt-5 text-xs text-white/35">
                                O programa completo desta sombra está logo abaixo, em
                                “{resultado.sombra.nomePadrao}”.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
