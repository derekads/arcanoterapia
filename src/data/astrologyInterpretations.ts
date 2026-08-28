import { outerPlanetInterpretations } from './outerPlanetInterpretations';

export interface InterpretationData {
    hook: string;
    youAre?: string; // Standard or Sun/Moon/Merc/Mars
    yourPower?: string;
    yourTrap?: string;

    // Práticos
    inLove?: string;
    atWork?: string;

    // Lunar
    comfort?: string;

    // Ascendente
    mask?: string;
    firstImpression?: string;
    physical?: string;
    howOthersSee?: string;

    // Vênus
    loveStyle?: string;
    attraction?: string;
    relationship?: string;
    gift?: string;

    // Marte
    actionStyle?: string;
    anger?: string;
    sexDrive?: string;
    workDrive?: string;

    // Mercúrio
    thinkingStyle?: string;
    communication?: string;
    learning?: string;
    mentalTrap?: string;

    // Júpiter
    growthStyle?: string;
    luckArea?: string;
    excessTrap?: string;
    wisdom?: string;

    // Saturno
    challenge?: string;
    responsibility?: string;
    maturity?: string;
    fear?: string;

    tryThis: string;
}

export function getGenericInterpretation(planet: string, sign: string): InterpretationData {
    // Gerar interpretações personalizadas por planeta para evitar redundância de placeholder (Regra Zero)
    const normalizedPlanet = planet.toLowerCase();
    
    let hook = `A influência de ${planet} em ${sign} no seu mapa natal.`;
    let youAre = `Seu jeito de expressar a energia de ${planet} sob a ótica de ${sign}.`;
    let yourPower = `A capacidade de expressar as qualidades de ${sign} de forma assertiva e consciente.`;
    let yourTrap = `O desafio de equilibrar a força de ${planet} sem cair no excesso ou na rigidez de ${sign}.`;
    let tryThis = `Observe hoje como a energia de ${planet} em ${sign} se manifesta nos seus hábitos.`;

    if (normalizedPlanet === 'mercúrio' || normalizedPlanet === 'mercury') {
        hook = `Como você organiza seus pensamentos e se comunica com o mundo sob a influência de Mercúrio em ${sign}.`;
        youAre = `Sua mente é moldada pela sensibilidade de ${sign}, influenciando como você expressa suas ideias.`;
        yourPower = `Inteligência prática ou intuitiva para resolver dilemas usando as qualidades de ${sign}.`;
        yourTrap = `A pressa mental ou dispersão ao lidar com informações de forma lógica.`;
        tryThis = `Escreva três ideias rápidas que tiver hoje e tente organizar uma delas em etapas claras.`;
    } else if (normalizedPlanet === 'vênus' || normalizedPlanet === 'venus') {
        hook = `Sua forma de expressar afeto, valorizar parcerias e buscar harmonia com Vênus em ${sign}.`;
        youAre = `Sua busca por prazer, beleza e segurança afetiva é filtrada pela energia de ${sign}.`;
        yourPower = `Facilidade de atrair harmonia e criar conexões verdadeiras com base em empatia.`;
        yourTrap = `Idealização excessiva das pessoas ou carência afetiva projetada nos outros.`;
        tryThis = `Demonstre carinho ou apreço por alguém próximo hoje com um gesto simples e sincero.`;
    } else if (normalizedPlanet === 'marte' || normalizedPlanet === 'mars') {
        hook = `Sua força de vontade, garra para agir e assertividade sob o prisma de Marte em ${sign}.`;
        youAre = `A forma como você luta por seus objetivos e expressa sua paixão ou raiva sob a influência de ${sign}.`;
        yourPower = `Determinação focada e coragem para vencer obstáculos sem hesitação.`;
        yourTrap = `Agir por impulso impaciente ou agressividade verbal desnecessária quando sob estresse.`;
        tryThis = `Canalize um momento de pressa ou irritação hoje em uma atividade física ou foco produtivo.`;
    } else if (normalizedPlanet === 'júpiter' || normalizedPlanet === 'jupiter') {
        hook = `A área onde reside seu potencial de sorte, sabedoria e expansão com Júpiter em ${sign}.`;
        youAre = `Sua busca por propósito maior, espiritualidade e crescimento pessoal é colorida por ${sign}.`;
        yourPower = `Otimismo realista e facilidade para enxergar oportunidades onde outros veem limites.`;
        yourTrap = `Exageros em expectativas ou negligência com detalhes práticos por excesso de confiança.`;
        tryThis = `Dedique 15 minutos hoje para ler sobre um assunto inspirador ou refletir sobre suas metas de vida.`;
    } else if (normalizedPlanet === 'saturno' || normalizedPlanet === 'saturn') {
        hook = `Onde você é testado a ter disciplina, responsabilidade e amadurecer com Saturno em ${sign}.`;
        youAre = `Seus maiores aprendizados estruturais e superação de medos internos através da lente de ${sign}.`;
        yourPower = `Persistência e capacidade de construir bases sólidas de longo prazo através do esforço.`;
        yourTrap = `Cobrança excessiva sobre si mesmo ou medo paralisante de falhar perante as responsabilidades.`;
        tryThis = `Organize uma pendência pendente hoje e execute-a até o final sem distrações.`;
    } else if (normalizedPlanet === 'urano' || normalizedPlanet === 'uranus') {
        hook = `Sua área de originalidade, inovação e rompimento de velhas amarras com Urano em ${sign}.`;
        youAre = `Onde você expressa sua individualidade livre e soluções revolucionárias sob a ótica de ${sign}.`;
        yourPower = `Visão intuitiva para criar caminhos originais fora da caixa.`;
        yourTrap = `Rebeldia sem causa ou instabilidade em manter projetos estáveis.`;
        tryThis = `Mude o método de uma tarefa comum hoje, fazendo-a de um jeito completamente novo.`;
    } else if (normalizedPlanet === 'netuno' || normalizedPlanet === 'neptune') {
        hook = `Seu canal de conexão espiritual, sensibilidade psíquica e imaginação com Netuno em ${sign}.`;
        youAre = `Onde você vivencia sua intuição sutil e conexão artística filtrada por ${sign}.`;
        yourPower = `Empatia profunda e sensibilidade criativa para captar as entrelinhas invisíveis.`;
        yourTrap = `Fuga da realidade prática através de ilusões ou vitimização emocional.`;
        tryThis = `Tire 10 minutos para ouvir música instrumental de olhos fechados, focado apenas em respirar.`;
    } else if (normalizedPlanet === 'plutão' || normalizedPlanet === 'pluto') {
        hook = `O ponto de maior poder regenerativo, cura e transmutação com Plutão em ${sign}.`;
        youAre = `Sua capacidade de expurgar feridas antigas e renascer das cinzas sob o prisma de ${sign}.`;
        yourPower = `Resiliência profunda e força psicológica para superar crises intensas.`;
        yourTrap = `Comportamento controlador obsessivo ou apego excessivo a sentimentos destrutivos.`;
        tryThis = `Identifique um rancor ou apego inútil do passado hoje e decida conscientemente deixá-lo ir.`;
    }

    return {
        hook,
        youAre,
        yourPower,
        yourTrap,
        tryThis
    };
}

const baseInterpretations: Record<string, InterpretationData> = {
    // LOTE 1: SOL =========================================================
    "sun_aries": {
        "hook": "Você é daqueles que não espera a vida acontecer. Vai lá e faz. E se der errado, recomeça antes de todo mundo.",
        "youAre": "Você tem uma energia que contagia. Quando entra num lugar, as pessoas sentem. É impulsivo, assume riscos que outros temem e tem uma coragem quase infantil de achar que tudo vai dar certo. Você odeia esperar, odeio burocracia e odeia gente que enrola para decidir. Sua raiva passa rápido, mas quando está irritado, todo mundo sabe. Você é o primeiro a levantar a mão para um desafio novo, mesmo sem saber direito como fazer.",
        "yourPower": "Você não desiste fácil. Enquanto outros estão pensando se vão começar, você já terminou. Sua capacidade de recomeçar do zero é sua marca registrada - falhou, levantou, foi de novo. Você protege os mais fracos sem pensar duas vezes e tem um coração valente que inspira coragem nos outros.",
        "yourTrap": "O problema é que você queima etapas. Começa mil coisas e termina poucas. Sua impaciência custa caro - manda mensagem na hora da raiva, toma decisão sem pensar e depois se arrepende. Você também pode ser competitivo sem perceber, transformando amizade em disputa silenciosa.",
        "inLove": "Você conquista rápido e intenso. Manda mensagem primeiro, propõe encontro, vai atrás. Mas quando a rotina bate, você se entedia. Precisa de alguém que mantenha a chama acesa, senão você some ou trai (emocionalmente ou fisicamente). Ciúme? Você tem e é explosivo.",
        "atWork": "Você é feito para liderar emergências, abrir novos mercados ou trabalhar por conta própria. Evite escritório com regras rígidas - você sufoca. Brilha como empreendedor, militar, bombeiro, cirurgião ou em qualquer coisa que exija tomada de decisão rápida. Seu chefe ideal deixa você fazer do seu jeito.",
        "tryThis": "Conte até 10 antes de mandar aquele áudio ou mensagem agressivo hoje. Respira."
    },
    "sun_taurus": {
        "hook": "Você é o amigo que todo mundo liga quando precisa de algo concreto. Não promete o mundo, mas entrega o que disse que ia entregar.",
        "youAre": "Você é prático, paciente e teimoso quando quer. Gosta de coisas boas - comida de verdade, roupa confortável, cheiro de casa limpa. Você não muda de opinião fácil e quando decide algo, é para valer. Tem uma memória incrível para detalhes práticos e uma lealdade que poucos têm. Você odeia pressa, odeia gente que inventa moda e odeia ter que mudar planos de última hora. Suas raivas demoram para começar, mas quando começam, duram anos.",
        "yourPower": "Você é o pilar. Enquanto todo mundo está em crise, você mantém a estrutura em pé. Sua persistência é assustadora - você faz o que precisa ser feito mesmo sem vontade. Tem um senso prático que resolve problemas reais e uma capacidade de construir coisas duradouras (casas, empresas, relacionamentos) que impressiona.",
        "yourTrap": "Você trava. Muda de ideia demora séculos. Fica em relacionamentos ou empregos tóxicos anos a fio porque 'já está acostumado'. Sua teimosidade cega te impede de ver quando é hora de soltar. E você pode ser materialista demais, achando que comprar coisas resolve problemas emocionais.",
        "inLove": "Você demonstra amor com atitudes, não palavras. Faz comida, dá presentes úteis, lembra do que a pessoa precisa. Mas é ciumento e possessivo - o que é seu é seu e ponto final. Você odeia joguinhos e prefere alguém direto. Sexualmente, é sensual e preguiçoso - gosta de conforto e rotina.",
        "atWork": "Você é excelente em finanças, gastronomia, arquitetura, jardinagem, moda ou qualquer coisa que envolva criar valor material. Trabalha bem com mãos e tem paciência para processos longos. Evite ambientes que mudam toda hora - você precisa de estabilidade para render.",
        "tryThis": "Mude uma pequena coisa na sua rotina hoje. Tome um caminho diferido para casa. Flexibilize um pouco."
    },
    "sun_gemini": {
        "hook": "Você é aquela pessoa que sabe de tudo um pouco e conversa com todo mundo. Tem uma curiosidade que não deixa você parado num lugar só.",
        "youAre": "Você é rápido mentalmente. Pensa, fala e processa informação mais rápido que a maioria. É comunicativo, espirituoso e tem uma rede de contatos enorme. Você odeia tédio, odeia rotina e odeia gente monossilábica. Tem uma capacidade de ver os dois lados de qualquer história, o que às vezes te deixa indeciso. Você é o mestre do 'já já eu te ligo' e esquece, não por mal, mas porque mil coisas aconteceram no meio tempo.",
        "yourPower": "Você adapta. Muda de plano, de cidade, de ideia sem sofrer tanto quanto os outros. Sua inteligência verbal é afiada - sabe exatamente o que dizer para desarmar uma situação tensa. É o conector - introduz pessoas, ideias e oportunidades. Sua mente é um motor que não para.",
        "yourTrap": "Você dispersa. Começa curso, livro, projeto e abandona no meio. Fica ansioso quando tem que parar para sentir emoções profundas - prefere racionalizar. Pode ser fofoqueiro sem perceber e às vezes fala demais, contando segredos que não devia.",
        "inLove": "Você precisa de alguém que converse com você. Inteligência é seu maior fetiche. Se a pessoa é bonita mas não te faz pensar, esquece. Você trai pela mente - flerta com ideias, com palavras. Precisa de liberdade dentro do namoro, senão sufoca. Ciúme te deixa irritado, não triste.",
        "atWork": "Você é feito para comunicação: jornalismo, marketing, professor, vendas, tradutor, escritor. Multitarefa é com você mesmo, desde que não seja repetitiva. Evite empregos engessados - você precisa de variedade e contato com pessoas.",
        "tryThis": "Fique 10 minutos em silêncio sem olhar celular hoje. Apenas observe seus pensamentos passarem sem julgar."
    },
    "sun_cancer": {
        "hook": "Você é o ombro amigo que todo mundo procura. Senta, escuta e acolhe. Mas guarda mágoa por anos sem dizer.",
        "youAre": "Você é sensível, protetor e tem uma memória afetiva incrível. Lembra de aniversários, gestos de carinho e também de cada ferida que levou. Você cuida das pessoas - pergunta se almoçaram, lembra de remédio, faz comida quando alguém está mal. Seu humor muda conforme o clima do ambiente. Quando está seguro, é divertido e caloroso. Quando está magoado, some no casulo. Você é profundamente leal, mas exige lealdade de volta.",
        "yourPower": "Você faz as pessoas se sentirem em casa. Sua intuição é afiada - adivinha quando algo está errado antes de ser dito. É excelente em cuidar, nutrir e criar ambientes acolhedores. Sua persistência emocional é admirável - você não abandona quem ama quando a pessoa está mal.",
        "yourTrap": "Você é rancoroso. Diz que perdoou, mas não esquece. Fica numa situação tóxica muito tempo porque tem medo de abandonar ou ser abandonado. Quando está magoado, age de forma passiva-agressiva ou manipuladora emocionalmente ('tudo bem, não precisa se preocupar comigo...'). Sua barriga vira termômetro emocional.",
        "inLove": "Você demonstra amor através de cuidados práticos. Quer alguém que entenda suas mudanças de humor sem levar para o pessoal. Precisa de segurança emocional - se sentir que pode ser trocado a qualquer momento, fica doente de ansiedade. Ciumento, mas esconde.",
        "atWork": "Você brilha onde precisa cuidar de pessoas: educação infantil, psicologia, enfermagem, gastronomia, RH. Evite ambientes frios e competitivos. Você precisa sentir que faz parte de uma família no trabalho.",
        "tryThis": "Diga 'não' para um pedido hoje sem dar explicações longas. Pratique o desapego emocional."
    },
    "sun_leo": {
        "hook": "Você nasceu para brilhar. Tem um magnetismo natural e uma generosidade de quem tem coração grande demais para o próprio bem.",
        "youAre": "Você é expressivo, criativo e tem presença. Quando entra num lugar, as pessoas notam. Você é leal até a morte com quem te ama de verdade e tem um senso de honra antiquado. Gosta de luxo, de ser reconhecido e de celebrar a vida. Odeia ser ignorado, odeia gente mesquinha e odeia quando não é valorizado. Seu orgulho é grande, mas seu coração é maior ainda. Você é o amigo que paga a conta do bar quando todo mundo está mal.",
        "yourPower": "Você inspira. Sua coragem de ser quem você é contagia outros a serem autênticos também. É generoso sem medida - divide o que tem, dá ombro, defende os mais fracos. Sua criatividade é luminosa e você tem um talento natural para entreter e liderar com calor humano.",
        "yourTrap": "Você precisa de aplauso para viver. Quando não é centro das atenções, fica depressivo ou cria drama para ser notado. Seu orgulho às vezes impede de pedir ajuda ('eu consigo sozinho'). Pode ser autoritário sem perceber, achando que sabe o que é melhor para todo mundo.",
        "inLove": "Você ama intensamente e dramaticamente. Manda flores, escreve textos, faz declarações públicas. Mas precisa ser admirado pelo parceiro - se ele te criticar demais, você fecha ou parte. Ciumento e possessivo, mas disfarça com arrogância.",
        "atWork": "Você é feito para liderar, entreter ou criar. Arte, publicidade, gestão, política, moda. Precisa de reconhecimento - se trabalhar sem ser visto, desmotiva. Evite trabalhos anônimos ou atrás das cortinas.",
        "tryThis": "Faça algo bom hoje sem contar para ninguém. Apenas faça e guarde para você."
    },
    "sun_virgo": {
        "hook": "Você é o perfeccionista do grupo. Nota detalhes que ninguém vê e resolve problemas antes deles acontecerem.",
        "youAre": "Você é analítico, prático e tem um olho clínico para o que não funciona. Gosta de ordem, listas e de fazer as coisas do jeito certo. Você ajuda as pessoas de forma prática - arruma a casa, organiza a vida, dá conselhos úteis. Odeia bagunça, odeia gente desorganizada e odeia quando fazem as coisas pela metade. Você é modesto, mas competente. Sua mente não para - fica repassando detalhes, planejando, criticando (você mesmo principalmente).",
        "yourPower": "Você é o único que vai ler o manual de instruções. Sua eficiência é admirável - faz mais em uma hora que outros em um dia. Tem capacidade de analisar situações complexas e simplificar. É prestativo de verdade - não promete o mundo, mas resolve o problema concreto.",
        "yourTrap": "Você se autossabota com perfeccionismo. Nunca está bom o suficiente. Crítico demais consigo mesmo e com os outros - aponta o erro sem perceber que está sendo rude. Ansioso, com tendência a hipocondria ou preocupação excessiva com saúde. Dificuldade em relaxar.",
        "inLove": "Você demonstra amor através de atos de serviço - arruma a casa da pessoa, cuida quando está doente, lembra de compromissos. Mas é frio demais às vezes, parecendo não se importar emocionalmente. Precisa de alguém paciente que entenda que você mostra amor fazendo, não dizendo.",
        "atWork": "Você é essencial em qualquer lugar: análise de dados, medicina, nutrição, editoração, contabilidade, pesquisa. Detalhista e confiável. Evite ambientes caóticos - você precisa de sistema e clareza para render.",
        "tryThis": "Faça algo 'bom o suficiente' hoje e não revise. Publique sem editar pela terceira vez."
    },
    "sun_libra": {
        "hook": "Você é o diplomata. O pacificador. Aquele que vê os dois lados e quer que todo mundo se dê bem.",
        "youAre": "Você é charmoso, educado e tem um senso de justiça apurado. Odeia conflito, odeia grosseria e odeia ter que escolher lado. Você busca harmonia em tudo - na casa, no relacionamento, no trabalho. É esteticamente sensível - gosta de coisas bonitas, ambientes agradáveis. Tem dificuldade de dizer não porque quer agradar. Você é o amigo que medeia brigas de casal e faz todo mundo se entender.",
        "yourPower": "Você cria paz onde há guerra. Sua habilidade de ver todos os lados permite soluções justas que outros não enxergam. É encantador e sabe exatamente o que falar para deixar as pessoas confortáveis. Tem olho para beleza e equilíbrio - seja na decoração, na moda ou na argumentação.",
        "yourTrap": "Você é indeciso. Fica horas escolhendo no cardápio, dias decidindo se termina um relacionamento. Evita conflitos necessários, deixando problemas crescerem. Dependente de relacionamento - fica em parceria ruim porque tem medo de estar sozinho. Falso agradável às vezes.",
        "inLove": "Você é romântico, delicado e busca parceria acima de tudo. Casar ou namorar sério é meta de vida. Mas idealiza demais o parceiro e fica desiludido quando a realidade não bate com a fantasia. Ciumento, mas disfarça com elegância.",
        "atWork": "Você brilha em negociação, direito, moda, design, diplomacia, vendas de luxo, consultoria. Precisa de ambiente harmonioso - brigas no escritório te desestabilizam. Evite lideranças que exigam decisões rápidas e duras.",
        "tryThis": "Tome uma decisão sozinho hoje sem consultar ninguém. Escolha rápido e viva com as consequências."
    },
    "sun_scorpio": {
        "hook": "Você é intenso. Não faz nada pela metade - ou ama ou odeia, ou é tudo ou é nada.",
        "youAre": "Você é profundo, magnético e misterioso. As pessoas sentem que você vê através delas. Tem uma intuição quase sobrenatural e uma força emocional que assusta. Você não confia fácil, mas quando confia, é para sempre. Odeia superficialidade, odeia mentira e odeia traição. Você é o amigo que investiga o novo namorado da amiga para ver se é gente boa, e o inimigo que nunca esquece uma traição.",
        "yourPower": "Você transforma. Passa por crises e renasce mais forte. Sua capacidade de investigar, pesquisar e descobrir verdades ocultas é incomum. É leal absolutamente - amigo de verdade em momentos difíceis. Sexualmente magnético e emocionalmente profundo.",
        "yourTrap": "Você é obsessivo. Pensa na mesma coisa em loop, investiga demais, controla demais. Rancor é seu sobrenome - guarda mágoa por décadas. Ciumento compulsivo, possessivo e às vezes autodestrutivo. Ou tudo preto ou tudo branco, não aceita tons de cinza.",
        "inLove": "Você ama com obsessão. Quer saber tudo do parceiro, fundir almas, transmutar juntos. Mas é desconfiado e testa o outro constantemente. Sexualidade é fundamental - sem intensidade física, não funciona. Traição é ponto final sem perdão.",
        "atWork": "Você é feito para investigação, psicologia, criminologia, finanças, cirurgia, terapias alternativas, ocultismo. Gosta de mistério e de lidar com o lado sombra da vida. Evite trabalhos superficiais ou repetitivos.",
        "tryThis": "Perdoe alguém hoje. Não por mérito da pessoa, mas para você parar de carregar o peso."
    },
    "sun_sagittarius": {
        "hook": "Você é o aventureiro eterno. Otimista por natureza e sempre com uma história nova para contar.",
        "youAre": "Você é expansivo, honesto e adora liberdade. Tem uma energia boa que contagia e um humor que desarma. Você pensa grande - sonha com viagens, estudos, aventuras. Odeia mentira, odeia rotina e odeia gente apegada demais a bens materiais. Você é o amigo que compra passagem de última hora para viajar sozinho e volta com dez novos amigos.",
        "yourPower": "Você inspira otimismo. Sua visão ampla permite ver possibilidades onde outros veem obstáculos. É honesto brutalmente - diz o que pensa sem filtros. Tem sorte na vida porque acredita que vai dar certo. Filosófico de forma leve, conecta culturas e pessoas distintas.",
        "yourTrap": "Você é irresponsável. Promete e esquece, não cumpre compromissos, some quando a coisa aperta. Brutalmente honesto sem perceber que magoa. Impaciente com detalhes - quer ir direto ao ponto e erra por falta de atenção. Propensão a apostas de risco.",
        "inLove": "Você precisa de alguém que viaje com você - mentalmente ou fisicamente. Sufoca com parceiro ciumento ou caseiro demais. Dificuldade com compromisso - medo de perder liberdade. Trai pela necessidade de novidade, não por malícia.",
        "atWork": "Você é feito para turismo, ensino, filosofia, jornalismo, importação/exportação, esportes. Precisa de horário flexível e liberdade de movimento. Evite mesinha de escritório das 9 às 18.",
        "tryThis": "Termine um projeto que está aberto há meses antes de começar o próximo hoje."
    },
    "sun_capricorn": {
        "hook": "Você é o responsável do grupo. O que constrói, o que sustenta, o que pensa no longo prazo.",
        "youAre": "Você é sério, ambicioso e maduro desde cedo. Tinha mentalidade de adulto aos 15 anos. Gosta de estrutura, metas e de ver resultados concretos. Você trabalha duro e não espera reconhecimento fácil - sabe que merecimento leva tempo. Odeia desperdício, odeia gente irresponsável e odeia improviso. Você é o amigo que organiza a viagem, faz o orçamento e lembra de reservar o hotel com antecedência.",
        "yourPower": "Você é um construtor de legados. Persistência incomum - faz o que precisa ser feito mesmo sem vontade. Sua responsabilidade e competência fazem você ser indispensável. Honra suas palavras. Capacidade de planejar décadas à frente.",
        "yourTrap": "Você é workaholic. Trabalha demais e vive pouco. Pessimista funcional - sempre vê o que pode dar errado. Rígido demais, controlador, autoritário sem perceber. Medo de falhar que impede de arriscar. Frio emocionalmente.",
        "inLove": "Você demonstra amor com segurança material. Quer construir algo sólido com alguém. Mas é frio, distante e prioriza trabalho sobre relacionamento. Precisa aprender a ser carinhoso sem dar coisas. Ciumento por posse, não por paixão.",
        "atWork": "Você é feito para gestão, administração, engenharia, direito, política, finanças. Sobe na carreira aos poucos mas de forma sólida. Evite ambientes desorganizados ou sem perspectiva de crescimento.",
        "tryThis": "Desligue o celular do trabalho às 18h e vá fazer algo sem objetivo produtivo hoje."
    },
    "sun_aquarius": {
        "hook": "Você é o diferentão. Pensa fora da caixa, defende causas e tem amigos de todos os tipos.",
        "youAre": "Você é original, independente e intelectualmente curioso. Tem uma forma única de ver o mundo e não se importa em ser o estranho do grupo. Você valoriza amizade acima de romance, liberdade acima de segurança. Odeia conformismo, odeia regras sem sentido e odeia gente preconceituosa. Você é o amigo que tem um grupo de amigos de todos os lugares e ideologias e faz eles se entenderem.",
        "yourPower": "Você é visionário. Vê tendências antes de todo mundo. Inteligência original que resolve problemas de formas inesperadas. Humanitário de verdade - se importa com coletivo, com causas, com futuro. Amigo leal que não cobra presença constante.",
        "yourTrap": "Você é distante emocionalmente. Foge quando as coisas ficam intensas demais. Teimoso e radical nas opiniões. Rebelde por rebeldia, às vezes. Dificuldade em criar intimidade profunda - prefere mil conhecidos a três amigos íntimos.",
        "inLove": "Você precisa de um melhor amigo antes de um amante. Sufoca com parceiro ciumento ou tradicional demais. Relacionamento aberto ou com muita liberdade funciona melhor. Dificuldade com demonstração de afeto tradicional (presentes, romantismo clichê).",
        "atWork": "Você é feito para tecnologia, inovação, ciência, ativismo, design, comunidades online. Precisa de liberdade criativa e horário flexível. Evite hierarquias rígidas e tradicionais.",
        "tryThis": "Diga 'eu te amo' ou 'você é importante para mim' para alguém de forma sincera e direta hoje."
    },
    "sun_pisces": {
        "hook": "Você é o sonhador. Sensível, criativo e com um pé no mundo espiritual/invisível.",
        "youAre": "Você é compassivo, imaginativo e profundamente empático. Absorve emoções dos outros como esponja. Tem uma sensibilidade artística ou espiritual natural. Vive meio no mundo da lua - esquece datas, perde objetos, confunde horários. Odeia crueldade, odeia violência e odeia ter que ser duro com as pessoas. Você é o amigo que chora no filme, que escreve poesia e que sente a dor do mundo como se fosse sua.",
        "yourPower": "Você é compassivo de forma transcendental. Capacidade de curar através de presença, arte ou escuta. Intuição que parece adivinhação. Criatividade que vem de lugares profundos. Aceitação incondicional do outro.",
        "yourTrap": "Você é escapista. Quando a vida fica dura, some em vícios, sonhos ou procrastinação. Confuso, desorganizado, sem limites claros. Vitimização passiva - 'coitado de mim'. Propensão a relacionamentos codependentes ou abusivos por querer 'salvar' o outro.",
        "inLove": "Você ama romanticamente, idealisticamente. Quer alguém para salvar ou ser salvo. Mas confunde amor com pena. Sexualmente confuso ou muito imaginativo. Precisa de parceiro prático para ancorar você na realidade.",
        "atWork": "Você é feito para arte, música, terapia, enfermagem, instituições de caridade, trabalho com animais. Evite ambientes competitivos ou brutais. Precisa de missão que transcenda o material.",
        "tryThis": "Faça uma lista de tarefas realista e cumpra apenas metade hoje. Pratique o não."
    },

    // LOTE 2: LUA =========================================================
    "moon_aries": {
        "hook": "Sua emoção explode rápido e passa rápido. Você é impulsivo quando está mal e age antes de pensar.",
        "youAre": "Você sente tudo intensamente e imediatamente. Não tem filtro emocional - quando está irritado, todo mundo sabe. Quando está feliz, contagia. Sua necessidade emocional é de independência - você fica mal quando se sente preso ou controlado. Tem dificuldade em esperar para satisfazer necessidades - quer o prazer AGORA.",
        "yourPower": "Você se recupera rápido de decepções. Não fica se lamentando por meses. Coragem emocional para enfrentar o que precisa ser enfrentado. Honestidade emocional brutal - não esconde o que sente.",
        "yourTrap": "Ira infantil. Explode, fala o que não deve, quebra coisas (ou relacionamentos) e depois se arrepende. Impaciência emocional que gera conflitos desnecessários. Não sabe esperar o momento certo.",
        "inLove": "Você conquista direto, sem joguinhos. Mas é ciumento explosivo e possessivo quando inseguro. Precisa de parceiro que não trave sua liberdade emocional. Sexualmente impulsivo.",
        "atWork": "Funciona bem em crises - não panica. Mas tem dificuldade com rotinas emocionais estáveis. Precisa de desafios novos constantemente.",
        "comfort": "Quando está mal, precisa de ação física - exercício, caminhada, gritar, quebrar pratos (seguros).",
        "tryThis": "Conte até 20 antes de reagir emocionalmente hoje. Respira fundo antes de falar."
    },
    "moon_taurus": {
        "hook": "Você é emocionalmente estável, mas teimoso. Quando se aferra a alguém, é para sempre (ou até ser traído).",
        "youAre": "Você precisa de segurança emocional acima de tudo. Gosta de rotinas reconfortantes, comida boa, toque físico. Suas emoções são lentas para mudar - demora para irritar, mas quando irrita, demora anos para perdoar. Você é leal, mas possessivo. Sente ciúme de objetos, pessoas, até de hábitos.",
        "yourPower": "Estabilidade emocional que acalma os outros. Constância afetiva - não abandona quem ama na primeira dificuldade. Capacidade de criar conforto material e emocional para outros.",
        "yourTrap": "Teimosia emocional. Não aceita mudanças necessárias. Apego excessivo a relacionamentos ou situações tóxicas porque 'está acostumado'. Gula emocional - come quando está triste.",
        "inLove": "Você demonstra amor através de toque físico e presentes práticos. Mas é ciumento e controlador. Precisa de parceiro estável e previsível. Sexualmente sensual e preguiçoso.",
        "atWork": "Precisa de ambiente emocionalmente previsível. Mudanças bruscas de chefia ou política desestabilizam. Bem em trabalhos manuais ou com longo prazo.",
        "comfort": "Quando está mal, banho quente, comida caseira, cobertor macio, contato com natureza.",
        "tryThis": "Mude uma pequena rotina hoje. Coma algo diferente para o café da manhã."
    },
    "moon_gemini": {
        "hook": "Seu humor muda conforme o que você está pensando. Você racionaliza emoções e fala demais quando nervoso.",
        "youAre": "Você processa emoções através da mente. Quando está mal, precisa conversar, escrever, ler sobre o assunto. Seu humor é volátil - muda conforme o estímulo externo. Não gosta de emoções pesadas demais - prefere leveza. Você fica ansioso quando entediado emocionalmente.",
        "yourPower": "Flexibilidade emocional. Adapta-se rápido a novas situações. Capacidade de falar sobre sentimentos de forma clara. Humor que desarma tensões.",
        "yourTrap": "Dispersão emocional. Não aprofunda sentimentos, fica na superfície. Fala demais quando nervoso, expondo segredos. Inquietação emocional constante.",
        "inLove": "Você precisa de comunicação constante. Silêncios são tortura. Mas pode ser frio emocionalmente, tratando relacionamento como amizade. Precisa de variedade para não se entediar.",
        "atWork": "Bem em ambientes dinâmicos. Estresse vem de monotonia, não de volume de trabalho. Precisa trocar ideias com colegas.",
        "comfort": "Quando está mal, liga para um amigo, escreve no diário, assiste documentário interessante.",
        "tryThis": "Fique 15 minutos em silêncio sem distrações hoje. Apenas sinta, sem racionalizar."
    },
    "moon_cancer": {
        "hook": "Você é a definição de emotivo. Sua memória sentimental é enorme e você cuida dos outros instintivamente.",
        "youAre": "Você sente tudo em dobro. Tem intuição materna/paterna forte. Seu humor muda conforme o clima, a lua, o ambiente. Você guarda mágoas profundamente, embora finja que está bem. Precisa de 'lar' emocional - seja onde for. Quando ama, cuida, nutre, protege.",
        "yourPower": "Capacidade de acolher emocionalmente. Intuição afiada sobre necessidades alheias. Memória afetiva que fortalece laços. Proteção feroz da família.",
        "yourTrap": "Mudanças de humor extremas. Dependência emocional. Manipulação passiva-agressiva ('estou bem, não se preocupe'). Rancor que envenena você mesmo.",
        "inLove": "Você é o parceiro que faz comida, lembra de aniversários, cuida quando doente. Mas é ciumento, possessivo e tem medo de abandono. Precisa de segurança constante.",
        "atWork": "Excelente em trabalhos de cuidado. Precisa sentir que é 'família' no trabalho. Críticas duras demais machucam profundamente.",
        "comfort": "Quando está mal, comida da infância, fotos antigas, ficar em casa debaixo das cobertas, choro liberado.",
        "tryThis": "Pergunte 'o que EU preciso?' antes de cuidar de alguém hoje."
    },
    "moon_leo": {
        "hook": "Você precisa de atenção para se sentir emocionalmente seguro. É dramático quando magoado e generoso quando amado.",
        "youAre": "Você precisa ser reconhecido emocionalmente. Quando está feliz, brilha. Quando está mal, faz drama (consciente ou não) para ser notado. É leal e coração grande, mas orgulho ferido é sua maior dor. Você demonstra afeto de forma teatral e espera o mesmo em troca.",
        "yourPower": "Generosidade emocional. Coração quente que aquece os outros. Criatividade emocional. Capacidade de celebrar a vida e levantar o ânimo do ambiente.",
        "yourTrap": "Necessidade de aplauso constante. Feridas de orgulho que duram anos. Dramatização de emoções para chamar atenção. Autocentramento emocional.",
        "inLove": "Você é romântico, dramático e fiel. Mas precisa ser o centro do universo do parceiro. Se sentir ignorado, cria crise ou procura atenção em outro lugar. Ciumento de criança.",
        "atWork": "Precisa de reconhecimento emocional no trabalho - um 'parabéns' vale mais que dinheiro. Malcriação ou falta de respeito destroem sua motivação.",
        "comfort": "Quando está mal, shopping, elogios, postar foto bonita nas redes, sair para ser visto, presentes.",
        "tryThis": "Dê atenção genuína a alguém sem esperar retorno hoje. Apenas escute."
    },
    "moon_virgo": {
        "hook": "Você analisa demais o que sente. Precisa de ordem para se sentir seguro emocionalmente.",
        "youAre": "Você processa emoções através de análise. Quando está ansioso, organiza gavetas. É prático no afeto - demonstra cuidando, arrumando, resolvendo problemas. Difícil relaxar porque a mente não para. Você é autocritico severo e se preocupa com saúde quando estressado.",
        "yourPower": "Serviço prático como forma de amor. Capacidade de ajudar efetivamente em crises. Análise emocional que evita dramas desnecessários. Prestatividade constante.",
        "yourTrap": "Ansiedade crônica. Autocrítica que gera depressão. Dificuldade em aceitar sentimentos 'irracionais'. Workaholism como escape emocional.",
        "inLove": "Você demonstra amor fazendo coisas úteis. Mas é frio demais, parece não se importar. Critica o parceiro 'para ajudar'. Precisa de alguém paciente com suas manias.",
        "atWork": "Funciona bem em ambientes organizados. Estresse vem de caos ou imperfeição. Precisa sentir que está sendo útil.",
        "comfort": "Quando está mal, limpar a casa, fazer lista, resolver problema prático de alguém, exercício físico organizado.",
        "tryThis": "Faça algo imperfeito de propósito hoje. Deixe a louça na pia por uma noite."
    },
    "moon_libra": {
        "hook": "Você precisa de harmonia para estar bem. Conflitos te desestabilizam completamente.",
        "youAre": "Você evita confronto a todo custo. Precisa de parceria - estar sozinho é seu maior medo. É encantador, diplomático e busca agradar para manter paz. Indeciso emocionalmente - depende da opinião alheia para saber o que sente. Você romanticiza relacionamentos.",
        "yourPower": "Diplomacia emocional. Capacidade de ver todos os lados. Criador de harmonia. Charme natural que acalma tensões.",
        "yourTrap": "Dependência emocional de relacionamentos. Evitação de conflitos necessários. Indecisão paralisante. Falso agradável que acumula ressentimento.",
        "inLove": "Você é romântico e busca parceria acima de tudo. Mas idealiza demais. Fica em relacionamento ruim por medo de solidão. Ciumento disfarçado de preocupação.",
        "atWork": "Precisa de ambiente harmonioso. Brigas de colegas destroem seu dia. Funciona bem em equipe, mediando conflitos.",
        "comfort": "Quando está mal, conversar com amigo próximo, ambiente bonito e arrumado, música suave, comprar algo estético.",
        "tryThis": "Expresse uma opinião contrária hoje, mesmo que cause leve desconforto."
    },
    "moon_scorpio": {
        "hook": "Suas emoções são intensas e profundas. Você não sente pela metade - ou ama ou odeia.",
        "youAre": "Você sente tudo em profundidade. Não tem emoções rasas - é tudo ou nada. Desconfiança instintiva - não confia fácil. Quando ama, é obsessivo. Quando magoa, é destrutivo. Você tem necessidade de controle emocional e odeia vulnerabilidade.",
        "yourPower": "Intensidade emocional que transforma. Lealdade absoluta. Capacidade de cura profunda (própria e alheia). Coragem emocional para enfrentar tabus.",
        "yourTrap": "Obsessão emocional. Ciúme compulsivo. Controle manipulador. Rancor eterno. Autodestruição emocional quando ferido.",
        "inLove": "Você é possessivo, intenso e sexualmente profundo. Mas desconfiado e testa o parceiro constantemente. Ou é tudo ou é nada - não aceita meio-termo.",
        "atWork": "Funciona bem em investigação, terapia, finanças. Precisa de profundidade, não superficialidade. Críticas são levadas para o lado pessoal.",
        "comfort": "Quando está mal, mergulha no escuro (filmes pesados, músicas tristes), investigação, sexo, transformação física (corte de cabelo radical).",
        "tryThis": "Confie em alguém hoje sem testar ou investigar. Apenas entregue-se."
    },
    "moon_sagittarius": {
        "hook": "Você foge de emoções pesadas. Precisa de liberdade e otimismo para se sentir bem.",
        "youAre": "Você lida com emoções através de filosofia, viagem ou humor. Quando está mal, planeja viagem ou estuda algo novo. Odeia sentimentos de aprisionamento. É otimista por natureza - acredita que tudo vai dar certo. Emoções expansivas, mas superficiais às vezes.",
        "yourPower": "Otimismo que cura. Visão ampla que coloca problemas em perspectiva. Liberdade emocional que inspira. Humor que desarma dor.",
        "yourTrap": "Fuga de emoções profundas. Otimismo cego que ignora problemas reais. Impaciência com processos emocionais lentos. Commitment issues.",
        "inLove": "Você precisa de espaço dentro do relacionamento. Sufoca com parceiro apegado. Trai pela necessidade de novidade. Honesto demais sobre sentimentos.",
        "atWork": "Precisa de liberdade de horário e movimento. Rotina emocional desgasta. Bem em trabalhos internacionais ou de ensino.",
        "comfort": "Quando está mal, planeja viagem, estuda algo novo, sai com amigos divergentes, aventura.",
        "tryThis": "Fique com uma emoção desconfortável por 30 minutos hoje sem fugir para atividade."
    },
    "moon_capricorn": {
        "hook": "Você controla as emoções. Demonstra afeto através de responsabilidade, não palavras doces.",
        "youAre": "Você é emocionalmente contido desde criança. Aprendeu cedo que não deve demonstrar fraqueza. Afeto = responsabilidade. Quando ama, cuida financeiramente, protege, estrutura. Tem dificuldade em pedir colo ou ajuda. Seus piores medos são perder controle ou ser dependente.",
        "yourPower": "Responsabilidade emocional. Confiança - não te abandonam na primeira dificuldade. Estruturação de segurança para outros. Maturidade emocional.",
        "yourTrap": "Rigidez emocional. Frieza defensiva. Depressão mascarada de 'cansaço'. Dificuldade em demonstrar ternura. Workaholism para evitar sentir.",
        "inLove": "Você demonstra amor com segurança material e presença estável. Mas é frio, distante e prioriza trabalho sobre intimidade. Parceiro pode sentir falta de calor.",
        "atWork": "Emocionalmente estável em crises. Assume responsabilidade alheia. Malcriação ou falta de respeito são inaceitáveis.",
        "comfort": "Quando está mal, trabalha mais, organiza finanças, estrutura algo, busca status.",
        "tryThis": "Peça abraço ou ajuda a alguém hoje. Mostre vulnerabilidade."
    },
    "moon_aquarius": {
        "hook": "Você processa emoções intelectualmente. Precisa de espaço e amizade mais que paixão.",
        "youAre": "Você racionaliza sentimentos. 'Por que estou triste? Analisemos'. Precisa de liberdade emocional - sufoca com apegos possessivos. É amigo dos amigos, mas distante em intimidade profunda. Tem emoções humanitárias mas pode ser frio com individualidades próximas.",
        "yourPower": "Objetividade emocional. Capacidade de ajudar sem se envolver demais. Originalidade emocional. Amizade como base sólida.",
        "yourTrap": "Frieza emocional. Distanciamento defensivo. Dificuldade em criar intimidade. Reacionarismo emocional. Achar que emoções são 'iracionais'.",
        "inLove": "Você precisa de amigo/amante. Sufoca com drama emocional. Precisa de espaço dentro do casamento. Demonstra amor com ideias e coisas damente, não carinho físico.",
        "atWork": "Emocionalmente desapegado - bom para crises. Precisa de causa para se motivar. Ambientes hierárquicos tradicionais sufocam.",
        "comfort": "Quando está mal, debate com amigos, estuda algo novo, ativismo, tecnologia, distração intelectual.",
        "tryThis": "Toque físico (abraço, mão no ombro) com alguém próximo hoje, sem palavras."
    },
    "moon_pisces": {
        "hook": "Você absorve emoções dos outros. É confuso sobre o que é seu e o que é dos outros.",
        "youAre": "Você é empático demais - sente a dor do mundo. Confunde seus sentimentos com os alheios. Vive em mundo de fantasia para escapar da dor real. É compassivo, artístico, mas confuso. Procrastina para não enfrentar realidade. É o 'coitadinho' ou o 'salvador' - oscila.",
        "yourPower": "Compaixão transcendental. Intuição emocional. Cura através de presença. Arte como escape saudável. Aceitação incondicional.",
        "yourTrap": "Confusão emocional. Vitimização. Escapismo (drogas, álcool, sono, sonho acordado). Sem limites - deixa outros invadirem espaço emocional.",
        "inLove": "Você idealiza o parceiro ('salvador' ou 'salvo'). Confunde amor com pena. Sexualmente confuso ou muito imaginativo. Codependência.",
        "atWork": "Bem em trabalhos de cura, arte, instituições. Precisa de missão transcendent. Ambientes brutais destroem você.",
        "comfort": "Quando está mal, música, filmes, choro, sono, arte, água (banho, mar), ajudar alguém mais necessitado.",
        "tryThis": "Diga 'não' a um pedido hoje. Estabeleça um limite claro."
    },

    // LOTE 3: ASCENDENTE =======================================================
    "ascendant_aries": {
        "hook": "Você chega chegando. Primeira impressão: energético, impaciente e competitivo.",
        "mask": "Você parece sempre com pressa. Anda rápido, fala rápido, decide rápido. As pessoas te veem como corajoso, talvez até agressivo. Parece mais confiante do que é por dentro.",
        "firstImpression": "Competitivo, pioneiro, talvez autoritário. Parece que vai tomar a frente.",
        "physical": "Postura ereta, movimentos rápidos, olhar direto. Possível marquinha na cabeça ou rosto. Aparência atlética ou magra.",
        "howOthersSee": "Energia inicial contagiante, mas talvez intempestivo. Líder nato ou encrenqueiro.",
        "tryThis": "Pare 3 segundos antes de entrar num ambiente. Observe antes de agir."
    },
    "ascendant_taurus": {
        "hook": "Você parece calmo, estável e teimoso. Transmite segurança material.",
        "mask": "Você parece tranquilo, difícil de abalar. Movimentos lentos, voz firme. As pessoas acham que você tem dinheiro ou gosta de coisas caras. Parece teimoso ou inflexível.",
        "firstImpression": "Estável, confiável, talvez preguiçoso ou apegado a bens.",
        "physical": "Corpo forte, pescoço grosso, voz agradável, cabelo espesso. Vestes confortáveis mas de qualidade. Perfume marcante.",
        "howOthersSee": "Rocha segura, mas difícil de mudar de ideia. Alguém em quem confiar no longo prazo.",
        "tryThis": "Mude algo na sua aparência hoje - um acessório diferente."
    },
    "ascendant_gemini": {
        "hook": "Você parece curioso, falante e jovem. Movimenta-se rápido e fala com as mãos.",
        "mask": "Você parece inquieto, sempre com algo para fazer. Gesticula, muda de assunto rápido. As pessoas acham que você sabe de tudo um pouco. Parece mais novo que a idade.",
        "firstImpression": "Inteligente, comunicativo, mas talvez superficial ou fofoqueiro.",
        "physical": "Magro ou esguio, mãos expressivas, olhar curioso, movimentos rápidos. Vestes variadas.",
        "howOthersSee": "Interessante, divertido, mas difícil de prender atenção por muito tempo. Bom de papo.",
        "tryThis": "Fique em silêncio por 1 minuto em grupo hoje. Apenas observe."
    },
    "ascendant_cancer": {
        "hook": "Você parece acolhedor, protetor e um pouco fechado no início.",
        "mask": "Você parece tímido ou reservado à primeira vista, mas gentil. As pessoas sentem que você é seguro emocionalmente. Parece maternal/paternal. Sorriso protetor.",
        "firstImpression": "Acolhedor, familiar, mas talvez defensivo ou lunar (mudável).",
        "physical": "Rosto redondo ou aberto, olhos expressivos. Vestes confortáveis, talvez retrô.",
        "howOthersSee": "Seguro, mas precisa conhecer melhor para abrir. Parece ter 'cara de quem cuida'.",
        "tryThis": "Diga um 'oi' genuíno para um estranho hoje. Abra-se um pouco mais."
    },
    "ascendant_leo": {
        "hook": "Você brilha quando entra. Parece confiante, dramático e atencioso.",
        "mask": "Você parece o centro das atenções mesmo sem querer. Postura majestosa, cabelo chamativo. As pessoas notam você. Parece orgulhoso ou arrogante às vezes.",
        "firstImpression": "Carismático, teatral, generoso, mas talvez vaidoso ou egocêntrico.",
        "physical": "Cabelo volumoso, postura ereta, andar majestoso, olhar direto. Vestes elegantes ou chamativas, tons quentes.",
        "howOthersSee": "Alguém importante, digno de respeito. Líder natural ou drama queen.",
        "tryThis": "Deixe outra pessoa ser centro das atenções hoje. Apoie sem brilhar."
    },
    "ascendant_virgo": {
        "hook": "Você parece organizado, discreto e observador. Analisa antes de falar.",
        "mask": "Você parece tímido ou reservado. Vestes simples, limpas. As pessoas acham que você é metódico ou perfeccionista. Parece preocupado com detalhes.",
        "firstImpression": "Discreto, competente, mas talvez crítico ou ansioso.",
        "physical": "Aparência limpa, movimenta-se com precisão. Vestes neutras, práticas.",
        "howOthersSee": "Confiável, detalhista, mas difícil de relaxar. O organizador ou solucionador.",
        "tryThis": "Use uma roupa colorida ou que fuja do padrão hoje."
    },
    "ascendant_libra": {
        "hook": "Você parece charmoso, elegante e indeciso. Sorriso fácil e educado.",
        "mask": "Você parece agradável, harmônico. Evita conflitos visíveis. As pessoas acham que você é charmoso ou vaidoso. Sorriso educado, postura graciosa.",
        "firstImpression": "Encantador, diplomático, mas talvez superficial ou passivo.",
        "physical": "Rosto simétrico, sorriso bonito, postura graciosa. Vestes elegantes, estilosas, tons harmônicos.",
        "howOthersSee": "Agradável, fácil de conversar, mas foge das polêmicas ao primeiro sinal.",
        "tryThis": "Dê uma opinião forte sobre algo hoje, mesmo que divida o ambiente."
    },
    "ascendant_scorpio": {
        "hook": "Você parece intenso, misterioso e magnético. Olhar penetrante.",
        "mask": "Você parece reservado, silencioso e muito focado. Poucas palavras e muita atitude. As pessoas sentem que você vê a alma delas de longe.",
        "firstImpression": "Intenso, misterioso, sexualmente carregado, perigoso.",
        "physical": "Olhos penetrantes, olhar fixo, roupas escuras. Magnetismo intimidador.",
        "howOthersSee": "Fascinante, alguém com quem não se deve brincar, guarda segredos.",
        "tryThis": "Sorria abertamente para um estranho na rua. Quebre o clima pesado."
    },
    "ascendant_sagittarius": {
        "hook": "Você parece otimista, expansivo e farto de risada. Estrangeiro solto.",
        "mask": "Você parece alegre, viajado, filosófico. Movimentos amplos. As pessoas acham você destemido ou descuidado com detalhes. Chega de supetão, rindo largo.",
        "firstImpression": "Aventureiro, otimista, exagerado.",
        "physical": "Postura ereta, passadas largas, sorriso largo, olhar pro horizonte. Roupa casual ou esportiva.",
        "howOthersSee": "Divertido, livre, inspirador, às vezes parece estar apenas de passagem pela sua vida.",
        "tryThis": "Fique quietinho no mesmo projeto por uma hora contínua hoje."
    },
    "ascendant_capricorn": {
        "hook": "Você parece sério, maduro e responsável. Mais velho que a idade.",
        "mask": "Você parece autoridade natural, distante ou frio. Vestes conservadoras, postura rígida. As pessoas acham que você é o líder ou sócio sênior da mesa.",
        "firstImpression": "Sério, competente, ambicioso, exigente.",
        "physical": "Estrutura óssea forte, postura dura, roupas de aparência clássica. Impõe respeito silencioso.",
        "howOthersSee": "Alguém em quem confiar para trabalho sério, duro, mas inatingível no bar depois do trampo.",
        "tryThis": "Compre uma bugiganga idiota que você saiba que não serve pra nada prático."
    },
    "ascendant_aquarius": {
        "hook": "Você parece diferente, moderno e distante. Original sem tentar.",
        "mask": "Você parece estranho, progressista, excêntrico. Olhar perdido para o futuro, roupas peculiares. Amigo da horda ciber-punk que só você habita.",
        "firstImpression": "Original, genial de longe, arrogante aos olhos conservadores.",
        "physical": "Aparência desconectada da moda vigente, futurista ou desleixada brilhantemente. Olhar para longe.",
        "howOthersSee": "Interessante, muito sagaz, mas é como namorar um satélite da Nasa de tão impessoal.",
        "tryThis": "Tente se vestir o mais padrão sociedade classe média possível por ironia social hoje."
    },
    "ascendant_pisces": {
        "hook": "Você parece sonhador, confuso e compassivo. Olhar perdido em Nárnia.",
        "mask": "Você parece poético, doce, a vítima incompreendida de alguma tragédia bonita. Seus olhos não focam no pragmatismo imediato. Transpira doçura solta.",
        "firstImpression": "Sensível, compassivo, empático, talvez fácil de ser guiado.",
        "physical": "Olhos umbilicais de água, olhar úmido. Tecidos fluídos ou largos. Cabela em desordem orgânica.",
        "howOthersSee": "Docinho da roda, quer protegê-lo, escuta todo mundo com doçura profunda.",
        "tryThis": "Quando te chamarem pra um resgate emocional hoje, diga 'que pena' sem se envolver."
    },

    // LOTE 4: VÊNUS =========================================================
    "venus_aries": {
        "hook": "Você conquista rápido e direto. Paixão à primeira vista e ciúme explosivo.",
        "loveStyle": "Você vai atrás do que quer. Não joga joguinhos de esperar - se gosta, chama para sair na hora. Amor é conquista, aventura, adrenalina. Você se atrai por pessoas corajosas, atléticas ou desafiadoras. Odeia parceiro passivo ou lento demais.",
        "attraction": "Gosta de quem tem energia, iniciativa, corpo atlético ou postura desafiadora. Quem joga duro para pegar te instiga.",
        "relationship": "Relacionamento precisa de movimento - viagens, esportes, sexo intenso. Fica entediado com rotina amorosa. Ciumento impulsivo - explode, cria crise, depois faz as pazes rapidinho.",
        "gift": "Te conquista com atitude direta, convites para aventuras, competição saudável.",
        "tryThis": "Espere 48 horas antes de mandar mensagem para alguém que te interessa hoje. Pratique a paciência."
    },
    "venus_taurus": {
        "hook": "Você demonstra amor com toque físico e presentes práticos. Lealdade absoluta, mas possessivo.",
        "loveStyle": "Você ama aos poucos, mas para sempre. Precisa de segurança material no relacionamento - não funciona com alguém instável financeiramente. Demonstra carinho com comida boa, presentes úteis, abraços longos. Sexualmente sensual e preguiçoso - gosta de conforto.",
        "attraction": "Atraído por beleza física, voz agradável, alguém que cheira bem, estabilidade material. Gosta de corpos sólidos, naturais.",
        "relationship": "Relacionamento duradouro, mas teimoso. Não aceita traição - é ponto final. Ciumento possessivo ('o que é meu é meu'). Gosta de rotinas agradáveis.",
        "gift": "Te conquista com jantar romântico, presentes caros e úteis, toque físico constante.",
        "tryThis": "Dê um elogio genuíno sem esperar nada em troca hoje. Amor desinteressado."
    },
    "venus_gemini": {
        "hook": "Você se apaixona pela mente. Inteligência é seu maior fetiche.",
        "loveStyle": "Você precisa conversar com o parceiro sobre tudo. Silêncios são tortura. Amor começa na amizade intelectual. Você flerta com palavras, trocadilhos, mensagens inteligentes. Precisa de variedade - mesmice mata. Pode ter duas paixões simultâneas (ou parecer ter).",
        "attraction": "Atraído por inteligência, humor, versatilidade, jovialidade. Quem sabe de tudo um pouco. Comunicação afiada.",
        "relationship": "Relacionamento precisa ser dinâmico - sair, conhecer pessoas, aprender juntos. Você trai pela mente (flerte intelectual). Ciúme te irrita, não te magoa.",
        "gift": "Te conquista com conversa brilhante, mensagens criativas, curiosidade sobre você.",
        "tryThis": "Fique em silêncio e apenas ouça seu parceiro por 10 minutos hoje sem interromper."
    },
    "venus_cancer": {
        "hook": "Você busca segurança emocional acima de tudo. Maternal/paternal no amor.",
        "loveStyle": "Você demonstra amor cuidando, alimentando, protegendo. Precisa de 'lar' emocional com o parceiro. Ciumento e possessivo, mas esconde. Fica mal se parceiro esquece datas importantes. Sexualmente, precisa de conexão emocional profunda antes.",
        "attraction": "Atraído por quem precisa de cuidados, famílias estáveis, nostalgia, segurança. Quem tem 'cara de quem vai ficar'.",
        "relationship": "Relacionamento é família. Você cozinha, cuida, lembra de remédio. Mas pode ser manipulador emocional ('estou bem, não liga'). Mudanças de humor afetam relacionamento.",
        "gift": "Te conquista com jantar em casa, fotos de infância, apresentar para a família.",
        "tryThis": "Peça algo que você precisa diretamente, sem joguinhos emocionais hoje."
    },
    "venus_leo": {
        "hook": "Você ama intensamente e dramaticamente. Precisa ser o centro do mundo do parceiro.",
        "loveStyle": "Você ama com teatro - declarações públicas, presentes extravagantes, postagens românticas. Precisa ser admirado pelo parceiro. Se sentir ignorado, cria crise ou procura atenção em outro lugar. Generoso, mas exige reconhecimento.",
        "attraction": "Atraído por glamour, criatividade, quem brilha, elegância. Gosta de ser visto com pessoa bonita/chamativa.",
        "relationship": "Relacionamento é show. Você é romântico, mas dramático. Ciumento de criança - precisa ser o preferido. Sexualmente, precisa de elogios e teatralidade.",
        "gift": "Te conquista com elogios públicos, presentes extravagantes, demonstrações calorosas.",
        "tryThis": "Dê o spotlight inteiro para o parceiro hoje em algum palco que seria seu."
    },
    "venus_virgo": {
        "hook": "Você demonstra amor fazendo coisas úteis. Analisa o parceiro antes de entregar-se.",
        "loveStyle": "Você não é de declarações dramáticas, mas de atos práticos: arruma a casa, corrige detalhes, cuida da saúde do outro. Analisa muito antes de se envolver - lista prós e contras. Sexualmente, tímido no início, mas atento ao detalhe no prazer do outro logo em seguida.",
        "attraction": "Atraído por competência, limpeza, organização, saúde, inteligência prática. Alguém bem arrumado e asseado.",
        "relationship": "Relacionamento é parceria prática. Você resolve problemas, organiza a vida. Mas critica demais ('só estou tentando ajudar').",
        "gift": "Te conquista provando prestatividade útil na bagunça do seu dia a dia prático.",
        "tryThis": "Olhe as pequenas falhas práticas da pessoa hoje e fique incrivelmente mudo sobre elas."
    },
    "venus_libra": {
        "hook": "Você busca parceria ideal, harmonia e romance dos filmes.",
        "loveStyle": "Você idealiza o amor. Quer casamento, parceria, alguém para completar você. Odeia conflitos - vai longe para evitar brigas. Romântico, delicado, mas indeciso entre duas opções. Sexualmente, busca beleza estética absoluta entre 4 paredes.",
        "attraction": "Atraído pela etiqueta charmosa, voz polida, perfume harmônico, cortesia sem igual e sorrisos perfeitos.",
        "relationship": "Você anula suas próprias vontades pra agradar a parceria num nível nocivo em vez de peitar o incômodo. Engole e guarda.",
        "gift": "Te conquista com mimos românticos bem embrulhados repletos de laços de papel bonito e jantares.",
        "tryThis": "Discorde de mau gosto intencionalmente da pessoa amada pra treinar o conflito minúsculo."
    },
    "venus_scorpio": {
        "hook": "Você ama com obsessão e intensidade. Toda história afetiva é guerra termonuclear.",
        "loveStyle": "Você não faz amor pela superfície de final de semana. Finge que não liga, mas quer o controle subterrâneo do outro. Sua sedução é silêncio puro fixado no olhar letal. O pacto transborda numa química indescritível e brutal de intimidade que vicia os dois pro abismo maravilhoso.",
        "attraction": "Magnetizados pela dor e pelo mistério oculto que a pessoa trancou a chaves. Você gosta de quebrar o cofre obscuro e arrancar confissões que ninguém ouviu o cara dizer no bar.",
        "relationship": "Paranoia com a fidelidade e investigação completa na aba preta dos seguidores do insta. Ao se acalmar confia até a alma; se quebrar, você detona os viadutos para a pessoa nunca mais voltar.",
        "gift": "Aquela lealdade crua quando seu mundo tá caindo de fato, o pinguim parceiro estando ali fixo e não pulando do navio.",
        "tryThis": "Não fuce as redes escuras em busca do perigo ilusório imaginário do crime afetivo hoje."
    },
    "venus_sagittarius": {
        "hook": "Você ama a liberdade dentro do relacionamento. Precisa rir como amizades idiotas.",
        "loveStyle": "Você foge de grades por mais que sejam de ouro romântico. Relacionamentos devem ter mochilas da North Face compradas pras férias e zero textão de Whatsapp sobre onde e que horas vai deitar.",
        "attraction": "Exóticos, cheios de sotaques estrangeiros ou gente focada no pós-doc. Atração de mentes cultas em baratas, humor escrachado inteligente te desarma os limites rapidinho.",
        "relationship": "Você é sincericida na DR. Pode ofender pesado na hora da honestidade, solta a granada de rir depois que explodiu os corações.",
        "gift": "O bilhete de passagem da Raynair amasso num bolso chamando pra subir a montanha, livros soltos, carinho com bilhetes hilários.",
        "tryThis": "Mande uma cantada terrivelmente cafona prosseguindo apenas da intimidade vulgar das novelas de época."
    },
    "venus_capricorn": {
        "hook": "Você busca parceiro para construir a solidez familiar base. O afeto é investimento do CNPJ.",
        "loveStyle": "Sua Vênus bate o ponto no amor e aposta nos ganhos concretos depois do longo prazo que a velhice proverá. O romântico rola nos bastidores ocultos depois que o IR a dois for selado de garantias e os tijolos aprovados.",
        "attraction": "Seriedade atraente, quem carrega status robusto e não se envolve com perdas idiotas nas farras sem propósitos de juventude atrasada. Profissionalismo no portar exala ferormônio no seu cérebro.",
        "relationship": "Burocraticamente frios, mas os provedores máximos na segurança - enquanto quem ama declama versos e depois não paga comida, você banca a quimioterapia em silêncio se for necessário pra pessoa amada viver sólida.",
        "gift": "O relógio de grife caríssimo funcional que durará três heranças passando pra netos sem perigo da moda do aço acabar.",
        "tryThis": "Mande um poema fútil inútil de versos sem o menor peso da responsabilidade histórica e não sinta culpa da falta da praticidade da ação afetiva fofa atoa."
    },
    "venus_aquarius": {
        "hook": "Você ama como amigo antes de tudo. Ficar em silêncio separados em casa é declaração pra casar.",
        "loveStyle": "Os ritos tradicionais da dança dos pares que todo mundo idolatra (como dia de mêsário dos anéis que tem cadeados nas pontes ridículas) não rola. Você acha o amor na subversão - transa nas convenções dos hackers trocando hardwares e ideologia sem fronteiras.",
        "attraction": "O esquisito inteligente incompreendido da roda do qual os comuns fugiriam espantados – aquele nerd ou o ativista insólito que choca os almoços patriarcais da direita com piercings não catalogados.",
        "relationship": "As distâncias preservam o frio cerebral ameno. Estão juntos unidos mas tem horas q dormem com as paredes de portas e banheiros isolados; vocês são de se apoiar com pactos silenciosos e liberdade mútua total zero ciumes burros.",
        "gift": "Algo hi-tech modernista importado revolucionário, e bilhetes eletrônicos num meta-nível das zombarias do amor que cês tiram sarro juntos.",
        "tryThis": "Um abraço quente de koala mudo que dura longos minutos abraçando os batimento suados apertados em vez de mandar o memezinho pro whats amanhã."
    },
    "venus_pisces": {
        "hook": "Você espeta a veia da poesia do além por amor infinito. Enxerga as dores como beleza romântica universal.",
        "loveStyle": "Cura e Salvação – todo parceiro ou te esmaga, ou se torna a cruz da salvação mutua que vaza pro sacrifício das ilusões e sonhos cegados. Entre as cordas elétricas e os abalos cês transcendem nos sonhos mais utópicos mágicos e sensuais onde não há identidade pessoal, e o universo de vocês não tem tempo exato físico pra agir.",
        "attraction": "Os machucados da selva, o cão triste que chove, os boêmios da madrugada genial mas perdidos de grana de alcool que parecem a personificação duma peça melancólica triste com alma pura brilhante precisando dum porto seguro dos teus beijos.",
        "relationship": "Os limites e nãos são dissolvidos pela empatia gigante crassa - você não enxerga as mentiras sujas em volta porque pinta rosas falsas brilhantes mágicas nos chorume para enaltecer a pessoa - quando os trancos da traição te acordam é com os piores baldes cósmicos rasgando a barriga.",
        "gift": "Poemas colhidos perdidos nas canções místicas de fadas e incensos, pedras, almas enroscadas escutando as frequências binaurais entre as fronhas místicas num fim na tarde chuvosa das águas da eternidade.",
        "tryThis": "Bata as unhas das mãos forte no piso hoje – repete os prós e contras visíveis frios na ponta do caneta fria da papelaria ao som de um telejornal cru pra se chocar num reality check de onde sua Vênus andou te empurrando agora."
    },

    // LOTE 5: MARTE =========================================================
    "mars_aries": {
        "hook": "Você ataca a vida de frente. Quando quer algo, vai buscar sem hesitar. Sua energia é contagiante, mas explode fácil.",
        "actionStyle": "Você é impulsivo e corajoso. Não fica planejando demais - experimenta, erra, tenta de novo. Inicia projetos com fogo, mas pode abandonar se demorar muito. Você compete até para estacionar o carro. Gosta de desafios físicos e de ser o primeiro.",
        "anger": "Sua raiva explode quente e rápido. Xinga, bate na mesa, depois esquece em dez minutos. Não guarda mágoa, mas enquanto está irritado, é melhor sair da frente. Você fala o que pensa na hora da raiva e depois se arrepende.",
        "sexDrive": "Você é direto e intenso. Quer sedução rápida, conquista imediata. Sexo é aventura, desafio, energia física. Prefere iniciar, liderar, ser o caçador. Fica entediado com parceiros passivos demais.",
        "workDrive": "Você trabalha em rajadas intensas. Adrenalina é seu combustível. Resolve crises melhor que qualquer um, mas odeia processos lentos e burocráticos. É o primeiro a levantar a mão para o desafio impossível.",
        "tryThis": "Espere 24 horas antes de iniciar uma briga ou projeto novo hoje. Respire antes de atacar."
    },
    "mars_taurus": {
        "hook": "Você é lento para irritar, mas quando explode, é destrutivo. Persistência é sua arma secreta.",
        "actionStyle": "Você age devagar, mas inexoravelmente. Quando decide algo, ninguém tira da sua cabeça. Não gosta de mudanças abruptas - prefere o caminho conhecido. Você constrói, acumula, conquista pelo esforço contínuo. Teimoso não, teimosíssimo.",
        "anger": "Sua raiva é fria e demora a sair. Você acumula, acumula, depois explode de forma proporcional ao tempo que aguentou. Quebra portas, grita graves, ou simplesmente corta a pessoa da vida para sempre. Rancor duradouro.",
        "sexDrive": "Você é sensual, lento e preguiçoso. Prefere conforto, ambiente agradável, preliminares longas. Sexo é prazer físico, não só emocional. Ciumento possessivo - o que é seu é seu e ponto final.",
        "workDrive": "Você trabalha como um boi - pesado, constante, sem reclamar. Excelente para trabalhos manuais ou de longo prazo. Não gosta de pressa, mas entrega resultado sólido. Odeia ser apressado.",
        "tryThis": "Mude um hábito pequeno hoje. Faça algo diferente do seu jeito usual."
    },
    "mars_gemini": {
        "hook": "Você age rápido, fala mais do que faz e se distrai no meio do caminho.",
        "actionStyle": "Você age por impulso mental - mil ideias, mil projetos simultâneos. Começa animado, depois vê outra coisa interessante e muda de foco. Gosta de debates, argumentação, mentalidade rápida. Multitarefa é com você, mas acaba disperso.",
        "anger": "Sua raiva é verbal e cortante. Manda mensagens na hora da raiva, fala o que não deve, depois quer voltar atrás. Não é violento fisicamente, mas destrói com palavras. Irrita-se facilmente com lentidão mental.",
        "sexDrive": "Você seduz com palavras. Sexo começa na mente - conversa erótica, joguinhos mentais. Precisa de variedade e novidade. Tédio é seu inimigo. Pode ter curiosidade por experimentações.",
        "workDrive": "Você trabalha rápido, mas superficialmente. Mil tarefas abertas. Excelente para brainstorming, vendas, comunicação. Odeia trabalho braçal ou repetitivo. Precisa de estímulo constante.",
        "tryThis": "Termine uma tarefa que começou ontem antes de iniciar outra hoje. Foco único."
    },
    "mars_cancer": {
        "hook": "Você defende o que é seu com unhas e dentes. Ataque emocional é sua arma.",
        "actionStyle": "Você age por instinto protetor. Defende família, casa, segurança. Não é agressivo de cara, mas se sentir ameaçado, ataca pelas costas ou de forma passivo-agressiva. Mudanças de humor afetam sua produtividade. Trabalha melhor quando emocionalmente seguro.",
        "anger": "Sua raiva é manipuladora. Diz 'estou bem' mas faz cara feia. Guarda mágoa e ataca quando a pessoa menos espera. Ciúme histórico. Pode ser vingativo frio - espera o momento certo para atacar.",
        "sexDrive": "Você é instintivo, emotivo e possessivo. Sexo sem conexão emocional é vazio. Precisa de segurança para se entregar. Ciumento obsessivo. Fidelidade é absoluta (e exige absoluta de volta).",
        "workDrive": "Você trabalha em ciclos conforme o humor. Dias produtivos intercalados com dias reclusos. Excelente para cuidar de pessoas, trabalho doméstico, imóveis. Defende a empresa como se fosse família.",
        "tryThis": "Expresse raiva diretamente hoje. Diga 'estou irritado porque...' sem joguinhos."
    },
    "mars_leo": {
        "hook": "Você age com autoridade natural. Gosta de ser o chefe e detesta ser mandado.",
        "actionStyle": "Você age com coragem e teatralidade. Gosta de desafios que provem sua valia. Lidera pelo exemplo, mas pode ser autoritário. Orgulho ferido te paralisa ou te faz reagir violentamente. Precisa de reconhecimento por suas ações.",
        "anger": "Sua raiva é dramática e barulhenta. Grita, faz cena, bate na mesa. Ofende o orgulho alheio. Mas passa rápido se receber desculpas adequadas. Não suporta ser humilhado ou ignorado.",
        "sexDrive": "Você é dramático, intenso e precisa ser o melhor. Sexo é performance, paixão, teatralidade. Precisa de elogios no momento. Ciumento de quem desafia sua supremacia.",
        "workDrive": "Você trabalha para brilhar. Lidera equipes, mas pode monopolizar o crédito. Excelente para gerência, entretenimento, cargos de destaque. Odeia trabalhar em posição subalterna.",
        "tryThis": "Deixe outro pessoa liderar um projeto pequeno hoje. Apoie sem ser centro."
    },
    "mars_virgo": {
        "hook": "Você age metodicamente e critica enquanto faz. Perfeccionismo na execução.",
        "actionStyle": "Você age com precisão, método e eficiência. Analisa antes de agir, mas pode paralisar na análise. Trabalho é serviço - você resolve problemas concretos. Detalhista ao extremo. Nervosismo gera produtividade compulsiva.",
        "anger": "Sua raiva é irritação constante, críticas contínuas, aperfeiçoamento compulsivo. Não explode, mas reclama. Fica mal-disposto, impaciente com imperfeição. Ansiedade mascarada de raiva.",
        "sexDrive": "Você é tímido no início, mas atento aos detalhes do prazer do outro. Prefere higiene, ordem, rotina. Pode ser crítico demais com o parceiro ('arruma isso aqui'). Sexo é ato de serviço também.",
        "workDrive": "Você é workaholic produtivo. Resolve o que outros não conseguem. Excelente em análise, saúde, organização. Crítico com colegas imperfeitos. Precisa de ambiente organizado para render.",
        "tryThis": "Faça algo imperfeito de propósito hoje. Deixe um erro passar."
    },
    "mars_libra": {
        "hook": "Você hesita antes de agir. Evita conflitos, mas quando age, é com tato.",
        "actionStyle": "Você age por diplomacia, não por força. Prefere negociar, mediar, encontrar meio-termo. Dificuldade em tomar decisões rápidas - fica pesando prós e contras. Evita confronto direto, pode agir pelas costas ou através de terceiros.",
        "anger": "Sua raiva é passivo-agressiva ou reprimida. Evita discussão, depois fala pelas costas. Corta relacionamentos sem explicação. Indecisão vira frustração. Explode raramente, mas quando explode, é sobre acumulação.",
        "sexDrive": "Você é romântico, delicado, busca prazer do parceiro. Sexo é dança, harmonia, beleza. Prefere ambiente estético. Dificuldade com sexo casual - precisa de conexão. Ciumento disfarçado.",
        "workDrive": "Você trabalha bem em equipe, mediando conflitos. Excelente para negociações, vendas, relações públicas. Dificuldade em dizer não. Evita ambientes competitivos demais ou conflituosos.",
        "tryThis": "Diga não diretamente para um pedido hoje sem justificar ou mediar."
    },
    "mars_scorpio": {
        "hook": "Você age com intensidade estratégica. Não descansa até conquistar.",
        "actionStyle": "Você age com foco obsessivo. Quando quer algo, investiga, planeja, ataca no momento certo. Persistência inabalável. Não desiste nunca. Pode ser manipulador ou usar táticas psicológicas para vencer. Energia sexual e de poder misturadas.",
        "anger": "Sua raiva é fria, calculada e destrutiva. Não esquece nunca. Vingança serve fria. Explode raramente, mas quando explode, é violento emocionalmente. Ciúme obsessivo e possessivo.",
        "sexDrive": "Você é intenso, profundo, transformador. Sexo é poder, fusão, investigação do outro. Não aceita rejeição. Fidelidade absoluta (e exige o mesmo). Sexualidade carregada de emoção e dominação.",
        "workDrive": "Você é investigator nato. Excelente em pesquisa, detective, finanças, cirurgia, psicologia. Trabalha obsessivamente até resolver. Não desiste de problemas complexos.",
        "tryThis": "Perdoe uma ofensa antiga hoje. Deixe ir o controle."
    },
    "mars_sagittarius": {
        "hook": "Você age por impulso aventureiro. Vai na fé e aprende no caminho.",
        "actionStyle": "Você age por entusiasmo e otimismo. Começa aventuras sem planejar muito. Gosta de riscos calculados, esportes, expansão. Impaciente com detalhes. Filosofia de vida guia ações. Honesto demais nas ações, pode ser imprudente.",
        "anger": "Sua raiva é explosão rápida e honesta. Fala na lata, ofende sem querer, depois esquece. Não guarda mágoa, mas explode feio quando limitado. Defende liberdade ferozmente.",
        "sexDrive": "Você é aventureiro, experimental, curioso. Sexo é diversão, expansão, aventura. Prefere liberdade a possessão. Dificuldade com compromisso sexual tradicional. Honesto sobre desejos.",
        "workDrive": "Você trabalha com entusiasmo inicial, mas perde interesse se não houver expansão. Excelente para importação, ensino, viagens, esportes. Odeia mesinha de escritório. Precisa de movimento.",
        "tryThis": "Termine um projeto burocrático chato hoje antes de planejar a próxima aventura."
    },
    "mars_capricorn": {
        "hook": "Você age com disciplina e ambição. Constrói impérios aos poucos.",
        "actionStyle": "Você age com estratégia de longo prazo. Ambicioso, metódico, paciente. Não desperdiça energia - canaliza para metas. Trabalha duro sem reclamar. Autoridade natural. Pode usar pessoas como degraus se não tomar cuidado.",
        "anger": "Sua raiva é controlada, fria e profissional. Não perde a postura facilmente, mas quando perde, é autoritário e cruel. Corta pessoas sem emoção. Rancor estratégico - espera o momento certo para vingança profissional.",
        "sexDrive": "Você é controlado, reservado, mas intenso. Sexo é compromisso sério, não brincadeira. Prefere parceiro estável, tradicional. Pode reprimir desejos por foco no trabalho. Ciumento por posse/status.",
        "workDrive": "Você é workaholic estruturado. Excelente em gestão, administração, carreiras tradicionais. Sobe na carreira aos poucos. Responsável, confiável, mas exige demais de si e dos outros.",
        "tryThis": "Descanse um dia sem culpa hoje. Não planeje nada produtivo."
    },
    "mars_aquarius": {
        "hook": "Você age de forma original e independente. Rebelde com causa.",
        "actionStyle": "Você age por idealismo, não por emoção. Rebelde contra autoridade, inovador, excêntrico. Gosta de tecnologia, futuro, mudanças sociais. Imprevisível - age de surpresa. Dificuldade com rotina. Trabalha melhor para causas do que para indivíduos.",
        "anger": "Sua raiva é radical e imprevisível. Rebela-se contra opressão, defende causas ferozmente. Pode ser frio e distante na agressão. Não guarda mágoa pessoal, mas odeia injustiça sistemica.",
        "sexDrive": "Você é experimental, livre, não tradicional. Sexo pode ser desligado emocionalmente ou muito excêntrico. Prefere amizade a paixão possessiva. Dificuldade com ciúme tradicional. Aberto a experimentações.",
        "workDrive": "Você é inovador, mas inconsistente. Excelente para tecnologia, ativismo, projetos futuristas. Odeia hierarquias. Trabalha melhor autônomo ou em equipes planas. Rebela-se contra ordens.",
        "tryThis": "Siga uma regra tradicional hoje sem questionar. Pratique a obediência."
    },
    "mars_pisces": {
        "hook": "Você age por inspiração e intuição. Energia flutua conforme o humor.",
        "actionStyle": "Você age por impulso criativo ou compaixão. Difícil de definir objetivos claros. Procrastina para evitar confronto. Age pelas costas ou através de outros. Sacrifica-se pelos outros. Energia dispersa, mas compassiva. Evita agressão direta.",
        "anger": "Sua raiva é confusa, passiva ou auto-destrutiva. Não sabe dizer não, acumula, explode em choro ou escapismo. Vitimização ('todos são ruins comigo'). Evita conflito a todo custo, depois se ressente.",
        "sexDrive": "Você é confuso, romântico, compassivo. Sexo pode ser sacrifício ou fusão espiritual. Confunde amor com pena. Dificuldade em definir limites. Pode ser seduzido por piedade.",
        "workDrive": "Você trabalha bem quando inspirado, mas sem estrutura. Excelente para arte, cura, instituições caritativas. Dificuldade em dizer não, acumula trabalho alheio. Evita confrontos no trabalho.",
        "tryThis": "Diga não a um pedido de ajuda hoje. Proteja seu espaço energético."
    },

    // LOTE 6: MERCÚRIO =======================================================
    "mercury_aries": {
        "hook": "Você pensa rápido e fala antes de processar. Mentalidade de pioneiro.",
        "thinkingStyle": "Você pensa em rajadas curtas e intensas. Não gosta de detalhes, quer a essência imediata. Decisões rápidas, às vezes impulsivas. Prefere começar a pensar em algo novo a terminar o antigo. Mentalidade competitiva - quer ser o primeiro a ter a ideia.",
        "communication": "Você fala direto, sem rodeios. Às vezes ofende sem perceber pela honestidade brutal. Gosta de debates, argumentação, provocações. Impaciente com conversas longas. Manda áudio de 2 minutos falando rápido.",
        "learning": "Você aprende fazendo, não lendo manual. Método experimental, trial and error. Prefere cursos curtos e intensos a longos semestres. Aprende com competição.",
        "mentalTrap": "Pensar que ter a ideia primeiro é mais importante que executar bem. Impaciência com processos lentos. Falar antes de pensar e machucar.",
        "tryThis": "Escute até o fim antes de responder hoje. Conte até 3 internamente."
    },
    "mercury_taurus": {
        "hook": "Você pensa devagar, mas profundamente. Uma vez decidido, não muda facil.",
        "thinkingStyle": "Você pensa de forma prática e sensata. Não gosta de teorias abstratas demais - quer aplicabilidade imediata. Memória excelente para detalhes práticos. Teimoso mentalmente - muda de opinião só com provas concretas. Pensamento linear e estruturado.",
        "communication": "Voz calma, pausada, firme. Fala pouco, mas com peso. Não gosta de ser interrompido. Prefere conversas sobre coisas concretas (dinheiro, comida, trabalho) a filosofias. Áudios longos e detalhados.",
        "learning": "Aprende na prática, repetindo. Método tradicional, conservador. Precisa ver, tocar, sentir. Não gosta de mudanças no currículo. Aprende melhor sozinho e em ritmo próprio.",
        "mentalTrap": "Teimosia intelectual. Recusar novas ideias por comodismo. Pensamento excessivamente conservador que impede inovação.",
        "tryThis": "Considere uma ideia totalmente oposta à sua hoje. Apenas considere, sem rejeitar imediatamente."
    },
    "mercury_gemini": {
        "hook": "Você pensa em mil direções simultâneas. Curioso, versátil, disperso.",
        "thinkingStyle": "Você pensa rápido, em rede, conectando ideias aparentemente distintas. Mentalidade jovem, curiosa, inquieta. Dificuldade em focar num único assunto por muito tempo. Boa memória para fatos aleatórios, fraca para compromissos.",
        "communication": "Você fala muito, rápido, e gesticula. Ótimo para networking, piadas, trocadilhos. Conta histórias bem, mas pode exagerar. Escreve bem (se focar). Áudios de 5 minutos falando de 10 assuntos diferentes.",
        "learning": "Aprende de tudo um pouco. Curiosidade insaciável. Método multifocal - lê 5 livros simultaneamente. Prefere workshops variados a especialização profunda.",
        "mentalTrap": "Dispersão mental. Saber de tudo superficialmente e nada profundamente. Fofoca. Ansiedade por excesso de informação.",
        "tryThis": "Termine de ler/estudar um assunto até o fim hoje antes de começar outro."
    },
    "mercury_cancer": {
        "hook": "Você pensa com o coração. Memória emotiva e intuitiva.",
        "thinkingStyle": "Você pensa de forma subjetiva, baseado em sentimentos e memórias. Intuição afiada - 'sabe' sem saber por quê. Mentalidade protetiva, cautelosa. Bom para entender motivações emocionais dos outros. Pensamento circular (volta ao passado).",
        "communication": "Voz suave, emotiva. Fala sobre família, infância, nostalgia. Ótimo para conselhos empáticos. Pode ser indireto, sugestivo. Evita confrontos verbais diretos. Áudios emocionais, às vezes chorando.",
        "learning": "Aprende melhor quando emocionalmente engajado. Método tradicional, ligado à família. Excelente memória para detalhes sentimentais. Aprende 'sentindo' o assunto.",
        "mentalTrap": "Subjetividade excessiva. Pensar que todos estão contra você. Raciocínio circular que não resolve, só remói.",
        "tryThis": "Analise uma situação friamente hoje, sem levar em conta o lado emocional. Apenas fatos."
    },
    "mercury_leo": {
        "hook": "Você pensa dramaticamente e comunica com autoridade. Mentalidade criativa.",
        "thinkingStyle": "Você pensa em grandes conceitos, visões amplas, não detalhes técnicos. Mentalidade dramática - tudo é 'incrível' ou 'terrível'. Orgulho intelectual. Gosta de ideias que brilham, que são originais. Criatividade mental.",
        "communication": "Voz autoritária, teatral. Fala como se estivesse em palco. Ótimo para motivar, inspirar, liderar conversas. Pode monopolizar a fala. Elogios sinceros, mas exagerados. Áudios performáticos.",
        "learning": "Aprende melhor quando elogiado. Método criativo, dramático. Prefere assuntos que permitam expressão pessoal. Não gosta de ser corrigido ou humilhado na sala de aula.",
        "mentalTrap": "Achar que todas suas ideias são brilhantes. Exagerar na importância do que pensa. Dificuldade em ouvir.",
        "tryThis": "Escute uma crítica construtiva hoje sem se defender. Apenas ouça."
    },
    "mercury_virgo": {
        "hook": "Você pensa analiticamente, detalhadamente e criticamente.",
        "thinkingStyle": "Você pensa de forma precisa, analítica, sistemática. Detalhista ao extremo. Boa memória para detalhes práticos. Mentalidade de resolver problemas. Pensa em listas, categorias, organização. Autocrítica severa.",
        "communication": "Fala precisa, correta gramaticalmente, detalhada. Pode ser crítico demais ('isso está errado aqui'). Ótimo para instruções, tutoriais. Voz pode ser tensa ou nervosa. Mensagens longas e bem escritas.",
        "learning": "Aprende metodicamente, passo a passo. Excelente para línguas, ciências exatas, medicina. Método tradicional rigoroso. Precisa de silêncio para estudar.",
        "mentalTrap": "Perfeccionismo paralisante. Ansiedade por detalhes. Crítica excessiva consigo e outros. Pensamento catastrófico.",
        "tryThis": "Envie uma mensagem com um erro de português de propósito hoje. Não corrija."
    },
    "mercury_libra": {
        "hook": "Você pensa comparando pros e contras. Busca equilíbrio intelectual.",
        "thinkingStyle": "Você pensa vendo todos os lados. Indecisão mental - fica pesando eternamente. Busca harmonia nas ideias. Ótimo para negociações, justiça, diplomacia. Dificuldade em opiniões radicais. Estética importa no pensamento.",
        "communication": "Voz agradável, diplomática. Fala evitando conflitos. Ótimo para mediar discussões. Pode ser indeciso verbalmente ('depende', 'talvez'). Evita dizer 'não' direto. Conversas sobre arte, beleza, relacionamentos.",
        "learning": "Aprende melhor em duplas ou grupos. Método harmonioso, sem pressão. Prefere assuntos sobre relações humanas, arte, direito. Dificuldade com matemática ou conflitos abstratos.",
        "mentalTrap": "Indecisão paralisante. Pensar demais sem agir. Falsidade intelectual para agradar.",
        "tryThis": "Tome uma decisão rápida hoje sem consultar ninguém. Primeira intuição."
    },
    "mercury_scorpio": {
        "hook": "Você pensa profundamente, investiga obsessivamente e não aceita respostas rasas.",
        "thinkingStyle": "Você pensa investigando, indo ao fundo das coisas. Mentalidade estratégica, desconfiada. Boa para psicologia, mistérios, finanças. Não aceite superficialidade. Pensamento obsessivo - fixa em uma ideia e não solta. Intuição investigativa.",
        "communication": "Voz intensa, penetrante. Fala pouco, mas pesa. Ótimo para fazer perguntas desconfortáveis. Silêncios estratégicos. Pode ser sarcástico ou mordaz. Áudios curtos e densos.",
        "learning": "Aprende mergulhando fundo. Método investigativo, obsessivo. Prefere psicologia, ocultismo, ciências profundas. Não gosta de aprender de forma superficial.",
        "mentalTrap": "Obsessão mental. Pensar demais em conspiracões ou segundas intenções. Ceticismo excessivo.",
        "tryThis": "Aceite uma explicação simples hoje sem procurar segundas intenções."
    },
    "mercury_sagittarius": {
        "hook": "Você pensa expansivamente, filosoficamente e otimisticamente.",
        "thinkingStyle": "Você pensa em grandes sistemas, filosofias, verdades universais. Visão de longo prazo. Otimismo intelectual - acredita que vai entender. Mentalidade exploradora. Dificuldade com detalhes pequenos. Honestidade brutal intelectual.",
        "communication": "Voz entusiasmada, alta. Fala sobre viagens, filosofia, significado da vida. Pode ser dogmático ou 'sabe-tudo'. Histórias longas e divertidas. Áudios de 10 minutos sobre uma ideia grandiosa.",
        "learning": "Aprende através de experiências, viagens, filosofia. Método expansivo. Prefere assuntos que ampliam a mente. Não gosta de detalhes técnicos ou burocráticos.",
        "mentalTrap": "Dogmatismo. Achar que descobriu a verdade absoluta. Exagerar na importância das próprias ideias. Falar demais.",
        "tryThis": "Ouça uma opinião oposta à sua hoje sem tentar converter a pessoa."
    },
    "mercury_capricorn": {
        "hook": "Você pensa estruturado, ambiciosamente e com foco em resultados.",
        "thinkingStyle": "Você pensa de forma estratégica, de longo prazo, realista. Mentalidade de negócios. Conservador intelectualmente - respeita autoridades e tradições. Boa memória para fatos úteis. Pensamento prático voltado para carreira e status.",
        "communication": "Voz séria, autoritária, pausada. Fala sobre carreira, negócios, status. Ótimo para instruções práticas. Pode soar snob ou autoritário. Mensagens curtas, diretas, profissionais.",
        "learning": "Aprende para ter resultados. Método tradicional, estruturado. Prefere cursos que aumentam status ou renda. Disciplinado nos estudos.",
        "mentalTrap": "Cinismo intelectual. Pensar que só o prático importa. Rigidão mental. Dificuldade com criatividade pura.",
        "tryThis": "Aprenda algo totalmente inútil e divertido hoje. Apenas pelo prazer."
    },
    "mercury_aquarius": {
        "hook": "Você pensa fora da caixa, originalmente e de forma independente.",
        "thinkingStyle": "Você pensa de forma original, excêntrica, avançada. Mentalidade científica ou humanitária. Não segue corrente. Ideias futuristas. Pode parecer estranho ou 'vênusiano'. Inteligência objetiva, fria, mas visionária.",
        "communication": "Voz distante, intelectual. Fala sobre tecnologia, futuro, causas sociais. Pode soar arrogante ou distante. Original nas escolhas de palavras. Áudios sobre ideias abstratas.",
        "learning": "Aprende de forma não tradicional. Método independente, autodidata. Prefere tecnologia, ciência, inovação. Odeia métodos antiquados.",
        "mentalTrap": "Arrogância intelectual. Achar que todos são menos inteligentes. Distante demais das emoções. Rebeldia sem causa.",
        "tryThis": "Aceite uma tradição antiga hoje e veja o valor nela."
    },
    "mercury_pisces": {
        "hook": "Você pensa intuitivamente, poeticamente e confusamente.",
        "thinkingStyle": "Você pensa de forma não-linear, intuitiva, poética. Dificuldade com lógica rígida. Mentalidade compassiva, mas confusa. Boa para arte, espiritualidade, música. Pensamento 'na lua' - distraído, sonhador. Capta o todo, perde os detalhes.",
        "communication": "Voz suave, sonhadora. Fala de forma indireta, poética, confusa. Ótimo para consolar, mas ruim para dar instruções práticas. Pode mentir ou exagerar sem perceber. Áudios confusos, divagando.",
        "learning": "Aprende através de imagens, música, arte. Método intuitivo, não estruturado. Prefere assuntos criativos ou espirituais. Dificuldade com disciplina rigorosa.",
        "mentalTrap": "Confusão mental. Escapismo através de fantasias. Dificuldade em dizer não ou definir limites claros.",
        "tryThis": "Organize seus pensamentos numa lista numérica hoje. Estruture a confusão."
    },

    // LOTE 7: JÚPITER =======================================================
    "jupiter_aries": {
        "hook": "Você tem sorte quando toma iniciativa. Cresce através da coragem e novos começos.",
        "growthStyle": "Você expande-se através de ação direta, novos projetos, aventuras. Cresce quando tem coragem de começar do zero. Otimismo natural que contagia. Sorte está na iniciativa - quanto mais arrisca, mais ganha.",
        "luckArea": "Sorte em novos empreendimentos, esportes, competições, inícios de projetos. Oportunidades vêm quando você age primeiro.",
        "excessTrap": "Excesso de confiança. Achar que sempre vai dar certo. Gastar demais em projetos mal planejados. Impulsividade disfarçada de otimismo.",
        "wisdom": "Sabedoria do pioneiro: às vezes começar é mais importante que planejar perfeitamente.",
        "tryThis": "Comece algo novo hoje sem planejar demais. Apenas comece."
    },
    "jupiter_taurus": {
        "hook": "Você tem sorte com recursos materiais. Cresce através da persistência e valores sólidos.",
        "growthStyle": "Você expande-se através de recursos materiais, valores, abundância. Cresce lentamente, mas seguramente. Sorte vem da persistência e do trabalho árduo. Gosta de crescer em conforto.",
        "luckArea": "Sorte em finanças, imóveis, investimentos, gastronomia, arte. Oportunidades vêm através de paciência e valorização do que é tangível.",
        "excessTrap": "Ganância. Acumulação excessiva. Comodismo. Achar que mais dinheiro resolve todos os problemas. Teimosia em métodos ultrapassados.",
        "wisdom": "Sabedoria do cultivador: crescimento verdadeiro leva tempo e raízes profundas.",
        "tryThis": "Invista em algo hoje pensando no retorno daqui a 5 anos."
    },
    "jupiter_gemini": {
        "hook": "Você tem sorte através do conhecimento e conexões. Cresce pela versatilidade.",
        "growthStyle": "Você expande-se através de estudos, viagens curtas, networking, comunicação. Cresce quando aprende de tudo um pouco. Sorte vem de quem você conhece e o que você sabe.",
        "luckArea": "Sorte em escrita, ensino, vendas, mídia, tecnologia, viagens curtas. Oportunidades vêm através de contatos e informação.",
        "excessTrap": "Dispersão. Querer saber de tudo e não aprofundar nada. Fofoca. Superficialidade intelectual. Gastar com cursos que não termina.",
        "wisdom": "Sabedoria do mensageiro: conectar pessoas e ideias é tão valioso quanto ter a ideia.",
        "tryThis": "Ligue para um contato antigo hoje. Networking é investimento."
    },
    "jupiter_cancer": {
        "hook": "Você tem sorte em casa e com família. Cresce através do cuidado e intuição.",
        "growthStyle": "Você expande-se através de lar, família, segurança emocional, intuição. Cresce quando cuida dos outros. Sorte vem de mulheres, figuras maternas, imóveis. Generosidade emocional.",
        "luckArea": "Sorte em imóveis, restaurantes, hotelaria, cuidados, educação infantil. Oportunidades vêm através de acolhimento.",
        "excessTrap": "Apego excessivo. Proteger demais. Gastar demais com família ou casa. Emotividade excessiva nas decisões financeiras.",
        "wisdom": "Sabedoria da nutrição: cuidar é a forma mais elevada de crescer.",
        "tryThis": "Abrace alguém da família ou faça uma refeição caseira especial hoje."
    },
    "jupiter_leo": {
        "hook": "Você tem sorte quando brilha e arrisca. Cresce através da criatividade e generosidade.",
        "growthStyle": "Você expande-se através de auto-expressão, criatividade, liderança, generosidade. Cresce quando tem coragem de ser visto. Sorte vem do reconhecimento e do coração grande.",
        "luckArea": "Sorte em entretenimento, arte, gestão, educação, crianças, especulação. Oportunidades vêm quando você arrisca se expor.",
        "excessTrap": "Orgulho excessivo. Jogos de azar. Gastar para impressionar. Dramatização das conquistas. Narcisismo.",
        "wisdom": "Sabedoria do coração generoso: dar é receber em dobro.",
        "tryThis": "Compartilhe um talento seu publicamente hoje. Sem medo de julgamento."
    },
    "jupiter_virgo": {
        "hook": "Você tem sorte através do serviço e competência. Cresce pela praticidade.",
        "growthStyle": "Você expande-se através de serviço útil, saúde, organização, competência. Cresce quando ajuda outros a resolver problemas. Sorte vem do trabalho bem feito e da humildade.",
        "luckArea": "Sorte em saúde, análise, contabilidade, medicina, nutrição, serviços. Oportunidades vêm através de habilidade prática.",
        "excessTrap": "Perfeccionismo excessivo. Crítica demais. Ansiedade com detalhes. Dificuldade em delegar. Workaholism.",
        "wisdom": "Sabedoria do serviço: crescer através de ajudar é o caminho mais seguro.",
        "tryThis": "Ajude alguém resolver um problema prático hoje. Ensine uma habilidade."
    },
    "jupiter_libra": {
        "hook": "Você tem sorte através de parcerias e justiça. Cresce pelo equilíbrio.",
        "growthStyle": "Você expande-se através de relacionamentos, parcerias, arte, justiça. Cresce quando coopera. Sorte vem de advogados, parceiros de negócio, cônjuge. Charme abre portas.",
        "luckArea": "Sorte em casamento, parcerias comerciais, arte, moda, direito, diplomacia. Oportunidades vêm através de outros.",
        "excessTrap": "Dependência de parceiros. Indecisão. Gastar para manter harmonia superficial. Casar por status ou comodidade.",
        "wisdom": "Sabedoria da parceria: sozinho vamos mais rápido, juntos vamos mais longe.",
        "tryThis": "Peça ajuda sincera a um parceiro ou amigo próximo hoje. Divida uma meta."
    },
    "jupiter_scorpio": {
        "hook": "Você tem sorte através de transformações e recursos alheios. Cresce pela intensidade.",
        "growthStyle": "Você expande-se através de crise, transformação, recursos compartilhados, psicologia. Cresce quando mergulha fundo. Sorte vem de heranças, investimentos, terapias.",
        "luckArea": "Sorte em heranças, seguros, investimentos, psicologia, ocultismo, cirurgia. Oportunidades vêm através de crises superadas.",
        "excessTrap": "Obsessão excessiva. Jogar tudo ou nada. Riscos calculados que viram compulsivos. Ciúme possessivo.",
        "wisdom": "Sabedoria da transformação: morrer para renascer é o ciclo da abundância verdadeira.",
        "tryThis": "Doe ou descarte algo valioso hoje. Pratique o desapego gerador de abundância."
    },
    "jupiter_sagittarius": {
        "hook": "Você tem sorte natamente. Cresce através de expansão e fé.",
        "growthStyle": "Você expande-se através de viagens, ensino, filosofia, espiritualidade. Cresce quando busca significado. Sorte vem de estrangeiros, publicações, acadêmicos. Otimismo é seu ímã.",
        "luckArea": "Sorte máxima em viagens, ensino superior, leis, religião, comércio exterior. Oportunidades vêm de longe ou através do conhecimento.",
        "excessTrap": "Excesso de confiança. Achar que sabe tudo. Fanatismo. Gastar demais em viagens. Riscos irresponsáveis.",
        "wisdom": "Sabedoria do otimista: acreditar que é possível já é meio caminho.",
        "tryThis": "Planeje uma viagem ou estudo novo hoje. Expanda seus horizontes."
    },
    "jupiter_capricorn": {
        "hook": "Você tem sorte através de disciplina e responsabilidade. Cresce devagar mas seguro.",
        "growthStyle": "Você expande-se através de carreira, status, estrutura, ambição responsável. Cresce quando assume autoridade. Sorte vem de figuras de autoridade, governo, bancos, idosos.",
        "luckArea": "Sorte em carreira, gestão, política, estruturas grandes, bancos. Oportunidades vêm através de paciência e responsabilidade.",
        "excessTrap": "Ambição desmedida. Materialismo. Rigidez moral. Usar outros para subir. Pessimismo funcional.",
        "wisdom": "Sabedoria do construtor: legados duradouros levam tempo e ética.",
        "tryThis": "Assuma uma responsabilidade extra hoje, mesmo que cansativa."
    },
    "jupiter_aquarius": {
        "hook": "Você tem sorte através de inovação e amizades. Cresce pela originalidade.",
        "growthStyle": "Você expande-se através de tecnologia, causas sociais, amizades, inovação. Cresce quando pensa diferente. Sorte vem de grupos, tecnologia, humanitarismo.",
        "luckArea": "Sorte em tecnologia, ciência, ativismo, grupos, internet, invenções. Oportunidades vêm através de redes e originalidade.",
        "excessTrap": "Rebeldia sem causa. Distante demais das emoções. Acreditar que tecnologia resolve tudo. Gastar com gadgets.",
        "wisdom": "Sabedoria do visionário: o futuro pertence aos que ousam imaginar diferente.",
        "tryThis": "Ajude uma causa social ou estranho hoje. Expanda seu círculo humanitário."
    },
    "jupiter_pisces": {
        "hook": "Você tem sorte através de compaixão e intuição. Cresce pela fé.",
        "growthStyle": "Você expande-se através de espiritualidade, arte, compaixão, intuição. Cresce quando serve aos outros. Sorte vem do universo, coincidências, proteção divina. Mão divina visível.",
        "luckArea": "Sorte em instituições de caridade, arte, espiritualidade, trabalho com animais, hospitalidade. Oportunidades vêm através de entrega e fé.",
        "excessTrap": "Escapismo. Vitimização. Confiar demais nos outros. Gastar com ilusões. Procrastinação mascarada de fé.",
        "wisdom": "Sabedoria da entrega: confiar no fluxo é a maior prova de abundância.",
        "tryThis": "Pratique um ato de fé hoje. Doe sem esperar retorno."
    },

    // LOTE 8: SATURNO =======================================================
    "saturn_aries": {
        "hook": "Seu desafio é aprender paciência e controlar o impulso. Maturidade vem da coragem disciplinada.",
        "challenge": "Você tem dificuldade com limites e paciência. Aprende lições através de feridas no ego, acidentes por impulsividade, ou frustrações quando a ação não é imediata. Deve construir autoconfiança legítima, não arrogância.",
        "responsibility": "Você assume responsabilidades quando aprende a esperar o momento certo. Lidera com mais eficácia quando maduro. Trabalha duro quando há urgência ou competição clara.",
        "maturity": "Você amadurece quando aprende que coragem sem estratégia é suicídio. Disciplina a raiva. Torna-se mentor de iniciativas jovens.",
        "fear": "Medo de ser impotente, de não ter coragem, de ser ultrapassado. Medo da passividade.",
        "tryThis": "Espere 24 horas antes de reagir a uma provocação hoje. Controle o impulso."
    },
    "saturn_taurus": {
        "hook": "Seu desafio é aprender flexibilidade e lidar com escassez. Maturidade vem da segurança interior.",
        "challenge": "Você enfrenta dificuldades materiais ou de autovalorização na juventude. Aprende lições através de perdas financeiras, teimosia que custa caro, ou apego excessivo. Deve construir valores sólidos sem materialismo.",
        "responsibility": "Você assume responsabilidades financeiras e práticas. É confiável para administração de recursos. Trabalha duro e sem reclamação.",
        "maturity": "Você amadurece quando aprende que segurança vem de dentro, não do externo. Flexibiliza valores. Torna-se rocha sólida para outros.",
        "fear": "Medo de pobreza, de mudança, de perder o que conquistou, de não ter valor próprio.",
        "tryThis": "Doe algo material que você valoriza hoje. Pratique o desapego."
    },
    "saturn_gemini": {
        "hook": "Seu desafio é focar e aprofundar. Maturidade vem da comunicação responsável.",
        "challenge": "Você enfrenta dificuldades de concentração ou comunicação na juventude. Aprende lições através de fofocas que voltam, promessas não cumpridas, ou superficialidade que custa caro. Deve construir palavras com peso.",
        "responsibility": "Você assume responsabilidades intelectuais. Torna-se autoridade em algum assunto específico. Escreve ou ensina com seriedade.",
        "maturity": "Você amadurece quando aprende a ouvir mais e falar menos. Profundidade no conhecimento. Torna-se sábio que compartilha conhecimento de forma estruturada.",
        "fear": "Medo de ignorância, de parecer burro, de limitação mental, de não ser ouvido.",
        "tryThis": "Cumpra uma promessa pequena que fez há tempo hoje. Palavra é contrato."
    },
    "saturn_cancer": {
        "hook": "Seu desafio é lidar com vulnerabilidade emocional. Maturidade vem do autocuidado.",
        "challenge": "Você enfrenta dificuldades familiares ou emocionais na juventude. Aprende lições através de perdas, frieza emocional, ou necessidade de cuidar de outros cedo demais. Deve construir segurança emocional própria.",
        "responsibility": "Você assume responsabilidades familiares pesadas. Cuida de pais, filhos, ou cria estruturas emocionais para outros. Trabalho com crianças ou idosos.",
        "maturity": "Você amadurece quando aprende que cuidar de si não é egoísmo. Estrutura emoções. Torna-se pai/mãe sábio e firme.",
        "fear": "Medo de abandono, de não ser cuidado, de rejeição, de vulnerabilidade.",
        "tryThis": "Diga não para um pedido de cuidado hoje. Cuide de você primeiro."
    },
    "saturn_leo": {
        "hook": "Seu desafio é construir autoestima legítima. Maturidade vem da humildade criativa.",
        "challenge": "Você enfrenta dificuldades de reconhecimento ou feridas no ego na juventude. Aprende lições através de rejeições, orgulho ferido, ou necessidade de aplauso vazio. Deve construir confiança sem vaidade.",
        "responsibility": "Você assume responsabilidades de liderança criativa. Torna-se autoridade em sua área artística ou de expressão. Gerencia jovens ou crianças.",
        "maturity": "Você amadurece quando aprende que brilhar não precisa de plateia. Lidera com humildade. Torna-se mentor que valoriza outros.",
        "fear": "Medo de ser ignorado, de não ser especial, de fracasso público, de humilhação.",
        "tryThis": "Faça algo criativo hoje sem mostrar para ninguém. Apenas pelo prazer."
    },
    "saturn_virgo": {
        "hook": "Seu desafio é superar a autocrítica excessiva. Maturidade vem do serviço saudável.",
        "challenge": "Você enfrenta dificuldades de saúde ou ansiedade na juventude. Aprende lições através de doenças psicossomáticas, perfeccionismo paralisante, ou trabalho escravo. Deve construir disciplina sem rigidez.",
        "responsibility": "Você assume responsabilidades de serviço prático. Torna-se especialista técnico. Trabalha em saúde, análise, ou áreas que exigem precisão.",
        "maturity": "Você amadurece quando aprende que 'bom o suficiente' é perfeito. Aceita limites físicos. Torna-se curador prático e eficiente.",
        "fear": "Medo de doença, de caos, de imperfeição, de não ser útil, de críticas.",
        "tryThis": "Faça uma tarefa até 80% de perfeição e pare. Aceite a imperfeição."
    },
    "saturn_libra": {
        "hook": "Seu desafio é tomar decisões e lidar com solidão. Maturidade vem da justiça interior.",
        "challenge": "Você enfrenta dificuldades relacionais ou de indecisão na juventude. Aprende lições através de relacionamentos difíceis, codependência, ou parcerias que pesam. Deve construir equilíbrio interno.",
        "responsibility": "Você assume responsabilidades de mediação, justiça, ou parcerias formais. Torna-se juiz, conselheiro, ou gestor de equilíbrio. Casamento sério e trabalhado.",
        "maturity": "Você amadurece quando aprende a estar só sem solidão. Decide com firmeza. Torna-se autoridade em justiça e equilíbrio.",
        "fear": "Medo de solidão, de conflitos, de decisões erradas, de abandono na velhice.",
        "tryThis": "Tome uma decisão importante sozinho hoje, sem consultar ninguém."
    },
    "saturn_scorpio": {
        "hook": "Seu desafio é lidar com perdas e controle. Maturidade vem da transformação consciente.",
        "challenge": "Você enfrenta dificuldades intensas, crises, ou perdas traumáticas na juventude. Aprende lições através de traições, crises financeiras, ou obsessões autodestrutivas. Deve construir poder interior ético.",
        "responsibility": "Você assume responsabilidades pesadas envolvendo recursos alheios, crises, ou transformações. Torna-se terapeuta, gestor de crises, investigador.",
        "maturity": "Você amadurece quando aprende a usar o poder para curar, não destruir. Aceita impermanência. Torna-se alquimista que transforma dor em sabedoria.",
        "fear": "Medo de perder controle, de traição, de morte, de vulnerabilidade, de abandono.",
        "tryThis": "Confie um segredo importante a alguém hoje. Pratique a vulnerabilidade."
    },
    "saturn_sagittarius": {
        "hook": "Seu desafio é estruturar fé e expansão. Maturidade vem da sabida prátcia.",
        "challenge": "Você enfrenta dificuldades com limites, lei, ou estruturas de crença na juventude. Aprende lições através de fanatismo, irresponsabilidade, ou problemas legais/estrangeiros. Deve construir filosofia prática.",
        "responsibility": "Você assume responsabilidades educacionais, legais, ou filosóficas. Torna-se professor sério, advogado, ou gestor de expansão controlada. Autoridade em conhecimento.",
        "maturity": "Você amadurece quando aprende que liberdade exige disciplina. Estrutura visões amplas. Torna-se sábio prático que ensina com rigor.",
        "fear": "Medo de prisão (física ou mental), de limitação, de ignorância, de falta de sentido.",
        "tryThis": "Estabeleça uma rotina disciplinada de estudo ou prática espiritual hoje."
    },
    "saturn_capricorn": {
        "hook": "Seu desafio é lidar com responsabilidade precoce. Maturidade é seu destino natural.",
        "challenge": "Você nasceu velho. Enfrenta responsabilidades cedo: trabalho infantil, cuidado de família, ou necessidade de ser sério antes da hora. Aprende lições através de rigidez, depressão, ou ambição desmedida. Deve construir autoridade legítima.",
        "responsibility": "Você assume responsabilidades naturais de chefia, gestão, estruturação. Torna-se autoridade máxima em sua área. Carreira construída aos poucos.",
        "maturity": "Você amadurece cedo, mas deve aprender a flexibilizar. Torna-se ancião sábio, mentor, ou líder patriarcal/matriarcal ético.",
        "fear": "Medo de fracasso, de não ser respeitado, de pobreza, de perda de status.",
        "tryThis": "Brinque como criança hoje. Seja irresponsável por 30 minutos."
    },
    "saturn_aquarius": {
        "hook": "Seu desafio é integrar originalidade com estrutura. Maturidade vem da responsabilidade social.",
        "challenge": "Você enfrenta dificuldades de pertencimento ou rejeição pelo grupo na juventude. Aprende lições através de isolamento, rebeldia sem causa, ou amizades tóxicas. Deve construir contribuição social útil.",
        "responsibility": "Você assume responsabilidades sociais, tecnológicas, ou de grupo. Torna-se gestor de inovação, cientista sério, ou líder de causas. Autoridade em futuro.",
        "maturity": "Você amadurece quando aprende que rebeldia construtiva é melhor que rebeldia destrutiva. Estrutura visões futuristas. Torna-se ancião moderno.",
        "fear": "Medo de rejeição social, de não ser aceito, de conformismo, de obsolescência.",
        "tryThis": "Participe de uma tradição antiga hoje. Honre o passado enquanto constrói futuro."
    },
    "saturn_pisces": {
        "hook": "Seu desafio é estruturar fé e compaixão. Maturidade vem dos limites saudáveis.",
        "challenge": "Você enfrenta dificuldades de confusão, escapismo, ou vitimização na juventude. Aprende lições através de ilusões desfeitas, vícios, ou sacrifício excessivo. Deve construir espiritualidade prática.",
        "responsibility": "Você assume responsabilidades de cuidado, arte terapêutica, ou trabalho institucional. Torna-se curador, artista sério, ou gestor de instituições de caridade.",
        "maturity": "Você amadurece quando aprende a dizer não como forma de amor próprio. Estrutura compaixão. Torna-se sábio compassivo com limites.",
        "fear": "Medo de confusão mental, de loucura, de solidão espiritual, de não ser suficientemente compassivo.",
        "tryThis": "Estabeleça um limite claro com alguém que te usa hoje. Pratique o não."
    }
};

/**
 * Banco completo. As entradas de Urano, Netuno, Plutão, Meio do Céu, Nó Norte
 * e Lilith vivem em `outerPlanetInterpretations` — antes desses textos, esses
 * seis pontos caíam sempre no fallback genérico, com a mesma leitura nos doze
 * signos.
 */
export const interpretationsDB: Record<string, InterpretationData> = {
    ...baseInterpretations,
    ...outerPlanetInterpretations
};
