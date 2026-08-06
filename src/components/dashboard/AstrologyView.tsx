import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, FileText, Share2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

import { AstroWheel, PlanetPosition } from './AstroWheel';
import { CelestialAccordion } from './CelestialAccordion';
import { PlanetCardData } from './PlanetCard';
import { AspectGrid, AspectPreview } from './AspectGrid';

// MAPA ASTROLÓGICO - DADOS MOCK (V3)
const MOCK_ASC_DEGREE = 131.25; // Leão 11°15' = 120 + 11.25
const DEREK_PLANETS: PlanetCardData[] = [
  {
    key: 'sun', name: 'Sol', symbol: '☉',
    sign: 'Câncer', signSymbol: '♋', degreeText: "18°59'", degree: 108.98,
    house: 11, dignity: 'neutral', element: 'water', retrograde: false
  },
  {
    key: 'moon', name: 'Lua', symbol: '☽',
    sign: 'Capricórnio', signSymbol: '♑', degreeText: "23°00'", degree: 293.00,
    house: 6, dignity: 'detriment', element: 'earth', retrograde: false
  },
  {
    key: 'mercury', name: 'Mercúrio', symbol: '☿',
    sign: 'Câncer', signSymbol: '♋', degreeText: "02°10'", degree: 92.16,
    house: 11, dignity: 'neutral', element: 'water', retrograde: false
  },
  {
    key: 'venus', name: 'Vênus', symbol: '♀',
    sign: 'Gêmeos', signSymbol: '♊', degreeText: "12°17'", degree: 72.28,
    house: 10, dignity: 'neutral', element: 'air', retrograde: false
  },
  {
    key: 'mars', name: 'Marte', symbol: '♂',
    sign: 'Gêmeos', signSymbol: '♊', degreeText: "17°32'", degree: 77.53,
    house: 10, dignity: 'neutral', element: 'air', retrograde: false
  },
  {
    key: 'jupiter', name: 'Júpiter', symbol: '♃',
    sign: 'Capricórnio', signSymbol: '♑', degreeText: "12°21'", degree: 282.35,
    house: 6, dignity: 'fall', element: 'earth', retrograde: true
  },
  {
    key: 'saturn', name: 'Saturno', symbol: '♄',
    sign: 'Áries', signSymbol: '♈', degreeText: "07°17'", degree: 7.28,
    house: 9, dignity: 'fall', element: 'fire', retrograde: false
  },
  {
    key: 'uranus', name: 'Urano', symbol: '♅',
    sign: 'Aquário', signSymbol: '♒', degreeText: "03°14'", degree: 303.23,
    house: 7, dignity: 'domicile', element: 'air', retrograde: false
  },
  {
    key: 'neptune', name: 'Netuno', symbol: '♆',
    sign: 'Capricórnio', signSymbol: '♑', degreeText: "26°55'", degree: 296.91,
    house: 6, dignity: 'neutral', element: 'earth', retrograde: false
  },
  {
    key: 'pluto', name: 'Plutão', symbol: '♇',
    sign: 'Sagitário', signSymbol: '♐', degreeText: "00°45'", degree: 240.75,
    house: 5, dignity: 'neutral', element: 'fire', retrograde: false
  }
];

const MOCK_ASPECTS: AspectPreview[] = [
  { planet1: 'sun', planet2: 'moon', type: 'opposition', orb: 4.02 },
  { planet1: 'venus', planet2: 'mars', type: 'conjunction', orb: 5.25 },
  { planet1: 'venus', planet2: 'jupiter', type: 'opposition', orb: 0.07 },
  { planet1: 'sun', planet2: 'saturn', type: 'square', orb: 11.72 }
];

export const AstrologyView: React.FC = () => {
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportMap = async () => {
    const wheelElement = document.getElementById('astro-wheel-export-target');
    if (!wheelElement) return;

    try {
      setIsExporting(true);
      const canvas = await html2canvas(wheelElement, {
        backgroundColor: '#030305',
        scale: 2, // High resolution for mobile
        logging: false,
        useCORS: true
      });

      const dataUrl = canvas.toDataURL('image/png');

      // Native Share API if available
      if (navigator.share) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], 'meu-mapa-astral.png', { type: 'image/png' });

          await navigator.share({
            title: 'Meu Mapa Astral - Arcanoterapia',
            text: 'Descobri meu Mapa Celestial no Arcanoterapia! ✨',
            files: [file]
          });
          return;
        } catch (shareError) {
          console.log('Share falhou ou cancelado, fallback para download');
        }
      }

      // Fallback: Download nativo
      const link = document.createElement('a');
      link.download = 'arcanoterapia-mapa.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Falha ao exportar mapa', e);
      alert('Não foi possível gerar a imagem no momento. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  // Derivar o objeto Planeta Selecionado a partir da Key
  const selectedPlanetData = DEREK_PLANETS.find(p => p.key === selectedPlanetKey) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans overflow-x-hidden">

      {/* HEADER MASTER */}
      <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-6 sticky top-0 z-50">
        <h1 className="text-2xl font-serif text-white flex items-center gap-3">
          <Compass className="text-amber-500" />
          Mapa Astral de Derek
        </h1>
        <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
          <span>SP, Brasil</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>Sistema Equal House</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 p-4 md:p-6 gap-8">

        {/* ZONA 1: WHEEL OTIMIZADO (COLUNA 1) */}
        <div className="w-full lg:w-[40%] xl:w-[35%] relative">

          <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="text-sm font-serif text-slate-300">Roda Celeste</h2>
            <button
              onClick={handleExportMap}
              disabled={isExporting}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {isExporting ? <span className="animate-pulse">Gerando...</span> : <><Share2 size={12} /> Salvar/Share</>}
            </button>
          </div>

          {/* Pegar scroll no wheel mobile não, mas sim num container adesivado */}
          <div id="astro-wheel-export-target" className="sticky top-28 bg-[#030305] rounded-3xl p-4 md:p-6 border border-white/5 shadow-2xl">
            <AstroWheel
              ascendantEclipticDegree={MOCK_ASC_DEGREE}
              planets={DEREK_PLANETS}
              selectedPlanet={selectedPlanetData} // Interface compatível
              onSelectPlanet={(p) => setSelectedPlanetKey(p.key)}
            />
            <p className="text-center text-xs text-slate-500 mt-4 italic">
              Clique nos planetas no gráfico para navegar automaticamente na lista.
            </p>
          </div>
        </div>

        {/* ZONA 2: MASTER-DETAIL ACCORDION E ASPECTOS (COLUNA 2) */}
        <div className="w-full lg:w-[60%] xl:w-[65%] space-y-10 pb-32">

          {/* Seção Corpos Celestes */}
          <section>
            <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-6 flex items-center gap-4">
              <span className="w-6 h-px bg-white/20" />
              Posicionamentos Planetários
              <span className="flex-1 h-px bg-white/20" />
            </h2>

            <CelestialAccordion
              planets={DEREK_PLANETS}
              selectedPlanet={selectedPlanetData}
              onSelect={(p) => {
                setSelectedPlanetKey(selectedPlanetKey === p.key ? null : p.key); // Toggle
              }}
            />
          </section>

          {/* Seção Aspectos */}
          <section>
            <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 mb-6 flex items-center gap-4 mt-12">
              <span className="w-6 h-px bg-white/20" />
              Sincronicidades & Aspectos
              <span className="flex-1 h-px bg-white/20" />
            </h2>

            <AspectGrid
              aspects={MOCK_ASPECTS}
              onSelectAspect={(asp) => {
                setSelectedPlanetKey(asp.planet1); // Foca no primeiro planeta do aspecto
              }}
            />
          </section>

        </div>
      </div>
    </div>
  );
};
