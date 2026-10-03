/**
 * Resolve o caminho de um asset contra a base do Vite.
 *
 * O app é publicado sob `base: '/arcanoterapia/'` (vite.config.ts). Caminhos
 * absolutos como "/Cards/x.jpg" apontam para a raiz do domínio e ignoram a
 * base, então no GitHub Pages viravam derekads.github.io/Cards/x.jpg → 404.
 * Nenhuma imagem de carta carregava no site publicado.
 */
const asset = (caminho: string): string =>
    `${import.meta.env.BASE_URL}${caminho.replace(/^\//, '')}`;

/**
 * ARCANOS MAIORES — mapeamento número → arquivo.
 *
 * O conteúdo do app segue a numeração francesa (Marselha): a Justiça é 8, a
 * Força é 11 e O Louco é 22. Isso é unânime em `arcanos.json` e nas quatro
 * matrizes combinatórias.
 *
 * As gravuras são do Rider Tarot (Waite/Colman Smith), que usa a numeração
 * inglesa e inverte as duas cartas: o arquivo `08-Strength` traz A Força e o
 * `11-Justice` traz A Justiça. Indexar direto pelo número servia a carta
 * trocada para esses dois arcanos.
 *
 * Aqui o mapeamento é por CARTA, não por número do arquivo. O algarismo romano
 * impresso na gravura continua sendo o do baralho inglês — é limitação da arte,
 * não do mapeamento, e por isso o app não exibe o romano ao lado da imagem.
 */
export const MAJOR_ARCANA: Record<number, { file: string; name: string; roman: string }> = {
    0: { file: asset('/Cards/00-TheFool.jpg'), name: 'O Louco', roman: '0' },
    1: { file: asset('/Cards/01-TheMagician.jpg'), name: 'O Mago', roman: 'I' },
    2: { file: asset('/Cards/02-TheHighPriestess.jpg'), name: 'A Sacerdotisa', roman: 'II' },
    3: { file: asset('/Cards/03-TheEmpress.jpg'), name: 'A Imperatriz', roman: 'III' },
    4: { file: asset('/Cards/04-TheEmperor.jpg'), name: 'O Imperador', roman: 'IV' },
    5: { file: asset('/Cards/05-TheHierophant.jpg'), name: 'O Papa', roman: 'V' },
    6: { file: asset('/Cards/06-TheLovers.jpg'), name: 'Os Enamorados', roman: 'VI' },
    7: { file: asset('/Cards/07-TheChariot.jpg'), name: 'O Carro', roman: 'VII' },
    8: { file: asset('/Cards/11-Justice.jpg'), name: 'A Justiça', roman: 'VIII' },
    9: { file: asset('/Cards/09-TheHermit.jpg'), name: 'O Eremita', roman: 'IX' },
    10: { file: asset('/Cards/10-WheelOfFortune.jpg'), name: 'Roda da Fortuna', roman: 'X' },
    11: { file: asset('/Cards/08-Strength.jpg'), name: 'A Força', roman: 'XI' },
    12: { file: asset('/Cards/12-TheHangedMan.jpg'), name: 'O Enforcado', roman: 'XII' },
    13: { file: asset('/Cards/13-Death.jpg'), name: 'A Morte', roman: 'XIII' },
    14: { file: asset('/Cards/14-Temperance.jpg'), name: 'A Temperança', roman: 'XIV' },
    15: { file: asset('/Cards/15-TheDevil.jpg'), name: 'O Diabo', roman: 'XV' },
    16: { file: asset('/Cards/16-TheTower.jpg'), name: 'A Torre', roman: 'XVI' },
    17: { file: asset('/Cards/17-TheStar.jpg'), name: 'A Estrela', roman: 'XVII' },
    18: { file: asset('/Cards/18-TheMoon.jpg'), name: 'A Lua', roman: 'XVIII' },
    19: { file: asset('/Cards/19-TheSun.jpg'), name: 'O Sol', roman: 'XIX' },
    20: { file: asset('/Cards/20-Judgement.jpg'), name: 'O Julgamento', roman: 'XX' },
    21: { file: asset('/Cards/21-TheWorld.jpg'), name: 'O Mundo', roman: 'XXI' },
    // O Louco é 22 nesta numeração. Antes caía no fallback e só acertava por acaso.
    22: { file: asset('/Cards/00-TheFool.jpg'), name: 'O Louco', roman: 'XXII' },
};

// VERSO DA CARTA
export const BACK_IMAGE = asset('/Cards/CardBacks.jpg');

// ARCANOS MENORES - Mapeamento exato
const NAIPES = {
    wands: { folder: 'Wands', name: 'Paus', element: 'Fogo', icon: '🔥' },
    cups: { folder: 'Cups', name: 'Copas', element: 'Água', icon: '💧' },
    swords: { folder: 'Swords', name: 'Espadas', element: 'Ar', icon: '⚔️' },
    pentacles: { folder: 'Pentacles', name: 'Ouros', element: 'Terra', icon: '🪙' },
};

const VALORES: Record<string, { num: string; pt: string }> = {
    '01': { num: '1', pt: 'Ás' },
    '02': { num: '2', pt: '2' },
    '03': { num: '3', pt: '3' },
    '04': { num: '4', pt: '4' },
    '05': { num: '5', pt: '5' },
    '06': { num: '6', pt: '6' },
    '07': { num: '7', pt: '7' },
    '08': { num: '8', pt: '8' },
    '09': { num: '9', pt: '9' },
    '10': { num: '10', pt: '10' },
    '11': { num: 'Pajem', pt: 'Pajem' },
    '12': { num: 'Cavaleiro', pt: 'Cavaleiro' },
    '13': { num: 'Rainha', pt: 'Rainha' },
    '14': { num: 'Rei', pt: 'Rei' },
};

// Gerar mapeamento automático dos menores
export const MINOR_ARCANA: Record<string, { file: string; name: string; element: string }> = {};

Object.entries(NAIPES).forEach(([key, naipe]) => {
    Object.entries(VALORES).forEach(([num, val]) => {
        const fileId = `${naipe.folder}${num}`;
        MINOR_ARCANA[fileId] = {
            file: asset(`/Cards/${fileId}.jpg`),
            name: `${val.pt} de ${naipe.name}`,
            element: naipe.element
        };
    });
});
