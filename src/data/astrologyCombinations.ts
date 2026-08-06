export interface CombinationData {
    combination: string; // e.g., "sun_cancer_house10"
    manifestation: string;
    dailyBehavior: string[];
    lifeStructure: string;
    typicalConflict: string;
    uniqueGift: string;
    specificAdvice: string;
}

export const combinationsDB: Record<string, CombinationData> = {
    // ================= EXEMPLOS BASE =================
    "sun_cancer_house10": {
        "combination": "sun_cancer_house10",
        "manifestation": "Você constrói carreira através de cuidado e proteção. Não é o executivo frio, é o gestor que sabe o nome dos filhos dos funcionários. Sua autoridade pública vem da empatia, não do medo.",
        "dailyBehavior": [
            "Reúne equipe para almoço em família, não só reunião de negócios",
            "Lembra de aniversários de clientes e manda mensagem pessoal",
            "Cria políticas empresariais focadas em bem-estar emocional dos funcionários"
        ],
        "lifeStructure": "Sua carreira é sua família estendida. Você prospera em ambientes onde pode 'cuidar' do negócio e das pessoas. Liderança maternal/paternal. Possivelmente trabalha com alimentação, imóveis, educação infantil ou gestão emocional.",
        "typicalConflict": "Confunde chefe com pai/mãe. Funcionários se apegam demais ou você se apega a funcionários problemáticos. Dificuldade em demitir por pena. Carrinho emocional no trabalho.",
        "uniqueGift": "Capacidade de criar empresas-família onde funcionários ficam 20 anos. Liderança que retém talentos pela lealdade emocional, não só salário.",
        "specificAdvice": "Estabeleça limites claros entre 'sou seu amigo' e 'sou seu chefe'. Pratique a demissão compassiva quando necessário."
    },
    "mars_gemini_house10": {
        "combination": "mars_gemini_house10",
        "manifestation": "Você é o executivo que resolve crises falando. Sua carreira é construída na velocidade mental, multitarefa e networking. Não é o especialista profundo, é o conector estratégico.",
        "dailyBehavior": [
            "Faz 5 reuniões simultâneas, respondendo e-mail e mandando áudio",
            "Resolve crises de comunicação da empresa com ligações estratégicas",
            "Muda de cargo/área rapidamente dentro da mesma empresa"
        ],
        "lifeStructure": "Carreira multipista. Você tem várias funções simultâneas ou muda de área constantemente. Brilha em cargos de comunicação, marketing, vendas, ou gestão de crises. Impossível ficar numa função monótona.",
        "typicalConflict": "Espalha-se demais. Promete para muitos setores e não entrega profundidade. Conflitos por falar demais em reuniões ou mandar e-mail impulsivo para chefe.",
        "uniqueGift": "Capacidade de mediar conflitos entre departamentos e traduzir 'línguas' diferentes (técnico x comercial, velho x novo).",
        "specificAdvice": "Antes de enviar aquele e-mail furioso para o board, espere 10 minutos. Profundidade antes de velocidade nas decisões de carreira."
    },
    "venus_scorpio_house7": {
        "combination": "venus_scorpio_house7",
        "manifestation": "Seu casamento é intenso, transformador e possessivo. Não existe 'casamento de conveniência' para você - é fusão total ou nada. Atração por parceiros misteriosos ou com poder.",
        "dailyBehavior": [
            "Investiga o parceiro secretamente (checa histórico, conversas, celular)",
            "Cria crises de ciúme para testar a relação",
            "Sexo é negociação de poder no relacionamento"
        ],
        "lifeStructure": "Relacionamentos são campo de transformação. Você atrai parcerias kármicas intensas. Casamento passa por crises de morte e renascimento. Possivelmente heranças ou dívidas do cônjuge afetam a união profundamente.",
        "typicalConflict": "Ciúme obsessivo. Relacionamentos tóxicos que você confunde com 'paixão'. Dificuldade em confiar mesmo quando não há razão.",
        "uniqueGift": "Capacidade de cura profunda através do amor. Relacionamentos que transformam ambos fundamentalmente. Fidelidade inquestionável quando confia.",
        "specificAdvice": "Não confunda intensidade emocional com amor verdadeiro. Aprenda a amar sem possuir."
    },
    "moon_capricorn_house4": {
        "combination": "moon_capricorn_house4",
        "manifestation": "Seu lar é estruturado, sério, com regras claras. Criou-se em ambiente com responsabilidades precoces ou figura materna distante/trabalhadora. Sua família é sua empresa.",
        "dailyBehavior": [
            "Organiza a casa como escritório (listas, horários, metas familiares)",
            "É o 'adulto' da família desde cedo, cuidando de pais ou irmãos",
            "Demonstra amor familiar através de provisão material, não afeto físico"
        ],
        "lifeStructure": "Lar é base sólida, não necessariamente acolhedora emocionalmente. Família pode ser conservadora ou ter valores tradicionais rígidos. Herança de responsabilidades ou estruturas antigas.",
        "typicalConflict": "Frieza emocional em casa. Dificuldade em demonstrar carinho para familiares. Trabalha demais e não cria memórias afetivas.",
        "uniqueGift": "Capacidade de criar estrutura familiar duradoura. Gestão doméstica impecável. Segurança material para família.",
        "specificAdvice": "Permita-se ser vulnerável em casa. Chore na frente da família. A estrutura precisa de calor humano para ser lar."
    },

    // ================= GRUPO A: SOL NAS CASAS (NÚCLEO) =================
    "sun_aries_house1": {
        "combination": "sun_aries_house1",
        "manifestation": "Sua identidade é um grito de guerra. Você não pede licença para existir, você arromba a porta da frente. A vida é sobre provar sua força física e independência implacável.",
        "dailyBehavior": [
            "Corta a fala dos outros para impor sua decisão imediatamente",
            "Inicia projetos sozinho só para não ter que depender do ritmo alheio",
            "Usa roupas vermelhas ou marcantes para ser fisicamente notado na multidão"
        ],
        "lifeStructure": "A vida gira em torno da autonomia absoluta. Você não sabe trabalhar de subordinado; você precisa liderar ou empreender. Foco maciço no próprio corpo físico e na autoimagem.",
        "typicalConflict": "Bate de frente com autoridades por puro esporte. Afasta as pessoas por brutalidade na sinceridade. Egoísmo que cega para as necessidades da equipe ou parceiro.",
        "uniqueGift": "A coragem inabalável de recomeçar do zero 50 vezes se for preciso. Ignição vital que arrasta multidões atrás do seu pioneirismo.",
        "specificAdvice": "Uma vez por dia, experimente perguntar a opinião de alguém antes de tomar a decisão final. Liderar não é necessariamente esmagar."
    },
    "sun_taurus_house4": {
        "combination": "sun_taurus_house4",
        "manifestation": "Seu brilho vital está enterrado nas fundações do seu castelo familiar. Você é o pilar inquebrável que garante que a casa tenha fartura, conforto luxuoso e paz inegociável.",
        "dailyBehavior": [
            "Gasta dinheiro desproporcional em móveis e reforma da casa, e muito pouco com saídas",
            "Cozinha receitas complexas como forma de dominar e estabilizar o humor familiar",
            "Recusa convites externos para ficar no próprio sofá desfrutando de rituais caros"
        ],
        "lifeStructure": "O lar como fortaleza e banco de investimentos. A família depende da sua estrutura financeira e material. Sucesso pra você não é aplauso, é uma despensa cheia e a casa quitada.",
        "typicalConflict": "Teimosia absurda com parentes, recusa em mudar tradições. Apego material disfarçado de 'amor familiar'. Dificuldade crônica de sair da zona de conforto de casa.",
        "uniqueGift": "A rocha da família. Capacidade de gerar estabilidade real e riqueza de longo prazo baseada em imóveis e segurança conservadora que abriga a todos.",
        "specificAdvice": "A segurança não mora apenas nas paredes. Permita que seus parentes façam escolhas de vida diferentes das tradições que você julga inalteráveis."
    },
    "sun_gemini_house7": {
        "combination": "sun_gemini_house7",
        "manifestation": "Sua vitalidade depende do outro, e esse outro precisa ser mentalmente estimulante. O casamento ou as parcerias de negócios são a sua verdadeira universidade diária.",
        "dailyBehavior": [
            "Obriga o parceiro a debater teorias, filmes e livros até altas horas",
            "Flerta no nível intelectual como esporte, mesmo estando em um relacionamento fechado",
            "Delega decisões difíceis para o parceiro usando uma retórica que o convence de que a ideia foi dele"
        ],
        "lifeStructure": "Sua identidade só se solidifica no espelho das relações 1-a-1. Precisa de sociedade comercial ou conjugal para organizar o próprio intelecto esparso. O parceiro atua como um 'fio terra' mental.",
        "typicalConflict": "Escolhe parceiros instáveis ou excessivamente falantes e depois se sente esgotado. Racionaliza brigas sérias tirando o peso emocional e irritando o outro. Medo crônico de casamento monótono.",
        "uniqueGift": "O talento supremo para negociação de alto nível. Você consegue fechar contratos resolvendo tensões pelo humor e inteligência relacional ímpar.",
        "specificAdvice": "O amor também acontece no silêncio e no olho no olho mudo. Nem toda emoção precisa virar um podcast argumentativo."
    },
    "sun_leo_house11": {
        "combination": "sun_leo_house11",
        "manifestation": "O rei ou rainha do clube. Você não brilha em carreira solo, você brilha ao liderar seu bando, suas ONGs, seu grupo social ou seu partido com magnanimidade e teatro.",
        "dailyBehavior": [
            "Paga a conta do bar inteiro para os amigos porque quer ser visto como o provedor magnânimo do grupo",
            "Usa suas conexões poderosas para salvar amigos de perrengues burocráticos",
            "Causa um estardalhaço nos grupos de WhatsApp quando uma de suas ideias não é adotada"
        ],
        "lifeStructure": "A energia vital se expande no coletivo. Amigos são suas verdadeiras posses. A meta de vida sempre cruza com a de um grupo de elite ou uma comunidade fechada onde você é aplaudido.",
        "typicalConflict": "Confunde amizade com súditos. Pessoas se afastam porque sentem que você não tolera que outro amigo roube os holofotes do grupo. Fica devastado se não for convidado para um evento social bobo.",
        "uniqueGift": "Você é a cola magnética que prende grupos complexos. A capacidade formidável de conseguir apoio público (networking de ouro) para realizar sonhos absurdos.",
        "specificAdvice": "A verdadeira amizade horizontal funciona mesmo quando você está nos bastidores aplaudindo a conquista de um amigo, sem precisar ser o anfitrião."
    },

    // ================= GRUPO B: VÊNUS NAS CASAS (AMOR E DINHEIRO) =================
    "venus_aries_house1": {
        "combination": "venus_aries_house1",
        "manifestation": "Você não seduz, você sitia o castelo. A atração é um esporte sangrento e você precisa estar na ofensiva sempre. Ama estar nos holofotes da paixão crua.",
        "dailyBehavior": [
            "Manda 'eu te quero' 5 minutos após o primeiro olhar, atropelando rituais",
            "Gasta dinheiro impulsivamente com itens de aparência (óculos, maquiagem forte) para impressionar no espelho",
            "Perde totalmente o interesse romântico se o alvo ceder muito facilmente as suas investidas"
        ],
        "lifeStructure": "Seu charme vem da brutalidade honesta. As finanças são baseadas em impulsos e auto-investimentos estéticos arrojados. Os relacionamentos precisam sempre do verniz de um desafio não conquistado.",
        "typicalConflict": "Queima paixões em 3 meses de lua-de-mel febril e pede o divórcio no quarto mês por 'tédio'. Arruma brigas por razões mesquinhas só para curtir o calor da reconciliação.",
        "uniqueGift": "Sinceridade romântica e capacidade de arrastar qualquer pessoa para fora da depressão através da sua intensidade amorosa instintiva, corajosa e física.",
        "specificAdvice": "O casamento é uma maratona, não um sprint de 100 metros. Entenda o valor da paz, senão morrerá viciado apenas na adrenalina do flerte."
    },
    "venus_taurus_house2": {
        "combination": "venus_taurus_house2",
        "manifestation": "A rainha na fortaleza do ouro. O amor é tangível e se mede por conforto, estabilidade bancária e jantares estelares. Romance pobre, para você, é utopia barata.",
        "dailyBehavior": [
            "Guarda recibos e extratos bancários como se fossem cartas de amor",
            "Exige toques físicos frequentes e massagens do parceiro, detesta amor virtual",
            "Só investe e confia em gente (e compras) com qualidade e garantia estética clássicas"
        ],
        "lifeStructure": "Paraíso material absoluto. Seu valor próprio está estritamente ligado à sua capacidade de prover um padrão de luxos e posses imóveis indestrutíveis. O parceiro é o cofre junto a você.",
        "typicalConflict": "Possessividade enraizada que cega; trata o cônjuge como propriedade. Teimosia estúpida em não ceder nem um milímetro nos gostos pessoais caros durante crises.",
        "uniqueGift": "O Toque de Midas estético. Capacidade de gerar grana estável e construir lares/relações inquebráveis que duram 50 anos blindadas no conforto sólido.",
        "specificAdvice": "Almas não podem ser compradas, por mais caro que tenha sido o vinho. Não mascare vazios emocionais com novas compras imobiliárias impulsivas."
    },

    // ================= GRUPO C: MARTE NAS CASAS (AÇÃO) =================
    "mars_aries_house1": {
        "combination": "mars_aries_house1",
        "manifestation": "Marte na própria casa, puro suco de dinamismo físico explosivo. Você nasce para a linha de frente. Corpo sempre tenso, pronto para brigar ou transar ao menor estímulo.",
        "dailyBehavior": [
            "Andar muito mais rápido que qualquer um na calçada, bufando se alguém demora a cruzar a rua",
            "Bater no volante, xingar e buzinar vigorosamente nos primeiros 5 segundos de um semáforo",
            "Atacar diretamente alguém verbalmente e fisicamente (postura) quando se sente contrariado, sem filtros"
        ],
        "lifeStructure": "Vida forjada em desafios de liderança bruta, esportes e atrito. Independentemente da carreira, você dita ordens e constrói tudo à sua imagem, atropelando os obstáculos.",
        "typicalConflict": "Conflitos de ego intermináveis e violentos fisicamente ou verbalmente. Exaustão adrenal nas relações familiares, parecendo um tanque num labirinto de vidro. Ferimentos físicos por pressa.",
        "uniqueGift": "Coragem instintiva sem precedentes. Capaz de liderar qualquer projeto falido e salvá-lo nas costas através do suor rústico e do embate pioneiro bruto.",
        "specificAdvice": "Sua raiva passa rápido, mas os danos que você deixa pelo caminho nos que você atropelam levam anos para curar. Treine a pausa, respire antes de explodir e ferir quem ama."
    },

    // ================= GRUPO D: LUA NAS CASAS (EMOÇÃO) =================
    "moon_cancer_house4": {
        "combination": "moon_cancer_house4",
        "manifestation": "A Lua no seu trono materno sombrio e protetor. Seu estado de espírito é a raiz de toda a sua vida. Sua casa é o seu psiquismo palpável, fechada numa aura protetora extrema e nostálgica.",
        "dailyBehavior": [
            "Estoca comida e cria reservas na casa como se a qualquer minuto fosse ocorrer uma guerra",
            "Manipula emocionalmente a família com choro ou cara fechada (vitimização silenciosa pesada)",
            "Protege seu quarto ou lar de forma territorial quase doentia contra qualquer invasor (visitas inesperadas)"
        ],
        "lifeStructure": "Base psíquica fortíssima (mas trancada). Formação de ninho impenetrável onde sua palavra é dita pelo seu humor e pelas manhas que herdou profundamente da sua mãe/linhagem.",
        "typicalConflict": "Guarda de forma passivo-agressiva cada ofensa recebida nos últimos 15 anos dentro do ambiente familiar. Apego crônico a parentes controladores. Síndrome do ninho não esvaziado.",
        "uniqueGift": "Instinto maternal mágico absoluto. Força emocional ilimitada nas tormentas pesadas familiares. Quando o seu clã ruir o mundo fora afofado nas plumas psíquicas da intuição de proteção e carinho.",
        "specificAdvice": "A nostalgia paralisa a vida prática atual real. O passado de família não define o futuro seguro e, de vez em quando, você tem que sair debaixo do cobertor no divã emotivo sombrio."
    },

    // ================= GRUPO E: ASCENDENTES (VESTIMENTA / MÁSCARA) =================
    "ascendant_leo_house1": {
        "combination": "ascendant_leo_house1",
        "manifestation": "A máscara do Leão realçado intensamente no corpo. Você veste no corpo a realeza natural exigente e generosa expansiva do fogo luxuoso vibrante radiante e exuberantemente majestoso magnético do animal magnânimo da primeira impressão.",
        "dailyBehavior": [
            "Joga os cabelos fisicamente de forma espalhafatosa (crina) nas interações primárias, impondo presença pelo esteticismo vibrante altivo físico espalhafatoso estético forte grandioso vaidosíssimo altivo altíssimo ego e roupas atraentes luxuosas brilhantes físicas corporais luxuosas corpóreas e chamativas coloridas vistosas e teatrais e imponentes de primeira classe luxuosa.",
            "Quando adentra recintos novos em novos lugares exige os holofotes em reações barulhentas efusivas extrovertidas com a exigência subconsciente dos melhores lugares camarotes reais luxos das primeiras interações espalhafatosamente exuberantes de ego expansivo físico visual carismático forte",
            "Mascarar dores inseguras frágeis e tristezas severas sob sorrises de plásticos majestosos brilhantes e de extrema confiança blindada magnânima espalhafatosa arrogante radiante exuberantemente forte de reis dominantes e otimistas fortes carismáticos"
        ],
        "lifeStructure": "A fachada de aprovação total do corpo carismático expansivo do show luxo impõe vitalidades vibrantes. Vida visual pública vibrante impõe sucesso estético inicial vital da teatralidade natural forte altiva carismática corporalmente imperiosa dominante.",
        "typicalConflict": "O fardo brutal do teatro do orgulho cego em ambientes triviais não aceitando críticas da embalagem. O cansaço físico severo orgulhoso arrogante em exigir atenção e plateia o tempo todo. Desaba sofredor se ignorado nos cumprimentos carismáticos efusivos.",
        "uniqueGift": "Poder magnético natural vital avassalador de aquecer ambientes tristes instantaneamente sem esforços verbais profundos, pela presença natural esplendorosa radiante vibrante luminosa de lideranças otimistas contagiantes magnânimas no primeiro aperto de mão poderoso real carismático.",
        "specificAdvice": "Relaxar a performance altiva estética diária imbatível imposta pelo orgulho carismático nos palcos triviais de plateias simples relaxadas sem estresses vaidosos vitais arrogantes de atenção total."
    }
};
