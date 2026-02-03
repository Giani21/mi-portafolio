import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaGlobe, FaMobileAlt, FaCode, FaCheckCircle } from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiJavascript, 
  SiFigma, SiGit, SiGithub
} from 'react-icons/si';

import { useLanguage } from '../context/LanguageContext';

// Icono de Misión Único: Representa Visión + Estrategia de Crecimiento
const MissionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 12V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const techIcons = [
  { Icon: SiTailwindcss, color: "text-cyan-400" },
  { Icon: SiTypescript, color: "text-blue-400" },
  { Icon: SiJavascript, color: "text-yellow-400" },
  { Icon: SiFigma, color: "text-purple-400" },
  { Icon: SiGit, color: "text-orange-400" },
  { Icon: SiGithub, color: "text-slate-300" },
];

export const Hero = () => {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);

  const techWaves = useMemo(() => {
    const shuffled = [...techIcons].sort(() => Math.random() - 0.5);
    return shuffled.map((item, i) => ({
      ...item,
      top: `${15 + (i * (70 / shuffled.length))}%`, 
      duration: 45 + Math.random() * 20, 
      delay: Math.random() * -60,
      size: 40 + Math.random() * 20, 
      opacity: 0.12, 
    }));
  }, []);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-0"
    >
      {/* Fondo con profundidad y color */}
      <div className="absolute top-[-5%] sm:top-[-10%] left-[-10%] sm:left-[-5%] w-[80%] sm:w-[60%] h-[40%] sm:h-[60%] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] sm:bottom-[-10%] right-[-10%] sm:right-[-5%] w-[70%] sm:w-[50%] h-[40%] sm:h-[50%] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Iconos flotantes muy sutiles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
        {techWaves.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: '110vw' }}
            animate={{ x: '-110vw' }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
            style={{ position: 'absolute', top: item.top, opacity: item.opacity }}
            className={item.color}
          >
            {item.Icon && <item.Icon size={item.size} />}
          </motion.div>
        ))}
      </div>

      {/* Grid pattern para textura */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle, #60a5fa 1px, transparent 1px)`, backgroundSize: '80px 80px' }} 
      />

      <div className="w-full max-w-[1400px] grid grid-cols-1 xl:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LADO IZQUIERDO: TEXTO Y MISIÓN */}
        <div className="xl:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl xl:text-[10rem] font-black leading-[0.8] tracking-tighter mb-4 text-slate-100">
              {t.profile.name.split(' ')[0]}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent italic font-light">
                {t.profile.name.split(' ')[1]}
              </span>
            </h1>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-bold text-[10px] tracking-widest uppercase">{t.profile.role}</span>
              </div>
            </div>

            <div className="max-w-xl border-l-4 border-blue-500 pl-6 py-2 mb-8">
              <p className="text-slate-300 font-medium text-lg md:text-xl leading-relaxed italic">
                "{t.profile.description}"
              </p>
            </div>

            {/* Sección de Misión con SVG Único */}
            <div className="mb-10 bg-blue-500/10 p-6 rounded-3xl border border-blue-500/20 max-w-2xl backdrop-blur-sm shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-3 mb-3 text-blue-400">
                <MissionIcon />
                <span className="font-bold text-xs tracking-widest uppercase">Misión</span>
              </div>
              <p className="text-slate-200 text-base md:text-lg font-bold leading-relaxed">
                {language === 'es' 
                  ? "Colaborar en el crecimiento de sus negocios, obteniendo una mejor presencia en internet para que sus visitantes se conviertan en clientes."
                  : "Collaborate in the growth of your business, obtaining a better presence on the internet to make your visitors turn into customers."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl text-sm tracking-widest uppercase transition-all text-center shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">{t.profile.buttonContact}</span>
              </motion.a>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="px-10 py-4 bg-slate-800/50 border border-slate-700/50 text-slate-200 font-bold rounded-2xl text-sm hover:bg-slate-700/50 hover:border-blue-500/30 transition-all text-center flex items-center justify-center gap-2 shadow-sm backdrop-blur-sm"
              >
                <FaArrowDown className="animate-bounce" />
                {t.profile.buttonStack}
              </button>
            </div>
          </motion.div>
        </div>

        {/* LADO DERECHO: TARJETAS DE BENEFICIOS */}
        <div className="xl:col-span-5 hidden xl:grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-slate-700/50 flex flex-col gap-4 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
                <FaGlobe size={24} />
              </div>
              <h3 className="font-black text-slate-100 text-xl tracking-tight leading-none">Presencia Digital</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Webs modernas diseñadas para destacar.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/20 text-white flex flex-col gap-4 mt-8 hover:shadow-blue-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-white/10 border border-white/20 text-white rounded-2xl flex items-center justify-center">
                <FaMobileAlt size={24} />
              </div>
              <h3 className="font-black text-xl tracking-tight leading-none">Mobile First</h3>
              <p className="text-blue-100 text-sm leading-relaxed">Experiencia fluida en todos los dispositivos.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-xl border border-slate-700/50 flex flex-col gap-4 hover:bg-slate-800/70 hover:border-slate-600/50 transition-all"
            >
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
                <FaCode size={24} />
              </div>
              <h3 className="font-black text-slate-100 text-xl tracking-tight leading-none">Código Limpio</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Desarrollo escalable y de alta calidad técnica.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-950 p-8 rounded-[2.5rem] shadow-xl border border-slate-800 text-white flex flex-col gap-4 mt-8 hover:border-slate-700 transition-all"
            >
              <div className="w-12 h-12 bg-white/5 border border-white/10 text-slate-300 rounded-2xl flex items-center justify-center">
                <FaCheckCircle size={24} />
              </div>
              <h3 className="font-black text-xl tracking-tight leading-none">Resultados</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Foco total en la conversión de sus clientes.</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};