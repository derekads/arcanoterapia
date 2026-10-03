import type { InterpretationData } from './astrologyInterpretations';

/**
 * Interpretações dos pontos que faltavam no banco principal.
 *
 * O `interpretationsDB` original cobre Sol, Lua, Mercúrio, Vênus, Marte,
 * Júpiter, Saturno e Ascendente. Urano, Netuno, Plutão, o Meio do Céu, o Nó
 * Norte e Lilith caíam sempre no texto genérico — idêntico nos doze signos.
 * Este arquivo fecha essa lacuna.
 *
 * Nota de leitura: Urano, Netuno e Plutão são planetas GERACIONAIS. Ficam
 * anos no mesmo signo, então o signo descreve o clima da geração; é a casa
 * (e os aspectos) que trazem a leitura pessoal. Os textos abaixo assumem
 * essa moldura em vez de fingir que o signo é uma marca individual.
 */

// ─────────────────────────────────────────────────────────────
// URANO — ruptura, originalidade, o que a geração veio libertar
// ─────────────────────────────────────────────────────────────
const urano: Record<string, InterpretationData> = {
    uranus_aries: {
        hook: 'Sua geração rompe começando de novo: derruba primeiro, explica depois.',
        youAre: 'Faz parte de uma leva que trata a coragem como método. Onde a estrutura trava, o impulso de recomeçar do zero aparece antes da negociação.',
        yourPower: 'Iniciar o que ninguém teve estômago para iniciar. Você suporta ser o primeiro nome de uma lista.',
        yourTrap: 'Confundir ruptura com pressa: quebrar o que ainda funcionava só para provar que era possível quebrar.',
        tryThis: 'Escolha uma insatisfação sua e dê o primeiro passo hoje — pequeno, mas irreversível.'
    },
    uranus_taurus: {
        hook: 'Sua geração revoluciona o dinheiro, o corpo e a relação com a terra.',
        youAre: 'Nasceu num período em que valor, propriedade e segurança material foram reescritos. O que parecia sólido mostrou-se combinado.',
        yourPower: 'Reinventar o sustento sem perder o chão: mudar a fonte de renda, o hábito alimentar, a forma de possuir.',
        yourTrap: 'Apegar-se ao conforto até que a mudança venha por colapso, e não por escolha.',
        tryThis: 'Revise uma despesa fixa ou um hábito de consumo hoje e troque-o por algo mais alinhado ao que você valoriza de verdade.'
    },
    uranus_gemini: {
        hook: 'Sua geração reinventa a forma como a informação circula.',
        youAre: 'Cresceu em meio a uma reviravolta na comunicação: novas linguagens, novos meios, nova velocidade de troca.',
        yourPower: 'Aprender rápido e traduzir entre mundos que não se falam. Mente inquieta, plástica, difícil de doutrinar.',
        yourTrap: 'Dispersão elegante: mil abas abertas, nenhuma ideia levada até o fim.',
        tryThis: 'Escolha uma única ideia da sua lista e leve-a a um resultado concreto hoje, mesmo que pequeno.'
    },
    uranus_cancer: {
        hook: 'Sua geração redefiniu o que conta como família e como lar.',
        youAre: 'Veio de uma leva que desmontou o modelo herdado de casa, cuidado e pertencimento — às vezes por vontade, às vezes por necessidade.',
        yourPower: 'Criar vínculo fora do molde: reconhecer família onde não há sangue e cuidado onde não há obrigação.',
        yourTrap: 'Instabilidade emocional disfarçada de independência — sair antes de ser deixado.',
        tryThis: 'Diga a alguém que você escolheu como família por que essa pessoa importa. Sem rodeio.'
    },
    uranus_leo: {
        hook: 'Sua geração libertou a expressão individual do controle de quem autoriza.',
        youAre: 'Faz parte de uma onda que reivindicou o direito de criar, aparecer e se autodeclarar sem pedir licença.',
        yourPower: 'Criatividade que não espera curadoria. Você consegue começar sem plateia.',
        yourTrap: 'Confundir autenticidade com necessidade constante de ser notado.',
        tryThis: 'Crie algo hoje que você não vai mostrar a ninguém. Sinta a diferença.'
    },
    uranus_virgo: {
        hook: 'Sua geração reinventou o trabalho, a rotina e o que se entende por saúde.',
        youAre: 'Cresceu junto de uma revisão profunda de métodos: automação, medicina, hábitos, a ideia de eficiência.',
        yourPower: 'Melhorar sistemas por dentro. Você vê o gargalo antes que ele vire crise.',
        yourTrap: 'Otimizar tudo, inclusive o que deveria simplesmente ser vivido.',
        tryThis: 'Elimine uma etapa desnecessária de uma rotina sua hoje — e não a substitua por outra.'
    },
    uranus_libra: {
        hook: 'Sua geração reescreveu o contrato dos relacionamentos.',
        youAre: 'Nasceu quando parceria, casamento e igualdade foram postos em revisão aberta. O acordo virou conversa, não regra.',
        yourPower: 'Construir relações fora do roteiro, com termos combinados e não presumidos.',
        yourTrap: 'Trocar de vínculo sempre que ele exige negociação em vez de novidade.',
        tryThis: 'Nomeie um acordo implícito numa relação sua e coloque-o em palavras hoje.'
    },
    uranus_scorpio: {
        hook: 'Sua geração arrancou o tabu de cima do sexo, da morte e do poder.',
        youAre: 'Faz parte de uma leva que trouxe à luz o que se escondia: intimidade, dinheiro dos outros, abuso, controle.',
        yourPower: 'Encarar o assunto que a sala inteira está evitando — e sobreviver a ele.',
        yourTrap: 'Intensidade como vício: só se sentir vivo diante da crise.',
        tryThis: 'Diga em voz alta, para você mesmo, a verdade que você vem adiando. Só isso, por hoje.'
    },
    uranus_sagittarius: {
        hook: 'Sua geração abriu as fronteiras da crença e do conhecimento.',
        youAre: 'Cresceu num período de dogmas em queda e horizontes em expansão — viagem, filosofia e fé deixaram de ter dono.',
        yourPower: 'Trocar de mapa mental sem perder o senso de propósito. Fé sem fanatismo.',
        yourTrap: 'Fugir da profundidade trocando de verdade sempre que a atual exige compromisso.',
        tryThis: 'Leia hoje um argumento sólido de alguém que discorda de você — sem responder.'
    },
    uranus_capricorn: {
        hook: 'Sua geração desmontou as instituições que pareciam eternas.',
        youAre: 'Nasceu quando estruturas de poder, carreira e autoridade foram abaladas e tiveram de se justificar de novo.',
        yourPower: 'Reformar de dentro: você entende a máquina bem o bastante para reconstruí-la.',
        yourTrap: 'Cinismo — concluir que nada muda e usar isso como licença para não tentar.',
        tryThis: 'Aponte uma regra do seu trabalho que ninguém sabe explicar e pergunte hoje por que ela existe.'
    },
    uranus_aquarius: {
        hook: 'Urano em casa: sua geração pensa em rede, não em hierarquia.',
        youAre: 'Veio de uma leva que naturalizou o coletivo distribuído — comunidades, causas e tecnologia sem centro de comando.',
        yourPower: 'Enxergar o sistema inteiro e o lugar de cada um nele. Visão de futuro sem nostalgia.',
        yourTrap: 'Abstração fria: amar a humanidade e esquecer a pessoa ao lado.',
        tryThis: 'Faça hoje um gesto concreto por uma pessoa específica, não por uma causa.'
    },
    uranus_pisces: {
        hook: 'Sua geração dissolveu as fronteiras entre o espiritual, o artístico e o real.',
        youAre: 'Cresceu com a mística reinventada e o imaginário coletivo em ebulição — sonho, imagem e transe voltaram à mesa.',
        yourPower: 'Intuir a mudança antes que ela tenha nome. Sensibilidade que capta o clima do tempo.',
        yourTrap: 'Escapismo: dissolver-se na inspiração para não lidar com o concreto.',
        tryThis: 'Transforme hoje uma intuição sua em uma frase escrita. Tirá-la da névoa já é o trabalho.'
    }
};

// ─────────────────────────────────────────────────────────────
// NETUNO — o ideal, a sensibilidade e o ponto cego da geração
// ─────────────────────────────────────────────────────────────
const netuno: Record<string, InterpretationData> = {
    neptune_aries: {
        hook: 'O ideal da sua geração é o herói: quem age primeiro salva.',
        youAre: 'A inspiração chega como impulso, não como plano. Coragem tem cheiro de sagrado por aqui.',
        yourPower: 'Inspirar pela ação. Você acende os outros ao se mover.',
        yourTrap: 'Idealizar a bravura e desprezar a paciência, que também é coragem.',
        tryThis: 'Termine hoje algo que você começou por impulso e abandonou.'
    },
    neptune_taurus: {
        hook: 'O ideal da sua geração é a abundância: beleza, terra e sustento como coisa sagrada.',
        youAre: 'Sua sensibilidade é sensorial. O sublime chega pelo corpo — comida, música, textura, natureza.',
        yourPower: 'Encontrar o transcendente no simples e concreto, sem precisar sair do chão.',
        yourTrap: 'Confundir conforto com paz e acumular o que deveria ser apenas apreciado.',
        tryThis: 'Coma uma refeição hoje sem tela nenhuma, prestando atenção só no sabor.'
    },
    neptune_gemini: {
        hook: 'O ideal da sua geração é a palavra: contar a história certa parece resolver.',
        youAre: 'A imaginação é verbal e veloz. Ideias chegam em bando e encantam antes de serem verificadas.',
        yourPower: 'Narrar de um jeito que faz o outro enxergar. Talento genuíno para a linguagem.',
        yourTrap: 'Acreditar na própria retórica e chamar de verdade o que é só boa formulação.',
        tryThis: 'Cheque hoje a fonte de uma informação que você repetiu sem verificar.'
    },
    neptune_cancer: {
        hook: 'O ideal da sua geração é o lar: a nostalgia de um pertencimento perfeito.',
        youAre: 'Sua sensibilidade é de memória afetiva. O passado familiar tem brilho — às vezes brilho demais.',
        yourPower: 'Empatia profunda e capacidade rara de acolher quem está em ruína.',
        yourTrap: 'Idealizar a família ou a infância e medir o presente por um passado que nunca existiu assim.',
        tryThis: 'Lembre hoje de uma cena da sua infância e conte-a como ela foi, não como você gostaria.'
    },
    neptune_leo: {
        hook: 'O ideal da sua geração é o brilho: a arte e o artista como redenção.',
        youAre: 'A inspiração vem do palco, da expressão, do gesto grandioso. Criar parece dar sentido a tudo.',
        yourPower: 'Generosidade criativa. Você comove — e sabe disso.',
        yourTrap: 'Idealizar ídolos (ou a própria imagem) até perder de vista a pessoa real por trás.',
        tryThis: 'Elogie hoje alguém pelo esforço invisível, não pelo resultado brilhante.'
    },
    neptune_virgo: {
        hook: 'O ideal da sua geração é a pureza: o método certo, o corpo limpo, o serviço impecável.',
        youAre: 'Sua sensibilidade se expressa em cuidado detalhado. Servir bem parece um chamado.',
        yourPower: 'Devoção prática: transformar compaixão em rotina concreta de cuidado.',
        yourTrap: 'Perfeccionismo travestido de espiritualidade — culpa por nunca estar suficientemente correto.',
        tryThis: 'Entregue hoje uma tarefa em 80% e observe que o mundo segue de pé.'
    },
    neptune_libra: {
        hook: 'O ideal da sua geração é o amor: a relação perfeita como salvação.',
        youAre: 'Sua sensibilidade é relacional. Harmonia e beleza compartilhada têm peso quase religioso.',
        yourPower: 'Enxergar o melhor no outro e criar o espaço para que ele apareça.',
        yourTrap: 'Amar a imagem que você projetou na pessoa e chamar de desilusão o dia em que ela aparece inteira.',
        tryThis: 'Nomeie hoje um defeito de alguém que você ama — e siga amando.'
    },
    neptune_scorpio: {
        hook: 'O ideal da sua geração é a fusão total: intensidade como via de transcendência.',
        youAre: 'A sensibilidade é abissal. O que atrai é o oculto, o proibido, o que transforma pela raiz.',
        yourPower: 'Atravessar o escuro e voltar com algo verdadeiro. Poucos aguentam essa profundidade.',
        yourTrap: 'Confundir dor com profundidade e obsessão com entrega.',
        tryThis: 'Escreva hoje o nome de uma obsessão sua e, ao lado, o que ela promete resolver.'
    },
    neptune_sagittarius: {
        hook: 'O ideal da sua geração é a busca: a verdade está sempre um pouco mais adiante.',
        youAre: 'Sua sensibilidade é filosófica e viajante. Fé, sentido e horizonte se confundem.',
        yourPower: 'Fé genuína que sustenta você e quem está por perto em tempos duros.',
        yourTrap: 'Trocar de doutrina indefinidamente para nunca ter de encarar a própria vida.',
        tryThis: 'Aplique hoje, numa decisão concreta, algo em que você diz acreditar.'
    },
    neptune_capricorn: {
        hook: 'O ideal da sua geração é a realização: o sucesso como forma de sentido.',
        youAre: 'A sensibilidade se expressa através da estrutura. Construir bem parece um dever quase sagrado.',
        yourPower: 'Disciplina a serviço de algo maior — sonho com cronograma, o que é raro.',
        yourTrap: 'Idealizar o sucesso e descobrir tarde que o topo não entrega o que prometia.',
        tryThis: 'Pergunte-se hoje, por escrito: quem definiu a meta que estou perseguindo?'
    },
    neptune_aquarius: {
        hook: 'O ideal da sua geração é a utopia coletiva: a tecnologia e a rede como promessa de libertação.',
        youAre: 'A sensibilidade é coletiva e futurista. O sonho é de um mundo conectado e justo.',
        yourPower: 'Visão humanitária ampla, com repertório para imaginar arranjos que ainda não existem.',
        yourTrap: 'Dissolver-se no coletivo — ou na tela — e perder o contorno do próprio desejo.',
        tryThis: 'Fique hoje trinta minutos offline e note o que aparece quando o ruído sai.'
    },
    neptune_pisces: {
        hook: 'Netuno em casa: o ideal da sua geração é a compaixão sem fronteira.',
        youAre: 'Sensibilidade em estado puro: porosidade ao ambiente, ao sofrimento alheio, ao invisível.',
        yourPower: 'Empatia e imaginação de alcance raro. Você sente o que ainda não foi dito.',
        yourTrap: 'Absorver o que não é seu e afundar junto, chamando isso de amor.',
        tryThis: 'Ao sair de um ambiente pesado hoje, pergunte: esse sentimento é meu?'
    }
};

// ─────────────────────────────────────────────────────────────
// PLUTÃO — o poder que a geração veio destruir e regenerar
// ─────────────────────────────────────────────────────────────
const plutao: Record<string, InterpretationData> = {
    pluto_aries: {
        hook: 'Sua geração transforma pela afirmação bruta da própria existência.',
        youAre: 'O poder em jogo é o de iniciar. A regeneração vem de reivindicar o direito de existir por conta própria.',
        yourPower: 'Renascer do zero quantas vezes for preciso, sem esperar permissão.',
        yourTrap: 'Confundir força com agressão e queimar pontes que ainda serviam.',
        tryThis: 'Assuma hoje um desejo seu na primeira pessoa, sem justificá-lo para ninguém.'
    },
    pluto_taurus: {
        hook: 'Sua geração transforma pela revisão do que tem valor.',
        youAre: 'O poder em jogo é material: posse, terra, corpo, dinheiro. A crise vem quando o que era sólido se revela frágil.',
        yourPower: 'Resistência enorme e capacidade de reconstruir a base depois da perda.',
        yourTrap: 'Agarrar-se ao que já morreu porque soltar parece perder identidade.',
        tryThis: 'Doe ou descarte hoje um objeto que você guarda por medo, não por uso.'
    },
    pluto_gemini: {
        hook: 'Sua geração transforma pelo domínio da informação.',
        youAre: 'O poder em jogo está na palavra e no que circula: quem narra, define. A disputa é pela versão dos fatos.',
        yourPower: 'Enxergar a manipulação embutida num discurso e desmontá-la com clareza.',
        yourTrap: 'Usar a inteligência como arma e transformar toda conversa em disputa.',
        tryThis: 'Numa discussão hoje, tente entender antes de ganhar. Uma vez só.'
    },
    pluto_cancer: {
        hook: 'Sua geração transforma pelas raízes: o que a família transmite sem dizer.',
        youAre: 'O poder em jogo é o vínculo. Lealdades herdadas e feridas familiares pedem para ser vistas de frente.',
        yourPower: 'Interromper um padrão que vinha atravessando gerações. Isso é trabalho pesado e você tem calibre para ele.',
        yourTrap: 'Controlar quem se ama em nome do cuidado.',
        tryThis: 'Identifique hoje uma frase que você repete e que na verdade é de um dos seus pais.'
    },
    pluto_leo: {
        hook: 'Sua geração transforma pela reivindicação do próprio brilho.',
        youAre: 'O poder em jogo é a identidade. Ser alguém, ser visto, ser dono do próprio nome — com toda a intensidade que isso carrega.',
        yourPower: 'Presença magnética e coragem de ocupar espaço sem se desculpar.',
        yourTrap: 'Ego como fortaleza: precisar dominar a cena para se sentir existindo.',
        tryThis: 'Ceda hoje o crédito de algo que você fez, e observe o que dói.'
    },
    pluto_virgo: {
        hook: 'Sua geração transforma pela desmontagem dos sistemas de trabalho e saúde.',
        youAre: 'O poder em jogo está no método e na rotina. O que parecia neutro — o processo, a norma, o diagnóstico — mostra sua carga.',
        yourPower: 'Diagnóstico afiado: você vê a falha estrutural que os outros normalizaram.',
        yourTrap: 'Autocrítica que destrói em vez de corrigir.',
        tryThis: 'Escreva hoje uma crítica sua a si mesmo e reescreva-a como faria a um amigo.'
    },
    pluto_libra: {
        hook: 'Sua geração transforma pela reformulação das relações e da justiça.',
        youAre: 'O poder em jogo é o do acordo. O que se negocia em silêncio dentro de um vínculo vem à tona para ser refeito.',
        yourPower: 'Enxergar o desequilíbrio de poder dentro de uma relação e nomeá-lo.',
        yourTrap: 'Ceder para manter a paz até que o ressentimento faça o trabalho por você.',
        tryThis: 'Diga hoje um "não" que você vinha adiando por medo de desagradar.'
    },
    pluto_scorpio: {
        hook: 'Plutão em casa: sua geração transforma indo direto ao que dói.',
        youAre: 'O poder em jogo é o do que estava enterrado. Intimidade, morte, controle e segredo se recusam a continuar invisíveis.',
        yourPower: 'Capacidade quase inigualável de encarar a verdade nua e reconstruir a partir dela.',
        yourTrap: 'Viver em estado de crise porque a calmaria parece falsa.',
        tryThis: 'Passe hoje um dia sem investigar nada nem ninguém. Só observe.'
    },
    pluto_sagittarius: {
        hook: 'Sua geração transforma pela derrubada de dogmas.',
        youAre: 'O poder em jogo está na crença. Instituições de fé e verdade foram obrigadas a mostrar suas fundações.',
        yourPower: 'Buscar sentido sem precisar de um dono da verdade para validá-lo.',
        yourTrap: 'Substituir um fanatismo por outro, incluindo o fanatismo da dúvida.',
        tryThis: 'Escreva hoje uma convicção sua e, embaixo, o melhor argumento contra ela.'
    },
    pluto_capricorn: {
        hook: 'Sua geração transforma derrubando estruturas que se diziam permanentes.',
        youAre: 'O poder em jogo é o institucional: governos, empresas, carreiras, a própria ideia de autoridade — tudo posto à prova.',
        yourPower: 'Construir com consciência de poder: você sabe o custo real de uma estrutura.',
        yourTrap: 'Ambição que endurece — chegar ao topo de algo em que você já não acredita.',
        tryThis: 'Revise hoje uma meta de longo prazo e pergunte se ela ainda é sua.'
    },
    pluto_aquarius: {
        hook: 'Sua geração transforma redistribuindo o poder para a rede.',
        youAre: 'O poder em jogo é coletivo e tecnológico: quem controla o sistema, os dados, o pertencimento ao grupo.',
        yourPower: 'Imaginar arranjos coletivos que não repetem a velha hierarquia.',
        yourTrap: 'Ideologia como identidade — pertencer à tribo importar mais que pensar.',
        tryThis: 'Discorde hoje, com respeito, de algo que o seu grupo dá como certo.'
    },
    pluto_pisces: {
        hook: 'Sua geração transforma dissolvendo as fronteiras que já não sustentam nada.',
        youAre: 'O poder em jogo é o do invisível: o imaginário coletivo, a fé, o que se sente antes de se entender.',
        yourPower: 'Compaixão com força real — capaz de sustentar o que está se desfazendo.',
        yourTrap: 'Deixar-se dissolver: perder o contorno pessoal na entrega ao todo.',
        tryThis: 'Defina hoje um limite concreto — de horário, de espaço ou de assunto — e cumpra-o.'
    }
};

// ─────────────────────────────────────────────────────────────
// MEIO DO CÉU — vocação, imagem pública e o topo da montanha
// ─────────────────────────────────────────────────────────────
const meioDoCeu: Record<string, InterpretationData> = {
    midheaven_aries: {
        hook: 'Você é reconhecido por chegar primeiro e não esperar ordem.',
        youAre: 'A carreira pede iniciativa visível. Você é lembrado como quem abre caminho, não como quem administra o já existente.',
        yourPower: 'Liderança de arranque: ambientes novos, disputados ou em crise combinam com você.',
        yourTrap: 'Trocar de projeto quando a fase heroica acaba e começa a manutenção.',
        tryThis: 'Assuma hoje a linha de frente de algo que ninguém quis puxar.'
    },
    midheaven_taurus: {
        hook: 'Você é reconhecido pela consistência: o que você entrega, se sustenta.',
        youAre: 'A vocação se constrói devagar e permanece. Sua imagem pública é de solidez e bom gosto.',
        yourPower: 'Construir reputação por acúmulo — a confiança que só o tempo dá.',
        yourTrap: 'Acomodar-se numa posição segura muito depois de ela ter parado de crescer.',
        tryThis: 'Dê hoje um passo de carreira que você adia por conforto, não por dúvida.'
    },
    midheaven_gemini: {
        hook: 'Você é reconhecido por saber explicar, conectar e circular.',
        youAre: 'A carreira gira em torno da palavra e do trânsito entre áreas. Versatilidade é o seu cartão de visita.',
        yourPower: 'Traduzir o complexo e ligar pessoas que precisavam se encontrar.',
        yourTrap: 'Dispersar-se em frentes demais e não ser reconhecido em nenhuma.',
        tryThis: 'Escolha hoje a área em que você quer ser lembrado e recuse uma distração.'
    },
    midheaven_cancer: {
        hook: 'Você é reconhecido por cuidar: as pessoas se sentem seguras sob sua gestão.',
        youAre: 'A vocação envolve acolher, nutrir ou proteger — no sentido literal ou institucional.',
        yourPower: 'Criar ambientes onde as pessoas ficam. Retenção e lealdade seguem você.',
        yourTrap: 'Levar o trabalho para o campo emocional e não conseguir separar crítica de rejeição.',
        tryThis: 'Receba hoje um retorno crítico sem se justificar. Só agradeça e anote.'
    },
    midheaven_leo: {
        hook: 'Você é reconhecido pela presença: quando entra, a sala percebe.',
        youAre: 'A carreira pede visibilidade e autoria. Trabalho anônimo consome você mais do que deveria.',
        yourPower: 'Carisma que abre portas e mobiliza equipes em torno de uma visão.',
        yourTrap: 'Precisar de aplauso a ponto de escolher o projeto mais brilhante em vez do mais certo.',
        tryThis: 'Faça hoje um bom trabalho que ninguém vai atribuir a você.'
    },
    midheaven_virgo: {
        hook: 'Você é reconhecido pelo rigor: no seu trabalho, o detalhe fecha.',
        youAre: 'A vocação é técnica e de serviço. Confiam em você exatamente porque você confere.',
        yourPower: 'Excelência prática — você entrega o que promete, no padrão que prometeu.',
        yourTrap: 'Perfeccionismo que atrasa a entrega e o mantém invisível por tempo demais.',
        tryThis: 'Publique ou entregue hoje algo que já está bom, mesmo não estando perfeito.'
    },
    midheaven_libra: {
        hook: 'Você é reconhecido pela habilidade de mediar e pelo senso estético.',
        youAre: 'A carreira envolve relação, acordo e forma. Sua imagem pública é de equilíbrio e elegância.',
        yourPower: 'Fechar acordos que as duas partes assinam de bom grado.',
        yourTrap: 'Evitar posicionamento para não desagradar — e assim não ser lembrado por nada.',
        tryThis: 'Tome hoje uma posição pública sobre algo em que você acredita.'
    },
    midheaven_scorpio: {
        hook: 'Você é reconhecido por lidar com o que os outros não encaram.',
        youAre: 'A vocação envolve profundidade, crise ou transformação: investigação, finanças alheias, cura, reestruturação.',
        yourPower: 'Autoridade em terreno difícil. Você não recua diante do que é desconfortável.',
        yourTrap: 'Disputas de poder silenciosas que corroem a carreira por dentro.',
        tryThis: 'Traga hoje à mesa um assunto que a sua equipe vem evitando.'
    },
    midheaven_sagittarius: {
        hook: 'Você é reconhecido por ampliar horizontes — os seus e os dos outros.',
        youAre: 'A carreira pede sentido, ensino, viagem ou alcance amplo. Trabalho sem propósito seca você rápido.',
        yourPower: 'Inspirar e ensinar. As pessoas saem de perto de você com mais mundo.',
        yourTrap: 'Prometer mais do que a estrutura sustenta.',
        tryThis: 'Ensine hoje a alguém, de graça, algo que você domina.'
    },
    midheaven_capricorn: {
        hook: 'Você é reconhecido pela autoridade construída — não herdada.',
        youAre: 'A vocação é de longo prazo e escalada real. Sua imagem pública é de responsabilidade e competência comprovada.',
        yourPower: 'Resistência de carreira: você chega onde outros desistiram, pelo simples fato de continuar.',
        yourTrap: 'Sacrificar vida pessoal por um degrau que, do alto, valia menos que o preço.',
        tryThis: 'Bloqueie hoje uma hora de agenda para algo que não gera nenhum retorno profissional.'
    },
    midheaven_aquarius: {
        hook: 'Você é reconhecido por pensar diferente do consenso.',
        youAre: 'A carreira envolve inovação, coletivo ou causa. Estruturas engessadas sufocam sua contribuição.',
        yourPower: 'Enxergar o que vem antes que vire tendência, e articular gente em torno disso.',
        yourTrap: 'Ser contra por princípio e perder a chance de mudar a coisa por dentro.',
        tryThis: 'Proponha hoje uma mudança pequena dentro de uma estrutura que você critica.'
    },
    midheaven_pisces: {
        hook: 'Você é reconhecido pela sensibilidade: percebe o que ninguém verbalizou.',
        youAre: 'A vocação passa pela arte, pelo cuidado ou pelo espiritual. Sua imagem pública tem algo de indefinível.',
        yourPower: 'Intuição profissional apurada — você antecipa clima, desejo e virada.',
        yourTrap: 'Fronteiras difusas: ausência de contrato claro, de preço claro, de "não" claro.',
        tryThis: 'Defina hoje, por escrito, o escopo e o preço de algo que estava no verbal.'
    }
};

// ─────────────────────────────────────────────────────────────
// NÓ NORTE — a direção evolutiva (e o conforto do Nó Sul oposto)
// ─────────────────────────────────────────────────────────────
const noNorte: Record<string, InterpretationData> = {
    northnode_aries: {
        hook: 'Sua evolução é aprender a querer em primeira pessoa.',
        youAre: 'O conforto herdado está em Libra: agradar, mediar, existir a partir do outro. O crescimento pede iniciativa própria.',
        yourPower: 'Coragem que você não sabia ter — aparece toda vez que você decide sozinho.',
        yourTrap: 'Consultar todo mundo antes de admitir o que você mesmo quer.',
        tryThis: 'Tome hoje uma decisão pequena sem pedir opinião a ninguém.'
    },
    northnode_taurus: {
        hook: 'Sua evolução é construir estabilidade e sustentá-la.',
        youAre: 'O conforto herdado está em Escorpião: crise, intensidade, o que é dos outros. O crescimento pede chão próprio e ritmo calmo.',
        yourPower: 'Constância — quando você a exercita, a vida para de oscilar.',
        yourTrap: 'Criar drama quando as coisas ficam boas, porque a calma parece suspeita.',
        tryThis: 'Faça hoje uma coisa devagar, de propósito, do começo ao fim.'
    },
    northnode_gemini: {
        hook: 'Sua evolução é perguntar em vez de já saber.',
        youAre: 'O conforto herdado está em Sagitário: a grande verdade, a visão ampla. O crescimento pede curiosidade concreta e escuta.',
        yourPower: 'Aprender com quem está perto, em vez de buscar sempre a resposta distante.',
        yourTrap: 'Responder antes de entender a pergunta.',
        tryThis: 'Numa conversa hoje, faça três perguntas antes de dar uma opinião.'
    },
    northnode_cancer: {
        hook: 'Sua evolução é deixar-se cuidar e sentir sem controlar.',
        youAre: 'O conforto herdado está em Capricórnio: responsabilidade, controle, resultado. O crescimento pede vínculo e vulnerabilidade.',
        yourPower: 'Intimidade real, que só aparece quando você para de gerenciar a relação.',
        yourTrap: 'Resolver sozinho o que poderia ser dividido.',
        tryThis: 'Peça ajuda hoje para algo que você conseguiria fazer sozinho.'
    },
    northnode_leo: {
        hook: 'Sua evolução é aparecer com nome e rosto.',
        youAre: 'O conforto herdado está em Aquário: o grupo, a causa, a distância elegante. O crescimento pede autoria assumida.',
        yourPower: 'Criatividade pessoal — o que só você faz daquele jeito.',
        yourTrap: 'Diluir-se no coletivo para não ter de assinar embaixo.',
        tryThis: 'Assine hoje algo que você fez. Publicamente.'
    },
    northnode_virgo: {
        hook: 'Sua evolução é organizar o que hoje é névoa.',
        youAre: 'O conforto herdado está em Peixes: entrega, fuga, dissolução. O crescimento pede rotina, método e discernimento.',
        yourPower: 'Clareza prática: quando você estrutura, o caos vira trabalho realizável.',
        yourTrap: 'Esperar que a inspiração resolva o que só a agenda resolve.',
        tryThis: 'Escreva hoje uma lista de três passos concretos para algo que só existe como sonho.'
    },
    northnode_libra: {
        hook: 'Sua evolução é aprender a contar com o outro.',
        youAre: 'O conforto herdado está em Áries: autonomia, impulso, resolver na marra. O crescimento pede parceria e negociação.',
        yourPower: 'Relações em que os dois lados ganham — algo que você constrói melhor do que imagina.',
        yourTrap: 'Fazer sozinho por impaciência e chamar isso de independência.',
        tryThis: 'Delegue hoje uma tarefa inteira, sem refazer depois.'
    },
    northnode_scorpio: {
        hook: 'Sua evolução é atravessar a transformação em vez de contorná-la.',
        youAre: 'O conforto herdado está em Touro: segurança, posse, o que já é conhecido. O crescimento pede entrega e profundidade.',
        yourPower: 'Regeneração — sua capacidade de mudar por dentro é maior do que o seu apego sugere.',
        yourTrap: 'Segurar situações mortas porque soltar dá medo.',
        tryThis: 'Encerre hoje algo que já terminou de fato, mas segue formalmente aberto.'
    },
    northnode_sagittarius: {
        hook: 'Sua evolução é confiar na visão maior.',
        youAre: 'O conforto herdado está em Gêmeos: informação, dispersão, ficar na superfície. O crescimento pede sentido e compromisso com uma direção.',
        yourPower: 'Fé prática: escolher um caminho e seguir nele tempo suficiente para ele render.',
        yourTrap: 'Coletar dados infinitamente para adiar a escolha.',
        tryThis: 'Escolha hoje entre duas opções que você vem comparando há semanas.'
    },
    northnode_capricorn: {
        hook: 'Sua evolução é assumir responsabilidade e estrutura.',
        youAre: 'O conforto herdado está em Câncer: proteção, familiaridade, o refúgio conhecido. O crescimento pede maturidade e posição no mundo.',
        yourPower: 'Autoridade tranquila — a que vem de cumprir o que se combinou.',
        yourTrap: 'Recuar para o colo do que é familiar sempre que o mundo cobra.',
        tryThis: 'Assuma hoje publicamente um prazo e cumpra-o.'
    },
    northnode_aquarius: {
        hook: 'Sua evolução é abrir mão do centro do palco pelo bem do grupo.',
        youAre: 'O conforto herdado está em Leão: brilho pessoal, reconhecimento, o gesto individual. O crescimento pede coletivo e causa.',
        yourPower: 'Articular pessoas em torno de algo maior que qualquer um dos envolvidos.',
        yourTrap: 'Medir o valor do que faz pelo aplauso que recebe.',
        tryThis: 'Contribua hoje para um projeto coletivo sem reivindicar autoria.'
    },
    northnode_pisces: {
        hook: 'Sua evolução é soltar o controle e confiar.',
        youAre: 'O conforto herdado está em Virgem: análise, correção, controle do detalhe. O crescimento pede entrega, compaixão e aceitação.',
        yourPower: 'Uma serenidade que só aparece quando você para de tentar consertar tudo.',
        yourTrap: 'Analisar o sentimento em vez de senti-lo.',
        tryThis: 'Deixe hoje um erro pequeno sem corrigir e observe o que acontece.'
    }
};

// ─────────────────────────────────────────────────────────────
// LILITH — o desejo que não se deixa domesticar
// ─────────────────────────────────────────────────────────────
const lilith: Record<string, InterpretationData> = {
    lilith_aries: {
        hook: 'O que em você não se domestica é a vontade crua.',
        youAre: 'Sua raiva e seu desejo de agir foram, em algum momento, tratados como excesso. Você aprendeu a engolir o impulso.',
        yourPower: 'Uma força de afirmação que, assumida, abre caminho onde não havia.',
        yourTrap: 'Explodir depois de reprimir por tempo demais — ou não se afirmar nunca.',
        tryThis: 'Diga hoje o que você quer, em uma frase, sem amaciar.'
    },
    lilith_taurus: {
        hook: 'O que em você não se domestica é o prazer e o direito de ter.',
        youAre: 'Prazer sensorial, dinheiro e posse carregam culpa. Desejar conforto parece indecente.',
        yourPower: 'Autoestima ligada ao corpo e ao valor próprio, quando você para de pedir desculpa por querer.',
        yourTrap: 'Compensar a culpa com excesso, e o excesso com privação.',
        tryThis: 'Dê-se hoje um prazer simples sem justificar por que merece.'
    },
    lilith_gemini: {
        hook: 'O que em você não se domestica é a voz.',
        youAre: 'Falar demais, perguntar demais ou dizer a coisa errada custou caro em algum momento. Você aprendeu a filtrar antes de existir.',
        yourPower: 'Uma honestidade verbal que corta o teatro social e diz o que estava óbvio.',
        yourTrap: 'Silêncio estratégico que vira silenciamento próprio.',
        tryThis: 'Diga hoje aquilo que você ia deixar passar.'
    },
    lilith_cancer: {
        hook: 'O que em você não se domestica é a necessidade de ser cuidado.',
        youAre: 'A dependência emocional foi tratada como fraqueza. Você aprendeu a não precisar — pelo menos em público.',
        yourPower: 'Uma capacidade de intimidade profunda, quando você admite que precisa.',
        yourTrap: 'Fingir autossuficiência e ressentir-se de quem não adivinhou.',
        tryThis: 'Diga hoje a alguém, literalmente: "eu preciso de você nisso".'
    },
    lilith_leo: {
        hook: 'O que em você não se domestica é a vontade de brilhar.',
        youAre: 'Querer atenção foi rotulado como vaidade. Você aprendeu a se encolher para não parecer demais.',
        yourPower: 'Um brilho legítimo que aparece quando você deixa de pedir licença para ocupá-lo.',
        yourTrap: 'Alternar entre invisibilidade e explosão de exigência por reconhecimento.',
        tryThis: 'Ocupe hoje um espaço em que você normalmente se apagaria.'
    },
    lilith_virgo: {
        hook: 'O que em você não se domestica é a recusa de servir sem ser visto.',
        youAre: 'Você aprendeu que valor se prova pela utilidade. A imperfeição vira ameaça.',
        yourPower: 'Um discernimento afiado sobre onde a sua entrega é justa e onde é exploração.',
        yourTrap: 'Perfeccionismo como pedido silencioso de aprovação.',
        tryThis: 'Recuse hoje uma tarefa que não é sua, sem inventar desculpa.'
    },
    lilith_libra: {
        hook: 'O que em você não se domestica é a discordância.',
        youAre: 'A harmonia foi cobrada de você. Conflito virou algo a evitar a qualquer preço, inclusive o da própria verdade.',
        yourPower: 'Relações honestas, que só se tornam possíveis quando você para de ceder por reflexo.',
        yourTrap: 'Concordar por fora e cobrar por dentro.',
        tryThis: 'Discorde hoje de alguém de quem você gosta, com gentileza e sem recuar.'
    },
    lilith_scorpio: {
        hook: 'O que em você não se domestica é a intensidade.',
        youAre: 'Desejo, ciúme, poder e profundidade foram tratados como perigosos. Você aprendeu a esconder o que sente de verdade.',
        yourPower: 'Uma potência transformadora rara, quando trazida à consciência em vez de agida no escuro.',
        yourTrap: 'Controle e manipulação disfarçados de cuidado.',
        tryThis: 'Nomeie hoje, para você mesmo, um desejo que você acha inconfessável.'
    },
    lilith_sagittarius: {
        hook: 'O que em você não se domestica é a liberdade de pensar diferente.',
        youAre: 'Sua verdade contrariou a crença de casa. Você aprendeu a guardar o que pensa para manter a paz.',
        yourPower: 'Uma independência intelectual genuína, que não precisa de permissão de nenhuma tribo.',
        yourTrap: 'Rebelar-se contra tudo para não ter de pertencer a nada.',
        tryThis: 'Assuma hoje, em voz alta, uma opinião que o seu meio não compartilha.'
    },
    lilith_capricorn: {
        hook: 'O que em você não se domestica é a ambição.',
        youAre: 'Querer poder ou posição foi tratado como arrogância. Você aprendeu a minimizar o que busca.',
        yourPower: 'Uma ambição limpa, assumida sem culpa, que constrói de verdade.',
        yourTrap: 'Trabalhar em silêncio esperando ser notado, e amargar quando não é.',
        tryThis: 'Diga hoje, para alguém, onde você quer chegar. Sem diminuir.'
    },
    lilith_aquarius: {
        hook: 'O que em você não se domestica é a diferença.',
        youAre: 'Ser estranho ao grupo custou pertencimento. Você aprendeu a moderar o que tem de mais original.',
        yourPower: 'Originalidade real, que só serve ao mundo quando não é editada para caber.',
        yourTrap: 'Exílio voluntário: rejeitar antes de ser rejeitado.',
        tryThis: 'Mostre hoje a alguém uma ideia sua que você acha esquisita demais.'
    },
    lilith_pisces: {
        hook: 'O que em você não se domestica é a sensibilidade.',
        youAre: 'Sentir demais foi tratado como fragilidade ou drama. Você aprendeu a anestesiar.',
        yourPower: 'Uma percepção sutil e uma compaixão que se tornam força quando têm limite.',
        yourTrap: 'Sacrifício silencioso, seguido de vitimização.',
        tryThis: 'Chore, escreva ou fale hoje sobre algo que você vem empurrando para debaixo do tapete.'
    }
};

/**
 * Todas as interpretações que faltavam, prontas para serem incorporadas
 * ao `interpretationsDB`.
 */
export const outerPlanetInterpretations: Record<string, InterpretationData> = {
    ...urano,
    ...netuno,
    ...plutao,
    ...meioDoCeu,
    ...noNorte,
    ...lilith
};

export default outerPlanetInterpretations;
