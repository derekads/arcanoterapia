
import { ArcanoAdvanced, MapaAstralCalculado, PosicaoCelestial, SignoZodiacal, AstroName } from '../types';

export interface ArcanoAlignment {
    isSunAlignment: boolean;
    isMoonAlignment: boolean;
    isAscendantAlignment: boolean;
    isPlanetaryRulerAlignment: boolean;
    alignmentScore: number; // 0-100
    insights: string[];
    housePosition?: number;
}

/**
 * Calculates the cosmic alignment between an Arcano and the user's birth chart.
 */
export function calculateArcanoAlignment(
    arcano: ArcanoAdvanced,
    mapa: MapaAstralCalculado | null
): ArcanoAlignment {
    const result: ArcanoAlignment = {
        isSunAlignment: false,
        isMoonAlignment: false,
        isAscendantAlignment: false,
        isPlanetaryRulerAlignment: false,
        alignmentScore: 0,
        insights: [],
    };

    if (!mapa) return result;

    const arcanoSign = arcano.signo_zodiacal as SignoZodiacal;
    const arcanoPlanet = arcano.planeta_regente as AstroName;

    // 1. Check Zodiac Alignment
    if (arcanoSign) {
        if (mapa.sol.signo === arcanoSign) {
            result.isSunAlignment = true;
            result.alignmentScore += 40;
            result.insights.push(`Este Arcano rege seu Sol em ${arcanoSign}, iluminando sua essência e propósito vital.`);
        }
        if (mapa.lua.signo === arcanoSign) {
            result.isMoonAlignment = true;
            result.alignmentScore += 30;
            result.insights.push(`Este Arcano rege sua Lua em ${arcanoSign}, trazendo clareza para suas necessidades emocionais.`);
        }
        if (mapa.ascendente.signo === arcanoSign) {
            result.isAscendantAlignment = true;
            result.alignmentScore += 30;
            result.insights.push(`Este Arcano rege seu Ascendente em ${arcanoSign}, influenciando como você se projeta no mundo.`);
        }
    }

    // 2. Check Planetary Ruler Alignment
    if (arcanoPlanet) {
        const userPlanet = mapa.astros.find(a => a.nome === arcanoPlanet);
        if (userPlanet) {
            result.isPlanetaryRulerAlignment = true;
            result.alignmentScore += 20;
            result.housePosition = userPlanet.casa;
            result.insights.push(`O regente deste Arcano, ${arcanoPlanet}, está na sua Casa ${userPlanet.casa} em ${userPlanet.signo}.`);

            if (userPlanet.retrogrado) {
                result.insights.push(`${arcanoPlanet} está retrógrado no seu mapa, sugerindo uma revisão interna profunda antes da manifestação externa.`);
            }
        }
    }

    // Cap score at 100
    result.alignmentScore = Math.min(result.alignmentScore, 100);

    // Default insight if no connection found
    if (result.insights.length === 0) {
        result.insights.push("Não há uma conexão direta por signo ou planeta pessoal, mas a energia deste Arcano atua como um mestre externo para seu desenvolvimento atual.");
    }

    return result;
}
