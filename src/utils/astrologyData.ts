
export interface PlanetInHouseInterpretation {
    [key: string]: string; // "Sol na Casa 1": "Texto..."
}

export interface AspectInterpretation {
    natureza: string;
    [key: string]: string; // "Sol_Lua": "Texto..."
}

export const PLANETS_IN_HOUSES: Record<string, PlanetInHouseInterpretation> = {
    "Sol": {
        "Casa 1": "Fortalece a vitalidade e favorece a prosperidade. O nativo é firme, generoso e honrado. Possui coragem, entusiasmo, dignidade e nobreza de espírito. Desejo de exercer poder ou autoridade. Personalidade acentuada, individualista, com forte ambição para triunfar e se destacar.",
        "Casa 2": "O desejo de poder relaciona-se com recursos financeiros e êxito material. Persistência para alcançar metas. Se bem aspectado, indica situação financeira brilhante. Generosidade que pode levar a gastos excessivos.",
        "Casa 3": "Foco na comunicação, intelecto e ambiente imediato. Busca brilhar através do conhecimento, escrita ou fala. Relação forte com irmãos e vizinhos.",
        "Casa 4": "Foco na vida doméstica, raízes e família. Busca segurança e autoexpressão no lar. Pode indicar um pai forte ou uma base familiar sólida que influencia a identidade.",
        "Casa 5": "Criatividade, prazer, filhos e romance. Desejo de ser o centro das atenções através de talentos criativos. Vitalidade expressa em hobbies e lazer.",
        "Casa 6": "Foco no trabalho, rotina e saúde. Busca perfeição e reconhecimento através do serviço prestado. Identidade ligada à utilidade e competência técnica.",
        "Casa 7": "Identidade moldada através de parcerias e relacionamentos. Busca equilíbrio e reconhecimento nos outros. Pode indicar um cônjuge influente ou necessidade de brilhar socialmente.",
        "Casa 8": "Transformação, recursos compartilhados e mistérios. Busca poder através do entendimento das profundezas da vida. Interesse em ocultismo, finanças ou crises que geram renascimento.",
        "Casa 9": "Expansão, filosofia, viagens longas e ensino superior. Busca significado e verdade. Identidade ligada a crenças, ética e exploração de novos horizontes.",
        "Casa 10": "Carreira, reputação e vida pública. Desejo de sucesso, autoridade e reconhecimento social. Identidade fortemente ligada à profissão e ao status.",
        "Casa 11": "Amizades, grupos e ideais sociais. Busca brilhar em contextos coletivos. Identidade ligada a causas humanitárias ou projetos para o futuro.",
        "Casa 12": "Autoconhecimento, espiritualidade e isolamento. Busca de identidade em níveis subconscientes. Necessidade de privacidade e conexão com o transcendente."
    },
    "Lua": {
        "Casa 1": "Emoções projetadas de forma visível e direta. Sensibilidade acentuada, mudanças de humor frequentes e forte ligação com a autoimagem. Necessidade de aceitação.",
        "Casa 2": "Conforto emocional ligado à segurança material. Flutuações financeiras baseadas no estado emocional. Necessidade de possuir para se sentir seguro.",
        "Casa 3": "Comunicação carregada de emoção. Intelecto intuitivo e flutuante. Forte ligação com irmãos e ambiente imediato como fonte de nutrição.",
        "Casa 4": "A Lua em sua casa natural. Forte apego às raízes, família e lar. Necessidade de um refúgio seguro. Emoções profundas e instinto protetor.",
        "Casa 5": "Emoções expressas através da criatividade, romance e prazer. Necessidade de ser amado e admirado. Forte ligação emocional com os filhos.",
        "Casa 6": "Emoções ligadas à rotina, trabalho e saúde. Necessidade de ser útil. Flutuações na saúde devido ao estado emocional. Sensibilidade a ambientes de trabalho.",
        "Casa 7": "Necessidade emocional de parcerias. Busca segurança nos outros. Reações emocionais dependentes da harmonia nos relacionamentos.",
        "Casa 8": "Emoções profundas, intensas e transformadoras. Forte intuição e interesse pelo oculto. Necessidade de intimidade emocional profunda e segurança em crises.",
        "Casa 9": "Busca de segurança emocional através de filosofias, viagens ou crenças. Necessidade de liberdade intelectual. Emoções expandidas por novos horizontes.",
        "Casa 10": "Vida pública e carreira influenciadas pelas emoções. Reputação ligada à sensibilidade ou cuidado. Necessidade de reconhecimento social para se sentir seguro.",
        "Casa 11": "Necessidade de pertencer a grupos e amizades. Emoções nutridas por ideais coletivos. Popularidade em círculos sociais.",
        "Casa 12": "Emoções subconscientes, secretas ou reprimidas. Grande sensibilidade psíquica. Necessidade de isolamento para processar sentimentos. Conexão espiritual profunda."
    },
    "Mercúrio": {
        "Casa 1": "Mente ágil, comunicativo e curioso. A identidade é expressa através do intelecto e da fala. Adaptabilidade e rapidez de pensamento.",
        "Casa 2": "Foco mental em finanças e valores. Habilidade para negociar e encontrar formas práticas de ganhar dinheiro. Pensamento voltado para a segurança material.",
        "Casa 3": "Comunicação excelente, curiosidade insaciável sobre o ambiente imediato. Mente versátil, interesse em muitos assuntos e facilidade com idiomas.",
        "Casa 4": "Pensamento voltado para assuntos domésticos e raízes. Interesse em história familiar e genealogia. A mente encontra paz no ambiente do lar.",
        "Casa 5": "Criatividade mental, prazer em jogos intelectuais e expressão dramática. Comunicação lúdica e interesse em hobbies que desafiam a mente.",
        "Casa 6": "Mente analítica, focada em detalhes, rotina e trabalho. Habilidade para organizar e resolver problemas práticos. Interesse em saúde e dietas.",
        "Casa 7": "Foco mental em relacionamentos e parcerias. Necessidade de diálogo constante com os outros. Habilidade diplomática e busca de equilíbrio.",
        "Casa 8": "Mente investigativa, profunda e voltada para mistérios. Interesse em psicologia, ocultismo e finanças compartilhadas. Fala estratégica e penetrante.",
        "Casa 9": "Interesse em filosofia, religião e viagens longas. Busca de conhecimento superior e compreensão de leis universais. Mente aberta e expansiva.",
        "Casa 10": "Carreira ligada à comunicação, escrita ou intelecto. Foco mental na reputação e objetivos de vida. Habilidade para falar em público.",
        "Casa 11": "Pensamento voltado para ideais sociais e grupos. Interesse em tecnologia, inovação e amizades intelectuais. Troca de ideias em coletivos.",
        "Casa 12": "Mente intuitiva, voltada para o subconsciente e espiritualidade. Pensamento reservado, interesse em sonhos e no que está oculto. Comunicação sutil."
    },
    "Vênus": {
        "Casa 1": "Charme, beleza e diplomacia na personalidade. Busca de harmonia e estética na autoimagem. Pessoa atraente e que valoriza a paz.",
        "Casa 2": "Amor pelo conforto material e luxo. Habilidade para atrair dinheiro. Valoriza a segurança e as posses como forma de prazer.",
        "Casa 3": "Comunicação gentil e harmoniosa. Amor pelo aprendizado e ambiente imediato. Facilidade em lidar com irmãos e vizinhos de forma diplomática.",
        "Casa 4": "Amor pelo lar e pela família. Busca de harmonia e beleza no ambiente doméstico. Necessidade de um refúgio acolhedor e estético.",
        "Casa 5": "Prazer na criatividade, romance e diversão. Natureza afetuosa, amor por crianças e hobbies artísticos. Busca de alegria constante.",
        "Casa 6": "Busca de harmonia no ambiente de trabalho e na rotina. Valoriza o serviço e a cooperação. Interesse em beleza ligada à saúde e bem-estar.",
        "Casa 7": "Foco em relacionamentos e casamento. Busca de um parceiro ideal e harmonioso. Habilidade para mediar conflitos e criar parcerias equilibradas.",
        "Casa 8": "Intensidade emocional nos relacionamentos. Atração por mistérios e profundidade. Valoriza a intimidade profunda e os recursos compartilhados.",
        "Casa 9": "Amor por viagens, culturas estrangeiras e filosofia. Busca de prazer em experiências que expandem a mente. Atração por pessoas de origens diferentes.",
        "Casa 10": "Sucesso e charme na carreira. Reputação ligada à diplomacia e beleza. Atração de oportunidades profissionais através de contatos sociais.",
        "Casa 11": "Amor pelas amizades e grupos sociais. Busca de harmonia em contextos coletivos. Valoriza ideais humanitários e conexões sociais leves.",
        "Casa 12": "Amor secreto ou espiritual. Busca de prazer na solidão e no misticismo. Compaixão profunda e sacrifício por amor."
    },
    "Marte": {
        "Casa 1": "Energia, coragem e iniciativa. Personalidade assertiva, competitiva e direta. Forte impulso de ação e liderança física.",
        "Casa 2": "Esforço intenso para ganhar dinheiro e adquirir posses. Impulsividade nos gastos. Defesa vigorosa dos próprios valores e recursos.",
        "Casa 3": "Comunicação assertiva, às vezes agressiva. Mente inquieta e competitiva. Muita energia gasta em viagens curtas e trocas intelectuais.",
        "Casa 4": "Energia voltada para o lar e a família. Pode haver conflitos domésticos ou muita atividade em casa. Forte instinto de proteção das raízes.",
        "Casa 5": "Paixão na criatividade, esportes e romance. Natureza competitiva no lazer. Energia intensa voltada para o prazer e a autoexpressão.",
        "Casa 6": "Muito trabalho e energia na rotina. Pode ser exigente ou competitivo no ambiente profissional. Foco em atividade física e saúde.",
        "Casa 7": "Energia voltada para relacionamentos e parcerias. Pode indicar conflitos ou parcerias muito dinâmicas. Atração por pessoas ativas.",
        "Casa 8": "Intensidade nas crises, finanças e intimidade. Forte desejo sexual e poder de transformação. Energia voltada para investigar o que está oculto.",
        "Casa 9": "Entusiasmo por crenças, viagens e estudos superiores. Defesa vigorosa de ideais. Energia gasta na busca de novos horizontes e verdades.",
        "Casa 10": "Ambição intensa e energia na carreira. Busca de autoridade e sucesso. Pode haver conflitos com figuras de autoridade ou muita competitividade.",
        "Casa 11": "Energia voltada para grupos, causas sociais e amigos. Liderança em coletivos. Esforço para realizar planos e ideais para o futuro.",
        "Casa 12": "Energia voltada para o subconsciente ou agindo nos bastidores. Ação oculta ou reprimida. Pode indicar batalhas espirituais ou trabalho solitário."
    },
    "Júpiter": {
        "Casa 1": "Otimismo, confiança e expansão da personalidade. Sorte pessoal e visão ampla da vida. Tendência à generosidade e ao crescimento físico ou de caráter.",
        "Casa 2": "Expansão financeira e abundância material. Sorte com recursos e valores. Visão otimista sobre o dinheiro e facilidade em atrair prosperidade.",
        "Casa 3": "Mente aberta, sede de conhecimento e excelente comunicação. Sorte em viagens curtas e relações com irmãos. Habilidade para ensinar e aprender.",
        "Casa 4": "Felicidade e proteção no lar e na família. Expansão das raízes e conforto doméstico. Pode indicar uma família grande ou propriedades espaçosas.",
        "Casa 5": "Grande criatividade, sorte no amor e com filhos. Prazer em viver, entusiasmo por hobbies e esportes. Natureza lúdica e generosa.",
        "Casa 6": "Sorte e crescimento no trabalho e na saúde. Atitude positiva na rotina e no serviço aos outros. Habilidade para melhorar processos e ambientes.",
        "Casa 7": "Benefícios através de parcerias e casamento. Atração de parceiros generosos e sábios. Sucesso em questões legais e sociais.",
        "Casa 8": "Proteção em crises e ganhos através de outros (heranças, parcerias). Profunda compreensão dos mistérios da vida e transformação positiva.",
        "Casa 9": "O posicionamento ideal. Grande sabedoria, amor por viagens longas, filosofia e espiritualidade. Sucesso no ensino superior e visão profética.",
        "Casa 10": "Sucesso profissional, prestígio e reconhecimento social. Carreira em expansão e facilidade em lidar com figuras de autoridade. Ambição ética.",
        "Casa 11": "Muitas amizades, proteção de grupos e realização de ideais. Visão humanitária e sorte em projetos coletivos para o futuro.",
        "Casa 12": "Proteção espiritual e 'anjo da guarda' em momentos difíceis. Grande compaixão, sabedoria interior e sucesso em trabalhos de bastidores ou caridade."
    },
    "Saturno": {
        "Casa 1": "Personalidade séria, disciplinada e reservada. Senso de responsabilidade precoce. Necessidade de construir uma identidade sólida através do esforço.",
        "Casa 2": "Necessidade de segurança material através do trabalho duro. Prudência financeira, medo da escassez e construção lenta de valores sólidos.",
        "Casa 3": "Mente estruturada, pensamento lógico e cautela na fala. Dificuldades iniciais no aprendizado ou na comunicação que levam à maestria posterior.",
        "Casa 4": "Responsabilidades familiares pesadas ou raízes rígidas. Necessidade de construir uma base emocional sólida. Foco na segurança do lar.",
        "Casa 5": "Bloqueios na expressão criativa ou no lazer que exigem disciplina. Seriedade no amor e com filhos. Criatividade que exige técnica e tempo.",
        "Casa 6": "Muita responsabilidade e disciplina no trabalho e na saúde. Rotina rigorosa, foco no dever e necessidade de organização impecável.",
        "Casa 7": "Seriedade e compromisso nos relacionamentos. Pode indicar casamentos tardios ou com pessoas mais velhas. Necessidade de estrutura nas parcerias.",
        "Casa 8": "Responsabilidade com recursos alheios e finanças compartilhadas. Seriedade diante da morte e transformação. Necessidade de controle emocional.",
        "Casa 9": "Busca de verdade através de sistemas estruturados (lei, religião, ciência). Viagens longas com propósito prático. Sabedoria adquirida pelo tempo.",
        "Casa 10": "Ambição disciplinada, sucesso conquistado pelo esforço e tempo. Grande senso de dever público e reputação sólida construída com rigor.",
        "Casa 11": "Poucas e sólidas amizades. Responsabilidade em grupos e projetos sociais. Foco em objetivos de longo prazo e ideais realistas.",
        "Casa 12": "Necessidade de estruturar o subconsciente. Medos ocultos que exigem disciplina espiritual. Trabalho solitário e sério nos bastidores."
    },
    "Urano": {
        "Casa 1": "Personalidade excêntrica, original e independente. Necessidade de liberdade absoluta. Mudanças súbitas na autoimagem e comportamento rebelde.",
        "Casa 2": "Flutuações financeiras inesperadas. Valores originais e formas não convencionais de ganhar dinheiro. Desapego das posses materiais tradicionais.",
        "Casa 3": "Mente brilhante, inventiva e comunicação elétrica. Ideias súbitas, interesse por tecnologia e mudanças constantes no ambiente imediato.",
        "Casa 4": "Vida doméstica instável ou não convencional. Mudanças frequentes de residência. Necessidade de liberdade dentro da família e do lar.",
        "Casa 5": "Criatividade explosiva, romances súbitos e abordagens originais com filhos. Prazer em quebrar regras e hobbies tecnológicos ou vanguardistas.",
        "Casa 6": "Necessidade de liberdade na rotina e no trabalho. Habilidade com tecnologia e métodos inovadores. Saúde sensível a tensões nervosas.",
        "Casa 7": "Relacionamentos imprevisíveis ou não convencionais. Necessidade de espaço nas parcerias. Atração por pessoas originais e independentes.",
        "Casa 8": "Mudanças súbitas em finanças compartilhadas. Interesse profundo em ocultismo e tecnologia. Experiências transformadoras inesperadas.",
        "Casa 9": "Filosofias revolucionárias, interesse por astrologia e viagens súbitas. Busca de verdades não convencionais e liberdade intelectual.",
        "Casa 10": "Carreira original, mudanças súbitas de status e reputação de rebelde ou inovador. Sucesso em áreas tecnológicas ou de vanguarda.",
        "Casa 11": "Amizades excêntricas e grupos revolucionários. Ideais sociais avançados e participação em causas humanitárias inovadoras.",
        "Casa 12": "Intuição súbita, sonhos vívidos e despertar espiritual inesperado. Necessidade de liberdade interior e quebra de padrões subconscientes."
    },
    "Netuno": {
        "Casa 1": "Personalidade sonhadora, sensível e camaleônica. Identidade fluida e aura de mistério. Tendência à confusão ou à grande inspiração artística.",
        "Casa 2": "Confusão ou idealismo em relação ao dinheiro. Valores espirituais acima dos materiais. Risco de enganos financeiros ou ganhos através da arte.",
        "Casa 3": "Mente intuitiva, poética e comunicação sutil. Imaginação fértil, mas tendência à dispersão mental. Conexão psíquica com o ambiente.",
        "Casa 4": "Atmosfera mística ou confusa no lar. Idealização da família ou das raízes. Necessidade de um refúgio sagrado e pacífico.",
        "Casa 5": "Romantismo idealizado, criatividade inspirada e amor por artes. Sacrifício por filhos ou romances platônicos. Grande imaginação lúdica.",
        "Casa 6": "Sensibilidade a medicamentos e ambiente de trabalho. Desejo de servir de forma abnegada. Rotina que precisa de inspiração ou espiritualidade.",
        "Casa 7": "Idealização do parceiro, busca de uma alma gêmea. Risco de desilusões em relacionamentos ou parcerias baseadas em compaixão.",
        "Casa 8": "Conexão psíquica profunda com os outros. Mistério em finanças compartilhadas. Experiências espirituais através da transformação e intimidade.",
        "Casa 9": "Busca de espiritualidade universal, amor pelo misticismo e viagens de peregrinação. Filosofia baseada na fé e na intuição.",
        "Casa 10": "Carreira ligada às artes, cura ou espiritualidade. Reputação inspiradora, mas às vezes indefinida. Sucesso em áreas de bastidores.",
        "Casa 11": "Amizades espirituais ou idealizadas. Participação em grupos humanitários ou artísticos. Ideais sociais baseados na compaixão universal.",
        "Casa 12": "O posicionamento mais forte. Profunda conexão com o inconsciente coletivo, mediunidade e misticismo. Dissolução do ego em prol do espiritual."
    },
    "Plutão": {
        "Casa 1": "Personalidade intensa, magnética e poderosa. Necessidade de transformação constante da identidade. Presença marcante e regeneração pessoal.",
        "Casa 2": "Obsessão por segurança material e poder financeiro. Transformações profundas nos valores. Habilidade para regenerar recursos e finanças.",
        "Casa 3": "Mente investigativa, fala poderosa e penetrante. Segredos no ambiente imediato. Comunicação que busca a verdade profunda e oculta.",
        "Casa 4": "Transformações profundas nas raízes e na família. Poder ou segredos domésticos. Necessidade de regeneração emocional na base da vida.",
        "Casa 5": "Intensidade no amor, criatividade poderosa e obsessão por hobbies ou filhos. Desejo de controle ou transformação através do prazer.",
        "Casa 6": "Transformação profunda através do trabalho e da rotina. Poder de cura e regeneração física. Obsessão pela eficiência e pelo serviço.",
        "Casa 7": "Relacionamentos intensos e transformadores. Lutas de poder em parcerias ou encontros com pessoas magnéticas. Renascimento através do outro.",
        "Casa 8": "O posicionamento natural. Poder absoluto sobre crises, finanças e mistérios. Profunda capacidade de regeneração e interesse no oculto.",
        "Casa 9": "Fanatismo ou transformação através de crenças. Busca obsessiva pela verdade e sabedoria. Viagens que alteram profundamente a visão de mundo.",
        "Casa 10": "Ambição de poder, carreira transformadora e reputação intensa. Sucesso que exige renascimento total. Impacto profundo na sociedade.",
        "Casa 11": "Amizades poderosas e grupos transformadores. Obsessão por ideais sociais e poder dentro de coletivos. Mudança radical de círculos sociais.",
        "Casa 12": "Batalhas subconscientes intensas, segredos profundos e poder espiritual oculto. Necessidade de purificação e regeneração da alma."
    }
};

export const ASPECTS: Record<string, AspectInterpretation> = {
    "Conjunção": {
        "natureza": "Neutra/União",
        "Sol_Lua": "Identidade e emoção alinhadas. Você é autêntico, consciente emocional, intuição apoiada pela vontade. Sombra: subjetividade excessiva, não enxergar próprias sombras. Cura: integração mente-coração natural.",
        "Sol_Mercúrio": "Mente e vontade unidas. Pensamento decidido, comunicação autoritária, inteligência focada. Sombra: opinião como verdade absoluta, dificuldade de ouvir. Cura: palavras como extensão da alma.",
        "Sol_Vênus": "Amor e identidade fundidos. Carisma magnético, criatividade estética, capacidade de amar sendo si mesmo. Sombra: vaidade, necessidade de ser amado para existir. Cura: autoamor que irradia.",
        "Sol_Marte": "Ação e vontade potentes. Energia física abundante, coragem natural, liderança dinâmica. Sombra: impulsividade, agressão, ego ferido. Cura: ação consciente guiada pelo brilho interior.",
        "Lua_Mercúrio": "Mente emocional, memória afetiva. Inteligência intuitiva, comunicação que cuida, palavras que nutrem. Sombra: racionalização emocional, mudanças constantes de opinião. Cura: pensar com o coração sábio.",
        "Lua_Vênus": "Afeto e emoção harmonizados. Doçura natural, mãe amorosa, criatividade sentimental. Sombra: dependência emocional, amor como necessidade. Cura: emoção que belamente flui.",
        "Vênus_Marte": "Amor e desejo unidos. Atração magnética, arte apaixonada, sexualidade criativa. Sombra: conflito amor-sexo, ciúme dramático. Cura: paixão que cria beleza."
    },
    "Oposição": {
        "natureza": "Tensa/Equilíbrio",
        "Sol_Lua": "Conflito identidade-emocional. O que você quer (Sol) versus o que você precisa (Lua). Relacionamentos como campo de batalha interior. Cura: honrar ambos sem escolher um só lado.",
        "Sol_Saturno": "Autoridade versus limitação. Pai severo interno, medo de brilhar, sucesso tardio. Você se sabota ou se impõe demais. Cura: disciplina que constrói o brilho, não apaga.",
        "Lua_Saturno": "Necessidade versus dever. Emoções reprimidas, mãe distante, carência estruturada. Dificuldade de nutrir e ser nutrido. Cura: estruturar emoções sem congelá-las.",
        "Vênus_Marte": "Amor versus desejo. Atrai parceiros que representam o oposto do que você sente. Conflito romântico-sexual. Cura: integrar receptividade e iniciativa.",
        "Júpiter_Saturno": "Expansão versus contração. Otimismo pessimismo em guerra. Oportunidades que exigem responsabilidade. Cura: crescimento sustentável, limites que expandem."
    },
    "Trígono": {
        "natureza": "Harmônica/Fluxo",
        "Sol_Júpiter": "Confiança abençoada. Otimismo natural, sorte na expansão, liderança inspiradora. Talento para visão ampla. Cura: usar a sorte para beneficiar outros.",
        "Sol_Urano": "Originalidade confiante. Brilho único, liderança inovadora, autenticidade radical. Gênio natural. Cura: originalidade que liberta, não isola.",
        "Lua_Júpiter": "Generosidade emocional. Bem-estar nuturador, intuição expansiva, família abençoada. Coração grande. Cura: cuidar sem sufocar, nutrir com sabedoria.",
        "Lua_Netuno": "Intuição psíquica. Empatia profunda, imaginação fértil, conexão espiritual emocional. Cura: sentimentos como ponte para o sagrado, sem perder limites.",
        "Vênus_Júpiter": "Benevolência amorosa. Generosidade afetiva, sorte em relacionamentos, arte abundante. Cura: amor que expande, posse que liberta.",
        "Mercúrio_Júpiter": "Mente visionária. Pensamento filosófico, comunicação inspiradora, aprendizado fácil. Cura: ideias que elevam a humanidade.",
        "Marte_Júpiter": "Ação corajosa. Energia para conquistar, justiço ativa, esportes de aventura. Cura: coragem que protege os fracos."
    },
    "Quadratura": {
        "natureza": "Tensa/Desafio",
        "Sol_Marte": "Voluntariedade conflituosa. Impaciência, competição excessiva, raiva mal direcionada. Energia que explode. Cura: canalizar ação para objetivos claros, não guerra.",
        "Sol_Saturno": "Autoconfiança testada. Medo de falhar, autoritarismo defensivo, karma do pai. Restrições ao brilho. Cura: construir autoestima pedra sobre pedra.",
        "Lua_Marte": "Emotividade explosiva. Irritabilidade, reação exagerada, conflitos familiares. Coração que sangra raiva. Cura: defender emoções sem destruir.",
        "Lua_Saturno": "Frieza emocional. Carência cronificada, dificuldade de demonstrar afeto, mãe problemática. Cura: estruturar sem endurecer.",
        "Mercúrio_Saturno": "Mente pessimista. Pensamento lento mas profundo, autocrítica severa, comunicação reprimida. Cura: disciplina mental que refina, não limita.",
        "Vênus_Saturno": "Amor que exige tempo. Atrasos no casamento, relacionamentos kármicos, frieza afetiva. Cura: amor construído, não imposto.",
        "Marte_Saturno": "Ação bloqueada. Frustração, medo de agir, trabalho escravo ou rebeldia reprimida. Cura: paciência na conquista, disciplina na ação."
    },
    "Sextil": {
        "natureza": "Harmônica/Oportunidade",
        "Sol_Lua": "Harmonia consciente entre querer e sentir. Oportunidade de autenticidade emocional. Cura: integrar vontade e necessidade com graça.",
        "Sol_Mercúrio": "Inteligência aplicada. Oportunidade de comunicar identidade, escrever, ensinar. Cura: pensar sobre quem você é.",
        "Sol_Vênus": "Criatividade social. Oportunidade de charme natural, arte, relacionamentos leves. Cura: ser amado por quem você é.",
        "Sol_Marte": "Ação assertiva. Oportunidade de coragem equilibrada, liderança dinâmica. Cura: agir com confiança.",
        "Lua_Vênus": "Afeto harmonioso. Oportunidade de criar beleza emocional, relacionamentos nutritivos. Cura: amar com doçura.",
        "Lua_Marte": "Defesa emocional. Oportunidade de proteger quem ama, coragem maternal/paternal. Cura: agir guiado pelo coração.",
        "Mercúrio_Vênus": "Palavras harmoniosas. Oportunidade de diplomacia, escrita bela, negociação. Cura: falar com beleza.",
        "Mercúrio_Marte": "Pensamento estratégico. Oportunidade de debate construtivo, escrita persuasiva. Cura: comunicação que convence."
    }
};

export const NODES_INTERPRETATION: Record<string, string> = {
    "Áries (Sul em Libra)": "Desenvolver independência, coragem e autoafirmação. Superar a dependência excessiva de parcerias e o medo de conflitos.",
    "Touro (Sul em Escorpião)": "Construir estabilidade, valores próprios e paz. Superar crises constantes, dramas emocionais e obsessões.",
    "Gêmeos (Sul em Sagitário)": "Focar em fatos, comunicação clara e curiosidade local. Superar o dogmatismo, o excesso de teoria e a arrogância intelectual.",
    "Câncer (Sul em Capricórnio)": "Cultivar a sensibilidade, o cuidado e a vida emocional. Superar a rigidez, o foco excessivo no status e a frieza profissional.",
    "Leão (Sul em Aquário)": "Brilhar individualmente, usar a criatividade e o coração. Superar o desapego excessivo, o desejo de apenas pertencer a grupos e o intelectualismo frio.",
    "Virgem (Sul em Peixes)": "Desenvolver organização, discernimento e utilidade prática. Superar o escapismo, a confusão emocional e o papel de vítima.",
    "Libra (Sul em Áries)": "Aprender a cooperar, buscar equilíbrio e diplomacia. Superar o egoísmo, a impaciência e a agressividade desnecessária.",
    "Escorpião (Sul em Touro)": "Buscar transformação profunda, intimidade e regeneração. Superar o apego excessivo à matéria, o medo de mudanças e a teimosia.",
    "Sagitário (Sul em Gêmeos)": "Buscar significado, filosofia e visão ampla. Superar a superficialidade, a dispersão mental e a fofoca.",
    "Capricórnio (Sul em Câncer)": "Construir estrutura, maturidade e autoridade. Superar a dependência emocional infantil e a insegurança doméstica.",
    "Aquário (Sul em Leão)": "Focar no coletivo, na inovação e na amizade. Superar o desejo de ser o centro das atenções e o orgulho pessoal excessivo.",
    "Peixes (Sul em Virgem)": "Desenvolver compaixão, espiritualidade e entrega. Superar o perfeccionismo excessivo, a crítica constante e a obsessão por detalhes.",

    // Casas
    "Casa 1 (Sul na 7)": "Focar em si mesmo, na sua identidade e iniciativa pessoal.",
    "Casa 2 (Sul na 8)": "Desenvolver seus próprios recursos e valores financeiros.",
    "Casa 3 (Sul na 9)": "Focar no aprendizado prático, na comunicação e no ambiente imediato.",
    "Casa 4 (Sul na 10)": "Focar na vida privada, no lar e nas bases emocionais.",
    "Casa 5 (Sul na 11)": "Desenvolver a criatividade pessoal, romances e a alegria de viver.",
    "Casa 6 (Sul na 12)": "Focar na rotina, no trabalho útil e na saúde física.",
    "Casa 7 (Sul na 1)": "Aprender a compartilhar e focar nos relacionamentos e parcerias.",
    "Casa 8 (Sul na 2)": "Desenvolver a intimidade profunda e lidar com recursos compartilhados.",
    "Casa 9 (Sul na 3)": "Buscar conhecimentos superiores, viagens e expansão da consciência.",
    "Casa 10 (Sul na 4)": "Focar na carreira, na reputação e nos objetivos públicos.",
    "Casa 11 (Sul na 5)": "Desenvolver projetos coletivos, amizades e ideais sociais.",
    "Casa 12 (Sul na 6)": "Buscar o autoconhecimento, a espiritualidade e o retiro interior."
};

export const SENSITIVE_POINTS: Record<string, Record<string, string>> = {
    "Quíron": {
        "Áries": "Ferida na identidade e no direito de existir. Cura através da autoafirmação.",
        "Touro": "Ferida no valor próprio e segurança material. Cura através da estabilidade interior.",
        "Gêmeos": "Ferida na comunicação e intelecto. Cura através da expressão autêntica.",
        "Câncer": "Ferida no pertencimento e nutrição emocional. Cura através da autocuidado.",
        "Leão": "Ferida na criatividade e no brilho pessoal. Cura através da autoexpressão generosa.",
        "Virgem": "Ferida na saúde e na sensação de imperfeição. Cura através do serviço humilde.",
        "Libra": "Ferida nos relacionamentos e parcerias. Cura através do equilíbrio e justiça.",
        "Escorpião": "Ferida na intimidade e poder. Cura através da transformação e desapego.",
        "Sagitário": "Ferida no sentido da vida e crenças. Cura através da busca pela verdade.",
        "Capricórnio": "Ferida na autoridade e sucesso. Cura através da responsabilidade madura.",
        "Aquário": "Ferida no pertencimento social. Cura através da inovação e humanitarismo.",
        "Peixes": "Ferida na conexão espiritual. Cura através da compaixão e entrega universal.",
        // Casas
        "Casa 1": "Ferida na aparência física ou iniciativa.",
        "Casa 2": "Ferida nas finanças ou talentos pessoais.",
        "Casa 3": "Ferida na fala ou relação com irmãos.",
        "Casa 4": "Ferida nas raízes familiares ou base emocional.",
        "Casa 5": "Ferida no amor, prazer ou relação com filhos.",
        "Casa 6": "Ferida no trabalho cotidiano ou saúde física.",
        "Casa 7": "Ferida no casamento ou parcerias próximas.",
        "Casa 8": "Ferida na sexualidade, perdas ou recursos alheios.",
        "Casa 9": "Ferida na educação superior ou visão de mundo.",
        "Casa 10": "Ferida na carreira ou imagem pública.",
        "Casa 11": "Ferida nas amizades ou ideais coletivos.",
        "Casa 12": "Ferida no subconsciente ou isolamento espiritual."
    },
    "Lilith": {
        "Áries": "Independência feroz e competitividade extrema.",
        "Touro": "Desejo intenso de segurança ou rebeldia contra posses.",
        "Gêmeos": "Curiosidade proibida e comunicação provocadora.",
        "Câncer": "Rebeldia contra padrões familiares tradicionais.",
        "Leão": "Necessidade visceral de reconhecimento e brilho autônomo.",
        "Virgem": "Obsessão por pureza ou rebeldia contra a rotina.",
        "Libra": "Busca por justiça absoluta ou conflitos em parcerias.",
        "Escorpião": "Intensidade sexual e poder de destruição/renascimento.",
        "Sagitário": "Busca por liberdade total e verdades cruas.",
        "Capricórnio": "Ambição implacável e desdém por autoridades frágeis.",
        "Aquário": "Originalidade radical e desapego social extremo.",
        "Peixes": "Misticismo profundo ou escapismo da realidade.",
        // Casas
        "Casa 1": "Personalidade magnética e desafiadora.",
        "Casa 2": "Relação intensa e complexa com o dinheiro.",
        "Casa 3": "Mente inquieta e palavras que cortam.",
        "Casa 4": "Segredos ou tensões profundas no lar.",
        "Casa 5": "Paixões arrebatadoras e criatividade indomável.",
        "Casa 6": "Dificuldade com subordinação no trabalho.",
        "Casa 7": "Atração por parceiros proibidos ou intensos.",
        "Casa 8": "Poder oculto e obsessões transformadoras.",
        "Casa 9": "Desafios às crenças estabelecidas.",
        "Casa 10": "Reputação controversa e busca por poder.",
        "Casa 11": "Amizades intensas ou isolamento social.",
        "Casa 12": "Batalhas espirituais e sonhos poderosos."
    },
    "Parte da Fortuna": {
        "Áries": "Alegria através da iniciativa e coragem.",
        "Touro": "Alegria através da estabilidade e prazeres sensoriais.",
        "Gêmeos": "Alegria através da troca de ideias e conhecimento.",
        "Câncer": "Alegria através da família e nutrição emocional.",
        "Leão": "Alegria através da autoexpressão e reconhecimento.",
        "Virgem": "Alegria através do trabalho bem feito e organização.",
        "Libra": "Alegria através da harmonia e relacionamentos.",
        "Escorpião": "Alegria através da profundidade e transformação.",
        "Sagitário": "Alegria através da liberdade e expansão.",
        "Capricórnio": "Alegria através da realização e estrutura.",
        "Aquário": "Alegria através da inovação e amizades.",
        "Peixes": "Alegria através da espiritualidade e compaixão.",
        // Casas
        "Casa 1": "Prosperidade através do esforço pessoal.",
        "Casa 2": "Prosperidade através de recursos materiais.",
        "Casa 3": "Prosperidade através da comunicação e estudos.",
        "Casa 4": "Prosperidade através do lar e raízes.",
        "Casa 5": "Prosperidade através da criatividade e filhos.",
        "Casa 6": "Prosperidade através do serviço e saúde.",
        "Casa 7": "Prosperidade através de parcerias e casamento.",
        "Casa 8": "Prosperidade através de recursos compartilhados.",
        "Casa 9": "Prosperidade através de viagens e sabedoria.",
        "Casa 10": "Prosperidade através da carreira e status.",
        "Casa 11": "Prosperidade através de amigos e grupos.",
        "Casa 12": "Prosperidade através do misticismo e isolamento."
    }
};

export const DIGNITY_TEXTS = {
    "domicílio": "Seu [PLANETA] está em casa. Esta energia flui naturalmente através de você, é um dom que você deve honrar e compartilhar.",
    "exaltação": "Seu [PLANETA] está em exaltação. Esta é uma energia elevada, nobre, que brilha de forma especial em você.",
    "queda": "Seu [PLANETA] está em queda. Você aprende esta energia 'ao contrário', através de dificuldades iniciais. Pode haver insegurança ou exagero compensatório.",
    "detrimento": "Seu [PLANETA] está em detrimento. Esta é sua área de maior crescimento. Você aprende através da falta ou do desafio."
};
