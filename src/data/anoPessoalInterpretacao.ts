// src/data/anoPessoalInterpretacao.ts

/**
 * O ENCONTRO ENTRE O ARCANO PESSOAL E O ARCANO DO ANO
 *
 * A previsão do ano era lida isolada, como se a pessoa não tivesse arcano
 * pessoal. O modal abria a carta do ano com tema, conselho, amor, carreira e
 * saúde — e nenhuma palavra sobre QUEM está vivendo aquele ano. O mesmo texto
 * para O Eremita e para O Sol atravessando um ano de A Torre.
 *
 * O app já faz esse cruzamento para o DIA: `matrix_arcano_day.json` tem as 484
 * combinações de arcano pessoal × arcano do dia. Para o ano não existia nada.
 *
 * Aqui as 484 leituras são compostas a partir de 44 peças: o que cada arcano
 * PEDE quando é o ano, e o que cada arcano DÁ quando é a pessoa. A combinação
 * nomeia a aliança ou a fricção entre os dois — que é a análise que interessa.
 *
 * Registro terapêutico: descreve a tensão e o que ela pede, nunca prevê evento.
 */

interface Face {
    /** O que este arcano exige de quem atravessa um ano sob ele. */
    pede: string;
    /** O recurso que este arcano dá a quem o carrega como arcano pessoal. */
    da: string;
    /** O reflexo automático desta pessoa sob pressão — onde a fricção nasce. */
    reflexo: string;
}

export const FACES: Record<number, Face> = {
    1:  { pede: 'que você comece, com o que tem na mão',
          da: 'iniciativa e repertório para improvisar',
          reflexo: 'começar mais coisas do que consegue terminar' },
    2:  { pede: 'que você espere e escute antes de agir',
          da: 'intuição e capacidade de guardar segredo',
          reflexo: 'se recolher e chamar isso de prudência' },
    3:  { pede: 'que você crie e nutra o que criou',
          da: 'fertilidade e prazer no processo',
          reflexo: 'cuidar de tudo e de todos antes de si' },
    4:  { pede: 'que você assuma o comando e ponha ordem',
          da: 'autoridade e capacidade de estruturar',
          reflexo: 'endurecer quando deveria escutar' },
    5:  { pede: 'que você se alinhe a algo maior que você',
          da: 'sabedoria transmissível e senso de tradição',
          reflexo: 'obedecer a uma regra que já não serve' },
    6:  { pede: 'que você escolha, e sustente a escolha',
          da: 'capacidade de unir opostos sem anular nenhum',
          reflexo: 'adiar a decisão esperando a certeza' },
    7:  { pede: 'que você avance com direção definida',
          da: 'foco e domínio sobre o próprio impulso',
          reflexo: 'acelerar para não sentir' },
    8:  { pede: 'que você acerte as contas e diga a verdade',
          da: 'clareza e senso de medida',
          reflexo: 'julgar antes de compreender' },
    9:  { pede: 'que você se recolha para encontrar o essencial',
          da: 'profundidade e autonomia interna',
          reflexo: 'se isolar quando deveria pedir ajuda' },
    10: { pede: 'que você se mova junto com o ciclo, sem travar',
          da: 'leitura de timing e tolerância à mudança',
          reflexo: 'esperar a sorte em vez de se posicionar' },
    11: { pede: 'que você sustente o difícil com gentileza',
          da: 'coragem paciente e domínio do próprio instinto',
          reflexo: 'engolir a raiva até ela sair inteira' },
    12: { pede: 'que você pare e olhe de outro ângulo',
          da: 'capacidade de entregar sem se perder',
          reflexo: 'transformar espera em martírio' },
    13: { pede: 'que você deixe morrer o que já acabou',
          da: 'coragem para atravessar finais',
          reflexo: 'reanimar o que já passou da hora' },
    14: { pede: 'que você encontre a dose certa entre extremos',
          da: 'capacidade de misturar sem se dissolver',
          reflexo: 'curar os outros para não olhar para si' },
    15: { pede: 'que você encare a corrente que você mesmo forjou',
          da: 'força de desejo e honestidade com a própria sombra',
          reflexo: 'chamar de prazer o que já virou vício' },
    16: { pede: 'que você deixe cair o que não era firme',
          da: 'capacidade de reconstruir do zero',
          reflexo: 'defender a estrutura mesmo rachada' },
    17: { pede: 'que você confie de novo, depois do estrago',
          da: 'esperança que sobrevive ao pior',
          reflexo: 'confundir fé com negação do que dói' },
    18: { pede: 'que você atravesse o que não dá para ver com clareza',
          da: 'sensibilidade fina para o que não foi dito',
          reflexo: 'tomar o próprio medo por intuição' },
    19: { pede: 'que você apareça inteiro, sem se encolher',
          da: 'vitalidade e alegria que aquece quem chega perto',
          reflexo: 'forçar o brilho quando devia descansar' },
    20: { pede: 'que você responda a um chamado que já ouviu',
          da: 'capacidade de recomeçar absolvido',
          reflexo: 'ficar no tribunal em vez de atender' },
    21: { pede: 'que você conclua e integre o que aprendeu',
          da: 'visão de conjunto e senso de completude',
          reflexo: 'estudar mais para não ter que entregar' },
    22: { pede: 'que você salte sem garantia de onde vai cair',
          da: 'liberdade e disposição para o desconhecido',
          reflexo: 'trocar de rota antes de terminar a atual' },
};

export interface LeituraDoAno {
    /** Uma frase que nomeia o encontro. */
    titulo: string;
    /** O que o ano está pedindo de você especificamente. */
    encontro: string;
    /** Onde a fricção provavelmente aparece. */
    atrito: string;
    /** O que fazer com isso. */
    caminho: string;
    /** true quando pessoa e ano são o mesmo arcano. */
    mesmoArcano: boolean;
}

/**
 * A leitura do ano para ESTA pessoa.
 *
 * @param arcanoPessoal  número do arcano do nome (1 a 22)
 * @param arcanoDoAno    número do arcano do ano corrente (1 a 22)
 * @param nomePessoal    nome do arcano pessoal, para a frase ficar legível
 * @param nomeDoAno      nome do arcano do ano
 */
export function lerAnoPessoal(
    arcanoPessoal: number,
    arcanoDoAno: number,
    nomePessoal: string,
    nomeDoAno: string
): LeituraDoAno | null {
    const eu = FACES[arcanoPessoal];
    const ano = FACES[arcanoDoAno];
    if (!eu || !ano) return null;

    if (arcanoPessoal === arcanoDoAno) {
        return {
            titulo: `${nomePessoal} vivendo o próprio ano`,
            encontro: `O ano pede exatamente aquilo que você já é: ${ano.pede}. Não há tradução a fazer entre quem você é e o que o ciclo cobra — os dois falam a mesma língua.`,
            atrito: `O risco de um ano assim não é a dificuldade, é o excesso. Sem um contraponto puxando para o outro lado, ${eu.reflexo} deixa de ser um deslize ocasional e vira o modo padrão.`,
            caminho: `Use ${eu.da} sem economia, mas escolha alguém ou alguma prática que te devolva a medida. Ano sem atrito é ano sem freio.`,
            mesmoArcano: true,
        };
    }

    return {
        titulo: `${nomePessoal} atravessando um ano de ${nomeDoAno}`,
        encontro: `Este ano pede ${ano.pede}. Você chega nele com ${eu.da} — esse é o seu ponto de partida, e é dele que a leitura do ano tem que sair.`,
        atrito: `A fricção aparece quando o ano cobra e o seu reflexo automático responde primeiro: ${eu.reflexo}. Não é defeito de caráter, é o atalho que funcionou antes e que este ciclo não aceita mais.`,
        caminho: `O ano não vai te pedir para deixar de ser ${nomePessoal}. Vai pedir que ${eu.da} sirva ao que ${nomeDoAno} exige — ${ano.pede} — em vez de servir ao atalho de sempre.`,
        mesmoArcano: false,
    };
}
