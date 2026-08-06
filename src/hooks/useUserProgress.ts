import { useState, useEffect, useCallback } from 'react';
import { UserProgress, CheckinDiario, LifeAreaRating, JournalEntry, AreaDaVida, Trimestre, MicroAcao, SubMeta } from '../types';

const STORAGE_KEY = 'arcanoterapia_user_progress';

const AREAS: AreaDaVida[] = ['AMOR', 'DINHEIRO', 'SAUDE', 'CARREIRA', 'FAMILIA', 'PROPOSITO'];

function getCurrentYearAndQuarter(): { ano: number; trimestre: Trimestre } {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const ano = now.getFullYear();
    let trimestre: Trimestre = 'Q1';

    if (month >= 9) trimestre = 'Q4';
    else if (month >= 6) trimestre = 'Q3';
    else if (month >= 3) trimestre = 'Q2';

    return { ano, trimestre };
}

function createDefaultProgress(arcanoId: number): UserProgress {
    const { ano, trimestre } = getCurrentYearAndQuarter();
    const now = new Date().toISOString();

    const initialAreas: LifeAreaRating[] = AREAS.map(area => ({
        area,
        nota: 5,
        ano,
        trimestre,
        dataRegistro: now
    }));

    return {
        arcanoAtualId: arcanoId,
        percentualIntegracao: 0,
        sombrasIntegradas: [],
        diretrizesCompletadas: [],
        checkinsDiarios: [],
        streakAtual: 0,
        maiorStreak: 0,
        areasVida: initialAreas,
        journalEntries: [],
        ultimoAcesso: now,
    };
}

function loadProgress(arcanoId: number): UserProgress {
    try {
        const raw = localStorage.getItem(`${STORAGE_KEY}_${arcanoId}`);
        if (raw) {
            const parsed = JSON.parse(raw) as UserProgress;
            const { ano, trimestre } = getCurrentYearAndQuarter();

            // Migration: if areasVida doesn't have quarterly structure, migrate it
            const migratedAreas = parsed.areasVida.map((a: any) => {
                if ('ano' in a) return a;
                return {
                    ...a,
                    ano,
                    trimestre,
                    dataRegistro: new Date().toISOString()
                } as LifeAreaRating;
            });

            return {
                ...createDefaultProgress(arcanoId),
                ...parsed,
                areasVida: migratedAreas,
                arcanoAtualId: arcanoId
            };
        }
    } catch (e) {
        console.warn('Failed to load progress:', e);
    }
    return createDefaultProgress(arcanoId);
}

function saveProgress(arcanoId: number, progress: UserProgress) {
    try {
        localStorage.setItem(`${STORAGE_KEY}_${arcanoId}`, JSON.stringify({
            ...progress,
            ultimoAcesso: new Date().toISOString(),
        }));
    } catch (e) {
        console.warn('Failed to save progress:', e);
    }
}

function calculateStreak(checkins: CheckinDiario[]): { current: number; max: number } {
    if (checkins.length === 0) return { current: 0, max: 0 };

    const uniqueDates = [...new Set(checkins.map(c => c.data))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];

    let current = 0;
    let checkDate = today;

    for (const date of uniqueDates) {
        if (date === checkDate) {
            current++;
            const d = new Date(checkDate);
            d.setDate(d.getDate() - 1);
            checkDate = d.toISOString().split('T')[0];
        } else if (date < checkDate) {
            break;
        }
    }

    let max = 0;
    let tempStreak = 1;
    const sortedDates = [...new Set(checkins.map(c => c.data))].sort();

    for (let i = 1; i < sortedDates.length; i++) {
        const prev = new Date(sortedDates[i - 1]);
        const curr = new Date(sortedDates[i]);
        const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
            tempStreak++;
        } else {
            max = Math.max(max, tempStreak);
            tempStreak = 1;
        }
    }
    max = Math.max(max, tempStreak, current);

    return { current, max };
}

export function useUserProgress(arcanoId: number) {
    const [progress, setProgress] = useState<UserProgress>(() => loadProgress(arcanoId));

    useEffect(() => {
        setProgress(loadProgress(arcanoId));
    }, [arcanoId]);

    useEffect(() => {
        saveProgress(arcanoId, progress);
    }, [arcanoId, progress]);

    const toggleShadowIntegration = useCallback((shadowId: string) => {
        setProgress(prev => {
            const isIntegrated = prev.sombrasIntegradas.includes(shadowId);
            const newSombras = isIntegrated
                ? prev.sombrasIntegradas.filter(id => id !== shadowId)
                : [...prev.sombrasIntegradas, shadowId];

            return { ...prev, sombrasIntegradas: newSombras };
        });
    }, []);

    const checkinGuideline = useCallback((diretrizId: string) => {
        const today = new Date().toISOString().split('T')[0];
        setProgress(prev => {
            const alreadyChecked = prev.checkinsDiarios.some(
                c => c.diretrizId === diretrizId && c.data === today
            );
            if (alreadyChecked) return prev;

            const newCheckins: CheckinDiario[] = [...prev.checkinsDiarios, { data: today, diretrizId }];
            const { current, max } = calculateStreak(newCheckins);

            const newCompleted = prev.diretrizesCompletadas.includes(diretrizId)
                ? prev.diretrizesCompletadas
                : [...prev.diretrizesCompletadas, diretrizId];

            return {
                ...prev,
                checkinsDiarios: newCheckins,
                diretrizesCompletadas: newCompleted,
                streakAtual: current,
                maiorStreak: Math.max(max, prev.maiorStreak),
            };
        });
    }, []);

    const updateLifeArea = useCallback((area: AreaDaVida, nota: number, meta?: string, specificPeriod?: { ano: number, trimestre: Trimestre }) => {
        const { ano, trimestre } = specificPeriod || getCurrentYearAndQuarter();

        setProgress(prev => {
            const existingIndex = prev.areasVida.findIndex(a =>
                a.area === area && a.ano === ano && a.trimestre === trimestre
            );

            let newAreas = [...prev.areasVida];
            if (existingIndex >= 0) {
                newAreas[existingIndex] = {
                    ...newAreas[existingIndex],
                    nota,
                    meta: meta !== undefined ? meta : newAreas[existingIndex].meta,
                    dataRegistro: new Date().toISOString()
                };
            } else {
                newAreas.push({
                    area,
                    nota,
                    meta,
                    ano,
                    trimestre,
                    dataRegistro: new Date().toISOString()
                });
            }

            return { ...prev, areasVida: newAreas };
        });
    }, []);

    const getLifeAreaRating = useCallback((area: AreaDaVida, ano: number, trimestre: Trimestre) => {
        return progress.areasVida.find(a =>
            a.area === area && a.ano === ano && a.trimestre === trimestre
        );
    }, [progress.areasVida]);

    const addJournalEntry = useCallback((texto: string, template?: string) => {
        setProgress(prev => {
            const entry: JournalEntry = {
                id: `journal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                arcanoId,
                data: new Date().toISOString(),
                texto,
                template,
            };
            return {
                ...prev,
                journalEntries: [entry, ...prev.journalEntries],
            };
        });
    }, [arcanoId]);

    const deleteJournalEntry = useCallback((entryId: string) => {
        setProgress(prev => ({
            ...prev,
            journalEntries: prev.journalEntries.filter(e => e.id !== entryId),
        }));
    }, []);

    const updateLifeAreaGoal = useCallback((area: AreaDaVida, options: {
        metaGoal?: string;
        notaAlvo?: number;
        microAcoes?: MicroAcao[];
        subMetas?: SubMeta[];
    }, specificPeriod?: { ano: number, trimestre: Trimestre }) => {
        const { ano, trimestre } = specificPeriod || getCurrentYearAndQuarter();

        setProgress(prev => {
            const existingIndex = prev.areasVida.findIndex(a =>
                a.area === area && a.ano === ano && a.trimestre === trimestre
            );

            let newAreas = [...prev.areasVida];
            if (existingIndex >= 0) {
                newAreas[existingIndex] = {
                    ...newAreas[existingIndex],
                    ...options,
                };
            } else {
                newAreas.push({
                    area,
                    nota: 5,
                    ano,
                    trimestre,
                    dataRegistro: new Date().toISOString(),
                    ...options,
                });
            }

            return { ...prev, areasVida: newAreas };
        });
    }, []);

    const toggleSubMeta = useCallback((area: AreaDaVida, subMetaId: string, specificPeriod?: { ano: number, trimestre: Trimestre }) => {
        const { ano, trimestre } = specificPeriod || getCurrentYearAndQuarter();

        setProgress(prev => {
            const existingIndex = prev.areasVida.findIndex(a =>
                a.area === area && a.ano === ano && a.trimestre === trimestre
            );

            if (existingIndex < 0) return prev;
            const newAreas = [...prev.areasVida];
            const entry = { ...newAreas[existingIndex] };
            entry.subMetas = (entry.subMetas || []).map(sm =>
                sm.id === subMetaId ? { ...sm, done: !sm.done } : sm
            );
            newAreas[existingIndex] = entry;
            return { ...prev, areasVida: newAreas };
        });
    }, []);

    const toggleMicroAcao = useCallback((area: AreaDaVida, microId: string, specificPeriod?: { ano: number, trimestre: Trimestre }) => {
        const { ano, trimestre } = specificPeriod || getCurrentYearAndQuarter();

        setProgress(prev => {
            const existingIndex = prev.areasVida.findIndex(a =>
                a.area === area && a.ano === ano && a.trimestre === trimestre
            );

            if (existingIndex < 0) return prev;
            const newAreas = [...prev.areasVida];
            const entry = { ...newAreas[existingIndex] };
            entry.microAcoes = (entry.microAcoes || []).map(ma =>
                ma.id === microId ? { ...ma, done: !ma.done } : ma
            );
            newAreas[existingIndex] = entry;
            return { ...prev, areasVida: newAreas };
        });
    }, []);

    const setOnboardingComplete = useCallback((prioridades: AreaDaVida[]) => {
        setProgress(prev => ({
            ...prev,
            onboardingRodaComplete: true,
            onboardingPrioridades: prioridades,
        }));
    }, []);

    const today = new Date().toISOString().split('T')[0];
    const hasCheckedInToday = progress.checkinsDiarios.some(c => c.data === today);

    const getGuidelineCheckinCount = useCallback((diretrizId: string) => {
        return progress.checkinsDiarios.filter(c => c.diretrizId === diretrizId).length;
    }, [progress.checkinsDiarios]);

    const isGuidelineCheckedToday = useCallback((diretrizId: string) => {
        return progress.checkinsDiarios.some(
            c => c.diretrizId === diretrizId && c.data === today
        );
    }, [progress.checkinsDiarios, today]);

    return {
        progress,
        toggleShadowIntegration,
        checkinGuideline,
        updateLifeArea,
        updateLifeAreaGoal,
        toggleSubMeta,
        toggleMicroAcao,
        setOnboardingComplete,
        getLifeAreaRating,
        addJournalEntry,
        deleteJournalEntry,
        hasCheckedInToday,
        getGuidelineCheckinCount,
        isGuidelineCheckedToday,
        getCurrentYearAndQuarter
    };
}

