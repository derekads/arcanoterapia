
export interface ArcanoPessoalDetalhado {
    numero: number;
    nome: string;
    palavrasChave: string;
    texto: string[];
}

export interface PrevisaoAno {
    id: number;
    nome: string;
    ano: number;
    tema: string;
    fraseGuia: string;
    conselho: string;
    amor: string;
    carreira: string;
    saude: string;
    resumo: string;
    trimestres: Record<string, string>;
}

export const ARCANOS_PESSOAIS_DETALHADOS: ArcanoPessoalDetalhado[] = [];

export const PREVISOES_2026: PrevisaoAno[] = [
    {
        id: 22,
        nome: "O Louco",
        ano: 2026,
        tema: "A Jornada do Desconhecido. Em 2026, sob a regência universal do Mago, seu espírito livre encontra o impulso necessário para saltar em direção ao novo, despido de medos obsoletos.",
        fraseGuia: "Eu confio na sabedoria do caos e caminho para onde minha alma aponta.",
        conselho: "Não carregue o peso de ciclos mortos. O Mago exige intenção pura e mãos vazias para criar.",
        amor: "Encontros súbitos que desafiam convenções. Permita-se ser surpreendido por conexões fora do padrão.",
        carreira: "Momento de audácia: inicie aquele projeto visionário que outros julgam impossível.",
        saude: "Cuidado com a dispersão de energia; seus pés e sistema nervoso pedem aterramento consciente.",
        resumo: "Um ciclo de liberdade absoluta e inícios radicais. A ousadia de ser quem você é será sua maior proteção.",
        trimestres: { Q1: "Ondas de inspiração.", Q2: "Descobertas geográficas ou mentais.", Q3: "Expansão da rede social.", Q4: "Alinhamento do novo rumo." }
    },
    {
        id: 1,
        nome: "O Mago",
        ano: 2026,
        tema: "O Despertar da Maestria. Você está em plena sincronia com o Ano Universal 1. O cosmo e sua vontade agora falam a mesma língua.",
        fraseGuia: "Eu sou o canal consciente por onde a vontade criadora se manifesta na matéria.",
        conselho: "O poder sem foco é apenas agitação. Direcione sua energia para um único grande propósito.",
        amor: "Magnetismo intelectual em alta; o diálogo será o portal para a intimidade profunda.",
        carreira: "O ciclo de ouro para nascimentos, lançamentos e expansão de autoridade profissional.",
        saude: "Foco no equilíbrio mental: a aceleração criativa pode exigir rituais de silêncio e repouso.",
        resumo: "Um ano de materialização extraordinária. Você possui todas as ferramentas; a escolha é sua.",
        trimestres: { Q1: "Revelação de talentos ocultos.", Q2: "Expansão comunicativa.", Q3: "Liderança deliberada.", Q4: "Consolidação da obra." }
    },
    {
        id: 2,
        nome: "A Sacerdotisa",
        ano: 2026,
        tema: "A Alquimia do Silêncio. Em um ano de ação (Mago), sua força reside na preservação do mistério e na gestação cuidadosa.",
        fraseGuia: "No santuário do meu silêncio, a verdade se revela sem esforço.",
        conselho: "Não revele seus planos antes que estejam maduros. Cultive a paciência do templo.",
        amor: "Conexões pautadas pela alma e por afinidades espirituais profundas. O invisível dirá mais que o visível.",
        carreira: "Fase de planejamento estratégico, estudos de alto nível e fortalecimento dos bastidores.",
        saude: "Honre seus ciclos internos e a escuta do corpo; a intuição será sua melhor médica.",
        resumo: "Um ciclo de sabedoria iniciática. Sua influência cresce na medida em que sua discrição aumenta.",
        trimestres: { Q1: "Recolhimento fértil.", Q2: "Intuição aguçada.", Q3: "Arquitetura invisível.", Q4: "Revelações estratégicas." }
    },
    {
        id: 3,
        nome: "A Imperatriz",
        ano: 2026,
        tema: "A Fertilidade Criativa. Ano de expansão e beleza.",
        fraseGuia: "Eu nutro meus sonhos e eles florescem em abundância.",
        conselho: "Materialize! Não deixe as ideias ficarem só no papel.",
        amor: "Ano de magnetismo sexual e afetivo.",
        carreira: "Crescimento, lucros e criatividade.",
        saude: "Cuidado com excessos físicos; garganta é ponto fraco.",
        resumo: "Abundância, fertilidade e crescimento criativo. Colheita de bons frutos.",
        trimestres: { Q1: "Geração de ideias.", Q2: "Nutrição de projetos.", Q3: "Beleza e prazer.", Q4: "Abundância material." }
    },
    {
        id: 4,
        nome: "O Imperador",
        ano: 2026,
        tema: "A Estruturação do Poder. O impulso do Mago ganha ordem com você.",
        fraseGuia: "Eu construo minha realidade com ordem e disciplina.",
        conselho: "Organize o caos. Lidere pelo exemplo.",
        amor: "Relações buscam estabilidade e compromisso.",
        carreira: "Promoções, liderança e consolidação.",
        saude: "Rigidez física; cuide da coluna e ossos.",
        resumo: "Estruturação do poder e estabilidade. Construção de bases sólidas.",
        trimestres: { Q1: "Fundação segura.", Q2: "Liderança firme.", Q3: "Ordem material.", Q4: "Poder consolidado." }
    },
    {
        id: 5,
        nome: "O Papa",
        ano: 2026,
        tema: "A Sabedoria Compartilhada. Ano de ensinar e aprender.",
        fraseGuia: "Eu sou a ponte entre o céu e a terra.",
        conselho: "Busque conhecimento e siga a ética.",
        amor: "Relacionamentos baseados em valores comuns.",
        carreira: "Ensino, consultoria e liderança de equipes.",
        saude: "Ouvidos e pescoço pedem atenção especial.",
        resumo: "Ensino, sabedoria compartilhada e conexão espiritual.",
        trimestres: { Q1: "Busca por mentoria.", Q2: "Estudos sagrados.", Q3: "Ensino e carisma.", Q4: "Bênçãos espirituais." }
    },
    {
        id: 6,
        nome: "Os Enamorados",
        ano: 2026,
        tema: "A Escolha do Coração. Ano decisivo sobre suas parcerias.",
        fraseGuia: "Eu escolho o amor em todas as minhas decisões.",
        conselho: "Decida! A indecisão será seu maior inimigo.",
        amor: "O grande tema do ano: firme ou termine.",
        carreira: "Sucesso através da colaboração e diplomacia.",
        saude: "Pulmões e circulação: respire com consciência.",
        resumo: "Escolhas cruciais do coração. Definição de caminhos e parcerias.",
        trimestres: { Q1: "Dúvidas e testes.", Q2: "Encontros marcantes.", Q3: "Escolhas éticas.", Q4: "Compromisso real." }
    },
    {
        id: 7,
        nome: "O Carro",
        ano: 2026,
        tema: "O Avanço Triunfal. Velocidade máxima em seus planos.",
        fraseGuia: "Eu avanço com determinação e venço obstáculos.",
        conselho: "Foco na meta; a dispersão causa acidentes.",
        amor: "Conquista e movimento; viagens a dois.",
        carreira: "Progresso rápido e vitórias competitivas.",
        saude: "Estômago e pernas: cuidado com a pressa.",
        resumo: "Avanço rápido, vitórias e determinação. Nada segura sua vontade.",
        trimestres: { Q1: "Aceleração total.", Q2: "Viagens e metas.", Q3: "Superação de rivais.", Q4: "Triunfo absoluto." }
    },
    {
        id: 8,
        nome: "A Justiça",
        ano: 2026,
        tema: "O Ajuste de Contas. Ano de regularizar a vida.",
        fraseGuia: "A verdade é meu escudo e o equilíbrio minha espada.",
        conselho: "Seja impecável; o que for justo virá.",
        amor: "Busca por reciprocidade e verdade nua e crua.",
        carreira: "Contratos e questões legais em destaque.",
        saude: "Rins e lombar pedem equilíbrio e purificação.",
        resumo: "Equilíbrio, justiça e acerto de contas. Colha o que plantou.",
        trimestres: { Q1: "Ajuste de contratos.", Q2: "Verdade em foco.", Q3: "Equilíbrio interno.", Q4: "Colheita justa." }
    },
    {
        id: 9,
        nome: "O Eremita",
        ano: 2026,
        tema: "A Luz Interior. Antes de começar fora, termine dentro.",
        fraseGuia: "Minha luz brilha de dentro e ilumina o caminho.",
        conselho: "Recolha-se para avançar com sabedoria.",
        amor: "Tempo de solitude ou relações muito maduras.",
        carreira: "Especialização e pesquisa em destaque.",
        saude: "Ossos e articulações pedem preservação vital.",
        resumo: "Introspecção, luz interior e maturidade plena.",
        trimestres: { Q1: "Retirada estratégica.", Q2: "Estudos profundos.", Q3: "Luz na sombra.", Q4: "Maturidade plena." }
    },
    {
        id: 10,
        nome: "A Roda da Fortuna",
        ano: 2026,
        tema: "A Grande Virada. Sincronicidade e mudanças rápidas.",
        fraseGuia: "Eu fluo com as mudanças e aceito a sorte.",
        conselho: "Adapte-se; a única certeza é a mudança.",
        amor: "Encontros do destino e voltas inesperadas.",
        carreira: "Mudanças de cargo e expansão imprevista.",
        saude: "Sistema nervoso e circulação instáveis.",
        resumo: "Mudanças rápidas, sorte e viradas do destino.",
        trimestres: { Q1: "Giros inesperados.", Q2: "Sorte e expansão.", Q3: "Adaptação rápida.", Q4: "Nova prosperidade." }
    },
    {
        id: 11,
        nome: "A Força",
        ano: 2026,
        tema: "O Domínio Suave. Conquiste pela persistência e amor.",
        fraseGuia: "Minha força é a paciência com minha fera.",
        conselho: "Não use força bruta; use inteligência emocional.",
        amor: "Paixão intensa que exige domínio do ego.",
        carreira: "Liderança e esforço recompensado.",
        saude: "Coração e músculos: libere a tensão.",
        resumo: "Coragem, domínio emocional e vitalidade.",
        trimestres: { Q1: "Domínio do ego.", Q2: "Paixão canalizada.", Q3: "Resistência física.", Q4: "Vitória do amor." }
    },
    {
        id: 12,
        nome: "O Pendurado",
        ano: 2026,
        tema: "A Nova Perspectiva. Encontre sabedoria na pausa.",
        fraseGuia: "Eu me entrego ao fluxo e encontro paz na pausa.",
        conselho: "Não force; sacrifique o ego pela visão.",
        amor: "Dedicação espiritual ou sacrifício temporário.",
        carreira: "Pausas estratégicas e inovação mental.",
        saude: "Pés e circulação: flua com calma.",
        resumo: "Pausa estratégica, nova visão e entrega.",
        trimestres: { Q1: "Parada necessária.", Q2: "Mudança de olhar.", Q3: "Entrega total.", Q4: "Iluminação calma." }
    },
    {
        id: 13,
        nome: "A Morte",
        ano: 2026,
        tema: "O Renascimento Radical. Corte o que já morreu.",
        fraseGuia: "Eu deixo ir o velho para o novo chegar.",
        conselho: "Limpe a alma; o novo quer entrar.",
        amor: "Fim de ciclos e renovação profunda.",
        carreira: "Mudanças radicais e reestruturações totais.",
        saude: "Intestinos e detox: elimine toxinas.",
        resumo: "Transformação radical e renascimento necessário.",
        trimestres: { Q1: "Corte profundo.", Q2: "Luto e limpeza.", Q3: "Renascimento lento.", Q4: "Total renovação." }
    },
    {
        id: 14,
        nome: "A Temperança",
        ano: 2026,
        tema: "A Alquimia do Tempo. Equilíbrio e cura em fluxo.",
        fraseGuia: "Eu equilibro as energias com paciência.",
        conselho: "O caminho do meio é o segredo da cura.",
        amor: "Harmonia e aprofundamento da amizade.",
        carreira: "Negociações suaves e misturas de talentos.",
        saude: "Líquidos e hormônios em equilíbrio.",
        resumo: "Alquimia, cura e equilíbrio melódico.",
        trimestres: { Q1: "Harmonização.", Q2: "Cura energética.", Q3: "Paciência fértil.", Q4: "Alquimia divina." }
    },
    {
        id: 15,
        nome: "O Diabo",
        ano: 2026,
        tema: "O Poder da Matéria. Ambição e magnetismo intensos.",
        fraseGuia: "Eu reconheço minha sombra e uso meu poder.",
        conselho: "Use a paixão como combustível, não prisão.",
        amor: "Paixão avassaladora e intensidade sexual.",
        carreira: "Sucesso financeiro e ambição recompensada.",
        saude: "Energia vital e órgãos reprodutores.",
        resumo: "Magnetismo, ambição e poder material real.",
        trimestres: { Q1: "Desejo latente.", Q2: "Ambição audaz.", Q3: "Poder de atração.", Q4: "Materialização." }
    },
    {
        id: 16,
        nome: "A Torre",
        ano: 2026,
        tema: "O Despertar Súbito. O que for falso cairá.",
        fraseGuia: "Agradeço pela libertação das ilusões.",
        conselho: "Se tem que cair, deixe cair; liberte-se.",
        amor: "Rupturas de fachadas por verdades reais.",
        carreira: "Mudanças bruscas que eliminam o obsoleto.",
        saude: "Coluna e estresse: relaxe a rigidez.",
        resumo: "Libertação súbita e despertar necessário.",
        trimestres: { Q1: "Abalos necessários.", Q2: "Verdade exposta.", Q3: "Limpeza de bases.", Q4: "Nova fundação." }
    },
    {
        id: 17,
        nome: "A Estrela",
        ano: 2026,
        tema: "A Inspiração Divina. Esperança e brilho futuro.",
        fraseGuia: "Eu confio no universo e sigo minha estrela.",
        conselho: "Tenha fé e mostre seus talentos.",
        amor: "Romantismo leve e conexões espirituais.",
        carreira: "Inovação tecnológica e projetos visionários.",
        saude: "Sistema nervoso renovado por águas.",
        resumo: "Esperança, inspiração e brilho pessoal.",
        trimestres: { Q1: "Frescor e fé.", Q2: "Inspiração divina.", Q3: "Sorte e brilho.", Q4: "Futuro radiante." }
    },
    {
        id: 18,
        nome: "A Lua",
        ano: 2026,
        tema: "O Mergulho no Inconsciente. Intuição e mistério.",
        fraseGuia: "Eu ilumino minhas sombras e ouço a alma.",
        conselho: "Cuidado com ilusões; veja além do véu.",
        amor: "Sentimentos ocultos e projeções emocionais.",
        carreira: "Trabalhos criativos e intuição estratégica.",
        saude: "Retenção de líquidos e sono pedem cuidado.",
        resumo: "Intuição aguçada e mistérios revelados.",
        trimestres: { Q1: "Presságios.", Q2: "Flutuação emocional.", Q3: "Arte e magia.", Q4: "Clareza noturna." }
    },
    {
        id: 19,
        nome: "O Sol",
        ano: 2026,
        tema: "A Alegria de Viver. Clareza e sucesso solar.",
        fraseGuia: "Eu sou a luz que ilumina o mundo.",
        conselho: "Celebre vitórias com o coração aberto.",
        amor: "Felicidade visível e calor humano pleno.",
        carreira: "Reconhecimento, fama e frutos concretos.",
        saude: "Vitalidade e coração em pleno brilho.",
        resumo: "Sucesso, alegria e clareza total.",
        trimestres: { Q1: "Amanhecer feliz.", Q2: "Calor e união.", Q3: "Sucesso pleno.", Q4: "Celebrando a vida." }
    },
    {
        id: 20,
        nome: "O Julgamento",
        ano: 2026,
        tema: "O Chamado Final. Desperte para sua vocação.",
        fraseGuia: "Eu desperto para minha missão e renasço.",
        conselho: "Acorde! Perdoe o passado e atenda a alma.",
        amor: "Perdão e renovação kármica nas relações.",
        carreira: "Missão de alma e mudanças definitivas.",
        saude: "Pulmões e o sopro de uma nova vida.",
        resumo: "Vocação, despertar e renascimento real.",
        trimestres: { Q1: "Ouvir o chamado.", Q2: "Perdão e cura.", Q3: "Renascimento público.", Q4: "Missão em foco." }
    },
    {
        id: 21,
        nome: "O Mundo",
        ano: 2026,
        tema: "A Plenitude. Realização e conexão global.",
        fraseGuia: "Eu sou um com o universo e celebro.",
        conselho: "Conclua ciclos com glória e expanda-se.",
        amor: "Plenitude e completude afetiva plena.",
        carreira: "Expansão internacional e conclusão êxitosa.",
        saude: "Saúde robusta e equilíbrio global pleno.",
        resumo: "Plenitude, conclusão e glória universal.",
        trimestres: { Q1: "Expansão global.", Q2: "Integração total.", Q3: "Viagens e êxito.", Q4: "Mundo em harmonia." }
    },
];
