// src/data/signosInterpretacao.ts

/**
 * O ARCANO NO SIGNO SOLAR
 *
 * A fonte anterior deste conteúdo era `matrices/matrix_arcano_sign.json`: 264
 * chaves, cobertura de 100% e profundidade zero. As 264 entradas eram a MESMA
 * frase com variáveis trocadas — "O arquétipo do X encontra sua expressão solar
 * em Y. Esta combinação funde a força de Z com a modalidade zodiacal." — onde o
 * signo entrava como substantivo e não dizia nada ("a modalidade zodiacal" é uma
 * não-informação). O campo `lideranca` era literalmente idêntico nas 264 e nunca
 * foi lido por nenhum componente.
 *
 * Aqui a estratégia é a mesma que funcionou em `aspectosInterpretacao.ts` e
 * `casasInterpretacao.ts`: composição em vez de enumeração. 12 signos escritos à
 * mão (× 7 campos), 22 arcanos escritos à mão (× 3 campos), 16 pares de elemento
 * e 3 modalidades produzem 264 leituras específicas — sem 264 textos avulsos e
 * sem template vazio.
 *
 * Registro: terapêutico, não preditivo. Descreve como o arquétipo se expressa
 * por aquele temperamento solar e o que a combinação cobra, nunca "o que vai
 * acontecer".
 */

export interface Signo {
    nome: string;
    glifo: string;
    elemento: 'Fogo' | 'Terra' | 'Ar' | 'Água';
    modalidade: 'Cardinal' | 'Fixo' | 'Mutável';
    regente: string;
    /** Advérbio do modo. Entra depois de "ganha, em <signo>, ...". */
    modo: string;
    /** O que o signo persegue. Entra depois de "O que você busca é ...". */
    busca: string;
    /** O movimento automático quando aperta. Entra depois de "Sob pressão, ...". */
    sobPressao: string;
    /** A sombra, como oração. Entra depois de "O risco desta combinação é ...". */
    sombra: string;
    /** Uma ação concreta para hoje, no imperativo. */
    antidoto: string;
    /** Onde o signo costuma falar no corpo. */
    corpo: string;
    /** A pergunta que o signo precisa ouvir. */
    pergunta: string;
}

export const SIGNOS: Record<string, Signo> = {
    'Áries': {
        nome: 'Áries', glifo: '♈', elemento: 'Fogo', modalidade: 'Cardinal', regente: 'Marte',
        modo: 'velocidade e pouca paciência para ensaio',
        busca: 'chegar antes, por conta própria, e sentir que a força é sua',
        sobPressao: 'você acelera — decide no susto, porque ficar parado dói mais do que errar',
        sombra: 'abrir frentes que ninguém fecha',
        antidoto: 'termine hoje uma coisa que você já começou, por pequena que seja',
        corpo: 'cabeça, maxilar e a tensão entre as sobrancelhas',
        pergunta: 'Isso é coragem ou é só pressa de sair do lugar?',
    },
    'Touro': {
        nome: 'Touro', glifo: '♉', elemento: 'Terra', modalidade: 'Fixo', regente: 'Vênus',
        modo: 'peso, lentidão e uma firmeza que não se negocia',
        busca: 'um chão que não se mexa, e prazer sem culpa no que é concreto',
        sobPressao: 'você enraíza — para de se mover e espera o mundo desistir primeiro',
        sombra: 'chamar de paciência o que já é teimosia',
        antidoto: 'mude uma coisa pequena da sua rotina hoje e observe o incômodo sem corrigi-lo',
        corpo: 'garganta, nuca e ombros',
        pergunta: 'Você está sustentando isso ou só não quer soltar?',
    },
    'Gêmeos': {
        nome: 'Gêmeos', glifo: '♊', elemento: 'Ar', modalidade: 'Mutável', regente: 'Mercúrio',
        modo: 'muitas versões ao mesmo tempo e uma curiosidade que não sossega',
        busca: 'entender, nomear e poder mudar de ideia sem dar explicação',
        sobPressao: 'você fala — explica, relativiza, acha um ângulo novo e escapa por ele',
        sombra: 'saber dizer tudo sobre o que ainda não viveu',
        antidoto: 'escreva em uma frase o que você sente, sem adjetivo e sem ressalva',
        corpo: 'mãos, pulmões e a respiração curta',
        pergunta: 'Você está pensando sobre isso para resolver ou para não sentir?',
    },
    'Câncer': {
        nome: 'Câncer', glifo: '♋', elemento: 'Água', modalidade: 'Cardinal', regente: 'Lua',
        modo: 'memória, cuidado e uma defesa que se fecha antes de você decidir',
        busca: 'pertencer a alguém e saber que existe para onde voltar',
        sobPressao: 'você recolhe — guarda o que sentiu e cuida dos outros para não precisar pedir',
        sombra: 'confundir intimidade com a garantia de que ninguém vai embora',
        antidoto: 'peça uma coisa concreta a alguém hoje, sem justificar o pedido',
        corpo: 'estômago, peito e o aperto de antes de dormir',
        pergunta: 'Você está cuidando ou está segurando?',
    },
    'Leão': {
        nome: 'Leão', glifo: '♌', elemento: 'Fogo', modalidade: 'Fixo', regente: 'Sol',
        modo: 'calor, presença e a necessidade de que isso seja visto',
        busca: 'ser reconhecido pelo que é seu, e não pelo que você fez por alguém',
        sobPressao: 'você aumenta — fica maior, mais generoso, mais evidente, e não mostra o cansaço',
        sombra: 'medir o próprio valor pela resposta que recebeu',
        antidoto: 'faça hoje algo que te dá orgulho e não conte a ninguém',
        corpo: 'coração, coluna e o peito empurrado para frente',
        pergunta: 'Isso ainda seria importante se ninguém visse?',
    },
    'Virgem': {
        nome: 'Virgem', glifo: '♍', elemento: 'Terra', modalidade: 'Mutável', regente: 'Mercúrio',
        modo: 'detalhe, correção e um padrão que você aplica primeiro em si',
        busca: 'fazer bem feito e ser útil de um jeito que se possa verificar',
        sobPressao: 'você revisa — refaz, ajusta, melhora, e adia a entrega mais um dia',
        sombra: 'confundir cuidado com vigilância, e exigência com amor',
        antidoto: 'entregue hoje algo em 80% e não volte para arrumar',
        corpo: 'intestino, nervos e a mandíbula travada',
        pergunta: 'Falta mesmo alguma coisa, ou falta permissão para estar pronto?',
    },
    'Libra': {
        nome: 'Libra', glifo: '♎', elemento: 'Ar', modalidade: 'Cardinal', regente: 'Vênus',
        modo: 'medida, cuidado com a forma e um olho sempre no outro lado',
        busca: 'um acordo em que ninguém saia machucado, você inclusive',
        sobPressao: 'você concilia — cede um pouco, suaviza o tom e descobre depois que concordou com o que não queria',
        sombra: 'chamar de harmonia o conflito que você só adiou',
        antidoto: 'diga hoje um "não" sem amaciar com explicação',
        corpo: 'rins, lombar e a sensação de desequilíbrio quando você para',
        pergunta: 'Você quer justiça ou quer que ninguém fique bravo?',
    },
    'Escorpião': {
        nome: 'Escorpião', glifo: '♏', elemento: 'Água', modalidade: 'Fixo', regente: 'Plutão',
        modo: 'profundidade, intensidade e nada pela metade',
        busca: 'a verdade de baixo, a que não se diz na primeira conversa',
        sobPressao: 'você fecha e observa — guarda a informação, mede o outro e não entrega nada antes de ter certeza',
        sombra: 'controlar o vínculo para não correr o risco de ser surpreendido',
        antidoto: 'conte hoje uma coisa sua antes de saber o que o outro vai fazer com ela',
        corpo: 'quadril, pelve e a respiração presa no fundo',
        pergunta: 'Isso é intimidade ou é poder?',
    },
    'Sagitário': {
        nome: 'Sagitário', glifo: '♐', elemento: 'Fogo', modalidade: 'Mutável', regente: 'Júpiter',
        modo: 'amplitude, convicção e a vontade de que isso signifique algo',
        busca: 'sentido, horizonte e liberdade para ir atrás dele',
        sobPressao: 'você amplia — sobe o olhar para o geral, faz um plano maior e sai de perto do que incomoda',
        sombra: 'trocar o que não terminou por um projeto novo e mais nobre',
        antidoto: 'fique hoje com uma coisa pequena e concreta até o fim, sem procurar o sentido dela',
        corpo: 'coxas, fígado e a inquietação nas pernas',
        pergunta: 'Você está crescendo ou está indo embora com estilo?',
    },
    'Capricórnio': {
        nome: 'Capricórnio', glifo: '♑', elemento: 'Terra', modalidade: 'Cardinal', regente: 'Saturno',
        modo: 'tempo longo, responsabilidade e uma seriedade que chegou cedo demais',
        busca: 'construir algo que fique de pé sem você precisar segurar',
        sobPressao: 'você assume — carrega mais, reclama menos e trata exaustão como disciplina',
        sombra: 'confundir valor com rendimento, e descanso com fraqueza',
        antidoto: 'pare hoje numa hora marcada, com a tarefa inacabada, e não compense depois',
        corpo: 'joelhos, dentes e a rigidez nas costas',
        pergunta: 'Isso é compromisso ou é medo de não bastar?',
    },
    'Aquário': {
        nome: 'Aquário', glifo: '♒', elemento: 'Ar', modalidade: 'Fixo', regente: 'Urano',
        modo: 'distância, originalidade e um jeito próprio que não pede licença',
        busca: 'liberdade para pensar fora do combinado, e um lugar onde isso não seja problema',
        sobPressao: 'você sobe para o conceito — explica o sistema, fica lúcido e desaparece de dentro da cena',
        sombra: 'ser compreensivo com a humanidade inteira e indisponível para uma pessoa',
        antidoto: 'fique hoje numa conversa até o fim, mesmo quando ela ficar comum',
        corpo: 'tornozelos, circulação e o frio nas extremidades',
        pergunta: 'Você está livre ou está fora de alcance?',
    },
    'Peixes': {
        nome: 'Peixes', glifo: '♓', elemento: 'Água', modalidade: 'Mutável', regente: 'Netuno',
        modo: 'porosidade, imaginação e fronteiras que se desfazem sem aviso',
        busca: 'dissolver a separação e sentir junto, sem a borda que divide',
        sobPressao: 'você se ajusta ao outro — absorve o clima da sala e perde a linha de onde você termina',
        sombra: 'chamar de compaixão o não saber dizer onde você acaba',
        antidoto: 'escreva hoje uma frase que comece com "eu quero" e não inclua mais ninguém',
        corpo: 'pés, sistema linfático e o cansaço sem causa',
        pergunta: 'Esse sentimento é seu ou você o pegou de alguém?',
    },
};

/** O que cada arcano quer, o que ele cobra e o que fica esperando quando ele é evitado. */
interface GestoDoArcano {
    /** Entra como sujeito: "<Impulso> ganha, em <signo>, <modo>." */
    impulso: string;
    /** Entra como objeto: "... é por esse caminho que <exigência> deixa de ser ideia." */
    exigencia: string;
    /** O que fica parado: "... e <tarefa> fica esperando." */
    tarefa: string;
}

/** Indexado pela numeração do app — O Louco é 22, como no `arcanos.json`. */
const GESTOS: Record<number, GestoDoArcano> = {
    22: { impulso: 'o impulso de começar antes de ter certeza', exigencia: 'confiar sem garantia', tarefa: 'o primeiro passo que ninguém aprova' },
    1:  { impulso: 'a vontade de fazer a ideia virar coisa no mundo', exigencia: 'usar o próprio poder sem se achar o dono dele', tarefa: 'a manifestação concreta' },
    2:  { impulso: 'a escuta do que não foi dito', exigencia: 'confiar na intuição sem confundi-la com medo', tarefa: 'o silêncio onde a resposta aparece' },
    3:  { impulso: 'a vontade de gerar e de nutrir', exigencia: 'criar sem se gastar inteiro no que criou', tarefa: 'o cuidado que também te inclui' },
    4:  { impulso: 'a necessidade de dar ordem ao que está solto', exigencia: 'ter autoridade sem virar autoritário', tarefa: 'o limite dito com clareza' },
    5:  { impulso: 'o desejo de transmitir o que você aprendeu', exigencia: 'ensinar sem transformar a sua verdade em regra para os outros', tarefa: 'a palavra que orienta sem prender' },
    6:  { impulso: 'a busca de um vínculo que não exija que você se reduza', exigencia: 'escolher, e perder o que não foi escolhido', tarefa: 'a decisão que você vem adiando' },
    7:  { impulso: 'a vontade de conduzir e de chegar', exigencia: 'avançar sem atropelar quem vai com você', tarefa: 'a direção escolhida e mantida' },
    8:  { impulso: 'a exigência de que as coisas fiquem certas', exigencia: 'ser justo sem endurecer', tarefa: 'a verdade dita no lugar certo' },
    9:  { impulso: 'a necessidade de se recolher para entender', exigencia: 'voltar do silêncio com algo para dividir', tarefa: 'o retorno depois do recolhimento' },
    10: { impulso: 'o movimento dos ciclos que não obedecem a você', exigencia: 'aceitar o que gira sem desistir do que é seu', tarefa: 'a mão aberta na hora da virada' },
    11: { impulso: 'a coragem de ficar perto do que em você é selvagem', exigencia: 'domar sem violência', tarefa: 'a firmeza que não precisa machucar' },
    12: { impulso: 'a inversão que muda o que você vê', exigencia: 'suspender a pressa e deixar a perspectiva virar', tarefa: 'a pausa que você chama de perda de tempo' },
    13: { impulso: 'a necessidade de terminar o que já acabou', exigencia: 'encerrar sem destruir', tarefa: 'o fim assumido em voz alta' },
    14: { impulso: 'a procura de uma medida que não seja extremo', exigencia: 'misturar os opostos sem anular nenhum', tarefa: 'a dose certa, achada aos poucos' },
    15: { impulso: 'o reconhecimento do que te prende e também te acende', exigencia: 'desejar sem se entregar à corrente', tarefa: 'a liberdade que começa em admitir o laço' },
    16: { impulso: 'o colapso do que estava apoiado em mentira', exigencia: 'deixar cair o que não sustenta e reconstruir depois', tarefa: 'a estrutura falsa que você ainda defende' },
    17: { impulso: 'a esperança que sobra depois do estrago', exigencia: 'ter fé sem inventar um futuro para não ver o presente', tarefa: 'a cura lenta, feita sem plateia' },
    18: { impulso: 'a travessia do que não tem contorno', exigencia: 'distinguir o que você intui do que você teme', tarefa: 'o caminho que só se faz no escuro' },
    19: { impulso: 'a vontade de aparecer inteiro', exigencia: 'brilhar sem precisar ofuscar', tarefa: 'a alegria mostrada sem desculpa' },
    20: { impulso: 'o chamado que te tira de onde você estava', exigencia: 'responder ao chamado sem cobrar de si a culpa antiga', tarefa: 'a resposta ao que te chama' },
    21: { impulso: 'a vontade de integrar e de concluir', exigencia: 'fechar o ciclo e aceitar que outro começa', tarefa: 'o encerramento comemorado' },
};

/** Como o elemento do arcano conversa com o elemento do signo. 16 pares. */
const PARES_DE_ELEMENTO: Record<string, string> = {
    'Fogo|Fogo':  'Arcano e signo são os dois de fogo: energia não falta, e a questão nunca é começar — é não queimar o próprio combustível antes do meio do caminho.',
    'Fogo|Terra': 'O arcano é de fogo e o signo é de terra: você tem o impulso e tem a paciência, mas eles não andam no mesmo ritmo. O fogo quer agora; a terra quer garantia.',
    'Fogo|Ar':    'Fogo de arcano com ar de signo: um alimenta o outro, e por isso a ideia cresce rápido. Falta quem segure o chão enquanto ela cresce.',
    'Fogo|Água':  'Fogo de arcano com água de signo: a vontade acende e o sentimento apaga, alternadamente. Você se acusa de inconstância quando está apenas sentindo os dois.',
    'Terra|Fogo': 'Arcano de terra, signo de fogo: a tarefa é lenta e você é rápido. A tentação é abandonar o processo exatamente quando ele ia dar resultado.',
    'Terra|Terra':'Terra com terra: solidez de sobra. O que falta é movimento, e o risco é que o que você construiu vire o lugar onde você se prende.',
    'Terra|Ar':   'Arcano de terra, signo de ar: você entende o que precisa ser feito antes de estar disposto a fazer. A compreensão vem fácil; a execução cobra o corpo.',
    'Terra|Água': 'Terra de arcano com água de signo: há forma e há afeto, e essa é uma combinação fértil. O cuidado é não encharcar a estrutura de significado até ela não suportar.',
    'Ar|Fogo':    'Arcano de ar, signo de fogo: a clareza chega e você já saiu para agir. Às vezes a ação resolve; às vezes ela interrompe o pensamento no meio.',
    'Ar|Terra':   'Ar de arcano em signo de terra: a ideia precisa de prova material para que você acredite nela. Isso te protege do delírio e te atrasa.',
    'Ar|Ar':      'Ar com ar: perspectiva de sobra, distância de sobra. Você vê tudo, inclusive a si mesmo, e é justamente por isso que demora a entrar.',
    'Ar|Água':    'Ar de arcano com água de signo: você quer entender o que sente e sentir o que entende, e os dois sistemas falam línguas diferentes. Nem tudo aqui é para ser explicado.',
    'Água|Fogo':  'Arcano de água, signo de fogo: a sensibilidade é funda e a reação é imediata. Você sente antes e age antes — a ordem entre as duas é o trabalho.',
    'Água|Terra': 'Água de arcano em signo de terra: o sentimento encontra forma e dura. É a combinação que menos se perde e a que mais demora a mudar.',
    'Água|Ar':    'Água de arcano com ar de signo: você nomeia bem o que sente, o que é um dom e também um esconderijo. Falar do sentimento não é o mesmo que atravessá-lo.',
    'Água|Água':  'Água com água: nada aqui é superficial. A profundidade é o seu território, e a borda — onde você termina e o outro começa — é o que pede atenção.',
};

/** O que a modalidade faz com a tarefa do arcano. */
const MODALIDADES: Record<Signo['modalidade'], string> = {
    'Cardinal': 'A modalidade cardinal diz como isso se move: você inicia. O começo é seu; o meio é o que você precisa aprender a habitar.',
    'Fixo':     'A modalidade fixa diz como isso se move: você sustenta. Permanecer é o seu talento; soltar na hora certa é a parte difícil.',
    'Mutável':  'A modalidade mutável diz como isso se move: você se adapta. Mudar de forma é fácil; escolher uma forma e ficar nela é o que custa.',
};

/** O mínimo que a leitura precisa saber do arcano. */
export interface ArcanoParaLeitura {
    numero: number;
    nome: string;
    elemento?: string;
    signo_zodiacal?: string;
}

export interface LeituraDoSigno {
    titulo: string;
    /** Metadados do signo em uma linha: "Fogo • Cardinal • regido por Marte". */
    assinatura: string;
    perfil: string;
    tensao: string;
    pontoCego: string;
    pratica: string;
    pergunta: string;
    corpo: string;
    /** Verdadeiro quando o signo solar é o próprio signo da carta. */
    ressonancia: boolean;
    signo: Signo;
}

/** Alguns arcanos têm elemento composto ("Ar/Fogo"); vale o primeiro. */
function elementoPrincipal(elemento?: string): Signo['elemento'] {
    const primeiro = (elemento || 'Ar').split('/')[0].trim();
    return (['Fogo', 'Terra', 'Ar', 'Água'] as const).includes(primeiro as Signo['elemento'])
        ? (primeiro as Signo['elemento'])
        : 'Ar';
}

/**
 * O arcano lido através do signo solar. 22 × 12 = 264 leituras compostas a
 * partir de 34 peças escritas à mão, 16 pares de elemento e 3 modalidades.
 */
export function lerArcanoNoSigno(arcano: ArcanoParaLeitura, nomeDoSigno: string): LeituraDoSigno | null {
    const s = SIGNOS[nomeDoSigno];
    const gesto = GESTOS[arcano.numero];
    if (!s || !gesto) return null;

    const elArcano = elementoPrincipal(arcano.elemento);
    const ressonancia = Boolean(arcano.signo_zodiacal?.includes(s.nome));

    const perfil =
        `${cap(gesto.impulso)} ganha, em ${s.nome}, ${s.modo}. ` +
        `O que você busca é ${s.busca} — e é por esse caminho que ${gesto.exigencia} deixa de ser ideia e passa a ser tarefa.` +
        (ressonancia
            ? ` ${s.nome} é o signo que a própria carta carrega: o arquétipo não está em terreno estrangeiro, está em casa. Isso facilita a expressão e dificulta enxergar o excesso.`
            : '');

    const tensao = `${PARES_DE_ELEMENTO[`${elArcano}|${s.elemento}`]} ${MODALIDADES[s.modalidade]}`;

    const pontoCego =
        `Sob pressão, ${s.sobPressao}. ` +
        `O risco desta combinação é ${s.sombra} — e ${gesto.tarefa} fica esperando uma hora melhor que não chega.`;

    const pratica =
        `${cap(s.antidoto)}. ` +
        `Enquanto faz, repare se o que aparece é ${gesto.exigencia} ou o seu reflexo de sempre.`;

    return {
        titulo: `${arcano.nome} em ${s.nome}`,
        assinatura: `${s.elemento} • ${s.modalidade} • regido por ${s.regente}`,
        perfil,
        tensao,
        pontoCego,
        pratica,
        pergunta: s.pergunta,
        corpo: cap(s.corpo),
        ressonancia,
        signo: s,
    };
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
