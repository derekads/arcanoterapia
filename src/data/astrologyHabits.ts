export interface HabitInspection {
    trigger?: string;
    practice?: string;
    duration?: string;
    action?: string;
    inspection_point?: string;
    stack?: string;
    metric?: string;

    // Nodes have different properties
    evolution_path?: string;
    release?: string;
}

export const astrologyHabits: Record<string, HabitInspection> = {
    // LOTE 1: SOL (Identidade Core)
    "sun_aries": {
        "trigger": "Ao acordar, antes de pegar o celular",
        "practice": "Protocolo Pausa de Fogo",
        "duration": "21 dias",
        "action": "Antes de qualquer reação impulsiva (mensagem, decisão, palavra), faça marcação mental: 'Ponto de Ignição'. Respire 3x. Registre no caderno: 'O que queria fazer vs O que fiz depois da pausa'",
        "inspection_point": "Observar quantas vezes por dia seu impulso queria destruir ou iniciar algo abrupto. Padrão de urgência.",
        "stack": "Acoplar à escovação dos dentes da manhã (mentalidade de 'limpar' o impulso)",
        "metric": "Redução de 50% nas 'mensagens de arrependimento' enviadas"
    },
    "sun_taurus": {
        "trigger": "Sempre que sentir resistência a mudança",
        "practice": "Diário da Flexibilidade Micro",
        "duration": "Contínuo",
        "action": "Todo dia, mude UMA coisa pequena da rotina (caminho diferente, comida nova, ordem diferente). Anote a sensação física da resistência (onde sente no corpo?) e o resultado após a mudança.",
        "inspection_point": "Mapear o 'ponto de travamento' físico. Onde exatamente você segura a teimosia no corpo?",
        "stack": "Antes do almoço (momento de escolha alimentar)",
        "metric": "Capacidade de mudar planos sem ansiedade física em 48h"
    },
    "sun_gemini": {
        "trigger": "Ao notar que já mudou de assunto 3x numa conversa",
        "practice": "Rastreador de Profundidade",
        "duration": "7 dias (ciclo de atenção)",
        "action": "Carregue contador manual (ou app). Cada vez que dispersar antes de terminar, marque. No fim do dia, anote: 'Em que assunto eu estava quando escapei? O que sentia?'",
        "inspection_point": "Padrão de fuga - o que você evita sentir quando dispersa? Tédio? Vulnerabilidade?",
        "stack": "Sempre que pegar o celular para 'dar uma olhada' (antes, respire)",
        "metric": "Aumento de 20% no tempo de foco num único assunto"
    },
    "sun_cancer": {
        "trigger": "Sempre que for cuidar de alguém ou sentir mudança de humor",
        "practice": "Check-in Maternal Inverso",
        "duration": "Contínuo",
        "action": "Antes de perguntar 'Você precisa de algo?', pergunte a si: 'O que EU preciso agora?' Registro noturno: 'Quantas vezes cuidei de mim antes de cuidar do outro hoje?'",
        "inspection_point": "Codependência - onde seu humor é realmente seu e onde é espelho do outro?",
        "stack": "Ao lavar as mãos (higiene emocional)",
        "metric": "Identificar 3 sentimentos PRÓPRIOS por dia (não empatia)"
    },
    "sun_leo": {
        "trigger": "Quando notar necessidade de aplauso ou reconhecimento",
        "practice": "Registro Silencioso",
        "duration": "30 dias (um ciclo lunar de ego)",
        "action": "Faça algo bom (elogio, trabalho, gentileza) e PROÍBA-SE de contar ou postar. Anote no caderno privado apenas: 'Fiz X. Como me sinto sem validação externa?'",
        "inspection_point": "Dependência química de dopamina externa. Quanto tempo aguenta sem ser visto?",
        "stack": "Antes de postar qualquer coisa (pause e pergunte: 'Isso é para mim ou para os outros?')",
        "metric": "Capacidade de realizar 3 atos significativos por semana sem compartilhar"
    },
    "sun_virgo": {
        "trigger": "Ao notar autocorrecção ou crítica mental",
        "practice": "Diário da Imperfeição Proposital",
        "duration": "21 dias",
        "action": "Todo dia, deixe UMA coisa deliberadamente imperfeita (arranhão no carro não pintado, e-mail sem revisar, comida sem foto). Anote a ansiedade (0-10) antes e 1h depois.",
        "inspection_point": "Tolerância à desordem. O que acontece se o mundo não for corrigido?",
        "stack": "Final do expediente (deixar algo na mesa não arrumado)",
        "metric": "Redução da ansiedade basal em 30% ao aceitar 'bom o suficiente'"
    },
    "sun_libra": {
        "trigger": "Quando solicitado a tomar decisão",
        "practice": "Isolamento Decisório",
        "duration": "14 dias",
        "action": "Decisões menores (o que comer, qual caminho) por 48h SEM consultar ninguém. Registro: 'O que escolhi? Como me senti depois? A culpa veio de onde?'",
        "inspection_point": "Padrão de delegação de autoria. Quem você espera aprovar sua escolha?",
        "stack": "Antes de enviar mensagem perguntando opinião (escreva, não envie, espere 2h)",
        "metric": "Tomar 5 decisões médias sozinho sem pós-arrependimento"
    },
    "sun_scorpio": {
        "trigger": "Ao sentir necessidade de investigar/controlar",
        "practice": "Janela da Confiança Cega",
        "duration": "7 dias (teste de estresse)",
        "action": "Escolha uma pessoa próxima. Por 7 dias, NÃO verifique nada sobre ela (celular, histórico, horários). Registre: 'O que queria investigar? Que medo eu teria se não soubesse?'",
        "inspection_point": "Ilusão de controle. O que você pensa que controlando evita?",
        "stack": "Quando pegar celular para 'dar uma olhada' em alguém",
        "metric": "Capacidade de estar na incerteza sem compulsão de verificação"
    },
    "sun_sagittarius": {
        "trigger": "Quando sentir vontade de fugir/novidade",
        "practice": "Escavação do Presente",
        "duration": "Contínuo",
        "action": "Quando quiser viajar/mudar/novidade, force-se a ficar 72h no mesmo lugar/situação. Durante isso, liste 3 aventuras internas possíveis (livro novo, conversa profunda, meditação). Registre comparação.",
        "inspection_point": "Fuga como droga. O que você evita sentir no presente concreto?",
        "stack": "Sempre que abrir app de viagem ou compras por tédio",
        "metric": "Extrair satisfação de situação estática por 3 dias seguidos"
    },
    "sun_capricorn": {
        "trigger": "Ao notar culpa por não estar produzindo",
        "practice": "Inutilidade Produtiva",
        "duration": "Domingos completos (1x por semana)",
        "action": "Um dia por semana, proíba-se de qualquer produtividade mensurável. Registre a culpa hora a hora (0-10) e o que a mente tenta 'resgatar' como útil.",
        "inspection_point": "Vício em status. Quem você é sem realização externa?",
        "stack": "Despertador do domingo de manhã (primeiro pensamento é sempre culpa)",
        "metric": "Conseguir um domingo inteiro sem produtividade e sem crise de ansiedade"
    },
    "sun_aquarius": {
        "trigger": "Ao intelectualizar emoção ou sentir distanciamento",
        "practice": "Toque Terreno",
        "duration": "21 dias",
        "action": "3x ao dia, toque fisicamente outra pessoa (mão no ombro, abraço, high-five) com presença total, sem falar teorias. Registre: 'O que senti no corpo? Que teoria queria formular sobre isso?'",
        "inspection_point": "Fuga para mente. Onde você abandona o corpo emocional?",
        "stack": "Antes de explicar psicologicamente o que sente (toque primeiro, fale depois)",
        "metric": "Permanecer em contato físico 5 minutos sem racionalizar a experiência"
    },
    "sun_pisces": {
        "trigger": "Ao notar confusão de limites ou vontade de escapar",
        "practice": "Delimitação Geométrica",
        "duration": "Contínuo",
        "action": "Todo dia, estabeleça UM limite claro (não a um pedido, horário fixo de sono, espaço físico só seu). Desenhe esse limite no caderno. Registre: 'Quem tentou invadir? Como me senti dizendo não?'",
        "inspection_point": "Permeabilidade. Onde exatamente você vaza e mistura com o outro?",
        "stack": "Antes de dormir (revisar onde manteve fronteiras)",
        "metric": "Identificar e manter 3 limites diários sem culpa excessiva"
    },

    // LOTE 2: A LUA (Padrões Emocionais)
    "moon_aries": {
        "trigger": "Quando humor mudar abruptamente",
        "practice": "Mapa de Ignição Emocional",
        "duration": "14 dias",
        "action": "Registro imediato: 'Gatilho (o que aconteceu 10s antes) → Sensação física (onde no corpo) → Reação → Resultado'. Padrão: 3 registros por dia por 14 dias.",
        "inspection_point": "Latência zero. Qual a velocidade entre estímulo e explosão? Existe brecha?",
        "stack": "Ao sentir calor no rosto ou aperto no peito (sinais prévios)",
        "metric": "Aumento de 3 segundos entre gatilho e reação (ganho de controle)"
    },
    "moon_taurus": {
        "trigger": "Ao sentir resistência a mudança ou ciúme",
        "practice": "Inventário de Apego",
        "duration": "Semanal",
        "action": "Liste 3 coisas materiais/rotineiras que tocou hoje. Para cada uma, pergunte: 'Se isso sumisse amanhã, eu sobreviveria? Quem eu seria sem isso?' Registro semanal.",
        "inspection_point": "Identidade fundida ao objeto/rotina. Onde você acaba e o objeto começa?",
        "stack": "Ao pegar objeto de valor emocional (café da manhã, travesseiro)",
        "metric": "Conseguir usar alternativa por 7 dias sem crise de ansiedade"
    },
    "moon_gemini": {
        "trigger": "Quando notar que racionalizou emoção ou mudou de humor com estímulo externo",
        "practice": "Rastreador de Fuga Mental",
        "duration": "Diário",
        "action": "Pause. Pergunte: 'Que emoção estava tentando sentir antes de pensar?' Registro: 'Emoção original → Pensamento substituto → O que evitei sentir?'",
        "inspection_point": "Evitação afetiva. Qual emoção profunda a mente está protegendo?",
        "stack": "Ao notar que já falou 3 frases sem parar (respiração)",
        "metric": "Identificar 1 emoção profunda por dia que a mente tentou racionalizar"
    },
    "moon_cancer": {
        "trigger": "Antes de cuidar de alguém ou ao sentir humor alterado",
        "practice": "Diagnóstico de Origem",
        "duration": "Noturno",
        "action": "Check-in tríplice: 'Esse sentimento é: 1) Meu, 2) Da pessoa com quem estou, ou 3) Da minha mãe/família?' Registro noturno de porcentagens.",
        "inspection_point": "Espelhamento emocional. Quanto do seu humor é realmente seu?",
        "stack": "Ao cozinhar ou arrumar para outros (primeiro: quem precisa disso?)",
        "metric": "50% das ações de cuidado dirigidas a si mesmo antes de outros"
    },
    "moon_leo": {
        "trigger": "Quando criar drama ou sentir invisibilidade",
        "practice": "Observador de Palco",
        "duration": "Contínuo",
        "action": "Registro: 'O que fiz para ser notado? O que senti quando ignorado? E se ninguém visse, esse ato ainda teria valor?' 3 situações por dia.",
        "inspection_point": "Validação externa como combustível. Quanto tempo funciona sem aplauso?",
        "stack": "Antes de postar ou contar conquista (pausa de 2h)",
        "metric": "Realizar 3 atos significativos por semana sem testemunha"
    },
    "moon_virgo": {
        "trigger": "Ao notar autocrítica ou crítica a outros",
        "practice": "Autorrelatório de Crítica",
        "duration": "Contínuo",
        "action": "Contador de críticas diárias. Para cada uma, anote: 'Isso realmente precisa ser corrigido ou é minha ansiedade?' e 'Como me sentiria se aceitasse isso imperfeito?'",
        "inspection_point": "Ansiedade mascarada de perfeccionismo. O que a crítica esconde?",
        "stack": "Ao notar tensão muscular (sinal de rigidez)",
        "metric": "Redução de 50% no número de intervenções corretivas diárias"
    },
    "moon_libra": {
        "trigger": "Toda decisão, por menor que seja",
        "practice": "Diário de Decisão Solo",
        "duration": "7 dias",
        "action": "Proíba-se de consultar opinião externa por 48h. Registro: 'Decisão tomada → Sensação física (ansiedade localizada?) → Fantasia de aprovação (quem eu imaginei concordando?) → Resultado real'",
        "inspection_point": "Projeção da autoridade. De quem você ainda espera aplauso emocional para existir?",
        "stack": "Ao pegar o celular para 'perguntar alguém' (respire e segure por 2h)",
        "metric": "Tomar 3 decisões médias sozinho sem pânico de abandono"
    },
    "moon_scorpio": {
        "trigger": "Ao sentir ciúme, desconfiança ou necessidade de investigar",
        "practice": "Protocolo da Incerteza Ativa",
        "duration": "14 dias (ciclo de detox)",
        "action": "Quando surgir a compulsão de verificar (celular, histórico), escreva: 'O que imagino que vou encontrar? O que provaria sobre mim?'. Aguarde 24h.",
        "inspection_point": "Projeção da traição interna. O que você esconde de si que projeta no outro?",
        "stack": "Ao acordar com pensamento obsessivo (luz vermelha no caderno, não celular)",
        "metric": "Redução de 70% nas verificações compulsivas; tolerar 48h de 'não saber'"
    },
    "moon_sagittarius": {
        "trigger": "Quando humor mudar por estímulo externo novo ou vontade de fugir",
        "practice": "Ancoragem do Horizonte Interno",
        "duration": "Contínuo",
        "action": "Quando quiser mudar de assunto/relacionamento por tédio, force permanência por 72h. Registro: 'O que eu esperava que a mudança resolvesse?'",
        "inspection_point": "Fuga do confronto íntimo. Qual emoção profunda o 'novo' mascara?",
        "stack": "Ao abrir app de viagem ou Insta por tédio (pause, respire 4-7-8)",
        "metric": "Permanecer em situação desconfortável por 5 dias sem buscar distração visual"
    },
    "moon_capricorn": {
        "trigger": "Ao notar frieza emocional ou culpa por 'não estar bem'",
        "practice": "Desmontagem da Armadura",
        "duration": "21 dias",
        "action": "Todo dia, verbalize UMA vulnerabilidade real para alguém seguro. Registro: 'O que eu ganhei sendo fraco hoje?'",
        "inspection_point": "Vergonha da necessidade. Quando você aprendeu que emoção = fraqueza?",
        "stack": "Quando perguntarem 'Como você está?' (pause 3s antes de responder)",
        "metric": "Permitir-se pedir ajuda 1x por semana sem autojustificação"
    },
    "moon_aquarius": {
        "trigger": "Ao sentir desconexão repentina ou observar emoções como espectador",
        "practice": "Reintegração Sensorial",
        "duration": "Contínuo",
        "action": "3x ao dia, toque em objetos com textura diferente e descreva fisicamente. Nomeie a emoção presente sem teorizar.",
        "inspection_point": "Dissociação intelectual. Onde você saiu do corpo para não sentir?",
        "stack": "Ao notar que está 'analisando' a própria emoção (toque físico imediato)",
        "metric": "Identificar 2 emoções corporais por dia sem traduzi-las"
    },
    "moon_pisces": {
        "trigger": "Ao sentir confusão emocional ou dificuldade de separar sentimentos dos outros",
        "practice": "Higiene Energética Diária",
        "duration": "Contínuo",
        "action": "Ao final do dia escreva 'O que sinto agora é meu: ___ / O que absorvi de hoje: ___'. Visualize água escoando emoções alheias.",
        "inspection_point": "Fronteiras porosas. Quem você está carregando dentro de si sem permissão?",
        "stack": "Ao tomar banho noturno (limpeza física = simbólica)",
        "metric": "Identificar 3x ao dia: 'Este sentimento é meu ou estou espelhando?'"
    },

    // LOTE 3: MERCÚRIO (Padrões de Pensamento)
    "mercury_aries": {
        "trigger": "Antes de responder ou interromper alguém",
        "practice": "Gap da Impulsividade Verbal",
        "duration": "21 dias",
        "action": "Conte 5 segundos antes de falar. Registro noturno: 'O que eu queria dizer vs O que disse / Qual era a urgência real?'",
        "inspection_point": "Medo do silêncio. O que acontece se você não ocupar o espaço imediatamente?",
        "stack": "Ao abrir a boca para falar (toque na língua no céu da boca)",
        "metric": "Aumento de 3 segundos no tempo de resposta; redução de interrupções"
    },
    "mercury_taurus": {
        "trigger": "Quando insistir em uma ideia ou resistir a novo dado",
        "practice": "Flexibilidade Cognitiva",
        "duration": "Contínuo",
        "action": "A cada dia, leia/ouça uma opinião oposta sobre algo importante. Registro: 'Qual medo a minha posição antiga protegia?'",
        "inspection_point": "Segurança através da certeza. Quem você é sem opiniões fixas?",
        "stack": "Ao dizer 'Eu sempre faço assim' (pause e questione)",
        "metric": "Mudar de opinião 1x por semana publicamente sem vergonha"
    },
    "mercury_gemini": {
        "trigger": "Ao notar que coletou informações demais sem ação",
        "practice": "Dieta Informativa",
        "duration": "7 dias",
        "action": "Proíba-se de buscar nova informação até aplicar 3 dados já coletados. Registro: 'Por que o 'saber' é mais seguro que o 'fazer'?'",
        "inspection_point": "Procrastinação intelectual. O medo do resultado real.",
        "stack": "Ao abrir aba nova no navegador (feche 2 antes)",
        "metric": "Relação 1:1 entre informação consumida e ação executada"
    },
    "mercury_cancer": {
        "trigger": "Ao usar memórias passadas para justificar o presente",
        "practice": "Atualização de Dados Emocionais",
        "duration": "Contínuo",
        "action": "Quando disser 'Sempre acontece isso', pergunte: 'Quando foi a última vez exata?' Verifique se o padrão é real.",
        "inspection_point": "Memória como prisão. Decide baseado em 5 anos atrás?",
        "stack": "Ao começar frase com 'Eu nunca...' ou 'Eu sempre...'",
        "metric": "Identificar 3 crenças baseadas em memórias obsoletas por mês"
    },
    "mercury_leo": {
        "trigger": "Ao dramatizar narrativas ou centralizar-se nelas",
        "practice": "Narrativa Sutil",
        "duration": "14 dias",
        "action": "Conte uma história sem usar 'eu' como sujeito principal. Ou escute alguém sem preparar sua resposta.",
        "inspection_point": "Mitologia pessoal. O que acontece se você não for o herói da história?",
        "stack": "Antes de contar algo (pergunte: 'Isso educa ou performa?')",
        "metric": "Reduzir referências a si mesmo nas conversas em 40%"
    },
    "mercury_virgo": {
        "trigger": "Ao analisar excessivamente detalhes irrelevantes",
        "practice": "Bom O Suficiente",
        "duration": "21 dias",
        "action": "Entregue um e-mail ou tarefa com 80% da qualidade usual de propósito. Registro: 'A ansiedade durou quanto tempo?'",
        "inspection_point": "Ansiedade de excelência. Evita sentir algo não ocupando a perfeição?",
        "stack": "Ao notar terceira revisão do mesmo texto (enviar imediatamente)",
        "metric": "Redução do tempo de produção mantendo qualidade aceitável"
    },
    "mercury_libra": {
        "trigger": "Ao mudar de opinião para agradar",
        "practice": "Posicionamento Desconfortável",
        "duration": "Contínuo",
        "action": "Mantenha discordância/opinião impopular por 24h sem suavizar. Registro: 'A reação real foi tão ruim quanto imaginei?'",
        "inspection_point": "Medo do abandono intelectual. Existe sem o acordo do outro?",
        "stack": "Ao sentir vontade de dizer 'você tem um ponto' só por paz",
        "metric": "Sustentar discordância saudável em 3 interações semanais"
    },
    "mercury_scorpio": {
        "trigger": "Ao investigar o outro ou ter pensamentos obsessivos",
        "practice": "Transparência Radical",
        "duration": "14 dias",
        "action": "Verbalize sombra: 'Eu estou projetando X porque eu escondo Y'. Registro: 'O que descobri sobre mim investigando o outro?'",
        "inspection_point": "Projeção. O que espiona no outro que nega em si?",
        "stack": "Ao formular teoria sobre alguém (aplique em si primeiro)",
        "metric": "Converter 80% das análises em autoconhecimento"
    },
    "mercury_sagittarius": {
        "trigger": "Ao generalizar ('sempre', 'todos') ou filosofar muito",
        "practice": "Especificidade Forçada",
        "duration": "Contínuo",
        "action": "Proíba-se de abstrações. Use apenas exemplos concretos por 24h. Registro: 'Qual vulnerabilidade a filosofia escondia?'",
        "inspection_point": "O que o 'grandioso' esconde do 'vulnerável'?",
        "stack": "Ao começar frase com 'A vida é...' (traga para 'Eu sinto...')",
        "metric": "Redução de 60% em generalizações"
    },
    "mercury_capricorn": {
        "trigger": "Ao pensar em utilidade fria ou status",
        "practice": "Economia do Significado",
        "duration": "21 dias",
        "action": "Uma vez ao dia, faça algo 'ineficiente' apenas pelo prazer. Registro: 'Quanto tempo levei para relaxar no inútil?'",
        "inspection_point": "Redução de valor à produtividade. Quem é sem produzir?",
        "stack": "Ao calcular 'retorno' de relações (pause)",
        "metric": "Engajar em 5 atividades 'improdutivas' semanais sem culpa"
    },
    "mercury_aquarius": {
        "trigger": "Ao distanciar-se com teorias intelectuais",
        "practice": "Conexão Antes da Ideia",
        "duration": "Contínuo",
        "action": "Antes de falar uma grande ideia abstrata, conecte-se fisicamente ou visualmente (5s). Registro: 'O que senti no corpo?'",
        "inspection_point": "Fuga para a mente. Onde abandonou o coração?",
        "stack": "Ao ter insight (conectar com pessoa primeiro)",
        "metric": "Contato humano antes das comunicações teóricas"
    },
    "mercury_pisces": {
        "trigger": "Confuso entre fatos e intuição",
        "practice": "Clareza Discriminativa",
        "duration": "14 dias",
        "action": "Divida caderno: 'Intuição' vs 'Fatos Verificáveis'. Registro diário. Verificação: 'É verdade ou confortável acreditar?'",
        "inspection_point": "Fusão fantasia/realidade. Enganado por si mesmo?",
        "stack": "Ao dizer 'Sinto que...' sobre fato (verifique dados)",
        "metric": "Distinguir 5x ao dia entre intuição e escapismo"
    },

    // LOTE 4: VÊNUS (Valores, Relacionamentos)
    "venus_aries": {
        "trigger": "Ao sentir atração instantânea ou necessidade de conquistar",
        "practice": "Pausa da Caça",
        "duration": "21 dias",
        "action": "Quando sentir vontade de paquerar/impulsionar, aguarde 48h. Registro: 'Que vazio próprio isso preencheria?'",
        "inspection_point": "O que persegue externamente que fugiu internamente?",
        "stack": "Ao notar aumento cardíaco (respiração 4-7-8)",
        "metric": "Redução em decisões impulsivas"
    },
    "venus_taurus": {
        "trigger": "Ao sentir possessão, ciúme ou apego",
        "practice": "Ritual do Desapego Micro",
        "duration": "Contínuo",
        "action": "Doe um objeto com valor emocional periodicamente. Registro: 'Segurança veio do objeto ou da minha capacidade?'",
        "inspection_point": "Concretização da autoestima. Vale pelo que tem?",
        "stack": "Ao tocar objeto caro (Isso me serve ou eu sirvo a isso?)",
        "metric": "Reduzir dependência material sem crise"
    },
    "venus_gemini": {
        "trigger": "Ao manter múltiplas opções emocionais/intelectuais",
        "practice": "Profundidade Monogâmica",
        "duration": "14 dias",
        "action": "Escolha UMA conexão e mantenha por 48h sem buscar alternativas. Registro: 'Que medo a multiplicidade esconde?'",
        "inspection_point": "O que você evita sentir quando 'preso'?",
        "stack": "Ao pegar celular pra ver outras opções (pause)",
        "metric": "Manter conexão por 72h sem distração"
    },
    "venus_cancer": {
        "trigger": "Ao confundir cuidado com controle",
        "practice": "Amor Sem Garras",
        "duration": "Contínuo",
        "action": "Antes de cuidar, pergunte: 'É necessidade deles ou minha de ser necessário?' Registro: 'Usei afeto como âncora?'",
        "inspection_point": "Onde alimenta dependência para não ser abandonado?",
        "stack": "Ao oferecer ajuda (Eles pediram?)",
        "metric": "Tolerar que o outro enfrente coisas sem resgatar"
    },
    "venus_leo": {
        "trigger": "Necessidade de seduzir e ser o centro",
        "practice": "Invisibilidade Gloriosa",
        "duration": "7 dias",
        "action": "Fique em segundo plano socialmente, apenas observe. Registro: 'Quanta atenção preciso pra sentir que existo?'",
        "inspection_point": "Quem é quando ninguém aplaude?",
        "stack": "Ao entrar em ambiente (dar atenção em vez de receber)",
        "metric": "Permanecer em silêncio por 2h sem ansiedade"
    },
    "venus_virgo": {
        "trigger": "Ao criticar o parceiro ('ninguém faz direito')",
        "practice": "Adoração da Imperfeição",
        "duration": "21 dias",
        "action": "Elogie algo imperfeito do parceiro. Registro: 'O que o caos deles ativa em mim?'",
        "inspection_point": "Você critica para não se aproximar?",
        "stack": "Ao notar detalhe errado (encontre algo certo)",
        "metric": "Reduzir críticas veladas em 80%"
    },
    "venus_libra": {
        "trigger": "Ao evitar conflitos e manter a 'fachada agradável'",
        "practice": "Confronto Honesto",
        "duration": "14 dias",
        "action": "Expresse discordância real diariamente. Registro: 'A reação foi tão ruim quanto imaginei?'",
        "inspection_point": "Você prefere falso acordo a ficar só?",
        "stack": "Ao dizer 'tudo bem' (pause e verifique)",
        "metric": "Iniciar conversas desconfortáveis mantendo conexão"
    },
    "venus_scorpio": {
        "trigger": "Ciúme investigativo e atração por perigo afetivo",
        "practice": "Transparência Vulnerável",
        "duration": "Contínuo",
        "action": "Em vez de espionar, verbalize: 'Estou com medo de perder porque...'. Registro: 'O que escondia a obsessão?'",
        "inspection_point": "Você confia em si mesmo nos vínculos?",
        "stack": "Ao querer checar algo (escreva vulnerabilidade primeiro)",
        "metric": "Substituir espionagem por vulnerabilidade verbalizada"
    },
    "venus_sagittarius": {
        "trigger": "Ao filosofar pra evitar apegos ou buscar sempre o 'frescou'",
        "practice": "Profundidade no Presente",
        "duration": "21 dias",
        "action": "Mantenha o mesmo tema profundíssimo com a pessoa sem viajar na maionese ou mudar pra aliviar o clima.",
        "inspection_point": "Você ama a pessoa ou a expansão da ideia do amor?",
        "stack": "Ao fugir num insight genial num DR",
        "metric": "Ouvir e ficar parado ao invés de desviar p/ piada filosófica."
    },
    "venus_capricorn": {
        "trigger": "Ao calcular o status ou peso utilitário do parceiro",
        "practice": "Economia do Coração",
        "duration": "14 dias",
        "action": "Faça ações puras e ingênuas desinteressadas sem buscar garantias de CNPJ. Dê sem contabilizar retorno prático.",
        "inspection_point": "Amor é transação ou vivência?",
        "stack": "Ao comprar presente prático utilitário, compre futilmente uma vez",
        "metric": "Gestos puramente afetuosos semanais sem lógica de benefício custo"
    },
    "venus_aquarius": {
        "trigger": "Ao tratar as pessoas amadas com fria teoria social revolucionaria",
        "practice": "Corpo antes do Conceito",
        "duration": "Contínuo",
        "action": "Toque na pessoa carinhosamente mudo por 2min antes de debater qualqure teoria ou mandar memezinho da revolução.",
        "inspection_point": "Intelecto como barreira física. Cadê teu abraço?",
        "stack": "Antes de mandar textão analítico emocional",
        "metric": "Conectar corpo animal antes de dados teóricos na nuvem de afeto"
    },
    "venus_pisces": {
        "trigger": "Ao romantizar dores do mundo na pele de f*didos q não te querem bem",
        "practice": "Limite Compassivo",
        "duration": "21 dias",
        "action": "Ouça lamento. Pise firme com a sola do pé no cimento e diga apenas 'Sinto muito' em vez de pagar os boletos da vítima.",
        "inspection_point": "Salvaçao não solicitada = egocentrismo narcisista envernizado de Cristo escondido.",
        "stack": "Cuidado e empatia de vitrine",
        "metric": "Não salvar ninguém do caos q essa msma pessoa constroi."
    },

    // LOTE 5: MARTE (Ação/Agressão/Impulso)
    "mars_aries": {
        "trigger": "Ao sentir raiva instantânea",
        "practice": "Intervalo do Fogo",
        "duration": "21 dias",
        "action": "Na raiva, congele 10s. Registro: 'O que ameaçou meu ego?'",
        "inspection_point": "O que você defende violentamente que não protege com amor?",
        "stack": "Ao sentir calor na face (pausa)",
        "metric": "Aumento de 10s no gatilho; menos brigas estúpidas."
    },
    "mars_taurus": {
        "trigger": "Ao resistir teimosamente a mudança por posse ou comodismo",
        "practice": "Solto o Aperto",
        "duration": "Contínuo",
        "action": "Mude pequeno plano e abra mão de micro controle diariamente.",
        "inspection_point": "Segurança material é só material?",
        "stack": "Ouvind um pedido extra chato",
        "metric": "Deixar o percurso fluir quando as regras caírem."
    },
    "mars_gemini": {
        "trigger": "Múltiplas abas mentais e dispersão e ataque verbal cortante",
        "practice": "Monotarefa Forçada",
        "duration": "14 dias",
        "action": "Acabar ué. Antes de pular no próximo brinquedinho legal verbal ou produtivo, dê um finish cravado no anterior cético e pragmático total.",
        "inspection_point": "Tédio é seu inimigo e medo profundo?",
        "stack": "Ao dar CTRL C/CTRL V para nova aba",
        "metric": "Focar brutal num projeto"
    },
    "mars_cancer": {
        "trigger": "Passivo-agressão nas relações e chantagem chantagista chorona silente",
        "practice": "Raiva Direta",
        "duration": "21 dias",
        "action": "Sentou bico virado? Vai lá e fala verbalmente com sujeito predicado a raiva frontal.",
        "inspection_point": "Indireta é medo covarde das crias",
        "stack": "Sentou o bico",
        "metric": "Mapear emoções confrontacionais 5x"
    },
    "mars_leo": {
        "trigger": "Conquistar aplausos pela façanha",
        "practice": "Ação Invisível",
        "duration": "7 dias",
        "action": "Faça tarefa épica homérica maravilhosa. Feche a boca e não poste pros amigos aplaudirem.",
        "inspection_point": "Dopamina depende do Like do chefe? do seguidor?",
        "stack": "Selfie gloriosa do fim de gym",
        "metric": "Acordar e dormir mudo mas com ouro nas mãos q só vc sabe qm buscou."
    },
    "mars_virgo": {
        "trigger": "Microgereciando e apontando dedinhos limpos sobre as sujeiras pequenas de trabalho da galera",
        "practice": "Bom o Suficiente Agora",
        "duration": "Contínuo",
        "action": "Pula o pente fino de correção das aspas burras alheias e entrega do jeito humano e podrezinho das bordas imperfeitas a bosta do doc sem sofrer ansiedades cruéis na nuca!",
        "inspection_point": "Controle travestido do perfeccionismo higienico",
        "stack": "Antes da 5ª revisão crasa da virgula chata",
        "metric": "Largar o osso mais ligeiro"
    },
    "mars_libra": {
        "trigger": "Sorrir e acenar fingindo harmonia na raiva engolida q fará úlcera",
        "practice": "Desagradar de Propósito",
        "duration": "14 dias",
        "action": "Manda 1 não educado seco na lata pra pedidos q destroem teu fds. Fode a harmonia, banca.",
        "inspection_point": "Covardia charmosa diplomata escorregadia",
        "stack": "Enquanto dá sorrisinho em reunião chata",
        "metric": "Dizer e sustenar os desconfortos reais com paz foda de adulto limpo forte guerreiro real"
    },
    "mars_scorpio": {
        "trigger": "Sangue nos óio investigativo vingativo macabro querendo revidar humilhação a ferro em gelo",
        "practice": "Ressignificação do Veneno",
        "duration": "21 dias",
        "action": "Aquele rancor violento brutal q te faria esmagar, transmuta: Use o combustivel dessa raiva do demonio fds nas metas fodas tua da sua vida pessoal longevação, ignorando completamente ao invés da vingancinha.",
        "inspection_point": "Vc adora o poder do inferno escuro do q curar na luz do chato calmo.",
        "stack": "Plano mental pra pisar de volta",
        "metric": "Não pisar."
    },
    "mars_sagittarius": {
        "trigger": "Soltar rojão atirar com tudo meter ficha ALL IN por paixão explosiva cega",
        "practice": "Flecha Pausada",
        "duration": "Contínuo",
        "action": "Dorme 24h as cegas com freio na mão no cinto antes de chutar a porta metendo o projeto dos milhoes, o tombo sem mapa da ruim.",
        "inspection_point": "Fuga ou entusiasmo infantil das porrada?",
        "stack": "Apostando milhoes em horas e promessas",
        "metric": "Tirar o peso do ALL-IN. Ações pensadas."
    },
    "mars_capricorn": {
        "trigger": "Hierárquico gelado usando a produtividade como tanque blindado pra esquecer dor sentimental escondida",
        "practice": "Inutilidade Produtiva",
        "duration": "Domingos",
        "action": "Domingão do Faustão cravado sem ler email porra e sem arrumar casa ou adiantar job.",
        "inspection_point": "Status e meta = sua fuga dos fantasminha que habita o vazio.",
        "stack": "Planejando os proximos passos corporativos",
        "metric": "Zero ambiçao meta em um fuckn DIA."
    },
    "mars_aquarius": {
        "trigger": "Rebeldia foda disruptiva anarquista chata que quebra pq pode e nao obdece chefe atoa.",
        "practice": "Rebeldia Consciente",
        "duration": "14 dias",
        "action": "Seu não/do contra te ajuda no avanço coletivo humano genial ou cê só é uma criança teimosa fazendo birra pela birra de não ser o robô do sistema burro mas que ajuda o flow a funfar pra geral na paz chata? Discriminar se é produtivo revoltar aí.",
        "inspection_point": "Contrarianismo infantil ou causa digna?",
        "stack": "Rolando os olhos pra processos idiotas da rotina burra comum.",
        "metric": "Agir como engrenagem se não custar honra por 1x"
    },
    "mars_pisces": {
        "trigger": "Passividade, chorinho por debaixo da mesa em fumo escapando aos cantos, não bancar a bronca na mesa de peito aberto das tempestades da treta das cobranças pesadas",
        "practice": "Fronteira Suave",
        "duration": "21 dias",
        "action": "Demarca 1 limite e crava no chao do asfalto quente sem dor e dó. Nada de salvar cão se tu tem compromisso seu pessoal no mesmo dia focado sagrado do limite limpo claro pragmático frio pra cacete foda mano!!!",
        "inspection_point": "Covardia de esvair escorrendo como água fraca de pia gotejante",
        "stack": "Cedendo passiva nos papos",
        "metric": "Afirmar posição!"
    },

    // LOTE 6: JÚPITER (Crenças/Exageros)
    "jupiter_aries": {
        "trigger": "Confiança excessiva",
        "practice": "Pausa do Otimismo",
        "duration": "14 dias",
        "action": "Exija planejar plano B de cenário de falhas.",
        "inspection_point": "Ousadia ou suicídio impensado imprudente arrogante inflador de ego ferido oculto frágil covarde medo mudo?",
        "stack": "Ao saltar sem cordas elásticas cegas."
    },
    "jupiter_taurus": {
        "trigger": "Achar que ter = deus da sorte.",
        "practice": "Abundância Minimalista",
        "duration": "Contínuo",
        "action": "Doe e doe mto do estoque. Purgue",
        "inspection_point": "Miseravão emocional trancando cofres da ganância das traças velhas e cupins da alma podre na ilusão material terrena."
    },
    "jupiter_gemini": {
        "trigger": "Saber tudo, aprofundar nada",
        "practice": "Economia da Palavra",
        "duration": "7 dias",
        "action": "Aguarde silêncios",
        "inspection_point": "Intelectual performer."
    },
    "jupiter_cancer": {
        "trigger": "Maternagem de clã infinita superprotetora",
        "practice": "Autonomia do Outro",
        "duration": "21 dias",
        "action": "Deixa o mano sangrar joelhos aprendendo a cair do andar e das bicicletinhas da vida.",
        "inspection_point": "Dominação maquiadora pela maniputação dos cordões humbilicais de afeto invisível da máfia napolitanna na base do amor materno gordo."
    },
    "jupiter_leo": {
        "trigger": "Palco do sol dos pampas do herói de tudo e todas glórias fáceis divinas reais dos céus desceu rei vivo magno",
        "practice": "Humildade Performática",
        "duration": "14 dias",
        "action": "Luz dos outros",
        "inspection_point": "Sua fragilidade clama aplausinhos pra ter paz q vc é digno seu grandiosão carente lindo? Ego faminto."
    },
    "jupiter_virgo": {
        "trigger": "Amplificação crítica julgamento nos céus cobrando mil detalhes inúteis no sagrado",
        "practice": "Tolerância do Caos",
        "duration": "Contínuo",
        "action": "Imperfeição divina.",
        "inspection_point": "Quem puses nas exigências rígidas morais ansiosas higienistas?"
    },
    "jupiter_libra": {
        "trigger": "Perda pelo diploma das relações cegas diplomáticas e alianças idiotas amarradas que afundam junto.",
        "practice": "Fronteira na Expansão",
        "duration": "21 dias",
        "action": "Autonomia de 1x nos compromisso solitário limpos soltos da vida mansa pacífica de equilíbrio puro q ignora fofocas tretas na paz da solitude de quem se basta limpo felizão por si",
        "inspection_point": "Se pendurar."
    },
    "jupiter_scorpio": {
        "trigger": "Tudo extremo apostando casas da vida num all in",
        "practice": "Superficialidade Saudável",
        "duration": "14 dias",
        "action": "Aprecie chutar pedras nas ruas d euma forma vazia leve.",
        "inspection_point": "Você quer sentir a morte da aposta do abismo pq raso cê morre de tédio da mesmice."
    },
    "jupiter_sagittarius": {
        "trigger": "Grandiosidade profeta mentirosa da crença de pregar nas nuvens do conhecimento total q salva almas cegas dos vales",
        "practice": "Restrição Voluntária",
        "duration": "Contínuo",
        "action": "Baixa tua voz",
        "inspection_point": "Sua voz fala pra deus te ouvir ou vc ouve ninguem?"
    },
    "jupiter_capricorn": {
        "trigger": "Ascenssão no escada humana",
        "practice": "Escala Humana",
        "duration": "21 dias",
        "action": "Pare a de pisar cabeças dos degrais da empresa.",
        "inspection_point": "Vc quer legado pra poder imortal ou complexos covardes passados."
    },
    "jupiter_aquarius": {
        "trigger": "Expanção utópica distante mental em prol da raça coletivista e humanista irreal utopia",
        "practice": "Terra no Céu",
        "duration": "14 dias",
        "action": "Desça pros pobres que ce quer salvar teórica.",
        "inspection_point": "Mente q aliena ou materializa humanidade com calos na mao quente?"
    },
    "jupiter_pisces": {
        "trigger": "Bote de salvacao no charque místico fumegante afogado fugindo drogas sonhos transcendencias fakes fugas mentais de ilusoes cegadas de almas q boiam sem responsabilidade do adulto limpo vacinado foda real pagador boleito do IPVA ameno cravado na parede sem vitima.",
        "practice": "Discriminação Sagrada",
        "duration": "Contínuo",
        "action": "Lava chão das caridade suja nas unha. Não canta na nuvem.",
        "inspection_point": "Transcendência ou desculpinha preguiçosa mística disfarçada covardiã mente fraca fofoluxa brando manso paz na guerra mas q toma tiro e morre fugida sem lutar?"
    },

    // LOTE 7: SATURNO (Limites/Medos)
    "saturn_aries": {
        "trigger": "Frustração por limites da rapidez",
        "practice": "Disciplina da Impotência",
        "duration": "21 dias",
        "action": "Na lentidão (filas), espere consciente sem ódios e xingos e buzinas feias. Observando a morte batendo.",
        "inspection_point": "Medo insano da incompetênica de fazer na hora.",
        "stack": "No transito das 18h travado na marginal ponte."
    },
    "saturn_taurus": {
        "trigger": "Trava e crise existencial pela escassez de pão e terras",
        "practice": "Jejuar da Segurança",
        "duration": "7 dias",
        "action": "Pobreza tátil (fique de boa sem ter suas paradas na mão solta confortinhos puros burgueses que blindam as emoçoes frageis puras cegas tuas limpas doces).",
        "inspection_point": "Oq de vc some de orgulho bosta da sua mente farta quando o cheque é nulo na banca rota imaginaria?",
        "stack": "Querer pedir ifood qdo tem pao em casa puro focado com agua filtrada potável natural cravada na mesa real."
    },
    "saturn_gemini": {
        "trigger": "Pânico do vácuo no palco da genialidade verbalizada informada sabichona do google rápido ágil.",
        "practice": "Vazio do Não-Saber",
        "duration": "14 dias",
        "action": "Dê a dádiva da palavra humilhante solene de ouro: Não. Sei. E cala boca e convive com essa paz gloriosa e estupenda do burro focado genial e cego perfeitinho limpo mestre humilde.",
        "inspection_point": "A mente ágil é a pantera dos deuses te protegendo pq tu é burro por baixo cego e fraco vulneravel nas duvidas reais dos ventos brabos. Dói ser cego de verdades de deus?",
        "stack": "Qdo falarem parada dificil da roda livre aberta filosofica."
    },
    "saturn_cancer": {
        "trigger": "Desespero frio do abandono materno paterno do abraço negado fechado solitário dos úteros mundos crueis do escuro infinito gélido sombrio do vazio escravo das carências podres q mendigam amor barato focado do vizinho cego na amizade atoa do boteco sujo chato por conta que pague cachaça e choro.",
        "practice": "Soloção Programada",
        "duration": "Contínuo",
        "action": "Solitude. Desliga celulares longos horários de dependência cega.",
        "inspection_point": "A força de deuses e heróis vêm nas caladas da madrugada limpa pura solidaria amiga dos silencio sagrados q tu odeia pular amargos nas veias mansa cravadas no teu peito suado ansioso forte! Quem mora tu em tu sozinho?"
    },
    "saturn_leo": {
        "trigger": "Morte do brilho de deus sol na roda bosta da festa que amou outra pessa ou derrota nas luzes gloriosas do olimpo rei leao na savana de orelha baja dos coitados. O flop da arte nas views fracas invisiveis futeis mansa mestre do riso fraco do publico",
        "practice": "Exposição da Queda",
        "duration": "21 dias",
        "action": "Vaza um fracasso bosta no feed dos prêmios foda do linkedn falsasso",
        "inspection_point": "A criança real chora escondida pelas luzes da vergonha da reprovação real invisivel de quem manda nas cabeças da hierarquia doentia faminta por amorsitos de palco raso."
    },
    "saturn_virgo": {
        "trigger": "Culpa. Chicote rasgando as costas no quarto escuro puritano do defeitos minuciosos da maquina burocrata detalhista foca infernal das culpas mortais absolutas de nãos ser deuses maquina foda.",
        "practice": "Imperfeição Sacramental",
        "duration": "Contínuo",
        "action": "Pise duro na bosta rala das tarefas que te rasgam pro perfeicionismo craso falso do ego vaidoso do excel q só tú vê pra curar dor das mamães foda exigentes de escola. Faz zoado pra caralho qqr projeto banal sem dar bola as cegas.",
        "inspection_point": "Quem é a voz maldita chata carrasca foda ditadora interna nojenta te cobrando sem te amar a vida toda dentro da orelha mansa limpa?"
    },
    "saturn_libra": {
        "trigger": "Tremores de fim dos casamentos solteira pra sempre nas caladas solidões frias do domingo de chuva atroz",
        "practice": "Solteirão Estruturado",
        "duration": "30 dias",
        "action": "Dengos do celibato fechado forte. Viva só",
        "inspection_point": "É 2 ou ninguem nessa guerra fofa relacional doída chata cega atroz"
    },
    "saturn_scorpio": {
        "trigger": "Pânico macabro absoluto nas mortes dos controle q cê domínia as pessoas como deuses das sombras ocultas.",
        "practice": "Memento Mori Diário",
        "duration": "Contínuo",
        "action": "Contemple tua decomposição real dos cemitérios mudo.",
        "inspection_point": "Seu deusinho ego da vontade crassa oculta não peita o destino final real frio da cova zero q arranca tua banca preta na finitude dos anos chãos amargo crasso da vida",
        "stack": "Lembranças noturnas amedrontamentais."
    },
    "saturn_sagittarius": {
        "trigger": "Crise das filosofias qdo deus morre foda num céu amargo mudo calado limpo q n dá reposta clara de guru.",
        "practice": "Silêncio do Horizonte",
        "duration": "14 dias",
        "action": "Plante prego com martelo focado ignorando deus alienígenas sentido. Seja burro manual nas tarefa mundana dos ratos.",
        "inspection_point": "Medo do Nada real prático cego."
    },
    "saturn_capricorn": {
        "trigger": "Ansiedades panicos frios qdo a maquina foda meta produçao da empresa der pau quebrou fods.",
        "practice": "Ociosidade Produtiva",
        "duration": "Domingos",
        "action": "Lê hqs toscas em vez de livro pro linkedin inútil das fogueiras ds palcos dos ceo's falsos. Exista pro inútil sagrado divino animal",
        "inspection_point": "O ego é seu saldo de CVM focado no bolso vazio seu burro fofo lindo mansa q acha q ser é cracrha?"
    },
    "saturn_aquarius": {
        "trigger": "Tremedeira com a normalidade manada chata gados da vida rotina da boiada classe c q cê odeia",
        "practice": "Normalidade Radical",
        "duration": "21 dias",
        "action": "Margeie ser gado feliz na fds foca calmo dos vizinhos, churrascos e falas basicas sem polemicas intelisgentes burras alienígenas fodas pra chocar geral por biscoito de genial rebelde atoa falso alienada das calada solidões crasas atraz",
        "inspection_point": "Invisibilidade crassa vs ser aceito nas manadas fraternas"
    },
    "saturn_pisces": {
        "trigger": "Medo encarnatória da porra do fardo dos corvos peso dos impostos chatos boletos fisicos mundo denso brabo inferno chao frio.",
        "practice": "Encarnação Forçada",
        "duration": "Contínuo",
        "action": "Planilhe seus extrato cego nos sentavos chato sujo aspero do mundo",
        "inspection_point": "Medo crasso alienígena da matéria mansa dura pura de Deus cego mundo chao."
    },

    // LOTE 8: URANO (Trauma/Rebeldia/Libertação)
    "uranus_aries": { "trigger": "Impulso violento repentino rupturas quebras chatas agressões do pódio.", "practice": "Quebra Planejada", "duration": "21 dias", "action": "Rotule do que tá pto das rupturas e pause nas programações de implosôes organizadas." },
    "uranus_taurus": { "trigger": "Mudar segurança bancaria", "practice": "Revolução dos Bens", "duration": "30 dias", "action": "Doe e atire pro lado pra testar se vive solto", "inspection_point": "Apego como prisão celular" },
    "uranus_gemini": { "trigger": "Insights explosivos", "practice": "Integração do Insight", "duration": "14 dias", "action": "Fique quietinho digerindo luz das revelaçoes pra n surtar geral nos dogmas do amanha nas rodas fape e cegas chata de pias", "inspection_point": "Insights esquizofrenica na louca ou raiz fundadas mansa focada humilde?" },
    "uranus_cancer": { "trigger": "Cortar umbral laços sangue familia", "practice": "Libertação Responsável", "duration": "21 dias", "action": "Aprenda nao ligar o fusível se a familia acende a tua dinamite suja oculta reativa de choro cego vitimizado brado forte chato", "inspection_point": "Vitimismo que chora o pai pra cascar da autonomia propria fugindo blindada." },
    "uranus_leo": { "trigger": "Opor se aos lideres chato atoa puramente", "practice": "Humildade Revolucionária", "duration": "Contínuo", "action": "Doe ações num fluxo onde ce é poeiras insignificantes", "inspection_point": "Tua luz oprime ou ajuda nas libertaçoens gerais cegadas doces mansase divinais da igualdade humanista." },

    // NEXT ONES CAN BE EXTENDED.
    "north_node_aries": {
        "evolution_path": "De Libra (dependência) para Áries (autonomia)",
        "practice": "Coragem do Ego",
        "action": "Tome decisão sozinho sem consultar. Afirme desejos mesmo desagradando.",
        "inspection_point": "Medo do abandono vs necessidade de si mesmo"
    }
};
