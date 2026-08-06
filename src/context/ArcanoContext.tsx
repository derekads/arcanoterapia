import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { UserData, ArcanoData, MapaAstralCalculado } from '../types';
import { ArcanoPessoalDB } from '../data/arcanos';
import { calcularArcanoNome, calcularAnoPessoal2026, calculateAstralProfilePro } from '../utils/calculos';

/**
 * ARCANO CONTEXT
 * O Coração de Dados do App
 */

interface ArcanoContextType {
    userData: UserData | null;
    arcanoPessoal: ArcanoData | null;
    arcano2026: any | null;
    arcanoDia: ArcanoData | null;
    mapaAstral: any | null;
    insightsCombinados: {
        dia: any;
        lua: any;
        signo: any;
        transicao: any;
        faseLua: string;
    } | null;
    updateUserData: (data: Partial<UserData>) => void;
    isLoading: boolean;
    exportData: () => void;
}

// Importação das Matrizes
import matrixArcanoDay from '../data/matrices/matrix_arcano_day.json';
import matrixArcanoMoon from '../data/matrices/matrix_arcano_moon.json';
import matrixArcanoSign from '../data/matrices/matrix_arcano_sign.json';
import matrixYearTransition from '../data/matrices/matrix_year_transition.json';
import { calculateMoonPhase, reduzirParaArcano } from '../utils/calculos';

const ArcanoContext = createContext<ArcanoContextType | undefined>(undefined);

export const ArcanoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(() => {
        const saved = localStorage.getItem('arcanoterapia_user_data');
        return saved ? JSON.parse(saved) : null;
    });

    const [isLoading, setIsLoading] = useState(true);

    // Persistência Automática
    useEffect(() => {
        if (userData) {
            localStorage.setItem('arcanoterapia_user_data', JSON.stringify(userData));
        }
    }, [userData]);

    // Cálculos Derivados (Memoizados para Performance)
    const processedData = useMemo(() => {
        const u = userData as any;
        const name = u?.nome || u?.name;
        if (!userData || !name) return null;

        const numPessoal = calcularArcanoNome(name);
        const arcanoP = ArcanoPessoalDB.getByNumero(numPessoal) || null;

        // Ano Pessoal 2026 e 2027
        const birthDate = u?.dataNascimento || u?.birthDate || "1990-01-01";
        const [anoB, mesB, diaB] = birthDate.split('-').map(Number);
        const num2026 = calcularAnoPessoal2026(diaB, mesB);
        const previsao = ArcanoPessoalDB.getPrevisao2026(num2026);

        const num2027 = reduzirParaArcano(diaB + mesB + 2027);

        // Arcano do Dia (Cálculo Dinâmico)
        const hoje = new Date();
        const numDia = (hoje.getDate() + (hoje.getMonth() + 1)) % 22;
        const arcanoD = ArcanoPessoalDB.getByNumero(numDia === 0 ? 22 : numDia) || null;

        // Perfil Astral Pro
        const lat = u?.localizacao?.latitude || u?.latitude;
        const lng = u?.localizacao?.longitude || u?.longitude;
        const tz = u?.localizacao?.timezoneOffset?.toString() || u?.timezone;
        const bTime = u?.horaNascimento || u?.birthTime;

        const mapa = lat && lng ? calculateAstralProfilePro(
            birthDate,
            bTime,
            lat,
            lng,
            tz ? parseInt(tz) : undefined
        ) : null;

        // Matrizes Combinatórias (Missão 4)
        const faseLua = calculateMoonPhase(hoje);
        const keyDia = `${arcanoP?.numero || 0}-${arcanoD?.numero || 0}`;
        const keyLua = `${arcanoP?.numero || 0}-${faseLua}`;
        const keySigno = `${arcanoP?.numero || 0}-${mapa?.sunSign || 'Áries'}`;
        const keyTransicao = `${num2026}-${num2027}`;

        const insights = {
            dia: (matrixArcanoDay as any)[keyDia] || null,
            lua: (matrixArcanoMoon as any)[keyLua] || null,
            signo: (matrixArcanoSign as any)[keySigno] || null,
            transicao: (matrixYearTransition as any)[keyTransicao] || null,
            faseLua
        };

        return {
            arcanoPessoal: arcanoP,
            arcano2026: previsao,
            arcanoDia: arcanoD,
            mapaAstral: mapa,
            insightsCombinados: insights
        };
    }, [userData]);

    const updateUserData = (newData: Partial<UserData>) => {
        setUserData(prev => prev ? { ...prev, ...newData } : (newData as UserData));
    };

    const exportData = () => {
        if (!userData) return;
        const dataStr = JSON.stringify({ userData, processedData }, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fallbackName = userData.nome || (userData as any).name || 'Visitante';
        link.download = `arcanoterapia_perfil_${fallbackName.toLowerCase().replace(/\s/g, '_')}.json`;
        link.click();
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <ArcanoContext.Provider value={{
            userData,
            arcanoPessoal: processedData?.arcanoPessoal || null,
            arcano2026: processedData?.arcano2026 || null,
            arcanoDia: processedData?.arcanoDia || null,
            mapaAstral: processedData?.mapaAstral || null,
            insightsCombinados: processedData?.insightsCombinados || null,
            updateUserData,
            isLoading,
            exportData
        }}>
            {children}
        </ArcanoContext.Provider>
    );
};

export const useArcano = () => {
    const context = useContext(ArcanoContext);
    if (context === undefined) {
        throw new Error('useArcano deve ser usado dentro de um ArcanoProvider');
    }
    return context;
};
