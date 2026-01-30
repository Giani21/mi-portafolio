import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { social } from '../data/config';
import { FaCode, FaFolder, FaHome, FaEnvelope } from 'react-icons/fa';
import logo from '../../src/assets/Logo.png';

export const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const contactSection = document.getElementById('contact');
      const projectSection = document.getElementById('projects');
      const stackSection = document.getElementById('stack');
      
      // El orden importa: de abajo hacia arriba de la página
      if (contactSection && window.scrollY >= contactSection.offsetTop - 400) {
        setActiveTab('contact');
      } else if (projectSection && window.scrollY >= projectSection.offsetTop - 300) {
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(id);
    }
  };

  const navItems = [
    { id: 'home', label: language === 'es' ? 'INICIO' : 'HOME', icon: FaHome },
    { id: 'stack', label: language === 'es' ? 'TECNOLOGÍAS' : 'STACK', icon: FaCode },
    { id: 'projects', label: language === 'es' ? 'PROYECTOS' : 'PROJECTS', icon: FaFolder },
    { id: 'contact', label: language === 'es' ? 'CONTACTO' : 'CONTACT', icon: FaEnvelope },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 border-b ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-md border-green-900/30 h-16' : 'bg-transparent border-transparent h-24'}`}>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative">
        
        <div className="flex items-center gap-4 min-w-[150px]">
          <button onClick={() => scrollToSection('home')} className="group relative w-10 h-10 flex items-center justify-center bg-zinc-900/50 border border-white/10 rounded-sm overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-green-500/10 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
              <img src={logo} alt="Logo" className="w-6 h-6 mr-1 relative scale-100 group-hover:scale-110 transition-transform duration-300" />
             <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </button>
          
          <div className="hidden md:flex flex-col">
            <span className="font-mono text-[9px] text-green-500 tracking-[0.3em] uppercase">System_Op</span>
            <span className="font-bold text-xs text-white tracking-widest transition-colors">
              {t.profile.name.split(' ')[0]}
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 h-full flex items-center">
          <div className="flex items-center p-1 bg-zinc-900/30 border border-white/5 rounded-full backdrop-blur-sm gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest transition-all z-10 group min-w-[100px] md:min-w-[120px] flex justify-center items-center"
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-800 border border-white/10 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className={`relative z-10 flex items-center gap-2 ${activeTab === item.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  <item.icon className={`text-[10px] shrink-0 ${activeTab === item.id ? 'text-green-400' : 'opacity-0 group-hover:opacity-50 transition-opacity'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>

                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-1/4 w-1/2 h-[1px] bg-green-500 shadow-[0_0_5px_#22c55e]" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 min-w-[150px] justify-end">
          
          <button 
            onClick={toggleLanguage}
            className="group flex items-center gap-2 font-mono text-[10px] text-zinc-500 hover:text-white transition-colors"
          >
            <span className="uppercase tracking-widest hidden lg:inline text-green-500 shrink-0">LANG:</span>
            <div className="flex items-center bg-zinc-900 border border-white/10 px-2 py-1 rounded-sm relative overflow-hidden w-14 justify-center">
               <motion.div 
                 className="absolute top-0 bottom-0 bg-white/10 w-1/2"
                 animate={{ left: language === 'es' ? '0%' : '50%' }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
               <span className={`relative z-10 px-1 transition-colors ${language === 'es' ? 'text-green-400 font-bold' : 'text-zinc-600'}`}>ES</span>
               <span className="text-zinc-700">/</span>
               <span className={`relative z-10 px-1 transition-colors ${language === 'en' ? 'text-green-400 font-bold' : 'text-zinc-600'}`}>EN</span>
            </div>
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 shrink-0" />

          <a
            href={`mailto:${social.email}`}
            className="relative flex items-center justify-center w-9 h-9 md:w-[160px] md:px-5 md:py-2 bg-white/5 border border-white/10 rounded-sm group/contact overflow-hidden transition-colors duration-300 hover:border-green-500/50 hover:bg-green-500/10 shrink-0"
          >
             <div className="absolute inset-0 bg-green-400/20 translate-y-full group-hover/contact:translate-y-0 transition-transform duration-300" />
             
             <FaEnvelope className="text-zinc-400 group-hover/contact:text-green-400 md:hidden relative z-10" />
             
             <span className="hidden md:block font-mono text-[10px] font-bold text-zinc-300 group-hover/contact:text-white uppercase tracking-widest relative z-10 whitespace-nowrap">
               {t.profile.buttonContact}
             </span>
          </a>

        </div>
      </div>
    </nav>
  );
};