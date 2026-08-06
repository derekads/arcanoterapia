
// === DADOS DO USUÁRIO ===

export interface Localizacao {
  latitude: number;
  longitude: number;
  timezoneOffset: number;  // -3 para Brasil, +1 para Berlim, etc
  nomeCidade: string;
}

export interface UserBirthData {
  nome: string;
  dataNascimento: string;  // "YYYY-MM-DD"
  horaNascimento: string;  // "HH:MM"
  localizacao: Localizacao;
}

export interface SavedProfile extends UserBirthData {
  id: string;              // uuid
  profileName: string;     // "Derek - SP" ou "Meu Mapa"
  createdAt: string;       // ISO date
  updatedAt: string;
}

// === RESULTADOS ASTRONÔMICOS ===

export type SignoZodiacal =
  | 'Áries' | 'Touro' | 'Gêmeos' | 'Câncer'
  | 'Leão' | 'Virgem' | 'Libra' | 'Escorpião'
  | 'Sagitário' | 'Capricórnio' | 'Aquário' | 'Peixes';

export type Elemento = 'fogo' | 'terra' | 'ar' | 'agua' | 'éter';

export type AstroName =
  | 'Sol' | 'Lua' | 'Mercúrio' | 'Vênus' | 'Marte'
  | 'Júpiter' | 'Saturno' | 'Urano' | 'Netuno' | 'Plutão'
  | 'Quíron' | 'Lilith' | 'Nó Norte' | 'Ascendente' | 'MC';

export type TipoAspecto = 'Conjunção' | 'Oposição' | 'Trígono' | 'Quadratura' | 'Sextil';

export interface Aspecto {
  astroA: AstroName;
  astroB: AstroName;
  tipo: TipoAspecto;
  graus: number; // Diferença exata
  orb: number;   // Quão exato é (quanto menor, mais forte)
  interpretacao: string;
}

export interface PosicaoCelestial {
  nome: AstroName;
  longitude: number;       // 0-360 graus eclípticos (Absoluta)
  signo: SignoZodiacal;
  grau: number;           // 0-29 no signo
  minuto: number;         // 0-59
  elemento: Elemento;
  casa: number;          // 1-12
  retrogrado: boolean;
  interpretacao: string;
}

export interface MapaAstralCalculado {
  astros: PosicaoCelestial[]; // Array contendo Sol, Lua, Planetas, etc.
  casas: number[]; // Array com 12 longitudes (uma para cada cúspide, começando da Casa 1)
  ascendente: PosicaoCelestial;
  mc: PosicaoCelestial;
  sol: PosicaoCelestial;
  lua: PosicaoCelestial;
  aspectos: Aspecto[]; // Nova propriedade
  dataCalculo: string;    // ISO timestamp
  dataNascimentoUTC: string;
}

// === ESTADOS DA UI ===

export interface ProfileState {
  profiles: SavedProfile[];
  activeProfile: SavedProfile | null;
  isLoading: boolean;
  error: string | null;
}

export type ArcanoTab =
  | 'essencia'
  | 'sombras'
  | 'diretrizes'
  | 'roda'
  | 'afirmacoes'
  | 'jornal'
  | 'farmacia'
  | 'som'
  | 'cosmos';

export type ViewState =
  | 'DASHBOARD'
  | 'ARCANO_EXPANDED'
  | 'ASTROLOGY_DETAIL'
  | 'ALCHEMY'
  | 'SHADOW'
  | 'TIMELINE'
  | 'RITUAL'
  | 'ORACLE'
  | 'HEALTH'
  | 'CAREER'
  | 'RELATIONSHIPS';

// === APP TYPES ===

export type AppStep = 'landing' | 'input' | 'loading' | 'revelation' | 'result';
export type UniverseView = 'ORACLE' | 'TIME' | 'COSMOS';
export type FeatureSelection = 'full' | 'ciclos' | 'alquimia' | 'sombra' | 'oraculo';

export interface AstrologyData {
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  ascendantDegree?: number;
}

export interface UserData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthCity: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  arcanaNumber: number | null;
  astrology: AstrologyData;
}

export interface ShadowItem {
  id: string;
  sombra: string;
  cura: string;
  reconhecido: boolean;
}

export interface RitualStep {
  passo: number;
  texto: string;
}

export interface RitualData {
  titulo: string;
  objetivo: string;
  materiais: string[];
  passos: RitualStep[];
}

// Health Interface Structure
export interface ArcanoSaude {
  vulnerabilidade: string;
  sintomas: string[];
  prevencao: string[];
}

// === ARCANOTERAPIA 2.0 TYPES ===

export type FrequenciaSombra = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRONICA';

export interface ExercicioPratico {
  titulo: string;
  duracaoMinutos: number;
  instrucoes: string[];
  materialNecessario: string[];
}

export interface ShadowPattern {
  id: string;
  arcanoId: number;
  nomePadrao: string;
  descricao: string;
  antidoto: string;
  sinaisAtencao: string[];
  frequenciaSombra: FrequenciaSombra;
  exercicioPratico: ExercicioPratico;
  exercicio?: string;
  modalidadeTerapia?: string;
}

export interface SombraPro {
  nome: string;
  descricao?: string;
  antidoto: string;
  exercicio: string;
  sinais: string[];
  severidade: string;
  modalidade_terapia?: string;
  modalbody_terapia?: string;
}

export type CategoriaGuia = 'CELEBRACAO' | 'REINVENTAO' | 'COMPARTILHAMENTO' | 'PRESENCA' | 'VULNERABILIDADE';

export interface DiretrizEvolutiva {
  id: string;
  arcanoId: number;
  categoria: CategoriaGuia;
  titulo: string;
  descricao: string;
  icone: string;
  corCard: string;
  acaoPratica: string;
  checkinDiario: boolean;
  tempo?: string;
  instrucaoDetalhada?: string;
  temTimer?: boolean;
  prioritaria?: boolean;
}

export type AreaDaVida = 'AMOR' | 'DINHEIRO' | 'SAUDE' | 'CARREIRA' | 'FAMILIA' | 'PROPOSITO';

export interface AreaDaVidaInterpretacao {
  area: AreaDaVida;
  baixa: string;
  media: string;
  alta: string;
  check_diario: string;
}

export type TipoAfirmacao = 'MANHA' | 'NOITE' | 'CRISIS' | 'PROSPERIDADE' | 'AMOR';

export interface Afirmacao {
  id: string;
  arcanoId: number;
  tipo: TipoAfirmacao;
  texto: string;
}

export interface JournalEntry {
  id: string;
  arcanoId: number;
  data: string; // ISO date
  texto: string;
  template?: string;
}

export interface CheckinDiario {
  data: string; // ISO date
  diretrizId: string;
}

export type Trimestre = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface MicroAcao {
  id: string;
  texto: string;
  done: boolean;
}

export interface SubMeta {
  id: string;
  texto: string;
  done: boolean;
}

export interface LifeAreaRating {
  area: AreaDaVida;
  nota: number; // 0-10
  meta?: string;          // Legacy simple meta
  metaGoal?: string;      // SMART structured goal text
  notaAlvo?: number;      // Target score on radar (0-10)
  microAcoes?: MicroAcao[];
  subMetas?: SubMeta[];
  lastCheckIn?: string;   // ISO timestamp of last slider update
  ano: number;
  trimestre: Trimestre;
  dataRegistro: string; // ISO date
}

export interface QuarterlyInsight {
  arcanoId: number;
  trimestres: Record<Trimestre, Record<AreaDaVida, string>>;
}

export interface UserProgress {
  arcanoAtualId: number;
  percentualIntegracao: number; // 0-100
  sombrasIntegradas: string[]; // ShadowPattern ids
  diretrizesCompletadas: string[]; // DiretrizEvolutiva ids
  checkinsDiarios: CheckinDiario[];
  streakAtual: number;
  maiorStreak: number;
  areasVida: LifeAreaRating[]; // Agora contém o histórico trimestral
  journalEntries: JournalEntry[];
  ultimoAcesso: string; // ISO timestamp
  // Roda da Vida 2.0 fields
  onboardingRodaComplete?: boolean;
  onboardingPrioridades?: AreaDaVida[];
}

// Interface Principal do Arcano (Atualizada)
export interface ArcanoAdvanced {
  numero: number;
  nome: string;
  numeroRomano: string;
  // --- PRO FIELDS ---
  subtitulo?: string;
  essencia?: string;
  simbolo?: string;
  cor?: string;
  cor_secundaria?: string;
  frequencia?: string;
  nota_musical?: string;
  chacra_regente?: string;
  planeta_regente?: string;
  signo_zodiacal?: string;
  elemento?: string;
  planeta?: string;
  imagem?: string;
  carta_oposta?: string;
  dia_semana?: string;
  numero_sorte?: number;

  cristais?: string[];
  ervas?: string[];
  alimentacao?: string[];
  banho_terapeutico?: string;
  movimento_corporal?: string;

  pergunta_junguiana?: string;
  meditacao_guiada?: string;
  conselho_diario?: string[];
  musicas_recomendadas?: string[];

  numerologia?: {
    alma: number;
    personalidade: string;
    caminho: string;
    desafio: string;
  };

  previsao2026?: {
    anoPessoal: string;
    ciclos: string;
    conselho: string;
    alerta_saude?: string;
  };

  sombras?: SombraPro[];
  afirmacoes?: {
    manha: string;
    noite: string;
    crise: string;
    prosperidade: string;
    amor: string;
  };
  jornalTemplates?: string[];
  diretrizes?: string[];
  rodadaVida?: Record<string, AreaDaVidaInterpretacao>;

  // Legacy/Compatibility fields
  arquetipo?: string;
  imagePrompt?: string;
  palavrasChave?: string[];
  idadeChave?: number;
  mantra?: string;
  conteudo?: {
    essencia: string;
    luz: string[];
    sombra: string[];
    conselho: string[];
  };
  insights?: {
    luz: string[];
    sombra: string[];
    conselho: string[];
    essencia?: string[];
  };
  saude?: ArcanoSaude;
  relacionamentos?: string;
  carreira?: string;
  ciclos?: {
    faseJovem: string;
    faseAdulta: string;
    faseSabedoria: string;
    desafioAtual: string;
  };
  ciclos_legacy?: {
    faseJovem: string;
    faseAdulta: string;
    faseSabedoria: string;
    desafioAtual: string;
  };
  alquimia?: {
    cristal: string;
    cristalImg: string;
    erva: string;
    mantra: string;
    frequenciaHz: number;
  };
  ritual?: RitualData;
  shadowWork?: ShadowItem[];
  personaAI?: {
    tomDeVoz: string;
    fraseBoasVindas: string;
  };
}

// Alias for compatibility if needed
export type ArcanoData = ArcanoAdvanced;
