
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles, Compass, Star, ArrowUpRight } from 'lucide-react';
import { MapaAstralCalculado, UserBirthData } from '../../types';
import { cn } from '../../utils';

interface Props {
    mapa: MapaAstralCalculado;
    userData: UserBirthData;
    onNavigate: (view: any) => void;
}

type SubTab = 'TRÍADE' | 'MAPA' | 'TRÂNSITOS';

export const CosmosView: React.FC<Props> = ({ mapa, userData, onNavigate }) => {
    const [subTab, setSubTab] = useState<SubTab>('TRÍADE');

    return (
        <div className="pb-32">
            {/* VISUAL CIRCULAR HERO */}
            <section className="relative h-[50vh] flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
                    <div className="w-[120%] aspect-square border-2 border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute w-[90%] aspect-square border border-cyan-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                </div>

                <div className="relative z-10 w-full max-w-[300px] aspect-square">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        {/* Círculo base */}
                        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />

                        {/* Marcações de Signos (30 graus cada) */}
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="50" y1="2" x2="50" y2="6"
                                stroke="rgba(6,182,212,0.3)"
                                strokeWidth="0.5"
                                transform={`rotate(${i * 30} 50 50)`}
                            />
                        ))}

                        {/* Triade Markers */}
                        <TriadMarker angle={mapa.sol.longitude} color="#fbbf24" icon="sun" />
                        <TriadMarker angle={mapa.lua.longitude} color="#cbd5e1" icon="moon" />
                        <TriadMarker angle={mapa.ascendente.longitude} color="#06b6d4" icon="asc" />

                        {/* Centro */}
                        <circle cx="50" cy="50" r="2" fill="white" className="animate-pulse" />
                    </svg>

                    {/* Descrição Central */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-500/50 font-bold mb-1">Mapa Astral</span>
                        <span className="text-2xl font-serif text-white">{userData.localizacao.nomeCidade}</span>
                    </div>
                </div>
            </section>

            {/* SUB-TABS (Segmented Control) */}
            <div className="px-8 mb-8">
                <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
                    {['TRÍADE', 'MAPA', 'TRÂNSITOS'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSubTab(tab as SubTab)}
                            className={cn(
                                "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                subTab === tab ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" : "text-white/40 hover:text-white/60"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTEÚDO DAS ABAS */}
            <div className="px-8 space-y-4">
                {subTab === 'TRÍADE' && (
                    <>
                        <AstralCard
                            title="Essência"
                            body={`${mapa.sol.signo} ${mapa.sol.grau}°`}
                            sub={`${mapa.sol.elemento} • Casa ${mapa.sol.casa}`}
                            icon={Sun}
                            color="text-amber-400"
                        />
                        <AstralCard
                            title="Emoção"
                            body={`${mapa.lua.signo} ${mapa.lua.grau}°`}
                            sub={`${mapa.lua.elemento} • Casa ${mapa.lua.casa}`}
                            icon={Moon}
                            color="text-slate-300"
                        />
                        <AstralCard
                            title="Máscara"
                            body={`${mapa.ascendente.signo} ${mapa.ascendente.grau}°`}
                            sub={`${mapa.ascendente.elemento} • Casa ${mapa.ascendente.casa}`}
                            icon={Sparkles}
                            color="text-cyan-400"
                        />
                    </>
                )}

                {subTab === 'MAPA' && (
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 text-center space-y-4">
                        <Compass size={40} className="mx-auto text-cyan-500/40" />
                        <h3 className="text-lg font-serif">Acesse seu Mapa Completo</h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Visualize as posições de todos os planetas, casas e aspectos astronômicos do seu nascimento.
                        </p>
                        <button
                            onClick={() => onNavigate('ASTROLOGY_DETAIL')}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/10 transition-all"
                        >
                            Ver Mapa Detalhado <ArrowUpRight size={14} />
                        </button>
                    </div>
                )}

                {subTab === 'TRÂNSITOS' && (
                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Influência do Dia</span>
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-cyan-400/10 text-cyan-400 text-[9px] font-bold">
                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" /> HOJE
                            </div>
                        </div>
                        <h4 className="text-xl font-serif text-white mb-2">Lua em {mapa.lua.signo}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">
                            O céu hoje favorece a introspecção e o autocuidado. As energias lunares sugerem um foco na segurança emocional e nas raízes familiares.
                        </p>
                        <hr className="my-6 border-white/5" />
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-cyan-400/60 font-medium tracking-wide italic">"Ritual de Limpeza Recomendado"</span>
                            <Star size={16} className="text-cyan-400" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const TriadMarker = ({ angle, color, icon }: any) => (
    <g transform={`rotate(${angle - 90} 50 50)`}>
        <line x1="50" y1="0" x2="50" y2="48" stroke={color} strokeWidth="0.2" opacity="0.3" />
        <circle cx="50" cy="0" r="1.5" fill={color} className="animate-pulse" />
        <text x="50" y="-3" fontSize="3" textAnchor="middle" fill={color} fontWeight="bold" transform={`rotate(${-(angle - 90)} 50 -3)`}>
            {icon === 'sun' ? '☉' : icon === 'moon' ? '☽' : 'ASC'}
        </text>
    </g>
);

const AstralCard = ({ title, body, sub, icon: Icon, color }: any) => (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
        <div className="flex items-center gap-5">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-black/40 border border-white/5 shadow-inner", color)}>
                <Icon size={24} />
            </div>
            <div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{title}</span>
                <h4 className="text-lg font-serif text-white">{body}</h4>
                <p className="text-xs text-white/40">{sub}</p>
            </div>
        </div>
        <ArrowUpRight size={16} className="text-white/10 group-hover:text-cyan-400 transition-colors" />
    </div>
);
