import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, LayoutGrid } from 'lucide-react';
import { ArcanoAdvanced, UserBirthData } from '../types';
import { ArcanoPessoalDB } from '../data/arcanos';
import { CardFlip3D, useCardReveal } from './CardFlip3D';
import { MAJOR_ARCANA, BACK_IMAGE } from '../lib/cardImages';

// ═════════════════════════════════════════════════════════
// NUMEROLOGIA HELPERS
// ═════════════════════════════════════════════════════════

const ROMANOS = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII'];

const reduzirNumero = (n: number): number => {
    if (n <= 22) {
        const digits = String(n).split('').map(Number);
        if (digits.length === 1) return n;
        const soma = digits.reduce((a, b) => a + b, 0);
        return soma > 22 ? reduzirNumero(soma) : soma;
    }
    return n;
};

const getNumerologia = (numero: number) => {
    const reducao = reduzirNumero(numero);
    const arcanoReduzido = ArcanoPessoalDB.getByNumero(reducao);
    const digitsStr = String(numero).split('').join(' + ');
    const soma = String(numero).split('').map(Number).reduce((a, b) => a + b, 0);
    return {
        equacao: `${ROMANOS[numero] || numero} = ${digitsStr} = ${soma}`,
        reducao,
        nomeReduzido: arcanoReduzido?.nome || '',
        significado: arcanoReduzido ? `O fim contém o princípio fértil` : '',
    };
};

// ═════════════════════════════════════════════════════════
// SUBTITULOS POR ARCANO
// ═════════════════════════════════════════════════════════

const SUBTITULOS: Record<number, string> = {
    1: 'O Primeiro Impulso',
    2: 'A Guardiã do Véu',
    3: 'O Princípio Fértil',
    4: 'A Fundação Soberana',
    5: 'A Ponte do Sagrado',
    6: 'A Escolha Consciente',
    7: 'O Triunfo Dirigido',
    8: 'O Fio da Balança',
    9: 'A Lanterna Interior',
    10: 'O Giro Perpétuo',
    11: 'O Domínio Silencioso',
    12: 'A Perspectiva Invertida',
    13: 'O Renascimento Inevitável',
    14: 'A Alquimia dos Opostos',
    15: 'O Confronto da Sombra',
    16: 'A Queda Libertadora',
    17: 'O Farol na Escuridão',
    18: 'A Travessia da Névoa',
    19: 'A Radiância Plena',
    20: 'O Chamado Ancestral',
    21: 'O Culminar dos Ciclos',
    22: 'O Salto de Fé',
};



// ═════════════════════════════════════════════════════════
// TAROT CARD VISUAL COMPONENT
// ═════════════════════════════════════════════════════════



// ═════════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═════════════════════════════════════════════════════════

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.5 + 0.1,
}));

const FloatingParticles: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map(p => (
            <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    backgroundColor: `rgba(251, 191, 36, ${p.opacity})`,
                    boxShadow: `0 0 ${p.size * 3}px rgba(251,191,36,${p.opacity * 0.5})`,
                }}
                animate={{
                    y: [0, -40, 0],
                    opacity: [p.opacity, p.opacity * 1.6, p.opacity],
                }}
                transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeInOut',
                }}
            />
        ))}
    </div>
);

// ═════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════

interface Props {
    arcano: ArcanoAdvanced;
    userData: UserBirthData;
    onGoToDashboard: () => void;
    onGoToDetail?: () => void;
}

export const ArcanoRevealScreen: React.FC<Props> = ({
    arcano,
    userData,
    onGoToDashboard,
    onGoToDetail,
}) => {
    const { isRevealed } = useCardReveal(1500); // Revelar após 1.5s
    const cardInfo = MAJOR_ARCANA[arcano.numero] || MAJOR_ARCANA[0];

    const numerologia = useMemo(() => getNumerologia(arcano.numero), [arcano.numero]);
    const subtitulo = arcano.subtitulo || SUBTITULOS[arcano.numero];
    const afirmacao = arcano.afirmacoes.manha || arcano.mantra;

    // Stagger timing
    const d = (n: number) => n * 0.15;

    return (
        <div
            className="fixed inset-0 z-30 flex flex-col items-center overflow-y-auto"
            style={{
                background: 'linear-gradient(180deg, #0a0514 0%, #1a0b2e 50%, #0f0820 100%)',
            }}
        >
            <FloatingParticles />

            <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto px-4 py-10 pb-24">

                {/* ── Label ── */}
                <motion.p
                    className="text-purple-200/60 text-xs tracking-[0.4em] uppercase mb-3 select-none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: d(0), duration: 0.6 }}
                >
                    Seu Arcano Pessoal
                </motion.p>

                {/* ── Número Romano ── */}
                <motion.h2
                    className="text-3xl font-serif text-amber-200/80 mb-6 select-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: d(1.3), type: 'spring', stiffness: 200, damping: 20 }}
                >
                    {arcano.numeroRomano}
                </motion.h2>

                {/* ── CARTA (Momento WOW) ── */}
                <div className="relative mb-8">
                    <CardFlip3D
                        frontImage={cardInfo.file}
                        backImage={BACK_IMAGE}
                        isRevealed={isRevealed}
                        arcanoNumero={arcano.numero}
                    />

                    {/* Glow pulsante ao redor da carta */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(251,191,36,0)',
                                '0 0 60px rgba(251,191,36,0.5)',
                                '0 0 20px rgba(251,191,36,0)',
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1.6, ease: 'easeInOut' }}
                    />

                    {/* Flutuação contínua */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                {/* ── Nome do Arcano ── */}
                <motion.h1
                    className="text-5xl sm:text-6xl font-serif text-center mb-2 select-none"
                    style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #fbbf24)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 12px rgba(251,191,36,0.3))',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.7, type: 'spring', stiffness: 120 }}
                >
                    {arcano.nome}
                </motion.h1>

                {/* ── Subtítulo ── */}
                <motion.p
                    className="text-slate-400 font-light italic text-lg text-center mb-8 select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    "{subtitulo}"
                </motion.p>

                {/* ── Seção Numerologia ── */}
                {arcano.numero > 9 && (
                    <motion.div
                        className="w-full max-w-sm mx-auto mb-8 rounded-r-xl p-4"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(12px)',
                            borderLeft: '4px solid #f59e0b',
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3, duration: 0.5 }}
                    >
                        <p className="font-serif text-amber-200/90 text-lg tracking-wide mb-1">
                            {numerologia.equacao}
                        </p>
                        <p className="text-amber-400/80 text-sm">
                            {arcano.nome} + {numerologia.nomeReduzido}
                        </p>
                        <p className="text-slate-400/70 text-xs italic mt-1">
                            "O fim contém o princípio fértil"
                        </p>
                    </motion.div>
                )}

                {/* ── Afirmação Poética ── */}
                <motion.blockquote
                    className="max-w-md text-center text-slate-300 italic text-base leading-relaxed mb-10 px-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    "{afirmacao}"
                </motion.blockquote>

                {/* ── Divider ── */}
                <motion.div
                    className="w-32 h-px mx-auto mb-8"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)' }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                />

                {/* ── Botões ── */}
                <motion.div
                    className="w-full max-w-md space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } },
                    }}
                >
                    {/* Botão 1 — Primário (Conheça Mais do Seu Arcano) */}
                    <motion.button
                        onClick={onGoToDetail || onGoToDashboard}
                        className="w-full flex items-center justify-center gap-2.5 py-4 px-8 rounded-full font-semibold text-slate-900 transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)',
                            boxShadow: '0 0 40px -10px rgba(245,158,11,0.5)',
                        }}
                        whileHover={{ scale: 1.03, boxShadow: '0 0 60px -10px rgba(245,158,11,0.7)' }}
                        whileTap={{ scale: 0.98 }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <BookOpen className="w-5 h-5" />
                        Conheça Mais do Seu Arcano
                    </motion.button>

                    {/* Botão 2 — Secundário (Explorar Dashboard) */}
                    <motion.button
                        onClick={onGoToDashboard}
                        className="w-full flex items-center justify-center gap-2.5 py-4 px-8 rounded-full text-white transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(12px)',
                        }}
                        whileHover={{
                            background: 'rgba(255,255,255,0.1)',
                            borderColor: 'rgba(245,158,11,0.3)',
                        }}
                        whileTap={{ scale: 0.98 }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <LayoutGrid className="w-5 h-5" />
                        Explorar Dashboard Completo
                    </motion.button>
                </motion.div>

                {/* ── Revelação do Usuário ── */}
                <motion.p
                    className="mt-10 text-white/20 text-xs tracking-[0.3em] uppercase select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                >
                    Revelação de {userData.nome.split(' ')[0]}
                </motion.p>
            </div>
        </div>
    );
};
