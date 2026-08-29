import { Afirmacao, TipoAfirmacao } from '../types';
import { getArcanoByNumero } from './arcanos';

export const AFFIRMATIONS: Record<number, Afirmacao[]> = {
    1: [ // O Mago
        { id: 'af-1-1', arcanoId: 1, tipo: 'MANHA', texto: 'Eu tenho todas as ferramentas necessárias para criar a vida que desejo. Hoje eu escolho o foco.' },
        { id: 'af-1-2', arcanoId: 1, tipo: 'MANHA', texto: 'Minha mente é clara, minha intenção é firme. Eu manifesto com consciência e propósito.' },
        { id: 'af-1-3', arcanoId: 1, tipo: 'NOITE', texto: 'Hoje eu honrei meu potencial. Eu descanso sabendo que amanhã posso ir mais fundo.' },
        { id: 'af-1-4', arcanoId: 1, tipo: 'NOITE', texto: 'Eu solto a necessidade de controlar tudo. O silêncio me regenera e renova minha criatividade.' },
        { id: 'af-1-5', arcanoId: 1, tipo: 'CRISIS', texto: 'O caos é apenas matéria-prima. Eu tenho a habilidade de transformar qualquer situação em oportunidade.' },
        { id: 'af-1-6', arcanoId: 1, tipo: 'PROSPERIDADE', texto: 'Minha versatilidade é minha riqueza. Cada habilidade que cultivo abre uma nova porta de abundância.' },
        { id: 'af-1-7', arcanoId: 1, tipo: 'AMOR', texto: 'Eu me comunico com clareza e ouço com atenção. Meus relacionamentos se aprofundam quando sou verdadeiro.' },
    ],
    2: [ // A Sacerdotisa
        { id: 'af-2-1', arcanoId: 2, tipo: 'MANHA', texto: 'Minha intuição é minha bússola mais confiável. Eu confio no que sinto, mesmo quando não consigo explicar.' },
        { id: 'af-2-2', arcanoId: 2, tipo: 'MANHA', texto: 'Eu sou completa sozinha. Minha força nasce do meu silêncio interior, não da aprovação alheia.' },
        { id: 'af-2-3', arcanoId: 2, tipo: 'NOITE', texto: 'Hoje eu agi com coragem. Cada pequena ação minha afasta a inércia e me traz mais perto de quem eu sou.' },
        { id: 'af-2-4', arcanoId: 2, tipo: 'NOITE', texto: 'Eu solto as mágoas do dia. Meus sonhos trarão as respostas que preciso para o amanhã.' },
        { id: 'af-2-5', arcanoId: 2, tipo: 'CRISIS', texto: 'O medo é apenas uma ilusão do meu ego. Minha alma já sabe o caminho — eu confio nela.' },
        { id: 'af-2-6', arcanoId: 2, tipo: 'PROSPERIDADE', texto: 'Minha receptividade atrai as oportunidades certas no momento certo. Eu mereço receber sem culpa.' },
        { id: 'af-2-7', arcanoId: 2, tipo: 'AMOR', texto: 'Eu me amo antes de buscar amor no outro. Minha plenitude atrai relações de igualdade e respeito.' },
    ],
    3: [ // A Imperatriz
        { id: 'af-3-1', arcanoId: 3, tipo: 'MANHA', texto: 'Eu sou o canal da beleza e da abundância. Tudo que toco floresce porque eu nutro com amor genuíno.' },
        { id: 'af-3-2', arcanoId: 3, tipo: 'MANHA', texto: 'Minha criatividade é inesgotável quando eu a dirijo com disciplina e amor.' },
        { id: 'af-3-3', arcanoId: 3, tipo: 'NOITE', texto: 'Hoje eu criei com intenção e sustentei com amor. Eu me permito descansar sem culpa.' },
        { id: 'af-3-4', arcanoId: 3, tipo: 'NOITE', texto: 'Eu solto a necessidade de possuir. O que é verdadeiramente meu permanece por vontade própria.' },
        { id: 'af-3-5', arcanoId: 3, tipo: 'CRISIS', texto: 'Minha tempestade interior é apenas a energia criativa buscando direção. Eu a canalizo, não a reprimo.' },
        { id: 'af-3-6', arcanoId: 3, tipo: 'PROSPERIDADE', texto: 'A abundância flui naturalmente quando eu paro de forçar e começo a confiar no meu magnetismo.' },
        { id: 'af-3-7', arcanoId: 3, tipo: 'AMOR', texto: 'Eu amo sem correntes. Minha presença é o presente mais valioso que posso oferecer a quem amo.' },
    ],
    4: [ // O Imperador
        { id: 'af-4-1', arcanoId: 4, tipo: 'MANHA', texto: 'Eu governo minha vida com sabedoria e abro meu coração para a flexibilidade que me faz humano.' },
        { id: 'af-4-2', arcanoId: 4, tipo: 'MANHA', texto: 'Minha força real está na minha capacidade de ser vulnerável quando necessário.' },
        { id: 'af-4-3', arcanoId: 4, tipo: 'NOITE', texto: 'Hoje eu liderei com compaixão. Eu descanso sabendo que é seguro soltar o controle.' },
        { id: 'af-4-4', arcanoId: 4, tipo: 'NOITE', texto: 'Eu não preciso carregar o mundo sozinho. Delegar é sabedoria, não fraqueza.' },
        { id: 'af-4-5', arcanoId: 4, tipo: 'CRISIS', texto: 'A verdadeira autoridade vem da calma interior. Eu respiro antes de reagir e ajo com inteligência.' },
        { id: 'af-4-6', arcanoId: 4, tipo: 'PROSPERIDADE', texto: 'Eu construo impérios que servem à vida, não ao ego. Minha riqueza é medida pelo que ergo para outros.' },
        { id: 'af-4-7', arcanoId: 4, tipo: 'AMOR', texto: 'Eu protejo sem prender. Meu amor é um castelo com portas abertas, não uma fortaleza com muros.' },
    ],
    5: [ // O Papa
        { id: 'af-5-1', arcanoId: 5, tipo: 'MANHA', texto: 'Eu ensino o que vivo e aprendo com o que observo. Minha sabedoria nasce da coerência.' },
        { id: 'af-5-2', arcanoId: 5, tipo: 'MANHA', texto: 'Eu sou eterno aprendiz. Cada pessoa que encontro tem algo sagrado para me ensinar.' },
        { id: 'af-5-3', arcanoId: 5, tipo: 'NOITE', texto: 'Hoje eu pratiquei a humildade de não saber. Isso me tornou mais sábio do que qualquer livro.' },
        { id: 'af-5-4', arcanoId: 5, tipo: 'NOITE', texto: 'Eu solto o julgamento. Cada ser humano carrega uma verdade que merece ser ouvida.' },
        { id: 'af-5-5', arcanoId: 5, tipo: 'CRISIS', texto: 'Quando minhas crenças são abaladas, é porque algo maior quer nascer. Eu me abro para a nova verdade.' },
        { id: 'af-5-6', arcanoId: 5, tipo: 'PROSPERIDADE', texto: 'A verdadeira riqueza é a sabedoria que compartilho. Quanto mais ensino, mais aprendo e recebo.' },
        { id: 'af-5-7', arcanoId: 5, tipo: 'AMOR', texto: 'Eu amo sem pregar. Minha presença silenciosa é o ensino mais poderoso que posso oferecer.' },
    ],
    22: [ // O Louco (0)
        { id: 'af-22-1', arcanoId: 22, tipo: 'MANHA', texto: 'Eu pulo com fé no desconhecido e confio que a vida me sustentará. Cada passo é uma aventura sagrada.' },
        { id: 'af-22-2', arcanoId: 22, tipo: 'MANHA', texto: 'Minha liberdade é responsável. Eu danço com a vida e honro cada promessa que faço.' },
        { id: 'af-22-3', arcanoId: 22, tipo: 'NOITE', texto: 'Hoje eu vivi com espontaneidade e coragem. Eu descanso grato pela aventura deste dia.' },
        { id: 'af-22-4', arcanoId: 22, tipo: 'NOITE', texto: 'Eu solto a necessidade de ter tudo resolvido. O mistério é parte da beleza da vida.' },
        { id: 'af-22-5', arcanoId: 22, tipo: 'CRISIS', texto: 'A queda é apenas o início de um novo salto. Eu me levanto com a mesma fé que me fez pular.' },
        { id: 'af-22-6', arcanoId: 22, tipo: 'PROSPERIDADE', texto: 'Meu desprendimento atrai tudo que preciso. O universo reconhece quem confia e se move.' },
        { id: 'af-22-7', arcanoId: 22, tipo: 'AMOR', texto: 'Eu amo com liberdade e presença. Eu me comprometo sem me perder, e me entrego sem me anular.' },
    ]
};

const TIPO_MAP: Record<string, TipoAfirmacao> = {
    manha: 'MANHA', noite: 'NOITE', crise: 'CRISIS',
    prosperidade: 'PROSPERIDADE', amor: 'AMOR',
};

export function getAffirmationsForArcano(arcanoId: number): Afirmacao[] {
    if (AFFIRMATIONS[arcanoId]) {
        return AFFIRMATIONS[arcanoId];
    }
    // Fallback: convert arcanos.json afirmacoes to Afirmacao format
    const arcano = getArcanoByNumero(arcanoId);
    if (!arcano || !arcano.afirmacoes) return [];
    return Object.entries(arcano.afirmacoes).map(([key, texto], idx) => ({
        id: `af-${arcanoId}-${idx + 1}`,
        arcanoId,
        tipo: TIPO_MAP[key] || 'MANHA' as TipoAfirmacao,
        texto: texto as string,
    }));
}

/**
 * Embaralhamento determinístico.
 *
 * O critério anterior era `id.charCodeAt(3)`: no id `af-13-2`, a posição 3 é o
 * PRIMEIRO DÍGITO DO ARCANO, igual para todas as afirmações do mesmo arcano.
 * Com todas as chaves idênticas a ordenação não trocava nada — as "afirmações
 * do dia" eram sempre as três primeiras, no mesmo dia e em qualquer outro, e o
 * botão de sortear não fazia efeito nenhum.
 *
 * Agora o hash percorre o id inteiro junto com a semente, então cada afirmação
 * recebe uma chave própria.
 */
function embaralharComSemente<T extends { id: string }>(itens: T[], semente: number): T[] {
    const chave = (id: string) => {
        let h = semente >>> 0;
        for (let i = 0; i < id.length; i++) {
            h = (Math.imul(h ^ id.charCodeAt(i), 0x01000193)) >>> 0;
        }
        return h;
    };
    return [...itens].sort((a, b) => chave(a.id) - chave(b.id));
}

/**
 * As afirmações do dia.
 *
 * @param variacao muda o sorteio sem esperar o dia seguinte — é o que o botão
 *                 de recarregar da tela incrementa.
 */
export function getDailyAffirmations(arcanoId: number, count: number = 3, variacao = 0): Afirmacao[] {
    const all = getAffirmationsForArcano(arcanoId);
    if (all.length === 0) return [];

    // A data entra como número (20260829), não como soma dos campos: somar
    // fazia 2026+08+29 e 2026+09+28 caírem na mesma semente.
    const hoje = new Date();
    const dia = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
    const semente = dia + arcanoId * 7919 + variacao * 104729;

    return embaralharComSemente(all, semente).slice(0, count);
}
