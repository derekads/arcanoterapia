// src/data/areaFocoArcano.ts

import type { AreaDaVida } from '../types';

/**
 * A ÁREA DA VIDA QUE CADA ARCANO PEDE PRIMEIRO
 *
 * O passo 2 do assistente da Roda da Vida marcava algumas áreas com um selo
 * "Oráculo" e o subtítulo prometia que "o Arcano indica onde sua energia deve
 * fluir". A condição no código era `area === arcano.areaFoco || nota <= 4` —
 * e `areaFoco` NÃO EXISTE em nenhum dos 22 arcanos do JSON. Sobrava só a
 * segunda metade: o selo marcava as áreas com nota baixa. Útil, mas era a
 * própria nota do usuário devolvida com nome de oráculo.
 *
 * Aqui a área vem do desafio numerológico de cada arcano, que já está escrito
 * no arcanos.json. O Eremita, cujo desafio é "isolamento vs compartilhamento",
 * aponta para família e vínculos. O Diabo, "prazer vs vício", aponta para
 * saúde. Não é adivinhação: é a leitura direta do que o arcano já diz.
 */

export interface FocoDoArcano {
    area: AreaDaVida;
    /** Por que este arcano aponta para esta área. Aparece na interface. */
    porque: string;
}

export const FOCO_POR_ARCANO: Record<number, FocoDoArcano> = {
    1:  { area: 'CARREIRA',   porque: 'O Mago pede que o repertório vire obra. O desafio é equilibrar ego e essência no que você entrega.' },
    2:  { area: 'PROPOSITO',  porque: 'A Sacerdotisa pede escuta interna. O desafio é distinguir intuição de projeção antes de decidir.' },
    3:  { area: 'FAMILIA',    porque: 'A Imperatriz pede que você nutra sem se anular. O desafio é criar sem cair na procriação compulsiva.' },
    4:  { area: 'CARREIRA',   porque: 'O Imperador pede estrutura. O desafio é exercer autoridade sem virar autoritarismo.' },
    5:  { area: 'PROPOSITO',  porque: 'O Papa pede coerência entre o que você acredita e o que você faz. O desafio é dogma contra liberdade.' },
    6:  { area: 'AMOR',       porque: 'Os Enamorados pedem escolha sustentada. O desafio é dependência emocional contra independência.' },
    7:  { area: 'CARREIRA',   porque: 'O Carro pede direção definida. O desafio é controlar a arrogância que a vitória traz junto.' },
    8:  { area: 'DINHEIRO',   porque: 'A Justiça pede contas em dia e troca justa. O desafio é rigidez contra compaixão no acerto.' },
    9:  { area: 'FAMILIA',    porque: 'O Eremita pede recolhimento com retorno. O desafio é isolamento contra compartilhamento.' },
    10: { area: 'DINHEIRO',   porque: 'A Roda pede movimento com o ciclo. O desafio é segurança contra mudança quando a maré vira.' },
    11: { area: 'SAUDE',      porque: 'A Força pede domínio gentil do próprio instinto. O desafio é força contra violência, inclusive contra si.' },
    12: { area: 'PROPOSITO',  porque: 'O Enforcado pede pausa que muda o ângulo. O desafio é martírio contra sabedoria na espera.' },
    13: { area: 'AMOR',       porque: 'A Morte pede que você solte o que acabou. O desafio é apego contra liberdade no vínculo.' },
    14: { area: 'SAUDE',      porque: 'A Temperança pede a dose certa. O desafio é viver nos extremos em vez de no centro.' },
    15: { area: 'SAUDE',      porque: 'O Diabo pede encarar a corrente que você forjou. O desafio é prazer contra vício.' },
    16: { area: 'CARREIRA',   porque: 'A Torre pede deixar cair o que não era firme. O desafio é destruição contra reconstrução.' },
    17: { area: 'PROPOSITO',  porque: 'A Estrela pede confiar de novo depois do estrago. O desafio é ilusão contra fé genuína.' },
    18: { area: 'SAUDE',      porque: 'A Lua pede atravessar o que não se enxerga direito. O desafio é intuição contra ilusão.' },
    19: { area: 'AMOR',       porque: 'O Sol pede aparecer inteiro. O desafio é ego solar contra generosidade com quem chega perto.' },
    20: { area: 'PROPOSITO',  porque: 'O Julgamento pede responder ao chamado. O desafio é culpa contra absolvição.' },
    21: { area: 'CARREIRA',   porque: 'O Mundo pede concluir e integrar. O desafio é encerrar em vez de recomeçar por medo do fim.' },
    22: { area: 'DINHEIRO',   porque: 'O Louco pede salto sem garantia. O desafio é discernir inocência de ingenuidade no risco.' },
};

export function focoDoArcano(numero: number): FocoDoArcano | null {
    return FOCO_POR_ARCANO[numero] ?? null;
}
