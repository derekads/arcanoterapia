import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Trash2, Play, Save, RotateCcw, MapPin, Calendar, Sparkles } from 'lucide-react';
import { SavedProfile } from '../types';

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
  profiles: SavedProfile[];
  activeProfile: SavedProfile | null;
  onLoad: (profile: SavedProfile) => void;
  onDelete: (id: string) => void;
  onSaveNew: () => void;
  onCreateNew: () => void;
}

export const ProfileDrawer: React.FC<Props> = ({
  isOpen, onClose, profiles, activeProfile, onLoad, onDelete, onSaveNew, onCreateNew
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 z-50"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-serif text-white">Meus Mapas</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-240px)]">
              {profiles.length === 0 ? (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Nenhum mapa salvo</p>
                  <p className="text-white/20 text-sm mt-1">Salve seu mapa atual para acessá-lo depois</p>
                </div>
              ) : (
                profiles.map(profile => (
                  <div
                    key={profile.id}
                    className={`p-4 rounded-xl border transition-colors ${activeProfile?.id === profile.id
                        ? 'bg-amber-500/10 border-amber-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* Nome completo como título */}
                        <h3 className="font-medium text-white truncate">{profile.nome}</h3>

                        {/* Data formatada BR + cidade */}
                        <div className="flex items-center gap-2 mt-1 text-white/40 text-sm">
                          <Calendar size={11} />
                          <span>{formatarDataBR(profile.dataNascimento)}</span>
                          {profile.localizacao?.nomeCidade && (
                            <>
                              <span className="text-white/20">•</span>
                              <MapPin size={11} />
                              <span className="truncate">{profile.localizacao.nomeCidade}</span>
                            </>
                          )}
                        </div>

                        {activeProfile?.id === profile.id && (
                          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] uppercase tracking-widest font-bold">
                            <Sparkles size={9} /> Ativo
                          </span>
                        )}
                      </div>

                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <button
                          onClick={() => onLoad(profile)}
                          className="p-2 hover:bg-white/10 rounded-lg text-emerald-400 transition-colors"
                          title="Carregar"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(profile.id)}
                          className="p-2 hover:bg-white/10 rounded-lg text-rose-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer — dois botões distintos */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-slate-900 space-y-3">
              {/* Primário: Salvar Mapa Atual */}
              <button
                onClick={onSaveNew}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 rounded-xl text-slate-900 font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Salvar Meu Mapa
              </button>

              {/* Secundário: Criar Novo Mapa */}
              <button
                onClick={onCreateNew}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/80 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Criar Novo Mapa
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};