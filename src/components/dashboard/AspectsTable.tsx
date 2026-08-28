import React, { useMemo, useState } from 'react';
import { getAspectStyle, PLANET_SYMBOLS_PT } from '../../utils/astroRenderUtils';
import type { ChartAspect } from '../../utils/mapaAstralAdapter';

interface AspectsTableProps {
    aspectos: ChartAspect[];
    /** Realça as linhas do astro selecionado na roda. */
    astroAtivo?: string | null;
    onSelecionarAstro?: (nome: string) => void;
}

type Filtro = 'todos' | 'harmônico' | 'tenso';

const FILTROS: Array<{ chave: Filtro; label: string }> = [
    { chave: 'todos', label: 'Todos' },
    { chave: 'harmônico', label: 'Harmônicos' },
    { chave: 'tenso', label: 'Tensos' }
];

const glifo = (nome: string) => PLANET_SYMBOLS_PT[nome] || '✦';

export const AspectsTable: React.FC<AspectsTableProps> = ({
    aspectos,
    astroAtivo = null,
    onSelecionarAstro
}) => {
    const [filtro, setFiltro] = useState<Filtro>('todos');

    const listaFiltrada = useMemo(() => {
        if (filtro === 'todos') return aspectos;
        return aspectos.filter(a => getAspectStyle(a.tipo).natureza === filtro);
    }, [aspectos, filtro]);

    const resumo = useMemo(() => {
        const contagem = { harmônico: 0, tenso: 0, neutro: 0 };
        aspectos.forEach(a => {
            contagem[getAspectStyle(a.tipo).natureza] += 1;
        });
        return contagem;
    }, [aspectos]);

    return (
        <section className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden">
            <header className="p-5 bg-white/5 border-b border-white/5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 text-slate-400 text-xs">
                            ☌
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">
                                Aspectos
                            </h3>
                            <p className="text-[10px] text-slate-500 tracking-wide mt-0.5">
                                {aspectos.length} no total · {resumo.harmônico} harmônicos · {resumo.tenso} tensos
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/5">
                        {FILTROS.map(f => (
                            <button
                                key={f.chave}
                                onClick={() => setFiltro(f.chave)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                    filtro === f.chave
                                        ? 'bg-amber-500/20 text-amber-300'
                                        : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="p-3 md:p-5">
                {listaFiltrada.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                        Nenhum aspecto nesta categoria.
                    </p>
                ) : (
                    <ul className="space-y-1.5">
                        {listaFiltrada.map((asp, i) => {
                            const estilo = getAspectStyle(asp.tipo);
                            const destacado =
                                astroAtivo !== null &&
                                (asp.astroA === astroAtivo || asp.astroB === astroAtivo);

                            return (
                                <li key={`${asp.astroA}-${asp.tipo}-${asp.astroB}-${i}`}>
                                    <button
                                        type="button"
                                        onClick={() => onSelecionarAstro?.(asp.astroA)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                                            destacado
                                                ? 'bg-amber-500/10 border border-amber-500/30'
                                                : 'bg-black/20 border border-transparent hover:bg-black/40'
                                        }`}
                                    >
                                        <span
                                            className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-sm"
                                            style={{
                                                color: estilo.color,
                                                backgroundColor: `${estilo.color}1a`
                                            }}
                                            aria-hidden
                                        >
                                            {estilo.symbol}
                                        </span>

                                        <span className="flex items-center gap-2 min-w-0 flex-1">
                                            <span className="text-slate-200 text-xs md:text-sm truncate">
                                                <span className="mr-1 text-slate-400">{glifo(asp.astroA)}</span>
                                                {asp.astroA}
                                            </span>
                                            <span
                                                className="text-[10px] uppercase tracking-widest font-bold shrink-0"
                                                style={{ color: estilo.color }}
                                            >
                                                {estilo.label}
                                            </span>
                                            <span className="text-slate-200 text-xs md:text-sm truncate">
                                                <span className="mr-1 text-slate-400">{glifo(asp.astroB)}</span>
                                                {asp.astroB}
                                            </span>
                                        </span>

                                        <span className="shrink-0 flex items-center gap-2">
                                            {/* Barra de exatidão: quanto menor a orbe, mais forte o aspecto */}
                                            <span className="hidden sm:block w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                                                <span
                                                    className="block h-full rounded-full"
                                                    style={{
                                                        width: `${Math.round(asp.forca * 100)}%`,
                                                        backgroundColor: estilo.color
                                                    }}
                                                />
                                            </span>
                                            <span className="text-[10px] font-mono text-slate-500 w-14 text-right">
                                                orbe {asp.orb.toFixed(1)}°
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default AspectsTable;
