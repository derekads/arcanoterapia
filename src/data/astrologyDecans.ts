export interface DecanData {
    decan: string;
    ruler: string;
    title: string;
    differentiation: string;
    behavior: string[];
    contrast: string;
    career: string;
    relationship: string;
    growth: string;
}

export const decansDB: Record<string, DecanData> = {
    // ================= ÁRIES =================
    "aries_1": {
        "decan": "aries_1",
        "ruler": "Marte",
        "title": "O Guerreiro Puro",
        "differentiation": "O mais impulsivo e atlético dos Áries. Ação imediata, sem filtros.",
        "behavior": [
            "Ataca problemas de frente sem pensar nas consequências",
            "Corpo atlético ou magro musculoso, movimentos rápidos e secos",
            "Competitividade explícita - precisa ser o primeiro em tudo"
        ],
        "contrast": "Diferente do Áries 3° decanato que pensa antes de agir (filosófico)",
        "career": "Atleta, militar, cirurgião, bombeiro - ações imediatas e físicas",
        "relationship": "Conquista rápida e direta, sem joguinhos. Ciúme explosivo e imediato.",
        "growth": "Aprender a pausa entre estímulo e resposta. Nem tudo precisa de guerra."
    },
    "aries_2": {
        "decan": "aries_2",
        "ruler": "Sol",
        "title": "O Rei Guerreiro",
        "differentiation": "O mais orgulhoso e magnético dos Áries. Ação com necessidade de aplauso e reconhecimento.",
        "behavior": [
            "Lidera pelo exemplo físico, gesticulando e tomando o palco",
            "Não aceita ordens, especialmente se o líder não demonstrar competência",
            "Generoso com quem considera subordinado ou mais fraco"
        ],
        "contrast": "Mais teatral e preocupado com a imagem (Sol) que o Áries 1°.",
        "career": "Diretor, produtor executivo, capitão de time, treinador motivacional",
        "relationship": "Protege o parceiro como um troféu. Requer adoração constante e lealdade absoluta.",
        "growth": "Aprender que o valor pessoal não diminui quando o outro brilha. Delegação."
    },
    "aries_3": {
        "decan": "aries_3",
        "ruler": "Júpiter",
        "title": "O Filósofo Guerreiro",
        "differentiation": "O mais aventureiro e intelectualizado dos Áries. Luta por ideais e liberdade.",
        "behavior": [
            "Defende causas com agressividade verbal e paixão argumentativa",
            "Tem explosões repentinas de desejo de viajar ou mudar tudo de hora para outra",
            "Otimismo cego e exagerado que beira a irresponsabilidade"
        ],
        "contrast": "Mais teórico e focado no futuro (Sagitário/Júpiter) que a urgência bruta do 1° decanato.",
        "career": "Ativista político, advogado, guia de turismo de aventura, jornalista de campo",
        "relationship": "Detesta rotina. O parceiro precisa ser também um companheiro de viagens e debates.",
        "growth": "Cumprir as promessas que faz no calor do entusiasmo inicial."
    },

    // ================= TOURO =================
    "taurus_1": {
        "decan": "taurus_1",
        "ruler": "Vênus",
        "title": "O Artista Puro",
        "differentiation": "O Touro mais clássico e obstinado. Foco absoluto no prazer físico, estabilidade e beleza.",
        "behavior": [
            "Gasta dinheiro em texturas, perfumes e comida de altíssima qualidade",
            "Demora horas para tomar uma decisão, mas depois nunca mais volta atrás",
            "Manifesta amor através do toque físico, massagens e presentes luxuosos"
        ],
        "contrast": "Mais sensual e focado no conforto que Touro 2º e 3º. Ritmo natural e lento.",
        "career": "Chef de cozinha, massoterapeuta, mercado de luxo, jardinagem, perfumaria",
        "relationship": "Ciúme possessivo e territorial. Exige fidelidade como pré-requisito básico. Amor prático.",
        "growth": "Desapegar do materialismo excessivo. Entender que pessoas não são posses."
    },
    "taurus_2": {
        "decan": "taurus_2",
        "ruler": "Mercúrio",
        "title": "O Artista Analítico",
        "differentiation": "O Touro mais prático e perfeccionista. Combina o apreço pela beleza com um senso crítico afiado.",
        "behavior": [
            "Analisa o custo-benefício de cada investimento material em planilhas mentais",
            "Organiza o ambiente físico de forma estética mas extremamente limpa e funcional",
            "Tem talento manual para consertar, construir e lapidar objetos"
        ],
        "contrast": "Mais crítico, comunicativo e organizado que o Touro 1º.",
        "career": "Arquitetura, design de interiores, contabilidade, ourivesaria, marcenaria fina",
        "relationship": "Crítico com a rotina do casal. Expressa amor ajudando nas tarefas do dia a dia e com organização.",
        "growth": "Aprender a relaxar os próprios padrões de exigência na convivência com os outros."
    },
    "taurus_3": {
        "decan": "taurus_3",
        "ruler": "Saturno",
        "title": "O Artista Ambicioso",
        "differentiation": "O mais estruturado e focado no longo prazo. O luxo não é apenas prazer, é status e segurança blindada.",
        "behavior": [
            "Poupa para imprevistos e investe em bens de raiz imóveis desde cedo",
            "Possui uma persistência lendária, trabalhando anos a fio por uma meta",
            "Cria uma 'fortaleza' pessoal onde só entram pessoas extremamente selecionadas"
        ],
        "contrast": "Mais severo, conservador e carreirista que os outros Touros.",
        "career": "Gestor financeiro, corretor de imóveis de luxo, cargo público alto escalão, herança familiar",
        "relationship": "Relacionamentos são quase contratos de mútua assistência e construção de impérios conjugais.",
        "growth": "Sair do estado de rigidez emocional. O controle material não impede dores emocionais."
    },

    // ================= GÊMEOS =================
    "gemini_1": {
        "decan": "gemini_1",
        "ruler": "Mercúrio",
        "title": "O Mensageiro Puro",
        "differentiation": "O mais puro dos Gêmeos: agitado, curioso compulsivo, absorvendo informação em supervelocidade.",
        "behavior": [
            "Abre 40 abas no navegador, ouve podcast em 2x e não termina nem metade",
            "Muda de assunto 5 vezes na mesma frase e cruza ideias brilhantes sem querer",
            "Gesticula rapidamente com as mãos e nunca consegue ficar sentado parado"
        ],
        "contrast": "O mais intelectual da tríade, porém o mais superficial e disperso.",
        "career": "Jornalista, criador de conteúdo, comerciante, motorista de aplicativo (por amar não ter chefe e bater papo)",
        "relationship": "Sedução pelo intelecto. Precisa de conversas afiadas. Se a outra pessoa for entediante, some sem avisar.",
        "growth": "Terminar os livros que começa a ler. Focar a mente para não adoecer de ansiedade."
    },
    "gemini_2": {
        "decan": "gemini_2",
        "ruler": "Vênus",
        "title": "O Diplomata Comunicador",
        "differentiation": "O mais sociável e charmoso dos Gêmeos. Usa a palavra para agradar, seduzir e conectar pessoas.",
        "behavior": [
            "Adapta a sua personalidade e opinião para concordar com quem está conversando",
            "Conhece todo mundo numa festa e apresenta as pessoas de grupos diferentes",
            "Possui talento natural para estética, artes e uma fala mansa e persuasiva"
        ],
        "contrast": "Mais vaidoso e diplomático (Vênus) que Gêmeos 1°. Menos controverso.",
        "career": "Relações públicas, vendas de moda/beleza, diplomacia, mediador de conflitos",
        "relationship": "Flerta por esporte. Gosta da parte inicial da conquista. Casamento deve parecer uma eterna amizade charmosa.",
        "growth": "Assumir lados quando houver conflitos reais. Parar de agradar a todos em detrimento de si mesmo."
    },
    "gemini_3": {
        "decan": "gemini_3",
        "ruler": "Urano/Saturno",
        "title": "O Visionário Comunicador",
        "differentiation": "O mais revolucionário, impessoal e genial dos Gêmeos. Traz o futuro e quebra antigas mentalidades.",
        "behavior": [
            "Tem ideias muito à frente do seu tempo que todo mundo acha absurdas no começo",
            "Desaparece socialmente para focar num projeto bizarro e depois ressurge",
            "Aborda conceitos como IA, tecnologia, política de forma fria e lógica"
        ],
        "contrast": "Mais distante emocionalmente e inventivo que os outros. Tem o brilho frio de Urano.",
        "career": "Programador, engenheiro de sistemas, ativista de internet, cientista inventor",
        "relationship": "Exige espaço absurdo. Liberdade não se negocia. Romantismo o sufoca.",
        "growth": "Aprender que nem toda revolução mental justifica frieza emocional com as pessoas próximas."
    },

    // ================= CÂNCER =================
    "cancer_1": {
        "decan": "cancer_1",
        "ruler": "Lua",
        "title": "A Mãe Clássica",
        "differentiation": "O mais caseiro e protetor dos Câncer. Emoção pura, sem mistérios.",
        "behavior": [
            "Cozinha para acolher, não só para alimentar",
            "Tem fotos de família por toda casa, memórias físicas",
            "Mudanças de humor óbvias e cíclicas (lunar)"
        ],
        "contrast": "Diferente do Câncer 3° que é psíquico/místico, este é mais 'mãe de família tradicional'",
        "career": "Educador infantil, enfermagem, gastronomia caseira, gestão doméstica",
        "relationship": "Demonstra amor com cuidados práticos diários. Precisa de segurança familiar absoluta.",
        "growth": "Aprender que família não precisa ser sangue. Que cuidar demais sufoca."
    },
    "cancer_2": {
        "decan": "cancer_2",
        "ruler": "Plutão/Marte",
        "title": "A Mãe de Ferro",
        "differentiation": "O Câncer mais intenso e controlador. Proteção que vira possessão.",
        "behavior": [
            "Investiga a vida dos filhos/amigos secretamente 'para proteger'",
            "Guarda mágoa por décadas, não perdoa traições familiares",
            "Intuição afiada para perigos, quase paranóica"
        ],
        "contrast": "Mais sombrio e controlador que o Câncer 1°. Mistério emocional. Memória vingativa.",
        "career": "Psicologia profunda, detetive, segurança corporativa, tesoureiro",
        "relationship": "Ciumento obsessivo. Amor que vira cadeia emocional. Fusão total ou destruição fatal.",
        "growth": "Soltar o controle controlador. Perdoar para não envenenar-se profundamente."
    },
    "cancer_3": {
        "decan": "cancer_3",
        "ruler": "Netuno/Júpiter",
        "title": "A Mãe Mística",
        "differentiation": "O Câncer mais sonhador e compassivo. Confunde família com salvação universal.",
        "behavior": [
            "Adota animais, amigos, estranhos - 'todos são meus filhos'",
            "Confunde intuição com paranóia ou profecia infundada",
            "O lar é um refúgio espiritual recheado de cristais, incensos ou símbolos de fé"
        ],
        "contrast": "Mais confuso e desapegado que Câncer 1°, mas com muito mais compaixão. Tendência a se sacrificar.",
        "career": "Trabalho social ONG, arte terapia, cuidador de idosos/animais, terapias integrativas",
        "relationship": "Atrai 'filhos' problemáticos para salvar em seus parceiros românticos. Necessidade crônica de curar o outro.",
        "growth": "Discernimento claro entre compaixão genuína e codependência destrutiva."
    },

    // ================= LEÃO =================
    "leo_1": {
        "decan": "leo_1",
        "ruler": "Sol",
        "title": "O Soberano Absoluto",
        "differentiation": "O mais dramático e autoritário dos Leões. Brilho intenso, necessidade extrema de reconhecimento.",
        "behavior": [
            "Entra em ambientes esperando ser notado e cumprimentado primeiro",
            "Cria crises quando ignorado (doença, drama, conquistas forçadas)",
            "Generosidade magnânima mas que exige gratidão pública clara (elogios)"
        ],
        "contrast": "Mais egocêntrico e fixado na própria imagem que Leão 2° (filósofo) ou 3° (guerreiro)",
        "career": "Ator de palco, CEO que dá rosto à empresa, liderança de grandes eventos",
        "relationship": "Precisa ser centro absoluto do universo do parceiro. Exige ser exibido.",
        "growth": "Aprender que o valor interno não é anulado quando os aplausos silenciam."
    },
    "leo_2": {
        "decan": "leo_2",
        "ruler": "Júpiter",
        "title": "O Rei Filósofo",
        "differentiation": "O Leão mais expansivo e visionário. Liderança através de ideais justos, ética e sabedoria.",
        "behavior": [
            "Lidera inspirando os outros com grandes ideias e um otimismo que inflama",
            "Tem forte veia moral e defende o que é justo publicamente, protegendo a tribo",
            "Adora ensinar, dar conselhos não solicitados, posando de sábio real"
        ],
        "contrast": "Mais interessado em ideais magnânimos do que na vaidade estética (física) do 1º.",
        "career": "Reitor, mentor espiritual, magistrado, palestrante TED, diplomata de alta patente",
        "relationship": "O parceiro precisa não apenas adorá-lo, mas respeitar sua visão de ética e de vida.",
        "growth": "Focar nos deveres simples do dia a dia e descer do pedestal intelectual vez ou outra."
    },
    "leo_3": {
        "decan": "leo_3",
        "ruler": "Marte",
        "title": "O Soberano Guerreiro",
        "differentiation": "O Leão mais corajoso, intempestivo e competitivo. Liderança através da linha de frente.",
        "behavior": [
            "Defende seu território ferozmente, bate a mão na mesa quando se sente ameaçado",
            "Competitividade explícita e agressiva; a honra é seu bem mais precioso",
            "Ação imediata para proteger quem ama, arriscando seu pescoço sem pensar duas vezes"
        ],
        "contrast": "Ação física muito mais brutal e reativa que o Leão 1º ou 2º.",
        "career": "General, CEO de turnaround corporativo, esportista de combate, político combatente",
        "relationship": "Ameaça a concorrência diretamente. Paixão e atrito intenso. Tende a sufocar através de possessividade orgulhosa.",
        "growth": "Abaixar a guarda e aceitar vulnerabilidades. Nem toda oposição é uma ofensa à sua coroa."
    },

    // ================= VIRGEM =================
    "virgo_1": {
        "decan": "virgo_1",
        "ruler": "Mercúrio",
        "title": "O Analista Puro",
        "differentiation": "A essência do serviço, detalhe e crítica. A mente nunca desliga do que precisa ser consertado.",
        "behavior": [
            "Observa o defeito em 5 segundos numa sala que acabou de entrar, mas guarda em silêncio",
            "Limpa obsessivamente seu ambiente de trabalho (mesmo que físico ou digital/desktop)",
            "Faz manuais e rotinas infalíveis para tarefas cotidianas que outros ignoram"
        ],
        "contrast": "O mais focado na utilidade crua, técnica e nervos intelectuais que o 2º e 3º.",
        "career": "Auditor fiscal, revisor de texto, engenheiro de dados, auxiliar administrativo mestre",
        "relationship": "Sua forma de amar é pagar uma conta sua ou arrumar sua prateleira. Crítica excessiva minando o parceiro.",
        "growth": "Abraçar o caos inevitável da existência humana e entender que as pessoas falham."
    },
    "virgo_2": {
        "decan": "virgo_2",
        "ruler": "Saturno",
        "title": "O Analista Estruturado",
        "differentiation": "O Virgem focado em carreira e sistemas complexos em longa escala. Crítica orientada a lucros/metas.",
        "behavior": [
            "Calcula cronogramas de 5 anos de carreira e obedece fanaticamente às próprias planilhas",
            "É imune a charlatanismos e ilusões; testa a realidade três vezes antes de concordar",
            "Sensação interior de inadequação que ele supre trabalhando muito mais que os colegas"
        ],
        "contrast": "Muito mais inflexível, hierárquico e carrancudo (Saturno) do que Virgem 1º.",
        "career": "Planejamento corporativo, cientista administrador, engenheiro civil, controle de qualidade sênior",
        "relationship": "Procura segurança inabalável. Raramente se entrega ao acaso. O amor é um edifício sendo erguido com tijolos de responsabilidade.",
        "growth": "Lutar contra o pessimismo e a secura crônica. A vida precisa de ócio."
    },
    "virgo_3": {
        "decan": "virgo_3",
        "ruler": "Vênus",
        "title": "O Analista Sensual",
        "differentiation": "O mais charmoso, preocupado com estética e saúde naturais de Virgem. Funcionalidade alinhada a beleza.",
        "behavior": [
            "Gasta muito com produtos naturais absurdamente detalhados (yoga mats orgânicos, skincare limpo, nutracêuticos)",
            "Veste-se com uma elegância austera e atemporal. Tudo na medida certa, tons terrosos perfeitos",
            "Sutil na sedução intelectual mas com exigências físicas refinadas do parceiro"
        ],
        "contrast": "Muito menos robótico e tenso que os outros decanatos. Traz o deleite e a terra natural (Touro/Vênus).",
        "career": "Mestre em aromaterapia, nutricionista estético, perfumista, paisagista de precisão, modista",
        "relationship": "Detesta barraco e exige paz e rituais diários a dois (ex: café filtrado perfeito toda manhã em silêncio).",
        "growth": "A perfeição estética escraviza. Deixar as coisas envelhecerem e a rotina sair dos trilhos pacificamente."
    },

    // ================= LIBRA =================
    "libra_1": {
        "decan": "libra_1",
        "ruler": "Vênus",
        "title": "O Diplomata Puro",
        "differentiation": "O mais sociável, indeciso e desesperado por harmonia dos Libra. Adora parcerias, beleza e justíssima ética humana.",
        "behavior": [
            "Fica 3 horas tentando decidir onde jantar e no final diz 'onde você quiser, pra mim tá ótimo'",
            "Nunca altera o tom de voz no público; a imagem estética da paciência",
            "Odeia conflitos a ponto de mentir e engolir abusos para não ter que terminar a relação"
        ],
        "contrast": "O clássico perfil libriano; dependência forte de parcerias, ao contrário dos outros dois.",
        "career": "Mediador conjugal, promotor de eventos, juiz garantista, decorador conselheiro",
        "relationship": "A vida a sós beira a inexistência para eles. Ficam infelizes sem companhia. Projeção no parceiro.",
        "growth": "Aprender o dom de desagradar. Entender que o 'não' em certas decisões é, no mínimo, autoamor."
    },
    "libra_2": {
        "decan": "libra_2",
        "ruler": "Urano/Saturno",
        "title": "O Diplomata Visionário",
        "differentiation": "Um Libra intelectual, engajado em causas coletivas, mas estranhamente distanciado e impessoal no nível 1-a-1.",
        "behavior": [
            "Aborda relações amorosas quase como um acordo de convivência social e comunitária",
            "Luta por justiças sociais inovadoras mas é paradoxalmente teimoso e irredutível",
            "Se cansa rapidamente de excesso de grude e precisa da própria turma para arejar"
        ],
        "contrast": "Muito mais rebelde e coletivo (Aquário) que o 1º. Menos meloso emotivamente.",
        "career": "Ativista de direitos civis, corretor de inovação, relações públicas digitais, designer de UI/UX",
        "relationship": "Precisa que a parceria seja amiga e desapegada de controle romântico ciumento.",
        "growth": "Parar de intelectualizar demais e baixar os sistemas de defesa intelectuais que o isolam das feridas emotivas."
    },
    "libra_3": {
        "decan": "libra_3",
        "ruler": "Mercúrio",
        "title": "O Diplomata Comunicador",
        "differentiation": "Rápido, sagaz, extremamente charmoso verbalmente. Usa da retórica impecável para apaziguar (e manipular).",
        "behavior": [
            "Ganha 100% das discussões na elegância porque usa de ironia fina e persuasão imbatível",
            "Inquieto, vive circulando por vários nichos sociais num mesmo evento",
            "Pode fofocar disfarçadamente ao justificar 'eu precisava ver ambos os lados'"
        ],
        "contrast": "Muito mais cerebral, tagarela e ansioso mentalmente que os decanatos 1 e 2.",
        "career": "Apresentador de TV, correspondente internacional, mestre de cerimônias, mediador comercial rápido",
        "relationship": "Precisa de troca verbal incessante antes da física. Tem pavor do peso do drama pesado passional.",
        "growth": "Alinhar o charme à verdade dura. Escutar profundamente, e não apenas replicar o que escuta."
    },

    // ================= ESCORPIÃO =================
    "scorpio_1": {
        "decan": "scorpio_1",
        "ruler": "Plutão/Marte",
        "title": "O Alquimista Puro",
        "differentiation": "O mais obstinado, desconfiado e vingativo dos Escorpiões. Poder vulcânico que nunca apaga. Penetração magnética.",
        "behavior": [
            "Não compartilha segredos; ele te fita até você vomitar os seus verdades incontestáveis",
            "Capacidade de obsessão brutal num alvo (profissional ou pessoal), caçando de forma fria",
            "Queima as pontes que atravessa: uma vez o traído, o indivíduo morre energeticamente."
        ],
        "contrast": "O clássico 'assustador'. Controlador que o 2 e 3 não chegam a tal ápice absoluto.",
        "career": "Médico patologista, psiquiatra comportamental cirúrgica, investigador particular, estrategista financeiro obscuro",
        "relationship": "Tudo é extremo. Sexualidade avassaladora, controle possessivo gigantesco. Sem cinza: preto ou branco.",
        "growth": "Diferenciar cautela de paranoia perniciosa e curar na luz, não nas trevas perpétuas."
    },
    "scorpio_2": {
        "decan": "scorpio_2",
        "ruler": "Netuno/Júpiter",
        "title": "O Alquimista Místico",
        "differentiation": "O mais espiritual e curador. Combina os limites escuros com fé transcendental e mediunidade impressionante.",
        "behavior": [
            "É como uma esponja na energia alheia, capta traumas dos outros nas mínimas vibrações",
            "Atravessa crises monumentais na própria vida voltando na maré superior curando os outros num estilo de sacerdote",
            "Tende a escapismo sombrio: álcool ou isolamento ermitão, para lidar com as 'visões'"
        ],
        "contrast": "Menos rígido brutal, mais desordenado com sacrifícios pessoais em nome do amor universal ou da compaixão psíquica.",
        "career": "Medium espiritual profissional, terapeuta quântico de regressão, astrólogo hermético de pesquisa profunda",
        "relationship": "As uniões são místicas. Se devota na esperança de fundir as almas divinamente antes de dominar fisicamente.",
        "growth": "Fixar os próprios limites sem virar salvador obsessivo e criar casca firme emocional. Evitar ilusões."
    },
    "scorpio_3": {
        "decan": "scorpio_3",
        "ruler": "Lua",
        "title": "O Alquimista Nutridor",
        "differentiation": "Extremamente sensível, apegado e focado nas heranças de casa/família ou na formação do ninho indestrutível.",
        "behavior": [
            "Defende o clã com uma faca na boca: quem atinge alguém de sua família cria um império de vingança lenta nele",
            "Memoriza as dores sofridas ao longo de cada década e reconstrói o humor da juventude sempre que abalado",
            "A intuição protetora atinge o radar maternal, manipulando nas sombras para todos estarem seguros."
        ],
        "contrast": "Tem muito cuidado parental (Câncer) envolvido no poder de morte mental, mais que os outros Escorpianos.",
        "career": "Guardiões obstetras focados, detetives e segurança familiar familiar forte, serviços emergenciais profundos de defesa pública",
        "relationship": "Possessão via apego nutritivo ('eu sofro tanto contigo, mas sou sua sombra salvadora eternamente amada').",
        "growth": "Aprender perdoar o adoecido do adoecer passional antes de virar neurose. Renascer de forma mais leve em novos ninhos fluídos."
    },

    // ================= SAGITÁRIO =================
    "sagittarius_1": {
        "decan": "sagittarius_1",
        "ruler": "Júpiter",
        "title": "O Filósofo Puro",
        "differentiation": "O mais sincero compulsivo e aventureiro dos Sagitários. Busca de verdade indomável.",
        "behavior": [
            "Oferece conselhos excessivos aos outros mesmo sem eles pedirem",
            "Muda de paixões intelectuais a cada semestre como se tudo fizesse sentido na nova fé",
            "Pisa no calo alheio 'na melhor das intenções' com humor excessivo constrangedor e zero sutilezas."
        ],
        "contrast": "Extremamente teológico, com ideais abstratos grandiosos da liberdade de fé natural e desbravadora.",
        "career": "Professor universitário viajante, correspondente exterior, guia místico, criador de dogmas morais em ONG internacional",
        "relationship": "Parceiro tem que rir e correr. Espaço é ouro e qualquer amarra fará as malas desaparecerem de vez.",
        "growth": "Entender as sensações de quem escuta suas 'verdades plenas' para desenvolver um filtro decente de impacto nas alianças."
    },
    "sagittarius_2": {
        "decan": "sagittarius_2",
        "ruler": "Marte",
        "title": "O Filósofo Guerreiro",
        "differentiation": "Um trator intelectual dinâmico que atropela através do pioneirismo apaixonado. Menos sábio sereno.",
        "behavior": [
            "Acumula competições por qualquer aventura e adora o atrito imediato das visões distintas",
            "Fisica espetacular como um velocista indomável com os impulsos do dia, com energia febril exaustiva.",
            "Luta pelo lado oprimido com socos no peito usando agressividade nobre dos combates físicos em embates."
        ],
        "contrast": "Um caçador frenético misto na caça, impaciente (Áries) sob o faro global (Júpiter), a explosividade imutável rápida.",
        "career": "Explorador atleta global aventureiro veloz, ativista na ponta de embates armados urgentes ou empresário esportivo fustigante veloz",
        "relationship": "Intensos fogos na relação, caçadas diretos explícitos sem pudor algum moral ou receio cínico para fisgar alvos intensamente velozmente.",
        "growth": "Estudar prudência temporal e gerir estamina ao se colocar diante das lutas precipitadas excessivamente sem análise afortunadas plenas."
    },
    "sagittarius_3": {
        "decan": "sagittarius_3",
        "ruler": "Sol",
        "title": "O Filósofo Dramático",
        "differentiation": "Orgulho radiante, líder do show exótico, mais confiante criador e exuberantemente magnético visionário performista.",
        "behavior": [
            "Dramatiza narrativas grandiloquentes das viagens nas rodas de festas de bar noturno exótico luxuoso com excentricidade magnética extravagante superior",
            "Quer ditar aos pares, o modo real do ideal de verdade, exercendo o pedestal generoso de 'rei messias' dos seus.",
            "Cria e protege comunidades utópicas fiéis com imenso esplendor festivo majestoso nos horizontes largos em viagens criativas amplas esplendorosas."
        ],
        "contrast": "Extremamente vaidoso de lealdade, performático, líder soberano do show de verdades plenas esplendorosamente (Leão).",
        "career": "Teólogo dos grandes palcos motivacionais, empresários internacionais da alta estampa diplomática de representação executiva de grife.",
        "relationship": "Precisa da reverência plena ideal romântica nos horizontes e das lealdades heroicas amorosas grandiosas sublimes exóticas nas alianças longícuas intensas dramáticas plenas",
        "growth": "Aprender a aplaudir verdades simples da modéstia na parceria inferior deslumbrada, desconstruindo a coroa de verdades soberanas de sabedoria excessiva."
    },

    // ================= CAPRICÓRNIO =================
    "capricorn_1": {
        "decan": "capricorn_1",
        "ruler": "Saturno",
        "title": "O Construtor Puro",
        "differentiation": "Ambição, gelo seco nas veias nas adversidades práticas plenas de poder duro material indestrutível severo persistentemente forte incansável.",
        "behavior": [
            "Rancor persistente focado em metas plenas de escalada social vertical de império lento em silêncios severos duradouros.",
            "Sofre de síndrome de cansaço extremo e frieza no coração com pesos absurdos solitários em liderança silenciosa incansável na carreira absoluta eterna pura severa",
            "Responde a dores emocionais do parceiro com cheques ou resoluções logísticas sólidas como soluções amorosas práticas fortes."
        ],
        "contrast": "O arquétipo severo puro persistente absoluto geladíssimo inflexível no seu comando da rocha inamovível pesadíssima temporal no tempo crônico implacável severo.",
        "career": "Empresário tradicional hierárquico, magistrado superior, arquiteto governamental focado e CEOs severos puros implacáveis da ascensão corporativa dura absoluta das gestões crônicas",
        "relationship": "Transação fidedigna eterna; controle conservador de deveres mútuos e tradição conjugal pesada, segura, rigorosa e imutável nas bases garantidas materiais de sucessões.",
        "growth": "Suavizar amarrações implacáveis ao relógio rigoroso focado da frieza temporal com a vida natural frágil desestruturada amorosa imperfeita livre pura na vida humana breve vulnerável pura."
    },
    "capricorn_2": {
        "decan": "capricorn_2",
        "ruler": "Vênus",
        "title": "O Construtor Artístico",
        "differentiation": "Luxo duradouro forte, estética de poder sensível próspero plácido durável nos ganhos de conforto imenso imutável suntuoso paciente persistente no capital elegante material e financeiro rico prático eterno belo das coisas.",
        "behavior": [
            "Persiste em posses belas tangíveis grandiosamente estruturáveis: terras ou ouros acumuláveis ao longo dos anos esteticamente perfeitos em silêncio lento plácido pragmático absoluto seguro rico pacífico imutável luxoso fixo.",
            "Preza pela beleza hierárquica pacificada paciente calma conservadora plácida dos métodos construtivos de grife nas estabilizações roncadas confortáveis pragmáticas lentas",
            "Mistura rigor com sedução de poder plácida e lenta material tangível calma forte fixa de poder suntuosa pragmática"
        ],
        "contrast": "Mais sensual, focado na segurança de conforto farto pragmático material e beleza temporal pacífica fixa e plácida do possuir a terra de recursos tangentes.",
        "career": "Gestão e investimentos da arte, banqueiros esteticistas, empreiteiros e investidores financeiros de luxos corporativos e consultores plácidos sólidos em bens de grife suntuosos clássicos",
        "relationship": "Construções pacíficas confortáveis fortes de segurança imensa com fidelidades rigorosas mas carnais em longos anos constantes serenos calmos garantidos fiéis conservadores lentos leais e táteis sensoriais fixos fortes leais imutáveis.",
        "growth": "Desapego dos muros castelados seguros inquebrantáveis lentos fixos luxuosos. Vida leve e mudança contínua orgânica veloz mutável inesperada espiritual livre da fixidez luxuosa possessiva lenta pacata cimentada fixa rigorosa rica suntuosa pacata"
    },
    "capricorn_3": {
        "decan": "capricorn_3",
        "ruler": "Mercúrio",
        "title": "O Construtor Analítico",
        "differentiation": "Sistematizador supremo, mente impecavelmente estruturada para a perfeição organizacional exata crônica meticulosa absoluta do controle analítico mental metódico absoluto perfeccionista frio implacavelmente minucioso e analógico temporal exaustivo crítico forte lógico rigoroso racional metódico detalhista purista rigor.",
        "behavior": [
            "Critica estruturas ineficientes e desenha manuais infalíveis crônicos nas organizações metódicas para ascensão corporativa funcional impecável implacavelmente organizadora nos detalhamentos técnicos puristas organizacionais metódicos lógicos funcionais de extrema funcionalidade rígida fria sistêmica pura metódica fria",
            "Aborda as carreiras por blocos mentais analíticos frios céticos metódicos de cronogramas perfeccionistas inquebrantáveis de lógicas rígidas puristas hierárquicas crônicas inquestionáveis lógicas analíticas irredutíveis implacavelmente críticas nas planilhas sistêmicas racionais exatas nas precisas cronometrias temporais puristas detalhadas eficientes secas.",
            "Tem o medo de inutildades e de atrasos das cronometrias mentais perfeitas organizacionais sistêmicas rigorosas exatas lógicas racionais detalhistas perfeitas imbatíveis rigorosíssimas hierárquicas críticas e metodológicas irredutíveis exatas temporais pragmáticas e eficientíssimas organizadas racionais metódicas céticas"
        ],
        "contrast": "Frio extremo detalhista da minúcia técnica exaustiva purista impecavelmente racional metódica de processos, menos macro e muito micro controlador hierarquizado crônico exato do perfeccionar metodicamente a rigidez estruturada detalhista de processos exaustivos metódicos lógicos minuciosamente frios sistemicamente organizacionais.",
        "career": "Analista superior rigoroso purista, administrador meticuloso governamental perfeccionista das corporações eficientíssimas e lógicas de sistematizações rigorosíssimas em cronometrias e logísticas técnicas perfeitas de exatidão metodológica irredutível organizacional das estruturas processuais analíticas exatíssimas cronológicas lógicas e burocratas de gestão estrita temporal",
        "relationship": "Amor é dever burocrático de precisões mentais nas tarefas rigorosamente perfeitas dos relacionamentos ordenados meticulosamente nas planilhas e agendas em casas higienizadas metodicamente nas cronometrias puras inquestionáveis fixas com críticas exigentes nas minúcias temporais conjuntas crônicas. Falta entrega lívida do calor",
        "growth": "Cessar os controles técnicos das lógicas puristas mentais de exatidões sistêmicas metodológicas burocratas do parceiro aceitando os atrasos ineficientes irracionais emocionais vivos mutantes desordenados ilógicos puros sentimentais espontâneos não lineares nas humanidades e imperfeições afetivas livres irredutíveis flexíveis irracionais imperfeitíssimas perfeitamente e caóticas da vulnerabilidade."
    },

    // ================= AQUÁRIO =================
    "aquarius_1": {
        "decan": "aquarius_1",
        "ruler": "Urano/Saturno",
        "title": "O Visionário Puro",
        "differentiation": "Original, impessoalidade revolucionária pura e ruptura crônica em conceitos estáticos tradicionais independentemente teimoso, frio nos ideais livres inegociáveis inconvencionais e rebelde excêntrico livre utópico de convicções teimosas de gênio.",
        "behavior": [
            "Altera convicções de maneira radical chocando estruturas normativas familiares rebelando da normalidade padronizada coletiva livre",
            "É um filantropo impessoal distante emocional com multidões revolucionárias de grupos mas ausente gelado no contato íntimo um a um dos amigos sentimentais e isolado nas utopias geniais do individualismo coletivo exótico independente",
            "Luta obstinado dogmático nas visões de ideias inquebrantáveis da frente de seu tempo inovando o impossível e reestruturando as regras excêntricas de liberdade revolucionária genial original inovadora do futurismo puro rebelde frio independente visionário excêntrico intelectualmente brilhante."
        ],
        "contrast": "O Aquário mais resistente, gelado puro dogmático nos progressismos de libertação estrutural teimosa. Imuta as inovações utópicas revolucionárias nos radicalismos crônicos puristas excêntricos fixos distanciados originais rebeldes brilhantes",
        "career": "Cientista independente isolado inovando e inventor tecnológico subversivo sociológico criador, hacker da humanidade disruptiva genial de inovações estruturais em rebeliões humanistas visionárias abstratas originais.",
        "relationship": "A atração exige excêntricidades geniais exóticas no indivíduo amado. Frieza e distância afetivas inseparáveis de independências isoladas e impessoais inconvencionais sem draminhas conjugais emocionais exigindo extremas liberdades no amor fraterno livre desapegado",
        "growth": "Permitir o fluxo emocional do um-a-um humano vulnerável em que a carne, o medo os apegos imperfeitos dramático limitados do ser não sãos doenças e permições nas correntes das ideias intocáveis mentais livres em sentimentos. Caldo psíquico afeto íntimo vulneráveil apaixonado e não distantes lógicos gelados inalcançáveis da convivência quente humana e normal sensível amável quente próxima."
    },
    "aquarius_2": {
        "decan": "aquarius_2",
        "ruler": "Mercúrio",
        "title": "O Visionário Comunicador",
        "differentiation": "Rápido nas teias de inteligência, conector de inovação articulável nas palavras ágeis intelecto nervoso inquieto brilhante persuasivo com ideias progressistas fluídas ágeis difusoras de vanguardismos revolucionários de intercâmbios futuristas dialéticos rápidos",
        "behavior": [
            "Circula e divulga teorias inconvencionais excêntricas geniais no nervosismo tagarela e inquietude nervosa curiosamente difusa nos nichos vanguardistas exóticos.",
            "Troca informações abstratas em multidões nas retóricas revolucionárias de conversas brilhantes cruzando lógicas futuristas tecnológicas aceleradas inovadoras dos diálogos originais geniais velozes impessoais lógicos velozes inconvencionais dinâmicos versáteis intelectuais ininterruptos curiosos múltiplos e aceleradíssimos mentais e geniais lógicos",
            "Transita fluidamente na diversidade dos grupos estranhos difíceis, discursando debates astutos livres imparciais curiosos inovadores dialéticos em comunidades difusas geniais exóticas independentes inconvencionais lógicas sem preconceitos curiosíssimos"
        ],
        "contrast": "Vanguardismo conversador (Gêmeos) dinâmico ágil socializante das lógicas e inquieto difusor dispersos ao contrário dogmático rebelde teimoso original isolacionista intransigente inovador dogmático exótico fixo radical revolucionário puro gelado.",
        "career": "Criador de comunicações tecnológicas inovadoras digitais, programadores de dados da IA em redes sociais subversivas geniais vanguardistas autônomos e disseminadores sociólogos ágeis inconvencionais das coletividades intelectuais visionárias futurísticas virtuais",
        "relationship": "Debates ágeis fascinantes intelectuais independentes sem sufocos em namoros mentais onde seduz nas novidades excêntricas inconvencionais velozmente desapegadas inibindo os romancistas com frivolidades conversadoras amizades e companheirismos em estímulo mental intelectual veloz livre versátil sem laços limitantes e possessividade pegajosa entediante. Exige papos cabeças geniais espertos livres independentes.",
        "growth": "Fixar propósitos na multiplicidade caótica desordenada da agitação genial retórica das teorias infinitas e escutar profundamente os outros. E enraizar sentimentos ao invés só tagarelar as elucidação lógicas inconvencionais futuristas mentais."
    },
    "aquarius_3": {
        "decan": "aquarius_3",
        "ruler": "Vênus",
        "title": "O Visionário Diplomata",
        "differentiation": "O revolucionário dos amores coletivos livres compassivos sedutores, com harmonias em grupos grandes, humanita nas aparências tolerantes com gostos sofisticados da genialidade estética revolucionária original exótica graciosa bela inconvencional coletiva igualitária e agradável amigavelmente.",
        "behavior": [
            "Sociabilidades graciosas belas nas amizades grupais humanitárias idealizadas em harmonias e justiças revolucionárias sociais de igualdade livre excêntrica pacifista utópica",
            "Gostos vanguardistas refinados atraindo coletividades de artes inconvencionais em simpatias impessoais igualitárias encantadoras e charmes rebeldes utópicos e pacificidades tolerantes fraternas igualitárias magnéticas amigáveis encantadoras exóticas livres belas.",
            "Media nas multidões com diplomacia rebelde compassiva utópica livre, buscando o igualitarismo sem brados explosivos mas pelo charme das convivências fraternais incondicionais justas elegantes amáveis inovadoras com artes coletivistas originais visionárias humanas."
        ],
        "contrast": "Possui uma veia sedutora sociável equilibrada mediadora charmosa pacífica (Libra) humanitária elegante de artes livres sem agressividade da independência dogmática teimosa isolada e gélida da primeira fase alienada genial abstrata fixa.",
        "career": "Mediador sociólogo em uniões de minorias progressivas utópicas diplomáticas, curador das feiras vanguardistas igualitárias modernas geniais e coordenador esteta de comunidades revolucionárias utópicas belas fraternais pacifistas inconvencionais criativas solidárias e diplomáticas de direitos universais coletivistas livres de artes humanistas igualitárias pacificas originais sociais belas justas pacíficas.",
        "relationship": "O relacionamento exótico belo e fraternal utópico de refinamento e igualdade diplomática inconvencional. Sedução com companheiros independentes elegantes e progressistas livres em poliamorismos intelectuais charmosos utópicos refinados independentes tolerantes. Evita feiuras dramáticas exigindo as liberdades pacíficas igualitárias amáveis graciosas livres justas",
        "growth": "Aprender as feiuras densas passionais viscerais não polidas do contato imperfeito irracional dolorido em pares. Sair na anestesia impessoal utópica diplomática bela aceitando o conflito feio emocional íntimo que as revoluções e as parcerias reais enfrentam nas entranhas imperfeitas apaixonadas sofridas feias cruas intensas inestéticas pesadas fundas desarmoniosas imperfeitíssimas."
    },

    // ================= PEIXES =================
    "pisces_1": {
        "decan": "pisces_1",
        "ruler": "Netuno/Júpiter",
        "title": "O Místico Puro",
        "differentiation": "O mais etéreo, imaterial sonhador, confuso espiritualizado sofredor salvador absorvente passivo com as hipersensitividades psíquicas caóticas visionário puríssima empatia da dissolução cósmica do escape profundo e imaterial na alma universal sonhadora passiva vulnerável profunda ilusória de fusão sensível mágica do caos ilimitado desapegado.",
        "behavior": [
            "Vive distraído nas fantasias compassivas sofrendo ilusões das vitimizações empáticas de sacrificar infinitamente nas marés cósmicas sensíveis profundas dores não-físicas universais.",
            "Foge escapa de durezas nas espiritualidades imensas compaixões profundas artes sublimes químicas drogas nas curas transcendentais psíquicas infinitas da absorção total da mediunidade cósmica não verbal confusa submissa da esponja universal vulnerável compassiva",
            "Perdoa irracionalidades cruéis do meio pois acredita milagrosamente nas infinitas bondades místicas transcendências cósmicas e salvamentos passivos utópicos místicos compassivos ilusórios em compaixões psíquicas das dissoluções totais místicas vulneráveis empáticas divinas imateriais sonhadoras inesgotáveis confusas sofredoras e intuitivas mágicas infinitas"
        ],
        "contrast": "Extratos piscoides etéreos confusos de absorção completa e fugas escapistas totais com as psiques de vitimizações mártires divinas inesgotáveis psíquicas sonhadoras infinitas profundas",
        "career": "Artistas das artes não palpáveis sonhos, médiuns sofredores compassivos sacerdotes de asilos da almas isolados poetas do caos espiritual das curas esotéricas profundas psíquicas, místicos devocionais e músicos transcendentais de marés terapêuticas de sacrifício inestimável passivo mágico.",
        "relationship": "A atração do doente da vitima o necessitado ao Salvador eterno sofredor que fundem a alma de si nas dores universais dos parceiros até anular o físico no sacrifício cósmico ilimitado utópico de simbioses desmedidas ilusórias decepcionantes de compaixão irracionais em amores imateriais espirituais simbióticos codependentes trágicos ilimitados compassivos não-egoicos passivos mágicos sofredores absolutos.",
        "growth": "Fixar ego os limites de sobrevivência física real e as racionalizações diárias da maldade limitadora da vida física contra a desordem do sacrifício infinito das compaixões das fugas das ilusões irracionais empáticas do salvacionismo doente mártir codependente da distração não material da irrealidade escapista absoluta etérea passiva suicida caótica das emoções infinitas desestruturadas."
    },
    "pisces_2": {
        "decan": "pisces_2",
        "ruler": "Lua",
        "title": "O Místico Nutridor",
        "differentiation": "O sofredor protetor compassivo visceral familiar focado emocional romântico acolhedor melancólico nas sensibilidades do clã místico empático sensível da matriz materna das vulnerabilidades emocionais sentimentais psíquicas passivas curadoras domésticas imaginativas caseiras apegadas afetuosas sentimentais dependentes sensíveis e protetoras lunares do acolhimento sofredor sensível de fusão e carinho psíquico",
        "behavior": [
            "Abriga carentes adoecidos sensíveis em seu acolhimento sofredor em um lar seguro em compaixão imaginativas caseiras melancólicas e maternais da simbiose profunda compassiva emotiva dependente afetuosa passiva e sensível sonhadora acolhedora protetora curadora vulnerável frágil",
            "Nutre as tristezas através dos aconchegos românticos de devoção sensível na intuição familiar materna com profundas variações das lunas emocionais instáveis sentimentais apegadas sofrendo emoções profundas oscilantes imaginativas e dependentes afetuosas no carinho sensível",
            "Mistura proteção emotiva caseira materna familiar (Canceriano) em um sentimentalismo incondicional psíquico compassivo no sacrifício da doação amorosa devocional vulnerável carente apegada de intuição afetiva e romântica compassiva de empatia materna sentimental"
        ],
        "contrast": "Extremamente sentimental as tristezas místicas no ninho afetivo romântico materno de proteção clânica apegada carente frágil dependente sensível sofredora de vulnerabilidade aconchegante familiar no cuidado protetor (Lua)",
        "career": "Terapeuta infantil compassivo de dores afetivas de intuições familiares assistenciais na saúde protetora das gestações caseiras imaginativas de culinária e de acolhimentos em creches maternas de curas sensoriais passivas devocionais asilares e orfanatos psíquicos afetuosos apegados românticos e empáticos maternos sofredores.",
        "relationship": "O relacionamento simbiótico maternal de aconchego curador de parceiros infantis dependentes vitimistas afetuosos no romance possessivo sofredor empático carinhoso profundo com devoções passivas de ciúmes sofredores melancólicos maternos apegados afetuosos no cuidado constante místico de sensibilidade protetora romântica sensível vulnerável compassiva",
        "growth": "Curar doentias chantagens emotivas melancólicas e os maternalismos simbióticos afetuosos de salvamentos devocionais e separar caridade protetiva maternal afetuosa e possessividade ciumenta sofredora. Estudar libertação orgânica adulta da nutrição das fraturas afetivas e das vulnerabilidades românticas oscilantes infantis dependentes vitimistas apegadas sofredoras de medos no lar e nas sensibilidades psíquicas caseiras de intuição lunar simbiótica descontrolada em mágoas"
    },
    "pisces_3": {
        "decan": "pisces_3",
        "ruler": "Plutão/Marte",
        "title": "O Místico Intenso",
        "differentiation": "O mais denso, misterioso passional obsessivo profundo, extremista compassivo psíquico dominador nas transmutações doloridas emocionais magnéticas sofredoras das escuridões cósmicas sensíveis nos sacrifícios compulsivos espirituais ocultos de vinganças veladas doloridas destrutivas místicas do submundo sensível das paixões irracionais extremistas intuitivas sofredoras psíquicas empáticas densas caóticas vingativas da dissolução profunda sombria e mágica.",
        "behavior": [
            "Mergulha psiquicamente sofredor investigativo nas paixões secretas obsessivas nas escuridões curativas da empatia sombria nas almas com intuições cruas violentas sofredoras mágicas densas manipulativas vingativas esotéricas de dores profundas cósmicas trágicas extremas absolutas apaixonadas e possessivas profundíssimas nas emoções insanas.",
            "Renascer dolorido curador nas transformações sofridas nas cinzas emocionais empáticas trágicas densamente sofredoras místicas de psiquismo ocultistas em medos aterrorizantes magnéticos viscerais possessivo e intuitiva paixão das transmutações absolutas kármicas vingativas passionais simbióticas caóticas dolorosas em sensibilidades aterrorizantes profundas destrutivas e purificadoras curadoras.",
            "Sacrifício das intensidades nas magias empáticas e nas dores mortais absolutas sensíveis das sombras apaixonadas passivas vulcânicas escuras da água pesada passional intuitiva mística compassiva transmutadora obsessiva das tragédias irracionais da espiritualidade sombria curadora secreta magnética inescrutável dolorosa"
        ],
        "contrast": "Pesos dominantes (Escorpiões) na apatia mística confusa compassiva sofredora (Peixes), formando o oceano profundo denso assassino sombrio passional intuitivo transmutador controlador velado místico de magnetismos obsessivos curadores profundos nas mortes apaixonadas místicas emocionais viscerais do caos passional mágico esotérico violento curador trágico mortal sombrio dolorido obsessivo manipulativo",
        "career": "Psiquiatras do inferno da alma, salvadores de criminosos nas cadeias ocultas compassivos investigadores nas drogas extremistas das curas mágicas exoterismos sombrios passivos sofredores terapeutas dos submundos pesados sexuais passionais magnéticos profundos cirurgiões das intuições passivas e bruxaria compassiva e das transmutações dolorosas fúnebres destrutivas kármicas curadoras da sociedade psíquica nas funduras infinitas da desilusão mártir destrutiva trágica intensa profunda escura sombria mística visceral.",
        "relationship": "Codependências obsessivas trágicas escuras extremas possessivas viscerais amorosas de simbioses destrutivas místicas passionais salvadoras fatais onde as dores profundas doloridas curadoras ciumentas intuitivas sádicas e vingativas mortais secretas violentas extremas absolutas nas alianças kármicas de redenções trágicas intensas das ilusões mágicas de mortes e nascimentos afetivos e paixões possessivas kármicas sofredoras mágicas magnéticas cruéis.",
        "growth": "Curar possessão do submundo na passividade mágica mística dos horrores das dozeiras psíquicas trágicas profundas e as transmutações passionais controladoras na escuridões dolorosas kármicas para viver luz espiritual limpa sem vitimização carnal obsessiva ciumenta pesada e dos pânicos possessivos das simbioses do sofredor extremista empático visceral sombrio cruel obsessivo mágico sensível destrutivo violento sofredor das mortais empatias fúnebres."
    }
};
