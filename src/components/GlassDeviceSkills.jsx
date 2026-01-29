import React, { useState, useMemo } from 'react';
import { FaReact, FaServer, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';
import { skills as skillsData } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

const iconMap = { FaReact, FaServer, FaPalette, FaRocket, FaCogs };

const categoryColors = {
  "Frontend": "cyan",
  "Backend": "yellow",
  "UX/UI": "red",
  "DevOps": "blue",
  "Tooling": "violet"
};

export const GlassDeviceSkills = () => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);

  const selectedSkill = useMemo(
    () => skillsData.find(s => s.category === selectedId),
    [selectedId]
  );

  const hudText = {
    systemCore: language === 'es' ? 'Núcleo_Sistema // Módulos_v2.0' : 'System_Core // Modules_v2.0',
    protocol: language === 'es' ? 'Protocolo_v4.2 // Cargando_Recursos' : 'Protocol_v4.2 // Loading_Assets',
    dataStream: language === 'es' ? 'Flujo_Datos' : 'Data_Stream',
    ready: language === 'es' ? 'LISTO_' : 'READY_',
    close: language === 'es' ? '[ Cerrar_X ]' : '[ Close_X ]',
  };

  const currentCategoryColor = selectedId ? categoryColors[selectedId] : "cyan";

  return (
    <section className="py-32 px-6 min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center">
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="mb-32 relative inline-block">
          <div className="flex items-center gap-3 mb-4 animate-fadeInLeft">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-green-500/60 uppercase">
              {hudText.systemCore}
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
             {language === 'es' ? (
                <>STACK <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>TECNO</span></>
             ) : (
                <>TECH <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>STACK</span></>
             )}
          </h2>
          <div className="relative mt-6">
            <div className="h-[2px] bg-white/10 relative overflow-hidden animate-expandWidth">
              <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanLine" />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-end gap-10 flex-wrap pt-16">
          {skillsData.map((skill, index) => (
            <div
              key={skill.category}
              onClick={() => setSelectedId(skill.category)}
              className={`relative w-40 h-60 cursor-pointer group transition-all duration-300 ${selectedId === skill.category ? 'animate-scaleOut' : 'animate-fadeInUp'}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <GlassDeviceVisual 
                category={skill.category} 
                iconName={skill.iconName} 
                color={categoryColors[skill.category]}
                hidden={selectedId === skill.category} 
              />
              
              {!selectedId && (
                <div 
                  className="absolute top-full left-0 w-full h-full pointer-events-none"
                  style={{ 
                    transform: 'scaleY(-1)', 
                    maskImage: 'linear-gradient(to top, black 0%, transparent 30%)', 
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 30%)', 
                    opacity: 0.5 
                  }}
                >
                  <GlassDeviceVisual 
                    category={skill.category} 
                    iconName={skill.iconName}
                    color={categoryColors[skill.category]}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedId(null)} />

          <div className="relative w-full max-w-5xl aspect-video bg-[#0a0c14]/90 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl flex overflow-hidden animate-modalScale">
            
            <div className={`w-1/2 flex flex-col items-center justify-center p-12 border-r border-white/5 relative overflow-hidden group/hud`}>
              <div className={`absolute inset-0 opacity-10 bg-${currentCategoryColor}-500`} />
              
              <div className={`absolute left-0 w-full h-[2px] z-20 bg-${currentCategoryColor}-400 shadow-[0_0_15px_currentColor] animate-scanVerticalOnce`} />
              
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[7px] text-green-500/40 uppercase [writing-mode:vertical-lr] tracking-[1em]">
                {hudText.protocol}
              </div>

              <div className="relative animate-glitchEntry">
                <div className={`absolute inset-0 blur-3xl opacity-30 bg-${currentCategoryColor}-500 animate-pulse`} />
                {iconMap[selectedSkill.iconName] &&
                  React.createElement(iconMap[selectedSkill.iconName], {
                    className: `w-24 h-24 text-${currentCategoryColor}-400 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`,
                  })}
              </div>
              
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter relative z-10 animate-slideUpFade">
                {selectedSkill.category}
              </h3>
            </div>

            <div className="w-1/2 p-12 flex flex-col justify-center gap-4 bg-[#0a0c14]/50">
              <span className="font-mono text-[9px] text-green-500/60 tracking-[0.4em] mb-4 uppercase">
                {hudText.dataStream} // {selectedSkill.category}
              </span>
              {selectedSkill.items.map((item, i) => (
                <div
                  key={item}
                  className={`flex justify-between border-b border-white/5 pb-2 hover:border-${currentCategoryColor}-500/30 transition-colors group/item animate-slideInRight`}
                  style={{ animationDelay: `${200 + (i * 100)}ms` }}
                >
                  <span className="text-zinc-200 group-hover/item:text-white transition-colors">{item}</span>
                  <span className={`text-green-500/50 font-mono text-[10px] self-end italic`}>{hudText.ready}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
                {hudText.close}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px #22c55e; } 50% { box-shadow: 0 0 20px #22c55e; } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes expandWidth { from { width: 0; } to { width: 100%; } }
        @keyframes scanLine { from { left: -100%; } to { left: 100%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleOut { to { opacity: 0; transform: scale(0.95); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scanVerticalOnce { 0% { top: -5%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: 105%; opacity: 0; } }
        @keyframes glitchEntry { 0% { opacity: 0; transform: scale(1.1); filter: brightness(2); } 10% { opacity: 0.5; transform: scale(0.98); } 20% { opacity: 1; transform: scale(1.02); filter: brightness(1); } 30% { transform: scale(1); } }
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .animate-scanVerticalOnce { animation: scanVerticalOnce 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
        .animate-glitchEntry { animation: glitchEntry 0.6s ease-out forwards; }
        .animate-slideUpFade { animation: slideUpFade 0.6s ease-out 0.4s both; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-expandWidth { animation: expandWidth 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-scanLine { animation: scanLine 2.5s linear infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; animation-fill-mode: both; }
        .animate-scaleOut { animation: scaleOut 0.3s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-modalScale { animation: modalScale 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; animation-fill-mode: both; }
      `}</style>
    </section>
  );
};

const GlassDeviceVisual = ({ category, iconName, color = "cyan", hidden }) => {
  const Icon = iconMap[iconName];
  
  const colorStyles = {
    cyan: "group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 text-cyan-400 shadow-cyan-500/20",
    yellow: "group-hover:border-yellow-500/50 group-hover:bg-yellow-500/5 text-yellow-400 shadow-yellow-500/20",
    red: "group-hover:border-red-500/50 group-hover:bg-red-500/5 text-red-400 shadow-red-500/20",
    blue: "group-hover:border-blue-500/50 group-hover:bg-blue-500/5 text-blue-400 shadow-blue-500/20",
    violet: "group-hover:border-violet-500/50 group-hover:bg-violet-500/5 text-violet-400 shadow-violet-500/20"
  };

  const activeStyle = colorStyles[color] || colorStyles.cyan;

  return (
    <div className={`w-full h-full rounded-lg border border-white/10 bg-zinc-900/30 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden ${hidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${activeStyle} transition-all duration-300 ease-out`} style={{ willChange: 'transform' }}>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10 mb-4">
        <div className={`absolute inset-0 blur-xl opacity-20 bg-current`} />
        {Icon && <Icon className="w-10 h-10 relative z-10 transition-transform duration-300 group-hover:scale-110" />}
      </div>
      <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase text-center relative z-10">{category}</span>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-current opacity-40 shadow-[0_0_10px_currentColor] group-hover:opacity-100 transition-all duration-300`} />
    </div>
  );
};