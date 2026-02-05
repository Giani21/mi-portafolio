import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { t } = useLanguage();
  const projects = t.projects;
  const isCarousel = projects.length > 3;

  return (
    <section className="min-h-screen bg-slate-900 py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center" id="projects">
      {/* Gradientes de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#60a5fa 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight mb-4">
            {t.ui.projectsTitle}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.ui.projectsSubtitle}
          </p>
        </motion.div>

        {isCarousel ? (
          <CarouselView projects={projects} t={t} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CarouselView = ({ projects, t }) => {
  const carouselRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Función para manejar el scroll y actualizar la barra de progreso
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      // Evitar división por cero
      if (maxScroll > 0) {
        const p = (scrollLeft / maxScroll) * 100;
        setCurrentProgress(Math.min(Math.max(p, 0), 100));
      }
    }
  };

  const slide = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 340 : 500; // Ajustado al tamaño de las tarjetas aprox
      const targetScroll = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Contenedor con Scroll Nativo pero barra oculta */}
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="overflow-x-auto flex gap-6 md:gap-8 pb-8 px-4 -mx-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="min-w-[85vw] xs:min-w-[80vw] sm:min-w-[70vw] md:min-w-[450px] shrink-0 snap-center first:pl-2 last:pr-2"
          >
            <ProjectCard project={project} index={index} t={t} />
          </div>
        ))}
      </div>

      {/* Controles */}
      <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Barra de progreso */}
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>{Math.round(currentProgress)}%</span>
            <span>{projects.length} {t.ui.totalEntries || 'proyectos'}</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              // Usamos animate aquí para que el movimiento de la barra sea suave aunque el scroll sea rápido
              animate={{ width: `${currentProgress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 justify-center sm:justify-end">
          <button 
            onClick={() => slide('left')}
            className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 hover:border-blue-500/30 transition-all text-slate-300 hover:text-slate-100 flex items-center gap-2 active:scale-95"
          >
            <FaChevronLeft className="text-sm" />
            <span className="hidden md:inline text-sm font-medium">Anterior</span>
          </button>

          <button 
            onClick={() => slide('right')}
            className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 hover:border-blue-500/30 transition-all text-slate-300 hover:text-slate-100 flex items-center gap-2 active:scale-95"
          >
            <span className="hidden md:inline text-sm font-medium">Siguiente</span>
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, t }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] sm:h-[450px] w-full rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden flex flex-col backdrop-blur-sm hover:border-slate-600/50 transition-all"
    >
      {/* Imagen */}
      <div className="relative flex-grow overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay oscuro */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20 transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />

        {/* Badge de status */}
        <div className="absolute top-4 right-4 z-30">
          <div className={`px-3 py-1.5 rounded-full backdrop-blur-md transition-all border ${
            isHovered 
              ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
              : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider">{project.status}</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <motion.div
            animate={{ y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag} 
                  className="text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Título */}
            <h3 className="text-2xl md:text-3xl font-black text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            {/* Subtítulo */}
            <p className="text-sm text-slate-400 mb-3">
              {project.subtitle}
            </p>

            {/* Descripción (solo en hover) */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? 'auto' : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
            </motion.div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors"
              >
                <FaGithub className="text-base" />
                <span className="border-b border-transparent group-hover/link:border-blue-400 transition-all">
                  {t.ui.accessRepo || 'Ver código'}
                </span>
              </a>

              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <FaExternalLinkAlt className="text-sm" />
                  <span className="border-b border-transparent group-hover/link:border-blue-400 transition-all">
                    Demo
                  </span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Borde inferior con gradiente */}
      <div className="h-1 w-full bg-slate-800 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
          animate={{ 
            x: isHovered ? 0 : '-100%' 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};