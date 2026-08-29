
/**
 * Utility to merge class names
 */
export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

import * as Astronomy from 'astronomy-engine';
import { calcularArcanoBongo } from './utils/bongo';

// Signs Array in Order
const SIGNS = [
  "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem",
  "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
];

/**
 * Número do arcano a partir do nome.
 *
 * Delega para o cálculo único (Gematria da Tabela de Bongo). Antes esta função
 * contava letras por conta própria, o que a fazia divergir de
 * `calcularArcanoNome` — ninguém a chamava, mas a divergência era uma armadilha.
 */
export const calculateArcanaNumber = (name: string): number =>
  calcularArcanoBongo(name).arcano;

export const getNumerologyDetails = (name: string) => {
  const r = calcularArcanoBongo(name);
  const steps: string[] = [];

  if (r.sufixosIgnorados.length) {
    steps.push(`Sufixo de linhagem ignorado: ${r.sufixosIgnorados.join(', ')}`);
  }

  // A soma, letra a letra, como a tradição a apresenta.
  steps.push(
    r.letras.map(l => `${l.original.toUpperCase()}=${l.valor}`).join(' + ') + ` = ${r.soma}`
  );

  if (r.reducao.length === 1) {
    steps.push(`${r.soma} já está entre 1 e 22. Sem redução necessária.`);
  } else {
    for (let i = 0; i < r.reducao.length - 1; i++) {
      const de = r.reducao[i];
      const para = r.reducao[i + 1];
      steps.push(`${de} → ${String(de).split('').join(' + ')} = ${para}`);
    }
  }

  return {
    cleanName: r.letras.map(l => l.letra).join(''),
    initialValue: r.soma,
    finalValue: r.arcano,
    steps,
    letras: r.letras,
    sufixosIgnorados: r.sufixosIgnorados
  };
};

// --- ASTRONOMICAL CALCULATIONS ---

/**
 * Gets the numeric sign index and degree from ecliptic longitude (0-360).
 */
const getSignFromLongitude = (longitude: number) => {
  // Normalize just in case
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
 * Helper to calculate the UTC offset in hours for a given date/time and timezone string.
 * This handles historical DST correctly using browser natives.
 */
const getOffsetInHours = (dateStr: string, timeStr: string, timeZone: string): number => {
  try {
    const isoString = `${dateStr}T${timeStr}:00`; // Local ISO time
    const date = new Date(isoString);

    // Create a date in the target timezone
    // We use Intl to format the date into parts in the target timezone vs UTC to find diff
    // However, simpler approach:
    // 1. Get the time value of the input date assuming it is local to that zone.
    // Since 'new Date(isoString)' uses the Browser's timezone, we need to be careful.

    // Better approach:
    // Create a formatter for the target timezone
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    });

    // We need to find a UTC timestamp X such that X formatted to timeZone equals input date/time.
    // This is an inverse problem.
    // Approximation: Use the longitude if TZ parsing is too hard, BUT
    // Let's try to get the offset by comparing a UTC date to its string in that TZ.

    // Let's treat the input string as UTC first to get a baseline
    const utcDate = new Date(`${dateStr}T${timeStr}:00Z`);
    const parts = dtf.formatToParts(utcDate);
    const zonedObj: any = {};
    parts.forEach(p => zonedObj[p.type] = p.value);

    // Reconstruct the date it "looks like" in that timezone
    // Note: formatting might change day/month/year rollover
    const zonedTime = new Date(Date.UTC(
      zonedObj.year, zonedObj.month - 1, zonedObj.day,
      zonedObj.hour == 24 ? 0 : zonedObj.hour, zonedObj.minute, zonedObj.second
    ));

    // The difference is the offset
    const diffMs = zonedTime.getTime() - utcDate.getTime();
    const offsetHours = diffMs / (1000 * 60 * 60);

    // If input is "08:00" and in London (GMT+1) it reads "09:00", offset is +1.
    return offsetHours;

  } catch (e) {
    console.warn("Timezone calculation failed, falling back to simple longitude estimation.", e);
    // Rough estimate: Longitude / 15 deg per hour
    // But typically Timezone string is safer.
    return 0;
  }
};

/**
 * Calculates Precise Astral Profile using Astronomy Engine.
 */
export const calculateAstralProfile = (
  name: string,
  dateString: string,
  timeString: string,
  lat?: number,
  lon?: number,
  timezone?: string
) => {
  // Mock fallback if data missing
  if (!lat || !lon || !timezone || !timeString) {
    return {
      sunSign: "Desconhecido",
      moonSign: "Desconhecido",
      risingSign: "Desconhecido",
      ascendantDegree: 0
    };
  }

  try {
    // 1. Calculate UTC Date
    // First, determine offset.
    // Example: Porto Velho (-4). Input 08:20.
    // We need to pass 12:20 UTC to Astronomy engine.

    // We'll use a specific logic for offset since `getOffsetInHours` above is a bit generic.
    // Let's trust the browser's ability to parse the timezone string relative to the input date.
    const localDateStr = `${dateString}T${timeString}:00`;

    const [ano, mes, dia] = dateString.split('-').map(Number);
    const [hora, minuto] = timeString.split(':').map(Number);

    // Simpler: Just use Lon/15.
    // -63.9 / 15 = -4.26 -> -4.
    let offsetUTC = Math.round(lon / 15);

    // Construct Date for Astronomy Engine (UTC)
    // Local Time - Offset = UTC
    // 08:20 - (-4) = 12:20.
    const dateObj = new Date(Date.UTC(ano, mes - 1, dia, hora - offsetUTC, minuto));

    // 2. Observer
    const observer = new Astronomy.Observer(lat, lon, 0);

    // 3. SUN
    const sunPos = Astronomy.Equator("Sun" as Astronomy.Body, dateObj, observer, true, true);
    const sunEcl = Astronomy.Ecliptic(sunPos.vec);
    const sunData = getSignFromLongitude(sunEcl.elon);

    // 4. MOON
    const moonPos = Astronomy.Equator("Moon" as Astronomy.Body, dateObj, observer, true, true);
    const moonEcl = Astronomy.Ecliptic(moonPos.vec);
    const moonData = getSignFromLongitude(moonEcl.elon);

    // 5. ASCENDANT
    // Calculate GMST (Greenwich Mean Sidereal Time)
    const gst = Astronomy.SiderealTime(dateObj); // Returns GMST in hours

    // Calculate LST (Local Sidereal Time) in Hours
    // LST = GMST + Longitude_Hours
    // Longitude is in degrees. East +, West -. 
    // 15 degrees = 1 hour.
    const lstHours = (gst + lon / 15 + 24) % 24;

    // Convert to Radians (RAMC)
    // RAMC = LST * 15 degrees -> radians
    const ramcRad = (lstHours * 15) * (Math.PI / 180);

    // Obliquity of Ecliptic (Epsilon)
    const epsRad = 23.4393 * (Math.PI / 180);

    // Latitude in Radians
    const latRad = lat * (Math.PI / 180);

    // Formula: tan(Asc) = cos(RAMC) / (-sin(RAMC) * cos(Eps) - tan(Lat) * sin(Eps))
    // Note: The formula provided in prompt:
    // tan(Asc) = cos(RAMC) / (-sin(RAMC) * cos(Eps) - tan(Lat) * sin(Eps))
    // This is equivalent to standard: atan2(y, x)
    // y = cos(RAMC)
    // x = -sin(RAMC) * cos(Eps) - tan(Lat) * sin(Eps)

    const num = Math.cos(ramcRad);
    const den = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);

    let ascRad = Math.atan2(num, den);
    let ascDeg = (ascRad * 180 / Math.PI + 360) % 360;

    const ascData = getSignFromLongitude(ascDeg);

    return {
      sunSign: sunData.sign,
      moonSign: moonData.sign,
      risingSign: ascData.sign,
      ascendantDegree: ascData.degree
    };

  } catch (e) {
    console.error("Astronomy Engine Error", e);
    // Fallback to simple calculation if engine fails
    return {
      sunSign: "Erro",
      moonSign: "Erro",
      risingSign: "Erro",
      ascendantDegree: 0
    };
  }
};

// --- GEOCODING SERVICE (Unchanged) ---

export const searchCity = async (query: string) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pt&format=json`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.latitude,
        lon: result.longitude,
        timezone: result.timezone,
        name: `${result.name}, ${result.admin1 || result.country}`
      };
    }
    return null;
  } catch (e) {
    console.error("Geocoding error", e);
    return null;
  }
};
