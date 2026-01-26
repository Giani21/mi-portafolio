import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';
import { skills as skillsData } from '../data/config';

const iconMap = { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs };

// --- TRANSICIÓN ACELERADA ---
const TRANSITION_DEVICE = {
  type: 'spring',
  stiffness: 400, // Más rígido para mayor velocidad
  damping: 30,    // Evita rebotes largos
  mass: 0.8,      // Menos peso para reaccionar antes
};

export const GlassDeviceSkills = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedSkill = useMemo(
    () => skillsData.find(s => s.category === selectedId),
    [selectedId]
  );

  return (
    <section className="py-32 px-6 min-h-screen bg-[#030712] relative overflow-hidden flex flex-col items-center">
      {/* Fondo: Grilla y Luces */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* --- HEADER (DISEÑO ORIGINAL RESTAURADO) --- */}
        <div className="mb-32 relative inline-block">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-500/60 uppercase">
              System_Core // Modules_v2.0
            </span>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
            TECH <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>STACK</span>
          </h2>

          <div className="relative mt-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-[2px] bg-white/10 relative overflow-hidden"
            >
              <motion.div 
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
              />
            </motion.div>
            
            <div className="flex gap-2 mt-2">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                  className="w-4 h-[1px] bg-cyan-500/40 origin-left" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- GRID DE TABLETS --- */}
        <div className="relative flex justify-center items-end gap-10 flex-wrap pt-16">
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[100%] h-[80px] bg-cyan-500/5 blur-3xl rounded-[100%] pointer-events-none" />

          {skillsData.map(skill => (
            <motion.div
              key={skill.category}
              layoutId={`device-${skill.category}`}
              onClick={() => setSelectedId(skill.category)}
              className="relative w-40 h-60 cursor-pointer group"
              whileHover={{ y: -20, scale: 1.02 }}
              transition={TRANSITION_DEVICE}
            >
              <GlassDeviceVisual
                category={skill.category}
                iconName={skill.iconName}
                hidden={selectedId === skill.category}
              />

              {!selectedId && (
                <motion.div
                  aria-hidden
                  className="absolute top-[102%] left-0 w-full h-full pointer-events-none"
                  style={{
                    transform: 'scaleY(-1)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                    filter: 'blur(3px)',
                    opacity: 0.5,
                  }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <GlassDeviceVisual category={skill.category} iconName={skill.iconName} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} // Fondo rápido
            />

            <motion.div
              layoutId={`device-${selectedId}`}
              className="relative w-full max-w-5xl aspect-video bg-[#0a0c14]/80 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl flex overflow-hidden"
              transition={TRANSITION_DEVICE}
            >
              {/* LADO IZQUIERDO: Con animación de Escaneo */}
              <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-cyan-500/5 to-transparent border-r border-white/5 relative overflow-hidden">
                
                {/* LÍNEA LÁSER DE ESCANEO (PEDIDO) */}
                <motion.div
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    duration: 2, // Velocidad del escaneo
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "mirror"
                  }}
                  className="absolute left-0 w-full h-[2px] z-20 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                />

                <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-cyan-500/20" />
                  {iconMap[selectedSkill.iconName] &&
                    React.createElement(iconMap[selectedSkill.iconName], {
                      className: 'w-24 h-24 text-cyan-400 mb-6 relative z-10',
                    })}
                </div>
                <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter relative z-10">
                  {selectedSkill.category}
                </h3>
              </div>

              {/* LADO DERECHO: Detalles de Skill */}
              <div className="w-1/2 p-12 flex flex-col justify-center gap-4">
                <span className="font-mono text-[9px] text-zinc-500 tracking-[0.4em] mb-4 uppercase">
                  Data_Stream // {selectedSkill.category}
                </span>
                {selectedSkill.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + (i * 0.04) }} // Entrada de texto más rápida
                    className="flex justify-between border-b border-white/5 pb-2 hover:border-cyan-500/30 transition-colors group/item"
                  >
                    <span className="text-zinc-200 group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                    <span className="text-cyan-500/40 font-mono text-[10px] self-end italic">
                      READY_
                    </span>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                [ Close_X ]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GlassDeviceVisual = ({ category, iconName, hidden }) => {
  const Icon = iconMap[iconName];

  return (
    <div
      className={`
        w-full h-full rounded-lg border border-white/10
        bg-zinc-900/30 backdrop-blur-md
        flex flex-col items-center justify-center p-6
        relative overflow-hidden transition-all duration-300
        ${hidden ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5
      `}
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10 mb-4">
        <div className="absolute inset-0 blur-xl bg-cyan-500/20" />
        {Icon && <Icon className="w-10 h-10 text-cyan-400 relative z-10 transition-transform group-hover:scale-110" />}
      </div>
      <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase text-center relative z-10">
        {category}
      </span>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/40 shadow-[0_0_10px_#06b6d4] group-hover:bg-cyan-400 transition-colors" />
    </div>
  );
};