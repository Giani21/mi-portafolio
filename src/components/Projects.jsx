import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export const Projects = () => {
  const { t } = useLanguage();
  const projects = t.projects;

  return (
    <section className="min-h-screen bg-[#030712] py-32 px-6 relative overflow-hidden" id="projects">
      {/* --- FONDO AMBIENTAL --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/5 pb-8">
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
          
          {/* CAMBIO: Textos de estado y conteo a verde */}
          <div className="font-mono text-xs text-green-500 text-right hidden md:block">
            <p>{t.ui.totalEntries}: {projects.length.toString().padStart(2, '0')}</p>
            <p>ZYNC_STATUS: ONLINE</p>
          </div>
        </div>

        {/* --- GRID DE TARJETAS TIPO PANTALLA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectScreen key={project.id} project={project} index={index} t={t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2); }
      `}</style>
    </section>
  );
};

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
      className="group relative h-[400px] w-full rounded-md bg-zinc-900 border border-white/10 overflow-hidden flex flex-col"
    >
      {/* --- MARCO SUPERIOR (WINDOW HEADER) --- */}
      <div className="h-8 bg-zinc-950 border-b border-white/5 flex items-center justify-between px-3 z-20 relative">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
             <div className="w-2 h-2 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
           </div>
           {/* Subtítulo estilo sistema */}
           <span className="ml-2 font-mono text-[9px] text-zinc-600 uppercase tracking-widest group-hover:text-green-500/70 transition-colors">
             {project.subtitle}
           </span>
        </div>
        {/* CAMBIO: ID a verde oscuro/consola */}
        <div className="font-mono text-[9px] text-green-500/60">ID: {String(project.id).padStart(3, '0')}</div>
      </div>

      {/* --- CONTENEDOR DE IMAGEN (EL MONITOR) --- */}
      <div className="relative flex-grow overflow-hidden bg-black">
        
        {/* IMAGEN REAL */}
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'grayscale(0%) contrast(100%)' : 'grayscale(100%) contrast(120%) brightness(50%) sepia(20%) hue-rotate(180deg)'
          }}
        />

        {/* EFECTOS DE PANTALLA (SCANLINES & GRID) - Solo visibles en reposo */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
           {/* Grid Pattern */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
           <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
        </div>

        {/* --- CONTENIDO SUPERPUESTO (INFORMACIÓN) --- */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          {/* Gradiente de legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-all duration-500" 
               style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20%)' }} />

          <div className="relative z-30 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[9px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* TITULO */}
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>

            {/* DESCRIPCIÓN */}
            <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
               <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                 {project.description}
               </p>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center gap-4 mt-2">
               <a 
                 href={project.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-cyan-400 transition-colors border-b border-transparent hover:border-cyan-400 pb-0.5"
               >
                 <FaGithub /> {t.ui.accessRepo}
               </a>
            </div>
          </div>
        </div>

        {/* STATUS BADGE FLOTANTE */}
        <div className="absolute top-4 right-4 z-30">
          <div className={`flex items-center gap-2 px-2 py-1 rounded-sm border backdrop-blur-md transition-colors ${
            isHovered ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-black/40 border-white/10 text-zinc-500'
          }`}>
            <FaCircle size={6} className={isHovered ? 'animate-pulse' : ''} />
            <span className="text-[9px] font-mono uppercase tracking-wider">{project.status}</span>
          </div>
        </div>

      </div>

      {/* Borde inferior brillante en hover */}
      <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden">
         <div className={`absolute inset-0 bg-cyan-500 transition-transform duration-500 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`} />
      </div>
    </motion.div>
  );
};