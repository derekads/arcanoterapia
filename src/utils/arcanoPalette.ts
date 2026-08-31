// src/utils/arcanoPalette.ts

import type React from 'react';

/**
 * Paleta por arcano.
 *
 * Cada um dos 22 arcanos tem `cor` e `cor_secundaria` no arcanos.json e o app
 * pintava tudo de âmbar, com um tema fixo por elemento. O resultado eram 22
 * experiências visualmente idênticas.
 *
 * Usar a cor crua como texto não funciona: dez das 22 têm contraste abaixo de
 * 4.5:1 sobre o fundo #030305 — A Lua (#581c87) fica em 1.8:1 e O Eremita
 * (#1e293b) em 1.3:1, ilegíveis. Então derivamos:
 *
 *   · o MATIZ vem do arcano, e é o que dá identidade;
 *   · a LUMINOSIDADE é ajustada até o contraste atingir o alvo.
 *
 * A cor crua segue disponível para preenchimentos, brilhos e lavagens de fundo,
 * onde o contraste não se aplica.
 */

const FUNDO = '#030305';

interface HSL { h: number; s: number; l: number }

function hexParaRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '').trim();
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

function rgbParaHex(r: number, g: number, b: number): string {
    const c = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    return `#${c(r)}${c(g)}${c(b)}`;
}

function hexParaHsl(hex: string): HSL {
    const [r0, g0, b0] = hexParaRgb(hex).map(v => v / 255);
    const max = Math.max(r0, g0, b0);
    const min = Math.min(r0, g0, b0);
    const l = (max + min) / 2;
    if (max === min) return { h: 0, s: 0, l };

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h: number;
    if (max === r0) h = ((g0 - b0) / d + (g0 < b0 ? 6 : 0)) / 6;
    else if (max === g0) h = ((b0 - r0) / d + 2) / 6;
    else h = ((r0 - g0) / d + 4) / 6;
    return { h: h * 360, s, l };
}

function hslParaHex({ h, s, l }: HSL): string {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    const seg = Math.floor(h / 60) % 6;
    const [r, g, b] = [
        [c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]
    ][seg];
    return rgbParaHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/** Luminância relativa (WCAG). */
export function luminancia(hex: string): number {
    const [r, g, b] = hexParaRgb(hex).map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Razão de contraste (WCAG) entre duas cores. */
export function contraste(a: string, b: string): number {
    const [la, lb] = [luminancia(a), luminancia(b)];
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Clareia a cor, preservando matiz e saturação, até atingir o contraste alvo
 * sobre o fundo. Devolve a própria cor quando ela já passa.
 */
export function corLegivel(hex: string, alvo = 4.5, fundo = FUNDO): string {
    if (contraste(hex, fundo) >= alvo) return hex;

    const hsl = hexParaHsl(hex);
    // Cinzas quase sem saturação ganham um mínimo, senão viram branco puro
    // e o arcano perde a identidade cromática.
    const s = Math.max(hsl.s, 0.18);

    for (let l = hsl.l; l <= 0.95; l += 0.02) {
        const tentativa = hslParaHex({ h: hsl.h, s, l });
        if (contraste(tentativa, fundo) >= alvo) return tentativa;
    }
    return hslParaHex({ h: hsl.h, s, l: 0.95 });
}

/**
 * A cor de apoio, derivada da secundária — mas com identidade garantida.
 *
 * Quatorze dos vinte e dois arcanos têm uma `cor_secundaria` quase branca:
 * `#ccfbf1` n'O Mundo, `#f3e8ff` na Lua, `#ffffff` cravado n'Os Enamorados.
 * Passadas por `corLegivel`, elas já cumprem o contraste e voltam intactas — de
 * modo que a "segunda cor do arcano" chegava à tela como branco. Os cards que
 * existiam justamente para mostrar a outra face do arcano ficavam cinzentos.
 *
 * Então antes de checar contraste, a cor é trazida de volta para dentro de uma
 * faixa em que ainda se lê como cor: luminosidade no máximo 0,72 e saturação
 * mínima. Quando a secundária não tem matiz nenhum — o branco puro d'Os
 * Enamorados —, não há hue para preservar, e ela empresta o da cor principal:
 * um rosa claro ao lado do rosa do arcano diz mais do que um branco.
 */
function corDeApoio(secundaria: string, principal: string): string {
    const s = hexParaHsl(secundaria);
    const acromatica = s.s < 0.2;

    const matiz = acromatica ? hexParaHsl(principal).h : s.h;
    const saturacao = acromatica ? 0.55 : Math.max(s.s, 0.45);
    const luz = Math.min(Math.max(s.l, 0.45), 0.72);

    return corLegivel(hslParaHex({ h: matiz, s: saturacao, l: luz }), 4.5);
}

export interface PaletaArcano {
    /** Cor original, para preenchimentos e brilhos. */
    bruta: string;
    brutaSecundaria: string;
    /** Texto e ícones sobre o fundo escuro — contraste ≥ 4.5:1. */
    tinta: string;
    /** Variante suave para textos de apoio — contraste ≥ 3:1. */
    tintaSuave: string;
    /** Cor de apoio, derivada da secundária. */
    apoio: string;
    /** Bordas e divisores. */
    borda: string;
    /** Lavagem de fundo dos cards. */
    lavagem: string;
    /** Brilho para sombras projetadas. */
    brilho: string;
    /** Gradiente de duas paradas para faixas e realces. */
    gradiente: string;
}

/**
 * Borda de gradiente COMPLETA, nos quatro lados de um elemento arredondado.
 *
 * Antes os cards levavam um filete de 3px só no topo (`inset-x-0 top-0`). Uma
 * borda de gradiente presa a um lado lê como recorte, não como acabamento — e
 * some quando o card encosta em outro elemento.
 *
 * A técnica: duas camadas de background no mesmo elemento. A de baixo é o
 * gradiente recortado na CAIXA DA BORDA; a de cima é o fundo do card recortado
 * na CAIXA DE PADDING. Com a borda transparente, o gradiente só aparece na
 * faixa entre as duas — ou seja, exatamente na borda, acompanhando o
 * arredondamento.
 *
 * A camada opaca no meio é obrigatória: sem ela, o fundo translúcido do card
 * deixaria o gradiente vazar por dentro e o card inteiro ficaria colorido.
 *
 * @param preenchimento  o fundo do card, geralmente um gradiente com a lavagem
 * @param fundoOpaco     a cor da página atrás do card
 * @param espessura      largura da borda em pixels
 */
export function bordaGradiente(
    paleta: PaletaArcano,
    preenchimento: string,
    fundoOpaco = '#050505',
    espessura = 1.5
): React.CSSProperties {
    return {
        border: `${espessura}px solid transparent`,
        background:
            `${preenchimento} padding-box, ` +
            `linear-gradient(${fundoOpaco}, ${fundoOpaco}) padding-box, ` +
            `${paleta.gradiente} border-box`,
    };
}

const cache = new Map<string, PaletaArcano>();

/**
 * Monta a paleta acessível de um arcano a partir das duas cores do JSON.
 */
export function paletaDoArcano(cor?: string, corSecundaria?: string): PaletaArcano {
    const bruta = cor && /^#[0-9a-f]{3,6}$/i.test(cor) ? cor : '#f59e0b';
    const brutaSecundaria = corSecundaria && /^#[0-9a-f]{3,6}$/i.test(corSecundaria) ? corSecundaria : '#fbbf24';

    const chave = `${bruta}|${brutaSecundaria}`;
    const guardada = cache.get(chave);
    if (guardada) return guardada;

    const tinta = corLegivel(bruta, 4.5);
    const apoio = corDeApoio(brutaSecundaria, bruta);

    const paleta: PaletaArcano = {
        bruta,
        brutaSecundaria,
        tinta,
        tintaSuave: corLegivel(bruta, 3),
        apoio,
        borda: `${tinta}33`,
        lavagem: `${bruta}14`,
        brilho: `${tinta}66`,
        gradiente: `linear-gradient(135deg, ${tinta}, ${apoio})`
    };

    cache.set(chave, paleta);
    return paleta;
}

/**
 * A paleta do arcano como VARIÁVEIS CSS, para temar uma subárvore inteira.
 *
 * Aplicada uma vez no elemento de topo de uma aba, todos os descendentes podem
 * usar `text-[var(--arc-tinta)]`, `border-[var(--arc-borda)]` etc. sem que cada
 * componente precise receber a paleta por props ou chamar o contexto. É o que
 * permitiu trocar dezenas de classes `amber-*` fixas de uma vez.
 *
 * Os degraus de alfa existem porque Tailwind não sabe aplicar opacidade a uma
 * cor que vem de uma variável (`bg-[var(--x)]/20` não compila): então as
 * variantes translúcidas são pré-calculadas aqui.
 */
export function variaveisDaPaleta(cor?: string, corSecundaria?: string): React.CSSProperties {
    const p = paletaDoArcano(cor, corSecundaria);
    return {
        '--arc-tinta': p.tinta,
        '--arc-suave': p.tintaSuave,
        '--arc-apoio': p.apoio,
        '--arc-forte': `${p.tinta}33`,
        '--arc-lavagem': p.lavagem,
        '--arc-borda': p.borda,
        '--arc-borda-forte': `${p.tinta}66`,
        // degraus de alfa para brilhos, preenchimentos e traçados
        '--arc-a05': `${p.tinta}0d`,
        '--arc-a18': `${p.tinta}2e`,
        '--arc-a30': `${p.tinta}4d`,
        '--arc-a50': `${p.tinta}80`,
        '--arc-a60': `${p.tinta}99`,
    } as React.CSSProperties;
}
