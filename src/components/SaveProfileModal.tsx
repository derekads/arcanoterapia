import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User, MapPin, Calendar } from 'lucide-react';

// ═══ Formatar data BR ═══
const formatarDataBR = (dataISO: string): string => {
  if (!dataISO) return '';
  const parts = dataISO.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dataISO;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nome: string;
  dataNascimento: string;
  cidade: string;
  existingCount: number;
}

export const SaveProfileModal: React.FC<Props> = ({
  isOpen, onClose, onConfirm, nome, dataNascimento, cidade, existingCount
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>

            <h2 className="text-xl font-serif text-white mb-2">Salvar Mapa Astral</h2>
            <p className="text-white/40 text-sm mb-6">
              Confirme os dados do mapa a ser salvo ({existingCount}/10)
            </p>

            {/* Dados do mapa (read-only) */}
            <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-white font-medium">{nome}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                <span className="text-white/70 text-sm">{formatarDataBR(dataNascimento)}</span>
              </div>
              {cidade && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{cidade}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl text-slate-900 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};