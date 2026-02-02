import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
  FaFolder,
  FaHome,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaTerminal
} from 'react-icons/fa';
import logo from '../assets/Logo.png';

export const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Bloqueo de scroll en el body cuando el menú está abierto
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

      const contact = document.getElementById('contact');
      const projects = document.getElementById('projects');
      const stack = document.getElementById('stack');

      if (contact && window.scrollY >= contact.offsetTop - 300) {
        setActiveTab('contact');
      } else if (projects && window.scrollY >= projects.offsetTop - 300) {
        setActiveTab('projects');
      } else if (stack && window.scrollY >= stack.offsetTop - 300) {
        setActiveTab('stack');
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: language === 'es' ? 'INICIO' : 'HOME', icon: FaHome },
    { id: 'stack', label: language === 'es' ? 'STACK' : 'STACK', icon: FaTerminal },
    { id: 'projects', label: language === 'es' ? 'PROYECTOS' : 'PROJECTS', icon: FaFolder }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'h-14 bg-black/95 backdrop-blur-xl border-b border-green-500/20 shadow-lg shadow-green-500/5'
            : 'h-16 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'
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
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded blur group-hover:blur-md transition-all" />
                <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 border border-green-500/30 rounded overflow-hidden group-hover:border-green-400/50 transition-colors">
                  <img src={logo} alt="Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="font-mono text-xs sm:text-sm tracking-wider text-green-400 leading-none">
                  {t.profile.name.split(' ')[0]}
                </span>
                <span className="font-mono text-[9px] text-zinc-600 tracking-widest leading-none mt-0.5">
                  DEVELOPER
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 bg-zinc-950/80 border border-green-500/20 rounded-lg p-1 backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group"
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="navActiveTab"
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-md border border-green-500/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2 px-5 py-2.5 min-w-[140px]">
                    <item.icon
                      className={`text-xs transition-colors ${
                        activeTab === item.id ? 'text-green-400' : 'text-zinc-600 group-hover:text-green-500/70'
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] tracking-widest transition-colors ${
                        activeTab === item.id ? 'text-green-400' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {item.label}
                    </span>
                    <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r transition-colors ${
                      activeTab === item.id ? 'border-green-400/50' : 'border-transparent group-hover:border-green-500/30'
                    }`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="hidden md:flex items-center justify-center gap-2 px-4 lg:px-6 h-9 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded font-mono text-[10px] lg:text-[11px] tracking-widest text-green-400 hover:bg-green-500/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-xs" />
                <span className="relative z-10">{t.profile.buttonContact}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              <div className="hidden sm:flex items-center bg-zinc-950/80 border border-green-500/20 rounded overflow-hidden">
                <button
                  onClick={() => language === 'en' && toggleLanguage()}
                  className={`px-3 py-2 font-mono text-[10px] tracking-wider transition-all ${
                    language === 'es'
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 border-r border-green-500/30'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => language === 'es' && toggleLanguage()}
                  className={`px-3 py-2 font-mono text-[10px] tracking-wider transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 border-l border-green-500/30'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  EN
                </button>
              </div>

              <motion.button
                onClick={() => scrollToSection('contact')}
                className="md:hidden w-9 h-9 flex items-center justify-center border border-green-500/30 bg-zinc-950/80 rounded hover:bg-green-500/10 hover:border-green-400/50 transition-all"
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope className="text-green-400 text-sm" />
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center border border-green-500/30 bg-zinc-950/80 rounded hover:bg-green-500/10 hover:border-green-400/50 transition-all relative overflow-hidden group"
                whileTap={{ scale: 0.9 }}
              >
                <FaBars className="text-green-400 text-sm relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-green-500/20 rounded"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop mejorado */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel con alturas dinámicas (dvh) */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full sm:w-80 h-[100dvh] z-[120] bg-zinc-950 border-l border-green-500/20 flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            >
              {/* Menu Header */}
              <div className="h-16 border-b border-green-500/20 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-green-500/30 rounded">
                    <img src={logo} alt="Logo" className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-green-400">MENU_SYSTEM</span>
                </div>
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-green-500/30 bg-zinc-900 rounded-full hover:bg-green-500/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-green-400 text-lg" />
                </motion.button>
              </div>

              {/* Menu Content - El flex-1 y overflow-y-auto permiten scroll interno si es necesario */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 font-mono text-sm tracking-widest rounded border transition-all ${
                        activeTab === item.id
                          ? 'bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                          : 'border-zinc-800 text-zinc-500 hover:border-green-500/30 hover:text-zinc-300'
                      }`}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <item.icon className={activeTab === item.id ? 'text-green-400' : ''} />
                      <span className="flex-1 text-left">{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="h-px bg-zinc-800" />

                <div className="space-y-4">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full flex items-center justify-center gap-3 py-4 border border-green-500/50 bg-green-500/5 text-green-400 font-mono text-sm tracking-tighter"
                  >
                    <FaEnvelope />
                    {t.profile.buttonContact.toUpperCase()}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => language === 'en' && toggleLanguage()}
                      className={`py-3 font-mono text-xs border rounded transition-all ${
                        language === 'es' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-zinc-800 text-zinc-600'
                      }`}
                    >
                      ESPAÑOL
                    </button>
                    <button
                      onClick={() => language === 'es' && toggleLanguage()}
                      className={`py-3 font-mono text-xs border rounded transition-all ${
                        language === 'en' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-zinc-800 text-zinc-600'
                      }`}
                    >
                      ENGLISH
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer del Menú */}
              <div className="p-6 border-t border-green-500/10 text-center">
                <span className="text-[10px] font-mono text-zinc-700 tracking-[0.2em]">
                  v1.0.2 // STABLE_BUILD
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};