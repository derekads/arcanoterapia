import { DiretrizEvolutiva, CategoriaGuia } from '../types';
import { getArcanoByNumero } from './arcanos';

// Category color mapping
export const CATEGORIA_COLORS: Record<string, string> = {
    CELEBRACAO: '#D4AF37',     // Gold
    REINVENTAO: '#10B981',     // Green
    COMPARTILHAMENTO: '#8B5CF6', // Purple
    PRESENCA: '#3B82F6',        // Blue
    VULNERABILIDADE: '#EC4899',  // Pink
};

export const CATEGORIA_LABELS: Record<string, string> = {
    CELEBRACAO: 'Celebração',
    REINVENTAO: 'Reinvenção',
    COMPARTILHAMENTO: 'Compartilhamento',
    PRESENCA: 'Presença',
    VULNERABILIDADE: 'Vulnerabilidade',
};

export const EVOLUTIVE_GUIDELINES: Record<number, DiretrizEvolutiva[]> = {
    1: [ // O Mago
        {
            id: 'eg-1-1', arcanoId: 1, categoria: 'REINVENTAO',
            titulo: 'Organize o Caos',
            descricao: 'Crie um sistema rígido e simples para gerenciar seus documentos e estabeleça três âncoras diárias inegociáveis para manter o foco.',
            icone: 'LayoutGrid', corCard: '#10B981',
            acaoPratica: 'Defina 3 tarefas inegociáveis para hoje e complete-as antes de abrir qualquer rede social.',
            checkinDiario: true
        },
        {
            id: 'eg-1-2', arcanoId: 1, categoria: 'PRESENCA',
            titulo: 'Domine a Dispersão',
            descricao: 'Escolha rigorosamente apenas um projeto principal por trimestre e pratique o uso do "não" para proteger sua energia vital.',
            icone: 'Target', corCard: '#3B82F6',
            acaoPratica: 'Diga "não" para pelo menos uma solicitação que não está alinhada com seu projeto principal.',
            checkinDiario: true
        },
        {
            id: 'eg-1-3', arcanoId: 1, categoria: 'PRESENCA',
            titulo: 'Cultive a Presença',
            descricao: 'Pratique meditação ativa e desligue todas as notificações digitais por pelo menos duas horas diárias para silenciar o ruído externo.',
            icone: 'Timer', corCard: '#3B82F6',
            acaoPratica: 'Desconecte todas as notificações por 2 horas e faça algo que requer concentração profunda.',
            checkinDiario: true
        },
        {
            id: 'eg-1-4', arcanoId: 1, categoria: 'VULNERABILIDADE',
            titulo: 'Honre a Emoção',
            descricao: 'Pergunte ao seu corpo o que ele sente antes de tomar decisões puramente racionais e permita-se o choro ou o grito se for preciso.',
            icone: 'Heart', corCard: '#EC4899',
            acaoPratica: 'Antes de sua próxima decisão, coloque a mão no peito e pergunte: "O que eu SINTO sobre isso?"',
            checkinDiario: false
        },
        {
            id: 'eg-1-5', arcanoId: 1, categoria: 'REINVENTAO',
            titulo: 'Estabeleça Valores',
            descricao: 'Liste cinco princípios éticos não negociáveis e revise-os semestralmente para garantir que sua versatilidade não vire mau-caratismo.',
            icone: 'Shield', corCard: '#10B981',
            acaoPratica: 'Escreva 5 valores que guiam sua vida. Releia-os toda manhã durante 7 dias.',
            checkinDiario: false
        }
    ],
    2: [ // A Sacerdotisa
        {
            id: 'eg-2-1', arcanoId: 2, categoria: 'REINVENTAO',
            titulo: 'Vença a Passividade',
            descricao: 'Comece um projeto inteiramente sozinho, sem pedir conselhos, e não espere por permissão ou validação externa para agir.',
            icone: 'Rocket', corCard: '#10B981',
            acaoPratica: 'Inicie algo hoje sem consultar ninguém. Apenas FAÇA.',
            checkinDiario: true
        },
        {
            id: 'eg-2-2', arcanoId: 2, categoria: 'REINVENTAO',
            titulo: 'Transforme Lágrimas em Suor',
            descricao: 'Entenda que a dor emocional só se cura através da ação no mundo físico; a contemplação excessiva é veneno para você.',
            icone: 'Dumbbell', corCard: '#10B981',
            acaoPratica: 'Quando sentir tristeza, levante e faça 20 minutos de exercício físico antes de qualquer outra coisa.',
            checkinDiario: true
        },
        {
            id: 'eg-2-3', arcanoId: 2, categoria: 'PRESENCA',
            titulo: 'Trabalhe o Conformismo',
            descricao: 'Pratique dizer "não" pelo menos uma vez por semana para fortalecer sua identidade e estabelecer limites.',
            icone: 'ShieldX', corCard: '#3B82F6',
            acaoPratica: 'Diga "não" para algo que normalmente aceitaria por obrigação ou medo de desagradar.',
            checkinDiario: true
        },
        {
            id: 'eg-2-4', arcanoId: 2, categoria: 'CELEBRACAO',
            titulo: 'Vire a Página',
            descricao: 'O passado deve ser apenas um mestre e não uma moradia; solte as histórias que já acabaram há anos.',
            icone: 'BookOpen', corCard: '#D4AF37',
            acaoPratica: 'Escreva sobre uma mágoa antiga e depois destrua o papel como ritual de soltar.',
            checkinDiario: false
        },
        {
            id: 'eg-2-5', arcanoId: 2, categoria: 'PRESENCA',
            titulo: 'Organize o Ambiente',
            descricao: 'A desordem externa reflete sua confusão interna. Comece organizando sua mesa de trabalho para clarear a mente.',
            icone: 'Sparkles', corCard: '#3B82F6',
            acaoPratica: 'Organize uma gaveta ou espaço físico que esteja bagunçado. A ordem externa gera clareza interna.',
            checkinDiario: false
        }
    ],
    3: [ // A Imperatriz
        {
            id: 'eg-3-1', arcanoId: 3, categoria: 'VULNERABILIDADE',
            titulo: 'Vença os Ciúmes',
            descricao: 'Compreenda que o que é verdadeiramente seu permanece por vontade própria; o controle e a posse só destroem.',
            icone: 'Heart', corCard: '#EC4899',
            acaoPratica: 'Quando sentir ciúmes, respire e pergunte: "Isso é real ou é meu medo falando?"',
            checkinDiario: true
        },
        {
            id: 'eg-3-2', arcanoId: 3, categoria: 'REINVENTAO',
            titulo: 'Vença a Inconstância',
            descricao: 'Termine um projeto antigo por completo antes de se permitir iniciar qualquer nova ideia empolgante.',
            icone: 'CheckCircle', corCard: '#10B981',
            acaoPratica: 'Trabalhe por pelo menos 30 minutos em um projeto antigo antes de começar qualquer coisa nova.',
            checkinDiario: true
        },
        {
            id: 'eg-3-3', arcanoId: 3, categoria: 'COMPARTILHAMENTO',
            titulo: 'Evite Chantagens',
            descricao: 'O amor legítimo não é um balcão de negócios; não manipule os sentimentos alheios para conseguir favores.',
            icone: 'Scale', corCard: '#8B5CF6',
            acaoPratica: 'Hoje, faça algo por alguém sem esperar NADA em troca. Zero expectativa.',
            checkinDiario: true
        },
        {
            id: 'eg-3-4', arcanoId: 3, categoria: 'PRESENCA',
            titulo: 'Estabeleça Limites',
            descricao: 'Aprender a dizer "não" é um ato de autocuidado vital; se você tentar nutrir o mundo inteiro, acabará seca por dentro.',
            icone: 'Shield', corCard: '#3B82F6',
            acaoPratica: 'Identifique uma situação onde está dando mais do que recebe e estabeleça um limite claro.',
            checkinDiario: false
        },
        {
            id: 'eg-3-5', arcanoId: 3, categoria: 'REINVENTAO',
            titulo: 'Cultive Disciplina',
            descricao: 'A rotina organizada não mata sua criatividade; ela fornece a estrutura para que seu talento ganhe o mundo real.',
            icone: 'Calendar', corCard: '#10B981',
            acaoPratica: 'Crie uma rotina matinal de 3 passos e siga-a por 7 dias seguidos.',
            checkinDiario: true
        }
    ],
    4: [ // O Imperador
        {
            id: 'eg-4-1', arcanoId: 4, categoria: 'REINVENTAO',
            titulo: 'Vença a Acomodação',
            descricao: 'Não deixe que o conforto do topo te torne estagnado; a verdadeira evolução exige que você saia da zona de segurança.',
            icone: 'TrendingUp', corCard: '#10B981',
            acaoPratica: 'Faça algo que te incomode hoje: um esporte novo, uma conversa difícil, um lugar desconhecido.',
            checkinDiario: true
        },
        {
            id: 'eg-4-2', arcanoId: 4, categoria: 'VULNERABILIDADE',
            titulo: 'Trabalhe a Escuta',
            descricao: 'Ouça genuinamente quem discorda de você; a verdade não é sua propriedade exclusiva.',
            icone: 'Ear', corCard: '#EC4899',
            acaoPratica: 'Na próxima discordância, ouça por 2 minutos SEM interromper antes de responder.',
            checkinDiario: true
        },
        {
            id: 'eg-4-3', arcanoId: 4, categoria: 'CELEBRACAO',
            titulo: 'Quebre a Monotonia',
            descricao: 'Introduza elementos de surpresa e leveza na sua rotina para que a estrutura da vida não se torne um fardo.',
            icone: 'Sparkles', corCard: '#D4AF37',
            acaoPratica: 'Mude uma coisa na sua rotina de hoje: almoce em outro lugar, ouça música diferente.',
            checkinDiario: true
        },
        {
            id: 'eg-4-4', arcanoId: 4, categoria: 'COMPARTILHAMENTO',
            titulo: 'Peça Ajuda',
            descricao: 'Reconheça que não precisa carregar o mundo sozinho; delegar é prova de inteligência e confiança.',
            icone: 'Users', corCard: '#8B5CF6',
            acaoPratica: 'Delegue uma tarefa que normalmente você faz sozinho. Confie no resultado.',
            checkinDiario: false
        },
        {
            id: 'eg-4-5', arcanoId: 4, categoria: 'PRESENCA',
            titulo: 'Invista em Si',
            descricao: 'Você é seu patrimônio mais valioso; reserve tempo sagrado para cuidar da sua saúde física e mental.',
            icone: 'HeartPulse', corCard: '#3B82F6',
            acaoPratica: 'Reserve 30 minutos hoje APENAS para você: banho longo, leitura, caminhada sem celular.',
            checkinDiario: true
        }
    ],
    5: [ // O Papa
        {
            id: 'eg-5-1', arcanoId: 5, categoria: 'PRESENCA',
            titulo: 'Ouça a Voz Interior',
            descricao: 'Nem tudo o que os livros dizem serve para você; diferencie o dogma da sua verdade pessoal.',
            icone: 'Ear', corCard: '#3B82F6',
            acaoPratica: 'Medite por 10 minutos perguntando: "O que EU acredito, separado do que me ensinaram?"',
            checkinDiario: true
        },
        {
            id: 'eg-5-2', arcanoId: 5, categoria: 'REINVENTAO',
            titulo: 'Evite o Formalismo',
            descricao: 'Não deixe que o ritual se torne mais importante que a essência; a prática deve servir à vida.',
            icone: 'Zap', corCard: '#10B981',
            acaoPratica: 'Quebre uma regra social desnecessária hoje e observe como se sente.',
            checkinDiario: false
        },
        {
            id: 'eg-5-3', arcanoId: 5, categoria: 'PRESENCA',
            titulo: 'Não Revele Planos Prematuros',
            descricao: 'Guarde suas sementes de ideias em segredo até que tenham força suficiente para brotar.',
            icone: 'Lock', corCard: '#3B82F6',
            acaoPratica: 'Hoje, guarde um plano ou ideia para si mesmo em vez de compartilhar imediatamente.',
            checkinDiario: false
        },
        {
            id: 'eg-5-4', arcanoId: 5, categoria: 'VULNERABILIDADE',
            titulo: 'Cure Feridas do Passado',
            descricao: 'O passado deve ser um mestre e não uma algema; busque resolver traumas que ainda ditam suas regras.',
            icone: 'HeartHandshake', corCard: '#EC4899',
            acaoPratica: 'Escreva sobre uma ferida de infância e como ela ainda influencia suas decisões hoje.',
            checkinDiario: false
        },
        {
            id: 'eg-5-5', arcanoId: 5, categoria: 'COMPARTILHAMENTO',
            titulo: 'Pratique a Humildade',
            descricao: 'A busca pelo conhecimento é infinita; você sempre terá algo a aprender com o mais simples dos seres.',
            icone: 'GraduationCap', corCard: '#8B5CF6',
            acaoPratica: 'Peça a alguém para te ensinar algo que essa pessoa domina e você não.',
            checkinDiario: true
        }
    ],
    21: [ // O Mundo
        {
            id: 'eg-21-1', arcanoId: 21, categoria: 'REINVENTAO',
            titulo: 'Finalize um ciclo',
            descricao: 'Entregue hoje algo que está incompleto, em vez de esperar ficar pronto.',
            icone: 'CheckCircle', corCard: '#14b8a6',
            acaoPratica: 'Escolha um projeto parado em 90% e finalize agora, mesmo imperfeito.',
            tempo: '20 min',
            checkinDiario: true,
            prioritaria: true
        },
        {
            id: 'eg-21-2', arcanoId: 21, categoria: 'CELEBRACAO',
            titulo: 'Celebra uma vitória',
            descricao: 'Agradeça por algo que deu certo esta semana',
            icone: 'PartyPopper', corCard: '#10b981',
            acaoPratica: 'Escreva 3 vitórias da semana e dance ou comemore fisicamente por 2 minutos.',
            tempo: '10 min',
            checkinDiario: true
        },
        {
            id: 'eg-21-3', arcanoId: 21, categoria: 'COMPARTILHAMENTO',
            titulo: 'Conexão global',
            descricao: 'Ajude alguém sem expectativa de retorno',
            icone: 'Globe', corCard: '#8b5cf6',
            acaoPratica: 'Envie uma mensagem de apoio genuíno para alguém que você nunca elogiou.',
            tempo: '5 min',
            checkinDiario: true
        },
        {
            id: 'eg-21-4', arcanoId: 21, categoria: 'REINVENTAO',
            titulo: 'Ritual de encerramento',
            descricao: 'Feche simbolicamente uma fase',
            icone: 'RotateCw', corCard: '#14b8a6',
            acaoPratica: 'Queime um papel com algo que quer liberar ou organize arquivos antigos.',
            tempo: '15 min',
            checkinDiario: false
        },
        {
            id: 'eg-21-5', arcanoId: 21, categoria: 'CELEBRACAO',
            titulo: 'Gratidão integral',
            descricao: 'Agradeça a todos que te ajudaram neste ciclo',
            icone: 'PenTool', corCard: '#10b981',
            acaoPratica: 'Liste 5 pessoas que foram fundamentais e envie uma mensagem para uma delas.',
            tempo: '15 min',
            checkinDiario: false
        }
    ],
    22: [ // O Louco (0)
        {
            id: 'eg-22-1', arcanoId: 22, categoria: 'REINVENTAO',
            titulo: 'Olhe Antes de Pular',
            descricao: 'A confiança na vida não exclui o uso do cérebro. Use discernimento para não transformar sua jornada em tragédia.',
            icone: 'Eye', corCard: '#10B981',
            acaoPratica: 'Antes da sua próxima decisão impulsiva, espere 24 horas e escreva prós e contras.',
            checkinDiario: true,
            prioritaria: true,
            tempo: '24h'
        },
        {
            id: 'eg-22-2', arcanoId: 22, categoria: 'PRESENCA',
            titulo: 'Honre sua Palavra',
            descricao: 'Liberdade exige integridade. Se prometeu, cumpra, ou sua liberdade será apenas mau-caratismo disfarçado.',
            icone: 'Handshake', corCard: '#3B82F6',
            acaoPratica: 'Cumpra uma promessa pendente HOJE, por menor que seja.',
            checkinDiario: true,
            tempo: '10 min'
        },
        {
            id: 'eg-22-3', arcanoId: 22, categoria: 'REINVENTAO',
            titulo: 'Crie uma Base Mínima',
            descricao: 'Até o Louco precisa de um cajado. Tenha uma estrutura básica que sustente suas aventuras.',
            icone: 'Home', corCard: '#10B981',
            acaoPratica: 'Organize um aspecto básico da sua vida: finanças, documentos ou moradia.',
            checkinDiario: false,
            tempo: '30 min'
        },
        {
            id: 'eg-22-4', arcanoId: 22, categoria: 'VULNERABILIDADE',
            titulo: 'Assuma Consequências',
            descricao: 'Pare de culpar o destino pelas quedas. Cada passo foi uma escolha sua.',
            icone: 'Scale', corCard: '#EC4899',
            acaoPratica: 'Reflita sobre uma consequência negativa recente e assuma sua parte de responsabilidade.',
            checkinDiario: false,
            tempo: '15 min'
        },
        {
            id: 'eg-22-5', arcanoId: 22, categoria: 'COMPARTILHAMENTO',
            titulo: 'Cultive Raízes Leves',
            descricao: 'É possível pertencer sem ser escravizado. Crie vínculos que permitam seu movimento e o do outro.',
            icone: 'TreePine', corCard: '#8B5CF6',
            acaoPratica: 'Mande uma mensagem genuína para alguém que faz tempo que não fala. Reconecte sem obrigação.',
            checkinDiario: true,
            tempo: '5 min'
        }
    ]
};

const CATEGORIAS: CategoriaGuia[] = ['CELEBRACAO', 'REINVENTAO', 'COMPARTILHAMENTO', 'PRESENCA', 'VULNERABILIDADE'];
const ICONS = ['Target', 'Sparkles', 'Zap', 'Droplets', 'Globe'];
const TIMES = ['5 min', '10 min', '15 min', '20 min', 'Hoje'];
const COLORS = ['#14b8a6', '#10b981', '#8b5cf6', '#3b82f6', '#ec4899'];

/**
 * As práticas de um arcano.
 *
 * Sete dos vinte e dois arcanos têm práticas escritas à mão acima, com título,
 * diretriz e uma ação concreta para hoje. Os outros quinze caem nas cinco
 * `diretrizes` do arcanos.json — que já são boas ações, curtas e no imperativo.
 *
 * O que estava errado era o modo de encaixá-las neste formato: o título saía de
 * `d.split(" ").slice(0, 3).join(" ") + "..."`, ou seja, as três primeiras
 * palavras da frase seguidas de reticências, e a frase inteira repetia logo
 * abaixo como descrição. O card mostrava "Comece algo novo..." e, um centímetro
 * depois, "Comece algo novo hoje, mesmo que pequeno". Duas vezes a mesma coisa,
 * uma delas cortada no meio.
 *
 * Agora a diretriz é o título — ela já é uma frase completa — e a descrição
 * fica vazia, com a tela sabendo não abrir espaço para ela.
 */
export function getGuidelinesForArcano(arcanoId: number): DiretrizEvolutiva[] {
    if (EVOLUTIVE_GUIDELINES[arcanoId]) {
        return EVOLUTIVE_GUIDELINES[arcanoId];
    }

    const arcano = getArcanoByNumero(arcanoId);
    if (!arcano || !arcano.diretrizes) return [];

    return arcano.diretrizes.map((d, idx) => ({
        id: `eg-${arcanoId}-${idx + 1}`,
        arcanoId,
        categoria: CATEGORIAS[idx % CATEGORIAS.length],
        titulo: d,
        descricao: '',
        icone: ICONS[idx % ICONS.length],
        corCard: COLORS[idx % COLORS.length],
        acaoPratica: d,
        checkinDiario: idx < 3,
        tempo: TIMES[idx % TIMES.length],
        prioritaria: idx === 0
    }));
}
