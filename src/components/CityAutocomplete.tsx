import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export const CityAutocomplete: React.FC<Props> = ({ onSelect, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Optimized Debounce Search
  useEffect(() => {
    // 1. Clear if short
    if (query.length < 3) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    // 2. Immediate Feedback (Hard Trigger)
    // We set loading TRUE immediately, before the timeout, to give instant visual feedback
    setIsLoading(true);
    setIsOpen(true); 

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (e) {
        console.error("Erro ao buscar cidades:", e);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 200); // Reduced to 200ms for "instant" feel

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (city: any) => {
    const formattedName = `${city.name}, ${city.admin1 || city.country}`;
    // Prevent triggering search again by setting state but not changing query immediately in a way that triggers effect if unnecessary,
    // actually updating query is needed for UI. The effect will run but we can ignore or let it run fast.
    setQuery(formattedName);
    setSuggestions([]);
    setIsOpen(false);
    
    onSelect({
      name: formattedName,
      admin1: city.admin1,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // isOpen logic is handled in useEffect mostly, but ensuring it's true here helps
    if (e.target.value.length >= 3) setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full group">
      <label className="text-xs text-mystic-gold uppercase tracking-widest font-bold mb-1 ml-1 flex items-center gap-1">
        <MapPin size={12} /> Cidade de Nascimento
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (query.length >= 3) setIsOpen(true);
          }}
          placeholder="Digite e selecione (Ex: Porto Velho)"
          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-white placeholder-white/20 focus:outline-none focus:border-mystic-gold/50 focus:bg-black/40 transition-all font-sans"
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <Loader2 className="animate-spin text-mystic-gold" size={18} />
          ) : (
            <Search size={18} className="opacity-50" />
          )}
        </div>
      </div>

      {/* Dropdown Suggestions */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.ul 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full bg-[#0f172a]/95 backdrop-blur-xl border border-mystic-gold/30 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-[0_10px_40px_rgba(0,0,0,0.5)] custom-scrollbar"
          >
            {suggestions.map((city) => (
              <li
                key={city.id}
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};