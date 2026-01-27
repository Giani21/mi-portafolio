import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { social } from '../data/config';
import { FaTerminal, FaCode, FaFolder, FaHome, FaEnvelope } from 'react-icons/fa';

export const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Lógica simple para detectar sección activa (Spy Scroll)
      const stackSection = document.getElementById('stack');
      const projectSection = document.getElementById('projects');
      
      if (projectSection && window.scrollY >= projectSection.offsetTop - 300) {
        setActiveTab('projects');
      } else if (stackSection && window.scrollY >= stackSection.offsetTop - 300) {
        setActiveTab('stack');
      } else {
        setActiveTab('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función de navegación suave
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  // Textos de navegación según idioma
  const navItems = [
    { id: 'home', label: language === 'es' ? 'INICIO' : 'HOME', icon: FaHome },
    { id: 'stack', label: language === 'es' ? 'TECNOLOGÍAS' : 'STACK', icon: FaCode },
    { id: 'projects', label: language === 'es' ? 'PROYECTOS' : 'PROJECTS', icon: FaFolder },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-md border-cyan-900/30 h-16' : 'bg-transparent border-transparent h-24'}`}>
      
      {/* Línea de energía superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative">
        
        {/* --- IZQUIERDA: IDENTIDAD --- */}
        <div className="flex items-center gap-4">
          <button onClick={() => scrollToSection('home')} className="group relative w-10 h-10 flex items-center justify-center bg-zinc-900/50 border border-white/10 rounded-sm overflow-hidden">
             <div className="absolute inset-0 bg-cyan-500/10 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
             <FaTerminal className="text-zinc-400 group-hover:text-cyan-400 transition-colors z-10" />
             {/* Indicador de actividad */}
             <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </button>
          
          <div className="hidden md:flex flex-col">
            <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] uppercase">System_Op</span>
            <span className="font-bold text-xs text-white tracking-widest group-hover:text-cyan-400 transition-colors">
              {t.profile.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* --- CENTRO: NAVEGACIÓN HOLOGRÁFICA --- */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center">
          <div className="flex items-center p-1 bg-zinc-900/30 border border-white/5 rounded-full backdrop-blur-sm gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-6 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest transition-colors z-10 group"
              >
                {/* Fondo activo (Cursor Láser) */}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-800 border border-white/10 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Texto e Icono */}
                <span className={`relative z-10 flex items-center gap-2 ${activeTab === item.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  <item.icon className={`text-[10px] ${activeTab === item.id ? 'text-cyan-400' : 'opacity-0 group-hover:opacity-50 transition-opacity'}`} />
                  {item.label}
                </span>

                {/* Brillo inferior al activo */}
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-cyan-500 shadow-[0_0_5px_#22d3ee]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- DERECHA: CONTROLES DE SISTEMA --- */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* 1. IDIOMA (Minimalista & Técnico) */}
          <button 
            onClick={toggleLanguage}
            className="group flex items-center gap-2 font-mono text-[10px] text-zinc-500 hover:text-white transition-colors"
          >
            <span className="uppercase tracking-widest hidden md:inline">LANG:</span>
            <div className="flex items-center bg-zinc-900 border border-white/10 px-2 py-1 rounded-sm relative overflow-hidden">
               {/* Fondo de selección */}
               <motion.div 
                 className="absolute top-0 bottom-0 bg-white/10 w-1/2"
                 animate={{ left: language === 'es' ? '0%' : '50%' }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
               
               <span className={`relative z-10 px-1 transition-colors ${language === 'es' ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>ES</span>
               <span className="text-zinc-700">/</span>
               <span className={`relative z-10 px-1 transition-colors ${language === 'en' ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>EN</span>
            </div>
          </button>

          {/* Separador */}
          <div className="w-[1px] h-4 bg-zinc-800" />

          {/* 2. CONTACTO (Botón Sólido) */}
          <a
            href={`mailto:${social.email}`}
            className="relative flex items-center justify-center w-9 h-9 md:w-auto md:px-5 md:py-2 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 rounded-sm transition-all group/contact overflow-hidden"
          >
             <div className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover/contact:translate-y-0 transition-transform duration-300" />
             <FaEnvelope className="text-zinc-400 group-hover/contact:text-cyan-400 md:hidden relative z-10" />
             <span className="hidden md:block font-mono text-[10px] font-bold text-zinc-300 group-hover/contact:text-white uppercase tracking-widest relative z-10">
               {t.profile.buttonContact}
             </span>
          </a>

        </div>
      </div>
    </nav>
  );
};