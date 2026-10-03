
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Moon, Sun, Heart, Briefcase, Activity, Lock } from 'lucide-react';
import { PrevisaoAno } from '../utils/arcanoDataExtended';
import { CardFlip3D } from './CardFlip3D';
import { MAJOR_ARCANA, BACK_IMAGE } from '../lib/cardImages';
import { lerAnoPessoal } from '../data/anoPessoalInterpretacao';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    previsao?: PrevisaoAno;
    arcanoNome?: string;
    transitionInsight?: any;
    /**
     * O arcano PESSOAL de quem está lendo. Sem ele a previsão do ano é a mesma
     * para todo mundo — era exatamente o que acontecia antes.
     */
    arcanoPessoalNumero?: number;
    arcanoPessoalNome?: string;
}

export function Previsao2026Modal({
    isOpen, onClose, previsao, arcanoNome, transitionInsight,
    arcanoPessoalNumero, arcanoPessoalNome,
}: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    /**
     * O encontro entre quem a pessoa é e o ano que ela atravessa. É a leitura
     * que faltava: antes o modal mostrava a carta do ano isolada, idêntica
     * para O Eremita e para O Sol.
     */
    const leitura = useMemo(
        () => (previsao && arcanoPessoalNumero && arcanoPessoalNome
            ? lerAnoPessoal(arcanoPessoalNumero, previsao.id, arcanoPessoalNome, previsao.nome)
            : null),
        [previsao, arcanoPessoalNumero, arcanoPessoalNome]
    );

    // Reset flip state when modal opens/closes
    useEffect(() => {
        if (!isOpen) setIsFlipped(false);
    }, [isOpen]);

    if (!isOpen || !previsao) return null;



    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl border border-purple-500/20 shadow-2xl custom-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row h-full">

                        {/* Left Column: The Card (Flip Interaction) */}
                        <div className="w-full md:w-1/3 bg-slate-950/50 p-8 flex flex-col items-center justify-center border-r border-white/5 min-h-[500px]">
                            <div className="flex items-center justify-center cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                                <CardFlip3D
                                    frontImage={MAJOR_ARCANA[previsao.id]?.file || MAJOR_ARCANA[0].file}
                                    backImage={BACK_IMAGE}
                                    isRevealed={isFlipped}
                                    arcanoNumero={previsao.id}
                                />
                            </div>

                            <div className="mt-6 text-center">
                                {!isFlipped ? (
                                    <button
                                        onClick={() => setIsFlipped(true)}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-sm font-medium transition-colors shadow-lg shadow-purple-900/40"
                                    >
                                        Revelar Arcano
                                    </button>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col text-center">
                                        <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Energia do Ano</p>
                                        <p className="text-white/80 italic text-sm">"{previsao.fraseGuia || 'O destino se revela.'}"</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                            {!isFlipped ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                                    <Lock className="w-16 h-16 text-white/20 mb-4" />
                                    <p className="text-lg text-white/40">Revele a carta para ler sua previsão de 2026.</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="space-y-8"
                                >
                                    <header>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                <Sun className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <h2 className="text-2xl font-serif text-amber-100">Visão Geral</h2>
                                        </div>
                                        <p className="text-white/80 leading-relaxed text-lg border-l-2 border-amber-500/30 pl-4">
                                            {previsao.tema}
                                        </p>
                                    </header>

                                    {leitura && (
                                        <section className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.24em] text-amber-400/70">
                                                        Este ano, para você
                                                    </p>
                                                    <h3 className="text-lg font-serif text-amber-100 leading-snug">
                                                        {leitura.titulo}
                                                    </h3>
                                                </div>
                                            </div>

                                            <p className="text-[15px] leading-relaxed text-white/80 m-0">
                                                {leitura.encontro}
                                            </p>

                                            <div className="pt-4 border-t border-amber-500/10">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 mb-1.5">
                                                    Onde costuma travar
                                                </p>
                                                <p className="text-[15px] leading-relaxed text-white/70 m-0">
                                                    {leitura.atrito}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-amber-500/10">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 mb-1.5">
                                                    O que fazer com isso
                                                </p>
                                                <p className="text-[15px] leading-relaxed text-white/70 m-0">
                                                    {leitura.caminho}
                                                </p>
                                            </div>
                                        </section>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-pink-950/20 border border-pink-500/10 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-3 text-pink-300">
                                                <Heart size={18} />
                                                <h3 className="font-bold text-xs uppercase tracking-widest">Amor</h3>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">{previsao.amor}</p>
                                        </div>

                                        <div className="bg-blue-950/20 border border-blue-500/10 rounded-xl p-6">
                                            <div className="flex items-center gap-2 mb-3 text-blue-300">
                                                <Briefcase size={18} />
                                                <h3 className="font-bold text-xs uppercase tracking-widest">Carreira</h3>
                                            </div>
                                            <p className="text-white/70 text-sm leading-relaxed">{previsao.carreira}</p>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-3 text-emerald-300">
                                            <Activity size={18} />
                                            <h3 className="font-bold text-xs uppercase tracking-widest">Saúde & Bem-estar</h3>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">{previsao.saude}</p>
                                    </div>

                                    <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-6 mt-6">
                                        <h3 className="text-purple-300 font-bold text-sm uppercase tracking-widest mb-3">⚠️ Conselho Final</h3>
                                        <p className="text-white/90 italic font-serif text-lg leading-relaxed">
                                            "{previsao.conselho}"
                                        </p>
                                    </div>

                                    {transitionInsight && (
                                        <div className="bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/20 rounded-xl p-6 mt-6">
                                            <div className="flex items-center gap-2 mb-3 text-amber-400">
                                                <Sparkles size={18} />
                                                <h3 className="font-bold text-xs uppercase tracking-widest">Ponte para 2027: {transitionInsight.titulo}</h3>
                                            </div>
                                            <p className="text-amber-100/80 text-sm leading-relaxed italic mb-4">
                                                {transitionInsight.conselho}
                                            </p>
                                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                                <span className="block text-[10px] uppercase text-white/40 font-bold mb-1">Desafio de Passagem</span>
                                                <p className="text-xs text-white/60">{transitionInsight.desafio}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
