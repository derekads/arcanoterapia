
import * as Astronomy from 'astronomy-engine';
import type {
  UserBirthData,
  MapaAstralCalculado,
  PosicaoCelestial,
  SignoZodiacal,
  Elemento,
  AstroName,
  Aspecto,
  TipoAspecto
} from '../types';

// --- CONSTANTES ---
const OBLIQUIDADE_ECLIPTICA = 23.4367;

const SIGNOS: SignoZodiacal[] = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer',
  'Leão', 'Virgem', 'Libra', 'Escorpião',
  'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

const ELEMENTOS_POR_SIGNO: Record<SignoZodiacal, Elemento> = {
  'Áries': 'fogo', 'Leão': 'fogo', 'Sagitário': 'fogo',
  'Touro': 'terra', 'Virgem': 'terra', 'Capricórnio': 'terra',
  'Gêmeos': 'ar', 'Libra': 'ar', 'Aquário': 'ar',
  'Câncer': 'agua', 'Escorpião': 'agua', 'Peixes': 'agua'
};

const PLANETAS_LISTA: { apiName: Astronomy.Body | string; displayName: AstroName }[] = [
  { apiName: "Sun", displayName: "Sol" },
  { apiName: "Moon", displayName: "Lua" },
  { apiName: "Mercury", displayName: "Mercúrio" },
  { apiName: "Venus", displayName: "Vênus" },
  { apiName: "Mars", displayName: "Marte" },
  { apiName: "Jupiter", displayName: "Júpiter" },
  { apiName: "Saturn", displayName: "Saturno" },
  { apiName: "Uranus", displayName: "Urano" },
  { apiName: "Neptune", displayName: "Netuno" },
  { apiName: "Pluto", displayName: "Plutão" },
];

// --- BANCO DE INTERPRETAÇÕES RÁPIDAS ---
const INTERPRETACOES: Record<string, Record<string, string>> = {
  "Sol": {
    "Áries": "Eu Sou a Ação. Vitalidade pioneira, coragem e impulsividade.",
    "Touro": "Eu Sou a Estabilidade. Persistência, busca por segurança e prazer sensorial.",
    "Gêmeos": "Eu Sou a Comunicação. Curiosidade, mente ágil e adaptabilidade.",
    "Câncer": "Eu Sou o Sentir. Proteção, memória afetiva e sensibilidade.",
    "Leão": "Eu Sou o Brilho. Criatividade, nobreza e necessidade de expressão.",
    "Virgem": "Eu Sou a Análise. Detalhe, serviço e busca pela perfeição.",
    "Libra": "Eu Sou o Equilíbrio. Diplomacia, estética e parcerias.",
    "Escorpião": "Eu Sou a Transformação. Intensidade, profundidade e regeneração.",
    "Sagitário": "Eu Sou a Expansão. Busca pela verdade, otimismo e liberdade.",
    "Capricórnio": "Eu Sou a Estrutura. Ambição, disciplina e responsabilidade.",
    "Aquário": "Eu Sou a Inovação. Originalidade, coletividade e visão de futuro.",
    "Peixes": "Eu Sou a Transcendência. Compaixão, espiritualidade e sonho.",
  },
  "Lua": {
    "Áries": "Segurança na ação. Reage com rapidez e franqueza.",
    "Touro": "Segurança na estabilidade. Nutre-se do conforto e da calma.",
    "Gêmeos": "Segurança no saber. Precisa verbalizar o que sente.",
    "Câncer": "Segurança no pertencer. Instinto maternal e protetor.",
    "Leão": "Segurança no reconhecimento. Emoções dramáticas e generosas.",
    "Virgem": "Segurança na ordem. Expressa afeto através de gestos úteis.",
    "Libra": "Segurança na harmonia. Evita conflitos emocionais.",
    "Escorpião": "Segurança na intensidade. Emoções profundas e complexas.",
    "Sagitário": "Segurança na liberdade. Otimismo emocional.",
    "Capricórnio": "Segurança no controle. Emoções reservadas e sérias.",
    "Aquário": "Segurança na liberdade. Emoções racionalizadas.",
    "Peixes": "Segurança na fusão. Empatia psíquica e sensibilidade extrema.",
  },
  "Ascendente": {
    "Áries": "Aborda a vida com coragem e iniciativa direta.",
    "Touro": "Aborda a vida com calma e firmeza.",
    "Gêmeos": "Aborda a vida com curiosidade e sociabilidade.",
    "Câncer": "Aborda a vida com cautela e sensibilidade.",
    "Leão": "Aborda a vida com confiança e carisma.",
    "Virgem": "Aborda a vida com critério e humildade.",
    "Libra": "Aborda a vida com charme e diplomacia.",
    "Escorpião": "Aborda a vida com mistério e intensidade.",
    "Sagitário": "Aborda a vida com entusiasmo e fé.",
    "Capricórnio": "Aborda a vida com seriedade e prudência.",
    "Aquário": "Aborda a vida com originalidade e independência.",
    "Peixes": "Aborda a vida com fluidez e empatia.",
  }
};

const INTERPRETACAO_PADRAO_PLANETA = {
  "Mercúrio": "Processos mentais, comunicação e aprendizado.",
  "Vênus": "Afeto, valores, beleza e relacionamentos.",
  "Marte": "Ação, desejo, assertividade e conquista.",
  "Júpiter": "Expansão, sorte, filosofia e abundância.",
  "Saturno": "Limites, estrutura, tempo e responsabilidade.",
  "Urano": "Revolução, o inesperado e a libertação.",
  "Netuno": "Ilusão, espiritualidade e inspiração artística.",
  "Plutão": "Poder, morte, renascimento e profundidade.",
  "MC": "Vocação, imagem pública e meta de vida.",
  "Nó Norte": "A direção evolutiva: o território que a alma veio desbravar nesta vida.",
  "Lilith": "O desejo indomado e a parte de você que se recusa a ser domesticada."
};

// --- HELPER FUNCTIONS ---

export function converterParaUTC(
  dataLocal: string,
  horaLocal: string,
  offsetHoras: number
): Date {
  if (!dataLocal || !horaLocal) throw new Error("Data e hora são obrigatórias.");
  const [ano, mes, dia] = dataLocal.split('-').map(Number);
  const [hora, minuto] = horaLocal.split(':').map(Number);
  if (!ano || !mes || !dia || isNaN(hora) || isNaN(minuto)) throw new Error("Formato inválido.");

  const minutosTotais = hora * 60 + minuto;
  const minutosUTC = minutosTotais - (offsetHoras * 60);
  const dataBase = new Date(Date.UTC(ano, mes - 1, dia));
  return new Date(dataBase.getTime() + (minutosUTC * 60 * 1000));
}

function normalizarGraus(graus: number): number {
  let resultado = graus % 360;
  if (resultado < 0) resultado += 360;
  return resultado;
}

function longitudeParaDados(longitude: number): {
  longitude: number;
  signo: SignoZodiacal;
  grau: number;
  minuto: number;
  elemento: Elemento;
} {
  const lon = normalizarGraus(longitude);
  const indexSigno = Math.floor(lon / 30);
  const resto = lon % 30;
  const signo = SIGNOS[indexSigno % 12];

  return {
    longitude: lon,
    signo,
    grau: Math.floor(resto),
    minuto: Math.round((resto - Math.floor(resto)) * 60),
    elemento: ELEMENTOS_POR_SIGNO[signo]
  };
}

function calcularCasaDoPlaneta(longitudePlaneta: number, cuspides: number[]): number {
  const lon = normalizarGraus(longitudePlaneta);
  for (let i = 0; i < 11; i++) {
    const atual = cuspides[i];
    const proxima = cuspides[i + 1];
    if (atual < proxima) {
      if (lon >= atual && lon < proxima) return i + 1;
    } else {
      if (lon >= atual || lon < proxima) return i + 1;
    }
  }
  return 12;
}

// --- CÁLCULO DE ASPECTOS ---

function calcularAspectos(astros: PosicaoCelestial[]): Aspecto[] {
  const aspectosEncontrados: Aspecto[] = [];
  const orbs = {
    'Conjunção': 8,
    'Oposição': 8,
    'Trígono': 8,
    'Quadratura': 8,
    'Sextil': 6
  };

  // Filtrar apenas corpos principais para aspectos (evitar excesso de info)
  const corposRelevantes = ['Sol', 'Lua', 'Mercúrio', 'Vênus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão', 'Ascendente', 'MC'];
  const lista = astros.filter(a => corposRelevantes.includes(a.nome));

  for (let i = 0; i < lista.length; i++) {
    for (let j = i + 1; j < lista.length; j++) {
      const a1 = lista[i];
      const a2 = lista[j];

      let diff = Math.abs(a1.longitude - a2.longitude);
      if (diff > 180) diff = 360 - diff;

      let tipo: TipoAspecto | null = null;
      let orbLimite = 0;

      if (diff <= orbs['Conjunção']) { tipo = 'Conjunção'; orbLimite = orbs['Conjunção']; }
      else if (Math.abs(diff - 180) <= orbs['Oposição']) { tipo = 'Oposição'; orbLimite = orbs['Oposição']; }
      else if (Math.abs(diff - 120) <= orbs['Trígono']) { tipo = 'Trígono'; orbLimite = orbs['Trígono']; }
      else if (Math.abs(diff - 90) <= orbs['Quadratura']) { tipo = 'Quadratura'; orbLimite = orbs['Quadratura']; }
      else if (Math.abs(diff - 60) <= orbs['Sextil']) { tipo = 'Sextil'; orbLimite = orbs['Sextil']; }

      if (tipo) {
        // Calcular orb exata
        let anguloBase = 0;
        if (tipo === 'Oposição') anguloBase = 180;
        if (tipo === 'Trígono') anguloBase = 120;
        if (tipo === 'Quadratura') anguloBase = 90;
        if (tipo === 'Sextil') anguloBase = 60;

        const orbAtual = Math.abs(diff - anguloBase);

        aspectosEncontrados.push({
          astroA: a1.nome,
          astroB: a2.nome,
          tipo,
          graus: parseFloat(diff.toFixed(2)),
          orb: parseFloat(orbAtual.toFixed(2)),
          interpretacao: `${tipo} entre ${a1.nome} e ${a2.nome}` // Placeholder para interpretação detalhada futura
        });
      }
    }
  }

  // Ordenar por "força" (menor orb)
  return aspectosEncontrados.sort((a, b) => a.orb - b.orb);
}

/**
 * Séculos julianos decorridos desde J2000.0 — base das fórmulas de Meeus.
 */
function seculosJulianos(data: Date): number {
  const jd = data.getTime() / 86400000 + 2440587.5;
  return (jd - 2451545.0) / 36525;
}

/**
 * Nó Norte médio (Cabeça do Dragão) — Meeus, Astronomical Algorithms, cap. 47.
 * O nó médio tem movimento retrógrado constante (~19°20' por ano).
 */
function calcularNoNorteMedio(data: Date): number {
  const T = seculosJulianos(data);
  const omega =
    125.0445479 -
    1934.1362891 * T +
    0.0020754 * T * T +
    (T * T * T) / 467441 -
    (T * T * T * T) / 60616000;
  return normalizarGraus(omega);
}

/**
 * Lilith média (Lua Negra) = perigeu lunar médio + 180°, ou seja, o apogeu
 * da órbita da Lua. Perigeu médio conforme Meeus, cap. 47.
 */
function calcularLilithMedia(data: Date): number {
  const T = seculosJulianos(data);
  const perigeu =
    83.3532465 +
    4069.0137287 * T -
    0.0103200 * T * T -
    (T * T * T) / 80053 +
    (T * T * T * T) / 18999000;
  return normalizarGraus(perigeu + 180);
}

// --- CÁLCULOS PRINCIPAIS ---

function calcularASC(ramcRad: number, epsRad: number, latRad: number): number {
  const num = Math.cos(ramcRad);
  const den = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let asc = Math.atan2(num, den) * (180 / Math.PI);
  return normalizarGraus(asc);
}

function calcularMC(ramcRad: number, epsRad: number): number {
  let mc = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad)) * (180 / Math.PI);
  return normalizarGraus(mc);
}

function calcularCuspides(asc: number, mc: number): number[] {
  const casas = new Array(12).fill(0);
  casas[0] = asc;
  casas[9] = mc;
  casas[3] = normalizarGraus(mc + 180);
  casas[6] = normalizarGraus(asc + 180);

  let dist10to1 = normalizarGraus(asc - mc);
  let step1 = dist10to1 / 3;
  casas[10] = normalizarGraus(mc + step1);
  casas[11] = normalizarGraus(mc + step1 * 2);

  let ic = casas[3];
  let dist1to4 = normalizarGraus(ic - asc);
  let step2 = dist1to4 / 3;
  casas[1] = normalizarGraus(asc + step2);
  casas[2] = normalizarGraus(asc + step2 * 2);

  casas[4] = normalizarGraus(casas[10] + 180);
  casas[5] = normalizarGraus(casas[11] + 180);
  casas[7] = normalizarGraus(casas[1] + 180);
  casas[8] = normalizarGraus(casas[2] + 180);

  return casas;
}

export function gerarInterpretacao(astro: string, signo: string): string {
  // 1. Tentar encontrar no dicionário específico
  if (INTERPRETACOES[astro] && INTERPRETACOES[astro][signo]) {
    return INTERPRETACOES[astro][signo];
  }
  // 2. Tentar interpretação genérica do planeta + signo
  if (INTERPRETACAO_PADRAO_PLANETA[astro as keyof typeof INTERPRETACAO_PADRAO_PLANETA]) {
    return `${INTERPRETACAO_PADRAO_PLANETA[astro as keyof typeof INTERPRETACAO_PADRAO_PLANETA]} A energia é colorida por ${signo}.`;
  }
  // 3. Fallback
  return `${astro} posicionado em ${signo}.`;
}

export function calcularMapaAstral(userData: UserBirthData): MapaAstralCalculado {
  if (!userData?.localizacao) {
    throw new Error("Localização é obrigatória para o cálculo");
  }

  // Fallback seguro para coordenadas em dispositivos móveis que bloqueiem Geolocation
  const latitude = typeof userData.localizacao.latitude === 'number' && !isNaN(userData.localizacao.latitude)
    ? userData.localizacao.latitude
    : -23.5505; // São Paulo default

  const longitude = typeof userData.localizacao.longitude === 'number' && !isNaN(userData.localizacao.longitude)
    ? userData.localizacao.longitude
    : -46.6333;

  const timezoneOffset = typeof userData.localizacao.timezoneOffset === 'number' && !isNaN(userData.localizacao.timezoneOffset)
    ? userData.localizacao.timezoneOffset
    : -3; // BRT default

  const dateUTC = converterParaUTC(
    userData.dataNascimento,
    userData.horaNascimento,
    timezoneOffset
  );

  const gst = Astronomy.SiderealTime(dateUTC);
  const lst = (gst + longitude / 15 + 24) % 24;
  const ramcRad = (lst * 15) * (Math.PI / 180);
  const epsRad = (OBLIQUIDADE_ECLIPTICA) * (Math.PI / 180);
  const latRad = latitude * (Math.PI / 180);

  const ascVal = calcularASC(ramcRad, epsRad, latRad);
  const mcVal = calcularMC(ramcRad, epsRad);
  const casas = calcularCuspides(ascVal, mcVal);

  const astrosCalculados: PosicaoCelestial[] = [];

  PLANETAS_LISTA.forEach(planeta => {
    let longFinal = 0;
    let isRetro = false;

    try {
      const vec = Astronomy.GeoVector(planeta.apiName as Astronomy.Body, dateUTC, true);
      const ecl = Astronomy.Ecliptic(vec);
      longFinal = normalizarGraus(ecl.elon);

      const tPrev = new Date(dateUTC.getTime() - 3600000);
      const vPrev = Astronomy.GeoVector(planeta.apiName as Astronomy.Body, tPrev, true);
      const ePrev = Astronomy.Ecliptic(vPrev);

      let diff = ecl.elon - ePrev.elon;
      if (diff < -300) diff += 360;
      if (diff > 300) diff -= 360;
      isRetro = diff < 0;
    } catch (e) {
      console.warn(`Erro ao calcular ${planeta.displayName}`, e);
    }

    const dadosGeo = longitudeParaDados(longFinal);
    astrosCalculados.push({
      nome: planeta.displayName,
      ...dadosGeo,
      casa: calcularCasaDoPlaneta(dadosGeo.longitude, casas),
      retrogrado: isRetro,
      interpretacao: gerarInterpretacao(planeta.displayName, dadosGeo.signo)
    });
  });

  // Pontos lunares calculados (não são corpos físicos, mas fazem parte do mapa)
  const noNorteVal = calcularNoNorteMedio(dateUTC);
  const noNorteDados = longitudeParaDados(noNorteVal);
  astrosCalculados.push({
    nome: 'Nó Norte',
    ...noNorteDados,
    casa: calcularCasaDoPlaneta(noNorteDados.longitude, casas),
    retrogrado: true, // o nó médio é sempre retrógrado
    interpretacao: gerarInterpretacao('Nó Norte', noNorteDados.signo)
  });

  const lilithVal = calcularLilithMedia(dateUTC);
  const lilithDados = longitudeParaDados(lilithVal);
  astrosCalculados.push({
    nome: 'Lilith',
    ...lilithDados,
    casa: calcularCasaDoPlaneta(lilithDados.longitude, casas),
    retrogrado: false,
    interpretacao: gerarInterpretacao('Lilith', lilithDados.signo)
  });

  // Adicionar ASC e MC à lista de "astros" para cálculo de aspectos e visualização unificada
  const ascDados = longitudeParaDados(ascVal);
  const mcDados = longitudeParaDados(mcVal);

  const ascObj: PosicaoCelestial = {
    nome: 'Ascendente',
    ...ascDados,
    casa: 1,
    retrogrado: false,
    interpretacao: gerarInterpretacao('Ascendente', ascDados.signo)
  };

  const mcObj: PosicaoCelestial = {
    nome: 'MC',
    ...mcDados,
    casa: 10,
    retrogrado: false,
    interpretacao: "Vocação, Propósito e Imagem Pública."
  };

  // Unir tudo para cálculo de aspectos
  const todosPontos = [...astrosCalculados, ascObj, mcObj];
  const aspectos = calcularAspectos(todosPontos);

  const sol = astrosCalculados.find(a => a.nome === 'Sol')!;
  const lua = astrosCalculados.find(a => a.nome === 'Lua')!;

  return {
    astros: astrosCalculados,
    casas: casas,
    ascendente: ascObj,
    mc: mcObj,
    sol,
    lua,
    aspectos,
    dataCalculo: new Date().toISOString(),
    dataNascimentoUTC: dateUTC.toISOString()
  };
}
