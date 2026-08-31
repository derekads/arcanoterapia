// src/data/frequencias.ts

/**
 * O que cada frequência e cada chacra significam.
 *
 * A aba de Frequências mostrava o número e mais nada: "528Hz" em corpo grande,
 * seguido de uma frase montada por um `arcano.numero === 22 ? ... : ...` — ou
 * seja, vinte e um dos vinte e dois arcanos recebiam exatamente o mesmo texto.
 * E o rótulo dizia "Frequência Solfeggio" para todos, inclusive para os arcanos
 * afinados em 432Hz, que não pertence à escala Solfeggio.
 *
 * Aqui cada uma das dez frequências usadas no arcanos.json ganha nome, origem e
 * uma intenção de escuta, e os treze modos diferentes de escrever sete chacras
 * viram sete entradas com o que cada um governa no corpo.
 *
 * Sobre o tom das descrições: a tradição do som terapêutico faz afirmações
 * médicas — "repara o DNA", "regenera tecidos" — que não têm respaldo clínico.
 * O texto abaixo apresenta essas ideias como o que são, uma tradição, e propõe
 * uma intenção de escuta em vez de um efeito prometido.
 */

export interface Frequencia {
    /** Sílaba do hino a São João Batista, quando houver. */
    silaba?: string;
    /** Nome curto, o que a tradição chama esta frequência. */
    nome: string;
    /** De onde vem — escala Solfeggio, afinação alternativa, etc. */
    origem: string;
    /** O que a tradição associa a ela. */
    tradicao: string;
    /** Uma intenção concreta para os minutos de escuta. */
    intencao: string;
}

export const FREQUENCIAS: Record<string, Frequencia> = {
    '174': {
        nome: 'A base',
        origem: 'A mais grave das Solfeggio estendidas, abaixo das seis originais.',
        tradicao: 'Associada ao alívio da dor e à sensação de estar em terreno firme.',
        intencao: 'Escute com os pés no chão e o peso do corpo apoiado. É a frequência de quando falta segurança, não de quando falta energia.',
    },
    '285': {
        nome: 'O reparo',
        origem: 'Segunda das Solfeggio estendidas.',
        tradicao: 'Ligada à regeneração — à ideia de devolver a um tecido a forma que ele tinha.',
        intencao: 'Escolha uma coisa que se rompeu recentemente e escute pensando nela inteira de novo, não no rompimento.',
    },
    '396': {
        silaba: 'UT',
        nome: 'A libertação da culpa',
        origem: 'Primeira das seis Solfeggio originais.',
        tradicao: 'Dissolver culpa e medo — os dois pesos que travam o primeiro passo.',
        intencao: 'Nomeie em voz baixa uma culpa que você carrega há tempo demais. Escute sem defendê-la e sem se punir por ela.',
    },
    '417': {
        silaba: 'RE',
        nome: 'O desfazer',
        origem: 'Segunda das Solfeggio originais.',
        tradicao: 'Desfazer situações travadas e facilitar mudança.',
        intencao: 'Traga à mente a situação que não anda. Não tente resolvê-la enquanto escuta — só permita que ela deixe de parecer definitiva.',
    },
    '432': {
        nome: 'A afinação natural',
        origem: 'Não é Solfeggio: é uma afinação alternativa de concerto, com o Lá em 432Hz em vez dos 440Hz padrão.',
        tradicao: 'Descrita como mais consonante com o corpo. É uma preferência estética antiga, não uma medida física.',
        intencao: 'Use como fundo, não como foco. É a frequência para acompanhar outra coisa — escrever, respirar, adormecer.',
    },
    '528': {
        silaba: 'MI',
        nome: 'A transformação',
        origem: 'Terceira das Solfeggio originais, a mais conhecida de todas.',
        tradicao: 'Chamada de "frequência do milagre"; a tradição a liga à reparação e à mudança de estado.',
        intencao: 'Escute enquanto formula, em uma frase só, o que você quer que seja diferente. Repita a frase até ela parar de soar estranha.',
    },
    '639': {
        silaba: 'FA',
        nome: 'O vínculo',
        origem: 'Quarta das Solfeggio originais.',
        tradicao: 'Harmonizar relações — reconciliação, escuta, pertencimento.',
        intencao: 'Pense em uma pessoa específica. Não ensaie o que dizer a ela: apenas fique com a imagem dela enquanto o tom se sustenta.',
    },
    '741': {
        silaba: 'SOL',
        nome: 'A limpeza',
        origem: 'Quinta das Solfeggio originais.',
        tradicao: 'Expressão e desintoxicação — despejar o que estava contido.',
        intencao: 'Se algo está engasgado há semanas, este é o momento de dizer em voz alta, sozinho, antes de dizer a quem precisa ouvir.',
    },
    '852': {
        silaba: 'LA',
        nome: 'O retorno à ordem',
        origem: 'Sexta das Solfeggio originais.',
        tradicao: 'Reencontrar a própria ordem interna e ver a situação como ela é.',
        intencao: 'Escute com os olhos fechados e sem tarefa. É a frequência de quando você já sabe a resposta e está evitando encará-la.',
    },
    '963': {
        silaba: 'SI',
        nome: 'A coroa',
        origem: 'Sétima Solfeggio, acrescentada às seis originais.',
        tradicao: 'O alto da cabeça, a ligação com o que é maior que a própria história.',
        intencao: 'Não peça nada enquanto escuta. É a única das dez em que a instrução é ficar em silêncio por dentro.',
    },
};

export interface Chacra {
    /** Nome canônico em português. */
    nome: string;
    /** Nome em sânscrito. */
    sanscrito: string;
    /** Onde fica no corpo. */
    local: string;
    /** O que rege, em uma linha. */
    rege: string;
    /** Como notar que está fechado. */
    sinalDeBloqueio: string;
}

const CHACRAS: Record<string, Chacra> = {
    muladhara: {
        nome: 'Chacra Básico',
        sanscrito: 'Muladhara',
        local: 'Base da coluna',
        rege: 'Segurança, sustento, o direito de ocupar espaço.',
        sinalDeBloqueio: 'Ansiedade com dinheiro e com o futuro imediato; sono ruim.',
    },
    svadhisthana: {
        nome: 'Chacra Sacro',
        sanscrito: 'Svadhisthana',
        local: 'Abaixo do umbigo',
        rege: 'Prazer, criação, desejo, o corpo como fonte de vida.',
        sinalDeBloqueio: 'Nada dá vontade; a criatividade some junto com o desejo.',
    },
    manipura: {
        nome: 'Plexo Solar',
        sanscrito: 'Manipura',
        local: 'Boca do estômago',
        rege: 'Vontade, direção, a coragem de decidir sozinho.',
        sinalDeBloqueio: 'Ceder em tudo e sentir raiva depois; adiar a decisão que já está tomada.',
    },
    anahata: {
        nome: 'Chacra Cardíaco',
        sanscrito: 'Anahata',
        local: 'Centro do peito',
        rege: 'Afeto, perdão, a permissão de precisar de alguém.',
        sinalDeBloqueio: 'Cuidar de todo mundo e não deixar ninguém cuidar de você.',
    },
    vishuddha: {
        nome: 'Chacra Laríngeo',
        sanscrito: 'Vishuddha',
        local: 'Garganta',
        rege: 'Voz, verdade dita na hora certa, o que se escolhe calar.',
        sinalDeBloqueio: 'Frases ensaiadas que nunca são ditas; a garganta apertada em conversas difíceis.',
    },
    ajna: {
        nome: 'Terceiro Olho',
        sanscrito: 'Ajna',
        local: 'Entre as sobrancelhas',
        rege: 'Percepção, intuição, ver o padrão antes de ele se repetir.',
        sinalDeBloqueio: 'Confundir pressentimento com medo; pedir opinião para tudo.',
    },
    sahasrara: {
        nome: 'Chacra Coronário',
        sanscrito: 'Sahasrara',
        local: 'Topo da cabeça',
        rege: 'Sentido, pertencimento a algo maior que a própria biografia.',
        sinalDeBloqueio: 'Tudo funciona e nada importa.',
    },
};

/**
 * Reduz as treze grafias do JSON aos sete chacras.
 *
 * O arcanos.json escreve o mesmo centro de quatro modos — "Laringe", "Garganta",
 * "Laringeo" e "Laríngeo (Vishuddha)" — e "Coroa"/"Coronário" para Sahasrara.
 * Em vez de editar as vinte e duas entradas e correr o risco de divergirem de
 * novo, o nome em sânscrito entre parênteses serve de chave: é ele que está
 * consistente em todas elas.
 */
export function chacraDe(bruto?: string): Chacra | null {
    if (!bruto) return null;
    const texto = bruto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    for (const [chave, chacra] of Object.entries(CHACRAS)) {
        if (texto.includes(chave)) return chacra;
    }

    // Sem o sânscrito: cai no nome em português. "Plexo Solar/Cardíaco" resolve
    // pelo primeiro que aparecer, que é o regente principal da entrada.
    if (texto.includes('plexo') || texto.includes('solar')) return CHACRAS.manipura;
    if (texto.includes('cardiac') || texto.includes('coracao')) return CHACRAS.anahata;
    if (texto.includes('laring') || texto.includes('gargant')) return CHACRAS.vishuddha;
    if (texto.includes('coro')) return CHACRAS.sahasrara;
    if (texto.includes('frontal') || texto.includes('olho')) return CHACRAS.ajna;
    if (texto.includes('basic') || texto.includes('raiz')) return CHACRAS.muladhara;
    if (texto.includes('sacr') || texto.includes('umbilic')) return CHACRAS.svadhisthana;
    return null;
}

export function frequenciaDe(bruto?: string | number): Frequencia | null {
    if (bruto === undefined || bruto === null) return null;
    const chave = String(parseInt(String(bruto), 10));
    return FREQUENCIAS[chave] ?? null;
}
