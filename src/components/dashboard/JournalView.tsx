import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Plus, Trash2, Clock, ChevronDown } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';
import { useUserProgress } from '../../hooks/useUserProgress';

const JOURNAL_TEMPLATES: Record<number, string[]> = {
    1: ['Hoje eu me comuniquei de forma autêntica quando...', 'Uma ideia que quero transformar em realidade é...', 'Notei minha dispersão quando...'],
    2: ['Minha intuição me disse hoje que...', 'Um momento em que agi em vez de esperar foi...', 'Senti dependência emocional quando...'],
    3: ['Criei algo bonito hoje quando...', 'Pratiquei o desapego quando...', 'Senti ciúmes ou posse quando...'],
    4: ['Liderei com compaixão quando...', 'Permiti-me ser vulnerável quando...', 'Fui rígido demais quando...'],
    5: ['Aprendi algo novo com alguém inesperado hoje:', 'Pratiquei coerência entre discurso e ação quando...', 'Fui dogmático quando...'],
    22: ['Uma aventura inesperada de hoje foi...', 'Cumpri uma promessa quando...', 'Fugi de uma responsabilidade quando...'],
};

const DEFAULT_TEMPLATES = [
    'O que senti de mais forte hoje foi...',
    'Uma sombra que reconheci em mim hoje...',
    'Sou grato(a) por...',
];

interface Props {
    arcano: ArcanoAdvanced;
    onClose: () => void;
    embedded?: boolean;
}

export const JournalView: React.FC<Props> = ({ arcano, onClose, embedded }) => {
    const { progress, addJournalEntry, deleteJournalEntry } = useUserProgress(arcano.numero);
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [entryText, setEntryText] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [showTemplates, setShowTemplates] = useState(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const templates = JOURNAL_TEMPLATES[arcano.numero] || DEFAULT_TEMPLATES;

    useEffect(() => {
        if (showNewEntry && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [showNewEntry]);

    const handleSave = () => {
        if (entryText.trim()) {
            addJournalEntry(entryText.trim(), selectedTemplate || undefined);
            setEntryText('');
            setSelectedTemplate(null);
            setShowNewEntry(false);
        }
    };

    const useTemplate = (template: string) => {
        setSelectedTemplate(template);
        setEntryText(template + '\n\n');
        setShowTemplates(false);
        if (textareaRef.current) textareaRef.current.focus();
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={embedded ? '' : 'min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}>
            {/* Header */}
            {!embedded && (
                <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h1 className="text-lg font-serif text-white">Jornal Terapêutico</h1>
                                <p className="text-xs text-white/40 font-sans">{arcano.numeroRomano} — {arcano.nome}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setShowNewEntry(true); setShowTemplates(true); }}
                            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-sans hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-600/20"
                        >
                            <Plus className="w-4 h-4" />
                            Nova Entrada
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* New Entry Form */}
                <AnimatePresence>
                    {showNewEntry && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <div className="bg-slate-900/60 rounded-2xl border border-white/10 p-6">
                                {/* Templates */}
                                {showTemplates && (
                                    <div className="mb-4">
                                        <button
                                            onClick={() => setShowTemplates(!showTemplates)}
                                            className="flex items-center gap-2 text-xs text-white/40 font-sans mb-2"
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                            Templates para {arcano.nome}
                                        </button>
                                        <div className="flex flex-wrap gap-2">
                                            {templates.map((t, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => useTemplate(t)}
                                                    className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-300/60 border border-violet-500/10 hover:bg-violet-500/20 hover:text-violet-300/80 transition-all font-sans"
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Text Area */}
                                <textarea
                                    ref={textareaRef}
                                    value={entryText}
                                    onChange={(e) => setEntryText(e.target.value)}
                                    placeholder="Escreva livremente suas reflexões..."
                                    className="w-full h-40 bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white/90 font-sans text-sm resize-none focus:outline-none focus:border-violet-500/30 focus:ring-1 focus:ring-violet-500/20 placeholder-white/20 custom-scrollbar"
                                />

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={() => { setShowNewEntry(false); setEntryText(''); setSelectedTemplate(null); }}
                                        className="text-sm text-white/30 hover:text-white/50 transition-colors font-sans"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={!entryText.trim()}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-sans font-medium text-sm hover:from-violet-500 hover:to-violet-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20"
                                    >
                                        Salvar Entrada
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Entries List */}
                {progress.journalEntries.length > 0 ? (
                    <div className="space-y-4">
                        {progress.journalEntries.map((entry, idx) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-slate-900/60 rounded-2xl border border-white/10 p-6 group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-xs text-white/30 font-sans">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(entry.data)}
                                    </div>
                                    <button
                                        onClick={() => deleteJournalEntry(entry.id)}
                                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                {entry.template && (
                                    <p className="text-xs text-violet-400/40 font-sans italic mb-2">
                                        {entry.template}
                                    </p>
                                )}
                                <p className="text-sm text-white/60 font-sans leading-relaxed whitespace-pre-wrap">
                                    {entry.texto}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    !showNewEntry && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/30 font-sans text-sm mb-2">Nenhuma entrada ainda</p>
                            <p className="text-white/15 font-sans text-xs max-w-xs mx-auto">
                                Clique em "Nova Entrada" para começar seu jornal terapêutico vinculado ao seu arcano
                            </p>
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
};
