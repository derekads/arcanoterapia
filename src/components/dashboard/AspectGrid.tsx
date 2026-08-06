import React from 'react';
import { Sparkles, Navigation } from 'lucide-react';
import { aspectsDB, getGenericAspectInterpretation } from '../../data/aspectData';
import { PLANET_UNICODE } from '../../utils/astroRenderUtils';
import clsx from 'clsx';

export interface AspectPreview {
    planet1: string;
    planet2: string;
    type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
    orb: number;
}

interface Props {
    aspects: AspectPreview[];
    onSelectAspect?: (aspect: AspectPreview) => void;
}

export const AspectGrid: React.FC<Props> = ({ aspects, onSelectAspect }) => {
    if (!aspects || aspects.length === 0) {
        return (
            <div className="w-full text-center p-8 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-white/40 italic text-sm">Nenhum aspecto tenso ou harmônico maior encontrado nesta sinastria.</p>
            </div>
        );
    }

    const typeConfig = {
        conjunction: { color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10', label: 'Conjunção', desc: 'Fusão Pura' },
        trine: { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', label: 'Trígono', desc: 'Harmonia e Facilidade' },
        sextile: { color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', label: 'Sextil', desc: 'Oportunidade' },
        square: { color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', label: 'Quadratura', desc: 'Atrito Evolutivo' },
        opposition: { color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10', label: 'Oposição', desc: 'Espelhamento Psíquico' }
    };

    return (
        <div className="space-y-4">
            {aspects.map((asp, i) => {
                const conf = typeConfig[asp.type];
                const dbKey = `${asp.planet1}_${asp.type}_${asp.planet2}`;
                const aspData = aspectsDB[dbKey] || getGenericAspectInterpretation(asp.type, asp.planet1, asp.planet2);

                return (
                    <div
                        key={i}
                        className="group block p-5 rounded-2xl bg-[#0A0A14] border border-white/10 hover:border-white/20 transition-all shadow-lg hover:shadow-xl relative overflow-hidden"
                        onClick={() => onSelectAspect && onSelectAspect(asp)}
                    >
                        <div className={clsx("absolute top-0 left-0 w-1 h-full", conf.bg.replace('/10', '/50'))} />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/5 shadow-inner">
                                    <span className="text-2xl w-6 text-center">{PLANET_UNICODE[asp.planet1] || '?'}</span>
                                    <span className={clsx("text-[10px] mx-3 uppercase font-black tracking-widest", conf.color)}>{conf.label}</span>
                                    <span className="text-2xl w-6 text-center">{PLANET_UNICODE[asp.planet2] || '?'}</span>
                                </div>

                                <div className="hidden md:block">
                                    <p className="text-white font-serif tracking-wide">{conf.desc}</p>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Orb: {asp.orb.toFixed(1)}°</p>
                                </div>
                            </div>

                            <div className="pr-2">
                                <p className="text-xs text-slate-400 leading-relaxed md:w-[350px] line-clamp-2 md:line-clamp-none italic">
                                    "{aspData.substring(0, 120)}..."
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
