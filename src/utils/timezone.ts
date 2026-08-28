// src/utils/timezone.ts

/**
 * Resolução de fuso horário para o momento do nascimento.
 *
 * O offset de um lugar não é constante: depende da data. O Brasil teve horário
 * de verão até 2019, Portugal já esteve em UTC+0 e em UTC+1, e vários países
 * mudaram de fuso ao longo do século. Estimar o offset pela longitude
 * (`longitude / 15`) erra em toda a Europa continental, na Argentina, na China
 * e em qualquer fuso de meia hora — e ignora horário de verão sempre.
 *
 * Uma hora de erro desloca o Ascendente cerca de 15°, o que costuma ser um
 * signo inteiro e reposiciona todas as casas do mapa.
 *
 * A base tzdata completa já vem no navegador via `Intl`, inclusive o histórico.
 * Este módulo a consulta em vez de estimar.
 */

/** Formatadores são caros de construir; reaproveitamos por fuso. */
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(zone: string): Intl.DateTimeFormat {
    let fmt = formatterCache.get(zone);
    if (!fmt) {
        fmt = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        formatterCache.set(zone, fmt);
    }
    return fmt;
}

/** `true` se o navegador reconhece o identificador IANA (ex.: "America/Sao_Paulo"). */
export function isValidTimeZone(zone: string | undefined | null): zone is string {
    if (!zone || typeof zone !== 'string') return false;
    try {
        getFormatter(zone);
        return true;
    } catch {
        return false;
    }
}

/**
 * Offset do fuso, em minutos, no instante indicado.
 * Positivo a leste de Greenwich (São Paulo em julho → −180).
 *
 * Funciona lendo que horas eram naquele fuso no instante dado e comparando com
 * o UTC do mesmo instante.
 */
export function zoneOffsetMinutes(zone: string, instant: Date): number {
    const parts = getFormatter(zone).formatToParts(instant);
    const campo = (tipo: string) => Number(parts.find(p => p.type === tipo)?.value ?? 0);

    // `hour` volta como 24 à meia-noite em alguns motores.
    const hora = campo('hour') % 24;

    const comoSeFosseUTC = Date.UTC(
        campo('year'),
        campo('month') - 1,
        campo('day'),
        hora,
        campo('minute'),
        campo('second')
    );

    // Descartamos os milissegundos dos dois lados: o formatador não os expõe.
    const instanteSemMs = Math.floor(instant.getTime() / 1000) * 1000;
    return (comoSeFosseUTC - instanteSemMs) / 60000;
}

/**
 * Converte data e hora locais ("1990-07-14", "08:35") no instante UTC
 * correspondente, respeitando o horário de verão vigente naquela data.
 *
 * O offset depende do instante e o instante depende do offset, então
 * estimamos uma vez e corrigimos: duas iterações bastam para qualquer
 * transição real de fuso.
 */
export function localWallTimeToUTC(dataLocal: string, horaLocal: string, zone: string): Date {
    const [ano, mes, dia] = dataLocal.split('-').map(Number);
    const [hora, minuto] = horaLocal.split(':').map(Number);

    // Primeira aproximação: tratar a hora local como se já fosse UTC.
    const palpite = Date.UTC(ano, mes - 1, dia, hora, minuto);

    const offset1 = zoneOffsetMinutes(zone, new Date(palpite));
    let instante = palpite - offset1 * 60000;

    // Se o palpite caiu do outro lado de uma virada de horário de verão,
    // o offset recalculado no instante correto é o que vale.
    const offset2 = zoneOffsetMinutes(zone, new Date(instante));
    if (offset2 !== offset1) {
        instante = palpite - offset2 * 60000;
    }

    return new Date(instante);
}

export interface FusoResolvido {
    /** Offset em horas usado no cálculo (pode ser fracionário: Índia = 5.5). */
    offsetHoras: number;
    /** Instante UTC do nascimento. */
    dataUTC: Date;
    /** Como o offset foi obtido — a UI usa isto para ser honesta com o usuário. */
    origem: 'iana' | 'offset-salvo';
    /** Identificador IANA, quando disponível. */
    zone?: string;
}

/**
 * Resolve o instante UTC do nascimento a partir do que o perfil tiver.
 *
 * Preferimos o identificador IANA (exato, com histórico). Perfis salvos antes
 * desta mudança só têm o offset numérico; nesse caso ele é usado como está,
 * e `origem` avisa que o horário de verão não foi considerado.
 */
export function resolverNascimentoUTC(
    dataLocal: string,
    horaLocal: string,
    zone: string | undefined,
    offsetSalvo: number
): FusoResolvido {
    if (isValidTimeZone(zone)) {
        const dataUTC = localWallTimeToUTC(dataLocal, horaLocal, zone);
        return {
            offsetHoras: zoneOffsetMinutes(zone, dataUTC) / 60,
            dataUTC,
            origem: 'iana',
            zone
        };
    }

    const [ano, mes, dia] = dataLocal.split('-').map(Number);
    const [hora, minuto] = horaLocal.split(':').map(Number);
    const dataUTC = new Date(Date.UTC(ano, mes - 1, dia, hora, minuto) - offsetSalvo * 3600000);

    return { offsetHoras: offsetSalvo, dataUTC, origem: 'offset-salvo' };
}

/** Formata um offset em horas como "UTC−3" ou "UTC+5:30". */
export function formatarOffset(offsetHoras: number): string {
    if (typeof offsetHoras !== 'number' || Number.isNaN(offsetHoras)) return 'UTC';
    const sinal = offsetHoras >= 0 ? '+' : '−';
    const abs = Math.abs(offsetHoras);
    const horas = Math.floor(abs);
    const minutos = Math.round((abs - horas) * 60);
    return `UTC${sinal}${horas}${minutos ? `:${String(minutos).padStart(2, '0')}` : ''}`;
}
