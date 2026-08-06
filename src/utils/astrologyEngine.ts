
import { MapaAstralCalculado, PosicaoCelestial, Aspecto, AstroName } from '../types';
import {
    PLANETS_IN_HOUSES,
    ASPECTS,
    DIGNITY_TEXTS,
    NODES_INTERPRETATION,
    SENSITIVE_POINTS
} from './astrologyData';
import { PLANETS_IN_SIGNS } from './astrologyDataAdvanced';

// --- HELPER TYPES ---

export interface Dignity {
    planet: AstroName;
    type: 'Domicílio' | 'Exaltação' | 'Queda' | 'Detrimento';
    text: string;
}

export interface NatalReportSection {
    title: string;
    content: string;
    bulletPoints?: string[];
}

export interface NatalReport {
    identity: {
        sun: { sign: string, house: number, text: string };
        rising: { sign: string, text: string };
    };
    emotional: {
        moon: { sign: string, house: number, text: string };
    };
    mental: {
        mercury: { sign: string, house: number, text: string };
    };
    affective: {
        venus: { sign: string, house: number, text: string };
    };
    action: {
        mars: { sign: string, house: number, text: string };
    };
    expansion: {
        jupiter: { sign: string, house: number, text: string };
    };
    structure: {
        saturn: { sign: string, house: number, text: string };
    };
    dignities: Dignity[];
    aspects: { pair: string, type: string, text: string }[];
}

// --- DIGNITY RULES ---

const RULERSHIPS: Record<string, string[]> = {
    "Áries": ["Marte"],
    "Touro": ["Vênus"],
    "Gêmeos": ["Mercúrio"],
    "Câncer": ["Lua"],
    "Leão": ["Sol"],
    "Virgem": ["Mercúrio"],
    "Libra": ["Vênus"],
    "Escorpião": ["Marte", "Plutão"],
    "Sagitário": ["Júpiter"],
    "Capricórnio": ["Saturno"],
    "Aquário": ["Saturno", "Urano"],
    "Peixes": ["Júpiter", "Netuno"]
};

const EXALTATIONS: Record<string, string> = {
    "Áries": "Sol",
    "Touro": "Lua",
    "Virgem": "Mercúrio",
    "Libra": "Saturno",
    "Capricórnio": "Marte",
    "Peixes": "Vênus",
    "Câncer": "Júpiter"
};

const FALLS: Record<string, string> = {
    "Libra": "Sol",
    "Escorpião": "Lua",
    "Peixes": "Mercúrio",
    "Áries": "Saturno",
    "Câncer": "Marte",
    "Virgem": "Vênus",
    "Capricórnio": "Júpiter"
};

const DETRIMENTS: Record<string, string[]> = {
    "Libra": ["Marte"],
    "Escorpião": ["Vênus"],
    "Sagitário": ["Mercúrio"],
    "Capricórnio": ["Lua"],
    "Aquário": ["Sol"],
    "Peixes": ["Mercúrio"],
    "Áries": ["Vênus"],
    "Touro": ["Marte", "Plutão"],
    "Gêmeos": ["Júpiter"],
    "Câncer": ["Saturno"],
    "Leão": ["Saturno", "Urano"],
    "Virgem": ["Júpiter", "Netuno"]
};

// --- CORE FUNCTIONS ---

// Recalculate House using Whole Sign System
export function getWholeSignHouse(planetLon: number, ascLon: number): number {
    const planetSignIndex = Math.floor(planetLon / 30);
    const ascSignIndex = Math.floor(ascLon / 30);
    return ((planetSignIndex - ascSignIndex + 12) % 12) + 1;
}

export function calculateDignities(astros: PosicaoCelestial[]): Dignity[] {
    const dignities: Dignity[] = [];

    astros.forEach(astro => {
        const planetName = astro.nome;
        const signName = astro.signo;

        // Check Domicile
        if (RULERSHIPS[signName]?.includes(planetName)) {
            dignities.push({
                planet: planetName,
                type: 'Domicílio',
                text: DIGNITY_TEXTS['domicílio'].replace('[PLANETA]', planetName)
            });
        }

        // Check Exaltation
        else if (EXALTATIONS[signName] === planetName) {
            dignities.push({
                planet: planetName,
                type: 'Exaltação',
                text: DIGNITY_TEXTS['exaltação'].replace('[PLANETA]', planetName)
            });
        }

        // Check Fall
        else if (FALLS[signName] === planetName) {
            dignities.push({
                planet: planetName,
                type: 'Queda',
                text: DIGNITY_TEXTS['queda'].replace('[PLANETA]', planetName)
            });
        }

        // Check Detriment
        else if (DETRIMENTS[signName]?.includes(planetName)) {
            dignities.push({
                planet: planetName,
                type: 'Detrimento',
                text: DIGNITY_TEXTS['detrimento'].replace('[PLANETA]', planetName)
            });
        }
    });

    return dignities;
}

export function enrichAspectInterpretations(rawAspects: Aspecto[]): { pair: string, type: string, text: string }[] {
    return rawAspects.map(aspect => {
        const typeKey = aspect.tipo; // "Conjunção", "Oposição", etc.
        const pairKey1 = `${aspect.astroA}_${aspect.astroB}`;
        const pairKey2 = `${aspect.astroB}_${aspect.astroA}`;

        let text = ASPECTS[typeKey]?.natureza || "Aspecto Astrológico";

        if (ASPECTS[typeKey] && ASPECTS[typeKey][pairKey1]) {
            text = ASPECTS[typeKey][pairKey1];
        } else if (ASPECTS[typeKey] && ASPECTS[typeKey][pairKey2]) {
            text = ASPECTS[typeKey][pairKey2];
        } else {
            // Fallback genérico se não houver texto específico
            text = `Interação de ${aspect.tipo.toLowerCase()} entre as energias de ${aspect.astroA} e ${aspect.astroB}.`;
        }

        return {
            pair: `${aspect.astroA} - ${aspect.astroB}`,
            type: aspect.tipo,
            text
        };
    });
}

export function generateNatalReport(mapa: MapaAstralCalculado): NatalReport {
    const getS = (name: string) => mapa.astros.find(a => a.nome === name);
    const asc = mapa.ascendente;

    const getHouseText = (planetName: string, house: number) => {
        const key = `Casa ${house}`;
        return PLANETS_IN_HOUSES[planetName]?.[key] || `${planetName} na Casa ${house}`;
    };

    const sun = getS('Sol')!;
    const sunHouse = getWholeSignHouse(sun.longitude, asc.longitude);

    const moon = getS('Lua')!;
    const moonHouse = getWholeSignHouse(moon.longitude, asc.longitude);

    const mercury = getS('Mercúrio')!;
    const mercuryHouse = getWholeSignHouse(mercury.longitude, asc.longitude);

    const venus = getS('Vênus')!;
    const venusHouse = getWholeSignHouse(venus.longitude, asc.longitude);

    const mars = getS('Marte')!;
    const marsHouse = getWholeSignHouse(mars.longitude, asc.longitude);

    const jupiter = getS('Júpiter')!;
    const jupiterHouse = getWholeSignHouse(jupiter.longitude, asc.longitude);

    const saturn = getS('Saturno')!;
    const saturnHouse = getWholeSignHouse(saturn.longitude, asc.longitude);

    const getSignText = (planetName: string, signName: string) => {
        return PLANETS_IN_SIGNS[planetName]?.[signName] || `${planetName} em ${signName}.`;
    };

    const formatText = (planet: string, sign: string, house: number) => {
        const signTxt = getSignText(planet, sign);
        const houseTxt = getHouseText(planet, house);
        return `${signTxt}\n\n${houseTxt}`;
    };

    return {
        identity: {
            sun: {
                sign: sun.signo,
                house: sunHouse,
                text: formatText('Sol', sun.signo, sunHouse)
            },
            rising: {
                sign: asc.signo,
                text: `Ascendente em ${asc.signo}: ${getSignText('Sol', asc.signo)} (Energia projetada na identidade)` // Usando texto do Sol como base genérica ou criar específico se tiver
            }
        },
        emotional: {
            moon: {
                sign: moon.signo,
                house: moonHouse,
                text: formatText('Lua', moon.signo, moonHouse)
            }
        },
        mental: {
            mercury: {
                sign: mercury.signo,
                house: mercuryHouse,
                text: formatText('Mercúrio', mercury.signo, mercuryHouse)
            }
        },
        affective: {
            venus: {
                sign: venus.signo,
                house: venusHouse,
                text: formatText('Vênus', venus.signo, venusHouse)
            }
        },
        action: {
            mars: {
                sign: mars.signo,
                house: marsHouse,
                text: formatText('Marte', mars.signo, marsHouse)
            }
        },
        expansion: {
            jupiter: {
                sign: jupiter.signo,
                house: jupiterHouse,
                text: formatText('Júpiter', jupiter.signo, jupiterHouse)
            }
        },
        structure: {
            saturn: {
                sign: saturn.signo,
                house: saturnHouse,
                text: formatText('Saturno', saturn.signo, saturnHouse)
            }
        },
        dignities: calculateDignities([...mapa.astros]),
        aspects: enrichAspectInterpretations(mapa.aspectos)
    };
}
