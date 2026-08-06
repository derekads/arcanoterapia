import * as Astronomy from 'astronomy-engine';

/**
 * UTILS/CALCULOS.TS
 * Central de Inteligência Matemática e Astronômica
 */

// ═════════════════════════════════════════════════════════
// CONSORTIUM DE FORMULAS MÍSTICAS
// ═════════════════════════════════════════════════════════

/**
 * Redução Teosófica Padrão (Cálculo 22)
 * Se resultado for 22, vira 0 (O Louco)
 */
export const reduzirParaArcano = (n: number): number => {
    let result = n;
    while (result > 22) {
        result = result.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return result;
};

/**
 * Cálculo do Arcano do Nome
 */
export const calcularArcanoNome = (nome: string): number => {
    const cleanName = nome.replace(/[^a-zA-Z]/g, '');
    if (cleanName.length === 0) return 0;
    return reduzirParaArcano(cleanName.length);
};

/**
 * Ano Pessoal Dinâmico: (Dia + Mes + Ano Alvo) % 22
 */
export const calcularAnoPessoal = (dia: number, mes: number, anoAlvo: number = new Date().getFullYear()): number => {
    const soma = dia + mes + anoAlvo;
    return reduzirParaArcano(soma);
};

export const calcularAnoPessoal2026 = (dia: number, mes: number): number => calcularAnoPessoal(dia, mes, 2026);

/**
 * Arcanos Regentes (Sugestão Técnica)
 */
export const calcularRegentes = (dataNasc: string) => {
    const [anoN, mesN, diaN] = dataNasc.split('-').map(Number);
    const hoje = new Date();
    const diaA = hoje.getDate();
    const mesA = hoje.getMonth() + 1;
    const anoA = hoje.getFullYear();

    return {
        ano: reduzirParaArcano(diaN + mesN + anoA),
        mes: reduzirParaArcano(diaN + mesA),
        dia: reduzirParaArcano(diaA + mesA)
    };
};

// ═════════════════════════════════════════════════════════
// ENGENHARIA ASTRONÔMICA (PRECISA)
// ═════════════════════════════════════════════════════════

const SIGNS = [
    "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
    "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

const getSignFromLongitude = (longitude: number) => {
    const normLong = (longitude + 360) % 360;
    const index = Math.floor(normLong / 30);
    const degree = Math.floor(normLong % 30);
    return {
        sign: SIGNS[index],
        degree: degree,
        fullDegree: normLong
    };
};

/**
 * Calcula o Perfil Astral corrigindo o bug do fuso horário
 */
export const calculateAstralProfilePro = (
    dateString: string, // YYYY-MM-DD
    timeString: string, // HH:MM
    lat: number,
    lon: number,
    timezoneOffset?: number // Fornecido explicitamente ou calculado via date
) => {
    try {
        const [ano, mes, dia] = dateString.split('-').map(Number);
        const [hora, minuto] = timeString.split(':').map(Number);

        // CORREÇÃO CRÍTICA: Se não houver offset, usamos o nativo do Date para o local
        // ou calculamos com base no ISO do usuário se disponível.
        // Para fins de precisão mística, usaremos lon/15 como estimativa inicial
        // mas permitiremos overwrite do sistema.
        const offset = timezoneOffset ?? Math.round(lon / 15);

        // Data UTC Real = Hora Local - Offset
        const dateObj = new Date(Date.UTC(ano, mes - 1, dia, hora - offset, minuto));
        const observer = new Astronomy.Observer(lat, lon, 0);

        // Calculando Planetas
        const sunData = getSignFromLongitude(Astronomy.Ecliptic(Astronomy.Equator("Sun" as Astronomy.Body, dateObj, observer, true, true).vec).elon);
        const moonData = getSignFromLongitude(Astronomy.Ecliptic(Astronomy.Equator("Moon" as Astronomy.Body, dateObj, observer, true, true).vec).elon);

        // ASCENDENTE CORRETO via Astronomy Engine Sidereal Time
        const gst = Astronomy.SiderealTime(dateObj);
        const lstHours = (gst + lon / 15 + 24) % 24;
        const ramcRad = (lstHours * 15) * (Math.PI / 180);
        const epsRad = 23.4393 * (Math.PI / 180);
        const latRad = lat * (Math.PI / 180);

        const num = Math.cos(ramcRad);
        const den = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
        let ascDeg = (Math.atan2(num, den) * 180 / Math.PI + 360) % 360;

        const ascData = getSignFromLongitude(ascDeg);

        return {
            sunSign: sunData.sign,
            moonSign: moonData.sign,
            risingSign: ascData.sign,
            ascendantDegree: ascData.degree,
            dataUTC: dateObj.toISOString()
        };
    } catch (e) {
        console.error("Erro no cálculo Pro:", e);
        return null;
    }
};

/**
 * Calcula Aspectos entre planetas (Trígono, Quadratura, Oposição, Conjunção, Sextil)
 */
export const calculateAspects = (planets: { name: string, lon: number }[]) => {
    const aspects = [];
    const ASPECT_TYPES = [
        { name: "Conjunção", angle: 0, orb: 8 },
        { name: "Sextil", angle: 60, orb: 6 },
        { name: "Quadratura", angle: 90, orb: 7 },
        { name: "Trígono", angle: 120, orb: 8 },
        { name: "Oposição", angle: 180, orb: 8 }
    ];

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const diff = Math.abs(planets[i].lon - planets[j].lon);
            const dist = diff > 180 ? 360 - diff : diff;

            for (const type of ASPECT_TYPES) {
                if (Math.abs(dist - type.angle) <= type.orb) {
                    aspects.push({
                        astroA: planets[i].name,
                        astroB: planets[j].name,
                        tipo: type.name,
                        distancia: dist,
                        orb: Math.abs(dist - type.angle)
                    });
                }
            }
        }
    }
    return aspects;
};

/**
 * Posições Planetárias em Tempo Real
 */
export const calculateTransitsPro = (lat: number, lon: number) => {
    const now = new Date();
    const observer = new Astronomy.Observer(lat, lon, 0);
    const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

    return bodies.map(body => {
        const pos = Astronomy.Equator(body as Astronomy.Body, now, observer, true, true);
        const ecl = Astronomy.Ecliptic(pos.vec);
        const data = getSignFromLongitude(ecl.elon);
        return {
            name: body === "Sun" ? "Sol" : body === "Moon" ? "Lua" : body,
            sign: data.sign,
            degree: data.degree,
            lon: ecl.elon
        };
    });
};

/**
 * Calcula a Fase da Lua atual (nova, crescente, cheia, minguante)
 */
export const calculateMoonPhase = (date: Date = new Date()): string => {
    const phase = Astronomy.MoonPhase(date);

    if (phase < 45 || phase >= 315) return "nova";
    if (phase >= 45 && phase < 135) return "crescente";
    if (phase >= 135 && phase < 225) return "cheia";
    if (phase >= 225 && phase < 315) return "minguante";

    return "nova";
};
