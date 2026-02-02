import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiHtml5, SiCss3, SiJavascript, 
  SiExpress, SiMysql, SiRedis, SiFigma, SiAdobephotoshop, 
  SiAdobeillustrator, SiGit, SiGithub, SiDocker, 
  SiPostman, SiNpm, SiYarn 
} from 'react-icons/si';

import { useLanguage } from '../context/LanguageContext';
import { social } from '../data/config'; 

const techIcons = [
  { Icon: FaReact, color: "text-cyan-400" },
  { Icon: SiTailwindcss, color: "text-sky-300" },
  { Icon: SiTypescript, color: "text-blue-400" },
  { Icon: SiHtml5, color: "text-orange-400" },
  { Icon: SiCss3, color: "text-blue-500" },
  { Icon: SiJavascript, color: "text-yellow-300" },
  { Icon: FaNodeJs, color: "text-emerald-400" },
  { Icon: SiExpress, color: "text-zinc-200" },
  { Icon: SiMysql, color: "text-blue-300" },
  { Icon: SiRedis, color: "text-red-400" },
  { Icon: SiFigma, color: "text-purple-400" },
  { Icon: SiAdobephotoshop, color: "text-blue-600" },
  { Icon: SiAdobeillustrator, color: "text-orange-600" },
  { Icon: SiGit, color: "text-orange-500" },
  { Icon: SiGithub, color: "text-white" },
  { Icon: SiDocker, color: "text-blue-400" },
  { Icon: SiPostman, color: "text-orange-400" },
];

const TelemetryGraph = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const handleMove = () => setTick(t => t + 1);
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="pt-10 h-20 flex items-end gap-[4px]">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [
              `${20 + Math.random() * 50}%`, 
              `${10 + Math.random() * 80}%`, 
              `${20 + Math.random() * 50}%`
            ] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
          className="flex-1 bg-zinc-900"
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const bufferXRef = useRef(null);
  const timeRef = useRef(null);

  const techWaves = useMemo(() => {
    const shuffled = [...techIcons].sort(() => Math.random() - 0.5);
    return shuffled.map((item, i) => ({
      ...item,
      top: `${15 + (i * (70 / shuffled.length))}%`, 
      duration: 45 + Math.random() * 20, 
      delay: Math.random() * -60,
      size: 60 + Math.random() * 30, 
      opacity: 0.08 + Math.random() * 0.05, 
    }));
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !bufferXRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left - rect.width / 2);
    bufferXRef.current.innerText = x;
  };

  useEffect(() => {
    const updateTime = () => {
      if (timeRef.current) {
        timeRef.current.innerText = new Date().toLocaleTimeString();
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030712] text-white flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-0"
    >
      {/* Gradient blobs - adjusted for mobile */}
      <div className="absolute top-[-5%] sm:top-[-10%] left-[-10%] sm:left-[-5%] w-[80%] sm:w-[60%] h-[40%] sm:h-[60%] bg-cyan-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] sm:bottom-[-10%] right-[-10%] sm:right-[-5%] w-[70%] sm:w-[50%] h-[40%] sm:h-[50%] bg-blue-900/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* Tech icons floating - hidden on small mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden sm:block">
        {techWaves.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: '120vw' }}
            animate={{ x: '-120vw' }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "linear", delay: item.delay }}
            style={{ position: 'absolute', top: item.top, opacity: item.opacity }}
            className={`${item.color} flex items-center justify-center`}
          >
            {item.Icon && <item.Icon size={item.size} />}
          </motion.div>
        ))}
      </div>

      {/* Grid pattern - adjusted opacity for mobile */}
      <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '80px 80px' }} 
      />

      <div className="w-full max-w-[1600px] grid grid-cols-1 2xl:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
        
        {/* Main content */}
        <div className="2xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status badge - responsive */}
            <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e] sm:shadow-[0_0_10px_#22c55e]" />
              <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] text-green-500/70 uppercase">
                {t.profile.role} <span className="hidden sm:inline">// STATUS: ACTIVE</span>
              </span>
            </div>

            {/* Main title - fully responsive */}
            <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black leading-[0.85] sm:leading-[0.8] tracking-tighter mb-6 sm:mb-8 md:mb-10 text-white">
              {t.profile.name.split(' ')[0]}
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                {t.profile.name.split(' ')[1]}
              </span>
            </h1>

            {/* Description - responsive padding and text */}
            <div className="max-w-xl border-l border-white/10 pl-4 sm:pl-6 md:pl-8 py-2">
              <p className="text-zinc-500 font-mono text-sm sm:text-base md:text-lg leading-relaxed italic">
                "{t.profile.description}"
              </p>
            </div>

            {/* Action buttons - responsive stacking */}
            <div className="mt-8 sm:mt-10 md:mt-14 flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6 font-mono">
              <motion.a
                href="#contact"
                whileHover={{ backgroundColor: "#fff", color: "#000" }}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border border-zinc-800 text-zinc-400 font-bold text-[10px] sm:text-xs tracking-widest uppercase transition-all text-center"
              >
                / {t.profile.buttonContact}
              </motion.a>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-zinc-900/30 text-zinc-600 text-[10px] sm:text-xs hover:text-white transition-all border border-transparent hover:border-zinc-800 text-center"
              >
                [ {t.profile.buttonStack} ]
              </button>
            </div>

            {/* Mobile-only status indicator */}
            <div className="mt-8 sm:mt-10 2xl:hidden flex items-center gap-4 text-zinc-700">
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <div className="w-1 h-1 rounded-full bg-green-500/40" />
                <span>AVAILABLE FOR WORK</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Telemetry panel - only visible on 2xl screens (1536px+) */}
        <div className="2xl:col-span-5 hidden 2xl:flex flex-col justify-center">
          <div className="border border-zinc-900 bg-black/40 backdrop-blur-xl p-8 xl:p-10 rounded-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 xl:mb-10 border-b border-zinc-900 pb-4">
              <span className="font-mono text-[9px] text-green-500 tracking-widest uppercase">Telemetry_System</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            </div>

            <div className="font-mono text-[11px] space-y-4 text-zinc-600">
              <div className="flex justify-between italic">
                <span className="text-green-500">BUFFER_X:</span>
                <span ref={bufferXRef} className="text-zinc-400">0</span>
              </div>
              <div className="flex justify-between italic">
                <span className="text-green-500">LOCAL_TIME:</span>
                <span ref={timeRef} className="text-zinc-400">--:--:--</span>
              </div>
          
              <TelemetryGraph />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};