// src/data/cidades.ts

/**
 * CIDADES DE RESERVA
 *
 * A busca de cidades usa a API de geocodificação da Open-Meteo. Quando ela
 * falha — rede caída, limite de requisições, DNS bloqueado por firewall
 * corporativa — o campo simplesmente não mostrava nada, e o usuário ficava
 * sem entender por que não conseguia avançar.
 *
 * Esta lista cobre esse caso. São as 27 capitais brasileiras, as maiores
 * cidades do país e as principais capitais estrangeiras, com coordenadas e
 * fuso IANA conferidos. Quando a API responde, ela continua mandando: esta
 * lista é só a rede de segurança.
 *
 * O fuso é o identificador IANA, não um deslocamento fixo — é ele que faz o
 * `utils/timezone.ts` acertar o horário de verão histórico. Rondônia
 * (America/Porto_Velho) e o Acre (America/Rio_Branco), por exemplo, não são
 * UTC-3 como o resto do Sudeste.
 */

export interface CidadeReserva {
    name: string;
    admin1: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export const CIDADES_RESERVA: CidadeReserva[] = [
    // ── Capitais brasileiras (as 27) ──────────────────────────────────
    { name: 'Rio Branco', admin1: 'Acre', country: 'Brasil', latitude: -9.9754, longitude: -67.8249, timezone: 'America/Rio_Branco' },
    { name: 'Maceió', admin1: 'Alagoas', country: 'Brasil', latitude: -9.6658, longitude: -35.7353, timezone: 'America/Maceio' },
    { name: 'Macapá', admin1: 'Amapá', country: 'Brasil', latitude: 0.0389, longitude: -51.0664, timezone: 'America/Belem' },
    { name: 'Manaus', admin1: 'Amazonas', country: 'Brasil', latitude: -3.1190, longitude: -60.0217, timezone: 'America/Manaus' },
    { name: 'Salvador', admin1: 'Bahia', country: 'Brasil', latitude: -12.9777, longitude: -38.5016, timezone: 'America/Bahia' },
    { name: 'Fortaleza', admin1: 'Ceará', country: 'Brasil', latitude: -3.7319, longitude: -38.5267, timezone: 'America/Fortaleza' },
    { name: 'Brasília', admin1: 'Distrito Federal', country: 'Brasil', latitude: -15.7939, longitude: -47.8828, timezone: 'America/Sao_Paulo' },
    { name: 'Vitória', admin1: 'Espírito Santo', country: 'Brasil', latitude: -20.3155, longitude: -40.3128, timezone: 'America/Sao_Paulo' },
    { name: 'Goiânia', admin1: 'Goiás', country: 'Brasil', latitude: -16.6869, longitude: -49.2648, timezone: 'America/Sao_Paulo' },
    { name: 'São Luís', admin1: 'Maranhão', country: 'Brasil', latitude: -2.5307, longitude: -44.3068, timezone: 'America/Fortaleza' },
    { name: 'Cuiabá', admin1: 'Mato Grosso', country: 'Brasil', latitude: -15.6014, longitude: -56.0979, timezone: 'America/Cuiaba' },
    { name: 'Campo Grande', admin1: 'Mato Grosso do Sul', country: 'Brasil', latitude: -20.4697, longitude: -54.6201, timezone: 'America/Campo_Grande' },
    { name: 'Belo Horizonte', admin1: 'Minas Gerais', country: 'Brasil', latitude: -19.9167, longitude: -43.9345, timezone: 'America/Sao_Paulo' },
    { name: 'Belém', admin1: 'Pará', country: 'Brasil', latitude: -1.4558, longitude: -48.5044, timezone: 'America/Belem' },
    { name: 'João Pessoa', admin1: 'Paraíba', country: 'Brasil', latitude: -7.1195, longitude: -34.8450, timezone: 'America/Fortaleza' },
    { name: 'Curitiba', admin1: 'Paraná', country: 'Brasil', latitude: -25.4284, longitude: -49.2733, timezone: 'America/Sao_Paulo' },
    { name: 'Recife', admin1: 'Pernambuco', country: 'Brasil', latitude: -8.0476, longitude: -34.8770, timezone: 'America/Recife' },
    { name: 'Teresina', admin1: 'Piauí', country: 'Brasil', latitude: -5.0892, longitude: -42.8019, timezone: 'America/Fortaleza' },
    { name: 'Rio de Janeiro', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.9068, longitude: -43.1729, timezone: 'America/Sao_Paulo' },
    { name: 'Natal', admin1: 'Rio Grande do Norte', country: 'Brasil', latitude: -5.7945, longitude: -35.2110, timezone: 'America/Fortaleza' },
    { name: 'Porto Alegre', admin1: 'Rio Grande do Sul', country: 'Brasil', latitude: -30.0346, longitude: -51.2177, timezone: 'America/Sao_Paulo' },
    { name: 'Porto Velho', admin1: 'Rondônia', country: 'Brasil', latitude: -8.7612, longitude: -63.9004, timezone: 'America/Porto_Velho' },
    { name: 'Boa Vista', admin1: 'Roraima', country: 'Brasil', latitude: 2.8235, longitude: -60.6758, timezone: 'America/Boa_Vista' },
    { name: 'Florianópolis', admin1: 'Santa Catarina', country: 'Brasil', latitude: -27.5954, longitude: -48.5480, timezone: 'America/Sao_Paulo' },
    { name: 'São Paulo', admin1: 'São Paulo', country: 'Brasil', latitude: -23.5505, longitude: -46.6333, timezone: 'America/Sao_Paulo' },
    { name: 'Aracaju', admin1: 'Sergipe', country: 'Brasil', latitude: -10.9472, longitude: -37.0731, timezone: 'America/Maceio' },
    { name: 'Palmas', admin1: 'Tocantins', country: 'Brasil', latitude: -10.1689, longitude: -48.3317, timezone: 'America/Sao_Paulo' },

    // ── Outras cidades brasileiras de grande porte ────────────────────
    { name: 'Guarulhos', admin1: 'São Paulo', country: 'Brasil', latitude: -23.4543, longitude: -46.5337, timezone: 'America/Sao_Paulo' },
    { name: 'Campinas', admin1: 'São Paulo', country: 'Brasil', latitude: -22.9099, longitude: -47.0626, timezone: 'America/Sao_Paulo' },
    { name: 'São Bernardo do Campo', admin1: 'São Paulo', country: 'Brasil', latitude: -23.6944, longitude: -46.5654, timezone: 'America/Sao_Paulo' },
    { name: 'Santo André', admin1: 'São Paulo', country: 'Brasil', latitude: -23.6639, longitude: -46.5383, timezone: 'America/Sao_Paulo' },
    { name: 'Osasco', admin1: 'São Paulo', country: 'Brasil', latitude: -23.5325, longitude: -46.7917, timezone: 'America/Sao_Paulo' },
    { name: 'Sorocaba', admin1: 'São Paulo', country: 'Brasil', latitude: -23.5015, longitude: -47.4526, timezone: 'America/Sao_Paulo' },
    { name: 'Ribeirão Preto', admin1: 'São Paulo', country: 'Brasil', latitude: -21.1775, longitude: -47.8103, timezone: 'America/Sao_Paulo' },
    { name: 'São José dos Campos', admin1: 'São Paulo', country: 'Brasil', latitude: -23.1791, longitude: -45.8872, timezone: 'America/Sao_Paulo' },
    { name: 'Santos', admin1: 'São Paulo', country: 'Brasil', latitude: -23.9608, longitude: -46.3336, timezone: 'America/Sao_Paulo' },
    { name: 'Jundiaí', admin1: 'São Paulo', country: 'Brasil', latitude: -23.1857, longitude: -46.8978, timezone: 'America/Sao_Paulo' },
    { name: 'Piracicaba', admin1: 'São Paulo', country: 'Brasil', latitude: -22.7253, longitude: -47.6492, timezone: 'America/Sao_Paulo' },
    { name: 'Bauru', admin1: 'São Paulo', country: 'Brasil', latitude: -22.3145, longitude: -49.0605, timezone: 'America/Sao_Paulo' },
    { name: 'Mogi das Cruzes', admin1: 'São Paulo', country: 'Brasil', latitude: -23.5228, longitude: -46.1883, timezone: 'America/Sao_Paulo' },
    { name: 'Diadema', admin1: 'São Paulo', country: 'Brasil', latitude: -23.6861, longitude: -46.6228, timezone: 'America/Sao_Paulo' },
    { name: 'Carapicuíba', admin1: 'São Paulo', country: 'Brasil', latitude: -23.5225, longitude: -46.8358, timezone: 'America/Sao_Paulo' },
    { name: 'Mauá', admin1: 'São Paulo', country: 'Brasil', latitude: -23.6677, longitude: -46.4614, timezone: 'America/Sao_Paulo' },
    { name: 'Franca', admin1: 'São Paulo', country: 'Brasil', latitude: -20.5386, longitude: -47.4008, timezone: 'America/Sao_Paulo' },
    { name: 'Marília', admin1: 'São Paulo', country: 'Brasil', latitude: -22.2139, longitude: -49.9458, timezone: 'America/Sao_Paulo' },

    { name: 'São Gonçalo', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.8269, longitude: -43.0539, timezone: 'America/Sao_Paulo' },
    { name: 'Duque de Caxias', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.7856, longitude: -43.3117, timezone: 'America/Sao_Paulo' },
    { name: 'Nova Iguaçu', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.7592, longitude: -43.4511, timezone: 'America/Sao_Paulo' },
    { name: 'Niterói', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.8833, longitude: -43.1036, timezone: 'America/Sao_Paulo' },
    { name: 'Campos dos Goytacazes', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -21.7545, longitude: -41.3244, timezone: 'America/Sao_Paulo' },
    { name: 'Petrópolis', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.5050, longitude: -43.1786, timezone: 'America/Sao_Paulo' },
    { name: 'Volta Redonda', admin1: 'Rio de Janeiro', country: 'Brasil', latitude: -22.5231, longitude: -44.1042, timezone: 'America/Sao_Paulo' },

    { name: 'Uberlândia', admin1: 'Minas Gerais', country: 'Brasil', latitude: -18.9186, longitude: -48.2772, timezone: 'America/Sao_Paulo' },
    { name: 'Contagem', admin1: 'Minas Gerais', country: 'Brasil', latitude: -19.9317, longitude: -44.0536, timezone: 'America/Sao_Paulo' },
    { name: 'Juiz de Fora', admin1: 'Minas Gerais', country: 'Brasil', latitude: -21.7642, longitude: -43.3503, timezone: 'America/Sao_Paulo' },
    { name: 'Betim', admin1: 'Minas Gerais', country: 'Brasil', latitude: -19.9678, longitude: -44.1983, timezone: 'America/Sao_Paulo' },
    { name: 'Montes Claros', admin1: 'Minas Gerais', country: 'Brasil', latitude: -16.7350, longitude: -43.8617, timezone: 'America/Sao_Paulo' },
    { name: 'Uberaba', admin1: 'Minas Gerais', country: 'Brasil', latitude: -19.7472, longitude: -47.9381, timezone: 'America/Sao_Paulo' },
    { name: 'Governador Valadares', admin1: 'Minas Gerais', country: 'Brasil', latitude: -18.8511, longitude: -41.9494, timezone: 'America/Sao_Paulo' },

    { name: 'Londrina', admin1: 'Paraná', country: 'Brasil', latitude: -23.3103, longitude: -51.1628, timezone: 'America/Sao_Paulo' },
    { name: 'Maringá', admin1: 'Paraná', country: 'Brasil', latitude: -23.4253, longitude: -51.9386, timezone: 'America/Sao_Paulo' },
    { name: 'Ponta Grossa', admin1: 'Paraná', country: 'Brasil', latitude: -25.0950, longitude: -50.1619, timezone: 'America/Sao_Paulo' },
    { name: 'Cascavel', admin1: 'Paraná', country: 'Brasil', latitude: -24.9555, longitude: -53.4552, timezone: 'America/Sao_Paulo' },
    { name: 'Foz do Iguaçu', admin1: 'Paraná', country: 'Brasil', latitude: -25.5478, longitude: -54.5882, timezone: 'America/Sao_Paulo' },

    { name: 'Joinville', admin1: 'Santa Catarina', country: 'Brasil', latitude: -26.3044, longitude: -48.8456, timezone: 'America/Sao_Paulo' },
    { name: 'Blumenau', admin1: 'Santa Catarina', country: 'Brasil', latitude: -26.9194, longitude: -49.0661, timezone: 'America/Sao_Paulo' },
    { name: 'Chapecó', admin1: 'Santa Catarina', country: 'Brasil', latitude: -27.0964, longitude: -52.6183, timezone: 'America/Sao_Paulo' },
    { name: 'Criciúma', admin1: 'Santa Catarina', country: 'Brasil', latitude: -28.6775, longitude: -49.3697, timezone: 'America/Sao_Paulo' },

    { name: 'Caxias do Sul', admin1: 'Rio Grande do Sul', country: 'Brasil', latitude: -29.1678, longitude: -51.1794, timezone: 'America/Sao_Paulo' },
    { name: 'Canoas', admin1: 'Rio Grande do Sul', country: 'Brasil', latitude: -29.9178, longitude: -51.1836, timezone: 'America/Sao_Paulo' },
    { name: 'Pelotas', admin1: 'Rio Grande do Sul', country: 'Brasil', latitude: -31.7654, longitude: -52.3376, timezone: 'America/Sao_Paulo' },
    { name: 'Santa Maria', admin1: 'Rio Grande do Sul', country: 'Brasil', latitude: -29.6842, longitude: -53.8069, timezone: 'America/Sao_Paulo' },

    { name: 'Feira de Santana', admin1: 'Bahia', country: 'Brasil', latitude: -12.2664, longitude: -38.9663, timezone: 'America/Bahia' },
    { name: 'Vitória da Conquista', admin1: 'Bahia', country: 'Brasil', latitude: -14.8619, longitude: -40.8444, timezone: 'America/Bahia' },
    { name: 'Itabuna', admin1: 'Bahia', country: 'Brasil', latitude: -14.7856, longitude: -39.2803, timezone: 'America/Bahia' },
    { name: 'Juazeiro', admin1: 'Bahia', country: 'Brasil', latitude: -9.4111, longitude: -40.4986, timezone: 'America/Bahia' },

    { name: 'Jaboatão dos Guararapes', admin1: 'Pernambuco', country: 'Brasil', latitude: -8.1128, longitude: -35.0147, timezone: 'America/Recife' },
    { name: 'Olinda', admin1: 'Pernambuco', country: 'Brasil', latitude: -8.0089, longitude: -34.8553, timezone: 'America/Recife' },
    { name: 'Caruaru', admin1: 'Pernambuco', country: 'Brasil', latitude: -8.2828, longitude: -35.9756, timezone: 'America/Recife' },
    { name: 'Petrolina', admin1: 'Pernambuco', country: 'Brasil', latitude: -9.3891, longitude: -40.5030, timezone: 'America/Recife' },

    { name: 'Ananindeua', admin1: 'Pará', country: 'Brasil', latitude: -1.3656, longitude: -48.3722, timezone: 'America/Belem' },
    { name: 'Santarém', admin1: 'Pará', country: 'Brasil', latitude: -2.4431, longitude: -54.7083, timezone: 'America/Santarem' },
    { name: 'Marabá', admin1: 'Pará', country: 'Brasil', latitude: -5.3689, longitude: -49.1178, timezone: 'America/Belem' },

    { name: 'Aparecida de Goiânia', admin1: 'Goiás', country: 'Brasil', latitude: -16.8233, longitude: -49.2439, timezone: 'America/Sao_Paulo' },
    { name: 'Anápolis', admin1: 'Goiás', country: 'Brasil', latitude: -16.3267, longitude: -48.9528, timezone: 'America/Sao_Paulo' },
    { name: 'Rio Verde', admin1: 'Goiás', country: 'Brasil', latitude: -17.7975, longitude: -50.9264, timezone: 'America/Sao_Paulo' },

    { name: 'Serra', admin1: 'Espírito Santo', country: 'Brasil', latitude: -20.1289, longitude: -40.3078, timezone: 'America/Sao_Paulo' },
    { name: 'Vila Velha', admin1: 'Espírito Santo', country: 'Brasil', latitude: -20.3297, longitude: -40.2925, timezone: 'America/Sao_Paulo' },
    { name: 'Cariacica', admin1: 'Espírito Santo', country: 'Brasil', latitude: -20.2639, longitude: -40.4200, timezone: 'America/Sao_Paulo' },

    { name: 'Ji-Paraná', admin1: 'Rondônia', country: 'Brasil', latitude: -10.8853, longitude: -61.9517, timezone: 'America/Porto_Velho' },
    { name: 'Vilhena', admin1: 'Rondônia', country: 'Brasil', latitude: -12.7406, longitude: -60.1458, timezone: 'America/Porto_Velho' },
    { name: 'Ariquemes', admin1: 'Rondônia', country: 'Brasil', latitude: -9.9133, longitude: -63.0408, timezone: 'America/Porto_Velho' },
    { name: 'Cacoal', admin1: 'Rondônia', country: 'Brasil', latitude: -11.4386, longitude: -61.4472, timezone: 'America/Porto_Velho' },
    { name: 'Rondonópolis', admin1: 'Mato Grosso', country: 'Brasil', latitude: -16.4708, longitude: -54.6356, timezone: 'America/Cuiaba' },
    { name: 'Várzea Grande', admin1: 'Mato Grosso', country: 'Brasil', latitude: -15.6467, longitude: -56.1325, timezone: 'America/Cuiaba' },
    { name: 'Dourados', admin1: 'Mato Grosso do Sul', country: 'Brasil', latitude: -22.2211, longitude: -54.8056, timezone: 'America/Campo_Grande' },
    { name: 'Imperatriz', admin1: 'Maranhão', country: 'Brasil', latitude: -5.5264, longitude: -47.4917, timezone: 'America/Fortaleza' },
    { name: 'Mossoró', admin1: 'Rio Grande do Norte', country: 'Brasil', latitude: -5.1878, longitude: -37.3439, timezone: 'America/Fortaleza' },
    { name: 'Campina Grande', admin1: 'Paraíba', country: 'Brasil', latitude: -7.2306, longitude: -35.8811, timezone: 'America/Fortaleza' },
    { name: 'Parnaíba', admin1: 'Piauí', country: 'Brasil', latitude: -2.9047, longitude: -41.7767, timezone: 'America/Fortaleza' },
    { name: 'Arapiraca', admin1: 'Alagoas', country: 'Brasil', latitude: -9.7522, longitude: -36.6611, timezone: 'America/Maceio' },
    { name: 'Cruzeiro do Sul', admin1: 'Acre', country: 'Brasil', latitude: -7.6278, longitude: -72.6753, timezone: 'America/Rio_Branco' },

    // ── Exterior ──────────────────────────────────────────────────────
    { name: 'Lisboa', admin1: 'Lisboa', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, timezone: 'Europe/Lisbon' },
    { name: 'Porto', admin1: 'Porto', country: 'Portugal', latitude: 41.1579, longitude: -8.6291, timezone: 'Europe/Lisbon' },
    { name: 'Coimbra', admin1: 'Coimbra', country: 'Portugal', latitude: 40.2033, longitude: -8.4103, timezone: 'Europe/Lisbon' },
    { name: 'Luanda', admin1: 'Luanda', country: 'Angola', latitude: -8.8390, longitude: 13.2894, timezone: 'Africa/Luanda' },
    { name: 'Maputo', admin1: 'Maputo', country: 'Moçambique', latitude: -25.9692, longitude: 32.5732, timezone: 'Africa/Maputo' },
    { name: 'Buenos Aires', admin1: 'Buenos Aires', country: 'Argentina', latitude: -34.6037, longitude: -58.3816, timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Montevidéu', admin1: 'Montevidéu', country: 'Uruguai', latitude: -34.9011, longitude: -56.1645, timezone: 'America/Montevideo' },
    { name: 'Assunção', admin1: 'Assunção', country: 'Paraguai', latitude: -25.2637, longitude: -57.5759, timezone: 'America/Asuncion' },
    { name: 'Santiago', admin1: 'Região Metropolitana', country: 'Chile', latitude: -33.4489, longitude: -70.6693, timezone: 'America/Santiago' },
    { name: 'Lima', admin1: 'Lima', country: 'Peru', latitude: -12.0464, longitude: -77.0428, timezone: 'America/Lima' },
    { name: 'La Paz', admin1: 'La Paz', country: 'Bolívia', latitude: -16.4897, longitude: -68.1193, timezone: 'America/La_Paz' },
    { name: 'Bogotá', admin1: 'Bogotá', country: 'Colômbia', latitude: 4.7110, longitude: -74.0721, timezone: 'America/Bogota' },
    { name: 'Caracas', admin1: 'Caracas', country: 'Venezuela', latitude: 10.4806, longitude: -66.9036, timezone: 'America/Caracas' },
    { name: 'Cidade do México', admin1: 'Cidade do México', country: 'México', latitude: 19.4326, longitude: -99.1332, timezone: 'America/Mexico_City' },
    { name: 'Nova York', admin1: 'Nova York', country: 'Estados Unidos', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' },
    { name: 'Miami', admin1: 'Flórida', country: 'Estados Unidos', latitude: 25.7617, longitude: -80.1918, timezone: 'America/New_York' },
    { name: 'Boston', admin1: 'Massachusetts', country: 'Estados Unidos', latitude: 42.3601, longitude: -71.0589, timezone: 'America/New_York' },
    { name: 'Chicago', admin1: 'Illinois', country: 'Estados Unidos', latitude: 41.8781, longitude: -87.6298, timezone: 'America/Chicago' },
    { name: 'Los Angeles', admin1: 'Califórnia', country: 'Estados Unidos', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles' },
    { name: 'Toronto', admin1: 'Ontário', country: 'Canadá', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto' },
    { name: 'Londres', admin1: 'Inglaterra', country: 'Reino Unido', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
    { name: 'Dublin', admin1: 'Leinster', country: 'Irlanda', latitude: 53.3498, longitude: -6.2603, timezone: 'Europe/Dublin' },
    { name: 'Paris', admin1: 'Île-de-France', country: 'França', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
    { name: 'Madri', admin1: 'Madri', country: 'Espanha', latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid' },
    { name: 'Barcelona', admin1: 'Catalunha', country: 'Espanha', latitude: 41.3874, longitude: 2.1686, timezone: 'Europe/Madrid' },
    { name: 'Roma', admin1: 'Lácio', country: 'Itália', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome' },
    { name: 'Milão', admin1: 'Lombardia', country: 'Itália', latitude: 45.4642, longitude: 9.1900, timezone: 'Europe/Rome' },
    { name: 'Berlim', admin1: 'Berlim', country: 'Alemanha', latitude: 52.5200, longitude: 13.4050, timezone: 'Europe/Berlin' },
    { name: 'Amsterdã', admin1: 'Holanda do Norte', country: 'Países Baixos', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam' },
    { name: 'Bruxelas', admin1: 'Bruxelas', country: 'Bélgica', latitude: 50.8503, longitude: 4.3517, timezone: 'Europe/Brussels' },
    { name: 'Zurique', admin1: 'Zurique', country: 'Suíça', latitude: 47.3769, longitude: 8.5417, timezone: 'Europe/Zurich' },
    { name: 'Tóquio', admin1: 'Tóquio', country: 'Japão', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo' },
    { name: 'Sydney', admin1: 'Nova Gales do Sul', country: 'Austrália', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
    { name: 'Joanesburgo', admin1: 'Gauteng', country: 'África do Sul', latitude: -26.2041, longitude: 28.0473, timezone: 'Africa/Johannesburg' },
];

/** Remove acentos e caixa, para a busca casar "sao luis" com "São Luís". */
const chave = (s: string): string =>
    (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

/**
 * Busca na lista de reserva. Prioriza quem começa com o termo — quem digita
 * "porto" quer ver "Porto Velho" e "Porto Alegre" antes de "Ouro Preto".
 */
export function buscarCidadeReserva(termo: string, limite = 6): CidadeReserva[] {
    const t = chave(termo);
    if (t.length < 2) return [];

    const comeca: CidadeReserva[] = [];
    const contem: CidadeReserva[] = [];

    for (const c of CIDADES_RESERVA) {
        const nome = chave(c.name);
        if (nome.startsWith(t)) comeca.push(c);
        else if (nome.includes(t) || chave(c.admin1).startsWith(t)) contem.push(c);
    }

    return [...comeca, ...contem].slice(0, limite);
}
