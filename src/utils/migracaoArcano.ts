// src/utils/migracaoArcano.ts

import { calcularArcanoBongo } from './bongo';
import { reduzirParaArcano, limparNomeParaCalculo } from './calculos';

/**
 * MIGRAÇÃO DO ARCANO PESSOAL — dados órfãos no localStorage
 *
 * O diário, a roda da vida, as diretrizes e o progresso das sombras são
 * gravados sob o NÚMERO do arcano (`journal_entries_7`, `life_wheel_7`…).
 * Quando o cálculo do arcano mudou, esses registros continuaram no
 * localStorage, mas sob um número que o app não consulta mais: o usuário
 * abre o app e vê o diário vazio, com o conteúdo intacto no navegador dele.
 *
 * O app teve três cálculos ao longo do tempo, todos a partir do mesmo nome:
 *
 *   v1  contagem de letras, descartando as acentuadas   ("José" → 3)
 *   v2  contagem de letras, preservando as acentuadas   ("José" → 4)
 *   v3  Gematria da Tabela de Bongo (atual)             ("José" → soma)
 *
 * Esta migração recalcula v1 e v2 para cada nome conhecido e copia o que
 * estiver guardado lá para o número atual.
 *
 * Duas garantias:
 *
 *  - COPIA, não move. As chaves antigas permanecem intactas. Se algo der
 *    errado, ou se a fórmula mudar de novo, o dado original ainda está lá.
 *  - NUNCA sobrescreve. Se já existe conteúdo no destino, a chave é pulada
 *    e contabilizada em `conflitos`. Dado novo do usuário vale mais que
 *    dado recuperado.
 */

/** Marca de execução, para a migração rodar uma vez só por navegador. */
export const CHAVE_MIGRACAO = 'arcanoterapia_migracao_arcano_v1';

/** Chaves de valor único, indexadas pelo número do arcano. */
const FAMILIAS_SIMPLES = [
    'journal_entries',
    'life_wheel',
    'guidelines_progress',
    'arcanoterapia_user_progress',
] as const;

/** `shadow-progress-<arcano>-<idDaSombra>` — o sufixo varia por sombra. */
const PREFIXO_SOMBRA = 'shadow-progress-';

export interface RelatorioMigracao {
    /** Chaves efetivamente copiadas, como `journal_entries_9 → journal_entries_21`. */
    copiadas: string[];
    /** Chaves que existiam na origem mas já tinham conteúdo no destino. */
    conflitos: string[];
    /** Nomes analisados e o mapeamento antigo → atual de cada um. */
    nomes: { nome: string; antigos: number[]; atual: number }[];
    /** true quando a migração já havia rodado neste navegador. */
    jaExecutada: boolean;
}

const RELATORIO_VAZIO = (): RelatorioMigracao =>
    ({ copiadas: [], conflitos: [], nomes: [], jaExecutada: false });

/** v1: `[^a-zA-Z]` derrubava a letra acentuada inteira. */
const arcanoV1 = (nome: string): number => {
    const limpo = (nome || '').replace(/[^a-zA-Z]/g, '');
    return limpo.length === 0 ? 0 : reduzirParaArcano(limpo.length);
};

/** v2: mesma contagem, mas com os acentos normalizados antes. */
const arcanoV2 = (nome: string): number => {
    const limpo = limparNomeParaCalculo(nome);
    return limpo.length === 0 ? 0 : reduzirParaArcano(limpo.length);
};

/** Um valor "vazio" no destino não conta como conflito. */
const temConteudo = (bruto: string | null): boolean => {
    if (bruto === null || bruto === '') return false;
    const t = bruto.trim();
    if (t === 'null' || t === 'undefined' || t === '[]' || t === '{}') return false;
    return true;
};

/**
 * Reúne todos os nomes que este navegador conhece: o usuário atual e cada
 * perfil salvo. Um perfil antigo pode ter dados órfãos tanto quanto o ativo.
 */
export function nomesConhecidos(storage: Storage): string[] {
    const nomes: string[] = [];
    const anotar = (v: unknown) => {
        if (typeof v === 'string' && v.trim()) nomes.push(v.trim());
    };

    try {
        const atual = JSON.parse(storage.getItem('arcanoterapia_user_data') || 'null');
        anotar(atual?.nome ?? atual?.name);
    } catch { /* json corrompido: apenas ignora esse nome */ }

    try {
        const perfis = JSON.parse(storage.getItem('arcanoterapia_profiles_v1') || 'null');
        if (Array.isArray(perfis)) for (const p of perfis) anotar(p?.nome ?? p?.name);
    } catch { /* idem */ }

    return [...new Set(nomes)];
}

/** Copia uma chave se houver origem e o destino estiver livre. */
function copiar(storage: Storage, de: string, para: string, rel: RelatorioMigracao): void {
    const origem = storage.getItem(de);
    if (!temConteudo(origem)) return;

    if (temConteudo(storage.getItem(para))) {
        rel.conflitos.push(`${de} → ${para}`);
        return;
    }

    storage.setItem(para, origem as string);
    rel.copiadas.push(`${de} → ${para}`);
}

/**
 * Executa a migração. Idempotente: a marca em `CHAVE_MIGRACAO` impede a
 * segunda execução, e mesmo sem ela nada seria sobrescrito.
 *
 * @param forcar ignora a marca de execução (útil em teste)
 */
export function migrarDadosDoArcano(
    storage: Storage = localStorage,
    forcar = false
): RelatorioMigracao {
    const rel = RELATORIO_VAZIO();

    try {
        if (!forcar && storage.getItem(CHAVE_MIGRACAO)) {
            rel.jaExecutada = true;
            return rel;
        }

        for (const nome of nomesConhecidos(storage)) {
            const atual = calcularArcanoBongo(nome).arcano;
            const antigos = [...new Set([arcanoV2(nome), arcanoV1(nome)])]
                .filter(n => n > 0 && n !== atual);

            rel.nomes.push({ nome, antigos, atual });
            if (atual <= 0) continue;

            for (const antigo of antigos) {
                for (const familia of FAMILIAS_SIMPLES) {
                    copiar(storage, `${familia}_${antigo}`, `${familia}_${atual}`, rel);
                }

                // As sombras variam no sufixo, então precisam ser varridas.
                const de = `${PREFIXO_SOMBRA}${antigo}-`;
                const chaves: string[] = [];
                for (let i = 0; i < storage.length; i++) {
                    const k = storage.key(i);
                    if (k && k.startsWith(de)) chaves.push(k);
                }
                for (const k of chaves) {
                    copiar(storage, k, `${PREFIXO_SOMBRA}${atual}-${k.slice(de.length)}`, rel);
                }
            }
        }

        storage.setItem(CHAVE_MIGRACAO, new Date().toISOString());
    } catch (e) {
        // localStorage indisponível (modo privado, cota estourada) não pode
        // derrubar a inicialização do app.
        console.warn('[migracaoArcano] migração não concluída:', e);
    }

    return rel;
}
