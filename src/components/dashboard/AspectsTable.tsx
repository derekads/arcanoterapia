import React from 'react';

interface Aspect {
    planeta1: string;
    tipo: string;
    planeta2: string;
    orb: string;
}

interface AspectsTableProps {
    aspectos: Aspect[];
}

export const AspectsTable: React.FC<AspectsTableProps> = ({ aspectos }) => {
    return (
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
                    {aspectos.map((asp, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 text-xs md:text-sm font-mono text-slate-400">
                            <div className="flex items-center gap-4">
                                <span className="text-slate-200 capitalize w-16 md:w-20 truncate">{asp.planeta1}</span>
                                <span className="text-indigo-400 w-16 md:w-24 text-center truncate">{asp.tipo}</span>
                                <span className="text-slate-200 capitalize w-16 md:w-20 truncate">{asp.planeta2}</span>
                            </div>
                            <span className="text-slate-500 text-right">Orb: {asp.orb}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </details>
    );
};
