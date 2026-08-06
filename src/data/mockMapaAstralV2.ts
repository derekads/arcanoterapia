import { PlanetCardData } from '../components/dashboard/PlanetCard';

export interface PlanetaV2 extends PlanetCardData {
    interpretacao: {
        sintese: string;
        luz: string;
        sombra: string;
        pratica: string;
    };
}

export const MOCK_MAPA_V2: PlanetaV2[] = [
    {
        key: 'sun', name: 'Sol', symbol: '☉',
        sign: 'Câncer', signSymbol: '♋', degreeText: "18°59'", degree: 108.98,
        house: 11, dignity: 'neutral', element: 'water', retrograde: false,
        interpretacao: {
            sintese: "Identidade nutrida pela pertença grupal e liderança acolhedora.",
            luz: "Capacidade magnética de criar família e empatia em qualquer coletivo.",
            sombra: "Dependência emocional de aprovação grupal e medo da rejeição.",
            pratica: "Crie um espaço seguro para um amigo hoje afirmando seus limites."
        }
    },
    {
        key: 'moon', name: 'Lua', symbol: '☽',
        sign: 'Capricórnio', signSymbol: '♑', degreeText: "23°00'", degree: 293.00,
        house: 6, dignity: 'detriment', element: 'earth', retrograde: false,
        interpretacao: {
            sintese: "Segurança emocional ancorada no trabalho e na construção de estruturas sólidas.",
            luz: "Resiliência impressionante e disciplina afetiva em momentos de crise.",
            sombra: "Frieza defensiva e repressão de vulnerabilidades para manter o controle.",
            pratica: "Permita-se 15 minutos de ócio absoluto hoje, sem sentir culpa."
        }
    },
    {
        key: 'mercury', name: 'Mercúrio', symbol: '☿',
        sign: 'Câncer', signSymbol: '♋', degreeText: "02°10'", degree: 92.16,
        house: 11, dignity: 'neutral', element: 'water', retrograde: false,
        interpretacao: {
            sintese: "Comunicação intuitiva e emotiva; a memória afetiva como ferramenta central de raciocínio.",
            luz: "Inteligência emocional aguçada para mediação de debates e leitura de entrelinhas.",
            sombra: "Dificuldade em separar lógica de sentimentalismo, levando a percepções ofendidas.",
            pratica: "Antes de responder a um e-mail complexo, respire fundo três vezes para ancorar a razão."
        }
    },
    {
        key: 'venus', name: 'Vênus', symbol: '♀',
        sign: 'Gêmeos', signSymbol: '♊', degreeText: "12°17'", degree: 72.28,
        house: 10, dignity: 'neutral', element: 'air', retrograde: false,
        interpretacao: {
            sintese: "Afeto estimulado pela troca intelectual, curiosidade social e diversidade profissional.",
            luz: "Charme comunicativo inegável que abre portas magnéticas na carreira e imagem pública.",
            sombra: "Inconstância nos afetos e medo do tédio relacional sabotando vínculos profundos.",
            pratica: "Elogie a inteligência de alguém no trabalho hoje de forma autêntica."
        }
    },
    {
        key: 'mars', name: 'Marte', symbol: '♂',
        sign: 'Gêmeos', signSymbol: '♊', degreeText: "17°32'", degree: 77.53,
        house: 10, dignity: 'neutral', element: 'air', retrograde: false,
        interpretacao: {
            sintese: "Ação movida pela multiplicidade de interesses, retórica afiada e ambição comunicativa.",
            luz: "Agilidade impressionante para resolver problemas em multitarefas e debates públicos.",
            sombra: "Dispersão de energia e discussões verbais agressivas quando contrariado profissionalmente.",
            pratica: "Conclua uma única tarefa pendente sem abrir abas novas no navegador."
        }
    },
    {
        key: 'jupiter', name: 'Júpiter', symbol: '♃',
        sign: 'Capricórnio', signSymbol: '♑', degreeText: "12°21'", degree: 282.35,
        house: 6, dignity: 'fall', element: 'earth', retrograde: true,
        interpretacao: {
            sintese: "Expansão alcançada através da disciplina rigorosa, trabalho metódico e tempo.",
            luz: "Visão estratégica de longo prazo para tornar rotinas laborais abundantes e sustentáveis.",
            sombra: "Excesso de pessimismo sistêmico limitando o próprio crescimento e foco no sacrifício.",
            pratica: "Comemore um pequeno marco da sua rotina de hoje como se fosse uma grande vitória."
        }
    },
    {
        key: 'saturn', name: 'Saturno', symbol: '♄',
        sign: 'Áries', signSymbol: '♈', degreeText: "07°17'", degree: 7.28,
        house: 9, dignity: 'fall', element: 'fire', retrograde: false,
        interpretacao: {
            sintese: "Estruturação das crenças através da autonomia e do pioneirismo responsável.",
            luz: "Coragem para construir sua própria filosofia original assumindo as rédeas do seu destino.",
            sombra: "Medo paralisante de falhar sozinho e dogmatismo autoritário disfarçado de fé.",
            pratica: "Tome a frente de uma decisão filosófica ou acadêmica adiada hoje."
        }
    },
    {
        key: 'uranus', name: 'Urano', symbol: '♅',
        sign: 'Aquário', signSymbol: '♒', degreeText: "03°14'", degree: 303.23,
        house: 7, dignity: 'domicile', element: 'air', retrograde: false,
        interpretacao: {
            sintese: "Revolução nas parcerias por meio da exigência cristalina de liberdade e de amizade horizontal.",
            luz: "Relacionamentos vanguardistas que quebram o status quo de possessividade com genialidade.",
            sombra: "Desapego gélido perante necessidades alheias e rompimentos súbitos por tédio sistêmico.",
            pratica: "Dê espaço intencional para um parceiro brilhar nas suas singularidades únicas hoje."
        }
    },
    {
        key: 'neptune', name: 'Netuno', symbol: '♆',
        sign: 'Capricórnio', signSymbol: '♑', degreeText: "26°55'", degree: 296.91,
        house: 6, dignity: 'neutral', element: 'earth', retrograde: false,
        interpretacao: {
            sintese: "A espiritualidade infundida no trabalho diário e o sacrifício na ordem metódica.",
            luz: "Capacidade mística de materializar inspirações abstratas num ofício tangível e curador.",
            sombra: "Desorganização crônica escapista e síndrome crônica de mártir no ambiente de trabalho.",
            pratica: "Coloque uma playlist inspiradora durante a faxina ou trabalho braçal."
        }
    },
    {
        key: 'pluto', name: 'Plutão', symbol: '♇',
        sign: 'Sagitário', signSymbol: '♐', degreeText: "00°45'", degree: 240.75,
        house: 5, dignity: 'neutral', element: 'fire', retrograde: false,
        interpretacao: {
            sintese: "Transformação psíquica profunda através da autoexpressão, riscos e busca de sentido.",
            luz: "Poder de regenerar curas coletivas pela arte intensa e pela autenticidade catártica.",
            sombra: "Comportamento obsessivo-compulsivo disfarçado de paixão dogmática; controle no prazer.",
            pratica: "Assuma um pequeno risco criativo ou expressivo deixando a necessidade de controle de lado."
        }
    }
];

export const MOCK_ASPECTS_V2 = [
    { planet1: 'sun', planet2: 'moon', type: 'opposition', orb: 4.02 },
    { planet1: 'venus', planet2: 'mars', type: 'conjunction', orb: 5.25 },
    { planet1: 'venus', planet2: 'jupiter', type: 'opposition', orb: 0.07 },
    { planet1: 'sun', planet2: 'saturn', type: 'square', orb: 11.72 }
];
