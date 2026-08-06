
import { ArcanoAdvanced, ShadowItem, ArcanoSaude } from './types';

// --- HELPERS ---

const getMockAlquimia = (num: number, nome: string, mantraOriginal: string) => {
  const cristais = ["Jaspe Vermelho", "Pedra da Lua", "Turmalina Rosa", "Rubi", "Lápis-Lazúli", "Quartzo Rosa", "Citrino", "Quartzo Verde", "Ametista", "Sodalita", "Cornalina", "Água Marinha", "Obsidiana", "Quartzo Azul", "Ônix", "Granada", "Estrela", "Pedra da Lua", "Pedra do Sol", "Hematita", "Malaquita", "Cristal de Quartzo"];
  const ervas = ["Manjericão", "Artemísia", "Verbena", "Louro", "Sálvia", "Rosas", "Gengibre", "Hortelã", "Camomila", "Alecrim", "Canela", "Lótus", "Cipreste", "Lavanda", "Patchouli", "Arruda", "Jasmim", "Melissa", "Girassol", "Mirra", "Eucalipto", "Dente de Leão"];
  
  return {
    cristal: cristais[(num - 1) % cristais.length] || "Cristal Mestre",
    cristalImg: `https://example.com/crystal-${num}.jpg`,
    erva: ervas[(num - 1) % ervas.length] || "Sálvia",
    mantra: mantraOriginal,
    frequenciaHz: 432 + (num * 5)
  };
};

const getMockRitual = (num: number, nome: string, elemento: string) => ({
  titulo: `Ritual de Conexão com ${nome}`,
  objetivo: "Integrar a sabedoria deste arquétipo em sua vida diária.",
  materiais: ["Vela da cor do elemento", "Incenso de purificação", "Papel e caneta", "Cristal pessoal"],
  passos: [
    { passo: 1, texto: `Crie um espaço sagrado e acenda a vela focando no elemento ${elemento}.` },
    { passo: 2, texto: `Visualize a carta d${nome} crescendo em sua frente como um portal.` },
    { passo: 3, texto: "Escreva no papel uma qualidade deste arcano que você precisa agora." },
    { passo: 4, texto: "Queime o papel (com segurança) entregando o pedido ao universo." }
  ]
});

const createShadowItems = (shadows: string[]): ShadowItem[] => {
  return shadows.slice(0, 5).map((s, i) => {
    // Tenta extrair título da sombra (antes dos dois pontos)
    const [title, desc] = s.includes(':') ? s.split(':') : ["Sombra", s];
    return {
      id: `shadow-${i}`,
      sombra: title.trim(),
      cura: desc ? `Trazer consciência para: ${desc.substring(0, 50)}...` : "Iluminar este aspecto com consciência.",
      reconhecido: false
    };
  });
};

const IMAGE_PROMPT_SUFFIX = "Tarot Card / Gothic Occult Celestial / Black and Gold Mysticism / Intricate Linework Geometry / Bold Angular Architecture / Occult and Religious Imagery / Skulls, Crosses, Celestial Bodies / Dark Atmospheric Setting / Ornate Borders and Symmetry / Dramatic Negative Space / Esoteric Macabre Divine Aesthetics --niji 6 --sref 2155255377 --s 100";

const ENGLISH_NAMES: Record<number, string> = {
  1: "The Magician", 2: "The High Priestess", 3: "The Empress", 4: "The Emperor", 5: "The Hierophant",
  6: "The Lovers", 7: "The Chariot", 8: "Justice", 9: "The Hermit", 10: "Wheel of Fortune",
  11: "Strength", 12: "The Hanged Man", 13: "Death", 14: "Temperance", 15: "The Devil",
  16: "The Tower", 17: "The Star", 18: "The Moon", 19: "The Sun", 20: "Judgement",
  21: "The World", 22: "The Fool"
};

interface RawData {
  id: number;
  nome: string;
  arquetipo: string;
  elemento: string;
  planeta: string;
  palavrasChave: string[];
  idade: number;
  mantra: string;
  conteudo: {
    essencia: string;
    luz: string[];
    sombra: string[];
    conselho: string[];
  };
  saude: ArcanoSaude;
  relacionamentos: string;
  carreira: string;
}

const DATASET: RawData[] = [
  {
    id: 1,
    nome: "O Mago",
    arquetipo: "O Iniciador",
    elemento: "Ar",
    planeta: "Mercúrio",
    palavrasChave: ["Comunicação", "Versatilidade", "Manifestação"],
    idade: 1,
    mantra: "Eu tenho todas as ferramentas necessárias; agora escolho apenas uma e vou até o fim.",
    conteudo: {
      essencia: "Você carrega a energia do primeiro movimento — aquele impulso original que transforma potencial em realidade. Aos 1 ano de idade, algo aconteceu que definiu sua relação com o mundo: você aprendeu que pode fazer coisas acontecerem através da palavra, do gesto e da inteligência. Não à toa, você é comunicativo, adaptável e naturalmente curioso. O Mago é o arquétipo do eterno aprendiz que já domina o suficiente para ensinar. Você desdobra-se em múltiplas direções, absorve informações como esponja e tem a rara capacidade de estar completamente presente no agora — sem se prender ao que foi ou ao que virá.",
      luz: ["Comunicação: Você traduz ideias complexas em palavras acessíveis; as pessoas entendem você com clareza.", "Versatilidade: Adapta-se a qualquer ambiente com uma natureza mimética, aprendendo através da observação.", "Rapidez Mental: Aprende tudo com velocidade e conecta pontos que outros não conseguem enxergar.", "Habilidade Manual: Sua inteligência corporal é afiada, possuindo mãos que sabem executar e criar.", "Empreendedorismo: Vê oportunidades onde outros veem obstáculos e começa antes mesmo de estar 'pronto'."],
      sombra: ["O Charlatão: Você manipula a verdade quando lhe convém, criando narrativas para escapar de responsabilidades. É um vendedor de ilusões que usa a inteligência para enganar a si mesmo.", "Dispersão Patológica: Você inicia mil projetos e não termina nenhum. Seu rastro é um cemitério de ideias brilhantes que apodreceram por falta de consistência.", "Superficialidade: Por saber um pouco de tudo, você acredita que sabe o suficiente. Sua falta de profundidade o torna alguém raso, incapaz de sustentar compromissos ou vínculos reais.", "Mente Caótica: Sua inquietação impede o descanso. Você é escravo de uma mente acelerada que usa a agitação para fugir do silêncio e do pavor de se encontrar sozinho."],
      conselho: ["Organize o Caos: Crie um sistema rígido e simples para gerenciar seus documentos e estabeleça três âncoras diárias inegociáveis para manter o foco.", "Domine a Dispersão: Escolha rigorosamente apenas um projeto principal por trimestre e pratique o uso do 'não' para proteger sua energia vital.", "Cultive Presença: Pratique meditação ativa e desligue todas as notificações digitais por pelo menos duas horas diárias para silenciar o ruído externo.", "Honre a Emoção: Pergunte ao seu corpo o que ele sente antes de tomar decisões puramente racionais e permita-se o choro ou o grito se for preciso.", "Estabeleça Valores: Liste cinco princípios éticos não negociáveis e revise-os semestralmente para garantir que sua versatilidade não vire mau-caratismo."]
    },
    saude: {
      vulnerabilidade: "Sua mente nunca para, o que sobrecarrega o seu sistema nervoso, gerando ansiedade crônica e insônia. Como sua força está na fala e na troca, seus pontos frágeis são o aparelho fonador (garganta e cordas vocais) e o sistema respiratório (pulmões).",
      sintomas: ["Rouquidão frequente", "sensação de nó na garganta", "respiração curta", "asma emocional"],
      prevencao: ["Pratique o silêncio consciente", "Exercícios de respiração diafragmática"]
    },
    relacionamentos: "Precisa de parceiros que acompanhem seu ritmo intelectual. Sua dificuldade em aprofundar laços pode deixar o outro sentindo-se descartável e usado.",
    carreira: "Destaca-se em comunicação em larga escala, mediação, tecnologia e qualquer atividade que exija agilidade mental e inovação."
  },
  {
    id: 2,
    nome: "A Sacerdotisa",
    arquetipo: "A Intuitiva",
    elemento: "Água",
    planeta: "Lua",
    palavrasChave: ["Intuição", "Escuta", "Mistério"],
    idade: 2,
    mantra: "No meu silêncio eu encontro o saber; na minha ação eu encontro o poder.",
    conteudo: {
      essencia: "Aos 2 anos, você olhou para sua mãe e viu mais que uma figura: viu um oráculo. Desde então, você busca significados ocultos, padrões invisíveis e verdades que não se dizem em voz alta. Você é a guardiã do silêncio, aquela que observa antes de falar e sente o que outros ignoram. Sua força está na receptividade, na paciência e na capacidade de esperar que as coisas amadureçam no escuro da alma.",
      luz: ["Intuição: Sabe coisas sem saber como sabe; confiar nesta bússola interna é o seu maior superpoder.", "Escuta Ativa: As pessoas se sentem seguras para se abrir com você, pois você oferece um espaço de acolhimento genuíno.", "Paciência: Entende que tudo tem seu tempo orgânico e não tenta forçar o curso natural dos rios da vida.", "Discrição: Guarda segredos com fidelidade absoluta, tornando a confiança algo sagrado em sua presença."],
      sombra: ["A Inércia: Você se esconde atrás do 'esperar o tempo certo' para camuflar o medo covarde de viver. Sua passividade é uma prisão onde você deixa que os outros decidam sua vida.", "Dependência Emocional: Você se anula para caber na vida do outro, tornando-se uma sombra carente que suga a energia de quem tenta te amar por puro medo da solidão.", "Mudez Tóxica: Usa o silêncio como arma de manipulação ou punição. Guarda rancores que apodrecem o seu interior porque você se nega a falar o que sente.", "Autossabotagem: A dúvida sobre sua própria capacidade é uma desculpa para não brilhar. Você se convence de que não é 'suficiente' para evitar o risco de ser vista e falhar."],
      conselho: ["Vença a Passividade: Comece um projeto inteiramente sozinho, sem pedir conselhos, e não espere por permissão ou validação externa para agir.", "Transforme Lágrimas em Suor: Entenda que a dor emocional só se cura através da ação no mundo físico; a contemplação excessiva é veneno para você.", "Trabalhe o Conformismo: Pratique dizer 'não' pelo menos uma vez por semana para fortalecer sua identidade e estabelecer limites que te protejam.", "Vire a Página: O passado deve ser apenas um mestre e não uma moradia permanente; solte as histórias e os traumas que já acabaram há anos.", "Organize o Ambiente: A desordem externa reflete sua confusão interna. Comece organizando sua mesa de trabalho e sua casa para clarear a mente."]
    },
    saude: {
      vulnerabilidade: "Você tende a 'engolir' o que sente, o que afeta diretamente o seu aparelho digestivo. A passividade e o acúmulo de segredos levam à retenção de líquidos e sobrecarregam o sistema renal e a bexiga. Seus olhos também são sensíveis ao cansaço.",
      sintomas: ["Gastrite nervosa", "má digestão", "inchaço nas pernas", "infecções urinárias recorrentes"],
      prevencao: ["Beba muita água", "Aprenda a externalizar suas emoções para não acidificar o estômago"]
    },
    relacionamentos: "Tende a idealizar o parceiro e buscar uma figura de cuidado parental; busque relações de igualdade para evitar o papel de eterna dependente.",
    carreira: "Excelente desempenho em psicologia, pesquisa, biblioteconomia, escrita e qualquer profissão que exija profundidade, silêncio e análise subjetiva."
  },
  {
    id: 3,
    nome: "A Imperatriz",
    arquetipo: "A Criadora",
    elemento: "Terra",
    planeta: "Vênus",
    palavrasChave: ["Fertilidade", "Beleza", "Abundância"],
    idade: 3,
    mantra: "Eu sou o canal da beleza e da abundância; eu crio com foco e sustento com amor.",
    conteudo: {
      essencia: "Aos 3 anos, você viu o mundo como um lugar de alegria e liberdade sensorial. Desde então, busca criar, gerar e dar forma à realidade através dos sentidos. Você é pura vitalidade — gosta do toque, dos aromas e das cores vibrantes. Sua presença fertiliza os ambientes por onde passa, fazendo com que projetos brotem naturalmente sob seus cuidados.",
      luz: ["Criatividade: Gera projetos e ideias com uma facilidade invejável, possuindo um útero mental extremamente fértil.", "Sensualidade: Vive plenamente através do corpo, tratando-o como um templo de prazer e manifestação estética.", "Força Emocional: Resiste às adversidades com uma alegria contagiante e possui um coração resiliente que se regenera rápido.", "Magnetismo: Atrai pessoas e recursos sem precisar de esforço, apenas sendo quem você é em sua essência vibrante."],
      sombra: ["Narcisismo Estéril: Você olha tanto para o próprio umbigo que se torna incapaz de empatia real. O mundo deve servir aos seus caprichos ou você entra em colapso infantil.", "Tirania Afetiva: Usa a sedução e o falso 'cuidado' como ferramentas de controle e chantagem emocional para manter todos sob sua posse.", "Inconstância: Você é puro fogo de palha; começa tudo com euforia, mas abandona as responsabilidades assim que o prazer imediato ou a novidade acabam.", "Vazio Material: Tenta preencher abismos emocionais com consumo compulsivo e luxos desnecessários, tornando-se escrava das aparências para esconder o vazio."],
      conselho: ["Vença os Ciúmes: Compreenda que o que é verdadeiramente seu permanece por vontade própria; o controle e a posse só destroem o que você tenta segurar.", "Vença a Inconstância: Obrigue-se a terminar um projeto antigo por completo antes de se permitir iniciar qualquer nova ideia empolgante.", "Evite Chantagens: O amor legítimo não é um balcão de negócios; não manipule os sentimentos alheios para conseguir favores ou atenção.", "Estabeleça Limites: Aprender a dizer 'não' é um ato de autocuidado vital; se você tentar nutrir o mundo inteiro, acabará seca por dentro.", "Cultive Disciplina: A rotina organizada não mata sua criatividade; ela fornece a estrutura necessária para que seu talento ganhe o mundo real."]
    },
    saude: {
      vulnerabilidade: "Sua saúde depende do equilíbrio do seu sistema endócrino (hormônios). Como arquétipo de fertilidade, os órgãos reprodutores são sensíveis. A garganta é seu canal de criação; se houver repressão criativa ou raiva, ela inflama.",
      sintomas: ["Desequilíbrios na tireoide", "oscilações de glicose no sangue", "problemas de pele", "acne"],
      prevencao: ["Monitore o açúcar no sangue", "Cuide da hidratação da pele", "Saúde ginecológica/urológica"]
    },
    relacionamentos: "Busca intensidade e sensualidade, mas sofre com a possessividade. Cuidado com a tendência a ser infiel apenas por busca de validação.",
    carreira: "Brilha em design, gastronomia, moda, artes plásticas e qualquer área que envolva estética, nutrição e criação."
  },
  {
    id: 4,
    nome: "O Imperador",
    arquetipo: "O Governante",
    elemento: "Fogo",
    planeta: "Marte",
    palavrasChave: ["Estrutura", "Autoridade", "Conquista"],
    idade: 4,
    mantra: "Eu governo minha vida com sabedoria e abro meu coração para a flexibilidade.",
    conteudo: {
      essencia: "Aos 4 anos, a figura da autoridade definiu seu conceito de segurança. Você aprendeu que a ordem é poder e que o corpo precisa ser forte para proteger o território. Você é o construtor: aquele que estabelece regras, organiza o caos e provê estabilidade. Sua força reside na determinação de erguer estruturas que durem para além do seu tempo.",
      luz: ["Liderança: Assume o comando naturalmente e inspira respeito através de uma postura firme, ética e protetora.", "Praticidade: Foca em resultados concretos e possui uma habilidade ímpar para executar e resolver problemas de forma lógica.", "Fidelidade: O compromisso para você é sagrado; sua palavra dada tem valor de contrato inquebrável.", "Eficiência: Sabe otimizar recursos e tempo através de um planejamento estratégico impecável, fazendo sempre mais com menos."],
      sombra: ["Rigidez Cadavérica: Suas regras se tornaram uma prisão. Você prefere estar certo a ser feliz, sacrificando o afeto no altar de uma disciplina fria e sem alma.", "Autoritarismo: Você não lidera, você esmaga. Sua insegurança se mascara de prepotência, transformando diálogos em monólogos impositivos e violentos.", "Teimosia Cega: Mesmo diante do erro óbvio, você não recua por puro orgulho, preferindo afundar o projeto a admitir que não sabe o caminho.", "Deserto Emocional: Você confunde vulnerabilidade com fraqueza. Acaba isolado em um castelo de gelo onde ninguém consegue te tocar ou te amar de verdade."],
      conselho: ["Vença a Acomodação: Não deixe que o conforto do topo te torne estagnado; a verdadeira evolução exige que você saia da sua zona de segurança.", "Trabalhe a Escuta: Ouça genuinamente quem discorda de você; a verdade não é sua propriedade exclusiva. O aprendizado está na divergência.", "Quebre a Monotonia: Introduza elementos de surpresa e leveza na sua rotina para que a estrutura da sua vida não se torne um fardo insuportável.", "Peça Ajuda: Reconheça que você não precisa carregar o mundo nas costas sozinho; delegar tarefas é uma prova de inteligência e confiança no outro.", "Invista em Si: Lembre-se de que você é o seu patrimônio mais valioso; reserve tempo sagrado para cuidar da sua saúde física e mental."]
    },
    saude: {
      vulnerabilidade: "O excesso de controle e a raiva contida sobrecarregam o seu fígado. Sua rigidez mental se reflete na coluna e na base do corpo, afetando o nervo ciático. O estresse constante altera seu sistema hormonal/endócrino.",
      sintomas: ["Tensão muscular severa", "problemas hepáticos", "cálculos biliares", "dores lombares agudas"],
      prevencao: ["Pratique alongamentos diários", "Reduza o consumo de gorduras saturadas", "Libere a raiva reprimida"]
    },
    relacionamentos: "Atua como provedor, mas tende a ser controlador e competitivo com o parceiro, o que mata a intimidade emocional e a entrega.",
    carreira: "Engenharia, direito, administração de empresas, cargos militares e construção civil são campos onde sua autoridade prospera."
  },
  {
    id: 5,
    nome: "O Papa",
    arquetipo: "O Sacerdote",
    elemento: "Terra",
    planeta: "Júpiter",
    palavrasChave: ["Sabedoria", "Tradição", "Ensino"],
    idade: 5,
    mantra: "Eu ensino o que vivo e aprendo com o que observo; minha sabedoria nasce da coerência.",
    conteudo: {
      essencia: "Aos 5 anos, você descobriu o valor do conhecimento e da busca por respostas em guias e mentores. Você é o guardião das tradições, a ponte entre o passado e o futuro. Sua missão é transmitir a sabedoria acumulada, ensinando através do exemplo e da ética moral. Você encontra segurança nos rituais e nos valores que dão sentido à vida em sociedade.",
      luz: ["Ensino: Possui o dom de explicar conceitos complexos com clareza, transformando-se em uma referência intelectual para os outros.", "Ética: Age com integridade moral e faz o que é certo mesmo quando não há ninguém observando.", "Fé: Mantém uma conexão forte com o sagrado ou com valores humanitários que transcendem o egoísmo cotidiano.", "Poder da Palavra: Suas falas e escritos possuem um impacto profundo, sendo capazes de confortar e curar quem os ouve."],
      sombra: ["Hipocrisia: Você prega uma moralidade que não pratica no escuro. Sua fachada de santidade esconde sombras que você se recusa a admitir e integrar.", "Dogmatismo Cego: 'Sempre foi assim' é sua desculpa para não evoluir. Você persegue o novo por medo de perder o controle sobre as antigas verdades.", "Arrogância Intelectual: Você olha para os outros com desdém, acreditando que sua erudição te torna superior aos 'ignorantes' ao seu redor.", "Fanatismo: Transforma suas crenças em armas, tentando converter ou punir todos que não seguem a sua cartilha de conduta rígida."],
      conselho: ["Ouça a Voz Interior: Nem tudo o que os livros dizem serve para você; aprenda a diferenciar o dogma religioso ou social da sua verdade pessoal.", "Evite o Formalismo: Não deixe que o ritual se torne mais importante que a essência; a prática deve servir à vida, e não o contrário.", "Não Revele Planos Prematuros: Guarde suas sementes de ideias em segredo até que tenham força suficiente para brotar sem interferências tóxicas.", "Cure Feridas do Passado: O passado deve ser um mestre e não uma algema; busque terapia para resolver traumas de infância que ainda ditam suas regras de hoje.", "Pratique a Humildade: Reconheça que a busca pelo conhecimento é infinita e que você sempre terá algo a aprender com o mais simples dos seres."]
    },
    saude: {
      vulnerabilidade: "O peso do dever e das responsabilidades morais afeta o seu sistema circulatório e as artérias coronárias. Sua medula óssea reflete sua base de valores; se estiver sob pressão, você sente rigidez física.",
      sintomas: ["Hipertensão", "dores nas articulações (ombros e pescoço)", "má circulação nas extremidades (mãos e pés)"],
      prevencao: ["Faça caminhadas regulares", "Massagens terapêuticas para soltar a rigidez"]
    },
    relacionamentos: "Pode buscar figuras de autoridade ou tentar ser o 'professor' da relação. Busque a vulnerabilidade para não se tornar um ídolo distante para o parceiro.",
    carreira: "Brilha como professor, consultor, psicólogo, historiador ou em qualquer cargo que exija ética e transmissão de conhecimento."
  },
  {
    id: 6,
    nome: "Os Enamorados",
    arquetipo: "O Amante",
    elemento: "Ar",
    planeta: "Vênus",
    palavrasChave: ["Escolha", "União", "Harmonia"],
    idade: 6,
    mantra: "Eu escolho com clareza e assumo meu caminho com coragem e integridade.",
    conteudo: {
      essencia: "Aos 6 anos, você percebeu que o afeto e as parcerias são os motores da vida. Desde então, sua jornada é marcada pela busca de equilíbrio entre os desejos do coração e as necessidades da razão. Você é o arquétipo da escolha consciente: entende que cada decisão amorosa ou social é um espelho que revela quem você realmente é.",
      luz: ["Capacidade de Amar: Possui um coração generoso e uma habilidade natural para criar conexões profundas e empáticas.", "Harmonia: Busca pacificar conflitos e criar ambientes onde a beleza e o equilíbrio estético prevalecem.", "Sociabilidade: Transita bem em grupos, sendo um agregador nato que valoriza a amizade e a diplomacia.", "Sensibilidade Artística: Vê a arte como uma linguagem da alma e expressa sua criatividade através do afeto e do cuidado."],
      sombra: ["Indecisão Crônica: O medo de escolher e perder a outra opção te paralisa. Você fica em cima do muro enquanto a vida passa, tentando agradar a todos e sendo desonesto com você mesmo.", "Dependência Afetiva: Sua identidade só existe através do outro. Você suporta humilhações e migalhas por um pavor infantil de ficar sozinho com o seu próprio silêncio.", "Subserviência: Diz 'sim' querendo dizer 'não' apenas para evitar o conflito, tornando-se um capacho emocional que ninguém respeita de verdade.", "Dualidade Falsária: Mantém vidas paralelas ou sentimentos divididos por pura covardia de assumir uma única direção e arcar com as consequências."],
      conselho: ["Aprenda a Dizer Não: Entenda que impor limites claros é a maior prova de amor-próprio que você pode dar a si mesmo.", "Escolha com Coragem: Decidir implica em uma renúncia; aceite que perder uma opção faz parte do processo de ganhar um destino real e sólido.", "Não Projete o Impossível: Pare de buscar a perfeição no outro para camuflar o que você não aceita em si mesmo; aceite a humanidade falha das pessoas.", "Trabalhe o Foco: Concentre sua energia em um objetivo ou relação de cada vez; o excesso de direções acaba por diluir sua força vital e te deixa vazio.", "Cuide do Coração: Literal e emocionalmente; faça exames de rotina e aprenda a filtrar rigorosamente quem merece entrar no seu espaço sagrado."]
    },
    saude: {
      vulnerabilidade: "Seu bem-estar físico está ligado à harmonia das suas relações. O estresse por indecisão ou conflitos afetivos afeta o ritmo do coração (arritmias) e o sistema glandular. Unhas e cabelos revelam seu nível de vitalidade.",
      sintomas: ["Palpitações cardíacas", "queda de cabelo por estresse", "desequilíbrios glandulares/hormonais"],
      prevencao: ["Mantenha check-ups cardíacos em dia", "Busque ativamente ambientes que tragam paz visual e estética"]
    },
    relacionamentos: "O amor é o seu centro, mas a dificuldade em escolher pode gerar triângulos amorosos ou relações marcadas por uma insegurança paralisante.",
    carreira: "Artes, moda, terapia de casal, diplomacia e qualquer área que envolva estética e relações humanas."
  },
  {
    id: 7,
    nome: "O Carro",
    arquetipo: "O Guerreiro",
    elemento: "Água",
    planeta: "Netuno",
    palavrasChave: ["Vontade", "Triunfo", "Direção"],
    idade: 7,
    mantra: "Eu conduzo minha vida com direção firme e respeito o tempo sagrado de cada conquista.",
    conteudo: {
      essencia: "Aos 7 anos, algo despertou sua necessidade de conquistar autonomia e vitória. Você é pura força de vontade e movimento. Quando define um alvo, avança com uma determinação que ignora obstáculos. Sua jornada é sobre aprender a conduzir as rédeas das próprias emoções e instintos para alcançar o triunfo no mundo externo.",
      luz: ["Determinação: Possui uma força de trabalho inesgotável quando está motivado por um objetivo claro e desafiador.", "Coragem: Enfrenta os desafios de frente e não permite que o medo paralise suas ações em direção ao progresso pessoal.", "Pioneirismo: Abre novos caminhos onde ninguém se atreveu a ir, agindo como um líder que inspira pela força da ação.", "Agilidade: Toma decisões rápidas e executa planos com uma eficiência que deixa a concorrência para trás."],
      sombra: ["Arrogância do Vencedor: Você acredita que o sucesso te torna superior. Em sua busca cega por vitória, você atropela pessoas, sentimentos e éticas sem olhar para trás.", "Impulsividade Suicida: Você acelera em curvas perigosas apenas pela adrenalina, confundindo coragem com uma imprudência infantil e irresponsável.", "Franqueza Brutal: Usa a 'verdade' como um porrete para ferir os outros, justificando sua crueldade como falta de hipocrisia.", "Esgotamento (Burnout): Você não sabe parar. Seu motor está sempre no limite e você ignora os sinais de colapso do corpo até que a vida te pare à força."],
      conselho: ["Escolha a Direção: Velocidade sem rumo é apenas fuga. Antes de acelerar, tenha certeza absoluta de onde quer chegar e por quê.", "Curta o Processo: A vida não acontece apenas no pódio. Aprenda a valorizar a paisagem e as pequenas vitórias do dia a dia.", "Esporte como Canalização: Use a atividade física intensa para descarregar a agressividade e a fúria interna de forma saudável e produtiva.", "Pratique a Paciência: Nem tudo pode ser resolvido na base da força bruta. Aprenda que o tempo da vida muitas vezes é diferente do seu ritmo.", "Seja Precavido: O verdadeiro guerreiro inteligente sabe quais batalhas valem a pena e quais são apenas desperdício inútil de energia vital."]
    },
    saude: {
      vulnerabilidade: "Você vive em estado de alerta. Isso mantém as glândulas suprarrenais produzindo adrenalina sem parar, levando ao esgotamento (Burnout). Seus pontos de impacto são as pernas, os músculos e o fígado.",
      sintomas: ["Cãibras frequentes", "fadiga crônica", "dores musculares por tensão", "dores de cabeça tensionais"],
      prevencao: ["Pratique esportes de impacto para canalizar a fúria", "Reserve tempos de repouso absoluto"]
    },
    relacionamentos: "Tende a competir com o parceiro em vez de colaborar, o que gera conflitos de poder constantes e impede a verdadeira intimidade.",
    carreira: "Vendas, esportes de alto rendimento, cirurgia, cargos militares e qualquer profissão que exija coragem e riscos calculados."
  },
  {
    id: 8,
    nome: "A Justiça",
    arquetipo: "A Equidade",
    elemento: "Ar",
    planeta: "Vênus",
    palavrasChave: ["Equilíbrio", "Lei", "Verdade"],
    idade: 8,
    mantra: "Eu busco o equilíbrio entre a frieza da razão e o calor da compaixão.",
    conteudo: {
      essencia: "Aos 8 anos, você desenvolveu um senso crítico aguçado sobre o que é certo e errado. Você busca a harmonia através do julgamento frio e da análise técnica. Sua palavra é sua lei e você valoriza a integridade acima de qualquer conveniência emocional. Você é o peso que equilibra a balança da sua própria realidade.",
      luz: ["Honestidade: Pauta sua vida pela verdade, mantendo uma integridade inabalável mesmo diante de pressões externas.", "Análise Precisa: Possui uma mente técnica capaz de enxergar detalhes e falhas que passam despercebidos pela maioria das pessoas.", "Controle Emocional: Mantém a calma e a clareza mental durante crises, tomando decisões baseadas em fatos e não em impulsos.", "Produtividade: Organiza seu trabalho de forma lógica e eficiente, entregando resultados com precisão e rigor técnico."],
      sombra: ["Frieza Inumana: Você se tornou um juiz implacável que esqueceu como sentir. Suas sentenças são corretas, mas seu coração é um deserto de empatia.", "Autopunição Perfeccionista: Você se chicoteia mentalmente por qualquer erro bobo, vivendo sob um regime de terror interno onde a perfeição é a única opção.", "Conformismo Covarde: Você aceita injustiças 'legais' ou situações abusivas apenas para manter a aparência externa de ordem e equilíbrio estéril.", "Rigidez Mental: Você se prende tanto à letra da lei que perde o espírito da verdade, tornando-se uma pessoa inflexível, amarga e incapaz de perdoar."],
      conselho: ["Seja Menos Severo: Lembre-se de que a compaixão deve começar por você; aprenda a se perdoar pelas suas falhas inevitavelmente humanas.", "Sinta Antes de Julgar: Tente entender as motivações emocionais das pessoas antes de aplicar sua lógica fria sobre os comportamentos alheios.", "Não Espere Perfeição: Aceite que um resultado 80% bom é muito melhor do que um 100% perfeito que nunca sai do papel por medo de falhar.", "Beba Água: Seus rins precisam de hidratação constante para processar as toxinas físicas e as mágoas emocionais do seu corpo.", "Escolha suas Lutas: Nem toda injustiça do mundo é sua responsabilidade pessoal; aprenda a filtrar onde vale a pena investir seu senso de dever."]
    },
    saude: {
      vulnerabilidade: "Sua busca por perfeição e equilíbrio afeta os rins, órgãos que filtram e equilibram o corpo. Sua tensão arterial oscila conforme sua cobrança interna e rigidez de princípios.",
      sintomas: ["Cálculos renais (pedras)", "oscilações súbitas de pressão", "dores crônicas na região lombar"],
      prevencao: ["Ingestão alta de água", "Redução do consumo de sal", "Prática consciente do perdão"]
    },
    relacionamentos: "Dinâmicas marcadas pelo poder e pela cobrança. Pode haver uma repetição da severidade vivida com figuras de autoridade na infância.",
    carreira: "Direito, auditoria, contabilidade, gestão de qualidade e qualquer cargo que exija imparcialidade e rigor técnico."
  },
  {
    id: 9,
    nome: "O Eremita",
    arquetipo: "O Sábio",
    elemento: "Terra",
    planeta: "Saturno",
    palavrasChave: ["Sabedoria", "Solitude", "Orientação"],
    idade: 9,
    mantra: "Na minha luz interior eu encontro a paz; no mundo externo eu encontro o propósito.",
    conteudo: {
      essencia: "Aos 9 anos, você começou a se sentir mais maduro que seus pares. Entendeu que as respostas mais profundas não estão no barulho do mundo, mas no silêncio da própria alma. Você é o buscador solitário que caminha devagar, iluminando o próprio caminho com a lanterna da experiência e da prudência.",
      luz: ["Sabedoria Prática: Aprende com os erros da vida e transforma cicatrizes em lições valiosas para si e para os outros.", "Independência: Não precisa da aprovação da multidão para agir e sente-se confortável em sua própria companhia sagrada.", "Prudência: Pensa detalhadamente antes de dar qualquer passo, evitando armadilhas e riscos desnecessários por impulsividade.", "Capacidade de Orientação: É um conselheiro natural, buscado por aqueles que precisam de luz em meio à confusão mental ou espiritual."],
      sombra: ["Isolamento Amargo: Sua solitude virou uma prisão de arrogância. Você se afasta das pessoas porque as considera fúteis, mas no fundo morre de medo da intimidade real.", "Mão de Vaca Emocional: Você guarda tudo: dinheiro, afeto e conhecimento. Vive na escassez mental, temendo que se doar algo, ficará sem nada.", "Ceticismo Ácido: Você duvida de tudo e de todos. Nada é bom o suficiente, ninguém é confiável. Essa amargura está secando sua alma por dentro.", "Estagnação Medrosa: Você usa a 'prudência' como desculpa para nunca agir. Espera tanto o momento perfeito que as oportunidades apodrecem diante de você."],
      conselho: ["Respeite o Tempo Humano: Nem tudo na vida segue o ritmo lento da sua reflexão. Aprenda a ser mais ágil quando a situação exigir rapidez.", "Saiba Ceder: Flexibilidade não é sinal de fraqueza, mas de inteligência. Nem tudo precisa ser exatamente do seu jeito antigo.", "Saia de Casa: O mundo exterior oferece estímulos necessários para que sua mente não comece a 'moer' a si mesma em pensamentos circulares e mórbidos.", "Ajude os Idosos: Dedique parte do seu tempo a cuidar ou ouvir quem já viveu muito; esse é um caminho sagrado para sua própria evolução.", "Movimente o Corpo: O excesso de introspecção trava as articulações. Pratique caminhadas ou alongamentos para manter o fluxo da vida no seu corpo físico."]
    },
    saude: {
      vulnerabilidade: "Sua energia é lenta. Isso pode tornar o sistema digestivo preguiçoso. Com o tempo, há uma tendência à rigidez na estrutura óssea e nas articulações (osteoporose ou artrite).",
      sintomas: ["Prisão de ventre crônica", "dores nos ossos e articulações", "sensibilidade excessiva ao frio"],
      prevencao: ["Alimentos que estimulem o intestino", "Suplementação adequada de Cálcio e Vitamina D"]
    },
    relacionamentos: "Grande dificuldade de proximidade e entrega. Costuma atrair parceiros muito mais velhos ou figuras que buscam orientação em vez de amor.",
    carreira: "Pesquisa científica, arquivologia, filosofia e qualquer cargo que exija profundidade e trabalho focado."
  },
  {
    id: 10,
    nome: "A Roda da Fortuna",
    arquetipo: "O Ciclo",
    elemento: "Fogo",
    planeta: "Júpiter",
    palavrasChave: ["Mudança", "Sorte", "Renovação"],
    idade: 10,
    mantra: "Eu giro com a vida com sabedoria; no centro da roda, eu encontro meu equilíbrio.",
    conteudo: {
      essencia: "Aos 10 anos, você compreendeu que a vida é feita de ciclos instáveis. Aprendeu que nada é para sempre e que a única constante é a mudança. Você possui uma natureza adaptável e curiosa, sempre pronta para girar com os acontecimentos e encontrar novas formas de se reinventar.",
      luz: ["Adaptabilidade: Sobrevive a crises com uma facilidade incrível, mudando de pele conforme a necessidade do ambiente exige.", "Aprendizado Rápido: Sua mente é polivalente e absorve novos conhecimentos de forma intuitiva e veloz.", "Otimismo Realista: Acredita que a sorte favorece quem se move e mantém uma postura positiva mesmo diante das quedas da vida.", "Visão Global: Consegue enxergar o panorama completo das situações, não se prendendo a pequenos dramas momentâneos."],
      sombra: ["Instabilidade Crônica: Você é uma montanha-russa emocional e financeira. Nunca constrói nada sólido porque está sempre mudando de ideia por puro tédio.", "Superficialidade de 'Jack': Você sabe um pouco de tudo, mas não é mestre em nada. Sua curiosidade é rasa e você abandona o esforço assim que ele se torna difícil.", "Ansiedade de Movimento: Você não suporta ficar parado. Confunde paz com tédio e acaba criando problemas ou mudanças desnecessárias apenas para se sentir vivo.", "Fatalismo: Quando a roda desce, você se entrega ao vitimismo, acreditando que o 'destino' está contra você, fugindo da responsabilidade pelas suas escolhas."],
      conselho: ["Não Ande em Círculos: Mudança sem objetivo é apenas desperdício de energia. Antes de girar a roda novamente, defina claramente para onde você quer ir.", "Valorize a Rotina: Entenda que a estrutura básica do dia a dia é o que dá suporte para que suas grandes mudanças sejam seguras e bem-sucedidas.", "Faça uma Coisa de Cada Vez: O foco não é uma prisão, é o laser que permite que você alcance a maestria e resultados reais em vez de migalhas.", "Evite Extremos: Nem tudo é '8 ou 80'. Aprenda a navegar nas nuances cinzentas da vida sem precisar de crises para se sentir motivado.", "Cuide dos Ouvidos: Proteja sua audição de barulhos excessivos e aprenda a ouvir o silêncio para acalmar seu sistema nervoso naturalmente acelerado."]
    },
    saude: {
      vulnerabilidade: "Sua saúde é marcada pela instabilidade. O metabolismo oscila rapidamente, afetando o peso. Os ouvidos (labirinto) são sensíveis, afetando seu equilíbrio físico e mental.",
      sintomas: ["Labirintite", "tonturas frequentes", "oscilações bruscas de peso", "picos de cansaço súbito"],
      prevencao: ["Mantenha uma rotina rígida de horários para alimentação e sono ajuda a estabilizar seu metabolismo"]
    },
    relacionamentos: "Dificuldade em manter laços de longo prazo devido ao medo de ser 'aprisionado' pela rotina e pela necessidade viciante de novidade.",
    carreira: "Turismo, comércio exterior, startups e qualquer profissão que envolva mudanças constantes e riscos calculados."
  },
  {
    id: 11,
    nome: "A Força",
    arquetipo: "A Dominadora",
    elemento: "Fogo",
    planeta: "Marte",
    palavrasChave: ["Autocontrole", "Vontade Dirigida", "Magnetismo"],
    idade: 11,
    mantra: "Minha força vem da suavidade e meu poder nasce do domínio que tenho sobre mim mesmo.",
    conteudo: {
      essencia: "Aos 11 anos, você descobriu que o verdadeiro poder não vem da violência, mas da contenção e do domínio sobre os próprios instintos. Você move-se pelo mundo com um magnetismo inconfundível. Sua determinação é silenciosa, mas implacável, transformando suas sombras internas em combustível para conquistas concretas.",
      luz: ["Magnetismo Pessoal: Sua presença impõe respeito sem que você precise gritar; as pessoas são atraídas pela sua força interior contida.", "Domínio de Si: É capaz de manter a calma sob pressão extrema, agindo com inteligência estratégica em vez de reações instintivas infantis.", "Coragem Existencial: Encara medos e dores profundas sem recuar, usando cada desafio como uma oportunidade de fortalecimento da alma.", "Criatividade Concreta: Não espera a sorte bater à porta; você gera suas próprias oportunidades através de uma vontade dirigida e focada."],
      sombra: ["Explosões Vulcânicas: Você guarda tanta pressão para parecer sob controle que, quando explode, destrói tudo ao redor com uma crueldade desproporcional.", "Competitividade Tóxica: Você transforma cada conversa em um cabo de guerra. Precisa vencer sempre, transformando parceiros em adversários a serem subjugados.", "Perfeccionismo Destrutivo: Sua autocobrança é uma forma de tortura. Você nunca se permite o erro ou o descanso, vendo a humanidade como uma fraqueza irritante.", "Teimosia Obsessiva: Quando enfia algo na cabeça, você se torna cego. Ignora conselhos e fatos apenas para não admitir que sua 'força' errou o alvo."],
      conselho: ["Conte até Dez: Antes de reagir a uma provocação, respire fundo. Seu maior poder está no silêncio que precede a ação inteligente.", "Colabore em vez de Competir: Entenda que o sucesso compartilhado é muito mais duradouro e menos solitário do que a vitória isolada e amarga.", "Administre sua Energia: Pratique Yoga ou artes marciais suaves para aprender a fluir com a energia em vez de lutar constantemente contra a vida.", "Perdoe-se pela Imperfeição: Aceite que ser humano envolve falhas. O descanso é a manutenção necessária para que sua força continue ativa.", "Escolha suas Batalhas: Nem toda pedra no caminho merece o seu chute. Economize sua energia vital para os grandes e reais objetivos da sua vida."]
    },
    saude: {
      vulnerabilidade: "O esforço para conter seus impulsos gera uma tensão constante no sistema neuromuscular. Você gasta muita energia interna, o que pode causar oscilações na glicose.",
      sintomas: ["Bruxismo (tensão na mandíbula)", "fibromialgia", "hipoglicemia", "dores musculares crônicas por tensão"],
      prevencao: ["Práticas corporais que flexibilizem a musculatura", "Alimentação em intervalos regulares"]
    },
    relacionamentos: "Tende a querer dominar o parceiro; precisa aprender a ceder e aceitar que o outro também tem força e vontades legítimas.",
    carreira: "Liderança executiva, cirurgia, gestão de crises e qualquer área que exija nervos de aço e determinação implacável."
  },
  {
    id: 12,
    nome: "O Pendurado",
    arquetipo: "O Mártir",
    elemento: "Água",
    planeta: "Netuno",
    palavrasChave: ["Sacrifício", "Abnegação", "Perspectiva"],
    idade: 12,
    mantra: "Eu me oferto sem me perder e suspendo o movimento para encontrar a verdadeira direção.",
    conteudo: {
      essencia: "Aos 12 anos, você percebeu que às vezes é preciso parar e olhar o mundo por outro ângulo para encontrar a verdade. Você carrega a energia da doação e da sensibilidade espiritual. Vive frequentemente entre o plano material e o espiritual, buscando um sentido maior através do desapego e da renúncia consciente.",
      luz: ["Empatia Profunda: Sente a dor do próximo como se fosse sua, sendo uma presença nutritiva e cuidadora para todos ao seu redor.", "Perspectiva Única: Consegue enxergar soluções criativas onde todos veem apenas becos sem saída, pois sua mente não está presa a padrões convencionais.", "Desapego: Não é escravo de bens materiais ou status social, valorizando a liberdade da alma acima de qualquer posse mundana.", "Espiritualidade Genuína: Sua busca pelo sagrado é real e profunda, servindo como uma âncora de paz em meio ao caos da vida prática."],
      sombra: ["Complexo de Vítima: Você usa o sofrimento como uma medalha de honra. Adora reclamar que 'faz tudo por todos', alimentando um melodrama narcisista e tóxico.", "Estagnação Covarde: Você se finge de 'espiritualizado' para esconder o medo paralisante de agir. Sua vida está travada porque você se recusa a assumir as rédeas.", "Idolatria Afetiva: Você transforma o parceiro em um deus e se coloca como um tapete. Essa anulação não é amor, é falta de amor-próprio e pavor da solidão.", "Mártir Manipulador: Você sofre 'voluntariamente' apenas para gerar culpa nos outros e mantê-los presos à sua carência emocional asfixiante."],
      conselho: ["Não seja Escravo: Ajude apenas quem demonstra esforço real para se ajudar. Não gaste sua vida tentando salvar quem escolheu o próprio naufrágio.", "Aterre sua Espiritualidade: De nada servem as visões se você não consegue lidar com a realidade prática. Coloque seus pés no chão do agora.", "Pare de se Lamentar: Seu sofrimento não te torna especial. Transforme sua dor em ação concreta e pare de contar suas feridas para atrair atenção alheia.", "Crie Algo Real: Use sua sensibilidade para a arte ou trabalho manual. Transformar o que você sente em algo tangível é o seu maior caminho de cura.", "Vença a Timidez: Sua visão de mundo é valiosa. Não a esconda por medo de julgamento; o mundo precisa da sua perspectiva diferenciada."]
    },
    saude: {
      vulnerabilidade: "A estagnação e o sentimento de martírio baixam o sistema imunológico. A falta de movimento afeta a circulação nas pernas e a linfa.",
      sintomas: ["Varizes", "pernas pesadas", "baixa imunidade (doenças recorrentes)", "sensibilidade nos pulmões"],
      prevencao: ["Eleve as pernas diariamente", "Pratique atividades que estimulem a drenagem linfática e a imunidade"]
    },
    relacionamentos: "Tende à dependência emocional extrema; precisa aprender que o amor legítimo exige reciprocidade e dois indivíduos inteiros.",
    carreira: "Terapias holísticas, artes, trabalho social e qualquer profissão que exija doação e uma visão humanitária profunda."
  },
  {
    id: 13,
    nome: "A Morte",
    arquetipo: "O Transformador",
    elemento: "Água",
    planeta: "Plutão",
    palavrasChave: ["Renascimento", "Desapego", "Impermanência"],
    idade: 13,
    mantra: "Eu deixo morrer o que não serve mais para que a vida se renove em mim com toda a sua força.",
    conteudo: {
      essencia: "Aos 13 anos, você aprendeu que nada é permanente e que a segurança é uma ilusão. Você carrega o poder de destruir o que está podre para que o novo possa brotar. Vive em ciclos constantes de morte e renascimento, sendo o fênix que não teme as cinzas da própria história.",
      luz: ["Capacidade de Renovação: Possui uma resiliência absurda, sendo capaz de recomeçar do zero absoluta após qualquer tragédia ou perda total.", "Profundidade: Não se contenta com o superficial e busca entender as raízes ocultas de todos os problemas e sentimentos humanos.", "Desapego Radical: Sabe a hora de soltar o que já não serve mais, evitando carregar fardos inúteis e pesados do passado para o presente.", "Firmeza de Caráter: É inabalável em seus princípios e possui uma determinação silenciosa que assusta e inspira ao mesmo tempo."],
      sombra: ["Obsessão pela Perda: Você vive esperando o pior. Seu medo do abandono é tão grande que você sabota as relações antes que elas floresçam para 'controlar' a dor.", "Inércia Depressiva: Quando as coisas mudam, você se enterra vivo no luto. Prefere abraçar o cadáver do passado do que abrir as janelas para o novo dia.", "Subserviência por Medo: Você se cala e aceita abusos porque teme que, se reagir, perderá a pouca e falsa segurança que acredita ter.", "Autossabotagem Ciclista: Você destrói tudo o que constrói assim que começa a dar certo, por uma crença inconsciente de que você nasceu para perder."],
      conselho: ["Mexa com a Terra: O contato físico com o solo, plantas ou argila ajuda a aterrar sua energia de transformação e cura sua melancolia profunda.", "Aprenda a dizer NÃO: Estabelecer limites claros é o primeiro passo para parar de ser a vítima das mudanças provocadas pelos outros.", "Enterre seus Mortos: Faça rituais de desapego para encerrar ciclos que já acabaram. Pare de visitar mentalmente as dores que já não existem mais.", "Termine o que Começou: A integridade da sua alma depende de você concluir seus projetos e honrar seus compromissos até o fim absoluto.", "Não Antecipe o Sofrimento: O futuro ainda não aconteceu. Pare de pagar juros emocionais por uma dívida que você ainda não contraiu."]
    },
    saude: {
      vulnerabilidade: "Sua saúde foca na renovação celular. Se você resiste às mudanças, a estrutura 'seca', afetando ossos e dentes. O estresse profundo gera depressão.",
      sintomas: ["Problemas dentários frequentes", "fragilidade óssea", "anemias recorrentes", "fadiga crônica ligada ao luto emocional"],
      prevencao: ["Pratique desintoxicações periódicas", "Atividades que te conectem com a regeneração física e mental"]
    },
    relacionamentos: "Marcados pelo pavor do abandono; precisa aprender que o amor verdadeiro é um fluxo constante de mortes e renascimentos diários.",
    carreira: "Psicologia profunda, gestão de crises, medicina forense e qualquer área que exija cortes e reformulações radicais."
  },
  {
    id: 14,
    nome: "A Temperança",
    arquetipo: "O Alquimista",
    elemento: "Fogo",
    planeta: "Júpiter",
    palavrasChave: ["Alquimia", "Moderação", "Cura"],
    idade: 14,
    mantra: "Eu transmuto o caos em harmonia e encontro o equilíbrio perfeito entre minha razão e minha alma.",
    conteudo: {
      essencia: "Aos 14 anos, você descobriu que a força verdadeira reside no equilíbrio dos opostos. Você é um canal de harmonia e cura. Sua presença é capaz de acalmar ambientes e transmutar conflitos em cooperação através da paciência e da moderação.",
      luz: ["Poder de Cura: Possui um dom natural para as artes curativas, seja através das mãos, das palavras ou da simples presença tranquilizadora.", "Equilíbrio: Sabe ponderar todos os lados de uma situação, evitando extremismos e encontrando o caminho do meio com sabedoria.", "Mente Inovadora: Conecta ciência e espiritualidade com facilidade, buscando sempre expandir a consciência e encontrar novas soluções.", "Amizade Genuína: Valoriza a lealdade e a camaradagem, construindo laços duradouros baseados no respeito à liberdade mútua."],
      sombra: ["Racionalização Defensiva: Você usa a lógica para fugir do que sente. Fica 'em cima do muro' por covardia de se posicionar e enfrentar as consequências.", "Impaciência Oculta: Por dentro você está explodindo, mas mantém uma máscara de calma que adoece seu corpo. Sua 'temperança' é repressão tóxica.", "Utopismo Alienado: Você vive tanto no mundo ideal que esquece como lidar com a sujeira da realidade prática. Fica esperando por soluções mágicas.", "Necessidade de Agradar: Você se molda para ser aceito por todos, perdendo sua cor e sua autenticidade no processo de ser o 'pacificador' oficial."],
      conselho: ["Defina Metas Claras: Sem um alvo, sua energia se dispersa. Escreva seus objetivos para os próximos cinco anos e foque neles com determinação.", "Descarregue a Eletricidade: Pratique exercícios físicos regulares para soltar a tensão nervosa acumulada. Seu corpo não aguenta apenas estímulo mental.", "Pratique a Tolerância Real: Aceite que os outros têm o direito de serem diferentes. O conflito muitas vezes é o motor necessário para o crescimento.", "Honre seu Coração: Não deixe que seu intelecto sufoque sua sensibilidade. Permita-se sentir as emoções plenamente sem tentar analisá-las.", "Supere-se Diariamente: Busque progredir 1% a cada dia em vez de esperar por milagres. A constância é a sua maior ferramenta alquímica."]
    },
    saude: {
      vulnerabilidade: "Você é um condutor elétrico; o estresse afeta o sistema neurológico. Suas glândulas endócrinas são sensíveis ao ritmo acelerado.",
      sintomas: ["Enxaquecas", "distúrbios de sono", "problemas hormonais súbitos", "sensibilidade a ambientes carregados"],
      prevencao: ["Hidratação constante em temperatura ambiente", "Redução drástica de estímulos eletrônicos antes de dormir"]
    },
    relacionamentos: "Valoriza a amizade e a liberdade. Cuidado para não reprimir seus desejos apenas para manter uma paz artificial e frágil.",
    carreira: "Tecnologia, terapias alternativas, engenharia de inovação e mediação."
  },
  {
    id: 15,
    nome: "O Diabo",
    arquetipo: "A Sombra",
    elemento: "Terra",
    planeta: "Saturno",
    palavrasChave: ["Domínio", "Poder Material", "Confronto"],
    idade: 15,
    mantra: "Eu domino meus instintos para ser livre; meu poder material serve ao meu propósito espiritual.",
    conteudo: {
      essencia: "Aos 15 anos, você entrou em contato com o poder das forças ocultas e da própria sombra. Você possui um magnetismo avassalador e uma capacidade imensa de materializar desejos no mundo físico. Sua jornada é sobre dominar os próprios instintos e o ego para não se tornar escravo das suas criações.",
      luz: ["Materialização: Possui um talento raro para construir impérios e manifestar riqueza, usando sua perspicácia para ler as regras ocultas do poder.", "Perspicácia Psicológica: Enxerga através das máscaras alheias. Ninguém te engana por muito tempo, pois você lê a sombra das pessoas.", "Magnetismo e Vitalidade: Sua energia vital e sexual é poderosa e criativa, atraindo recursos e pessoas com facilidade quase hipnótica.", "Fidelidade Radical: Quando assume um compromisso verdadeiro, sua lealdade é inquebrável. Você entende o valor sagrado de um contrato honrado."],
      sombra: ["Tirania e Controle: Você é um mestre da manipulação. Usa o medo, o dinheiro ou o sexo para manter as pessoas sob seu domínio como se fossem posses.", "Vício e Obsessão: Você se perde em prazeres que te escravizam. Seja poder ou relações tóxicas, sua compulsão devora sua liberdade real.", "Desconfiança Paranoica: Você acredita que todos são sujos. Não confia em ninguém, o que te condena a uma solidão profunda, amarga e autoimposta.", "Ganância Cega: Você vende sua alma por status, esquecendo que o preço cobrado pelo ego é sempre a sua paz e a sua sanidade."],
      conselho: ["Separe Amor de Dinheiro: Nunca misture finanças com afeto. Contratos claros protegem seu coração de tragédias e ressentimentos desnecessários.", "Confronte sua Sombra: Em vez de projetar o mal nos outros, olhe para os seus próprios desejos sombrios e aprenda a integrá-los com consciência.", "Pratique o Desapego: Doe algo valioso regularmente para lembrar a si mesmo que as coisas servem a você, e não o contrário. Você não é o que possui.", "Cultive o Perdão: A vingança é um veneno que você bebe esperando que o outro morra. Liberte-se desse peso para poder caminhar.", "Busque Terapia Profunda: Você precisa de um espaço seguro para falar sobre seus medos e traumas mais obscuros sem máscaras de poder."]
    },
    saude: {
      vulnerabilidade: "Foco na saúde reprodutiva e sexual. A tensão acumulada e a raiva contida geram bruxismo severo. O excesso desgasta o campo energético.",
      sintomas: ["Tensões na mandíbula", "problemas nos órgãos genitais", "infecções recorrentes", "distúrbios obsessivo-compulsivos"],
      prevencao: ["Terapia profunda", "Atividades físicas que liberem a carga agressiva e sexual de forma criativa"]
    },
    relacionamentos: "Intensos e marcados por jogos de poder e ciúme. Precisa aprender que o amor real consiste em libertar, e não em possuir.",
    carreira: "Finanças, psicanálise, investigação e qualquer cargo que exija alto poder de negociação e visão de bastidores."
  },
  {
    id: 16,
    nome: "A Torre",
    arquetipo: "A Destruição Criadora",
    elemento: "Fogo",
    planeta: "Marte",
    palavrasChave: ["Fim da Ilusão", "Reestruturação", "Verdade"],
    idade: 16,
    mantra: "Eu aceito a queda do que é falso e reconstruo minha vida sobre a rocha da verdade inabalável.",
    conteudo: {
      essencia: "Aos 16 anos, você percebeu que estruturas construídas sobre mentiras ou egos estão destinadas a cair. Você é o raio que traz a verdade nua e crua, derrubando o que é falso para revelar a fundação real. Sua jornada é sobre aprender a abraçar o caos da queda para reconstruir sobre bases sólidas e honestas.",
      luz: ["Busca pela Verdade: Não aceita meias verdades. Sua honestidade é cortante e purificadora, trazendo clareza para situações que todos fingem não ver.", "Resiliência Reconstrutiva: Possui a incrível habilidade de se levantar após desastres, reconstruindo sua vida com uma base muito mais forte.", "Integridade: Suas convicções são poderosas e você não se vende. É uma rocha de princípios em meio à tempestade de falsidades do mundo.", "Desmascarador de Ilusões: Consegue ver a podridão em estruturas, agindo como o agente necessário para a reestruturação e o progresso real."],
      sombra: ["Autossabotagem Explosiva: Você implode sua vida sempre que ela começa a ficar estável. Por medo de perder o controle, você mesmo causa o desastre.", "Prepotência Cega: Você ignora os sinais de aviso e continua construindo sobre areia movediça por puro orgulho de não admitir o erro inicial.", "Radicalismo Destrutivo: Em sua busca pela 'verdade', você destrói relações e carreiras sem nenhuma compaixão, agindo como um tirano cruel.", "Aperto Existencial: Você vive em estado de alerta e tensão constante, impedindo que você desfrute de qualquer momento de paz ou segurança."],
      conselho: ["Lidere pelo Exemplo: Não tente impor sua visão através da força. Mostre o caminho através da sua integridade e ações inquestionáveis.", "Respire Antes de Agir: Nem todo problema precisa de uma demolição total. Aprenda a diferenciar uma reforma necessária de uma destruição evitável.", "Abandone o Radicalismo: A vida possui tons de cinza. Nem tudo o que é imperfeito é mentiroso; aceite as falhas humanas com mais tolerância.", "Cuide da sua Coluna: Pratique alongamentos e exercícios de postura. A rigidez física é o reflexo direto da sua teimosia mental e falta de flexibilidade.", "Perdoe-se pelos Erros: Pare de carregar a culpa pelas torres que caíram no passado. Use os escombros apenas como lição para as novas fundações."]
    },
    saude: {
      vulnerabilidade: "Você somatiza as rupturas na coluna vertebral. Há risco de acidentes súbitos por precipitação. O sistema nervoso vive em 'alta tensão'.",
      sintomas: ["Hérnias de disco", "traumas físicos repentinos", "crises agudas de dor que travam o movimento"],
      prevencao: ["Fortalecimento do Core (abdômen e lombar)", "Atenção redobrada no trânsito e em atividades de risco"]
    },
    relacionamentos: "Marcados por rupturas súbitas. Precisa aprender a diplomacia para não acabar sozinho nas ruínas do próprio ego ferido.",
    carreira: "Gestão de crises, auditoria e qualquer profissão que exija reformas profundas e análise de falhas estruturais."
  },
  {
    id: 17,
    nome: "A Estrela",
    arquetipo: "A Esperança",
    elemento: "Ar",
    planeta: "Urano",
    palavrasChave: ["Esperança", "Orientação", "Inspiração"],
    idade: 17,
    mantra: "Eu sou o farol que guia e a estrela que brilha; minha esperança é a semente da minha realidade.",
    conteudo: {
      essencia: "Aos 17 anos, você descobriu que mesmo na noite mais escura, existe uma luz que guia. Você é um farol de esperança e inspiração. Sua mente é cósmica e visionária, capaz de projetar o futuro com otimismo e beleza. Sua missão é orientar os outros através da sua própria transparência e fé na renovação da vida.",
      luz: ["Esperança Ativa: Não apenas sonha, mas trabalha para que o futuro seja melhor, inspirando todos com sua visão positiva e cristalina.", "Orientação: É um guia natural. As pessoas te buscam para encontrar um norte quando se sentem perdidas na escuridão emocional.", "Jovialidade e Leveza: Possui um espírito que nunca envelhece, trazendo frescor, bom humor e paz para qualquer ambiente que frequenta.", "Visão Holística: Consegue enxergar a conexão entre todas as coisas, agindo com generosidade por entender que somos todos um."],
      sombra: ["Desperdício de Talento: Você é um moinho de vento. Gasta sua energia e tempo em utopias irrealizáveis, morrendo de sede ao lado da fonte.", "Exposição Imprudente: Você conta sua vida para qualquer um. Sua falta de filtro te torna um alvo fácil para parasitas que sugam seu brilho.", "Alienada do Real: Seus sonhos são tão grandes que você esqueceu da vida prática. Sua espiritualidade virou uma fuga da responsabilidade adulta.", "Ironia Defensiva: Quando sua sensibilidade é ferida, você se torna sarcástico e frio para manter as pessoas à distância."],
      conselho: ["Administre seus Recursos: Nem todo talento ou recurso deve ser gasto de uma vez. Crie reservas para os tempos de seca e proteja sua força.", "Mantenha Segredo: Aprenda que nem todos merecem conhecer seus sonhos íntimos. O silêncio protege a gestação da sua luz interior.", "Pratique o Tato: A verdade deve ser dita com amor. Ser sincero não te dá o direito de ser cruel ou insensível com a dor alheia.", "Planeje seus Riscos: A aventura é necessária, mas a irresponsabilidade é um suicídio lento. Coloque os pés no chão antes de tentar voar.", "Estabeleça Prioridades: Escolha um único brilho para focar sua energia. Quem tenta iluminar tudo acaba se apagando por pura exaustão."]
    },
    saude: {
      vulnerabilidade: "Sua saúde está ligada ao fluxo das águas: sistema urinário (rins e bexiga). Como vive no 'futuro', pode descuidar da base e dos tornozelos.",
      sintomas: ["Cistites recorrentes", "retenção urinária", "inchaço nas pernas", "torções frequentes nos tornozelos"],
      prevencao: ["Hidratação constante", "Práticas de aterramento (grounding) para conectar a mente visionária com o corpo físico"]
    },
    relacionamentos: "Idealista e romântico. Cuidado para não atrair pessoas 'vampiras' que buscam apenas sugar sua esperança sem oferecer nada.",
    carreira: "Design, astrologia, mediação de conflitos e artes visuais."
  },
  {
    id: 18,
    nome: "A Lua",
    arquetipo: "A Intuição",
    elemento: "Água",
    planeta: "Lua",
    palavrasChave: ["Imaginação", "Melancolia", "Intuição"],
    idade: 18,
    mantra: "Eu atravesso meus medos com coragem e confio na luz da minha intuição para encontrar meu caminho.",
    conteudo: {
      essencia: "Aos 18 anos, você mergulhou nas águas profundas do inconsciente e do mistério. Você é sensível aos ciclos invisíveis e às marés emocionais. Possui uma imaginação riquíssima e uma intuição que beira o mediúnico. Sua jornada é sobre aprender a navegar na névoa dos próprios medos para encontrar o tesouro da alma.",
      luz: ["Intuição Visceral: Você sente a verdade através do corpo e dos sonhos; sua bússola interna detecta perigos e segredos ocultos.", "Criatividade Simbólica: Possui um mundo interno vasto, sendo capaz de criar projetos que tocam profundamente o inconsciente das pessoas.", "Cuidado Maternal: Tem um instinto natural de proteger e nutrir os seres mais frágeis com uma dedicação silenciosa e instintiva.", "Conexão com os Ciclos: Entende o tempo das coisas e sabe que após cada noite escura, a renovação é garantida pelas leis naturais."],
      sombra: ["Paralisia pelo Medo: Você vê fantasmas em cada esquina. Suas fobias são tão grandes que você se recusa a viver, preferindo o mofo do isolamento.", "Manipulação Emocional: Você usa sua 'sensibilidade' para se fazer de vítima e prender as pessoas em teias de culpa e dependência.", "Vício na Ilusão: Você prefere a mentira confortável à verdade dolorosa. Vive em um mundo de fantasias e negações para não ter que crescer.", "Instabilidade Histérica: Seu humor muda com as fases da lua e você exige que todos caminhem sobre ovos para não despertarem suas crises."],
      conselho: ["Verifique os Fatos: Nem tudo o que você sente é verdade. Antes de entrar em pânico, busque evidências concretas e lógicas na realidade física.", "Saia do Casulo: A solidão excessiva alimenta seus demônios internos. Force-se a frequentar ambientes sociais para manter sua sanidade.", "Crie Rotinas Sólidas: Hábitos fixos de sono e alimentação são as âncoras que impedem que sua mente se perca em emoções instáveis.", "Não Guarde Mágoas: O ressentimento é um câncer na alma. Aprenda a expressar o que sente antes que as mágoas virem sintomas físicos.", "Busque o Bom Senso: Pergunte a alguém de confiança se sua percepção dos fatos está correta. A validação externa é necessária para quem vive na névoa."]
    },
    saude: {
      vulnerabilidade: "Você é sensível aos ciclos lunares. Isso afeta o sistema linfático e órgãos ligados à nutrição e ao feminino: seios e estômago.",
      sintomas: ["Edemas (inchaços)", "má digestão emocional", "gastrites", "sensibilidade cíclica nos seios e no útero"],
      prevencao: ["Drenagem linfática regular", "Alimentação leve para não sobrecarregar o estômago durante as marés emocionais"]
    },
    relacionamentos: "Busca fusão total. Cuidado com o medo irracional de ser enganado, que acaba gerando exatamente o que você teme por pura projeção.",
    carreira: "Escrita, psicologia profunda, veterinária e todas as artes subjetivas."
  },
  {
    id: 19,
    nome: "O Sol",
    arquetipo: "O Iluminador",
    elemento: "Fogo",
    planeta: "Sol",
    palavrasChave: ["Criatividade", "Alegria", "Vitalidade"],
    idade: 19,
    mantra: "Eu brilho para servir e crio para alegrar; minha luz é eterna porque nasce do meu coração puro.",
    conteudo: {
      essencia: "Aos 19 anos, você assumiu seu lugar no centro da própria vida e aprendeu a brilhar sem medo. Você é pura energia, calor e clareza. Sua presença ilumina qualquer lugar e sua generosidade é inata. Sua missão é criar, celebrar e liderar com um coração aberto e uma alegria que resiste a qualquer sombra.",
      luz: ["Vitalidade Abundante: Possui uma energia contagiante, sendo capaz de realizar grandes projetos e motivar multidões com seu entusiasmo.", "Sinceridade Luminosa: É direto e transparente em suas intenções, agindo sem máscaras e trazendo clareza para a confusão alheia.", "Generosidade Magnânima: Tem um coração imenso e prazer em compartilhar seu sucesso e alegria com todos, sem reservas.", "Sucesso Criativo: O que você toca tende a ganhar visibilidade; você é um canal natural para a manifestação da abundância."],
      sombra: ["Orgulho Ofuscante: Você se sente o centro do universo. Sua arrogância é tamanha que você acredita ser infalível e acima das leis comuns.", "Vaidade Oca: Você vive para os aplausos. Se não for elogiado, desmorona em ira ou depressão, sendo escravo da imagem externa.", "Prepotência Tirânica: Você não ilumina, você queima. Sua vontade é imposta de tal forma que você sufoca o brilho de quem está ao redor.", "Infidelidade Narcisista: Você precisa de plateia constante. Busca novos parceiros apenas para provar que ainda é desejável, ferindo quem te ama."],
      conselho: ["Deixe os Outros Brilharem: A verdadeira liderança consiste em iluminar o caminho alheio. Aprenda a sair do centro do palco de vez em quando.", "Conecte-se com a Fonte: Passe tempo ao sol e ao ar livre para recarregar sua bateria vital; seu corpo físico se alimenta de luz real.", "Focalize sua Energia: Não tente fazer tudo ao mesmo tempo ou seu brilho se dispersará. Escolha seus grandes alvos e mantenha o foco.", "Vença a Ansiedade de Performance: Você não precisa provar nada. Aprenda a descansar na certeza do seu valor sem precisar de aplausos.", "Pratique a Humildade: Lembre-se de que o Sol também se põe. Respeite seus momentos de baixa e aprenda com o silêncio necessário da noite."]
    },
    saude: {
      vulnerabilidade: "O excesso de energia afeta o coração e a circulação. Os olhos e a pele são sensíveis à luz. O estresse de performance causa queda de cabelo.",
      sintomas: ["Arritmias cardíacas", "problemas de visão por esforço", "dermatites por calor", "picos de pressão arterial"],
      prevencao: ["Use proteção solar e óculos de qualidade", "Monitore regularmente sua saúde cardiovascular"]
    },
    relacionamentos: "Brilha e lidera. Cuidado para não ofuscar o parceiro a ponto de ele se tornar apenas uma sombra da sua vontade.",
    carreira: "Liderança empresarial, eventos, pedagogia e artes performáticas."
  },
  {
    id: 20,
    nome: "O Julgamento",
    arquetipo: "O Renascido",
    elemento: "Fogo",
    planeta: "Plutão",
    palavrasChave: ["Ressurgimento", "Consciência", "Vocação"],
    idade: 20,
    mantra: "Eu ouço meu chamado sagrado, perdoo meu passado e renasço para minha verdadeira missão.",
    conteudo: {
      essencia: "Aos 20 anos, você ouviu o chamado para despertar para o seu verdadeiro propósito. Você carrega a energia da libertação do passado e do renascimento em uma consciência superior. Sua jornada é sobre perdoar a si mesmo, integrar as lições vividas e assumir sua vocação com total integridade e clareza.",
      luz: ["Despertar de Vocação: Encontra o sentido real da existência e alinha suas ações com seu propósito de alma, agindo com motivação transcendental.", "Poder de Renovação: É capaz de encerrar ciclos antigos com sabedoria e ressurgir das cinzas com uma força renovada e desperta.", "Mente Analítica: Possui raciocínio rápido e habilidade ímpar para decompor situações complexas e encontrar a verdade sob a ilusão.", "Colaboração Humanitária: Age em prol do coletivo, buscando harmonia entre os seres através da comunicação ética e do despertar alheio."],
      sombra: ["Julgamento Cruel: Você aponta o dedo para todos, mas não olha para os próprios erros. Sua língua condena os outros sem nenhuma chance de redenção.", "Apego ao Cadáver do Passado: Você vive remoendo o que já morreu. Sua nostalgia é uma áncora amarga que te impede de viver o presente.", "Ceticismo Estéril: Você se recusa a acreditar em qualquer coisa além do material, tornando-se um robô frio, vazio e sem nenhum propósito real.", "Agitação Improdutiva: Você corre em círculos porque tem medo de parar e ouvir sua própria consciência cobrando o seu potencial desperdiçado."],
      conselho: ["Perdoe-se Agora: O passado foi apenas um laboratório. Pare de se punir por erros antigos e aceite a oportunidade de ser novo hoje.", "Ouça o Chamado: Preste atenção aos sinais da vida. Seu propósito está batendo à porta; pare de fingir que não está em casa.", "Seja Flexível: A rigidez mental é o túmulo da evolução. Permita-se mudar de ideia sempre que sua consciência indicar uma nova verdade.", "Lute pelos seus Direitos: Não se cale diante da injustiça. Use sua voz para despertar consciências e não apenas para reclamar.", "Organize-se: O caos externo é o inimigo do seu despertar. Crie uma estrutura básica para que sua vocação possa finalmente se manifestar."]
    },
    saude: {
      vulnerabilidade: "Seus pulmões representam a capacidade de 'renascer'. Problemas no sistema respiratório indicam resistência. A audição é onde você ouve o 'chamado'.",
      sintomas: ["Asma", "bronquite", "perda auditiva precoce", "zumbidos"],
      prevencao: ["Pratique natação ou canto para expandir os pulmões", "Aprenda a escutar o silêncio restaurador"]
    },
    relacionamentos: "Busca evolução conjunta. Evite cobrar do parceiro transformações que, no fundo, são responsabilidade apenas sua.",
    carreira: "Coaching de transformação, música, ativismo social e pesquisa de ponta."
  },
  {
    id: 21,
    nome: "O Mundo",
    arquetipo: "A Realização",
    elemento: "Terra",
    planeta: "Saturno",
    palavrasChave: ["Realização", "Plenitude", "Integração"],
    idade: 21,
    mantra: "Eu sou a plenitude em movimento; encerro ciclos com êxito e abro novos horizontes com gratidão.",
    conteudo: {
      essencia: "Aos 21 anos, você alcançou a integração total da sua jornada. Você é a coroa do trabalho bem-feito, o momento em que todas as peças se encaixam em uma dança perfeita. Sua presença exala plenitude e sucesso. Sua missão é celebrar a conclusão dos ciclos e desfrutar da harmonia entre o seu mundo interno e externo, agindo como um mestre da realização.",
      luz: ["Sucesso Absoluto: O que você inicia, você conclui com êxito e reconhecimento público por sua competência inabalável.", "Visão Sistêmica: Consegue entender a conexão entre todas as áreas da vida, mantendo um equilíbrio invejável entre mente e corpo.", "Abertura de Horizontes: O mundo é sua casa. Possui natureza cosmopolita e capacidade imensa de expandir seus limites.", "Gratidão e Plenitude: Vive em estado de reconhecimento pelo percurso, desfrutando das conquistas com humildade e sabedoria."],
      sombra: ["Acomodação Parasitária: Você chegou ao topo e agora se recusa a se mover. Sua satisfação virou preguiça e você está apodrecendo em conforto.", "Medo do Novo Ciclo: Você tem pavor de descer da montanha e começar do zero. Seu apego ao status impede novas e necessárias aventuras.", "Perfeccionismo da Imagem: Você gasta energia tentando parecer perfeito. Por trás da máscara do sucesso, existe alguém exausto e vazio.", "Arrogância da Chegada: Você olha com desdém para quem está no caminho. Esqueceu suas origens e se tornou um esnobe insuportável."],
      conselho: ["Celebre e Siga: Aproveite a vitória, mas lembre-se de que a vida é movimento constante. Não tente parar ou você enferrujará.", "Compartilhe o Sucesso: Ensine o que aprendeu. A plenitude só é real quando é multiplicada e serve de degrau para os outros.", "Mantenha a Vulnerabilidade: Pedir ajuda não diminui sua conquista. Aceite que você continua humano e precisa de conexões reais.", "Reinvente-se: Use seu sucesso como trampolim e não como colchão. Não tenha medo de encerrar o que já está completo para descobrir o novo.", "Viva o Agora: Pare de planejar o próximo triunfo e apenas desfrute o que já construiu. A felicidade mora no presente."]
    },
    saude: {
      vulnerabilidade: "A saúde é robusta, mas a acomodação gera sedentarismo, afetando as articulações (rigidez) e o sistema cardiovascular.",
      sintomas: ["Artrite", "cansaço nas pernas por má circulação", "colesterol alto", "pressão arterial ligada ao sedentarismo"],
      prevencao: ["Mantenha-se em movimento físico", "Dieta balanceada para que o sucesso não entupa suas artérias"]
    },
    relacionamentos: "Atrai interesseiros. Valorize quem estava lá antes do topo e aprenda a ser vulnerável mesmo sendo um 'exemplo de sucesso'.",
    carreira: "Mentorias, cargos de alta diretoria, gestão de legados e filosofia."
  },
  {
    id: 22,
    nome: "O Louco",
    arquetipo: "O Inocente",
    elemento: "Ar",
    planeta: "Urano",
    palavrasChave: ["Liberdade", "Desprendimento", "Potencial"],
    idade: 22,
    mantra: "Eu pulo com fé no desconhecido e danço com a vida em cada passo do meu caminho livre.",
    conteudo: {
      essencia: "Aos 22 anos, você compreendeu que a maior sabedoria reside em manter o coração de uma criança e a coragem de um peregrino. Você é a liberdade pura, o salto de fé no desconhecido. Sua jornada não tem destino fixo, pois você entende que o caminho é a própria meta. Vive com desprendimento, espontaneidade e uma confiança absoluta no fluxo da vida.",
      luz: ["Liberdade Inabalável: Nenhuma corrente material ou social te prende; você vive de acordo com sua verdade, sem medo do julgamento.", "Espontaneidade Criativa: Age a partir da intuição do momento, trazendo soluções originais que renovam qualquer ambiente estagnado.", "Coragem para Recomeçar: Não teme o fracasso porque não se apega a resultados. Você é o mestre eterno dos novos inícios.", "Fé no Fluxo: Confia plenamente que a vida proverá, permitindo que as sincronicidades guiem seus passos com leveza."],
      sombra: ["Irresponsabilidade Patológica: Você é um inconsequente que deixa rastro de destruição para os outros pagarem. Sua 'liberdade' é apenas egoísmo.", "Imprudência Suicida: Você pula no abismo sem paraquedas, confundindo fé com burrice. Suas escolhas colocam em risco você e quem te ama.", "Instabilidade Crônica: Você foge de tudo o que exige esforço. É um eterno adolescente que nunca cresce, nunca aprofunda e nunca constrói.", "Alienado Total: Vive em bolha de otimismo cego, negando problemas práticos até que eles te esmaguem por completo."],
      conselho: ["Olhe Antes de Pular: A confiança na vida não exclui o uso do cérebro. Use seu discernimento para não transformar sua jornada em tragédia.", "Honre sua Palavra: Liberdade exige integridade. Se prometeu, cumpra, ou sua liberdade será apenas mau-caratismo disfarçado.", "Crie uma Base Mínima: Até o Louco precisa de um cajado. Tenha uma estrutura básica que sustente suas aventuras no mundo físico.", "Assuma Consequências: Pare de culpar o destino pelas quedas. Cada passo foi uma escolha sua; aprenda com o impacto da realidade.", "Cultive Raízes Leves: É possível pertencer sem ser escravizado. Aprenda a criar vínculos que permitam o seu movimento e o do outro."]
    },
    saude: {
      vulnerabilidade: "Sua agitação afeta o sistema nervoso central (ansiedade). Os tornozelos são seu ponto de quebra física na caminhada impulsiva.",
      sintomas: ["Entorses de tornozelo constantes", "tiques nervosos", "insônia", "distração perigosa que leva a acidentes físicos"],
      prevencao: ["Exercícios de equilíbrio", "Práticas de aterramento (grounding) como andar descalço na terra"]
    },
    relacionamentos: "Ama a liberdade. Cuidado para não fugir de conexões profundas por puro medo infantil de ser 'preso'.",
    carreira: "Inovação radical, viagens, artes experimentais e trabalho autônomo."
  }
];

export const ARCANAS: Record<number, ArcanoAdvanced> = {};

DATASET.forEach(raw => {
  const englishName = ENGLISH_NAMES[raw.id] || raw.nome;
  const arcano: ArcanoAdvanced = {
    numero: raw.id,
    numeroRomano: ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII"][raw.id] || "0",
    nome: raw.nome,
    arquetipo: raw.arquetipo,
    elemento: raw.elemento,
    planeta: raw.planeta,
    imagem: `https://picsum.photos/seed/arcano_full_${raw.id}/400/600`, // Placeholder
    imagePrompt: `${englishName} ${IMAGE_PROMPT_SUFFIX}`,
    palavrasChave: raw.palavrasChave,
    idadeChave: raw.idade,
    mantra: raw.mantra,
    
    conteudo: raw.conteudo,

    // Legacy mapping compatibility (Ensure arrays are passed correctly)
    insights: {
      luz: raw.conteudo.luz,
      sombra: raw.conteudo.sombra,
      conselho: raw.conteudo.conselho,
      // Wrap the long text essence in array for legacy component compatibility, though new components should use .conteudo.essencia
      essencia: [raw.conteudo.essencia], 
    },

    saude: raw.saude,
    relacionamentos: raw.relacionamentos,
    carreira: raw.carreira,

    // Generated Dynamic Content
    ciclos: {
      faseJovem: `Na juventude, a energia de ${raw.nome} manifesta-se como busca por ${raw.conteudo.luz[0]?.split(':')[0] || 'expressão'}.`,
      faseAdulta: `O convite é integrar o arquétipo de ${raw.arquetipo} através de ${raw.conteudo.conselho[0]?.split(':')[0] || 'ação consciente'}.`,
      faseSabedoria: `A maestria virá quando ${raw.conteudo.luz[1]?.split(':')[0] || 'a virtude'} for sua resposta natural.`,
      desafioAtual: raw.conteudo.sombra[0]?.split(':')[0] || "Equilíbrio das polaridades."
    },

    alquimia: getMockAlquimia(raw.id, raw.nome, raw.mantra),
    ritual: getMockRitual(raw.id, raw.nome, raw.elemento),
    shadowWork: createShadowItems(raw.conteudo.sombra),
    
    personaAI: {
      tomDeVoz: "Sábio e Ancestral",
      fraseBoasVindas: `Eu sou ${raw.nome}, o ${raw.arquetipo}. Vejo sua alma através de ${raw.elemento}. O que deseja desvendar hoje?`
    }
  };

  ARCANAS[raw.id] = arcano;
});

// Handle 0 mapping to 22 (The Fool often 0 or 22)
ARCANAS[0] = ARCANAS[22];
