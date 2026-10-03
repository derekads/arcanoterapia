// src/utils/bongo.ts

/**
 * TABELA MEDIEVAL DE BONGO — Gematria do nome
 *
 * Método usado pela fonte do app (Giancarlo Kind Schmid, taroterapia.com.br):
 * "combina a Numerologia (Gematria), a análise do nome e as lâminas do Tarot".
 * A tela inicial já anuncia isso ao usuário em `ArcaneWisdom` — "Método da
 * Tabela de Bongo & Kabbalah" — mas o cálculo contava letras (`nome.length`)
 * em vez de somar seus valores. São métodos diferentes e davam resultados
 * diferentes para praticamente todo nome.
 *
 * Valores conferidos em três fontes independentes, com o mesmo resultado.
 * Caso de referência que circula na literatura do método:
 *
 *   TITANIC = T100 + I9 + T100 + A1 + N40 + I9 + C3 = 262
 *           → 2+6+2 = 10 → A Roda da Fortuna
 *
 * Note as equivalências do alfabeto latino, em que eram a mesma letra:
 * I = J = Y, e U = V = W.
 */

export const TABELA_BONGO: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    I: 9, J: 9, Y: 9,
    K: 10, L: 20, M: 30, N: 40, O: 50, P: 60, Q: 70, R: 80, S: 90,
    T: 100,
    U: 200, V: 200, W: 200,
    X: 300, Z: 400
};

/** Valor do til, listado na tabela ao lado das letras. */
export const VALOR_TIL = 40;

/**
 * Como o til se combina com a vogal que o carrega.
 *
 * As fontes concordam que "o til (~) vale 40" e param aí. Adotamos
 * `soma`: "ã" = A(1) + til(40) = 41.
 *
 * O motivo é histórico e não arbitrário — o til português nasceu de um "n"
 * sobrescrito ("-anu" → "-ão"), e o N vale justamente 40 nesta mesma tabela.
 * Ou seja, "João" é lido como "Joano". A alternativa (`substitui`, em que "ã"
 * valeria só 40) tornaria "ã" indistinguível de "n", o que perderia a letra.
 *
 * Se a sua fonte disser o contrário, troque só esta constante.
 */
export const MODO_TIL: 'soma' | 'substitui' = 'soma';

/** Sufixos de linhagem que a tradição manda ignorar na soma. */
const SUFIXOS = ['JUNIOR', 'JR', 'FILHO', 'FILHA', 'NETO', 'NETA', 'SOBRINHO', 'SOBRINHA', 'SEGUNDO', 'TERCEIRO'];

export interface LetraComValor {
    /** Caractere como o usuário digitou. */
    original: string;
    /** Letra base, sem diacrítico. */
    letra: string;
    valor: number;
    /** true quando o til somou seu valor à letra. */
    temTil: boolean;
}

export interface ResultadoBongo {
    /** Nome após remover sufixos de linhagem. */
    nomeConsiderado: string;
    /** Sufixos que foram descartados, para a UI poder explicar. */
    sufixosIgnorados: string[];
    letras: LetraComValor[];
    soma: number;
    /** Passos da redução: [262, 10]. */
    reducao: number[];
    /** Arcano final, de 1 a 22. */
    arcano: number;
}

const ehTil = (ch: string): boolean =>
    ch.normalize('NFD').includes('̃'); // combining tilde

/** Remove o diacrítico, preservando a letra. Ç vira C, Ã vira A. */
const letraBase = (ch: string): string =>
    ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();

/**
 * Reduz somando os dígitos até chegar a um valor entre 1 e 22.
 * Valores que já são <= 22 não são reduzidos.
 */
export function reduzirBongo(total: number): number[] {
    const passos = [total];
    let atual = total;
    while (atual > 22) {
        atual = String(atual).split('').reduce((acc, d) => acc + Number(d), 0);
        passos.push(atual);
    }
    return passos;
}

/**
 * Calcula o Arcano Pessoal pela Gematria da Tabela de Bongo.
 *
 * Regras de entrada da tradição:
 * - Sufixos de linhagem (Júnior, Filho, Neto, Sobrinho) não entram na soma.
 * - Mulheres casadas usam o nome de solteira. Isso não dá para automatizar —
 *   o app instrui o usuário na tela inicial.
 */
export function calcularArcanoBongo(nomeCompleto: string): ResultadoBongo {
    const partes = (nomeCompleto || '').trim().split(/\s+/).filter(Boolean);

    const sufixosIgnorados: string[] = [];
    const consideradas = partes.filter(parte => {
        const chave = letraBase(parte).replace(/[^A-Z]/g, '');
        if (SUFIXOS.includes(chave)) {
            sufixosIgnorados.push(parte);
            return false;
        }
        return true;
    });

    /**
     * Se TODAS as partes forem sufixos de linhagem — alguém que digita só
     * "Neto" ou "Junior Filho" —, descartar tudo zeraria a soma e devolveria
     * o arcano 0, que não existe no baralho. O app então não encontrava a
     * carta e renderizava uma tela em branco.
     *
     * A tradição manda ignorar o sufixo dentro de um nome maior; ela não
     * prevê o caso em que o sufixo é o nome inteiro. Aqui a regra cede: se
     * não sobra nada, o nome inteiro volta para a soma.
     */
    const partesFinais = consideradas.length > 0 ? consideradas : partes;
    if (consideradas.length === 0) sufixosIgnorados.length = 0;

    const nomeConsiderado = partesFinais.join(' ');

    const letras: LetraComValor[] = [];
    for (const ch of nomeConsiderado) {
        const base = letraBase(ch);
        if (!/^[A-Z]$/.test(base)) continue; // espaços, hífens, apóstrofos

        const til = ehTil(ch);
        const valorLetra = TABELA_BONGO[base] ?? 0;
        const valor = til
            ? (MODO_TIL === 'soma' ? valorLetra + VALOR_TIL : VALOR_TIL)
            : valorLetra;

        letras.push({ original: ch, letra: base, valor, temTil: til });
    }

    const soma = letras.reduce((acc, l) => acc + l.valor, 0);
    const reducao = reduzirBongo(soma);

    return {
        nomeConsiderado,
        sufixosIgnorados,
        letras,
        soma,
        reducao,
        arcano: soma === 0 ? 0 : reducao[reducao.length - 1]
    };
}
