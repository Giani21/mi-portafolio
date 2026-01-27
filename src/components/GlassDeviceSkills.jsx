import React, { useState, useMemo } from 'react';
import { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';
import { skills as skillsData } from '../data/config';

const iconMap = { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs };

export const GlassDeviceSkills = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedSkill = useMemo(
    () => skillsData.find(s => s.category === selectedId),
    [selectedId]
  );

  return (
    <section className="py-32 px-6 min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center">
      {/* Fondo: Grilla y Luces */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* --- HEADER --- */}
        <div className="mb-32 relative inline-block">
          <div className="flex items-center gap-3 mb-4 animate-fadeInLeft">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse-glow" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-500/60 uppercase">
              System_Core // Modules_v2.0
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
            TECH <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>STACK</span>
          </h2>
          <div className="relative mt-6">
            <div className="h-[2px] bg-white/10 relative overflow-hidden animate-expandWidth">
              <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanLine" />
            </div>
          </div>
        </div>

        {/* --- GRID DE TABLETS --- */}
        <div className="relative flex justify-center items-end gap-10 flex-wrap pt-16">
          {skillsData.map((skill, index) => (
            <div
              key={skill.category}
              onClick={() => setSelectedId(skill.category)}
              className={`relative w-40 h-60 cursor-pointer group transition-all duration-300 ${selectedId === skill.category ? 'animate-scaleOut' : 'animate-fadeInUp'}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <GlassDeviceVisual category={skill.category} iconName={skill.iconName} hidden={selectedId === skill.category} />
              {!selectedId && (
                <div className="absolute top-[102%] left-0 w-full h-full pointer-events-none animate-floatReflection"
                  style={{ transform: 'scaleY(-1)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)', filter: 'blur(2px)', opacity: 0.7 }}>
                  <GlassDeviceVisual category={skill.category} iconName={skill.iconName} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL HUD FUTURISTA --- */}
      {selectedId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedId(null)} />

          <div className="relative w-full max-w-5xl aspect-video bg-[#0a0c14]/90 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl flex overflow-hidden animate-modalScale" style={{ willChange: 'transform, opacity' }}>
            
            {/* LADO IZQUIERDO: HUD PANEL */}
            <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-cyan-500/10 to-transparent border-r border-white/5 relative overflow-hidden group/hud">
              
              {/* Scan Vertical Láser - AHORA MÁS LENTO Y UNA SOLA VEZ */}
              <div className="absolute left-0 w-full h-[2px] z-20 bg-cyan-400/60 shadow-[0_0_15px_#22d3ee] animate-scanVerticalOnce" />
              
              {/* Esquinas de enfoque HUD */}
              <div className="absolute inset-12 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50" />
              </div>

              {/* Texto lateral vertical decorativo */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[7px] text-cyan-500/30 uppercase [writing-mode:vertical-lr] tracking-[1em]">
                Protocol_v4.2 // Loading_Assets
              </div>

              {/* Círculos de datos */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-64 h-64 border border-cyan-500/20 rounded-full animate-spin-slow" />
                <div className="absolute w-72 h-72 border border-dashed border-cyan-500/10 rounded-full animate-spin-reverse-slow" />
              </div>

              {/* Contenedor del Icono */}
              <div className="relative animate-glitchEntry">
                <div className="absolute inset-0 blur-3xl bg-cyan-500/30 animate-pulse" />
                {iconMap[selectedSkill.iconName] &&
                  React.createElement(iconMap[selectedSkill.iconName], {
                    className: 'w-24 h-24 text-cyan-400 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]',
                  })}
              </div>
              
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter relative z-10 animate-slideUpFade">
                {selectedSkill.category}
              </h3>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-white/5 overflow-hidden">
                 <div className="h-full bg-cyan-500 animate-expandWidth" style={{ animationDuration: '2s' }} />
              </div>
            </div>

            {/* LADO DERECHO */}
            <div className="w-1/2 p-12 flex flex-col justify-center gap-4 bg-[#0a0c14]/50">
              <span className="font-mono text-[9px] text-zinc-500 tracking-[0.4em] mb-4 uppercase">
                Data_Stream // {selectedSkill.category}
              </span>
              {selectedSkill.items.map((item, i) => (
                <div
                  key={item}
                  className="flex justify-between border-b border-white/5 pb-2 hover:border-cyan-500/30 transition-colors group/item animate-slideInRight"
                  style={{ animationDelay: `${200 + (i * 100)}ms` }} // Retrasado para esperar al escáner
                >
                  <span className="text-zinc-200 group-hover/item:text-white transition-colors">{item}</span>
                  <span className="text-cyan-500/40 font-mono text-[10px] self-end italic">READY_</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">[ Close_X ]</button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* --- ANIMACIONES --- */
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px #06b6d4; } 50% { box-shadow: 0 0 20px #06b6d4; } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes expandWidth { from { width: 0; } to { width: 100%; } }
        @keyframes scanLine { from { left: -100%; } to { left: 100%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleOut { to { opacity: 0; transform: scale(0.95); } }
        @keyframes floatReflection { 0%, 100% { transform: scaleY(-1) translateY(0); } 50% { transform: scaleY(-1) translateY(8px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

        /* ESCANEO VERTICAL OPTIMIZADO: Más lento y suave */
        @keyframes scanVerticalOnce { 
          0% { top: -5%; opacity: 0; } 
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 105%; opacity: 0; } 
        }

        @keyframes glitchEntry {
          0% { opacity: 0; transform: scale(1.1); filter: brightness(2); }
          10% { opacity: 0.5; transform: scale(0.98); }
          20% { opacity: 1; transform: scale(1.02); filter: brightness(1); }
          30% { transform: scale(1); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

        .animate-scanVerticalOnce { animation: scanVerticalOnce 2.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
        .animate-glitchEntry { animation: glitchEntry 0.6s ease-out forwards; }
        .animate-slideUpFade { animation: slideUpFade 0.6s ease-out 0.4s both; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 25s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-expandWidth { animation: expandWidth 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-scanLine { animation: scanLine 2.5s linear infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; animation-fill-mode: both; }
        .animate-scaleOut { animation: scaleOut 0.3s ease-out forwards; }
        .animate-floatReflection { animation: floatReflection 4s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-modalScale { animation: modalScale 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; animation-fill-mode: both; }
      `}</style>
    </section>
  );
};

const GlassDeviceVisual = ({ category, iconName, hidden }) => {
  const Icon = iconMap[iconName];
  return (
    <div className={`w-full h-full rounded-lg border border-white/10 bg-zinc-900/30 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden ${hidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition-all duration-300 ease-out`} style={{ willChange: 'transform' }}>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10 mb-4">
        <div className="absolute inset-0 blur-xl bg-cyan-500/20" />
        {Icon && <Icon className="w-10 h-10 text-cyan-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />}
      </div>
      <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase text-center relative z-10">{category}</span>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/40 shadow-[0_0_10px_#06b6d4] group-hover:bg-cyan-400 transition-colors duration-300" />
    </div>
  );
};