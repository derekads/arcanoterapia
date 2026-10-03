import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Circle } from 'lucide-react';
import { useArcano } from '../../context/ArcanoContext';
import { getShadowPatternsForArcano } from '../../data/shadowPatterns';
import { getProgressoSombra } from '../dashboard/SombraModal';
import { paletaDoArcano } from '../../utils/arcanoPalette';

/**
 * CAMINHO DE ALQUIMIA — onde o trabalho com as sombras está
 *
 * Esta trilha mostrava progresso inventado: `isCompleted={idx === 0}` e
 * `isLocked={idx > 1}`, cravados no código. O primeiro passo aparecia
 * concluído e o terceiro trancado para todo mundo, no primeiro acesso e para
 * sempre, fizesse o usuário o que fizesse. Um medidor que não media nada.
 *
 * O progresso real já existia, gravado por sombra em
 * `shadow-progress-<arcano>-<sombra>` pelo programa de 21 dias. Agora a
 * trilha lê esse progresso e reflete as três fases que o programa de fato tem:
 * observação (dias 1-7), diálogo (8-14) e integração (15-21).
 */

/** As três fases do programa de 21 dias, e o dia em que cada uma se completa. */
const FASES = [
    {
        titulo: 'Observação',
        descricao: 'Reconhecer o gatilho no momento em que ele acontece.',
        ateODia: 7,
    },
    {
        titulo: 'Diálogo Interno',
        descricao: 'Perguntar à sombra que proteção ela acreditava estar oferecendo.',
        ateODia: 14,
    },
    {
        titulo: 'Integração',
        descricao: 'Agir com consciência apesar do impulso — e sem se punir por senti-lo.',
        ateODia: 21,
    },
];

interface NoProps {
    indice: number;
    titulo: string;
    descricao: string;
    concluida: boolean;
    trancada: boolean;
    diasFeitos: number;
    diasDaFase: number;
    paleta: ReturnType<typeof paletaDoArcano>;
}

const No: React.FC<NoProps> = ({
    indice, titulo, descricao, concluida, trancada, diasFeitos, diasDaFase, paleta,
}) => (
    <motion.li
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: indice * 0.1 }}
        className="relative flex gap-4 pb-8 last:pb-0"
    >
        {/* linha que liga os nós */}
        {indice < FASES.length - 1 && (
            <span
                className="absolute left-[15px] top-9 bottom-0 w-px"
                style={{ background: concluida ? paleta.borda : 'rgba(255,255,255,0.08)' }}
            />
        )}

        <span
            className="relative z-10 w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
            style={{
                borderColor: concluida ? paleta.tinta : trancada ? 'rgba(255,255,255,0.10)' : paleta.borda,
                background: concluida ? paleta.tinta : '#0a0a0f',
            }}
        >
            {concluida
                ? <Check size={14} className="text-black" strokeWidth={3} />
                : trancada
                    ? <Lock size={12} className="text-white/25" />
                    : <Circle size={9} style={{ color: paleta.tinta }} fill="currentColor" />}
        </span>

        <div className="pt-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className={`font-serif text-[15px] m-0 ${trancada ? 'text-white/35' : 'text-white/85'}`}>
                    {titulo}
                </h4>
                <span className="text-[10px] tabular-nums" style={{ color: paleta.tintaSuave }}>
                    {Math.min(diasFeitos, diasDaFase)}/{diasDaFase} dias
                </span>
            </div>
            <p className={`text-[13px] leading-relaxed mt-1 mb-0 ${trancada ? 'text-white/25' : 'text-white/50'}`}>
                {descricao}
            </p>
        </div>
    </motion.li>
);

export const TrilhaTransmutacao: React.FC = () => {
    const { arcanoPessoal } = useArcano();

    const paleta = useMemo(
        () => paletaDoArcano((arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria),
        [(arcanoPessoal as any)?.cor, (arcanoPessoal as any)?.cor_secundaria]
    );

    /**
     * O andamento vem da sombra em que o usuário foi mais longe. Enquanto ele
     * não tiver começado nenhuma, a trilha se apresenta como o mapa do que vem
     * pela frente — sem fingir que a primeira fase já está feita.
     */
    const andamento = useMemo(() => {
        if (!arcanoPessoal) return { dias: 0, sombra: null as string | null };
        let melhor = { dias: 0, sombra: null as string | null };
        for (const s of getShadowPatternsForArcano(arcanoPessoal.numero)) {
            const p = getProgressoSombra(arcanoPessoal.numero, s.id);
            const dias = p?.diasCompletos?.length ?? 0;
            if (dias > melhor.dias) melhor = { dias, sombra: s.nomePadrao };
        }
        return melhor;
    }, [arcanoPessoal?.numero]);

    if (!arcanoPessoal) return null;

    const comecou = andamento.dias > 0;

    return (
        <section className="rounded-[1.5rem] border p-6 md:p-8" style={{ borderColor: paleta.borda }}>
            <header className="mb-7">
                <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: paleta.tinta }}>
                    Caminho de Alquimia
                </p>
                <h3 className="font-serif text-2xl text-white/90 mb-1">
                    {comecou ? 'Onde você está' : 'Como o trabalho acontece'}
                </h3>
                <p className="text-sm text-white/50">
                    {comecou
                        ? `${andamento.dias} de 21 dias em “${andamento.sombra}”.`
                        : 'Três fases, 21 dias. Escolha uma sombra abaixo para começar.'}
                </p>
            </header>

            <ol className="list-none p-0 m-0">
                {FASES.map((fase, i) => {
                    const inicioDaFase = i === 0 ? 0 : FASES[i - 1].ateODia;
                    const diasDaFase = fase.ateODia - inicioDaFase;
                    const diasFeitos = Math.max(0, andamento.dias - inicioDaFase);
                    return (
                        <No
                            key={fase.titulo}
                            indice={i}
                            titulo={fase.titulo}
                            descricao={fase.descricao}
                            concluida={andamento.dias >= fase.ateODia}
                            trancada={andamento.dias < inicioDaFase}
                            diasFeitos={diasFeitos}
                            diasDaFase={diasDaFase}
                            paleta={paleta}
                        />
                    );
                })}
            </ol>

            <p className="mt-6 pt-5 border-t text-[11px] text-white/30" style={{ borderColor: paleta.borda }}>
                A transmutação é contínua. O ciclo recomeça a cada novo gatilho.
            </p>
        </section>
    );
};
