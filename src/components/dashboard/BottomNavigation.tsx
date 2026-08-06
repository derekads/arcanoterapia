
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Hourglass, Compass } from 'lucide-react';
import { cn } from '../../utils';
import { UniverseView } from '../../types';

interface NavItem {
    id: UniverseView;
    label: string;
    icon: React.ElementType;
    color: string;
    glow: string;
}

const NAV_ITEMS: NavItem[] = [
    {
        id: 'ORACLE',
        label: 'O Oráculo',
        icon: Crown,
        color: 'text-amber-400',
        glow: 'shadow-[0_0_15px_rgba(251,191,36,0.5)]'
    },
    {
        id: 'TIME',
        label: 'O Tempo',
        icon: Hourglass,
        color: 'text-purple-400',
        glow: 'shadow-[0_0_15px_rgba(167,139,250,0.5)]'
    },
    {
        id: 'COSMOS',
        label: 'O Cosmos',
        icon: Compass,
        color: 'text-cyan-400',
        glow: 'shadow-[0_0_15px_rgba(34,211,238,0.5)]'
    }
];

interface Props {
    activeUniverse: UniverseView;
    onUniverseChange: (universe: UniverseView) => void;
}

export const BottomNavigation: React.FC<Props> = ({ activeUniverse, onUniverseChange }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4">
            <div className="w-full max-w-md h-20 bg-[#0f0f15]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex items-center justify-around px-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeUniverse === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onUniverseChange(item.id)}
                            className="flex flex-col items-center gap-1 group relative outline-none"
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                isActive ? item.color : "text-white/40 group-hover:text-white/60"
                            )}>
                                <Icon
                                    size={24}
                                    className={cn(
                                        "transition-all duration-300",
                                        isActive && "scale-110"
                                    )}
                                    fill={isActive ? "currentColor" : "none"}
                                />
                            </div>

                            {isActive && (
                                <>
                                    <motion.span
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-[10px] uppercase tracking-widest font-bold text-white/80"
                                    >
                                        {item.label}
                                    </motion.span>
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className={cn("absolute -bottom-1 w-1 h-1 rounded-full bg-current", item.color, item.glow)}
                                    />
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
