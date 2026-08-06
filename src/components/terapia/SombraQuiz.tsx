import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Flame, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useArcano } from '../../context/ArcanoContext';

/**
 * SOMBRA QUIZ PRO
 * O Espelho da Alma: 5 Perguntas para Identificar a Sombra Ativa
 */

interface Question {
    text: string;
    impact: number; // Peso para severidade
}

const SHADOW_QUESTIONS: Record<number, Question[]> = {
    0: [ // O Louco
        { text: "Sinto uma necessidade impulsiva de largar tudo sem um plano?", impact: 2 },
        { text: "Tenho evitado compromissos sérios por medo de perder a liberdade?", impact: 1 },
        { text: "Minha vida financeira está caótica por gastos emocionais?", impact: 2 },
        { text: "Duvido da minha capacidade de manter a disciplina?", impact: 1 },
        { text: "Estou começando muitos projetos e não terminando nenhum?", impact: 2 }
    ],
    // Mock para outros arcanos (será expandido no JSON)
    1: [ // O Mago
        { text: "Sinto que manipulo conversas para obter o que quero?", impact: 2 },
        { text: "Duvido que tenho as ferramentas necessárias agora?", impact: 1 },
        { text: "Meu conhecimento parece superficial e não prático?", impact: 1 },
        { text: "Tenho medo de assumir a liderança em uma situação?", impact: 2 },
        { text: "Uso meu charme para mascarar inseguranças profundas?", impact: 2 }
    ]
};

export const SombraQuiz: React.FC = () => {
    const { arcanoPessoal } = useArcano();
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    if (!arcanoPessoal) return null;

    const questions = SHADOW_QUESTIONS[arcanoPessoal.numero] || SHADOW_QUESTIONS[0];

    const handleAnswer = (val: boolean) => {
        if (val) setScore(s => s + questions[step].impact);

        if (step < questions.length - 1) {
            setStep(s => s + 1);
        } else {
            setIsFinished(true);
        }
    };

    const getSeverity = () => {
        if (score >= 7) return "CRÍTICA";
        if (score >= 4) return "LATENTE";
        return "SUTIL";
    };

    return (
        <div className="p-8 rounded-[2rem] bg-[#020617]/80 border border-amber-500/20 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />

            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <header className="space-y-2">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-medium">Auto-Sondagem</span>
                            <h3 className="text-2xl font-serif text-amber-50/90 leading-tight">Mergulho nas Sombras do {arcanoPessoal.nome}</h3>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-amber-500/40"
                                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </header>

                        <div className="min-h-[120px] flex items-center">
                            <p className="text-xl text-amber-100/80 font-light italic leading-relaxed">
                                "{questions[step].text}"
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleAnswer(true)}
                                className="flex-1 py-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-2xl text-amber-400 font-bold tracking-widest text-xs uppercase transition-all active:scale-95"
                            >
                                Sim, Reconheço
                            </button>
                            <button
                                onClick={() => handleAnswer(false)}
                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-400 font-bold tracking-widest text-xs uppercase transition-all"
                            >
                                Não no momento
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="text-amber-400" size={32} />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-amber-200/60 text-[10px] uppercase tracking-[0.4em]">Frequência da Sombra</h4>
                            <p className="text-4xl font-serif text-amber-100">{getSeverity()}</p>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                            O reconhecimento é o primeiro passo da alquimia. A sombra do {arcanoPessoal.nome} está tentando te proteger através do controle, mas você pode escolher a integração.
                        </p>

                        <button className="group relative w-full py-4 px-6 rounded-xl overflow-hidden active:scale-95 transition-transform">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-900/20 border border-amber-500/40 backdrop-blur-md rounded-xl" />
                            <span className="relative flex items-center justify-center gap-3 text-amber-100 font-bold tracking-[0.2em] text-xs uppercase">
                                Iniciar Trilha de Transmutação
                                <ChevronRight size={16} className="text-amber-400" />
                            </span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
