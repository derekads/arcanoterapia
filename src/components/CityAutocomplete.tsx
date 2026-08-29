import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Loader2, Search, AlertCircle, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { buscarCidadeReserva, type CidadeReserva } from '../data/cidades';

interface CityData {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface Props {
  onSelect: (data: CityData) => void;
  initialValue?: string;
}

type Origem = 'api' | 'reserva';
type Estado = 'ocioso' | 'buscando' | 'ok' | 'semResultado' | 'falhou';

/** Quanto esperar pela API antes de desistir e usar a lista local. */
const TIMEOUT_MS = 7000;

/** Debounce da digitação. */
const DEBOUNCE_MS = 250;

interface Achado extends CityData {
  chave: string;
}

const comChave = (c: CityData & { id?: number }, i: number): Achado => ({
  ...c,
  chave: c.id != null ? `api-${c.id}` : `${c.name}-${c.latitude}-${c.longitude}-${i}`,
});

const daReserva = (c: CidadeReserva, i: number): Achado =>
  comChave({ ...c }, i);

export const CityAutocomplete: React.FC<Props> = ({ onSelect, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Achado[]>([]);
  const [estado, setEstado] = useState<Estado>('ocioso');
  const [origem, setOrigem] = useState<Origem>('api');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Depois de escolher uma cidade o campo passa a exibir "Porto Velho,
   * Rondônia". Sem esta trava, esse texto dispararia uma nova busca — que
   * não encontra nada, porque nenhum serviço indexa "cidade, estado" — e a
   * lista reabriria vazia em cima da escolha que o usuário acabou de fazer.
   */
  const ignorarProximaBusca = useRef(false);

  /**
   * Cada busca recebe um número. Só a resposta da busca mais recente pode
   * escrever na tela: sem isso, a resposta lenta de "Porto" chega depois da
   * resposta rápida de "Porto Velho" e apaga o resultado certo.
   */
  const buscaAtual = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (ignorarProximaBusca.current) {
      ignorarProximaBusca.current = false;
      return;
    }

    if (query.trim().length < 3) {
      setSuggestions([]);
      setEstado('ocioso');
      return;
    }

    const id = ++buscaAtual.current;
    setEstado('buscando');
    setIsOpen(true);

    const debounce = setTimeout(async () => {
      const termo = query.trim();

      // A lista local responde na hora e serve de rede de segurança para
      // qualquer desfecho da chamada de rede.
      const reserva = buscarCidadeReserva(termo).map(daReserva);

      // A API não tem cancelamento próprio; sem este abort, uma conexão que
      // trava deixa o campo girando para sempre.
      const controller = new AbortController();
      const corta = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(termo)}&count=6&language=pt&format=json`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (id !== buscaAtual.current) return; // chegou atrasada: descartar

        const achados: Achado[] = (data?.results || [])
          .filter((c: any) => typeof c?.latitude === 'number' && typeof c?.longitude === 'number' && c?.timezone)
          .map(comChave);

        if (achados.length > 0) {
          setSuggestions(achados);
          setOrigem('api');
          setEstado('ok');
        } else if (reserva.length > 0) {
          setSuggestions(reserva);
          setOrigem('reserva');
          setEstado('ok');
        } else {
          setSuggestions([]);
          setEstado('semResultado');
        }
      } catch (e) {
        if (id !== buscaAtual.current) return;
        console.warn('[CityAutocomplete] busca online indisponível, usando lista local:', e);
        setSuggestions(reserva);
        setOrigem('reserva');
        setEstado(reserva.length > 0 ? 'ok' : 'falhou');
      } finally {
        clearTimeout(corta);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = useCallback((city: Achado) => {
    ignorarProximaBusca.current = true;
    buscaAtual.current++; // invalida qualquer resposta ainda em trânsito

    const formattedName = `${city.name}, ${city.admin1 || city.country}`;
    setQuery(formattedName);
    setSuggestions([]);
    setEstado('ocioso');
    setIsOpen(false);

    onSelect({
      name: formattedName,
      admin1: city.admin1,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone,
    });
  }, [onSelect]);

  const buscando = estado === 'buscando';
  const mostrarPainel = isOpen && (suggestions.length > 0 || estado === 'semResultado' || estado === 'falhou');

  return (
    <div ref={wrapperRef} className="relative w-full group">
      <label className="text-xs text-mystic-gold uppercase tracking-widest font-bold mb-1 ml-1 flex items-center gap-1">
        <MapPin size={12} /> Cidade de Nascimento
      </label>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length >= 3) setIsOpen(true);
          }}
          onFocus={() => { if (query.trim().length >= 3) setIsOpen(true); }}
          placeholder="Digite e selecione (Ex: Porto Velho)"
          autoComplete="off"
          role="combobox"
          aria-expanded={mostrarPainel}
          aria-autocomplete="list"
          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white placeholder-white/20 focus:outline-none focus:border-mystic-gold/50 focus:bg-black/40 transition-all font-sans"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {buscando
            ? <Loader2 className="animate-spin text-mystic-gold" size={18} />
            : <Search size={18} className="opacity-50" />}
        </div>
      </div>

      <AnimatePresence>
        {mostrarPainel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full bg-[#0f172a]/95 backdrop-blur-xl border border-mystic-gold/30 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.5)] custom-scrollbar"
          >
            {suggestions.length > 0 ? (
              <>
                <ul role="listbox">
                  {suggestions.map((city) => (
                    <li
                      key={city.chave}
                      role="option"
                      aria-selected={false}
                      onClick={() => handleSelect(city)}
                      className="p-3 border-b border-white/5 hover:bg-mystic-gold/10 cursor-pointer transition-colors flex flex-col items-start gap-0.5 group/item"
                    >
                      <span className="text-gray-100 font-bold text-sm group-hover/item:text-mystic-gold transition-colors">
                        {city.name}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        {city.admin1 && <span>{city.admin1},</span>}
                        <span>{city.country}</span>
                        <span className="text-[9px] px-1 bg-white/5 rounded text-gray-600 ml-1">
                          Lat: {city.latitude.toFixed(2)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {origem === 'reserva' && (
                  <p className="flex items-center gap-1.5 px-3 py-2 text-[11px] text-amber-200/50 bg-amber-500/5">
                    <WifiOff size={11} className="shrink-0" />
                    Busca online indisponível — mostrando as principais cidades.
                  </p>
                )}
              </>
            ) : (
              <div className="p-4 flex items-start gap-2 text-sm text-gray-300">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400/70" />
                <div>
                  <p className="font-bold text-gray-200">
                    {estado === 'falhou' ? 'Não foi possível buscar agora' : 'Nenhuma cidade encontrada'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {estado === 'falhou'
                      ? 'Verifique sua conexão e tente de novo. Você também pode digitar a capital do seu estado.'
                      : 'Verifique a grafia ou tente a capital mais próxima — o cálculo do mapa aceita a cidade vizinha sem perda relevante.'}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
