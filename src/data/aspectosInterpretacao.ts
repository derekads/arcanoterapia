// src/data/aspectosInterpretacao.ts

/**
 * INTERPRETAÇÃO DOS ASPECTOS DO MAPA
 *
 * A tabela de aspectos mostrava glifo, tipo e orbe — e nenhum texto. O usuário
 * lia "Sol ☍ Lua · orbe 4,02°" e ficava sem saber o que aquilo significa.
 *
 * Existia um `aspectData.ts` com 4 interpretações, mas eram exatamente os 4
 * aspectos de uma tela de demonstração com dados falsos (`MOCK_ASPECTS`), e o
 * componente que os usava está órfão. O texto de reserva de lá imprimia o nome
 * do planeta em INGLÊS MAIÚSCULO — "arquétipo de SUN com a energia de MOON" —
 * num app em português.
 *
 * Aqui a cobertura é completa por construção. Cada astro tem uma função
 * arquetípica e um verbo; cada tipo de aspecto tem uma dinâmica. Combinando os
 * dois, qualquer par recebe um texto específico e em português. Por cima disso,
 * os pares mais lidos de um mapa — os que envolvem os astros pessoais — têm
 * texto escrito à mão, que tem precedência.
 *
 * Registro: terapêutico, não preditivo. Descreve a tensão interna que o aspecto
 * cria e o que ele pede de integração, nunca "o que vai acontecer".
 */

/** Função arquetípica de cada astro, na voz que o app usa. */
interface Astro {
    /** O que esse astro quer. Entra como sujeito da frase. */
    funcao: string;
    /** A necessidade em uma palavra ou duas, para as frases curtas. */
    nucleo: string;
}

export const ASTROS: Record<string, Astro> = {
    'Sol':        { funcao: 'a vontade de ser quem você é',            nucleo: 'identidade' },
    'Lua':        { funcao: 'a necessidade de se sentir seguro',       nucleo: 'segurança emocional' },
    'Mercúrio':   { funcao: 'o modo como você pensa e se explica',     nucleo: 'raciocínio' },
    'Vênus':      { funcao: 'o que você valoriza e como se vincula',   nucleo: 'afeto' },
    'Marte':      { funcao: 'a força com que você age e se defende',   nucleo: 'ação' },
    'Júpiter':    { funcao: 'o impulso de crescer e dar sentido',      nucleo: 'expansão' },
    'Saturno':    { funcao: 'a exigência de estrutura e limite',       nucleo: 'responsabilidade' },
    'Urano':      { funcao: 'a urgência de romper e ser livre',        nucleo: 'liberdade' },
    'Netuno':     { funcao: 'a vontade de dissolver fronteiras',       nucleo: 'entrega' },
    'Plutão':     { funcao: 'a pressão que exige transformação',       nucleo: 'poder' },
    'Nó Norte':   { funcao: 'a direção que ainda não é confortável',   nucleo: 'crescimento' },
    'Lilith':     { funcao: 'a parte de você que se recusa a caber',   nucleo: 'recusa' },
    'Quíron':     { funcao: 'a ferida que também é a sua competência', nucleo: 'cura' },
    'Ascendente': { funcao: 'a forma como você chega às pessoas',      nucleo: 'presença' },
    'MC':         { funcao: 'o que você quer construir aos olhos do mundo', nucleo: 'vocação' },
};

/** A dinâmica de cada tipo de aspecto, como um molde de frase. */
type Molde = (a: Astro, b: Astro) => string;

const MOLDES: Record<string, Molde> = {
    'Conjunção': (a, b) =>
        `${cap(a.funcao)} e ${b.funcao} ocupam o mesmo lugar em você e agem sempre juntas — é difícil sentir uma sem a outra. ` +
        `A força está na intensidade; o risco é confundir ${a.nucleo} com ${b.nucleo} e nunca saber qual das duas está falando. ` +
        `Integrar aqui é aprender a separar as vozes sem calar nenhuma.`,

    'Oposição': (a, b) =>
        `${cap(a.funcao)} e ${b.funcao} puxam para lados contrários, e você tende a viver um lado por vez, alternando. ` +
        `O que aparece nos relacionamentos é geralmente o polo que você não assumiu. ` +
        `Integrar aqui não é escolher um: é sustentar os dois ao mesmo tempo até que deixem de se anular.`,

    'Quadratura': (a, b) =>
        `${cap(a.funcao)} atrapalha ${b.funcao} — toda vez que uma avança, a outra cobra o preço. ` +
        `É o atrito que mais incomoda e o que mais constrói: a fricção obriga você a desenvolver competência real, não talento fácil. ` +
        `Integrar aqui é parar de tratar como defeito o que é, na verdade, o seu motor.`,

    'Trígono': (a, b) =>
        `${cap(a.funcao)} e ${b.funcao} correm juntas sem esforço — é um talento tão natural que você provavelmente nem o percebe como talento. ` +
        `A facilidade é a bênção e a armadilha: o que flui sozinho raramente é trabalhado. ` +
        `Integrar aqui é usar de propósito o que já vem de graça.`,

    'Sextil': (a, b) =>
        `${cap(a.funcao)} e ${b.funcao} cooperam bem, mas só quando você toma a iniciativa — é uma porta destrancada que ninguém abre por você. ` +
        `Não há atrito nem urgência aqui, e por isso é o aspecto mais fácil de desperdiçar. ` +
        `Integrar é transformar em prática o que hoje é só possibilidade.`,
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Astro desconhecido não derruba a tela. */
const GENERICO: Astro = { funcao: 'essa força do seu mapa', nucleo: 'esse tema' };

/**
 * Textos escritos à mão para os pares mais lidos de um mapa.
 *
 * A chave é `AstroA|Tipo|AstroB` com os astros em ordem alfabética, porque o
 * aspecto é simétrico: Sol–Lua e Lua–Sol são o mesmo aspecto e devem devolver
 * o mesmo texto.
 */
export const ASPECTOS_ESCRITOS: Record<string, string> = {
    // ── Sol e Lua: o eixo da identidade ───────────────────────────
    'Lua|Conjunção|Sol': 'Quem você é e o que você sente nasceram colados. Isso dá uma presença inteira, sem fissura entre a vontade e a emoção — e a dificuldade de enxergar-se de fora, porque não há distância entre você e o que sente. Integrar é criar essa distância sem se dividir.',
    'Lua|Oposição|Sol': 'A vontade de se afirmar e a necessidade de se acolher pedem coisas opostas: uma quer avançar, a outra quer descansar. Você tende a viver uma de cada vez, e a que fica de fora reaparece como cansaço ou culpa. Integrar é dar horário às duas, no mesmo dia.',
    'Lua|Quadratura|Sol': 'Toda vez que você age como quer, sente que traiu o que precisa — e vice-versa. É um desconforto antigo, geralmente herdado de casa, entre ser aprovado e ser você. A fricção constrói autoconhecimento real, mas só quando você para de escolher em segredo.',
    'Lua|Trígono|Sol': 'Sua emoção sustenta a sua vontade em vez de atrapalhá-la. Você decide e o corpo concorda. É uma paz interna tão constante que costuma passar despercebida — e é justamente ela que permite você sustentar decisões difíceis por mais tempo que os outros.',
    'Lua|Sextil|Sol': 'Vontade e sentimento conversam bem quando você para para ouvir. Não vêm juntos automaticamente: precisam de um instante de silêncio para se alinharem. Quem pratica esse instante decide melhor; quem não pratica nem percebe que tinha essa opção.',

    // ── Sol e Saturno: o eixo do valor próprio ────────────────────
    'Saturno|Conjunção|Sol': 'Você cresceu levando a si mesmo a sério cedo demais. Há uma seriedade que é força real e um peso que não era seu para carregar. A maturidade veio antes da hora; a leveza é a que ainda está sendo aprendida.',
    'Saturno|Oposição|Sol': 'Você se afirma e alguma autoridade — de fora ou dentro da sua cabeça — responde que ainda não basta. A voz que cobra costuma ter o rosto de alguém que já foi embora. Integrar é distinguir a exigência que te constrói da que só te trava.',
    'Saturno|Quadratura|Sol': 'Cada avanço seu vem acompanhado da sensação de não merecer. É o aspecto que mais fabrica impostores competentes: você entrega bem e não acredita na entrega. O atrito, trabalhado, vira solidez que ninguém tira.',
    'Saturno|Trígono|Sol': 'Você tem disciplina sem sofrimento — consegue sustentar o que começou sem que isso custe a alma. É uma competência silenciosa que os outros invejam e você acha normal. Usada de propósito, é o que te faz terminar o que a maioria abandona.',
    'Saturno|Sextil|Sol': 'A estrutura está disponível quando você a chama. Não vem sozinha: se você não impuser a forma, ela não se impõe. É um aspecto de quem pode ser organizado, não de quem já é.',

    // ── Vênus e Marte: o eixo do desejo ───────────────────────────
    'Marte|Conjunção|Vênus': 'Desejar e agir são a mesma coisa em você. Há magnetismo e franqueza no afeto, sem rodeio — e pouca paciência para o tempo lento de quem se aproxima devagar. Integrar é aprender que esperar também é uma forma de querer.',
    'Marte|Oposição|Vênus': 'O que você quer e o modo como vai buscar vivem em desacordo: ou você se contém e não é visto, ou avança e assusta. O parceiro costuma carregar o polo que falta. Integrar é conseguir desejar sem se anular nem atropelar.',
    'Marte|Quadratura|Vênus': 'Você briga onde queria se aproximar. O afeto e a agressividade se atrapalham, e a intimidade vira campo de disputa — muitas vezes por coisas pequenas. Trabalhado, esse atrito vira a capacidade rara de discordar sem romper.',
    'Marte|Trígono|Vênus': 'Você consegue querer e ir atrás sem que uma coisa estrague a outra. Há uma naturalidade no desejo que dispensa estratégia. Como não custa nada, raramente é usada de propósito — e podia ser.',
    'Marte|Sextil|Vênus': 'Afeto e iniciativa cooperam quando você dá o primeiro passo. Ninguém dá por você. É o aspecto de quem tem charme disponível e às vezes esquece de sacá-lo.',

    // ── Lua e Saturno: o eixo do acolhimento ──────────────────────
    'Lua|Conjunção|Saturno': 'Você aprendeu cedo a não precisar. A autossuficiência emocional é real e também é uma cerca: protege e isola na mesma medida. Integrar é descobrir que pedir não desmonta a estrutura.',
    'Lua|Oposição|Saturno': 'A necessidade de afeto e a exigência de dar conta se alternam: ou você se permite sentir e se acha frágil, ou endurece e se sente só. Integrar é parar de tratar carência como falha de caráter.',
    'Lua|Quadratura|Saturno': 'Sentir custa. Toda emoção passa por uma alfândega interna que pergunta se aquilo é razoável antes de deixar entrar. O atrito, elaborado, gera uma solidez emocional que quem não sofreu isso não tem.',
    'Lua|Trígono|Saturno': 'Você é o porto seguro dos outros sem esforço. Sua emoção tem estrutura: sente sem desabar. É tão constante que ninguém nota — inclusive você.',
    'Lua|Sextil|Saturno': 'Você consegue dar forma ao que sente quando decide fazê-lo. Escrever, nomear, organizar a emoção funciona bem aqui — mas só se você começar.',

    // ── Mercúrio e Saturno: o eixo do pensamento ──────────────────
    'Mercúrio|Conjunção|Saturno': 'Você pensa devagar e fundo. A lentidão foi lida como limitação em algum momento da sua vida, e não era: é profundidade. O que você conclui, conclui para valer.',
    'Mercúrio|Quadratura|Saturno': 'A dúvida chega antes da ideia terminar de nascer. Você se autocensura no meio da frase, e o que sai é sempre menos do que pensou. Trabalhado, vira rigor — e rigor é raro.',
    'Mercúrio|Oposição|Saturno': 'Sua mente quer se soltar e alguma voz responde que precisa provar primeiro. Você alterna entre falar demais e emudecer. Integrar é falar sem pedir licença e sem atropelar.',
    'Mercúrio|Trígono|Saturno': 'Você organiza o pensamento sem esforço: consegue explicar com clareza o que os outros embaralham. É uma competência de ensino que costuma ficar sem uso.',
    'Mercúrio|Sextil|Saturno': 'A clareza está disponível quando você senta para estruturar. Não vem no improviso, vem no papel.',

    // ── Sol e Plutão: o eixo do poder ─────────────────────────────
    'Plutão|Conjunção|Sol': 'Você não passa despercebido nem quando tenta. Há uma intensidade que atrai e ameaça na mesma proporção, e um tema de controle que atravessa a vida inteira. Integrar é usar essa força sem precisar dominar ninguém.',
    'Plutão|Quadratura|Sol': 'Toda vez que você se afirma, alguma coisa desaba — às vezes por fora, às vezes por dentro. É o aspecto das reinvenções sucessivas. O atrito é brutal e produz gente que sabe recomeçar como poucos.',
    'Plutão|Oposição|Sol': 'Você encontra o seu poder projetado em pessoas fortes demais, e disputa com elas o que ainda não assumiu. Integrar é parar de terceirizar a própria intensidade.',
    'Plutão|Trígono|Sol': 'Você se regenera sem drama. Passa por perdas que derrubariam outros e volta inteiro. É tão natural que você subestima o quanto isso é incomum.',
    'Plutão|Sextil|Sol': 'A capacidade de se transformar está à mão, mas exige que você olhe para o que prefere não olhar. Nada aqui acontece por acaso.',

    // ── Lua e Netuno: o eixo da permeabilidade ────────────────────
    'Lua|Conjunção|Netuno': 'Você sente o que está no ambiente antes de saber que sentiu. É empatia de alta precisão e também porta aberta demais: nem tudo que passa por você é seu. Integrar é aprender a fechar a porta sem se endurecer.',
    'Lua|Quadratura|Netuno': 'A fronteira entre a sua emoção e a dos outros não fecha direito. Você se confunde, absorve, e depois não sabe de onde veio o cansaço. Trabalhado, vira uma sensibilidade que percebe o que ninguém verbalizou.',
    'Lua|Oposição|Netuno': 'Ou você se protege e endurece, ou se abre e se dissolve no outro. Integrar é descobrir que dá para sentir junto sem virar a mesma pessoa.',
    'Lua|Trígono|Netuno': 'Sua imaginação e sua emoção conversam sem atrito. Sonho, arte e cuidado vêm do mesmo lugar em você, e vêm fácil.',
    'Lua|Sextil|Netuno': 'A sensibilidade está disponível quando você desacelera. Em ritmo acelerado ela simplesmente não aparece.',

    // ── Marte e Saturno: o eixo da ação ───────────────────────────
    'Marte|Conjunção|Saturno': 'Você age com controle. Nada sai antes da hora — e às vezes nada sai. A disciplina é real; a raiva contida também.',
    'Marte|Quadratura|Saturno': 'Você acelera e freia ao mesmo tempo. A frustração se acumula em silêncio e sai em bloco. Elaborado, esse atrito produz uma persistência que não desiste.',
    'Marte|Oposição|Saturno': 'Sua vontade de agir encontra um muro — externo ou interno — que exige justificativa antes de qualquer passo. Integrar é agir sem esperar autorização.',
    'Marte|Trígono|Saturno': 'Você tem força com direção: age no tempo certo e sustenta o esforço. É a combinação que constrói coisas grandes devagar.',
    'Marte|Sextil|Saturno': 'A disciplina responde quando chamada. Ela não se impõe sozinha — mas quando você a chama, ela vem.',
};

/** Chave canônica: os dois astros em ordem alfabética, porque o aspecto é simétrico. */
function chave(astroA: string, tipo: string, astroB: string): string {
    const [a, b] = [astroA, astroB].sort((x, y) => x.localeCompare(y, 'pt-BR'));
    return `${a}|${tipo}|${b}`;
}

/**
 * A interpretação de um aspecto. Devolve sempre um texto em português:
 * o escrito à mão quando existe, o construído a partir dos arquétipos quando não.
 */
export function interpretarAspecto(astroA: string, tipo: string, astroB: string): string {
    const escrito = ASPECTOS_ESCRITOS[chave(astroA, tipo, astroB)];
    if (escrito) return escrito;

    const molde = MOLDES[tipo];
    if (!molde) return '';
    return molde(ASTROS[astroA] ?? GENERICO, ASTROS[astroB] ?? GENERICO);
}

/** true quando o texto é escrito à mão para esse par exato. */
export function aspectoTemTextoProprio(astroA: string, tipo: string, astroB: string): boolean {
    return chave(astroA, tipo, astroB) in ASPECTOS_ESCRITOS;
}
