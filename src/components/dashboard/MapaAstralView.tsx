import React, { useState } from 'react';
import { MapaSVG } from './MapaSVG';
import { PlanetAccordion } from './PlanetAccordion';
import { AspectsTable } from './AspectsTable';

interface MapaAstralProps {
    dados: {
        nome: string;
        planetas: Array<{
            planeta: string;
            signo: string;
            casa: number;
            grau: string;
            elemento: string;
            interpretacao?: {
                titulo: string;
                potencialLuz: string;
                desafioSombra: string;
                acaoPratica: string;
            };
        }>;
        aspectos: Array<{
            planeta1: string;
            tipo: string;
            planeta2: string;
            orb: string;
        }>;
    };
}

export const MapaAstralView: React.FC<MapaAstralProps> = ({ dados }) => {
    const [planetaAtivo, setPlanetaAtivo] = useState<string | null>(null);

    // Sync scroll for mobile QuickNav
    const handlePillClick = (planetaNome: string) => {
        setPlanetaAtivo(planetaNome);
        // Auto-scroll mobile ao clicar na pill
        setTimeout(() => {
            const card = document.getElementById(`planeta-card-${planetaNome.toLowerCase()}`);
            if (card) {
                const y = card.getBoundingClientRect().top + window.scrollY - 80; // offset do header
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 150);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* HEADER - Sticky em ambos os modos */}
            <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-4 md:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-lg md:text-xl font-light text-amber-100">
                        Mapa Astral de <span className="font-medium text-amber-400">{dados.nome}</span>
                    </h1>
                    <span className="text-xs text-slate-400 hidden md:block">Fuso UTC-3 • Sistema de Casas Placidus</span>
                </div>
            </header>

            {/* LAYOUT RESPONSIVO - STRICT WIREFRAME */}
            <main className="flex flex-col md:flex-row md:h-[calc(100vh-64px)] overflow-hidden">

                {/* ÁREA 1: MAPA ASTRAL (SVG) */}
                <section className="w-full md:w-[45%] lg:w-[40%] md:sticky md:top-16 md:h-full flex flex-col items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-b from-slate-950 to-slate-900/50 relative">

                    {/* Container do Mapa com ratio fixo */}
                    <div className="w-full max-w-[380px] md:max-w-[450px] aspect-square relative selection:bg-transparent">
                        {/* Círculo decorativo externo */}
                        <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-pulse-slow pointer-events-none" />

                        {/* SVG do Mapa Astral */}
                        <MapaSVG
                            planetas={dados.planetas}
                            aspectos={dados.aspectos}
                            planetaAtivo={planetaAtivo}
                            onPlanetaClick={setPlanetaAtivo}
                            className="w-full h-full drop-shadow-2xl"
                        />

                        {/* Botões de zoom/controle (Mobile) */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-950/80 px-4 py-1.5 rounded-full border border-white/5">
                                Toque nos planetas
                            </span>
                        </div>
                    </div>

                    {/* Legenda/Subtítulo apenas Desktop */}
                    <div className="hidden md:block mt-8 text-center bg-slate-900/50 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur">
                        <h3 className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Céu de Nascimento</h3>
                        <p className="text-xs text-slate-400 font-serif italic">Navegue pelas engrenagens do seu destino.</p>
                    </div>
                </section>

                {/* ÁREA 2: CONTEÚDO SCROLLÁVEL */}
                <section className="w-full md:w-[55%] lg:w-[60%] md:h-full md:overflow-y-auto bg-slate-950 scroll-smooth custom-scrollbar">
                    <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto pb-24 md:pb-12">

                        {/* Navegação rápida por planetas (Mobile) */}
                        <div className="flex gap-2 overflow-x-auto pb-2 pt-2 md:hidden scrollbar-hide snap-x relative z-10">
                            {dados.planetas.map((p) => {
                                const isActive = planetaAtivo === p.planeta;
                                return (
                                    <button
                                        key={`pill-${p.planeta}`}
                                        onClick={() => handlePillClick(p.planeta)}
                                        className={`flex-shrink-0 snap-center px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                                                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-200'
                                            }`}
                                    >
                                        {p.planeta}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Lista de Planetas - Accordion */}
                        <div className="space-y-4 relative z-0 mt-4 md:mt-0">
                            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6 flex items-center gap-4">
                                <span className="w-8 h-px bg-slate-800 hidden md:block" />
                                Configurações Divinas
                                <span className="flex-1 h-px bg-slate-800 hidden md:block" />
                            </h2>

                            {dados.planetas.map((planeta, index) => (
                                <PlanetAccordion
                                    key={planeta.planeta}
                                    dados={{
                                        ...planeta,
                                        // Symbol fallback mappings via Zod-like runtime or manual, keeping interface clean:
                                        symbol: {
                                            'Sol': '☉', 'Lua': '☽', 'Mercúrio': '☿', 'Vênus': '♀', 'Marte': '♂',
                                            'Júpiter': '♃', 'Saturno': '♄', 'Urano': '♅', 'Netuno': '♆', 'Plutão': '♇'
                                        }[planeta.planeta] || '✨'
                                    }}
                                    isActive={planetaAtivo === planeta.planeta}
                                    onClick={() => setPlanetaAtivo(
                                        planetaAtivo === planeta.planeta ? null : planeta.planeta
                                    )}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Tabela de Aspectos */}
                        <div className="pt-8">
                            <AspectsTable aspectos={dados.aspectos} />
                        </div>

                        {/* Espaço reservado para não cortar conteúdo no mobile overflow */}
                        <div className="h-10 md:h-0" />
                    </div>
                </section>
            </main>
        </div>
    );
};
