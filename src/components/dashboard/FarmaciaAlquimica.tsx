import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gem, Leaf, Play, Pause, Waves, Sparkles } from 'lucide-react';
import { ArcanoAdvanced } from '../../types';

interface Props {
  alquimia: ArcanoAdvanced['alquimia'];
}

export const FarmaciaAlquimica: React.FC<Props> = ({ alquimia }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Real Audio Visualization State
  const [bars, setBars] = useState<number[]>(Array(12).fill(4));

  useEffect(() => {
    return () => stopAudio(); // Cleanup on unmount
  }, []);

  const startAudio = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.1; // Volume baixo para conforto
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Analyser for UI
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      masterGain.connect(analyser); // Connect gain to analyser (but gain is already connected to dest)
      // Actually: Oscillators -> Gain -> Analyser -> Destination
      // Let's re-route: Osc -> Gain -> Analyser -> Destination isn't strictly necessary for analyser to see volume, 
      // but usually: Source -> Gain -> Destination. And Source -> Analyser for visuals.
      // Better: Source -> Gain -> Analyser -> Destination.

      masterGain.disconnect();
      masterGain.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;

      // Binaural Strategy:
      // Left Ear: Base Frequency
      // Right Ear: Base Frequency + Target Beat (Gamma/Theta/Alpha)
      // Arcano frequencies are usuallly high (e.g. 528Hz). Binaural beat requires headphones.
      // Let's create a gentle beat of 5Hz (Theta) by detuning.

      const freq = alquimia.frequenciaHz;

      const oscl = ctx.createOscillator();
      oscl.type = 'sine';
      oscl.frequency.value = freq;
      const panL = ctx.createStereoPanner();
      panL.pan.value = -1;
      oscl.connect(panL).connect(masterGain);

      const oscr = ctx.createOscillator();
      oscr.type = 'sine';
      oscr.frequency.value = freq + 5; // 5Hz beat
      const panR = ctx.createStereoPanner();
      panR.pan.value = 1;
      oscr.connect(panR).connect(masterGain);

      oscl.start();
      oscr.start();

      oscillatorsRef.current = [oscl, oscr];
      setIsPlaying(true);
      animateBars();

    } catch (e) {
      console.error("Audio API error", e);
    }
  };

  const stopAudio = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) { }
    });
    oscillatorsRef.current = [];
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setIsPlaying(false);
    setBars(Array(12).fill(4));
  };

  const animateBars = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);

      // Select 12 evenly spaced bands
      const newBars = [];
      const step = Math.floor(bufferLength / 12);
      for (let i = 0; i < 12; i++) {
        const val = dataArray[i * step];
        newBars.push(Math.max(4, val / 6)); // Scale down to generic height
      }
      setBars(newBars);
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };
    renderFrame();
  };

  const toggleAudio = () => {
    if (isPlaying) stopAudio();
    else startAudio();
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col group relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] group-hover:bg-green-500/20 transition-colors" />

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <Gem className="text-emerald-400" size={20} />
        <h3 className="text-white font-serif text-lg">Alquimia das Plantas e Frequências</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        {/* Crystal */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-purple-900/30 mb-3 flex items-center justify-center border border-purple-500/30">
            <Gem size={20} className="text-purple-300" />
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Cristal de Poder</span>
          <span className="text-white font-serif font-bold text-sm">{alquimia.cristal}</span>
        </div>

        {/* Herb */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-full bg-green-900/30 mb-3 flex items-center justify-center border border-green-500/30">
            <Leaf size={20} className="text-green-400" />
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Erva de Cura</span>
          <span className="text-white font-serif font-bold text-sm">{alquimia.erva}</span>
        </div>
      </div>

      {/* Frequency Player (Mock) */}
      <div className="mt-auto bg-gradient-to-r from-deep-purple to-indigo-900 rounded-xl p-4 relative overflow-hidden border border-white/10 shadow-lg">

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-neon-cyan mb-1">
              <Waves size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Frequência Binaural</span>
            </div>
            <div className="text-2xl font-serif text-white font-bold">{alquimia.frequenciaHz} <span className="text-sm font-sans font-normal opacity-70">Hz</span></div>
          </div>

          <button
            onClick={toggleAudio}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
          </button>
        </div>

        {/* Visualizer Animation */}
        <div className="flex items-end justify-center gap-1 h-8 mt-2 opacity-50">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              animate={{ height }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-1.5 bg-neon-cyan rounded-t-full"
            />
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-mystic-gold/5 rounded-lg border border-mystic-gold/10 text-center">
        <Sparkles size={12} className="text-mystic-gold inline-block mb-1" />
        <p className="text-xs text-mystic-gold/80 italic">"{alquimia.mantra}"</p>
      </div>
    </div>
  );
};