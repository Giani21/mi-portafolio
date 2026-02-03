import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
  FaFolder,
  FaHome,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaTerminal,
  FaInstagram,
  FaWhatsapp,
  FaBullseye // Icono para "Enfoque"
} from 'react-icons/fa';
import logo from '../assets/Logo.png';

export const Navbar = ({ onMobileNav }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Elementos para detección de scroll en Desktop
      const contact = document.getElementById('contact');
      const projects = document.getElementById('projects');
      const stack = document.getElementById('stack');
      const focus = document.getElementById('focus'); // Nueva sección Enfoque

      if (window.innerWidth >= 1024) { 
          if (contact && window.scrollY >= contact.offsetTop - 300) {
            setActiveTab('contact');
          } else if (focus && window.scrollY >= focus.offsetTop - 300) {
            setActiveTab('focus');
          } else if (stack && window.scrollY >= stack.offsetTop - 300) {
            setActiveTab('stack');
          } else if (projects && window.scrollY >= projects.offsetTop - 300) {
            setActiveTab('projects');
          } else {
            setActiveTab('home');
          }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    // Lógica Mobile SPA
    if (window.innerWidth < 1024) {
        if (onMobileNav) {
            onMobileNav(id); 
        }
        setActiveTab(id);
        setMenuOpen(false);
        window.scrollTo(0, 0);
    } else {
        // Lógica Desktop Scroll
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(id);
        setMenuOpen(false);
    }
  };

  // Agregada la sección ENFOQUE
  const navItems = [
    { id: 'home', label: language === 'es' ? 'INICIO' : 'HOME', icon: FaHome },
    { id: 'projects', label: language === 'es' ? 'PROYECTOS' : 'PROJECTS', icon: FaFolder },
    { id: 'stack', label: language === 'es' ? 'HABILIDADES' : 'SKILLS', icon: FaTerminal },
    { id: 'focus', label: language === 'es' ? 'ENFOQUE' : 'FOCUS', icon: FaBullseye },
  ];

  // Estilo base para los botones del móvil
  const mobileButtonStyle = "lg:hidden w-10 h-10 flex items-center justify-center bg-slate-800/50 border border-slate-700/50 text-blue-400 rounded-xl hover:bg-slate-700/50 hover:border-blue-500/30 transition-all";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 h-16 ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-black/10' 
            : 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800/30'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            
            {/* Logo Section */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all">
                <img src={logo} alt="Logo" className="w-6 h-6 object-contain brightness-0 invert" />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-xl transition-colors" />
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="font-bold text-slate-100 text-lg leading-none tracking-tight">
                  {t.profile.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-blue-400 font-bold tracking-[0.15em] uppercase mt-1">
                  Full-Stack Dev
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-1 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group"
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="navActiveTab"
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2 px-5 py-2.5 min-w-[140px]">
                    <item.icon
                      className={`text-xs transition-colors ${
                        activeTab === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-blue-400'
                      }`}
                    />
                    <span
                      className={`font-bold text-[11px] tracking-widest transition-colors ${
                        activeTab === item.id ? 'text-slate-100' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Desktop Contact Button */}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center justify-center gap-2 px-6 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-blue-700 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <FaEnvelope className="text-xs relative z-10" />
                <span className="relative z-10">{t.profile.buttonContact}</span>
              </motion.button>

              {/* Language Selector Desktop */}
              <div className="hidden sm:flex items-center bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden p-1">
                <button
                  onClick={() => language === 'en' && toggleLanguage()}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    language === 'es'
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => language === 'es' && toggleLanguage()}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 shadow-sm border border-blue-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* ----- BOTONES MÓVILES (Whatsapp, Instagram, Mail, Menú) ----- */}
              
              {/* WhatsApp Mobile */}
              <motion.a
                href="https://wa.me/5491134873055" 
                target="_blank"
                rel="noopener noreferrer"
                className={mobileButtonStyle}
                whileTap={{ scale: 0.9 }}
              >
                <FaWhatsapp className="text-lg" />
              </motion.a>

              {/* Instagram Mobile (Movido aquí desde el menú) */}
              <motion.a
                href="https://instagram.com/giani.cap"
                target="_blank"
                rel="noopener noreferrer"
                className={mobileButtonStyle}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram className="text-lg" />
              </motion.a>

              {/* Mail Mobile */}
              <motion.button
                onClick={() => scrollToSection('contact')}
                className={mobileButtonStyle}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope className="text-sm" />
              </motion.button>

              {/* Hamburger Mobile */}
              <motion.button
                onClick={() => setMenuOpen(true)}
                className={mobileButtonStyle}
                whileTap={{ scale: 0.9 }}
              >
                <FaBars className="text-sm" />
              </motion.button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-y-0 right-0 w-full sm:w-80 h-[100dvh] z-[120] bg-slate-900 border-l border-slate-700/50 flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            >
              {/* Menu Header */}
              <div className="h-20 border-b border-slate-800/50 flex items-center justify-between px-6 shrink-0 bg-slate-800/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/25">
                    <img src={logo} alt="Logo" className="w-5 h-5 brightness-0 invert" />
                  </div>
                  <span className="font-bold text-slate-100 tracking-tight">
                    {language === 'es' ? 'Navegación' : 'Navigation'}
                  </span>
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-800/50 text-slate-400 rounded-full hover:bg-slate-700/50 hover:text-slate-200 transition-colors border border-slate-700/30"
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all border ${
                        activeTab === item.id
                          ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10'
                          : 'border-slate-700/30 bg-slate-800/20 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 hover:border-slate-600/40'
                      }`}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <item.icon className={`text-base ${activeTab === item.id ? 'text-blue-400' : ''}`} />
                      <span className="flex-1 text-left uppercase tracking-widest text-xs">{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

                <div className="space-y-4">
                  
                  {/* El botón de Instagram grande se eliminó de aquí porque subió a la barra principal */}

                  {/* Language Selector Mobile */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => language === 'en' && toggleLanguage()}
                      className={`py-3 font-bold text-xs rounded-xl border transition-all ${
                        language === 'es' 
                        ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 shadow-md shadow-blue-500/10' 
                        : 'border-slate-700/30 bg-slate-800/20 text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      ESPAÑOL
                    </button>
                    <button
                      onClick={() => language === 'es' && toggleLanguage()}
                      className={`py-3 font-bold text-xs rounded-xl border transition-all ${
                        language === 'en' 
                        ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 shadow-md shadow-blue-500/10' 
                        : 'border-slate-700/30 bg-slate-800/20 text-slate-500 hover:bg-slate-800/40 hover:text-slate-300'
                      }`}
                    >
                      ENGLISH
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer del Menú */}
              <div className="p-8 border-t border-slate-800/50 text-center bg-slate-800/20">
                <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  Gianfranco Andreachi // 2026
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};