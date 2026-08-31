import { Afirmacao, TipoAfirmacao } from '../types';
import { getArcanoByNumero } from './arcanos';

export const AFFIRMATIONS: Record<number, Afirmacao[]> = {
    1: [ // O Mago
        { id: 'af-1-1', arcanoId: 1, tipo: 'MANHA', texto: 'Eu tenho todas as ferramentas necessárias para criar a vida que desejo. Hoje eu escolho o foco.' },
        { id: 'af-1-2', arcanoId: 1, tipo: 'MANHA', texto: 'Minha mente é clara, minha intenção é firme. Eu manifesto com consciência e propósito.' },
        { id: 'af-1-3', arcanoId: 1, tipo: 'NOITE', texto: 'Hoje eu honrei meu potencial. Eu descanso sabendo que amanhã posso ir mais fundo.' },
        { id: 'af-1-4', arcanoId: 1, tipo: 'NOITE', texto: 'Eu solto a necessidade de controlar tudo. O silêncio me regenera e renova minha criatividade.' },
        { id: 'af-1-5', arcanoId: 1, tipo: 'CRISIS', texto: 'O caos é apenas matéria-prima. Eu tenho a habilidade de transformar qualquer situação em oportunidade.' },
        { id: 'af-1-6', arcanoId: 1, tipo: 'PROSPERIDADE', texto: 'Minha versatilidade é minha riqueza. Cada habilidade que cultivo abre uma nova porta de abundância.' },
        { id: 'af-1-7', arcanoId: 1, tipo: 'AMOR', texto: 'Eu me comunico com clareza e ouço com atenção. Meus relacionamentos se aprofundam quando sou verdadeiro.' },
    ],
    2: [ // A Sacerdotisa
        { id: 'af-2-1', arcanoId: 2, tipo: 'MANHA', texto: 'Minha intuição é minha bússola mais confiável. Eu confio no que sinto, mesmo quando não consigo explicar.' },
        { id: 'af-2-2', arcanoId: 2, tipo: 'MANHA', texto: 'Eu sou completa sozinha. Minha força nasce do meu silêncio interior, não da aprovação alheia.' },
        { id: 'af-2-3', arcanoId: 2, tipo: 'NOITE', texto: 'Hoje eu agi com coragem. Cada pequena ação minha afasta a inércia e me traz mais perto de quem eu sou.' },
        { id: 'af-2-4', arcanoId: 2, tipo: 'NOITE', texto: 'Eu solto as mágoas do dia. Meus sonhos trarão as respostas que preciso para o amanhã.' },
        { id: 'af-2-5', arcanoId: 2, tipo: 'CRISIS', texto: 'O medo é apenas uma ilusão do meu ego. Minha alma já sabe o caminho — eu confio nela.' },
        { id: 'af-2-6', arcanoId: 2, tipo: 'PROSPERIDADE', texto: 'Minha receptividade atrai as oportunidades certas no momento certo. Eu mereço receber sem culpa.' },
        { id: 'af-2-7', arcanoId: 2, tipo: 'AMOR', texto: 'Eu me amo antes de buscar amor no outro. Minha plenitude atrai relações de igualdade e respeito.' },
    ],
    3: [ // A Imperatriz
        { id: 'af-3-1', arcanoId: 3, tipo: 'MANHA', texto: 'Eu sou o canal da beleza e da abundância. Tudo que toco floresce porque eu nutro com amor genuíno.' },
        { id: 'af-3-2', arcanoId: 3, tipo: 'MANHA', texto: 'Minha criatividade é inesgotável quando eu a dirijo com disciplina e amor.' },
        { id: 'af-3-3', arcanoId: 3, tipo: 'NOITE', texto: 'Hoje eu criei com intenção e sustentei com amor. Eu me permito descansar sem culpa.' },
        { id: 'af-3-4', arcanoId: 3, tipo: 'NOITE', texto: 'Eu solto a necessidade de possuir. O que é verdadeiramente meu permanece por vontade própria.' },
        { id: 'af-3-5', arcanoId: 3, tipo: 'CRISIS', texto: 'Minha tempestade interior é apenas a energia criativa buscando direção. Eu a canalizo, não a reprimo.' },
        { id: 'af-3-6', arcanoId: 3, tipo: 'PROSPERIDADE', texto: 'A abundância flui naturalmente quando eu paro de forçar e começo a confiar no meu magnetismo.' },
        { id: 'af-3-7', arcanoId: 3, tipo: 'AMOR', texto: 'Eu amo sem correntes. Minha presença é o presente mais valioso que posso oferecer a quem amo.' },
    ],
    4: [ // O Imperador
        { id: 'af-4-1', arcanoId: 4, tipo: 'MANHA', texto: 'Eu governo minha vida com sabedoria e abro meu coração para a flexibilidade que me faz humano.' },
        { id: 'af-4-2', arcanoId: 4, tipo: 'MANHA', texto: 'Minha força real está na minha capacidade de ser vulnerável quando necessário.' },
        { id: 'af-4-3', arcanoId: 4, tipo: 'NOITE', texto: 'Hoje eu liderei com compaixão. Eu descanso sabendo que é seguro soltar o controle.' },
        { id: 'af-4-4', arcanoId: 4, tipo: 'NOITE', texto: 'Eu não preciso carregar o mundo sozinho. Delegar é sabedoria, não fraqueza.' },
        { id: 'af-4-5', arcanoId: 4, tipo: 'CRISIS', texto: 'A verdadeira autoridade vem da calma interior. Eu respiro antes de reagir e ajo com inteligência.' },
        { id: 'af-4-6', arcanoId: 4, tipo: 'PROSPERIDADE', texto: 'Eu construo impérios que servem à vida, não ao ego. Minha riqueza é medida pelo que ergo para outros.' },
        { id: 'af-4-7', arcanoId: 4, tipo: 'AMOR', texto: 'Eu protejo sem prender. Meu amor é um castelo com portas abertas, não uma fortaleza com muros.' },
    ],
    5: [ // O Papa
        { id: 'af-5-1', arcanoId: 5, tipo: 'MANHA', texto: 'Eu ensino o que vivo e aprendo com o que observo. Minha sabedoria nasce da coerência.' },
        { id: 'af-5-2', arcanoId: 5, tipo: 'MANHA', texto: 'Eu sou eterno aprendiz. Cada pessoa que encontro tem algo sagrado para me ensinar.' },
        { id: 'af-5-3', arcanoId: 5, tipo: 'NOITE', texto: 'Hoje eu pratiquei a humildade de não saber. Isso me tornou mais sábio do que qualquer livro.' },
        { id: 'af-5-4', arcanoId: 5, tipo: 'NOITE', texto: 'Eu solto o julgamento. Cada ser humano carrega uma verdade que merece ser ouvida.' },
        { id: 'af-5-5', arcanoId: 5, tipo: 'CRISIS', texto: 'Quando minhas crenças são abaladas, é porque algo maior quer nascer. Eu me abro para a nova verdade.' },
        { id: 'af-5-6', arcanoId: 5, tipo: 'PROSPERIDADE', texto: 'A verdadeira riqueza é a sabedoria que compartilho. Quanto mais ensino, mais aprendo e recebo.' },
        { id: 'af-5-7', arcanoId: 5, tipo: 'AMOR', texto: 'Eu amo sem pregar. Minha presença silenciosa é o ensino mais poderoso que posso oferecer.' },
    ],
    6: [ // Os Enamorados
        { id: 'af-6-1', arcanoId: 6, tipo: 'MANHA', texto: 'Eu escolho hoje sem esperar ter certeza. A dúvida não me paralisa, ela só me pede presença.' },
        { id: 'af-6-2', arcanoId: 6, tipo: 'MANHA', texto: 'Eu me amo primeiro e por isso amo sem me perder. Minha inteireza não depende de ninguém.' },
        { id: 'af-6-3', arcanoId: 6, tipo: 'NOITE', texto: 'Hoje eu decidi e sustentei a decisão. Descanso sem revisitar o caminho que não escolhi.' },
        { id: 'af-6-4', arcanoId: 6, tipo: 'NOITE', texto: 'Eu solto a imagem que fiz do outro. Amanhã encontro a pessoa real, melhor que a projeção.' },
        { id: 'af-6-5', arcanoId: 6, tipo: 'CRISIS', texto: 'Não escolher também é escolha, e é a única que me tira do jogo. Prefiro decidir e ajustar.' },
        { id: 'af-6-6', arcanoId: 6, tipo: 'PROSPERIDADE', texto: 'Minha abundância vem das parcerias em que eu chego inteiro. Eu somo, não completo o que falta.' },
        { id: 'af-6-7', arcanoId: 6, tipo: 'AMOR', texto: 'Eu amo o que existe no outro, não o que projetei nele. É assim que o vínculo dura.' },
    ],
    7: [ // O Carro
        { id: 'af-7-1', arcanoId: 7, tipo: 'MANHA', texto: 'Eu conduzo minhas emoções em vez de ser conduzido por elas. Hoje eu escolho a direção.' },
        { id: 'af-7-2', arcanoId: 7, tipo: 'MANHA', texto: 'Minha vontade tem destino. Eu avanço com foco, não com pressa de fugir de mim mesmo.' },
        { id: 'af-7-3', arcanoId: 7, tipo: 'NOITE', texto: 'Hoje eu cheguei mais perto sem atropelar ninguém. Descanso sabendo que o passo foi meu.' },
        { id: 'af-7-4', arcanoId: 7, tipo: 'NOITE', texto: 'Eu solto as rédeas antes de dormir. O que não terminou hoje continua me esperando amanhã.' },
        { id: 'af-7-5', arcanoId: 7, tipo: 'CRISIS', texto: 'Eu não perdi o controle, eu perdi a rota. Paro, respiro e escolho a direção outra vez.' },
        { id: 'af-7-6', arcanoId: 7, tipo: 'PROSPERIDADE', texto: 'Meus recursos vêm da constância, não do impulso. Eu avanço um pouco todo santo dia.' },
        { id: 'af-7-7', arcanoId: 7, tipo: 'AMOR', texto: 'Eu dirijo a relação para o crescimento, nunca para a disputa. Vencer sozinho é perder.' },
    ],
    8: [ // A Justiça
        { id: 'af-8-1', arcanoId: 8, tipo: 'MANHA', texto: 'Eu digo a verdade hoje, inclusive para mim. A clareza sempre me custa menos que o disfarce.' },
        { id: 'af-8-2', arcanoId: 8, tipo: 'MANHA', texto: 'Minha integridade não precisa de plateia. Eu ajo certo mesmo quando ninguém está conferindo.' },
        { id: 'af-8-3', arcanoId: 8, tipo: 'NOITE', texto: 'Hoje eu fui justo sem ser duro. Descanso com as contas em dia comigo mesmo.' },
        { id: 'af-8-4', arcanoId: 8, tipo: 'NOITE', texto: 'Eu solto a régua que uso nos outros. Amanhã eu meço com compaixão, não com sentença.' },
        { id: 'af-8-5', arcanoId: 8, tipo: 'CRISIS', texto: 'Rigidez não é firmeza, é medo com postura. Eu escolho o que é justo, não o que me dá razão.' },
        { id: 'af-8-6', arcanoId: 8, tipo: 'PROSPERIDADE', texto: 'Minha riqueza cresce na troca justa. O que eu ganho sem equilíbrio não fica comigo.' },
        { id: 'af-8-7', arcanoId: 8, tipo: 'AMOR', texto: 'Amar é equilibrar o que eu dou e o que recebo. Eu não compro afeto com sacrifício.' },
    ],
    9: [ // O Eremita
        { id: 'af-9-1', arcanoId: 9, tipo: 'MANHA', texto: 'Minha luz interior basta para o próximo passo. Eu não preciso ver o caminho inteiro.' },
        { id: 'af-9-2', arcanoId: 9, tipo: 'MANHA', texto: 'Eu me recolho para escutar, não para me esconder. O silêncio de hoje tem propósito.' },
        { id: 'af-9-3', arcanoId: 9, tipo: 'NOITE', texto: 'Hoje eu ouvi a mim mesmo sem pressa. Descanso com uma verdade a mais do que tinha.' },
        { id: 'af-9-4', arcanoId: 9, tipo: 'NOITE', texto: 'Eu solto a ideia de que estar só me protege. Amanhã eu divido o que aprendi aqui.' },
        { id: 'af-9-5', arcanoId: 9, tipo: 'CRISIS', texto: 'Recuar não é desistir. Eu me afasto o suficiente para enxergar, e depois eu volto.' },
        { id: 'af-9-6', arcanoId: 9, tipo: 'PROSPERIDADE', texto: 'Meu maior patrimônio é o que eu sei. Prospero quando compartilho em vez de guardar.' },
        { id: 'af-9-7', arcanoId: 9, tipo: 'AMOR', texto: 'Eu amo a partir da minha inteireza, não da minha carência. Chego junto sem me anular.' },
    ],
    10: [ // A Roda da Fortuna
        { id: 'af-10-1', arcanoId: 10, tipo: 'MANHA', texto: 'Eu me movo com o ciclo em vez de brigar com ele. Hoje eu ajo dentro do que é possível.' },
        { id: 'af-10-2', arcanoId: 10, tipo: 'MANHA', texto: 'A roda gira e eu permaneço no eixo. Minha paz não depende da fase que estou vivendo.' },
        { id: 'af-10-3', arcanoId: 10, tipo: 'NOITE', texto: 'Hoje eu aceitei o que mudou sem me perder. Descanso sabendo que amanhã é outra volta.' },
        { id: 'af-10-4', arcanoId: 10, tipo: 'NOITE', texto: 'Eu solto a fase que terminou. O que passou já me deu tudo o que tinha para dar.' },
        { id: 'af-10-5', arcanoId: 10, tipo: 'CRISIS', texto: 'Isto também passa, e eu não preciso apressar nem segurar. Fico firme enquanto gira.' },
        { id: 'af-10-6', arcanoId: 10, tipo: 'PROSPERIDADE', texto: 'A sorte encontra quem já está em movimento. Eu me preparo e a oportunidade me acha.' },
        { id: 'af-10-7', arcanoId: 10, tipo: 'AMOR', texto: 'Eu aceito as fases do amor sem exigir que uma delas dure para sempre. Presença basta.' },
    ],
    11: [ // A Força
        { id: 'af-11-1', arcanoId: 11, tipo: 'MANHA', texto: 'Minha força é firme e gentil ao mesmo tempo. Eu domino a fera sem precisar feri-la.' },
        { id: 'af-11-2', arcanoId: 11, tipo: 'MANHA', texto: 'Eu tenho coragem para o difícil e paciência para o lento. Hoje eu sustento os dois.' },
        { id: 'af-11-3', arcanoId: 11, tipo: 'NOITE', texto: 'Hoje eu segurei minha raiva sem engoli-la nem despejá-la. Descanso com o corpo leve.' },
        { id: 'af-11-4', arcanoId: 11, tipo: 'NOITE', texto: 'Eu solto a exigência de ser forte o tempo todo. Amanhã eu tenho direito de ser humano.' },
        { id: 'af-11-5', arcanoId: 11, tipo: 'CRISIS', texto: 'Eu não preciso vencer isto no grito. A calma que eu sustento é a força que resolve.' },
        { id: 'af-11-6', arcanoId: 11, tipo: 'PROSPERIDADE', texto: 'Minha abundância vem da persistência gentil. O que eu construo devagar não desaba.' },
        { id: 'af-11-7', arcanoId: 11, tipo: 'AMOR', texto: 'Eu amo com força que protege, nunca com posse que prende. Cuidar não é controlar.' },
    ],
    12: [ // O Enforcado
        { id: 'af-12-1', arcanoId: 12, tipo: 'MANHA', texto: 'Eu suspendo a pressa para ver o que estava invisível. Parar hoje é uma forma de agir.' },
        { id: 'af-12-2', arcanoId: 12, tipo: 'MANHA', texto: 'Eu entrego o que não controlo e cuido do que é meu. A diferença entre os dois me liberta.' },
        { id: 'af-12-3', arcanoId: 12, tipo: 'NOITE', texto: 'Hoje eu não forcei o que não estava pronto. Descanso sem culpa pelo que ficou parado.' },
        { id: 'af-12-4', arcanoId: 12, tipo: 'NOITE', texto: 'Eu solto a ideia de que sofrer prova alguma coisa. Amanhã eu entrego sem me sacrificar.' },
        { id: 'af-12-5', arcanoId: 12, tipo: 'CRISIS', texto: 'Esta pausa não é fracasso, é mudança de ângulo. Eu espero sem me punir pela espera.' },
        { id: 'af-12-6', arcanoId: 12, tipo: 'PROSPERIDADE', texto: 'Eu abro mão do pequeno para caber o grande. Soltar também é uma decisão financeira.' },
        { id: 'af-12-7', arcanoId: 12, tipo: 'AMOR', texto: 'Eu amo sem sufocar. Meu apego solto é o que permite o outro ficar por vontade própria.' },
    ],
    13: [ // A Morte
        { id: 'af-13-1', arcanoId: 13, tipo: 'MANHA', texto: 'Eu deixo morrer o que acabou para ter espaço no que começa. Hoje eu enterro um peso.' },
        { id: 'af-13-2', arcanoId: 13, tipo: 'MANHA', texto: 'Cada fim que eu atravesso me devolve inteiro. Eu não temo a passagem, eu me sirvo dela.' },
        { id: 'af-13-3', arcanoId: 13, tipo: 'NOITE', texto: 'Hoje eu me despedi de algo sem pressa de substituir. Descanso no vazio que é fértil.' },
        { id: 'af-13-4', arcanoId: 13, tipo: 'NOITE', texto: 'Eu solto o que insisto em reanimar. Amanhã eu acordo sem carregar o que já morreu.' },
        { id: 'af-13-5', arcanoId: 13, tipo: 'CRISIS', texto: 'Isto é passagem, não destino final. Eu atravesso o escuro sem tentar acelerar o passo.' },
        { id: 'af-13-6', arcanoId: 13, tipo: 'PROSPERIDADE', texto: 'Eu abro mão do velho para receber o novo. O que eu me recuso a soltar me custa caro.' },
        { id: 'af-13-7', arcanoId: 13, tipo: 'AMOR', texto: 'Eu amo deixando ir quando é hora. Segurar o que já acabou não é amor, é medo.' },
    ],
    14: [ // A Temperança
        { id: 'af-14-1', arcanoId: 14, tipo: 'MANHA', texto: 'Eu misturo meus opostos em vez de escolher um deles. O centro é onde eu funciono.' },
        { id: 'af-14-2', arcanoId: 14, tipo: 'MANHA', texto: 'Hoje eu vou no meu ritmo, nem acelerado nem parado. A medida certa é minha, não do outro.' },
        { id: 'af-14-3', arcanoId: 14, tipo: 'NOITE', texto: 'Hoje eu não fui ao extremo em nada. Descanso com a sensação rara de estar no ponto.' },
        { id: 'af-14-4', arcanoId: 14, tipo: 'NOITE', texto: 'Eu solto o papel de curar todo mundo. Amanhã eu começo o cuidado por mim mesmo.' },
        { id: 'af-14-5', arcanoId: 14, tipo: 'CRISIS', texto: 'Eu respiro e encontro o centro antes de reagir. O meio-termo também é uma saída.' },
        { id: 'af-14-6', arcanoId: 14, tipo: 'PROSPERIDADE', texto: 'Meu dinheiro entra e sai em fluxo, sem euforia nem aperto. Eu administro o meio.' },
        { id: 'af-14-7', arcanoId: 14, tipo: 'AMOR', texto: 'Eu amo sem me perder e me mantenho sem fugir. Estar junto não me dissolve em ninguém.' },
    ],
    15: [ // O Diabo
        { id: 'af-15-1', arcanoId: 15, tipo: 'MANHA', texto: 'Eu enxergo as correntes que eu mesmo forjei. Ver a algema é o primeiro passo para tirá-la.' },
        { id: 'af-15-2', arcanoId: 15, tipo: 'MANHA', texto: 'Meu desejo é meu, não meu dono. Hoje eu quero sem ser arrastado pelo próprio querer.' },
        { id: 'af-15-3', arcanoId: 15, tipo: 'NOITE', texto: 'Hoje eu olhei para o que evito e não desmoronei. Descanso com uma corrente a menos.' },
        { id: 'af-15-4', arcanoId: 15, tipo: 'NOITE', texto: 'Eu solto a vergonha do que sinto. Amanhã trato minha sombra como parte, não como inimiga.' },
        { id: 'af-15-5', arcanoId: 15, tipo: 'CRISIS', texto: 'Eu fui tentado, não derrotado. A queda de hoje não define quem eu sou amanhã de manhã.' },
        { id: 'af-15-6', arcanoId: 15, tipo: 'PROSPERIDADE', texto: 'O dinheiro flui quando eu deixo de me agarrar a ele. Posse apertada não rende nada.' },
        { id: 'af-15-7', arcanoId: 15, tipo: 'AMOR', texto: 'Eu desejo com liberdade e sem posse. Prender o outro é o jeito mais rápido de perdê-lo.' },
    ],
    16: [ // A Torre
        { id: 'af-16-1', arcanoId: 16, tipo: 'MANHA', texto: 'Eu me reconstruo do zero quantas vezes for preciso, e já provei isso mais de uma vez.' },
        { id: 'af-16-2', arcanoId: 16, tipo: 'MANHA', texto: 'O que cai hoje é o que não era firme. Eu prefiro a verdade nua à estrutura de mentira.' },
        { id: 'af-16-3', arcanoId: 16, tipo: 'NOITE', texto: 'Hoje eu vi uma ilusão minha ruir e continuei de pé. Descanso sobre o que ficou.' },
        { id: 'af-16-4', arcanoId: 16, tipo: 'NOITE', texto: 'Eu solto a história de vítima do que me aconteceu. Amanhã construo com o que sobrou.' },
        { id: 'af-16-5', arcanoId: 16, tipo: 'CRISIS', texto: 'Este colapso me liberta de algo que eu não teria coragem de largar por conta própria.' },
        { id: 'af-16-6', arcanoId: 16, tipo: 'PROSPERIDADE', texto: 'Riqueza de verdade é a que resiste ao raio. Eu construo sobre o que não desaba.' },
        { id: 'af-16-7', arcanoId: 16, tipo: 'AMOR', texto: 'Eu amo o que sobra quando as máscaras caem. É a única parte que dá mesmo para amar.' },
    ],
    17: [ // A Estrela
        { id: 'af-17-1', arcanoId: 17, tipo: 'MANHA', texto: 'Minha esperança tem pé no chão. Eu acredito e também faço a parte que me cabe fazer.' },
        { id: 'af-17-2', arcanoId: 17, tipo: 'MANHA', texto: 'Eu me deixo curar antes de querer curar alguém. Hoje eu recebo em vez de só dar.' },
        { id: 'af-17-3', arcanoId: 17, tipo: 'NOITE', texto: 'Hoje eu confiei sem me enganar. Descanso sabendo a diferença entre fé e negação.' },
        { id: 'af-17-4', arcanoId: 17, tipo: 'NOITE', texto: 'Eu solto a exigência de ser inspiração para os outros. Amanhã basta eu estar inteiro.' },
        { id: 'af-17-5', arcanoId: 17, tipo: 'CRISIS', texto: 'Depois desta tempestade minha luz continua acesa. Só preciso não apagá-la sozinho.' },
        { id: 'af-17-6', arcanoId: 17, tipo: 'PROSPERIDADE', texto: 'Eu atraio o que preciso quando confio e me movo. Fé parada não paga conta nenhuma.' },
        { id: 'af-17-7', arcanoId: 17, tipo: 'AMOR', texto: 'Eu mereço amor que cura e não amor que salva. Ninguém aqui precisa ser resgatado.' },
    ],
    18: [ // A Lua
        { id: 'af-18-1', arcanoId: 18, tipo: 'MANHA', texto: 'Eu confio na minha intuição e confiro com os fatos. As duas coisas cabem juntas em mim.' },
        { id: 'af-18-2', arcanoId: 18, tipo: 'MANHA', texto: 'O que assusta no escuro costuma encolher na luz. Hoje eu olho antes de concluir.' },
        { id: 'af-18-3', arcanoId: 18, tipo: 'NOITE', texto: 'Hoje eu separei o que senti do que inventei. Descanso com a mente bem mais quieta.' },
        { id: 'af-18-4', arcanoId: 18, tipo: 'NOITE', texto: 'Eu entrego meus medos ao sono. Amanhã eles serão menores do que parecem agora.' },
        { id: 'af-18-5', arcanoId: 18, tipo: 'CRISIS', texto: 'Meu medo está distorcendo o tamanho da coisa. Eu espero amanhecer antes de decidir.' },
        { id: 'af-18-6', arcanoId: 18, tipo: 'PROSPERIDADE', texto: 'Minha abundância chega devagar e em silêncio. Não confundo demora com ausência.' },
        { id: 'af-18-7', arcanoId: 18, tipo: 'AMOR', texto: 'Eu amo com profundidade sem me afogar. Sentir muito não é o mesmo que me perder.' },
    ],
    19: [ // O Sol
        { id: 'af-19-1', arcanoId: 19, tipo: 'MANHA', texto: 'Eu brilho sem precisar apagar ninguém. Minha luz cabe junto com a luz dos outros.' },
        { id: 'af-19-2', arcanoId: 19, tipo: 'MANHA', texto: 'Hoje eu me permito alegria sem justificar. Estar bem não precisa ser merecido antes.' },
        { id: 'af-19-3', arcanoId: 19, tipo: 'NOITE', texto: 'Hoje eu brilhei e também soube parar. Descanso sem culpa por ter desligado a luz.' },
        { id: 'af-19-4', arcanoId: 19, tipo: 'NOITE', texto: 'Eu solto a obrigação de estar sempre bem. Amanhã eu tenho direito a um dia comum.' },
        { id: 'af-19-5', arcanoId: 19, tipo: 'CRISIS', texto: 'Mesmo hoje meu sol não se apagou, só está atrás da nuvem. Eu espero sem me cobrar.' },
        { id: 'af-19-6', arcanoId: 19, tipo: 'PROSPERIDADE', texto: 'Riqueza e alegria andam juntas em mim. Eu prospero fazendo aquilo que me dá vida.' },
        { id: 'af-19-7', arcanoId: 19, tipo: 'AMOR', texto: 'Meu amor é quente e generoso, não ofuscante. Eu ilumino sem exigir que olhem para mim.' },
    ],
    20: [ // O Julgamento
        { id: 'af-20-1', arcanoId: 20, tipo: 'MANHA', texto: 'Eu escuto o chamado e respondo com ação, não com promessa. Hoje eu dou um passo real.' },
        { id: 'af-20-2', arcanoId: 20, tipo: 'MANHA', texto: 'Eu me absolvo do que já paguei caro. Carregar culpa vencida não conserta coisa alguma.' },
        { id: 'af-20-3', arcanoId: 20, tipo: 'NOITE', texto: 'Hoje eu perdoei alguém, inclusive a mim mesmo. Descanso mais leve do que acordei.' },
        { id: 'af-20-4', arcanoId: 20, tipo: 'NOITE', texto: 'Eu solto o tribunal que eu monto na cabeça. Amanhã eu olho as pessoas sem sentença.' },
        { id: 'af-20-5', arcanoId: 20, tipo: 'CRISIS', texto: 'Isto não é punição, é convocação. Eu paro de me julgar e começo a atender o chamado.' },
        { id: 'af-20-6', arcanoId: 20, tipo: 'PROSPERIDADE', texto: 'Minha vocação gera abundância quando eu a atendo de verdade. Meia resposta não paga.' },
        { id: 'af-20-7', arcanoId: 20, tipo: 'AMOR', texto: 'Eu amo com a leveza de quem já se perdoou. Sem dívida antiga não há cobrança nova.' },
    ],
    21: [ // O Mundo
        { id: 'af-21-1', arcanoId: 21, tipo: 'MANHA', texto: 'Eu termino o que comecei, mesmo imperfeito. Concluir vale mais que aperfeiçoar sem fim.' },
        { id: 'af-21-2', arcanoId: 21, tipo: 'MANHA', texto: 'Tudo que eu preciso já está reunido em mim. Hoje eu uso em vez de sair buscando mais.' },
        { id: 'af-21-3', arcanoId: 21, tipo: 'NOITE', texto: 'Hoje eu fechei um ciclo sem melancolia. Descanso inteiro, não dividido em pendências.' },
        { id: 'af-21-4', arcanoId: 21, tipo: 'NOITE', texto: 'Eu solto o medo de que terminar signifique acabar. Amanhã começa uma outra volta.' },
        { id: 'af-21-5', arcanoId: 21, tipo: 'CRISIS', texto: 'Este ciclo se fecha para eu poder ir mais longe. O fim aqui é permissão, não perda.' },
        { id: 'af-21-6', arcanoId: 21, tipo: 'PROSPERIDADE', texto: 'Minha riqueza é a soma dos meus talentos integrados. Eu paro de estudar e entrego.' },
        { id: 'af-21-7', arcanoId: 21, tipo: 'AMOR', texto: 'Meu amor abrange o todo sem se diluir nele. Eu pertenço e continuo sendo quem eu sou.' },
    ],
    22: [ // O Louco (0)
        { id: 'af-22-1', arcanoId: 22, tipo: 'MANHA', texto: 'Eu pulo com fé no desconhecido e confio que a vida me sustentará. Cada passo é uma aventura sagrada.' },
        { id: 'af-22-2', arcanoId: 22, tipo: 'MANHA', texto: 'Minha liberdade é responsável. Eu danço com a vida e honro cada promessa que faço.' },
        { id: 'af-22-3', arcanoId: 22, tipo: 'NOITE', texto: 'Hoje eu vivi com espontaneidade e coragem. Eu descanso grato pela aventura deste dia.' },
        { id: 'af-22-4', arcanoId: 22, tipo: 'NOITE', texto: 'Eu solto a necessidade de ter tudo resolvido. O mistério é parte da beleza da vida.' },
        { id: 'af-22-5', arcanoId: 22, tipo: 'CRISIS', texto: 'A queda é apenas o início de um novo salto. Eu me levanto com a mesma fé que me fez pular.' },
        { id: 'af-22-6', arcanoId: 22, tipo: 'PROSPERIDADE', texto: 'Meu desprendimento atrai tudo que preciso. O universo reconhece quem confia e se move.' },
        { id: 'af-22-7', arcanoId: 22, tipo: 'AMOR', texto: 'Eu amo com liberdade e presença. Eu me comprometo sem me perder, e me entrego sem me anular.' },
    ]
};

const TIPO_MAP: Record<string, TipoAfirmacao> = {
    manha: 'MANHA', noite: 'NOITE', crise: 'CRISIS',
    prosperidade: 'PROSPERIDADE', amor: 'AMOR',
};

export function getAffirmationsForArcano(arcanoId: number): Afirmacao[] {
    if (AFFIRMATIONS[arcanoId]) {
        return AFFIRMATIONS[arcanoId];
    }
    // Fallback: convert arcanos.json afirmacoes to Afirmacao format
    const arcano = getArcanoByNumero(arcanoId);
    if (!arcano || !arcano.afirmacoes) return [];
    return Object.entries(arcano.afirmacoes).map(([key, texto], idx) => ({
        id: `af-${arcanoId}-${idx + 1}`,
        arcanoId,
        tipo: TIPO_MAP[key] || 'MANHA' as TipoAfirmacao,
        texto: texto as string,
    }));
}

/**
 * Embaralhamento determinístico.
 *
 * O critério anterior era `id.charCodeAt(3)`: no id `af-13-2`, a posição 3 é o
 * PRIMEIRO DÍGITO DO ARCANO, igual para todas as afirmações do mesmo arcano.
 * Com todas as chaves idênticas a ordenação não trocava nada — as "afirmações
 * do dia" eram sempre as três primeiras, no mesmo dia e em qualquer outro, e o
 * botão de sortear não fazia efeito nenhum.
 *
 * Agora o hash percorre o id inteiro junto com a semente, então cada afirmação
 * recebe uma chave própria.
 */
function embaralharComSemente<T extends { id: string }>(itens: T[], semente: number): T[] {
    const chave = (id: string) => {
        let h = semente >>> 0;
        for (let i = 0; i < id.length; i++) {
            h = (Math.imul(h ^ id.charCodeAt(i), 0x01000193)) >>> 0;
        }
        return h;
    };
    return [...itens].sort((a, b) => chave(a.id) - chave(b.id));
}

/**
 * As afirmações do dia.
 *
 * @param variacao muda o sorteio sem esperar o dia seguinte — é o que o botão
 *                 de recarregar da tela incrementa.
 */
export function getDailyAffirmations(arcanoId: number, count: number = 3, variacao = 0): Afirmacao[] {
    const all = getAffirmationsForArcano(arcanoId);
    if (all.length === 0) return [];

    // A data entra como número (20260829), não como soma dos campos: somar
    // fazia 2026+08+29 e 2026+09+28 caírem na mesma semente.
    const hoje = new Date();
    const dia = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();
    const semente = dia + arcanoId * 7919 + variacao * 104729;

    return embaralharComSemente(all, semente).slice(0, count);
}
