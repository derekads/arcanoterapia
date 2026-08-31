// src/data/casasInterpretacao.ts

/**
 * INTERPRETAÇÃO DAS CASAS ASTROLÓGICAS
 *
 * As 12 casas eram desenhadas na roda e listadas nas cúspides com grau, signo
 * e amplitude — e nenhuma linha de texto explicando o que cada uma é. Não havia
 * conteúdo sobre casas em lugar nenhum do app.
 *
 * Aqui as 12 têm texto escrito, e planeta-em-casa é composto a partir da função
 * arquetípica que cada astro já tem em `aspectosInterpretacao.ts`: 15 astros ×
 * 12 casas dariam 180 textos avulsos, mas a combinação é regular o bastante
 * para ser construída sem perder especificidade.
 *
 * Registro: terapêutico, não preditivo. A casa é um TERRENO da vida, não um
 * prognóstico — descreve onde o tema se joga e o que ele cobra.
 */

import { ASTROS } from './aspectosInterpretacao';

export interface Casa {
    numero: number;
    /** Nome curto, para o cabeçalho. */
    titulo: string;
    /** O terreno da vida que essa casa governa. */
    area: string;
    /** A pergunta que a casa faz. Segunda pessoa. */
    pergunta: string;
    /** O que dá errado quando a casa é evitada. */
    sombra: string;
    /** Como o terreno se comporta — entra na composição de planeta-em-casa. */
    terreno: string;
}

export const CASAS: Record<number, Casa> = {
    1: {
        numero: 1, titulo: 'A Casa da Presença',
        area: 'O corpo, o rosto, a primeira impressão. Como você chega antes de dizer qualquer coisa — e o gesto automático que aparece quando você não está pensando em como aparecer.',
        pergunta: 'Quem você é quando ainda não teve tempo de se editar?',
        sombra: 'Confundir a máscara com o rosto, e passar a vida defendendo uma imagem que já não cabe em você.',
        terreno: 'na sua presença e no modo como você chega às pessoas',
    },
    2: {
        numero: 2, titulo: 'A Casa do Valor',
        area: 'Dinheiro, posses e — antes disso — o que você considera que vale a pena. Aqui mora a resposta corporal para "eu mereço?", que é anterior a qualquer planilha.',
        pergunta: 'O que você tem que não pode ser tirado de você?',
        sombra: 'Medir o próprio valor pelo que se acumulou, e nunca chegar num número que baste.',
        terreno: 'no que você valoriza e na sua relação com o que é seu',
    },
    3: {
        numero: 3, titulo: 'A Casa da Fala',
        area: 'Como você pensa, aprende e explica. Irmãos, vizinhos, o trajeto curto do dia a dia — o mundo que cabe a pé.',
        pergunta: 'Você está falando para ser entendido ou para não ser interrompido?',
        sombra: 'Coletar informação sem nunca deixar que ela mude você.',
        terreno: 'no seu jeito de pensar, aprender e se explicar',
    },
    4: {
        numero: 4, titulo: 'A Casa da Raiz',
        area: 'A casa onde você cresceu e a que você construiu. A família, a memória antiga, o lugar de onde você fala mesmo quando não percebe.',
        pergunta: 'O que da sua casa de origem você repete sem ter escolhido?',
        sombra: 'Chamar de segurança o que é só familiaridade, e ficar por medo de sair.',
        terreno: 'nas suas raízes, na sua casa e no que veio de antes de você',
    },
    5: {
        numero: 5, titulo: 'A Casa do Brilho',
        area: 'O que você cria e o que te dá prazer sem precisar de justificativa. Filhos, arte, jogo, romance — tudo que existe para ser feito e não para servir.',
        pergunta: 'O que você faria mesmo que ninguém aplaudisse?',
        sombra: 'Precisar de plateia para sentir que existiu, e transformar prazer em performance.',
        terreno: 'na sua criatividade, no seu prazer e no que você faz para brilhar',
    },
    6: {
        numero: 6, titulo: 'A Casa da Rotina',
        area: 'O trabalho de todo dia, a saúde, os hábitos pequenos. É onde a vida acontece de verdade — nas quartas-feiras comuns, não nas viradas.',
        pergunta: 'A sua rotina cuida de você ou só te mantém funcionando?',
        sombra: 'Confundir ser útil com ter valor, e adoecer provando que dá conta.',
        terreno: 'na sua rotina, no seu trabalho diário e no cuidado com o corpo',
    },
    7: {
        numero: 7, titulo: 'A Casa do Outro',
        area: 'Casamentos, sociedades, contratos — e também os inimigos declarados. Todo vínculo de igual para igual, onde alguém te olha de frente.',
        pergunta: 'O que você espera que o outro faça por você que ainda não fez por si?',
        sombra: 'Terceirizar no parceiro a parte de si que você não desenvolveu, e depois cobrar dele.',
        terreno: 'nos seus vínculos e no que você projeta no outro',
    },
    8: {
        numero: 8, titulo: 'A Casa da Entrega',
        area: 'O que se compartilha e não se divide: intimidade profunda, dinheiro do outro, heranças, perdas. É a casa das coisas que mudam você sem pedir licença.',
        pergunta: 'Do que você não fala com ninguém?',
        sombra: 'Controlar para não perder, e perder justamente por controlar.',
        terreno: 'na sua intimidade profunda e no que você faz com o que não controla',
    },
    9: {
        numero: 9, titulo: 'A Casa do Horizonte',
        area: 'Viagem longa, estudo superior, fé, estrangeiro. Tudo que amplia o mundo além do que você conheceu de perto.',
        pergunta: 'Em que você acredita porque investigou, e não porque te contaram?',
        sombra: 'Trocar de verdade absoluta em vez de aprender a viver sem uma.',
        terreno: 'na sua busca por sentido e no que amplia o seu mundo',
    },
    10: {
        numero: 10, titulo: 'A Casa da Obra',
        area: 'A carreira, a reputação, o que fica com o seu nome. O ponto mais alto do mapa: o que se vê de longe.',
        pergunta: 'Você está construindo a sua obra ou cumprindo a expectativa de alguém?',
        sombra: 'Chegar ao topo de uma escada apoiada na parede errada.',
        terreno: 'na sua vocação e no que você constrói aos olhos do mundo',
    },
    11: {
        numero: 11, titulo: 'A Casa do Coletivo',
        area: 'Amigos, grupos, causas, o futuro que você quer ver. As pessoas que você escolheu, ao contrário da família que veio dada.',
        pergunta: 'O grupo em que você está te faz crescer ou só te faz caber?',
        sombra: 'Diluir-se no grupo e chamar isso de pertencimento.',
        terreno: 'nos seus grupos, nas suas amizades e no futuro que você projeta',
    },
    12: {
        numero: 12, titulo: 'A Casa do Recolhimento',
        area: 'O que fica fora do foco: o inconsciente, os sonhos, o que você faz sozinho e não mostra. Também o que sabota por baixo, sem você ver.',
        pergunta: 'O que em você age quando você não está prestando atenção?',
        sombra: 'Fugir do silêncio, e ser governado justamente pelo que se recusa a olhar.',
        terreno: 'no seu mundo interno e no que age em você fora do seu campo de visão',
    },
};

/** Como o signo na cúspide colore o terreno da casa. */
const SIGNO_NA_CUSPIDE: Record<string, string> = {
    'Áries':       'Você entra nesse terreno de frente e sem ensaio. Começa bem; termina com dificuldade.',
    'Touro':       'Você ocupa esse terreno devagar e não larga. Constrói firme; muda tarde.',
    'Gêmeos':      'Você percorre esse terreno por muitos caminhos ao mesmo tempo. Ganha variedade; perde profundidade.',
    'Câncer':      'Você habita esse terreno pelo afeto e pela memória. Protege bem; solta mal.',
    'Leão':        'Você ocupa esse terreno com presença e quer ser visto nele. Aquece; precisa de resposta.',
    'Virgem':      'Você trabalha esse terreno no detalhe e no ajuste. Aperfeiçoa; e às vezes não entrega.',
    'Libra':       'Você negocia esse terreno buscando equilíbrio e companhia. Harmoniza; adia o confronto.',
    'Escorpião':   'Você mergulha nesse terreno até o fundo, sem meio-termo. Transforma; e controla demais.',
    'Sagitário':   'Você amplia esse terreno e procura sentido nele. Expande; e às vezes se dispersa.',
    'Capricórnio': 'Você leva esse terreno a sério e assume a responsabilidade. Estrutura; e se cobra além da conta.',
    'Aquário':     'Você trata esse terreno de um jeito próprio, fora do manual. Inova; e se distancia.',
    'Peixes':      'Você entra nesse terreno pela sensibilidade, sem fronteira nítida. Intui; e se perde.',
};

/** O texto da casa em si, com o signo da cúspide quando conhecido. */
export function interpretarCasa(numero: number, signoDaCuspide?: string): string {
    const casa = CASAS[numero];
    if (!casa) return '';
    const cor = signoDaCuspide ? SIGNO_NA_CUSPIDE[signoDaCuspide] : undefined;
    return cor ? `${casa.area} ${cor}` : casa.area;
}

/**
 * Um astro na casa. Composto a partir da função arquetípica do astro e do
 * terreno da casa — 180 combinações sem 180 textos avulsos.
 */
export function interpretarAstroNaCasa(astro: string, numeroDaCasa: number): string {
    const casa = CASAS[numeroDaCasa];
    const a = ASTROS[astro];
    if (!casa || !a) return '';
    return `${cap(a.funcao)} se joga ${casa.terreno}. É aí que o tema de ${a.nucleo} pede a sua atenção primeiro.`;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
