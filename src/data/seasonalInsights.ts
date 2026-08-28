import { AreaDaVida, Trimestre, QuarterlyInsight } from '../types';
import seasonalInsights from './seasonalInsights.json';
import { numeroParaIndiceConteudo } from './arcanos';

const INSIGHTS: QuarterlyInsight[] = seasonalInsights as QuarterlyInsight[];

/**
 * Retorna o insight específico para um arcano, trimestre e área da vida.
 */
export function getSeasonalInsight(
    arcanoId: number,
    trimestre: Trimestre,
    area: AreaDaVida
): string {
    // O arquivo indexa O Louco como 0; o app o numera como 22.
    const idx = numeroParaIndiceConteudo(arcanoId);
    const arcanoInsight = INSIGHTS.find(i => i.arcanoId === idx);
    if (!arcanoInsight) {
        // Fallback genérico se o arcano não tiver insights específicos ainda
        return `Para o trimestre ${trimestre}, seu arcano sugere foco e equilíbrio na área de ${area.toLowerCase()}.`;
    }

    return arcanoInsight.trimestres[trimestre][area] || `Continue sua jornada de evolução em ${area.toLowerCase()}.`;
}

/**
 * Retorna todos os insights de um trimestre para um arcano.
 */
export function getQuarterlyInsights(
    arcanoId: number,
    trimestre: Trimestre
): Record<AreaDaVida, string> | null {
    const arcanoInsight = INSIGHTS.find(i => i.arcanoId === numeroParaIndiceConteudo(arcanoId));
    if (!arcanoInsight) return null;
    return arcanoInsight.trimestres[trimestre];
}
