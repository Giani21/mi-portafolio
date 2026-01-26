import React, { useRef, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiHtml5, SiCss3, SiJavascript, 
  SiExpress, SiMysql, SiRedis, SiFigma, SiAdobephotoshop, 
  SiAdobeillustrator, SiGit, SiGithub, SiDocker, 
  SiPostman, SiNpm, SiYarn 
} from 'react-icons/si';
import { profile } from '../data/config';

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

export const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. MEMOIZACIÓN PARA RENDIMIENTO: Evita que los iconos se regeneren
  const techWaves = useMemo(() => {
    const shuffled = [...techIcons].sort(() => Math.random() - 0.5);
    return shuffled.map((item, i) => ({
      ...item,
      top: `${15 + (i * (70 / shuffled.length))}%`, 
      duration: 45 + Math.random() * 20, // Velocidad fija y lenta
      delay: Math.random() * -60,
      size: 60 + Math.random() * 30, 
      opacity: 0.08 + Math.random() * 0.05, 
    }));
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Guardamos la posición solo para el panel de telemetría, no para los iconos
    setMousePos({ 
      x: e.clientX - rect.left - rect.width / 2, 
      y: e.clientY - rect.top - rect.height / 2 
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#030712] text-white flex items-center justify-center relative overflow-hidden px-8 lg:px-24"
    >
      {/* CAPA DE LUZ: Más dark pero con resplandor cian */}
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      {/* OLEADAS DE TECNOLOGÍAS: Velocidad lineal pura (Sin lag de mouse) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {techWaves.map((item, i) => (
          <motion.div
            key={i}
            initial={{ x: '120vw' }}
            animate={{ x: '-120vw' }}
            transition={{ 
              duration: item.duration, 
              repeat: Infinity, 
              ease: "linear", // Velocidad constante
              delay: item.delay 
            }}
            style={{
              position: 'absolute',
              top: item.top,
              opacity: item.opacity,
            }}
            className={`${item.color} flex items-center justify-center`}
          >
            {item.Icon && <item.Icon size={item.size} />}
          </motion.div>
        ))}
      </div>

      {/* GRID SUTIL */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />

      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LADO IZQUIERDO: TEXTO */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
              <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-500/70 uppercase">
                {profile.role} // ESTADO: ACTIVO
              </span>
            </div>

            <h1 className="text-7xl md:text-9xl xl:text-[11rem] font-black leading-[0.8] tracking-tighter mb-10 text-white">
              {profile.name.split(' ')[0]}
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                {profile.name.split(' ')[1]}
              </span>
            </h1>

            <div className="max-w-xl border-l border-white/10 pl-8 py-2">
              <p className="text-zinc-500 font-mono text-base md:text-lg leading-relaxed italic">
                "{profile.description}"
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-6 font-mono">
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                className="px-10 py-4 border border-zinc-800 text-zinc-400 font-bold text-xs tracking-widest uppercase transition-all"
              >
                / Init_Contact
              </motion.a>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="px-10 py-4 bg-zinc-900/30 text-zinc-600 text-xs hover:text-white transition-all border border-transparent hover:border-zinc-800"
              >
                [ Open_Stack ]
              </button>
            </div>
          </motion.div>
        </div>

        {/* LADO DERECHO: TERMINAL */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-center">
          <div className="border border-zinc-900 bg-black/40 backdrop-blur-xl p-10 rounded-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 border-b border-zinc-900 pb-4">
              <span className="font-mono text-[9px] text-zinc-700 tracking-widest uppercase">Telemetry_System</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
            </div>

            <div className="font-mono text-[11px] space-y-4 text-zinc-600">
              <div className="flex justify-between italic">
                <span>BUFFER_X:</span>
                <span className="text-zinc-400">{Math.round(mousePos.x)}</span>
              </div>
              <div className="flex justify-between italic">
                <span>LOCAL_TIME:</span>
                <span className="text-zinc-400">{new Date().toLocaleTimeString()}</span>
              </div>
              
              <div className="pt-10 h-20 flex items-end gap-[4px]">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${20 + Math.random() * 50}%`, `${10 + Math.random() * 80}%`, `${20 + Math.random() * 50}%`] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                    className="flex-1 bg-zinc-900"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};