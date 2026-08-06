import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  eclipticToVisualDegree, 
  polarToCartesian, 
  ZODIAC_SIGNS, 
  Point2D,
  ASCENDANT_CHART_DEGREE
} from '../../utils/astroRenderUtils';

export interface Aspecto {
  planeta1: string;
  tipo: string;
  planeta2: string;
  orb: string;
}

export interface MapaSVGProps {
  planetas: Array<{
    planeta: string;
    signo: string;
    grau: string;
    elemento: string;
  }>;
  aspectos?: Aspecto[];
  planetaAtivo: string | null;
  onPlanetaClick: (planeta: string) => void;
  className?: string;
  ascendenteGraus?: number;
}

const ZODIAC_OFFSETS: Record<string, number> = {
  'Áries': 0, 'Touro': 30, 'Gêmeos': 60, 'Câncer': 90, 'Leão': 120, 'Virgem': 150,
  'Libra': 180, 'Escorpião': 210, 'Sagitário': 240, 'Capricórnio': 270, 'Aquário': 300, 'Peixes': 330
};

const PLANET_SYMBOLS: Record<string, string> = {
  'Sol': '☉', 'Lua': '☽', 'Mercúrio': '☿', 'Vênus': '♀', 'Marte': '♂',
  'Júpiter': '♃', 'Saturno': '♄', 'Urano': '♅', 'Netuno': '♆', 'Plutão': '♇',
  'Ascendente': 'ASC', 'Meio do Céu': 'MC'
};

const ELEMENT_COLORS: Record<string, string> = {
  fogo: '#f97316',
  fire: '#f97316',
  terra: '#10b981',
  earth: '#10b981',
  ar: '#38bdf8',
  air: '#38bdf8',
  agua: '#8b5cf6',
  water: '#8b5cf6',
};

const PLANET_EN_TO_PT: Record<string, string> = {
  'sun': 'Sol', 'moon': 'Lua', 'mercury': 'Mercúrio', 'venus': 'Vênus', 'mars': 'Marte',
  'jupiter': 'Júpiter', 'saturn': 'Saturno', 'uranus': 'Urano', 'neptune': 'Netuno', 'pluto': 'Plutão'
};

// Helper: Converter ex "18°59'" em graus absolutos 0-360
const parseDegreeText = (signo: string, grauText: string): number => {
  const match = grauText.match(/(\d+)°(\d+)'/);
  const base = ZODIAC_OFFSETS[signo] || 0;
  if (!match) return base;
  return base + parseInt(match[1], 10) + (parseInt(match[2], 10) / 60);
};

export const MapaSVG: React.FC<MapaSVGProps> = ({ 
  planetas, 
  aspectos = [],
  planetaAtivo, 
  onPlanetaClick,
  className = "",
  ascendenteGraus = 0 
}) => {
  
  // Parâmetros Físicos do SVG
  const cx = 200;
  const cy = 200;
  const rZodiacOuter = 190;
  const rZodiacInner = 160;
  const rHousesInner = 130;
  const rPlanetas = 100;

  // 1. Processar as posições calculadas dos planetas
  const astrosCalculados = useMemo(() => {
    return planetas.map(p => {
      const rawDegree = parseDegreeText(p.signo, p.grau);
      
      // Converte o grau da eclíptica para o ângulo visual usando o Ascendente como referência (270° = Esquerda)
      const visualDegree = eclipticToVisualDegree(rawDegree, ascendenteGraus);
      const coord = polarToCartesian(cx, cy, rPlanetas, visualDegree);
      
      return {
        ...p,
        symbol: PLANET_SYMBOLS[p.planeta] || '✨',
        color: ELEMENT_COLORS[p.elemento.toLowerCase()] || '#cbd5e1',
        visualDegree,
        x: coord.x,
        y: coord.y,
      };
    });
  }, [planetas, ascendenteGraus]);

  // Map para busca rápida de coordenadas dos planetas para os aspectos
  const astrosMap = useMemo(() => {
    const map: Record<string, Point2D> = {};
    astrosCalculados.forEach(a => {
      map[a.planeta.toLowerCase()] = { x: a.x, y: a.y };
    });
    return map;
  }, [astrosCalculados]);

  // 2. Processar linhas de aspectos
  const aspectLines = useMemo(() => {
    return aspectos.map((asp, idx) => {
      // Traduzir nome em inglês do aspecto para buscar coordenadas em português
      const name1 = PLANET_EN_TO_PT[asp.planeta1.toLowerCase()] || asp.planeta1;
      const name2 = PLANET_EN_TO_PT[asp.planeta2.toLowerCase()] || asp.planeta2;

      const p1 = astrosMap[name1.toLowerCase()];
      const p2 = astrosMap[name2.toLowerCase()];

      if (!p1 || !p2) return null;

      // Cores por tipo de aspecto (Místico/Premium)
      let strokeColor = 'rgba(255,255,255,0.15)';
      let dashArray = 'none';

      if (asp.tipo.toLowerCase() === 'opposition') {
        strokeColor = 'rgba(239, 68, 68, 0.4)'; // Red
      } else if (asp.tipo.toLowerCase() === 'conjunction') {
        strokeColor = 'rgba(245, 158, 11, 0.4)'; // Amber
      } else if (asp.tipo.toLowerCase() === 'trine') {
        strokeColor = 'rgba(16, 185, 129, 0.4)'; // Emerald
      } else if (asp.tipo.toLowerCase() === 'square') {
        strokeColor = 'rgba(139, 92, 246, 0.4)'; // Violet/Purple
        dashArray = '3 3';
      }

      return (
        <line
          key={`aspect-${idx}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray={dashArray}
        />
      );
    }).filter(Boolean);
  }, [aspectos, astrosMap]);

  return (
    <div className={`relative ${className}`}>
      {/* Container estático premium para visualização nítida das coordenadas */}
      <div className="w-full h-full select-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="sky-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0b0f19" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#030712" stopOpacity="1" />
              <stop offset="100%" stopColor="#020617" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Fundo do Céu Astral */}
          <circle cx={cx} cy={cy} r={rZodiacOuter} fill="url(#sky-grad)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={rZodiacInner} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={rHousesInner} fill="#03071244" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          
          {/* Anel Central Místico */}
          <circle cx={cx} cy={cy} r="35" fill="#090d16" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="1" />

          {/* 3. Desenhar divisões das 12 Casas Astrológicas */}
          {Array.from({ length: 12 }).map((_, i) => {
            const startAngle = (ASCENDANT_CHART_DEGREE + i * 30) % 360;
            const outerPt = polarToCartesian(cx, cy, rZodiacInner, startAngle);
            const innerPt = polarToCartesian(cx, cy, 35, startAngle);
            
            // Números das casas
            const midAngle = startAngle + 15;
            const textPt = polarToCartesian(cx, cy, rHousesInner - 12, midAngle);
            
            // Destaque para eixos angulares (AC, IC, DC, MC)
            const isAngular = [0, 3, 6, 9].includes(i);
            const strokeColor = isAngular ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)';
            const strokeWidth = isAngular ? '1.5' : '1';

            return (
              <g key={`house-line-${i}`}>
                <line 
                  x1={innerPt.x} y1={innerPt.y} 
                  x2={outerPt.x} y2={outerPt.y} 
                  stroke={strokeColor} 
                  strokeWidth={strokeWidth} 
                />
                <text
                  x={textPt.x} y={textPt.y + 3}
                  fill="rgba(255,255,255,0.2)"
                  fontSize="8"
                  fontFamily="serif"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* 4. Desenhar o Zodíaco (Anel Externo) */}
          {ZODIAC_SIGNS.map((sign, i) => {
            const visualStart = eclipticToVisualDegree(i * 30, ascendenteGraus);
            const midVisual = (visualStart + 15) % 360;
            const symPos = polarToCartesian(cx, cy, (rZodiacOuter + rZodiacInner) / 2, midVisual);
            
            const divOuter = polarToCartesian(cx, cy, rZodiacOuter, visualStart);
            const divInner = polarToCartesian(cx, cy, rZodiacInner, visualStart);

            return (
              <g key={`zodiac-sign-${sign.sign}`}>
                {/* Linhas divisorias dos signos */}
                <line x1={divOuter.x} y1={divOuter.y} x2={divInner.x} y2={divInner.y} stroke="rgba(255,255,255,0.1)" />
                {/* Símbolo do Signo */}
                <text
                  x={symPos.x} y={symPos.y + 4}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontSize="12"
                  className="font-serif select-none"
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}

          {/* 5. Linhas de Aspectos */}
          {aspectLines}

          {/* 6. Renderização Vetorial dos Planetas */}
          {astrosCalculados.map(p => {
            const isActive = planetaAtivo === p.planeta;

            return (
              <motion.g 
                key={p.planeta}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onPlanetaClick(p.planeta); }}
                onTouchEnd={(e) => { e.stopPropagation(); onPlanetaClick(p.planeta); }}
                className="cursor-pointer outline-none"
              >
                {/* Hitbox Invisível Massiva de Toque (min 44px) */}
                <circle cx={p.x} cy={p.y} r="20" fill="transparent" />

                {/* Aura Glow no estado Ativo */}
                {isActive && (
                  <circle 
                    cx={p.x} cy={p.y} r="18" 
                    fill="none" stroke={p.color} strokeWidth="1.5"
                    className="opacity-70 pointer-events-none"
                    style={{ filter: `drop-shadow(0 0 6px ${p.color})` }}
                  />
                )}

                {/* Corpo do Planeta */}
                <circle 
                  cx={p.x} cy={p.y} r="12" 
                  fill="#070a13" stroke={isActive ? p.color : 'rgba(255,255,255,0.2)'} 
                  strokeWidth="1.5" 
                  className="transition-colors duration-300 pointer-events-none"
                />

                {/* Glifo Astrológico */}
                <text
                  x={p.x} y={p.y + 1}
                  fill={isActive ? '#fff' : 'rgba(255,255,255,0.75)'}
                  fontSize="13"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="pointer-events-none transition-colors duration-300 font-bold"
                >
                  {p.symbol}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
