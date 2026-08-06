import React from 'react';
import { MapaAstralCalculado, PosicaoCelestial, SignoZodiacal } from '../types';

interface Props {
  mapa: MapaAstralCalculado;
  width?: number;
  height?: number;
}

const ZODIAC_SYMBOLS: Record<SignoZodiacal, string> = {
  'Áries': '♈', 'Touro': '♉', 'Gêmeos': '♊', 'Câncer': '♋',
  'Leão': '♌', 'Virgem': '♍', 'Libra': '♎', 'Escorpião': '♏',
  'Sagitário': '♐', 'Capricórnio': '♑', 'Aquário': '♒', 'Peixes': '♓'
};

const PLANET_SYMBOLS: Record<string, string> = {
  'Sol': '☉', 'Lua': '☽', 'Mercúrio': '☿', 'Vênus': '♀', 'Marte': '♂',
  'Júpiter': '♃', 'Saturno': '♄', 'Urano': '♅', 'Netuno': '♆', 'Plutão': '♇',
  'Ascendente': 'ASC', 'MC': 'MC'
};

const ELEMENT_COLORS: Record<string, string> = {
  'fogo': '#ef4444', // Red
  'terra': '#10b981', // Emerald
  'ar': '#facc15',   // Yellow
  'agua': '#3b82f6'  // Blue
};

export const NatalChart: React.FC<Props> = ({ mapa, width = 400, height = 400 }) => {
  const center = width / 2;
  const radius = (Math.min(width, height) / 2) - 20;
  
  // O Ascendente define o "Horizonte Leste" (9 horas / 180 graus no SVG standard trigonométrico)
  // No SVG: 0 graus é 3 horas (Direita). 
  // Queremos que o Ascendente fique em 180 (Esquerda).
  // Rotation Offset = 180 - Ascendant_Longitude.
  const rotationOffset = 180 - mapa.ascendente.longitude;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Função helper para calcular posição XY baseada em ângulo
  const getPos = (deg: number, r: number) => {
    // Aplica rotação do mapa para alinhar ASC à esquerda
    const adjustedDeg = deg + rotationOffset;
    const rad = toRad(adjustedDeg);
    // SVG coords: Y é invertido? Não, mas 0 é direita. Clockwise em SVG é positivo.
    // Zodíaco é Counter-Clockwise (Anti-horário).
    // Então ângulo final = -adjustedDeg
    const finalRad = toRad(-adjustedDeg); 
    
    return {
      x: center + r * Math.cos(finalRad),
      y: center + r * Math.sin(finalRad)
    };
  };

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="select-none">
      <defs>
        <filter id="glow-chart" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. ANEL ZODIACAL (Fundo) */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#1e293b" strokeWidth="1" />
      <circle cx={center} cy={center} r={radius * 0.85} fill="none" stroke="#334155" strokeWidth="1" />

      {/* Segmentos dos Signos */}
      {Object.keys(ZODIAC_SYMBOLS).map((_, i) => {
        // Cada signo tem 30 graus. Começa em 0 (Áries).
        const startAngle = i * 30;
        const p1 = getPos(startAngle, radius);
        const p2 = getPos(startAngle, radius * 0.85); // Linha interna
        
        // Símbolo no meio do signo
        const midAngle = startAngle + 15;
        const pSymbol = getPos(midAngle, radius * 0.925);
        
        // Cor do elemento
        const elementsSequence = ['fogo', 'terra', 'ar', 'agua'];
        const elColor = ELEMENT_COLORS[elementsSequence[i % 4]];

        return (
          <g key={i}>
            <line x1={center} y1={center} x2={p1.x} y2={p1.y} stroke="#1e293b" strokeWidth="1" opacity="0.5" />
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={elColor} strokeWidth="2" opacity="0.8" />
            <text 
              x={pSymbol.x} 
              y={pSymbol.y} 
              fill={elColor} 
              fontSize="14" 
              fontWeight="bold"
              textAnchor="middle" 
              dominantBaseline="middle"
              transform={`rotate(0, ${pSymbol.x}, ${pSymbol.y})`} // No rotation for readability
            >
              {ZODIAC_SYMBOLS[Object.keys(ZODIAC_SYMBOLS)[i] as SignoZodiacal]}
            </text>
          </g>
        );
      })}

      {/* 2. CÚSPIDES DAS CASAS */}
      {mapa.casas.map((cuspide, i) => {
        const pOuter = getPos(cuspide, radius * 0.85);
        const pInner = getPos(cuspide, radius * 0.3); // Centro vazio

        // Destaque para eixos (1-7 e 10-4)
        const isAxis = i === 0 || i === 9 || i === 3 || i === 6;
        
        return (
          <g key={`house-${i}`}>
            <line 
              x1={pInner.x} y1={pInner.y} 
              x2={pOuter.x} y2={pOuter.y} 
              stroke={isAxis ? "#94a3b8" : "#334155"} 
              strokeWidth={isAxis ? 1.5 : 0.5} 
              strokeDasharray={isAxis ? "0" : "4 2"}
            />
            {/* Número da Casa */}
            {(() => {
                // Posicionar número da casa um pouco à frente da cúspide (centro da casa aprox)
                // Cuidado com casa 12->1 que cruza 360
                const nextCusp = mapa.casas[(i + 1) % 12];
                let midCusp = (cuspide + nextCusp) / 2;
                if (nextCusp < cuspide) midCusp = (cuspide + nextCusp + 360) / 2; // Ajuste cruzamento
                
                const pHouseNum = getPos(midCusp, radius * 0.35);
                return (
                    <text 
                        x={pHouseNum.x} y={pHouseNum.y}
                        fill="#475569"
                        fontSize="8"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        {i + 1}
                    </text>
                )
            })()}
          </g>
        );
      })}

      {/* 3. PLANETAS */}
      {mapa.astros.map((astro, i) => {
        const p = getPos(astro.longitude, radius * 0.65 + (i % 2) * 15); // Stagger radius to avoid stacking overlap
        
        // Element color mapping
        const color = ELEMENT_COLORS[astro.elemento] || '#fff';

        return (
          <g key={astro.nome} className="cursor-pointer hover:opacity-80">
            {/* Linha guia até o grau exato */}
            <line 
                x1={center} y1={center} 
                x2={getPos(astro.longitude, radius * 0.85).x} 
                y2={getPos(astro.longitude, radius * 0.85).y} 
                stroke={color} 
                strokeWidth="0.5" 
                opacity="0.3" 
            />
            
            <circle cx={p.x} cy={p.y} r="8" fill="#0f172a" stroke={color} strokeWidth="1.5" />
            <text 
              x={p.x} y={p.y} 
              fill={color} 
              fontSize="10" 
              fontWeight="bold"
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              {PLANET_SYMBOLS[astro.nome] || astro.nome.substring(0, 1)}
            </text>
            
            {astro.retrogrado && (
               <text x={p.x + 8} y={p.y + 4} fontSize="7" fill="#f43f5e" fontWeight="bold">R</text>
            )}
          </g>
        );
      })}

      {/* ASC e MC Marcadores Especiais */}
      {(() => {
         const pASC = getPos(mapa.ascendente.longitude, radius * 0.95);
         const pMC = getPos(mapa.mc.longitude, radius * 0.95);
         return (
             <>
                <text x={pASC.x} y={pASC.y} fill="#fbbf24" fontWeight="bold" fontSize="10" textAnchor="middle" dominantBaseline="middle">ASC</text>
                <text x={pMC.x} y={pMC.y} fill="#fbbf24" fontWeight="bold" fontSize="10" textAnchor="middle" dominantBaseline="middle">MC</text>
             </>
         )
      })()}

      {/* Centro */}
      <circle cx={center} cy={center} r="4" fill="#fbbf24" />
    </svg>
  );
};