import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Globe, Compass, Sun, Moon, Sparkles, Check } from 'lucide-react';
import { ArcanoAdvanced, MapaAstralCalculado } from '../../types';
import { calculateArcanoAlignment } from '../../utils/astroConnectionUtils';
import { deArcano } from '../../utils/calculos';
import { variaveisDaPaleta, paletaDoArcano, bordaGradiente } from '../../utils/arcanoPalette';
import { ASTROS } from '../../data/aspectosInterpretacao';
import { useUserProgress } from '../../hooks/useUserProgress';

/**
 * TEIA DO DESTINO — onde o arcano encosta no mapa astral.
 *
 * Três coisas estavam erradas aqui.
 *
 * A cor: roxo no card do signo, ciano no do astro, âmbar no mapa de
 * sincronicidade e um bloco laranja sólido no rodapé — quatro famílias de cor
 * numa tela só, nenhuma delas a do arcano. Agora tudo desce de `--arc-*`, e a
 * distinção entre os dois cards passou a ser a que já existia no JSON: a cor
 * principal do arcano contra a secundária.
 *
 * O texto: o card do astro regente dizia "o astro que governa a estrutura e o
 * potencial divino" para vinte e um dos vinte e dois arcanos — o outro ramo do
 * ternário `arcano.numero === 1` era o único texto próprio da tela. Cada astro
 * agora fala pela sua função real, a mesma que a tabela de aspectos usa.
 *
 * O botão: "Marcar Prática" não tinha `onClick`. Era um botão que não fazia
 * nada, ao lado de um desafio que ninguém podia concluir. Agora ele registra um
 * check-in de verdade, no mesmo contador de sequência das Diretrizes.
 */

interface Props {
    arcano: ArcanoAdvanced;
    mapa: MapaAstralCalculado | null;
    insights?: any;
}

/** Identificador do check-in desta prática no histórico de progresso. */
const PRATICA_ID = 'cosmos:alinhamento';

/**
 * A função do astro regente, dita pelo próprio astro.
 *
 * Dois arcanos trazem regência dupla no JSON ("Lua/Marte"); a barra separa os
 * dois nomes, e a frase junta as duas funções em vez de descartar a segunda.
 */
function funcaoDoRegente(regente?: string): string | null {
    if (!regente) return null;
    const funcoes = regente
        .split('/')
        .map(nome => ASTROS[nome.trim()]?.funcao)
        .filter(Boolean) as string[];
    if (funcoes.length === 0) return null;
    if (funcoes.length === 1) return funcoes[0];
    return `${funcoes[0]} somada a ${funcoes[1]}`;
}

function nucleoDoRegente(regente?: string): string | null {
    if (!regente) return null;
    const nome = regente.split('/')[0].trim();
    return ASTROS[nome]?.nucleo ?? null;
}

export const ArcanoCosmosView: React.FC<Props> = ({ arcano, mapa, insights }) => {
    const alignment = calculateArcanoAlignment(arcano, mapa);
    const { checkinGuideline, isGuidelineCheckedToday, getGuidelineCheckinCount } =
        useUserProgress(arcano.numero);

    const paleta = useMemo(
        () => paletaDoArcano((arcano as any)?.cor, (arcano as any)?.cor_secundaria),
        [(arcano as any)?.cor, (arcano as any)?.cor_secundaria]
    );
    const variaveis = useMemo(
        () => variaveisDaPaleta((arcano as any)?.cor, (arcano as any)?.cor_secundaria),
        [(arcano as any)?.cor, (arcano as any)?.cor_secundaria]
    );

    if (!mapa) {
        return (
            <div className="p-12 text-center">
                <Compass size={48} className="mx-auto text-slate-500 mb-4 animate-pulse" />
                <p className="text-slate-400">Mapa astral não carregado para este perfil.</p>
            </div>
        );
    }

    const funcao = funcaoDoRegente(arcano.planeta_regente);
    const nucleo = nucleoDoRegente(arcano.planeta_regente);
    const marcadaHoje = isGuidelineCheckedToday(PRATICA_ID);
    const vezes = getGuidelineCheckinCount(PRATICA_ID);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12 pb-24" style={variaveis}>
            {/* ── O GRAU DE ALINHAMENTO ─────────────────────────────────── */}
            <section className="text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-block relative p-[2px] rounded-full"
                    style={{ background: paleta.gradiente }}
                >
                    <div className="bg-[#050505] rounded-full px-8 py-4 flex items-center gap-4 border border-white/5">
                        <div className="relative">
                            <svg className="w-12 h-12 rotate-[-90deg]">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                <motion.circle
                                    cx="24" cy="24" r="20" fill="none"
                                    stroke="url(#gradient-cosmos)" strokeWidth="4"
                                    strokeDasharray="125.6"
                                    initial={{ strokeDashoffset: 125.6 }}
                                    animate={{ strokeDashoffset: 125.6 - (125.6 * alignment.alignmentScore) / 100 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                                <defs>
                                    <linearGradient id="gradient-cosmos" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={paleta.tinta} />
                                        <stop offset="100%" stopColor={paleta.apoio} />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                                {alignment.alignmentScore}%
                            </div>
                        </div>
                        <div className="text-left">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Alinhamento Cósmico</h3>
                            <p className="text-lg font-serif text-white">Sincronicidade de Alma</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ── SIGNO & ASTRO ─────────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* O signo — cor principal do arcano */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] relative overflow-hidden group"
                    style={bordaGradiente(paleta, `linear-gradient(150deg, ${paleta.lavagem}, transparent 70%)`)}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
                            <Star size={120} style={{ color: paleta.tinta }} />
                        </motion.div>
                    </div>
                    <div className="relative z-10">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: 'var(--arc-forte)', color: 'var(--arc-tinta)' }}
                        >
                            <Sparkles size={24} />
                        </div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--arc-suave)' }}>
                            Personalidade Híbrida
                        </h4>
                        <p className="text-3xl font-serif text-white mb-3">{arcano.nome} em {mapa.sol.signo}</p>
                        <p
                            className="text-sm text-slate-400 font-light leading-relaxed italic pl-4 mb-4"
                            style={{ borderLeft: `2px solid ${paleta.borda}` }}
                        >
                            {insights?.signo?.perfil || `A fusão entre o arquétipo ${deArcano(arcano.nome)} e o Sol em ${mapa.sol.signo} cria uma expressão única de individualidade.`}
                        </p>
                        {insights?.signo?.ponto_cego && (
                            <div className="text-[10px] uppercase font-bold text-rose-400/70 border border-rose-500/20 rounded-lg p-2 bg-rose-500/5">
                                ⚠️ Ponto Cego: {insights.signo.ponto_cego}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* O astro regente — cor secundária do arcano */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-[2.5rem] relative overflow-hidden group"
                    style={{
                        border: '1.5px solid transparent',
                        background:
                            `linear-gradient(150deg, ${paleta.brutaSecundaria}14, transparent 70%) padding-box, ` +
                            `linear-gradient(#050505, #050505) padding-box, ` +
                            `linear-gradient(135deg, ${paleta.apoio}, ${paleta.tinta}) border-box`,
                    }}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden>
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}>
                            <Globe size={120} style={{ color: paleta.apoio }} />
                        </motion.div>
                    </div>
                    <div className="relative z-10">
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                            style={{ background: `${paleta.apoio}33`, color: paleta.apoio }}
                        >
                            <Star size={24} />
                        </div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: `${paleta.apoio}aa` }}>
                            Astro Regente
                        </h4>
                        <p className="text-3xl font-serif text-white mb-3">{arcano.planeta_regente || '—'}</p>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {funcao
                                ? <>A força ativa deste Arcano vem de {arcano.planeta_regente}, o astro que governa {funcao}. Quando esta lâmina aparece, é {nucleo} que está em jogo.</>
                                : <>A força ativa deste Arcano vem de {arcano.planeta_regente}.</>}
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ── MAPA DE SINCRONICIDADE ────────────────────────────────── */}
            <section className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--arc-lavagem)', color: 'var(--arc-tinta)' }}
                    >
                        <Compass size={20} />
                    </div>
                    <h2 className="text-2xl font-serif text-white">Mapa de Sincronicidade</h2>
                </div>

                <div className="space-y-6">
                    {alignment.insights.map((insight, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="mt-1 shrink-0" style={{ color: 'var(--arc-tinta)' }}>
                                {insight.includes('Sol') ? <Sun size={20} /> :
                                    insight.includes('Lua') ? <Moon size={20} /> :
                                        insight.includes('Ascendente') ? <Sparkles size={20} /> :
                                            <Star size={20} />}
                            </div>
                            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
                                {insight}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── A PRÁTICA ─────────────────────────────────────────────── */}
            <section
                className="relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden group"
                style={{ background: paleta.gradiente }}
            >
                <div className="absolute inset-0 bg-black/20" aria-hidden />
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700" aria-hidden>
                    <Zap size={150} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="text-center md:text-left flex-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/60 mb-2 block">Desafio Alquímico</span>
                        <h3 className="text-3xl font-serif text-black mb-4">Ação de Alinhamento</h3>
                        <p className="text-black/80 font-medium leading-relaxed max-w-xl">
                            {funcao
                                ? `Hoje, dedique cinco minutos a uma pergunta só: onde ${funcao} — que é o que ${arcano.planeta_regente} pede em você — está sendo contida pelo modo como seu Ascendente em ${mapa.ascendente.signo} escolhe se apresentar?`
                                : `Hoje, dedique cinco minutos para contemplar em silêncio como a energia deste Arcano pode servir de base para seu Ascendente em ${mapa.ascendente.signo} se expressar com mais autenticidade.`}
                        </p>
                        {vezes > 0 && (
                            <p className="text-black/50 text-xs mt-3">
                                Você já cumpriu esta prática {vezes === 1 ? 'uma vez' : `${vezes} vezes`}.
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => checkinGuideline(PRATICA_ID)}
                        disabled={marcadaHoje}
                        aria-pressed={marcadaHoje}
                        className="px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-2xl shrink-0 flex items-center gap-2 disabled:cursor-default"
                        style={marcadaHoje
                            ? { background: 'rgba(0,0,0,0.25)', color: 'rgba(0,0,0,0.65)' }
                            : { background: '#000', color: '#fff' }}
                    >
                        {marcadaHoje ? <><Check size={14} /> Marcada hoje</> : 'Marcar Prática'}
                    </button>
                </div>
            </section>
        </div>
    );
};
