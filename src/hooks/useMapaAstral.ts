import { useState, useEffect, useCallback, useMemo } from 'react';
import type { UserBirthData, MapaAstralCalculado } from '../types';
import { calcularMapaAstral } from '../utils/astronomia';

interface UseMapaAstralReturn {
  mapa: MapaAstralCalculado | null;
  loading: boolean;
  error: string | null;
  recalcular: () => void;
  ultimaAtualizacao: string | null;
}

/**
 * Hook que calcula mapa astral em tempo real
 * Recalcula automaticamente quando userData mudar
 */
export function useMapaAstral(userData: UserBirthData | null): UseMapaAstralReturn {
  const [mapa, setMapa] = useState<MapaAstralCalculado | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string | null>(null);

  const executarCalculo = useCallback(() => {
    if (!userData) {
      setMapa(null);
      return;
    }

    // Validação de dados
    if (!userData.dataNascimento || !userData.horaNascimento) {
      setError('Data e hora de nascimento são obrigatórias');
      return;
    }

    if (userData.localizacao.latitude < -90 || userData.localizacao.latitude > 90) {
      setError('Latitude inválida');
      return;
    }

    setLoading(true);
    setError(null);

    // Usar setTimeout para não bloquear a UI durante cálculo
    const timeoutId = setTimeout(() => {
      try {
        const resultado = calcularMapaAstral(userData);
        setMapa(resultado);
        setUltimaAtualizacao(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('[useMapaAstral] Erro no cálculo:', err);
        setError(err instanceof Error ? err.message : 'Falha no cálculo astronômico');
        setMapa(null);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [userData]);

  // Efeito principal: recalcular quando dados mudarem
  useEffect(() => {
    executarCalculo();
  }, [executarCalculo]);

  // Memoizar resultado para evitar re-renders desnecessários
  const mapaMemoizado = useMemo(() => mapa, [
    mapa?.sol.longitude,
    mapa?.lua.longitude,
    mapa?.ascendente.longitude
  ]);

  return {
    mapa: mapaMemoizado,
    loading,
    error,
    recalcular: executarCalculo,
    ultimaAtualizacao
  };
}