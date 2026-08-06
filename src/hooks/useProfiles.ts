import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { UserBirthData, SavedProfile } from '../types';

const STORAGE_KEY = 'arcanoterapia_profiles_v1';

interface UseProfilesReturn {
  profiles: SavedProfile[];
  activeProfile: SavedProfile | null;
  loading: boolean;
  error: string | null;
  
  // Ações
  saveProfile: (data: UserBirthData, name: string) => SavedProfile;
  loadProfile: (id: string) => SavedProfile | null;
  deleteProfile: (id: string) => boolean;
  setActiveProfile: (profile: SavedProfile | null) => void;
  updateActiveProfile: (data: Partial<UserBirthData>) => void;
  
  // Utilitários
  hasProfiles: boolean;
  maxProfilesReached: boolean;
}

const MAX_PROFILES = 10;

/**
 * Hook para gerenciar perfis salvos no localStorage
 * Persistência automática com sincronização entre abas
 */
export function useProfiles(initialData?: UserBirthData): UseProfilesReturn {
  const [profiles, setProfiles] = useState<SavedProfile[]>([]);
  const [activeProfile, setActiveProfileState] = useState<SavedProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar do localStorage na montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedProfile[];
        setProfiles(parsed);
        
        // Definir primeiro perfil como ativo se houver apenas um
        if (parsed.length === 1 && !activeProfile) {
          setActiveProfileState(parsed[0]);
        }
      }
      
      // Se temos dados iniciais e não há perfis, criar um padrão
      if (initialData && !stored) {
        const defaultProfile = createProfile(initialData, 'Meu Perfil');
        setProfiles([defaultProfile]);
        setActiveProfileState(defaultProfile);
        saveToStorage([defaultProfile]);
      }
    } catch (err) {
      setError('Erro ao carregar perfis');
      console.error('[useProfiles] Erro:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar no localStorage quando profiles mudar
  useEffect(() => {
    if (!loading) {
      saveToStorage(profiles);
    }
  }, [profiles, loading]);

  // Listener para mudanças em outras abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const parsed = JSON.parse(e.newValue);
        setProfiles(parsed);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveToStorage = (data: SavedProfile[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      setError('Erro ao salvar perfis (storage cheio?)');
    }
  };

  const createProfile = (data: UserBirthData, name: string): SavedProfile => {
    const now = new Date().toISOString();
    return {
      ...data,
      id: uuidv4(),
      profileName: name.trim() || 'Perfil sem nome',
      createdAt: now,
      updatedAt: now
    };
  };

  const saveProfile = useCallback((data: UserBirthData, name: string): SavedProfile => {
    if (profiles.length >= MAX_PROFILES) {
      throw new Error(`Limite de ${MAX_PROFILES} perfis atingido`);
    }

    const newProfile = createProfile(data, name);
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    setActiveProfileState(newProfile);
    
    return newProfile;
  }, [profiles]);

  const loadProfile = useCallback((id: string): SavedProfile | null => {
    const found = profiles.find(p => p.id === id);
    if (found) {
      setActiveProfileState(found);
    }
    return found || null;
  }, [profiles]);

  const deleteProfile = useCallback((id: string): boolean => {
    const updated = profiles.filter(p => p.id !== id);
    setProfiles(updated);
    
    // Se deletou o ativo, limpar ativo
    if (activeProfile?.id === id) {
      setActiveProfileState(updated[0] || null);
    }
    
    return true;
  }, [profiles, activeProfile]);

  const setActiveProfile = useCallback((profile: SavedProfile | null) => {
    setActiveProfileState(profile);
  }, []);

  const updateActiveProfile = useCallback((data: Partial<UserBirthData>) => {
    if (!activeProfile) return;
    
    const updated = {
      ...activeProfile,
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    setActiveProfileState(updated);
    setProfiles(prev => prev.map(p => 
      p.id === updated.id ? updated : p
    ));
  }, [activeProfile]);

  return {
    profiles,
    activeProfile,
    loading,
    error,
    saveProfile,
    loadProfile,
    deleteProfile,
    setActiveProfile,
    updateActiveProfile,
    hasProfiles: profiles.length > 0,
    maxProfilesReached: profiles.length >= MAX_PROFILES
  };
}