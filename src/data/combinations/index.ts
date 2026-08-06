export * from './sunAries';
export * from './sunTaurus';
export * from './sunGeminiCancer';
export * from './sunLeoVirgo';
export * from './sunLibraScorpio';
export * from './sunSagittariusCapricorn';
export * from './sunAquariusPisces';

// Type definitions that might be helpful
export interface DecanModifier {
    ruler: string;
    effect: string;
    shadow: string;
}

export interface AdvancedAstrologyCombination {
    triad: {
        keyBehavior: string;
        lifeStructure: string;
        greatConflict: string;
        uniqueTalent: string;
    };
    decanModifiers: {
        decan1: DecanModifier;
        decan2: DecanModifier;
        decan3: DecanModifier;
    };
    archetypeName: string;
    netflixCategory: string;
    elementalFuel: string;
    shadowWork: string;
    powerMantra: string;
}


import { solAriesCombinations } from './sunAries';
import { solTouroCombinations } from './sunTaurus';
import { solGemeosCombinations, solCancerCombinations } from './sunGeminiCancer';
import { solLeaoCombinations, solVirgemCombinations } from './sunLeoVirgo';
import { solLibraCombinations, solEscorpiaoCombinations } from './sunLibraScorpio';
import { solSagitarioCombinations, solCapricornioCombinations } from './sunSagittariusCapricorn';
import { solAquarioCombinations, solPeixesCombinations } from './sunAquariusPisces';

const allCombinations: Record<string, Record<string, AdvancedAstrologyCombination>> = {
    aries: solAriesCombinations as any,
    taurus: solTouroCombinations as any,
    gemini: solGemeosCombinations as any,
    cancer: solCancerCombinations as any,
    leo: solLeaoCombinations as any,
    virgo: solVirgemCombinations as any,
    libra: solLibraCombinations as any,
    scorpio: solEscorpiaoCombinations as any,
    sagittarius: solSagitarioCombinations as any,
    capricorn: solCapricornioCombinations as any,
    aquarius: solAquarioCombinations as any,
    pisces: solPeixesCombinations as any
};

export const getCombination = (
    planet: string,
    sign: string,
    house: number
): AdvancedAstrologyCombination | null => {
    // Atualmente apenas os dados do Sol estão mapeados neste formato avançado
    if (planet.toLowerCase() !== 'sun' && planet.toLowerCase() !== 'sol') return null;

    const signMap: Record<string, string> = {
        'aries': 'Aries',
        'taurus': 'Touro',
        'gemini': 'Gemeos',
        'cancer': 'Cancer',
        'leo': 'Leao',
        'virgo': 'Virgem',
        'libra': 'Libra',
        'scorpio': 'Escorpiao',
        'sagittarius': 'Sagitario',
        'capricorn': 'Capricornio',
        'aquarius': 'Aquario',
        'pisces': 'Peixes'
    };

    const signKey = signMap[sign.toLowerCase()];
    if (!signKey) return null;

    const signData = allCombinations[sign.toLowerCase()];
    if (!signData) return null;

    const combinationKey = `sol${signKey}Casa${house}`;
    return signData[combinationKey] || null;
};
