import React from 'react';

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050510]">
      {/* Base Deep Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#0f172a] to-black opacity-80"></div>

      {/* Nebula Layers */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/30 blur-[120px] animate-nebula" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-900/20 blur-[120px] animate-nebula" style={{ animationDuration: '25s', animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-mystic-gold/5 blur-[100px] animate-pulse-slow"></div>

      {/* Texture Overlay (Noise) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      {/* Sacred Geometry Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/binding-dark.png')`,
          backgroundSize: 'auto'
        }}
      ></div>

      {/* Stars */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
    </div>
  );
};

export default StarryBackground;