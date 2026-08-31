import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarryBackground from './components/StarryBackground';
import LandingScreen from './components/LandingScreen';
import InputScreen from './components/InputScreen';
import LoadingScreen from './components/LoadingScreen';
import { ArcanoRevealScreen } from './components/ArcanoRevealScreen';
import { SanctuaryScreen } from './components/SanctuaryScreen';
import { ProfileDrawer } from './components/ProfileDrawer';
import { SaveProfileModal } from './components/SaveProfileModal';
import { Previsao2026Modal } from './components/Previsao2026Modal';
import { AppStep, UserBirthData, FeatureSelection, SavedProfile } from './types';
import { MobileValidator } from './components/MobileValidator';
import { useProfiles } from './hooks/useProfiles';
import { useArcano } from './context/ArcanoContext';

// Fix for framer-motion type issues
const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const { userData, arcanoPessoal, arcano2026, updateUserData, isLoading: contextLoading } = useArcano();

  const [currentStep, _setCurrentStepRaw] = useState<AppStep | 'booting'>('booting');

  const setCurrentStep = React.useCallback((step: AppStep | 'booting') => {
    if (step !== 'booting' && step !== currentStep) {
      window.history.pushState({ step }, '', `#${step}`);
    }
    _setCurrentStepRaw(step);
  }, [currentStep]);

  // Handle Mobile Browser "Back" Button
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.step) {
        _setCurrentStepRaw(e.state.step);
      } else {
        const hash = window.location.hash.replace('#', '') as AppStep;
        if (['landing', 'input', 'loading', 'result', 'revelation'].includes(hash)) {
          _setCurrentStepRaw(hash);
        } else if (userData?.nome) {
          _setCurrentStepRaw('result');
        } else {
          _setCurrentStepRaw('landing');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);

    // Initial replaceState to anchor the starting step
    if (currentStep !== 'booting' && !window.history.state) {
      window.history.replaceState({ step: currentStep }, '', `#${currentStep}`);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [userData, currentStep]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureSelection>('full');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPrevisaoFromReveal, setShowPrevisaoFromReveal] = useState(false);

  // Centralized Profile Management
  const {
    profiles,
    activeProfile,
    saveProfile,
    deleteProfile,
    setActiveProfile,
    hasProfiles
  } = useProfiles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // ═══ AUTO-RESTORE ON MOUNT ═══
  useEffect(() => {
    if (!contextLoading) {
      if (userData && userData.nome) {
        setCurrentStep('result');
        showToast(`Portal Reconectado ✦ — Bem-vindo, ${userData.nome}`);
      } else {
        setCurrentStep('landing');
      }
    }
  }, [contextLoading]);

  // ═══ Toast helper ═══
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- HANDLERS ---

  const handleStart = () => {
    setCurrentStep('input');
  };

  const handleInputSubmit = (data: UserBirthData) => {
    updateUserData(data);
    setActiveProfile(null);
    setCurrentStep('loading');
  };

  const handleLoadingComplete = () => {
    setSelectedFeature('full');
    setCurrentStep('revelation');
  };

  const handleRevelationToDashboard = () => {
    setCurrentStep('result');
  };

  const handleReset = () => {
    // Limpeza de cache de sessão atual (perfis salvos não são afetados)
    localStorage.removeItem('arcano_user_data');
    localStorage.removeItem('arcano_dados');
    updateUserData({
      nome: '',
      dataNascimento: '',
      horaNascimento: '',
      localizacao: { latitude: 0, longitude: 0, timezoneOffset: 0, nomeCidade: '' }
    });
    setActiveProfile(null);
    setSelectedFeature('full');
    setCurrentStep('landing');
    showToast('Tabula Rasa: Memórias purificadas 🌬️');
  };

  // Profile Management Handlers
  const handleLoadProfile = (profile: SavedProfile) => {
    setActiveProfile(profile);
    updateUserData(profile);
    setDrawerOpen(false);
    setCurrentStep('revelation');
  };

  const handleSaveProfile = () => {
    if (userData && userData.nome) {
      saveProfile(userData as any, userData.nome);
      setSaveModalOpen(false);
      showToast('Destino Selado: Seu mapa foi guardado nos arquivos ✦');
    }
  };

  const handleCreateNewMap = () => {
    setDrawerOpen(false);
    handleReset();
    setCurrentStep('input');
  };

  const handleOpenProfiles = () => {
    setDrawerOpen(true);
  };

  // ═══ Boot screen (flash prevention) ═══
  if (currentStep === 'booting' || contextLoading) {
    return (
      <>
        <StarryBackground />
        <div className="fixed inset-0 z-50 bg-[#030305] flex items-center justify-center">
          <div className="text-amber-500/40 animate-pulse font-serif text-lg tracking-widest">
            ✦
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StarryBackground />

      {/* ═══ TOAST NOTIFICATION ═══ */}
      <AnimatePresence>
        {toastMessage && (
          <MotionDiv
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(245,158,11,0.05)] text-sm text-amber-200/90 font-medium tracking-wide"
          >
            {toastMessage}
          </MotionDiv>
        )}
      </AnimatePresence>

      <main className="relative z-10 font-sans antialiased text-gray-100">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <MotionDiv
              key="landing"
              initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <LandingScreen
                onStart={handleStart}
                onOpenProfiles={handleOpenProfiles}
                hasProfiles={hasProfiles}
              />
            </MotionDiv>
          )}

          {currentStep === 'input' && (
            <MotionDiv
              key="input"
              initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: 'circOut' }}
            >
              <InputScreen onSubmit={handleInputSubmit} />
            </MotionDiv>
          )}

          {currentStep === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
              transition={{ duration: 0.8 }}
            >
              <LoadingScreen onComplete={handleLoadingComplete} />
            </motion.div>
          )}

          {currentStep === 'revelation' && arcanoPessoal && (
            <MotionDiv
              key="revelation"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <ArcanoRevealScreen
                arcano={arcanoPessoal}
                userData={userData as any}
                onGoToDashboard={handleRevelationToDashboard}
              />
            </MotionDiv>
          )}

          {currentStep === 'result' && arcanoPessoal && (
            <MotionDiv
              key="sanctuary"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <SanctuaryScreen
                arcano={arcanoPessoal}
                userData={userData as any}
                selectedFeature={selectedFeature}
                onReset={handleReset}
                onOpenProfiles={handleOpenProfiles}
                onSaveProfile={() => setSaveModalOpen(true)}
                hasProfiles={hasProfiles}
              />
            </MotionDiv>
          )}
          {/*
            Rede de segurança: `revelation` e `result` só renderizam quando
            `arcanoPessoal` existe. Quando ele vem nulo — um nome cuja soma
            não encontra carta, um JSON corrompido no localStorage — nenhum
            dos dois ramos casava e a tela ficava simplesmente em branco,
            sem erro no console e sem saída. Agora o usuário vê o que houve
            e consegue recomeçar.
          */}
          {(currentStep === 'revelation' || currentStep === 'result') && !arcanoPessoal && (
            <MotionDiv
              key="sem-arcano"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-screen p-6 text-center gap-4"
            >
              <h2 className="text-2xl font-serif text-white">
                Não conseguimos revelar seu arcano
              </h2>
              <p className="text-blue-200/60 text-sm max-w-md">
                O nome informado não chegou a uma das 22 lâminas. Tente com o
                nome completo de batismo — é ele que o método usa.
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-6 py-3 rounded-xl border border-mystic-gold/40 text-mystic-gold hover:bg-mystic-gold/10 transition-colors"
              >
                Recomeçar
              </button>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* Global Drawers/Modals */}
        <ProfileDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          profiles={profiles}
          activeProfile={activeProfile}
          onLoad={handleLoadProfile}
          onDelete={deleteProfile}
          onSaveNew={() => {
            if (currentStep === 'result' || currentStep === 'revelation') {
              setSaveModalOpen(true);
            } else {
              showToast('Primeiro, desperte seu Arcano Pessoal');
            }
          }}
          onCreateNew={handleCreateNewMap}
        />

        <SaveProfileModal
          isOpen={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          onConfirm={handleSaveProfile}
          nome={userData?.nome || ''}
          dataNascimento={userData?.dataNascimento || ''}
          cidade={userData?.localizacao?.nomeCidade || ''}
          existingCount={profiles.length}
        />

        {/* Previsão 2026 modal (acessível da tela de revelação) */}
        <Previsao2026Modal
          isOpen={showPrevisaoFromReveal}
          onClose={() => setShowPrevisaoFromReveal(false)}
          previsao={arcano2026}
          arcanoNome={arcano2026?.nome || ''}
          arcanoPessoalNumero={arcanoPessoal?.numero}
          arcanoPessoalNome={arcanoPessoal?.nome}
        />

        <MobileValidator />
      </main>
    </>
  );
};

export default App;
