import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Save, Trash2 } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    shadowName: string;
    existingEntry?: string;
    onSave: (text: string) => void;
}

export const ShadowJournalModal: React.FC<Props> = ({
    isOpen,
    onClose,
    shadowName,
    existingEntry = '',
    onSave,
}) => {
    const [text, setText] = useState(existingEntry);

    const handleSave = () => {
        if (text.trim()) {
            onSave(text.trim());
            onClose();
        }
    };

    const handleClear = () => {
        setText('');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />

                {/* Modal */}
                <motion.div
                    className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-rose-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-serif text-white">Jornal da Sombra</h3>
                                <p className="text-xs text-white/40 font-sans">{shadowName}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/60" />
                        </button>
                    </div>

                    {/* Prompt */}
                    <div className="px-6 pt-4">
                        <p className="text-sm text-white/50 font-sans italic">
                            Como este padrão de sombra se manifesta na sua vida? Quando você o percebe com mais força? O que ele está tentando te mostrar?
                        </p>
                    </div>

                    {/* Text Area */}
                    <div className="p-6">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Escreva livremente suas reflexões sobre esta sombra..."
                            className="w-full h-48 bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white/90 font-sans text-sm resize-none focus:outline-none focus:border-rose-500/30 focus:ring-1 focus:ring-rose-500/20 placeholder-white/20 custom-scrollbar"
                            autoFocus
                        />
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-white/30">{text.length} caracteres</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between p-6 border-t border-white/10 bg-slate-900/50">
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/40 hover:text-white/60 hover:bg-white/5 transition-all text-sm"
                        >
                            <Trash2 className="w-4 h-4" />
                            Limpar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!text.trim()}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-sans font-medium text-sm hover:from-rose-500 hover:to-rose-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-600/20"
                        >
                            <Save className="w-4 h-4" />
                            Salvar Reflexão
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
