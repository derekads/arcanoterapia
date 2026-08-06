
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Baby, Briefcase, Crown, Heart, AlertTriangle, CheckCircle2, Unlock } from 'lucide-react';
import { UserBirthData, ArcanoAdvanced } from '../../types';

interface Props {
  userData?: UserBirthData;
  embedded?: boolean;
  arcanoCiclos?: ArcanoAdvanced['ciclos']; // Novo prop para dados reais do arcano
}

export const TimelineView: React.FC<Props> = ({ userData, embedded = false, arcanoCiclos }) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [integratedShadows, setIntegratedShadows] = useState<Set<string>>(new Set());
  
  // Adaptador: Se arcanoCiclos existir, usa-o. Senão, usa mock.
  const timelineData = React.useMemo(() => {
    if (arcanoCiclos) {
      return {
        jovem: {
          idade: "0-20",
          titulo: "A Descoberta",
          evento: arcanoCiclos.faseJovem,
          sombra: "Inexperiência emocional",
          cura: "Permitir-se aprender",
          status: "passado"
        },
        adulta: {
          idade: "21-50",
          titulo: "A Construção",
          evento: arcanoCiclos.faseAdulta,
          sombra: arcanoCiclos.desafioAtual,
          cura: "Ação consciente e responsabilidade",
          status: "presente"
        },
        sabedoria: {
          idade: "50+",
          titulo: "O Legado",
          evento: arcanoCiclos.faseSabedoria,
          sombra: "Rigidez ou apego",
          cura: "Transcendência e partilha",
          status: "futuro"
        }
      };
    }

    // Fallback Mock Data
    return {
      jovem: {
        idade: "0-20",
        titulo: "A Semente do Todo",
        evento: "Sensação de não pertencer, busca por horizontes além da família",
        sombra: "Fuga da realidade através de sonhos excessivos",
        cura: "Enraizar sonhos em ações concretas",
        status: "passado"
      },
      adulta: {
        idade: "21-50",
        titulo: "A Conquista do Mundo",
        evento: "Viagens, conexões internacionais, sucesso profissional",
        sombra: "Arrogância espiritual e dispersão de energia",
        cura: "Humildade radical e foco no essencial",
        status: "presente"
      },
      sabedoria: {
        idade: "50+",
        titulo: "O Mentor Global",
        evento: "Mentoria, filantropia, integração total do ser",
        sombra: "Apego ao legado e medo da irrelevância",
        cura: "Desapego consciente e entrega ao fluxo",
        status: "futuro"
      }
    };
  }, [arcanoCiclos]);

  // Load persistence (simple key based on name)
  useEffect(() => {
    if (userData?.nome) {
      const saved = localStorage.getItem(`shadowProgress_${userData.nome}`);
      if (saved) {
        setIntegratedShadows(new Set(JSON.parse(saved)));
      }
    }
  }, [userData]);

  // Mock shadows if not provided (keeping layout consistent)
  const shadowsData = [
    {
      id: "sombra1",
      titulo: "Sombra Primária",
      manifestacao: "Padrões repetitivos de comportamento",
      gatilho: "Situações de estresse",
      integracao: "Observação sem julgamento"
    },
    {
      id: "sombra2",
      titulo: "Resistência ao Fluxo",
      manifestacao: "Tentativa de controle excessivo",
      gatilho: "Mudanças imprevistas",
      integracao: "Aceitação da impermanência"
    },
    {
      id: "sombra3",
      titulo: "Negação do Potencial",
      manifestacao: "Procrastinação e auto-sabotagem",
      gatilho: "Oportunidades de crescimento",
      integracao: "Ação compassiva"
    }
  ];

  const handleIntegrate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(integratedShadows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setIntegratedShadows(newSet);
    if (userData?.nome) {
      localStorage.setItem(`shadowProgress_${userData.nome}`, JSON.stringify([...newSet]));
    }
  };

  return (
    <div className={`${embedded ? '' : 'min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 p-6 md:p-12 overflow-y-auto custom-scrollbar'} text-white`}>
      
      {!embedded && (
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-amber-300 mb-2">
            A Estrada de {userData?.nome || 'Você'}
          </h1>
          <p className="text-white/50 text-lg">
            Ciclo atual: <span className="text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Maturidade (4º Setênio)</span>
          </p>
        </div>
      )}

      {embedded && (
         <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-2">Linha do Tempo Arquetípica</h2>
            <p className="text-white/40">Os ciclos de manifestação do seu arcano na matéria</p>
         </div>
      )}

      {/* --- TIMELINE VERTICAL --- */}
      <div className="max-w-3xl mx-auto relative mb-24">
        {/* Central Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-800 via-amber-500/50 to-slate-800 md:-translate-x-1/2 rounded-full" />

        <div className="space-y-16">
          {/* FASE JOVEM */}
          <TimelineNode 
            data={timelineData.jovem} 
            align="left" 
            icon={<Baby size={20} />}
          />

          {/* FASE ADULTA (ACTIVE) */}
          <TimelineNode 
            data={timelineData.adulta} 
            align="right" 
            icon={<Briefcase size={20} />}
            isActive
          />

          {/* FASE SABEDORIA */}
          <TimelineNode 
            data={timelineData.sabedoria} 
            align="left" 
            icon={<Crown size={20} />}
          />
        </div>
      </div>

      {/* --- SOMBRAS DO ARCANO (FLIP CARDS) --- */}
      {!embedded && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
            <AlertTriangle className="text-red-400" /> Sombras do Arcano
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shadowsData.map((shadow) => {
              const isFlipped = flippedCard === shadow.id;
              const isIntegrated = integratedShadows.has(shadow.id);

              return (
                <div 
                  key={shadow.id} 
                  className="h-96 w-full perspective-1000 cursor-pointer group"
                  onClick={() => setFlippedCard(isFlipped ? null : shadow.id)}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    className="w-full h-full relative preserve-3d shadow-2xl"
                  >
                    {/* FRONT (Red - Shadow) */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/30 rounded-2xl p-6 flex flex-col items-center justify-between hover:border-red-500/50 transition-colors">
                      <div className="w-full flex justify-between items-start">
                        <div className="p-3 rounded-full bg-red-500/10 text-red-400">
                          <AlertTriangle size={24} />
                        </div>
                        {isIntegrated && (
                          <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/30">
                            Integrado
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-3">{shadow.titulo}</h3>
                        <p className="text-sm text-red-200/70 mb-4 italic">"{shadow.manifestacao}"</p>
                        
                        <div className="text-xs text-white/40 bg-black/20 p-3 rounded-lg border border-white/5">
                          <span className="text-red-400 font-bold uppercase block mb-1">Gatilho:</span>
                          {shadow.gatilho}
                        </div>
                      </div>

                      <button className="w-full py-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-xs uppercase font-bold hover:bg-red-500/20 transition-colors">
                        Revelar Cura
                      </button>
                    </div>

                    {/* BACK (Emerald - Cure) */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center justify-between rotate-y-180">
                      <div className="w-full flex justify-center">
                        <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                          <Heart size={24} />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-emerald-100 mb-2">Integração</h3>
                        <p className="text-sm text-emerald-200/70 leading-relaxed">
                          {shadow.integracao}
                        </p>
                      </div>

                      <button 
                        onClick={(e) => handleIntegrate(shadow.id, e)}
                        className={`w-full py-3 rounded-lg text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all ${
                          isIntegrated 
                            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                            : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                        }`}
                      >
                        {isIntegrated ? (
                          <><CheckCircle2 size={14} /> Sombra Integrada</>
                        ) : (
                          <><Unlock size={14} /> Marcar como Integrado</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for Timeline Nodes
const TimelineNode = ({ data, align, icon, isActive = false }: any) => {
  const isRight = align === 'right';
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 ${isRight ? 'md:flex-row-reverse' : ''}`}>
      {/* Connector Dot */}
      <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full -translate-x-[14px] md:-translate-x-1/2 z-10 flex items-center justify-center border-4 shadow-xl ${
        isActive 
          ? 'bg-amber-500 border-amber-900 shadow-amber-500/40 animate-pulse' 
          : 'bg-slate-800 border-slate-700'
      }`}>
        {isActive && <div className="w-2 h-2 bg-white rounded-full animate-ping" />}
      </div>

      {/* Content Card */}
      <div className={`ml-12 md:ml-0 md:w-1/2 w-full ${isRight ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-6 rounded-2xl border backdrop-blur-md relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${
            isActive 
              ? 'bg-amber-950/30 border-amber-500/30 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)]' 
              : 'bg-slate-900/40 border-white/5'
          }`}
        >
          {isActive && (
            <div className="absolute top-0 right-0 p-2">
               <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
            </div>
          )}

          <div className={`flex items-center gap-2 mb-2 ${isRight ? 'md:flex-row-reverse' : ''}`}>
            <span className={`p-2 rounded-lg ${isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-gray-400'}`}>
              {icon}
            </span>
            <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-amber-400' : 'text-gray-500'}`}>
              {data.idade} Anos
            </span>
          </div>
          
          <h3 className={`text-xl font-serif font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
            {data.titulo}
          </h3>
          
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            {data.evento}
          </p>

          <div className={`text-xs p-3 rounded-lg border flex flex-col gap-1 ${
             isActive ? 'bg-black/30 border-amber-500/10' : 'bg-black/20 border-white/5'
          }`}>
             <div className="flex justify-between">
                <span className="text-red-400 font-bold">Sombra:</span>
                <span className="text-gray-400 text-right">{data.sombra}</span>
             </div>
             <div className="w-full h-[1px] bg-white/5 my-1" />
             <div className="flex justify-between">
                <span className="text-emerald-400 font-bold">Cura:</span>
                <span className="text-gray-400 text-right">{data.cura}</span>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Spacer for Grid Layout */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};
