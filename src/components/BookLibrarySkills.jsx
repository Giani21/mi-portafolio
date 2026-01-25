import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs } from 'react-icons/fa';
import { skills } from '../data/config';

const iconMap = { FaReact, FaNodeJs, FaPalette, FaRocket, FaCogs };

const TRANSITION_BOOK = { 
  type: "spring", 
  stiffness: 100, 
  damping: 22, 
  mass: 1 
};

export const BookLibrarySkills = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedBook = skills.find(s => s.category === selectedId);

  useEffect(() => {
    document.body.style.overflow = selectedId ? 'hidden' : 'unset';
  }, [selectedId]);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight italic">
          Stack Tecnológico
        </h2>
        <p className="text-zinc-400 text-lg italic">Toma un libro para ver mi experiencia</p>
      </div>

      {/* Bookshelf */}
      <div className="relative pb-20">
        <div className="flex justify-center items-end gap-4 flex-wrap">
          {skills.map((skill) => (
            <div key={skill.category} className="relative h-64 w-44">
              <motion.div
                layoutId={`book-anim-${skill.category}`}
                onClick={() => setSelectedId(skill.category)}
                className="relative h-64 w-44 cursor-pointer z-10 will-change-transform"
                whileHover={selectedId ? {} : { y: -12, rotateY: -5 }}
                transition={TRANSITION_BOOK}
              >
                <BookCover 
                  category={skill.category} 
                  iconName={skill.iconName} 
                  className={selectedId === skill.category ? "opacity-0" : "opacity-100"}
                />
              </motion.div>
              
              {selectedId === skill.category && (
                <div className="absolute inset-0 bg-black/40 rounded-r-lg border border-white/5 -z-10 shadow-inner" />
              )}
            </div>
          ))}
        </div>
        <div className="h-4 bg-zinc-800 rounded-lg shadow-xl w-full mt-1 border-t border-white/5" />
      </div>

      {/* Modal / Libro Abierto */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`book-anim-${selectedId}`}
              className="relative w-full max-w-3xl aspect-[1.5/1] flex rounded-lg shadow-2xl"
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
              transition={{ 
                ...TRANSITION_BOOK, 
                delay: selectedId ? 0 : 0.2 
              }}
            >
              {/* PÁGINA DERECHA */}
              <div className="absolute right-0 w-1/2 h-full bg-zinc-900 rounded-r-lg p-8 md:p-12 border-y border-r border-white/10 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="relative z-10"
                >
                  <h4 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-8 flex items-center gap-2">
                    <span className="w-8 h-px bg-cyan-500/30"></span> Herramientas
                  </h4>
                  <ul className="space-y-4">
                    {selectedBook?.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                        <span className="text-lg font-medium tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* TAPA DINÁMICA */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -155 }}
                exit={{ rotateY: 0 }}
                transition={{ 
                  ...TRANSITION_BOOK, 
                  delay: selectedId ? 0.05 : 0 
                }}
                style={{ 
                  transformOrigin: "left center",
                  width: "50%",
                  position: "absolute",
                  left: "50%",
                  height: "100%",
                  zIndex: 20,
                  transformStyle: "preserve-3d"
                }}
              >
                {/* PORTADA EXTERIOR */}
                <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                  <BookCover category={selectedBook?.category} iconName={selectedBook?.iconName} isLarge />
                </div>

                {/* INTERIOR DE LA TAPA */}
                <div 
                  className="absolute inset-0 bg-zinc-800 p-8 md:p-12 rounded-l-lg border-y border-l border-white/10"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <motion.div 
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="flex flex-col h-full justify-center"
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="absolute top-0 left-0 text-zinc-500 hover:text-white text-[10px] font-mono tracking-widest"
                    >
                      [ CERRAR ]
                    </button>
                    <h3 className="text-4xl font-bold text-white mb-2">{selectedBook?.category}</h3>
                    <div className="w-12 h-1 bg-cyan-500 mb-6 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const BookCover = ({ category, iconName, isLarge = false, className = "" }) => {
  const Icon = iconMap[iconName];
  return (
    <div className={`
      w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-r-lg border-r-4 border-zinc-700 
      flex flex-col items-center justify-center p-6 relative shadow-xl
      transition-opacity duration-300 ${className}
    `}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/40" />
      <div className="absolute top-4 left-4 right-4 h-px bg-cyan-500/10" />
      
      <div className="relative z-10 flex flex-col items-center">
        {Icon && <Icon className={`${isLarge ? 'w-24 h-24' : 'w-12 h-12'} text-cyan-500 mb-6`} />}
        <h3 className={`text-white font-bold text-center uppercase tracking-tighter leading-tight ${isLarge ? 'text-4xl' : 'text-lg'}`}>
          {category}
        </h3>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4 h-px bg-cyan-500/10" />
    </div>
  );
};