import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidOrb } from './orb/LiquidOrb';
import { useArcano } from '../context/ArcanoContext';
import { calcularArcanoBongo } from '../utils/bongo';
import { paletaDoArcano } from '../utils/arcanoPalette';

interface Props {
  onComplete: () => void;
}

/**
 * A ABERTURA — a gematria acontecendo
 *
 * Esta tela durava 2000ms fixos e mostrava quatro frases genéricas em rodízio
 * de 600ms. Duas consequências que ninguém pretendeu: a quarta frase
 * ("Revelando o caminho...") só aparecia nos últimos 200ms, ou seja, nunca era
 * lida; e o orbe de WebGPU — a animação mais cara do app, 60KB de WGSL, que só
 * existe aqui — passava rápido demais para ser visto.
 *
 * O ponto mais importante: a tela não esperava nada. `handleInputSubmit` já
 * calcula o arcano antes de mudar para `loading`, então os dois segundos eram
 * teatro puro. Teatro é legítimo num app de oráculo; teatro vazio não é.
 *
 * Agora o tempo mostra o que está sendo feito. A landing promete "A Ciência
 * Sagrada do Nome — Método da Tabela de Bongo & Kabbalah", e aqui o usuário vê
 * exatamente isso: as letras do próprio nome acendendo uma a uma com seu valor
 * na tabela, a soma crescendo, a redução até a lâmina. O método deixa de ser
 * uma frase de marketing e vira algo que se assiste.
 *
 * Quem pediu menos movimento no sistema, e quem já viu e quer pular, não ficam
 * presos: há um atalho e um caminho curto.
 */

/** Frases do caminho antigo, usadas quando não há nome para somar. */
const FRASES = [
  'Sintonizando energias...',
  'Embaralhando o destino...',
  'Consultando os arquétipos...',
  'Revelando o caminho...',
];

/** Ritmo da cerimônia, em milissegundos. */
const TEMPOS = {
  /** Antes da primeira letra acender: o nome entra e o orbe se forma. */
  entrada: 900,
  /** Janela em que as letras acendem, dividida entre elas. */
  letras: 2600,
  /** A soma fica sozinha na tela antes de reduzir. */
  somaParada: 700,
  /** Cada degrau da redução (262 → 10). */
  porDegrau: 600,
  /** O arcano revelado, antes de entregar a tela. */
  arcano: 900,
  /** Caminho curto: sem nome, ou com `prefers-reduced-motion`. */
  simples: 2000,
} as const;

type Fase = 'entrada' | 'letras' | 'soma' | 'reducao' | 'arcano';

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const { userData, arcanoPessoal } = useArcano();

  /**
   * `onComplete` é recriado a cada render do App, então tê-lo nas dependências
   * do efeito fazia o efeito remontar junto: a remontagem limpava o
   * `setTimeout` de conclusão e recomeçava a contagem do zero. Bastava o App
   * renderizar mais de uma vez durante a abertura — um toast, a sincronização
   * de perfis, um evento `storage` de outra aba — para a tela nunca avançar.
   *
   * Guardar o callback em uma ref desacopla as duas coisas: o efeito roda uma
   * vez só, no mount, e ainda assim chama sempre a versão mais recente.
   */
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const prefereMenosMovimento = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const nome = (userData as any)?.nome || (userData as any)?.name || '';

  /** A soma do nome, calculada uma vez. */
  const bongo = useMemo(
    () => (nome.trim() ? calcularArcanoBongo(nome) : null),
    [nome]
  );

  /**
   * A cerimônia só roda quando há letras para somar E o usuário não pediu
   * menos movimento. Nos outros casos fica o caminho curto de antes.
   */
  const cerimonia = Boolean(bongo && bongo.letras.length > 0) && !prefereMenosMovimento;

  const paleta = useMemo(
    () => paletaDoArcano((arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria),
    [(arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria]
  );

  // ── ESTADO DA CERIMÔNIA ───────────────────────────────────────────────────
  const [fase, setFase] = useState<Fase>('entrada');
  const [acesas, setAcesas] = useState(0);
  const [degrau, setDegrau] = useState(0);

  // Caminho curto
  const [fraseIndex, setFraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const pular = useCallback(() => onCompleteRef.current(), []);

  useEffect(() => {
    const timers: number[] = [];
    const marcar = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    if (!cerimonia) {
      const inicio = Date.now();
      const texto = window.setInterval(
        () => setFraseIndex(p => (p + 1) % FRASES.length),
        TEMPOS.simples / FRASES.length
      );
      const barra = window.setInterval(
        () => setProgress(Math.min(((Date.now() - inicio) / TEMPOS.simples) * 100, 100)),
        30
      );
      marcar(TEMPOS.simples, () => onCompleteRef.current());
      return () => {
        window.clearInterval(texto);
        window.clearInterval(barra);
        timers.forEach(window.clearTimeout);
      };
    }

    const total = bongo!.letras.length;
    // Nomes longos não podem esticar a cerimônia: a janela é fixa e o passo
    // encolhe. Um piso evita que vinte letras virem um piscar ilegível.
    const passo = Math.max(60, TEMPOS.letras / total);
    const duracaoLetras = passo * total;

    marcar(TEMPOS.entrada, () => setFase('letras'));

    for (let i = 1; i <= total; i++) {
      marcar(TEMPOS.entrada + passo * i, () => setAcesas(i));
    }

    const fimLetras = TEMPOS.entrada + duracaoLetras;
    marcar(fimLetras, () => setFase('soma'));

    // A redução só tem degraus quando a soma passa de 22.
    const degraus = Math.max(0, bongo!.reducao.length - 1);
    const inicioReducao = fimLetras + TEMPOS.somaParada;

    if (degraus > 0) {
      marcar(inicioReducao, () => setFase('reducao'));
      for (let d = 1; d <= degraus; d++) {
        marcar(inicioReducao + TEMPOS.porDegrau * d, () => setDegrau(d));
      }
    }

    /**
     * O último degrau precisa de um tempo só dele.
     *
     * Na primeira versão deste roteiro, `fimReducao` era
     * `inicioReducao + porDegrau * degraus` — o mesmo instante em que o último
     * `setDegrau` dispara. O resultado era "858 → 21" aparecendo por zero
     * milissegundo: a tela pulava da soma para o arcano sem nunca mostrar a
     * conta. Exatamente o defeito da versão anterior, em que a quarta frase
     * durava 200ms. Daí o `+ 1`: um batimento extra para a redução ser lida.
     */
    const fimReducao = inicioReducao + TEMPOS.porDegrau * (degraus > 0 ? degraus + 1 : 0);
    marcar(fimReducao, () => setFase('arcano'));
    marcar(fimReducao + TEMPOS.arcano, () => onCompleteRef.current());

    return () => timers.forEach(window.clearTimeout);
    // Sem dependências: a abertura tem roteiro fixo e não deve reiniciar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── O ORBE ────────────────────────────────────────────────────────────────
  const [orbeDisponivel, setOrbeDisponivel] = useState(!prefereMenosMovimento);
  const aoFalharOrbe = useCallback((motivo: string) => {
    console.info('[LoadingScreen] orbe indisponível, usando o halo simples:', motivo);
    setOrbeDisponivel(false);
  }, []);

  const somaParcial = useMemo(
    () => (bongo ? bongo.letras.slice(0, acesas).reduce((acc, l) => acc + l.valor, 0) : 0),
    [bongo, acesas]
  );

  /**
   * As letras agrupadas em palavras.
   *
   * `calcularArcanoBongo` devolve uma lista plana, porque espaços e hífens não
   * entram na soma. Renderizada direto, ela colava o nome inteiro —
   * "DerekdeOliveiraSantos" — e quebrava a linha no meio de uma palavra. Aqui
   * as palavras do `nomeConsiderado` são percorridas na mesma ordem, cada uma
   * levando a sua fatia da lista, o que devolve os espaços à leitura sem tocar
   * no cálculo.
   */
  const palavras = useMemo(() => {
    if (!bongo) return [];
    const grupos: { indiceInicial: number; letras: typeof bongo.letras }[] = [];
    let cursor = 0;
    for (const palavra of bongo.nomeConsiderado.split(/\s+/).filter(Boolean)) {
      const quantas = [...palavra].filter(
        ch => /^[A-Z]$/.test(ch.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase())
      ).length;
      if (quantas === 0) continue;
      grupos.push({ indiceInicial: cursor, letras: bongo.letras.slice(cursor, cursor + quantas) });
      cursor += quantas;
    }
    return grupos;
  }, [bongo]);

  const corAtiva = fase === 'arcano' ? paleta.tinta : '#c4b5fd';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'radial-gradient(circle at center, #1a0b2e 0%, #0a0514 100%)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-1000"
        style={{ background: fase === 'arcano' ? `${paleta.bruta}1f` : 'rgba(124,58,237,0.05)' }}
      />

      {/* ── O ORBE ──────────────────────────────────────────────────── */}
      <div className="relative flex items-center justify-center w-40 h-40 mb-10 shrink-0">
        <div
          className="absolute w-48 h-48 rounded-full blur-[70px] pointer-events-none transition-colors duration-700"
          style={{
            background: fase === 'arcano'
              ? `radial-gradient(circle, ${paleta.brilho}, transparent 70%)`
              : 'radial-gradient(circle, rgba(168,85,247,0.30), transparent 70%)',
          }}
        />
        {orbeDisponivel ? (
          <LiquidOrb tamanho={160} estado="thinking" aoFalhar={aoFalharOrbe} />
        ) : (
          <motion.div
            className="w-28 h-28 rounded-full border"
            style={{ borderColor: `${corAtiva}55` }}
            animate={prefereMenosMovimento ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {cerimonia ? (
        <div className="w-full max-w-xl flex flex-col items-center">
          {/* ── AS LETRAS DO NOME ─────────────────────────────────── */}
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-5 text-center">
            {fase === 'entrada' && 'Lendo o seu nome'}
            {fase === 'letras' && 'Somando pela Tabela de Bongo'}
            {fase === 'soma' && 'A soma do seu nome'}
            {fase === 'reducao' && 'Reduzindo à lâmina'}
            {fase === 'arcano' && 'A sua lâmina'}
          </p>

          <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-4 mb-8">
            {palavras.map((palavra, p) => (
              <div key={p} className="flex items-end gap-x-1">
                {palavra.letras.map((l, i) => {
                  const indice = palavra.indiceInicial + i;
                  const acesa = indice < acesas;
                  return (
                    <div key={indice} className="flex flex-col items-center min-w-[1.1rem]">
                      <motion.span
                        className="font-serif text-2xl leading-none"
                        animate={{
                          color: acesa ? corAtiva : 'rgba(255,255,255,0.18)',
                          scale: acesa && indice === acesas - 1 ? 1.25 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        {l.original}
                      </motion.span>
                      <motion.span
                        className="text-[9px] tabular-nums mt-1"
                        animate={{ opacity: acesa ? 0.65 : 0, color: corAtiva }}
                        transition={{ duration: 0.25 }}
                      >
                        {l.valor}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ── A SOMA E A REDUÇÃO ────────────────────────────────── */}
          <div className="h-20 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {fase === 'arcano' ? (
                <motion.div
                  key="arcano"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="font-serif text-4xl" style={{ color: paleta.tinta }}>
                    {bongo!.arcano}
                  </p>
                  {arcanoPessoal?.nome && (
                    <p className="text-xs uppercase tracking-[0.25em] mt-2" style={{ color: paleta.tintaSuave }}>
                      {arcanoPessoal.nome}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="soma"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 tabular-nums"
                >
                  <span className="font-serif text-3xl" style={{ color: corAtiva }}>
                    {fase === 'reducao' || fase === 'soma' ? bongo!.soma : somaParcial}
                  </span>
                  {bongo!.reducao.slice(1, degrau + 1).map((v, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-serif text-3xl"
                      style={{ color: corAtiva }}
                    >
                      <span className="text-white/25 mx-1 text-xl">→</span>{v}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {bongo!.sufixosIgnorados.length > 0 && (
            <p className="text-[10px] text-white/25 mt-3 text-center">
              {bongo!.sufixosIgnorados.join(', ')} — sufixo de linhagem, fora da soma
            </p>
          )}
        </div>
      ) : (
        /* ── CAMINHO CURTO ───────────────────────────────────────── */
        <div className="h-12 flex flex-col items-center justify-center space-y-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={fraseIndex}
              initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.2em' }}
              animate={{ opacity: 1, scale: 1, letterSpacing: '0.4em' }}
              exit={{ opacity: 0, scale: 1.1, letterSpacing: '0.6em' }}
              transition={{ duration: 0.5, ease: 'circOut' }}
              className="text-xs md:text-sm font-serif uppercase text-center"
              style={{ color: '#c4b5fd99' }}
            >
              {FRASES[fraseIndex]}
            </motion.p>
          </AnimatePresence>

          <div className="relative w-40 h-1 mt-4">
            <div className="absolute inset-0 bg-white/5 rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#7c3aed,#c4b5fd)' }}
            />
          </div>
        </div>
      )}

      {/* ── PULAR ───────────────────────────────────────────────────── */}
      <button
        onClick={pular}
        className="absolute bottom-8 right-8 text-[11px] uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors px-3 py-2"
      >
        Pular
      </button>
    </motion.div>
  );
};

export default LoadingScreen;
