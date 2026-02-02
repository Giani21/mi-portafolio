import React, { useState, useMemo } from 'react';
import { FaReact, FaServer, FaPalette, FaRocket, FaCogs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

const categoryDescriptions = {
  es: {
    "Frontend": "Lo que tus clientes ven y tocan. Me encargo de que tu web sea linda, rápida y funcione perfecto en celulares.",
    "Backend": "El cerebro de la web. Manejo la seguridad, las bases de datos y que todo el sistema interno funcione sin errores.",
    "UX/UI": "El diseño inteligente. Planifico cómo debe verse y sentirse la web para que sea fácil de usar para cualquier persona.",
    "DevOps": "La nube y el lanzamiento. Organizo las herramientas necesarias para que tu página esté siempre online y actualizada.",
    "Tooling": "Mis herramientas de trabajo. Uso software de última generación para asegurar que el código sea de máxima calidad."
  },
  en: {
    "Frontend": "What your customers see and touch. I make sure your site is beautiful, fast, and works perfectly on mobile phones.",
    "Backend": "The brain of the website. I handle security, databases, and ensure all internal systems run without errors.",
    "UX/UI": "Smart design. I plan how the site should look and feel so it's easy for anyone to use.",
    "DevOps": "Cloud and deployment. I organize the tools needed to keep your site always online and up to date.",
    "Tooling": "My workspace. I use cutting-edge software to ensure the code is of the highest quality."
  }
};

export const GlassDeviceSkills = () => {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const selectedSkill = useMemo(
    () => skillsData.find(s => s.category === selectedId),
    [selectedId]
  );

  const hudText = {
    systemCore: language === 'es' ? 'Núcleo_Sistema // v2.0' : 'System_Core // v2.0',
    dataStream: language === 'es' ? 'Flujo_Datos' : 'Data_Stream',
    ready: language === 'es' ? 'LISTO_' : 'READY_',
    close: language === 'es' ? '[ Cerrar ]' : '[ Close ]',
    expand: language === 'es' ? '[ TOCAR PARA DETALLES ]' : '[ TAP FOR DETAILS ]'
  };

  // Objeto para mapear clases de Tailwind dinámicas (evita que se rompa el purgado)
  const bgClasses = {
    cyan: "bg-cyan-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500"
  };

  const borderClasses = {
    cyan: "bg-cyan-400",
    yellow: "bg-yellow-400",
    red: "bg-red-400",
    blue: "bg-blue-400",
    violet: "bg-violet-400"
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % skillsData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + skillsData.length) % skillsData.length);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center" id="stack">
      <div className="absolute inset-0 opacity-[0.03] sm:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-32 relative">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fadeInLeft">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse-glow" />
            <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] text-green-500/60 uppercase">
              {hudText.systemCore}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
            {t.ui.stackTitle}{' '}
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
              {t.ui.stackSubtitle}
            </span>
          </h2>
          <div className="h-[2px] bg-white/10 mt-4 relative overflow-hidden animate-expandWidth">
            <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanLine" />
          </div>
        </div>

        {/* Carrusel Móvil */}
        <div className="sm:hidden relative pb-8">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {skillsData.map((skill) => (
                <div key={skill.category} className="w-full flex-shrink-0 px-4">
                  <div onClick={() => setSelectedId(skill.category)} className="w-full max-w-xs mx-auto">
                    <GlassDeviceVisual category={skill.category} iconName={skill.iconName} color={categoryColors[skill.category]} mobile={true} tapText={hudText.expand} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center border border-white/10 bg-zinc-900/50 rounded-full"><FaChevronLeft className="text-green-400" /></button>
            <div className="flex gap-2">
              {skillsData.map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-green-400 w-6' : 'bg-white/20'}`} />))}
            </div>
            <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center border border-white/10 bg-zinc-900/50 rounded-full"><FaChevronRight className="text-green-400" /></button>
          </div>
        </div>

        {/* Tablet Grid */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto pb-12">
          {skillsData.map((skill, index) => (
            <div key={skill.category} onClick={() => setSelectedId(skill.category)} className="animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
              <GlassDeviceVisual category={skill.category} iconName={skill.iconName} color={categoryColors[skill.category]} tablet={true} tapText={hudText.expand} />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:flex justify-center items-end gap-8 xl:gap-10 flex-wrap pt-16">
          {skillsData.map((skill, index) => (
            <div key={skill.category} onClick={() => setSelectedId(skill.category)} className="relative w-40 h-60 cursor-pointer group animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
              <GlassDeviceVisual category={skill.category} iconName={skill.iconName} color={categoryColors[skill.category]} tapText={hudText.expand} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Corregido */}
      {selectedId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedId(null)} />
          <div className="relative w-full max-w-4xl bg-[#0a0c14] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-modalScale max-h-[90vh]">
            
            {/* LADO IZQUIERDO: Dinámico por categoría */}
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
              {/* FONDO DINÁMICO ARREGLADO */}
              <div className={`absolute inset-0 opacity-10 ${bgClasses[categoryColors[selectedId]]}`} />
              <div className={`absolute left-0 w-full h-[2px] z-20 ${borderClasses[categoryColors[selectedId]]} shadow-[0_0_15px_currentColor] animate-scanVerticalOnce`} />
              
              <div className="relative z-10 text-center">
                {iconMap[selectedSkill.iconName] && React.createElement(iconMap[selectedSkill.iconName], {
                    className: `w-16 h-16 sm:w-20 text-${categoryColors[selectedId]}-400 mb-6 mx-auto`,
                })}
                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase italic mb-4">{selectedSkill.category}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-xs mx-auto">
                  {categoryDescriptions[language][selectedId]}
                </p>
              </div>
            </div>

            {/* LADO DERECHO: Lista */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-4 bg-[#0d111a]">
              <span className="font-mono text-[10px] text-green-500/60 tracking-widest uppercase mb-2">
                {hudText.dataStream} // {selectedId}
              </span>
              {selectedSkill.items.map((item, i) => (
                <div key={item} className="flex justify-between border-b border-white/5 pb-2 animate-slideInRight" style={{ animationDelay: `${200 + (i * 100)}ms` }}>
                  <span className="text-zinc-200 text-sm">{item}</span>
                  <span className="text-green-500/50 font-mono text-[10px] italic">{hudText.ready}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-white/30 hover:text-white font-mono text-[10px] uppercase">
              {hudText.close}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px #22c55e; } 50% { box-shadow: 0 0 20px #22c55e; } }
        @keyframes scanLine { from { left: -100%; } to { left: 100%; } }
        @keyframes scanVerticalOnce { 0% { top: -5%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: 105%; opacity: 0; } }
        @keyframes expandWidth { from { width: 0; } to { width: 100%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalScale { from { opacity: 0; transform: scale(0.98) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        
        .animate-scanVerticalOnce { animation: scanVerticalOnce 2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-scanLine { animation: scanLine 3s linear infinite; }
        .animate-expandWidth { animation: expandWidth 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; animation-fill-mode: both; }
        .animate-modalScale { animation: modalScale 0.4s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; animation-fill-mode: both; }
      `}</style>
    </section>
  );
};

const GlassDeviceVisual = ({ category, iconName, color = "cyan", mobile, tablet, tapText }) => {
  const Icon = iconMap[iconName];
  const colorStyles = {
    cyan: "hover:border-cyan-500/50 text-cyan-400",
    yellow: "hover:border-yellow-500/50 text-yellow-400",
    red: "hover:border-red-500/50 text-red-400",
    blue: "hover:border-blue-500/50 text-blue-400",
    violet: "hover:border-violet-500/50 text-violet-400"
  };

  const sizeClasses = mobile ? "h-56" : tablet ? "h-64" : "w-full h-full";

  return (
    <div className={`${sizeClasses} rounded-lg border border-white/10 bg-zinc-900/40 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden transition-all duration-300 cursor-pointer ${colorStyles[color]} group`}>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10 mb-3 group-hover:scale-110 transition-transform">
        {Icon && <Icon className={`${mobile || tablet ? 'w-12' : 'w-10'} h-auto`} />}
      </div>
      <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase mb-4">{category}</span>
      
      {/* INDICADOR FIJO Y VISIBLE */}
      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter opacity-70 group-hover:text-white transition-colors">
        {tapText}
      </span>

      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-current opacity-40 group-hover:opacity-100 shadow-[0_0_10px_currentColor]`} />
    </div>
  );
};