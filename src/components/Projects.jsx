import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import { FaGithub, FaCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { t } = useLanguage();
  const projects = t.projects;
  const isCarousel = projects.length > 3;

  return (
    <section className="min-h-screen bg-[#030712] py-32 px-6 relative overflow-hidden flex flex-col justify-center" id="projects">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-sm animate-pulse" />
              <span className="font-mono text-[10px] text-green-500 tracking-[0.4em] uppercase">
                Secure_Archives // Directory
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              {t.ui.projectsTitle} <span className="text-transparent stroke-text">{t.ui.projectsSubtitle}</span>
            </h2>
          </div>
          
          <div className="font-mono text-xs text-green-500 text-right hidden md:block">
            <p>{t.ui.totalEntries}: {projects.length.toString().padStart(2, '0')}</p>
            <p>ZYNC_STATUS: {isCarousel ? 'MANUAL_OVERRIDE' : 'GRID_VIEW'}</p>
          </div>
        </div>

        {isCarousel ? (
          <CarouselView projects={projects} t={t} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectScreen key={project.id} project={project} index={index} t={t} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2); }
      `}</style>
    </section>
  );
};

// --- CAROUSEL OPTIMIZADO (Sin Re-renders) ---
const CarouselView = ({ projects, t }) => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();
  const x = useMotionValue(0);
  const progressTextRef = useRef(null); // Ref para actualizar texto sin re-render

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [projects]);

  // Transformación directa para la barra (sin pasar por estado de React)
  const progressWidth = useTransform(x, (latestX) => {
    if (width === 0) return "0%";
    const p = Math.abs(latestX / width) * 100;
    return `${Math.min(Math.max(p, 0), 100)}%`;
  });

  // Evento para actualizar SOLO el texto del porcentaje
  useMotionValueEvent(x, "change", (latest) => {
    if (progressTextRef.current && width > 0) {
      const p = Math.abs(latest / width) * 100;
      const clamped = Math.round(Math.min(Math.max(p, 0), 100));
      progressTextRef.current.innerText = `${clamped}%`;
    }
  });

  const slide = (direction) => {
    const currentX = x.get();
    const moveAmount = 500;
    let newX = direction === 'left' ? currentX + moveAmount : currentX - moveAmount;

    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;

    animate(x, newX, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <div className="relative group/carousel">
      <div className="absolute -top-8 right-0 font-mono text-[9px] text-zinc-500 flex items-center gap-2 animate-pulse">
        <span className="hidden md:inline">&lt;&lt; DRAG_ENABLED &gt;&gt;</span>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden relative z-10">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          style={{ x }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8"
        >
          {projects.map((project, index) => (
            <div key={project.id} className="min-w-[85vw] md:min-w-[450px]">
               <ProjectScreen project={project} index={index} t={t} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* --- HUD CONTROLS --- */}
      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
        
        {/* Barra de Progreso Estilo Tech */}
        <div className="flex flex-col gap-1 w-1/3">
          <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
            <span>Scroll_X</span>
            {/* Actualización directa al DOM vía ref */}
            <span ref={progressTextRef}>0%</span>
          </div>
          <div className="h-[2px] w-full bg-zinc-900 relative overflow-hidden">
             {/* Binding directo de MotionValue al estilo */}
             <motion.div 
               className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_cyan]"
               style={{ width: progressWidth }} 
             />
          </div>
        </div>

        <div className="flex items-center gap-4">
        <button 
            onClick={() => slide('left')}
            className="group relative px-4 py-2 border border-white/10 bg-zinc-900/50 hover:bg-cyan-900/20 hover:border-cyan-500/50 transition-all active:scale-95"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 group-hover:text-cyan-400">
              <FaChevronLeft />
              {/* CAMBIO AQUÍ: Usamos t.ui.prevSection */}
              <span className="hidden md:inline">{t.ui.prevSection}</span>
            </div>
            <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-zinc-500 group-hover:border-cyan-400 transition-colors" />
            <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-zinc-500 group-hover:border-cyan-400 transition-colors" />
          </button>

          <button 
            onClick={() => slide('right')}
            className="group relative px-4 py-2 border border-white/10 bg-zinc-900/50 hover:bg-cyan-900/20 hover:border-cyan-500/50 transition-all active:scale-95"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 group-hover:text-cyan-400">
              {/* CAMBIO AQUÍ: Usamos t.ui.nextSection */}
              <span className="hidden md:inline">{t.ui.nextSection}</span>
              <FaChevronRight />
            </div>
            <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-zinc-500 group-hover:border-cyan-400 transition-colors" />
            <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-zinc-500 group-hover:border-cyan-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ... ProjectScreen se mantiene igual ...
const ProjectScreen = ({ project, index, t }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] w-full rounded-md bg-zinc-900 border border-white/10 overflow-hidden flex flex-col select-none"
    >
      <div className="h-8 bg-zinc-950 border-b border-white/5 flex items-center justify-between px-3 z-20 relative">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
             <div className="w-2 h-2 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
           </div>
           <span className="ml-2 font-mono text-[9px] text-zinc-600 uppercase tracking-widest group-hover:text-green-500/70 transition-colors">
             {project.subtitle}
           </span>
        </div>
        <div className="font-mono text-[9px] text-green-500/60">ID: {String(project.id).padStart(3, '0')}</div>
      </div>

      <div className="relative flex-grow overflow-hidden bg-black">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'grayscale(0%) contrast(100%)' : 'grayscale(100%) contrast(120%) brightness(50%) sepia(20%) hue-rotate(180deg)'
          }}
        />

        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
           <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-all duration-500" 
               style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20%)' }} />

          <div className="relative z-30 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
               <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                 {project.description}
               </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5 pointer-events-auto"
               >
                 <FaGithub /> {t.ui.accessRepo}
               </a>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-30">
          <div className={`flex items-center gap-2 px-2 py-1 rounded-sm border backdrop-blur-md transition-colors ${
            isHovered ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-black/40 border-white/10 text-zinc-500'
          }`}>
            <FaCircle size={6} className={isHovered ? 'animate-pulse' : ''} />
            <span className="text-[9px] font-mono uppercase tracking-wider">{project.status}</span>
          </div>
        </div>

      </div>

      <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden">
         <div className={`absolute inset-0 bg-cyan-500 transition-transform duration-500 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`} />
      </div>
    </motion.div>
  );
};