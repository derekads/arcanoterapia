import { AreaDaVidaInterpretacao, AreaDaVida } from '../types';
import { getArcanoByNumero } from './arcanos';

export const AREA_LABELS: Record<AreaDaVida, string> = {
    AMOR: 'Amor & Relações',
    DINHEIRO: 'Dinheiro & Abundância',
    SAUDE: 'Vitalidade & Corpo',
    CARREIRA: 'Carreira & Missão',
    FAMILIA: 'Família & Raízes',
    PROPOSITO: 'Propósito & Destino',
};

export const AREA_COLORS: Record<AreaDaVida, string> = {
    AMOR: '#f43f5e',      // rose-500
    DINHEIRO: '#10b981',   // emerald-500
    SAUDE: '#f59e0b',      // amber-500
    CARREIRA: '#3b82f6',   // blue-500
    FAMILIA: '#8b5cf6',    // violet-500
    PROPOSITO: '#d946ef',  // fuchsia-500
};

export const LIFE_AREA_INTERPRETATIONS: Record<number, AreaDaVidaInterpretacao[]> = {
    1: [ // O Mago
        { area: 'AMOR', alta: 'Sua comunicação é fluida e a conexão intelectual com o parceiro é intensa. Você mantém a relação viva por meio do diálogo e da criatividade constante.', baixa: 'Superficialidade nos vínculos: você troca de parceiros como quem troca de canal. Cuidado com o medo de se aprofundar e ser realmente conhecido.', media: 'Invista em conversas profundas sem distrações digitais. Desconecte o celular durante os momentos a dois.', check_diario: 'Você usou seu charme para conectar ou para manipular hoje?' },
        { area: 'DINHEIRO', alta: 'Sua versatilidade gera múltiplas fontes de renda. Você possui uma habilidade natural para encontrar oportunidades onde outros veem apenas obstáculos.', baixa: 'Busca por dinheiro fácil e dispersão financeira. Tendência a investimentos impulsivos em projetos que nunca se concretizam.', media: 'Automatize suas finanças: configure uma poupança automática para o dia do pagamento. Evite decisões por impulso.', check_diario: 'Seu dinheiro serviu ao seu propósito ou fugiu por entre os dedos?' },
        { area: 'SAUDE', alta: 'Mente rápida e corpo ágil. Você possui a capacidade de adotar novos hábitos saudáveis com extrema facilidade quando motivado.', baixa: 'Ansiedade crônica e insônia por mente acelerada. Tendência a ignorar as necessidades do corpo em favor do intelecto.', media: 'Pratique exercícios que acalmem o sistema nervoso: natação, yoga ou caminhadas em meio à natureza.', check_diario: 'Sua garganta e sistema nervoso receberam o descanso necessário?' },
        { area: 'CARREIRA', alta: 'Comunicador nato que brilha em tecnologia, mídia e ensino. Sua capacidade de reinventar a carreira é um de seus maiores trunfos.', baixa: 'Instabilidade profissional por tédio. Dificuldade em construir uma especialização profunda e duradoura.', media: 'Busque profundidade: comprometa-se com uma área específica por ao menos dois anos para consolidar sua autoridade.', check_diario: 'Você escolheu a excelência ou apenas a conveniência hoje?' },
        { area: 'FAMILIA', alta: 'Você traz leveza e humor para o ambiente familiar, conectando gerações por meio da comunicação clara e afetuosa.', baixa: 'Evita conflitos familiares com charme superficial. Pode ser percebido como emocionalmente ausente.', media: 'Reserve tempo de qualidade, livre de dispositivos, para cada membro da família semanalmente.', check_diario: 'Você esteve presente de alma ou apenas de corpo?' },
        { area: 'PROPOSITO', alta: 'Seu propósito está ligado à manifestação de ideias. Você é o canal sagrado entre o potencial puro e a realidade concreta.', baixa: 'Confunde agitação com propósito. Realiza múltiplas tarefas sem direção, acreditando que o excesso é intensidade.', media: 'Defina sua missão em uma única frase e releia-a diariamente para manter o norte.', check_diario: 'Sua ação principal de hoje foi um passo em direção ao seu destino?' }
    ],
    2: [ // A Sacerdotisa
        { area: 'AMOR', alta: 'Conexão emocional profunda e intuitiva. Você compreende as necessidades do parceiro antes mesmo que ele as verbalize.', baixa: 'Idealização excessiva e dependência emocional. Aceitação de migalhas afetivas por medo da solidão.', media: 'Antes de mergulhar em uma relação, questione: "Eu escolho esta pessoa ou apenas preciso dela?"', check_diario: 'Você honrou sua soberania emocional ou buscou refúgio no outro?' },
        { area: 'DINHEIRO', alta: 'Intuição financeira afiada. Quando confia em seu instinto, você realiza escolhas de investimento extremamente precisas.', baixa: 'Passividade financeira: espera que terceiros resolvam sua situação. Medo ou bloqueio em tratar de temas materiais.', media: 'Assuma o controle total de ao menos uma conta ou investimento por conta própria esta semana.', check_diario: 'Você delegou seu poder financeiro por medo ou preguiça?' },
        { area: 'SAUDE', alta: 'Sensibilidade natural para perceber desequilíbrios sutis do corpo antes que se manifestem como doenças graves.', baixa: 'Somatização emocional intensa: tendência a armazenar mágoas no sistema digestivo e renal.', media: 'Hidrate-se com consciência e aprenda a externalizar suas emoções em vez de "engoli-las".', check_diario: 'Como está seu estômago? O que você ainda não conseguiu digerir?' },
        { area: 'CARREIRA', alta: 'Excelência em áreas que exigem profundidade e discrição, como psicologia, pesquisa, escrita e análise.', baixa: 'Subestima as próprias capacidades e aguarda passivamente por um reconhecimento que "deve" vir.', media: 'Tome as rédeas: atualize seu portfólio e projete sua voz para o mundo ativamente.', check_diario: 'Você se permitiu ser vista ou continuou escondida no silêncio?' },
        { area: 'FAMILIA', alta: 'Porto seguro emocional e guardiã da memória familiar. Sua presença traz serenidade e acolhimento aos entes queridos.', baixa: 'Carrega o fardo emocional de todos e negligencia as próprias necessidades. Papel de "salvadora" exaustiva.', media: 'Estabeleça limites claros. Entenda que o maior ato de amor pode ser deixar o outro crescer sozinho.', check_diario: 'Você nutriu a si mesma com a mesma dedicação que nutre os outros?' },
        { area: 'PROPOSITO', alta: 'Seu propósito reside na cura, no acolhimento e na sabedoria silenciosa. Você é a guardiã do sagrado cotidiano.', baixa: 'Usa a espiritualidade como fuga da ação. O "esperar o momento certo" torna-se uma procrastinação elegante.', media: 'Compreenda que a contemplação real exige manifestação no mundo. Medite e, em seguida, aja.', check_diario: 'Seu silêncio foi de sabedoria ou de fuga da realidade?' }
    ],
    3: [ // A Imperatriz
        { area: 'AMOR', alta: 'Amor apaixonado, sensorial e vibrante. Você possui o dom de criar relações cheias de vida e beleza estética.', baixa: 'Possessividade disfarçada de cuidado. Ciúmes intensos e necessidade constante de controle sobre o outro.', media: 'Pratique a confiança deliberada: escolha não investigar ou monitorar o parceiro por uma semana.', check_diario: 'Você amou com liberdade ou com correntes hoje?' },
        { area: 'DINHEIRO', alta: 'Magnetismo natural para atrair abundância. Você transforma sua criatividade em prosperidade palpável com facilidade.', baixa: 'Consumismo compulsivo como compensação emocional. Gasto excessivo em aparências para mascarar o vazio.', media: 'Pausa sagrada: antes de qualquer compra supérflua, aguarde 48 horas. Observe se o desejo permanece.', check_diario: 'O que você tentou preencher com consumo hoje?' },
        { area: 'SAUDE', alta: 'Vitalidade exuberante e grande capacidade de regeneração física. Corpo em harmonia com os ciclos naturais.', baixa: 'Desequilíbrios hormonais e problemas de pele causados por estresse emocional e excessos sensoriais.', media: 'Honre seu corpo com rituais de autoamor e monitore seu equilíbrio hormonal anualmente.', check_diario: 'Seus excessos ocultos estão cobrando o preço do seu brilho?' },
        { area: 'CARREIRA', alta: 'Brilha em áreas de criação, estética, gastronomia e design. Seu talento natural inspira e embeleza o ambiente de trabalho.', baixa: 'Inconstância profissional: abandono de projetos assim que o prazer da novidade se dissipa.', media: 'Cultive a disciplina criativa. Entenda que a estrutura é o que permite ao seu talento ganhar o mundo.', check_diario: 'Você nutriu sua obra com constância ou apenas com ímpeto?' },
        { area: 'FAMILIA', alta: 'Cria lares acolhedores e nutritivos. Presença generosa que floresce por meio do cuidado com os filhos e entes.', baixa: 'Controle maternal excessivo. Dificuldade em permitir a independência e o crescimento dos familiares.', media: 'Permita que cada membro da família tenha seu próprio espaço e faça suas próprias escolhas sem interferência.', check_diario: 'Seu cuidado protegeu ou sufocou quem você ama hoje?' },
        { area: 'PROPOSITO', alta: 'Seu propósito é embelezar o mundo e nutrir a vida por meio da sua expressão criativa única.', baixa: 'Confunde propósito com gratificação imediata. Busca o prazer momentâneo em vez de um legado sólido.', media: 'Questione-se: "O que eu estou gerando agora que sobreviverá ao tempo?"', check_diario: 'Você agiu como herdeira ou como criadora do seu destino?' }
    ],
    4: [ // O Imperador
        { area: 'AMOR', alta: 'Parceiro leal, protetor e estável. Oferece segurança e uma base sólida para a construção de um futuro comum.', baixa: 'Controle disfarçado de proteção. Competição e autoritarismo dentro da dinâmica do relacionamento.', media: 'Substitua o "eu sei o que é melhor" por uma escuta genuína do que o parceiro realmente necessita.', check_diario: 'Você foi o guardião ou o carcereiro do coração alheio hoje?' },
        { area: 'DINHEIRO', alta: 'Construtor de patrimônio sólido e estratégico. Visão clara para investimentos de longo prazo e segurança material.', baixa: 'Dinheiro como ferramenta de poder e dominação. Avareza e rigidez excessiva nos gastos.', media: 'Pratique a generosidade planejada. Doar para causas nobres quebra o ciclo de apego ao controle material.', check_diario: 'Sua riqueza te liberta ou te escraviza aos seus medos?' },
        { area: 'SAUDE', alta: 'Corpo resistente e resiliente. Disciplina natural para manter rotinas rigorosas de cuidado e fortalecimento.', baixa: 'Raiva contida que se manifesta como tensão muscular, problemas de fígado e dores na coluna vertebral.', media: 'Integre exercícios de liberação de tensão e aprenda a expressar suas frustrações de forma construtiva.', check_diario: 'Que peso você está carregando nas costas que não lhe pertence?' },
        { area: 'CARREIRA', alta: 'Líder nato que brilha em administração, engenharia, direito e gestão. Excelente capacidade de execução e ordem.', baixa: 'Workaholismo como fuga emocional. Identidade fundida ao cargo, gerando medo profundo da obsolescência.', media: 'Tire férias reais de sua posição. Descubra quem você é quando não está no comando de nada.', check_diario: 'Se você perdesse seu título hoje, o que restaria de sua essência?' },
        { area: 'FAMILIA', alta: 'Referência de estabilidade e proteção. Cria um ambiente seguro e estruturado para o desenvolvimento de todos.', baixa: 'Autoritarismo que confunde disciplina com afeto. Presença fria e excessivamente voltada a regras.', media: 'Dedique tempo para o "caos lúdico" com a família. Brinque sem regras, sem metas e sem julgamentos.', check_diario: 'Sua casa foi um lar ou uma repartição hoje?' },
        { area: 'PROPOSITO', alta: 'Seu propósito é edificar estruturas que sustentem e protejam o bem comum e a evolução coletiva.', baixa: 'Confunde propósito com acúmulo de poder pessoal. Constrói impérios sobre o medo em vez do serviço.', media: 'Reflita sobre o impacto social de suas construções: quem mais se beneficia do seu esforço?', check_diario: 'O que você ergueu hoje que servirá às próximas gerações?' }
    ],
    5: [ // O Papa
        { area: 'AMOR', alta: 'Parceiro sábio, ético e respeitoso. Valoriza os rituais da convivência e a evolução compartilhada de valores.', baixa: 'Tratamento do parceiro como subordinado ou aluno. Dificuldade extrema em admitir fragilidades.', media: 'Permita-se ser vulnerável e aprenda com o parceiro em áreas que você não domina intelectualmente.', check_diario: 'Você dividiu o mesmo patamar ou falou do púlpito hoje?' },
        { area: 'DINHEIRO', alta: 'Gestão financeira pautada pela ética e prudência. Prosperidade que advém do ensino e da mentoria.', baixa: 'Rigidez financeira por medo do novo. Resistência em investir em áreas que fogem ao conhecimento tradicional.', media: 'Abra-se para o novo: diversifique seus investimentos com cautela, mas sem o dogmatismo de outrora.', check_diario: 'Sua segurança vem da conta bancária ou da sua fé inabalável?' },
        { area: 'SAUDE', alta: 'Busca por equilíbrio por meio de métodos tradicionais e holísticos. Corpo beneficiado por rituais de cuidado.', baixa: 'Somatização de responsabilidades morais: problemas circulatórios e rigidez física refletindo a mental.', media: 'Pratique atividades que tragam fluidez e movimento, como natação ou caminhadas rítmicas.', check_diario: 'Sua rigidez mental está endurecendo suas articulações?' },
        { area: 'CARREIRA', alta: 'Excelência como mentor, professor, consultor ou conselheiro. Transmissor nato de sabedoria e ética profissional.', baixa: 'Resistência à inovação e arrogância intelectual. Risco de obsolescência por apego ao "sempre foi assim".', media: 'Seja um eterno aluno: aprenda uma técnica ou ferramenta moderna a cada novo ciclo sazonal.', check_diario: 'Hoje você aprendeu algo novo ou apenas repetiu o que já sabia?' },
        { area: 'FAMILIA', alta: 'Guardião das tradições e valores familiares. Conecta as gerações por meio da transmissão de sabedoria.', baixa: 'Dogmatismo que sufoca a individualidade dos familiares. Dificuldade em aceitar crenças divergentes.', media: 'Pratique a tolerância ativa. Permita que cada membro da família trilhe seu próprio caminho espiritual.', check_diario: 'Sua tradição foi um farol ou uma sombra sobre sua família?' },
        { area: 'PROPOSITO', alta: 'Seu propósito é servir como ponte entre a sabedoria ancestral e os desafios da vida moderna.', baixa: 'Perda da essência em favor do formalismo vazio. Prega a virtude enquanto vive na contradição oculta.', media: 'A base da sua missão é a coerência absoluta entre o que você ensina e o que você pratica.', check_diario: 'Sua vida foi o melhor exemplo da sua verdade hoje?' }
    ],
    22: [ // O Louco (0)
        { area: 'AMOR', alta: 'Amor livre, espontâneo e desprendido. Traz um frescor renovador para qualquer relacionamento.', baixa: 'Fuga sistemática de compromissos por medo infantil de perder a liberdade. Confunde isolamento com autonomia.', media: 'Entenda que o compromisso consciente pode ser a maior das liberdades. Tente fincar raízes temporárias.', check_diario: 'Você fugiu da intimidade ou celebrou a presença hoje?' },
        { area: 'DINHEIRO', alta: 'Fé inabalável na providência da vida. Desapego saudável que atrai fluxos inesperados de abundância.', baixa: 'Irresponsabilidade material total. Dependência financeira de terceiros por falta de base e planejamento.', media: 'Estruture o básico: crie uma reserva de segurança que sustente suas aventuras sem sobrecarregar outros.', check_diario: 'Sua confiança no Universo é real ou é apenas preguiça de se planejar?' },
        { area: 'SAUDE', alta: 'Vitalidade juvenil e corpo ágil. Grande resiliência física e capacidade de recuperação rápida.', baixa: 'Acidentes por distração e problemas no sistema nervoso por excesso de estímulos e falta de "grounding".', media: 'Pratique o aterramento físico: ande descalço na terra e exercite o equilíbrio corporal regularmente.', check_diario: 'Você cuidou do veículo que transporta sua alma nesta jornada?' },
        { area: 'CARREIRA', alta: 'Inovador radical que abre caminhos inéditos. Capacidade de empreender no que outros consideram impossível.', baixa: 'Erraticidade profissional: muda de foco compulsivamente e não constrói nada sólido por falta de persistência.', media: 'Busque a liberdade dentro de uma estrutura flexível, como o trabalho autônomo com metas claras.', check_diario: 'Você está abrindo um caminho novo ou apenas fugindo do esforço?' },
        { area: 'FAMILIA', alta: 'Inspira a família a viver com menos medo e mais ousadia. Traz frescor e quebra de padrões obsoletos.', baixa: 'Ausência física e emocional constante. A família o percebe como alguém em quem não se pode confiar.', media: 'Crie raízes de afeto. Esteja presente de forma real nos momentos que exigem responsabilidade compartilhada.', check_diario: 'Quem você deixou para trás em nome da sua "liberdade" hoje?' },
        { area: 'PROPOSITO', alta: 'Seu propósito é demonstrar que o desconhecido é o terreno fértil da fé e da evolução contínua.', baixa: 'Movimento sem sentido: viaja e muda sem jamais amadurecer a visão interna de destino.', media: 'O sentido da vida não está no próximo destino, mas na qualidade da sua presença onde quer que esteja.', check_diario: 'Seu movimento de hoje foi uma busca ou uma fuga?' }
    ]
};

const AREA_MAP: Record<string, AreaDaVida> = {
    amor: 'AMOR', dinheiro: 'DINHEIRO', saude: 'SAUDE',
    carreira: 'CARREIRA', familia: 'FAMILIA', proposito: 'PROPOSITO',
};

export function getLifeAreaInterpretations(arcanoId: number): AreaDaVidaInterpretacao[] {
    if (LIFE_AREA_INTERPRETATIONS[arcanoId]) {
        return LIFE_AREA_INTERPRETATIONS[arcanoId];
    }
    // Fallback: convert arcanos.json rodadaVida to AreaDaVidaInterpretacao format
    const arcano = getArcanoByNumero(arcanoId);
    if (!arcano || !arcano.rodadaVida) return [];
    return Object.entries(arcano.rodadaVida).map(([key, levels]) => ({
        area: AREA_MAP[key] || 'PROPOSITO' as AreaDaVida,
        alta: levels.alta,
        baixa: levels.baixa,
        media: levels.media,
        check_diario: levels.check_diario || '',
    }));
}
