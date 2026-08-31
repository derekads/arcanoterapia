import React, { useMemo, useState } from 'react';
import { MapaSVG } from './MapaSVG';
import { PlanetAccordion } from './PlanetAccordion';
import { AspectsTable } from './AspectsTable';
import { CASAS, interpretarCasa, interpretarAstroNaCasa } from '../../data/casasInterpretacao';
import { ELEMENT_COLORS } from '../../utils/astroRenderUtils';
import type { ChartBody, MapaViewModel } from '../../utils/mapaAstralAdapter';

interface MapaAstralProps {
    mapa: MapaViewModel;
}

const MODALITY_COLORS: Record<string, string> = {
    cardinal: '#f59e0b',
    fixo: '#38bdf8',
    mutavel: '#a78bfa'
};

/** Cartão da tríade (Sol / Lua / Ascendente / MC). */
const TriadeCard: React.FC<{
    rotulo: string;
    astro: ChartBody;
    ativo: boolean;
    onClick: () => void;
}> = ({ rotulo, astro, ativo, onClick }) => {
    const cor = ELEMENT_COLORS[astro.elemento];
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 min-w-[140px] p-4 rounded-2xl border text-left transition-all ${
                ativo
                    ? 'bg-amber-500/10 border-amber-500/40'
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
        >
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
                {rotulo}
            </span>
            <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xl" style={{ color: cor }} aria-hidden>
                    {astro.symbol}
                </span>
                <span className="font-serif text-lg text-white truncate">{astro.signo}</span>
                <span className="text-white/30 text-sm" aria-hidden>
                    {astro.signoSymbol}
                </span>
            </div>
            <p className="text-[11px] text-white/40 mt-1">
                {astro.grauTexto} · Casa {astro.casa}
                {astro.retrogrado && <span className="text-rose-300 ml-1">℞</span>}
            </p>
        </button>
    );
};

/** Barra de distribuição de elementos ou modalidades. */
const DistribuicaoBarra: React.FC<{
    titulo: string;
    fatias: Array<{ chave: string; label: string; total: number; percentual: number }>;
    cores: Record<string, string>;
}> = ({ titulo, fatias, cores }) => (
    <div className="flex-1 min-w-[220px]">
        <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">{titulo}</h4>
        <div className="flex h-2 rounded-full overflow-hidden bg-white/5 mb-3">
            {fatias.map(f => (
                <div
                    key={f.chave}
                    style={{ width: `${f.percentual}%`, backgroundColor: cores[f.chave] }}
                    title={`${f.label}: ${f.total}`}
                />
            ))}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {fatias.map(f => (
                <li key={f.chave} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cores[f.chave] }}
                    />
                    {f.label}
                    <span className="text-slate-500 font-mono">{f.total}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const MapaAstralView: React.FC<MapaAstralProps> = ({ mapa }) => {
    const [astroAtivo, setAstroAtivo] = useState<string | null>(null);
    const [mostrarAspectos, setMostrarAspectos] = useState(true);

    const astroSelecionado = useMemo(
        () => mapa.todos.find(a => a.nome === astroAtivo) || null,
        [mapa.todos, astroAtivo]
    );

    /**
     * Qual casa está aberta. A lista de cúspides mostrava grau, signo e
     * amplitude — e nenhuma palavra sobre o que cada casa É. Agora cada uma
     * abre a interpretação e o que os astros dela significam ali.
     */
    const [casaAberta, setCasaAberta] = useState<number | null>(null);

    const aspectosDoAtivo = useMemo(() => {
        if (!astroAtivo) return [];
        return mapa.aspectos.filter(a => a.astroA === astroAtivo || a.astroB === astroAtivo);
    }, [mapa.aspectos, astroAtivo]);

    const selecionar = (nome: string) => {
        setAstroAtivo(atual => (atual === nome ? null : nome));
    };

    /** Seleciona e rola até o card correspondente (fluxo mobile). */
    const selecionarEComRolagem = (nome: string) => {
        const proximo = astroAtivo === nome ? null : nome;
        setAstroAtivo(proximo);
        if (!proximo) return;
        window.setTimeout(() => {
            const card = document.getElementById(`astro-card-${nome.toLowerCase().replace(/\s+/g, '-')}`);
            if (!card) return;
            const y = card.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }, 150);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* ═══ CABEÇALHO ═══ */}
            <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 md:px-6 md:py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-base md:text-xl font-light text-amber-100 truncate">
                            Mapa Astral de{' '}
                            <span className="font-medium text-amber-400">{mapa.nome}</span>
                        </h1>
                        <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 truncate">
                            {mapa.meta.dataNascimento} · {mapa.meta.horaNascimento} ·{' '}
                            {mapa.meta.cidade}
                        </p>
                    </div>
                    <span className="text-[10px] text-slate-500 hidden lg:block text-right leading-relaxed shrink-0">
                        {mapa.meta.fusoHorario}
                        {mapa.meta.fusoAproximado && (
                            <span
                                className="ml-1.5 text-amber-500/70"
                                title="Perfil salvo antes do fuso preciso: o horário de verão pode não ter sido considerado. Refaça o mapa para corrigir."
                            >
                                aproximado
                            </span>
                        )}
                        {' · '}{mapa.meta.coordenadas}
                        <br />
                        Casas: {mapa.meta.sistemaCasas}
                    </span>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row lg:h-[calc(100vh-72px)] lg:overflow-hidden">
                {/* ═══ ÁREA 1: RODA ═══ */}
                <section className="w-full lg:w-[46%] xl:w-[42%] lg:h-full flex flex-col items-center justify-start lg:justify-center p-4 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-b from-slate-950 to-slate-900/50">
                    <div className="w-full max-w-[420px] lg:max-w-[480px]">
                        <MapaSVG
                            astros={mapa.astros}
                            angulos={mapa.angulos}
                            cuspides={mapa.cuspides}
                            aspectos={mapa.aspectos}
                            ascendenteGraus={mapa.ascendenteGraus}
                            astroAtivo={astroAtivo}
                            onAstroClick={selecionar}
                            mostrarAspectos={mostrarAspectos}
                            className="w-full drop-shadow-2xl"
                        />
                    </div>

                    {/* Controles da roda */}
                    <div className="flex items-center gap-3 mt-4 flex-wrap justify-center">
                        <button
                            type="button"
                            onClick={() => setMostrarAspectos(v => !v)}
                            aria-pressed={mostrarAspectos}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                                mostrarAspectos
                                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {mostrarAspectos ? 'Aspectos visíveis' : 'Aspectos ocultos'}
                        </button>
                        {astroAtivo && (
                            <button
                                type="button"
                                onClick={() => setAstroAtivo(null)}
                                className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                Limpar seleção
                            </button>
                        )}
                    </div>

                    {/* Leitura do astro selecionado */}
                    <div className="mt-4 w-full max-w-[420px] min-h-[76px]">
                        {astroSelecionado ? (
                            <div className="px-5 py-3 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm text-amber-100 font-serif">
                                        <span className="mr-1.5" aria-hidden>
                                            {astroSelecionado.symbol}
                                        </span>
                                        {astroSelecionado.nome} · {astroSelecionado.grauTexto}{' '}
                                        {astroSelecionado.signo}
                                        {astroSelecionado.retrogrado && (
                                            <span className="text-rose-300 ml-1.5">℞</span>
                                        )}
                                    </p>
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 shrink-0">
                                        Casa {astroSelecionado.casa}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    {aspectosDoAtivo.length} aspecto
                                    {aspectosDoAtivo.length === 1 ? '' : 's'} em destaque na roda
                                </p>
                            </div>
                        ) : (
                            <div className="text-center px-5 py-3 rounded-2xl bg-slate-900/40 border border-white/5">
                                <h3 className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                                    Céu de Nascimento
                                </h3>
                                <p className="text-xs text-slate-400 font-serif italic">
                                    Toque em um astro para isolar seus aspectos.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ═══ ÁREA 2: CONTEÚDO ═══ */}
                <section className="w-full lg:w-[54%] xl:w-[58%] lg:h-full lg:overflow-y-auto bg-slate-950 scroll-smooth custom-scrollbar">
                    <div className="p-4 md:p-8 space-y-8 max-w-3xl mx-auto pb-24 lg:pb-12">
                        {/* Tríade + MC */}
                        <div>
                            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
                                Pilares do Mapa
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                <TriadeCard
                                    rotulo="Essência"
                                    astro={mapa.sol}
                                    ativo={astroAtivo === mapa.sol.nome}
                                    onClick={() => selecionarEComRolagem(mapa.sol.nome)}
                                />
                                <TriadeCard
                                    rotulo="Emoção"
                                    astro={mapa.lua}
                                    ativo={astroAtivo === mapa.lua.nome}
                                    onClick={() => selecionarEComRolagem(mapa.lua.nome)}
                                />
                                <TriadeCard
                                    rotulo="Máscara"
                                    astro={mapa.ascendente}
                                    ativo={astroAtivo === mapa.ascendente.nome}
                                    onClick={() => selecionarEComRolagem(mapa.ascendente.nome)}
                                />
                                <TriadeCard
                                    rotulo="Vocação"
                                    astro={mapa.mc}
                                    ativo={astroAtivo === mapa.mc.nome}
                                    onClick={() => selecionarEComRolagem(mapa.mc.nome)}
                                />
                            </div>
                        </div>

                        {/* Distribuição de elementos e modalidades */}
                        <div className="flex flex-wrap gap-8 p-5 rounded-2xl bg-slate-900/40 border border-white/5">
                            <DistribuicaoBarra
                                titulo="Elementos"
                                fatias={mapa.elementos}
                                cores={ELEMENT_COLORS}
                            />
                            <DistribuicaoBarra
                                titulo="Modalidades"
                                fatias={mapa.modalidades}
                                cores={MODALITY_COLORS}
                            />
                        </div>

                        {/* Navegação rápida (mobile) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden scrollbar-hide snap-x">
                            {mapa.todos.map(a => (
                                <button
                                    key={`pill-${a.nome}`}
                                    onClick={() => selecionarEComRolagem(a.nome)}
                                    className={`flex-shrink-0 snap-center px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                                        astroAtivo === a.nome
                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                            : 'bg-white/5 text-slate-400 border border-white/10'
                                    }`}
                                >
                                    <span className="mr-1" aria-hidden>
                                        {a.symbol}
                                    </span>
                                    {a.nome}
                                </button>
                            ))}
                        </div>

                        {/* Lista de astros e eixos */}
                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold flex items-center gap-4">
                                <span className="w-8 h-px bg-slate-800 hidden md:block" />
                                Configurações Divinas
                                <span className="flex-1 h-px bg-slate-800 hidden md:block" />
                            </h2>

                            {mapa.todos.map(astro => (
                                <PlanetAccordion
                                    key={astro.nome}
                                    dados={astro}
                                    isActive={astroAtivo === astro.nome}
                                    onClick={() => selecionar(astro.nome)}
                                />
                            ))}
                        </div>

                        {/* Cúspides das casas */}
                        <section className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden">
                            <header className="p-5 bg-white/5 border-b border-white/5">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">
                                    Cúspides das Casas
                                </h3>
                                <p className="text-[10px] text-slate-500 tracking-wide mt-0.5">
                                    Sistema {mapa.meta.sistemaCasas}
                                </p>
                            </header>
                            <ul className="p-3 md:p-5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {mapa.cuspides.map(cusp => {
                                    const habitantes = mapa.astros.filter(a => a.casa === cusp.casa);
                                    return (
                                        <li key={`cusp-${cusp.casa}`} className="sm:col-span-1">
                                          <button
                                            type="button"
                                            onClick={() =>
                                                setCasaAberta(casaAberta === cusp.casa ? null : cusp.casa)
                                            }
                                            aria-expanded={casaAberta === cusp.casa}
                                            className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors ${
                                                cusp.eixo
                                                    ? 'bg-amber-500/5 border border-amber-500/20'
                                                    : 'bg-black/20 border border-transparent hover:bg-black/40'
                                            }`}
                                          >
                                            <span className="w-7 h-7 shrink-0 rounded-lg bg-white/5 flex items-center justify-center text-[11px] font-bold text-slate-400">
                                                {cusp.casa}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-xs text-slate-200">
                                                    {cusp.grauTexto}{' '}
                                                    <span className="text-slate-500" aria-hidden>
                                                        {cusp.signoSymbol}
                                                    </span>
                                                    {cusp.eixo && (
                                                        <span className="ml-2 text-[9px] font-bold uppercase tracking-widest text-amber-400">
                                                            {cusp.eixo}
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="block text-[10px] text-slate-500 mt-0.5">
                                                    {cusp.amplitude}° de amplitude
                                                    {habitantes.length > 0 && (
                                                        <span className="ml-1.5 text-slate-400">
                                                            ·{' '}
                                                            {habitantes
                                                                .map(h => h.symbol)
                                                                .join(' ')}
                                                        </span>
                                                    )}
                                                </span>
                                            </span>
                                          </button>

                                          {casaAberta === cusp.casa && (
                                            <div className="mt-2 px-4 py-3 rounded-xl bg-black/30 border-l-2 border-amber-500/40 space-y-3">
                                                <p className="text-[11px] uppercase tracking-[0.18em] text-amber-400/80 m-0">
                                                    {CASAS[cusp.casa]?.titulo}
                                                </p>
                                                <p className="text-[13px] leading-relaxed text-slate-300 m-0">
                                                    {interpretarCasa(cusp.casa, cusp.signo)}
                                                </p>
                                                <p className="text-[13px] leading-relaxed text-slate-400 m-0">
                                                    <span className="text-slate-500">A pergunta desta casa: </span>
                                                    {CASAS[cusp.casa]?.pergunta}
                                                </p>
                                                <p className="text-[13px] leading-relaxed text-slate-400 m-0">
                                                    <span className="text-slate-500">Quando é evitada: </span>
                                                    {CASAS[cusp.casa]?.sombra}
                                                </p>
                                                {habitantes.length > 0 && (
                                                    <ul className="pt-2 mt-1 border-t border-white/5 space-y-1.5 list-none p-0">
                                                        {habitantes.map(h => (
                                                            <li key={h.nome} className="text-[12.5px] leading-relaxed text-slate-400">
                                                                <span className="text-slate-200">{h.nome}</span>{' '}
                                                                — {interpretarAstroNaCasa(h.nome, cusp.casa)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                          )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                        {/* Aspectos */}
                        <AspectsTable
                            aspectos={mapa.aspectos}
                            astroAtivo={astroAtivo}
                            onSelecionarAstro={selecionarEComRolagem}
                        />

                        <div className="h-10 lg:h-0" />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MapaAstralView;
