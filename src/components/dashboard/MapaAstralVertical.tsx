import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

import { useMapaState } from '../../hooks/useMapaState';
import { MOCK_MAPA_V2, MOCK_ASPECTS_V2 } from '../../data/mockMapaAstralV2';
import { AstroChartVertical } from './AstroChartVertical';
import { PlanetaCardV2 } from './PlanetaCardV2';

export const MapaAstralVertical: React.FC = () => {
    const { selectedPlanet, selectPlanet, planetsListRef } = useMapaState();
    const [isExporting, setIsExporting] = useState(false);

    // Lógica da V1 preservada para Screenshots
    const handleExportMap = async () => {
        const wheelElement = document.getElementById('astro-wheel-vertical-export');
        if (!wheelElement) return;

        try {
            setIsExporting(true);
            const canvas = await html2canvas(wheelElement, {
                backgroundColor: '#030305',
                scale: 2,
                logging: false,
                useCORS: true
            });

            const dataUrl = canvas.toDataURL('image/png');

            if (navigator.share) {
                try {
                    const blob = await (await fetch(dataUrl)).blob();
                    const file = new File([blob], 'meu-mapa-celeste.png', { type: 'image/png' });
                    await navigator.share({
                        title: 'Meu Cosmos Pessoal - Arcanoterapia',
                        text: 'Descobri meu blueprint celestial. ✨',
                        files: [file]
                    });
                    return;
                } catch (shareError) {
                    console.log('Share cancelado, fallback para download.');
                }
            }

            const link = document.createElement('a');
            link.download = 'arcanoterapia-mapa.png';
            link.href = dataUrl;
            link.click();
        } catch (e) {
            console.error('Falha ao exportar mapa', e);
            alert('Não foi possível gerar a imagem no momento. Tente novamente.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-32 overflow-x-hidden selection:bg-amber-500/30">

            {/* 1. STICKY HEADER GLASSMORPHISM */}
            <header className="fixed top-0 inset-x-0 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <Compass className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="font-serif text-base md:text-lg text-slate-100 leading-tight">Mapa Astral</h1>
                        <span className="text-[10px] text-slate-400 font-mono tracking-widest hidden sm:block">Fuso UTC-3 (Equal House)</span>
                    </div>
                </div>

                <button
                    onClick={handleExportMap}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all text-slate-300 disabled:opacity-50"
                >
                    {isExporting ? <span className="animate-pulse">Gerando...</span> : <><Share2 size={14} /> Share</>}
                </button>
            </header>

            {/* Padding para compensar o header fixo */}
            <div className="pt-24 px-4 md:px-8 max-w-2xl mx-auto space-y-12">

                {/* 2. RODA CELESTE FULL-WIDTH (O Export Target) */}
                <section id="astro-wheel-vertical-export" className="relative pb-6 bg-slate-950 rounded-3xl">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-transparent bg-clip-text bg-gradient-to-br from-slate-100 to-slate-400">
                            Céu de Nascimento
                        </h2>
                        <p className="text-sm text-slate-500 mt-2 italic font-serif">Toque nos planetas ou aproxime a visualização</p>
                    </div>

                    <AstroChartVertical
                        planetas={MOCK_MAPA_V2}
                        selectedPlanet={selectedPlanet}
                        onSelectPlanet={selectPlanet}
                    />
                </section>

                {/* 3. QUICK NAV CAROUSEL (PILLS) */}
                <section className="relative -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
                        {MOCK_MAPA_V2.map((p) => {
                            const isActive = selectedPlanet === p.key;
                            return (
                                <button
                                    key={`pill-${p.key}`}
                                    onClick={() => selectPlanet(p.key)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 snap-center
                    ${isActive
                                            ? 'bg-amber-500/10 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                        }`}
                                >
                                    <span className="text-lg leading-none">{p.symbol}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">{p.name}</span>
                                </button>
                            );
                        })}
                    </div>
                    {/* Fading Edges para indicar scroll mobile horizontal */}
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none md:hidden" />
                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none md:hidden" />
                </section>

                {/* 4. LISTA VERTICAL DE PLANETAS (ACCORDIONS) */}
                <section ref={planetsListRef} className="space-y-4">
                    <h2 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-4">
                        <span className="w-8 h-px bg-slate-800" />
                        Configurações Divinas
                        <span className="flex-1 h-px bg-slate-800" />
                    </h2>

                    {MOCK_MAPA_V2.map(p => (
                        <PlanetaCardV2
                            key={p.key}
                            planeta={p}
                            isExpanded={selectedPlanet === p.key}
                            onToggle={() => selectPlanet(selectedPlanet === p.key ? '' : p.key)} // Toogle fecha se clicar no mesmo
                        />
                    ))}
                </section>

                {/* 5. ASPECTOS (MINIMIZADO/SIMPLIFICADO) */}
                <section className="pt-6">
                    <details className="group bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                    <span className="text-slate-400 text-xs">☌</span>
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300">Tabela de Aspectos</h3>
                            </div>
                            <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>

                        <div className="p-5 border-t border-white/5">
                            <div className="grid grid-cols-1 gap-2">
                                {MOCK_ASPECTS_V2.map((asp, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 text-xs md:text-sm font-mono text-slate-400">
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-200 capitalize">{asp.planet1}</span>
                                            <span className="text-indigo-400">{asp.type}</span>
                                            <span className="text-slate-200 capitalize">{asp.planet2}</span>
                                        </div>
                                        <span className="text-slate-500">Orb: {asp.orb}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </details>
                </section>

            </div>
        </div>
    );
};
