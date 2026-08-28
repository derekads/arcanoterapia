import { ShadowPattern, FrequenciaSombra } from '../types';
import { getArcanoByNumero } from './arcanos';

// Rich shadow patterns for Arcanos 1-5 and 22(0)
// Each pattern includes detailed description, antidote, warning signs, severity, and practical exercise

export const SHADOW_PATTERNS: Record<number, ShadowPattern[]> = {
    1: [ // O Mago
        {
            id: 'sp-1-1',
            arcanoId: 1,
            nomePadrao: 'O Charlatão Interior',
            descricao: 'Você manipula a verdade quando lhe convém, criando narrativas para escapar de responsabilidades. É um vendedor de ilusões que usa a inteligência para enganar a si mesmo e aos outros.',
            antidoto: 'Prática de honestidade radical: durante 7 dias, comprometa-se a não omitir, exagerar ou distorcer nenhuma informação. Mantenha um diário de "verdades desconfortáveis" que você normalmente evitaria dizer.',
            sinaisAtencao: ['Inventa desculpas elaboradas para justificar falhas', 'Conta versões diferentes da mesma história para pessoas diferentes', 'Sente-se orgulhoso da própria "habilidade de convencimento"', 'Evita compromissos concretos com promessas vagas'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Espelho da Verdade',
                duracaoMinutos: 10,
                instrucoes: [
                    'Sente-se em frente a um espelho real, olhe nos seus próprios olhos',
                    'Diga em voz alta 3 verdades que você tem evitado admitir',
                    'Para cada verdade, pergunte: "O que eu ganho ao esconder isso?"',
                    'Escreva essas verdades no seu diário sem censurar',
                    'Repita por 7 dias consecutivos'
                ],
                materialNecessario: ['Espelho', 'Diário/caderno', 'Caneta']
            }
        },
        {
            id: 'sp-1-2',
            arcanoId: 1,
            nomePadrao: 'Dispersão Patológica',
            descricao: 'Você inicia mil projetos e não termina nenhum. Seu rastro é um cemitério de ideias brilhantes que apodreceram por falta de consistência e comprometimento.',
            antidoto: 'Método "Uma Coisa": escolha rigorosamente apenas um projeto principal e crie um contrato escrito consigo mesmo com prazo e consequências claras para o abandono.',
            sinaisAtencao: ['Tem mais de 5 projetos abertos simultaneamente', 'Sente euforia ao começar algo novo mas tédio após 2 semanas', 'Justifica a dispersão como "criatividade"', 'Procrastina tarefas difíceis com novas ideias empolgantes'],
            frequenciaSombra: 'CRONICA',
            exercicioPratico: {
                titulo: 'Inventário de Cemitério',
                duracaoMinutos: 15,
                instrucoes: [
                    'Liste todos os projetos que você abandonou nos últimos 12 meses',
                    'Para cada um, escreva o motivo honesto do abandono',
                    'Identifique o padrão: em que momento exato você perde o interesse?',
                    'Escolha UM projeto desta lista que ainda te chama e comprometa-se a finalizá-lo',
                    'Defina 3 micro-metas semanais para este projeto e cumpra sem abrir novos'
                ],
                materialNecessario: ['Papel e caneta', 'Timer/alarme diário']
            }
        },
        {
            id: 'sp-1-3',
            arcanoId: 1,
            nomePadrao: 'Superficialidade Intelectual',
            descricao: 'Por saber um pouco de tudo, você acredita que sabe o suficiente. Sua falta de profundidade o torna alguém raso, incapaz de sustentar compromissos ou vínculos reais.',
            antidoto: 'Imersão profunda: escolha um tema e dedique 30 dias estudando apenas ele, sem pular para outra coisa. Aceite o desconforto de não ser um expert instantâneo.',
            sinaisAtencao: ['Muda de assunto frequentemente nas conversas', 'Sente-se ameaçado quando alguém sabe mais do que você sobre um tema', 'Coleciona cursos online que nunca termina', 'Prefere ser "conhecido por tudo" do que "mestre em algo"'],
            frequenciaSombra: 'MEDIA',
            exercicioPratico: {
                titulo: 'Mergulho de 30 Dias',
                duracaoMinutos: 20,
                instrucoes: [
                    'Escolha UM tema que te fascina mas que você nunca aprofundou',
                    'Dedique no mínimo 20 minutos diários APENAS a este tema',
                    'Não consuma conteúdo de nenhum outro assunto novo durante 30 dias',
                    'Ao final, escreva um texto de 500 palavras resumindo o que aprendeu',
                    'Observe como se sente ao ser profundo em vez de superficial'
                ],
                materialNecessario: ['Livro ou curso sobre o tema escolhido', 'Caderno de estudos dedicado']
            }
        },
        {
            id: 'sp-1-4',
            arcanoId: 1,
            nomePadrao: 'Mente Caótica',
            descricao: 'Sua inquietação impede o descanso. Você é escravo de uma mente acelerada que usa a agitação para fugir do silêncio e do pavor de se encontrar sozinho consigo mesmo.',
            antidoto: 'Silêncio estruturado: pratique 5 minutos de silêncio total diariamente (sem celular, sem música, sem estímulo), aumentando 1 minuto por semana.',
            sinaisAtencao: ['Não consegue ficar mais de 2 minutos sem pegar o celular', 'Dorme com TV ou podcast ligados', 'Sente ansiedade quando não tem nada para fazer', 'Confunde produtividade obsessiva com valor pessoal'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Jejum de Estímulos',
                duracaoMinutos: 5,
                instrucoes: [
                    'Coloque o celular em outra sala, desconectado',
                    'Sente-se em um lugar silencioso e feche os olhos',
                    'Respire lentamente: 4 segundos inspirando, 7 segurando, 8 expirando',
                    'Quando pensamentos surgirem, apenas observe sem se agarrar a eles',
                    'Se sentir ansiedade, note-a sem reagir. É apenas seu corpo se desintoxicando do barulho'
                ],
                materialNecessario: ['Timer (configurado antes do exercício)', 'Espaço silencioso']
            }
        }
    ],
    2: [ // A Sacerdotisa
        {
            id: 'sp-2-1',
            arcanoId: 2,
            nomePadrao: 'Inércia Contemplativa',
            descricao: 'Você se esconde atrás do "esperar o tempo certo" para camuflar o medo covarde de viver. Sua passividade é uma prisão onde você deixa que os outros decidam sua vida.',
            antidoto: 'Ação imediata: tome uma decisão que tem adiado há mais de 1 mês. Não consulte ninguém. Aceite que "imperfeito e feito" é melhor que "perfeito e adiado".',
            sinaisAtencao: ['Pede opinião de 5+ pessoas antes de qualquer decisão', 'Usa frases como "preciso sentir se é o momento"', 'Adia ações concretas esperando "sinais"', 'Delega decisões importantes para outros'],
            frequenciaSombra: 'CRONICA',
            exercicioPratico: {
                titulo: 'Ação Sem Permissão',
                duracaoMinutos: 10,
                instrucoes: [
                    'Liste 3 decisões que você tem adiado esperando o "momento certo"',
                    'Escolha a menor delas e tome-a AGORA, sem consultar ninguém',
                    'Não peça validação externa depois. Apenas aja e observe o resultado',
                    'Anote como se sentiu ao agir sem esperar a "confirmação do universo"',
                    'Repita com as outras duas decisões na próxima semana'
                ],
                materialNecessario: ['Coragem', 'Caderno para reflexão']
            }
        },
        {
            id: 'sp-2-2',
            arcanoId: 2,
            nomePadrao: 'Dependência Emocional',
            descricao: 'Você se anula para caber na vida do outro, tornando-se uma sombra carente que suga a energia de quem tenta te amar por puro medo da solidão.',
            antidoto: 'Semana solo: passe uma semana inteira sem buscar refúgio emocional externo. Resolva ao menos um problema por conta própria. Prove a si mesmo que você é capaz de habitar sua própria presença.',
            sinaisAtencao: ['Instabilidade de humor vinculada ao parceiro', 'Incapacidade de estar a sós em momentos de lazer', 'Aceitação de negligência para evitar o abandono', 'Comunicação compulsiva por medo da ausência'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Diário de Soberania',
                duracaoMinutos: 15,
                instrucoes: [
                    'Durante 7 dias, anote cada vez que sentir o impulso de buscar validação externa',
                    'Para cada impulso, escreva: "O que estou realmente precisando agora?"',
                    'Pratique dar a si mesma o que estava buscando no outro',
                    'No final de cada dia, escreva 3 coisas que conseguiu resolver sozinha',
                    'Celebre cada ato de independência, por menor que seja'
                ],
                materialNecessario: ['Caderno dedicado', 'Caneta']
            }
        },
        {
            id: 'sp-2-3',
            arcanoId: 2,
            nomePadrao: 'Silêncio Punitivo',
            descricao: 'Você utiliza o silêncio como ferramenta de manipulação ou castigo. Alimenta ressentimentos que corroem seu íntimo por recusar a expressão honesta do que sente.',
            antidoto: 'Expressão consciente: pratique dizer o que sente em até 24 horas após o evento. Use a fórmula "Quando você [ação], eu me senti [sentimento] porque [necessidade]".',
            sinaisAtencao: ['Aplica "tratamento de silêncio" quando está com raiva', 'Espera que os outros adivinhem seus sentimentos', 'Acumula queixas por meses até explodir', 'Diz "está tudo bem" quando claramente não está'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Carta Não Enviada',
                duracaoMinutos: 20,
                instrucoes: [
                    'Escreva uma carta para alguém com quem você guarda mágoa',
                    'Diga TUDO que você nunca teve coragem de falar, sem censura',
                    'Releia a carta em voz alta para si mesma',
                    'Queime ou rasgue a carta como ritual de liberação',
                    'Na próxima interação com essa pessoa, pratique a comunicação honesta'
                ],
                materialNecessario: ['Papel e caneta', 'Local calmo e privado', 'Cinzeiro ou recipiente seguro']
            }
        }
    ],
    3: [ // A Imperatriz
        {
            id: 'sp-3-1',
            arcanoId: 3,
            nomePadrao: 'Narcisismo Estéril',
            descricao: 'Você olha tanto para o próprio umbigo que se torna incapaz de empatia real. O mundo deve servir aos seus caprichos ou você entra em colapso infantil.',
            antidoto: 'Serviço anônimo: faça algo significativo por alguém sem que essa pessoa saiba que foi você. Pratique a generosidade sem plateia por 21 dias.',
            sinaisAtencao: ['Compara-se constantemente com os outros nas redes sociais', 'Fica ressentida quando os outros recebem elogios', 'Interrompe histórias alheias para falar de si', 'Faz favores esperando reconhecimento público'],
            frequenciaSombra: 'MEDIA',
            exercicioPratico: {
                titulo: 'Espelho Invertido',
                duracaoMinutos: 10,
                instrucoes: [
                    'Escolha 3 pessoas do seu convívio que você costuma "ignorar"',
                    'Faça uma pergunta genuína sobre a vida de cada uma sem falar de si',
                    'Ouça a resposta inteira sem interromper e sem dar conselhos',
                    'Anote o que aprendeu sobre elas no seu caderno',
                    'Reflita: "Quantas vezes eu realmente ouço os outros?"'
                ],
                materialNecessario: ['Caderno de reflexão']
            }
        },
        {
            id: 'sp-3-2',
            arcanoId: 3,
            nomePadrao: 'Tirania Afetiva',
            descricao: 'Usa a sedução e o falso "cuidado" como ferramentas de controle e chantagem emocional para manter todos sob sua posse.',
            antidoto: 'Desapego amoroso: pratique soltar o controle sobre uma pessoa que você tenta "possuir". Permita que ela tome suas decisões sem sua interferência.',
            sinaisAtencao: ['Diz "depois de tudo que eu fiz por você"', 'Controla como o outro se veste, come ou se comporta', 'Faz-se de vítima quando confrontada', 'Usa presentes e favores como moeda de troca'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Liberação de Posse',
                duracaoMinutos: 15,
                instrucoes: [
                    'Identifique uma pessoa que você tenta controlar ou possuir emocionalmente',
                    'Escreva: "O que eu realmente tenho medo de perder?"',
                    'Pratique uma semana sem dar opiniões não solicitadas a essa pessoa',
                    'Observe seus impulsos de controle sem agir sobre eles',
                    'Repita o mantra: "Amar é libertar, não possuir"'
                ],
                materialNecessario: ['Caderno', 'Disposição para desconforto']
            }
        },
        {
            id: 'sp-3-3',
            arcanoId: 3,
            nomePadrao: 'Vazio Material',
            descricao: 'Tenta preencher abismos emocionais com consumo compulsivo e luxos desnecessários, tornando-se escrava das aparências para esconder o vazio interior.',
            antidoto: 'Jejum de consumo: passe 30 dias sem comprar nada que não seja essencial. Sempre que sentir vontade de comprar, escreva o que realmente está sentindo.',
            sinaisAtencao: ['Compra para se sentir melhor após discussões', 'Tem armários cheios de coisas com etiqueta que nunca usou', 'Sente vergonha de ambientes simples', 'Gasta mais do que ganha para manter a imagem'],
            frequenciaSombra: 'MEDIA',
            exercicioPratico: {
                titulo: 'Detox de Consumo',
                duracaoMinutos: 10,
                instrucoes: [
                    'Delete os apps de compras do celular por 7 dias',
                    'Cada vez que sentir vontade de comprar, escreva o que está sentindo',
                    'Substitua a compra por uma atividade gratuita que te dê prazer',
                    'Doe 3 itens que você comprou por impulso e nunca usou',
                    'Reflita: "O que eu realmente quero preencher?"'
                ],
                materialNecessario: ['Caderno', 'Sacola para doação']
            }
        }
    ],
    4: [ // O Imperador
        {
            id: 'sp-4-1',
            arcanoId: 4,
            nomePadrao: 'Rigidez Cadavérica',
            descricao: 'Suas regras se tornaram uma prisão. Você prefere estar certo a ser feliz, sacrificando o afeto no altar de uma disciplina fria e sem alma.',
            antidoto: 'Dia do caos controlado: uma vez por semana, quebre deliberadamente uma regra sua (desde que não cause dano). Observe como se sente quando perde o controle.',
            sinaisAtencao: ['Fica irritado quando alguém muda os planos', 'Tem rotinas tão rígidas que causam ansiedade em outros', 'Não consegue improvisar', 'Julga todos que vivem de forma diferente da sua'],
            frequenciaSombra: 'CRONICA',
            exercicioPratico: {
                titulo: 'Rendição ao Caos',
                duracaoMinutos: 30,
                instrucoes: [
                    'Escolha um dia da semana para não seguir nenhuma rotina fixa',
                    'Tome café em um horário diferente, mude o caminho do trabalho',
                    'Diga "sim" para um convite inesperado',
                    'Observe todo o desconforto que surgir sem tentar controlá-lo',
                    'Anote: o que de ruim REALMENTE aconteceu? (provavelmente nada)'
                ],
                materialNecessario: ['Abertura mental', 'Caderno de reflexão']
            }
        },
        {
            id: 'sp-4-2',
            arcanoId: 4,
            nomePadrao: 'Autoritarismo Emocional',
            descricao: 'Você não lidera, você esmaga. Sua insegurança se mascara de prepotência, transformando diálogos em monólogos impositivos e violentos.',
            antidoto: 'Escuta ativa radical: durante uma semana, em cada conversa, ouça o outro completamente antes de responder. Repita o que ouviu antes de dar sua opinião.',
            sinaisAtencao: ['Interrompe os outros constantemente', 'Levanta a voz quando discorda', 'Faz perguntas retóricas para intimidar', 'Pessoas próximas têm medo de discordar de você'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'O Rei Ouve',
                duracaoMinutos: 15,
                instrucoes: [
                    'Na próxima conversa difícil, comprometa-se a ouvir por 5 minutos sem falar',
                    'Antes de responder, repita o que o outro disse com suas palavras',
                    'Pergunte: "Há algo mais que você gostaria de me dizer?"',
                    'Só depois de confirmar que entendeu, ofereça sua perspectiva',
                    'Anote como se sentiu ao não controlar o diálogo'
                ],
                materialNecessario: ['Timer', 'Caderno de reflexão']
            }
        },
        {
            id: 'sp-4-3',
            arcanoId: 4,
            nomePadrao: 'Deserto Emocional',
            descricao: 'Você confunde vulnerabilidade com fraqueza. Acaba isolado em um castelo de gelo onde ninguém consegue te tocar ou te amar de verdade.',
            antidoto: 'Vulnerabilidade deliberada: conte a alguém de confiança sobre um medo real que você nunca admitiu. Permita-se ser visto na fragilidade.',
            sinaisAtencao: ['Não chora há anos', 'Responde "estou bem" automaticamente', 'Afasta-se quando sente emoção forte', 'Acredita que mostrar fraqueza é perder o respeito'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Derretendo o Gelo',
                duracaoMinutos: 15,
                instrucoes: [
                    'Escolha uma pessoa em quem confia e marque uma conversa',
                    'Compartilhe um medo ou insegurança que nunca revelou',
                    'Não minimize nem racionalize: apenas sinta e fale',
                    'Se lágrimas vierem, permita. Se o peito apertar, respire e continue',
                    'Depois, anote: "O que aconteceu de terrível por eu ter sido vulnerável?" (nada)'
                ],
                materialNecessario: ['Coragem', 'Pessoa de confiança', 'Caderno']
            }
        }
    ],
    5: [ // O Papa
        {
            id: 'sp-5-1',
            arcanoId: 5,
            nomePadrao: 'Hipocrisia Moral',
            descricao: 'Você prega uma moralidade que não pratica no escuro. Sua fachada de santidade esconde sombras que você se recusa a admitir e integrar.',
            antidoto: 'Confissão honesta: escreva uma lista de 5 valores que você prega mas não pratica. Para cada um, defina uma ação concreta para alinhar discurso e prática.',
            sinaisAtencao: ['Corrige o comportamento dos outros mas não o seu', 'Tem "regras" que só se aplicam aos demais', 'Sente-se moralmente superior em conversas', 'Esconde comportamentos que contradizem seu discurso'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Auditoria de Coerência',
                duracaoMinutos: 20,
                instrucoes: [
                    'Liste 5 valores que você defende publicamente',
                    'Para cada um, avalie honestamente de 0-10 o quanto pratica',
                    'Identifique as 3 maiores discrepâncias entre discurso e ação',
                    'Crie uma ação concreta para alinhar cada uma esta semana',
                    'Peça feedback a alguém de confiança: "Onde sou incoerente?"'
                ],
                materialNecessario: ['Caderno', 'Humildade']
            }
        },
        {
            id: 'sp-5-2',
            arcanoId: 5,
            nomePadrao: 'Dogmatismo Cego',
            descricao: '"Sempre foi assim" é sua desculpa para não evoluir. Você persegue o novo por medo de perder o controle sobre as antigas verdades e certezas.',
            antidoto: 'Desconstrução consciente: escolha uma crença que você nunca questionou e investigue argumentos contrários com mente genuinamente aberta.',
            sinaisAtencao: ['Rejeita ideias novas antes de avaliá-las', 'Cita autoridades antigas como argumento final', 'Sente raiva quando alguém questiona suas crenças', 'Usa tradição como justificativa para resistir a mudanças'],
            frequenciaSombra: 'MEDIA',
            exercicioPratico: {
                titulo: 'A Crença Desafiada',
                duracaoMinutos: 20,
                instrucoes: [
                    'Escolha uma crença forte que você nunca questionou seriamente',
                    'Pesquise 3 argumentos contra ela, escritos por pessoas inteligentes',
                    'Tente defender o lado oposto como se fosse seu',
                    'Reflita: "E se eu estiver parcialmente errado?"',
                    'Escreva o que descobriu sobre si neste processo'
                ],
                materialNecessario: ['Acesso à internet para pesquisa', 'Caderno']
            }
        },
        {
            id: 'sp-5-3',
            arcanoId: 5,
            nomePadrao: 'Arrogância Intelectual',
            descricao: 'Você olha para os outros com desdém, acreditando que sua erudição te torna superior aos "ignorantes" ao seu redor.',
            antidoto: 'Aprendiz por um dia: peça a alguém "mais simples" que te ensine algo que você não sabe. Pratique a humildade de ser aluno de quem você subestima.',
            sinaisAtencao: ['Corrige a gramática ou pronúncia dos outros', 'Faz questão de demonstrar quanto sabe em conversas', 'Menospreza formas de conhecimento não-acadêmicas', 'Tem dificuldade em dizer "eu não sei"'],
            frequenciaSombra: 'MEDIA',
            exercicioPratico: {
                titulo: 'Mestre Improvável',
                duracaoMinutos: 30,
                instrucoes: [
                    'Identifique alguém que você considera "menos intelectual"',
                    'Peça genuinamente que essa pessoa te ensine algo que ela domina',
                    'Ouça com a mesma reverência que daria a um professor universitário',
                    'Pratique dizer "eu não sabia disso, obrigado por me ensinar"',
                    'Escreva 3 lições que aprendeu sobre humildade neste exercício'
                ],
                materialNecessario: ['Humildade genuína', 'Caderno']
            }
        }
    ],
    22: [ // O Louco (0)
        {
            id: 'sp-22-1',
            arcanoId: 22,
            nomePadrao: 'Irresponsabilidade Patológica',
            descricao: 'Você é um inconsequente que deixa rastro de destruição para os outros pagarem. Sua "liberdade" é apenas egoísmo disfarçado de espiritualidade.',
            antidoto: 'Responsabilidade concreta: assuma um compromisso de 90 dias (projeto, conta, animal de estimação) e cumpra até o final sem desistir.',
            sinaisAtencao: ['Foge quando as coisas ficam difíceis', 'Deixa contas e responsabilidades para outros resolverem', 'Usa "sou livre" como desculpa para não se comprometer', 'Muda de cidade/emprego/relação compulsivamente'],
            frequenciaSombra: 'CRONICA',
            exercicioPratico: {
                titulo: 'Contrato Consigo Mesmo',
                duracaoMinutos: 15,
                instrucoes: [
                    'Escreva um contrato consigo mesmo com UM compromisso de 90 dias',
                    'Defina consequências claras para o descumprimento',
                    'Assine e entregue uma cópia a alguém de confiança',
                    'A cada semana, preste contas por escrito',
                    'Celebre ao final: você provou que pode ser confiável'
                ],
                materialNecessario: ['Papel formal', 'Caneta', 'Testemunha de confiança']
            }
        },
        {
            id: 'sp-22-2',
            arcanoId: 22,
            nomePadrao: 'Imprudência Suicida',
            descricao: 'Você pula no abismo sem paraquedas, confundindo fé com burrice. Suas escolhas colocam em risco você e quem te ama.',
            antidoto: 'Avaliação de risco: antes de cada "salto de fé", liste 3 consequências possíveis e prepare-se para cada uma delas. Fé não exclui planejamento.',
            sinaisAtencao: ['Toma decisões financeiras impulsivas', 'Não lê contratos antes de assinar', 'Ignora avisos claros de perigo por "intuição"', 'Histórico de acidentes evitáveis'],
            frequenciaSombra: 'ALTA',
            exercicioPratico: {
                titulo: 'Paraquedas Consciente',
                duracaoMinutos: 10,
                instrucoes: [
                    'Pense na próxima grande decisão que está prestes a tomar',
                    'Escreva 3 cenários: melhor caso, pior caso e mais provável',
                    'Para o pior caso, crie um plano de contingência',
                    'Pergunte a si mesmo: "Eu consigo absorver o pior caso?"',
                    'Só então tome a decisão, com fé E com preparo'
                ],
                materialNecessario: ['Caderno', 'Honestidade']
            }
        },
        {
            id: 'sp-22-3',
            arcanoId: 22,
            nomePadrao: 'Instabilidade Crônica',
            descricao: 'Você foge de tudo o que exige esforço. É um eterno adolescente que nunca cresce, nunca aprofunda e nunca constrói nada duradouro.',
            antidoto: 'Construção lenta: plante algo (literal ou figurativamente) e cuide todos os dias por 60 dias. Aprenda que a beleza está na constância.',
            sinaisAtencao: ['Não fica mais de 6 meses em nenhum emprego', 'Amizades são superficiais e descartáveis', 'Perde documentos e compromissos frequentemente', 'Se sente sufocado por qualquer rotina'],
            frequenciaSombra: 'CRONICA',
            exercicioPratico: {
                titulo: 'Plantar e Cuidar',
                duracaoMinutos: 5,
                instrucoes: [
                    'Plante uma semente real em um vaso',
                    'Regue-a todos os dias no mesmo horário durante 60 dias',
                    'Fotografe seu progresso a cada semana',
                    'Use a planta como metáfora: "Se eu consegui cuidar dela, posso cuidar de [meta]"',
                    'Quando a planta crescer, coloque-a em um lugar visível como símbolo da sua constância'
                ],
                materialNecessario: ['Vaso', 'Terra', 'Semente', 'Água']
            }
        }
    ]
};

// Severity mapping from JSON to enum
const SEVERITY_MAP: Record<string, FrequenciaSombra> = {
    'Alta': 'ALTA',
    'Média': 'MEDIA',
    'Baixa': 'BAIXA',
    'Crônica': 'CRONICA',
};

// Helper: get shadow patterns for any arcano, falling back to arcanos.json for arcanos 6-21
export function getShadowPatternsForArcano(arcanoId: number): ShadowPattern[] {
    if (SHADOW_PATTERNS[arcanoId]) {
        return SHADOW_PATTERNS[arcanoId];
    }
    // Fallback: convert arcanos.json sombras to ShadowPattern format
    const arcano = getArcanoByNumero(arcanoId);
    if (!arcano || !arcano.sombras) return [];
    return arcano.sombras.map((s, idx) => ({
        id: `sp-${arcanoId}-${idx + 1}`,
        arcanoId,
        nomePadrao: s.nome,
        descricao: s.descricao || `Trabalho com a sombra d${arcano.nome === 'O Sol' || arcano.nome === 'O Mundo' ? 'o' : 'a'} ${arcano.nome}.`,
        antidoto: s.antidoto,
        exercicio: s.exercicio,
        sinaisAtencao: s.sinais,
        frequenciaSombra: SEVERITY_MAP[s.severidade] || 'MEDIA',
        modalidadeTerapia: s.modalidade_terapia || 'Psicologia Analítica',
        exercicioPratico: {
            titulo: s.nome,
            duracaoMinutos: 15,
            instrucoes: [s.exercicio],
            materialNecessario: ['Caderno', 'Caneta'],
        },
    }));
}
