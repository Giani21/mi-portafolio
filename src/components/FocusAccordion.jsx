import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/config';
import { FaCode, FaDatabase, FaBolt } from 'react-icons/fa'; 

const icons = [<FaCode />, <FaDatabase />, <FaBolt />];

export const FocusAccordion = () => {
  const { language } = useLanguage();
  const { focus } = content[language];
  const [activeCard, setActiveCard] = useState(0); 

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8 px-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <h2 className="text-zinc-400 font-mono text-xs tracking-[0.3em] uppercase">
          {focus.title} // {focus.subtitle}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-[450px]">
        {focus.cards.map((card, index) => (
          <AccordionPanel 
            key={card.id}
            item={card}
            index={index}
            isActive={activeCard === index}
            onActivate={() => setActiveCard(index)}
          />
        ))}
      </div>
    </section>
  );
};

const AccordionPanel = ({ item, index, isActive, onActivate }) => {
  return (
    <motion.div
      layout
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 ease-out
        ${isActive 
          ? 'flex-[10] bg-zinc-900 border-zinc-700 shadow-2xl' 
          : 'flex-[2] bg-zinc-950 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'
        }
      `}
    >
      {/* --- FONDO CON IMAGEN --- */}
      {/* Esta capa maneja la imagen de fondo. Usamos 'absolute inset-0' para que cubra todo. */}
      <div className="absolute inset-0 z-0">
        {/* La imagen en sí */}
        <img 
          src={item.image} 
          alt={item.area}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out
            ${isActive ? 'scale-110 opacity-30' : 'scale-100 opacity-20 grayscale'}
          `}
        />
        
        {/* Capa oscura encima de la imagen para asegurar que el texto se lea (Overlay) */}
        {/* Si está activo, lo oscurecemos un poco menos para dejar ver el detalle */}
        <div className={`absolute inset-0 transition-colors duration-500
          ${isActive ? 'bg-zinc-900/80' : 'bg-zinc-950/90'}
        `} />
        
        {/* Gradiente adicional para un toque "cyberpunk" sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      {/* --- CONTENIDO (z-10 para que flote sobre la imagen) --- */}
      <div className="absolute inset-0 z-10 flex flex-col p-6 md:p-10">
        
        {/* CABECERA */}
        <div className={`flex items-center transition-all duration-500 ${isActive ? 'justify-between mb-8' : 'justify-center h-full flex-col gap-4'}`}>
          <span className={`font-mono text-sm transition-colors duration-300 backdrop-blur-sm
            ${isActive ? 'text-green-500 bg-black/50 border border-green-500/20 px-2 py-1 rounded' : 'text-zinc-500 mb-auto mt-2'}`}>
            0{index + 1}
          </span>

          <motion.div 
            layout="position"
            className={`transition-all duration-500
               ${isActive ? 'text-zinc-200 text-3xl' : 'text-zinc-600 text-5xl md:text-6xl group-hover:text-zinc-400 scale-110'}
            `}
          >
            {icons[index]}
          </motion.div>

          {!isActive && (
             <span className="mt-auto w-1 h-8 bg-zinc-800/50 rounded-full" />
          )}
        </div>

        {/* INFO EXPANDIBLE */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }} 
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative flex flex-col justify-end h-full"
            >
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none whitespace-nowrap overflow-hidden drop-shadow-lg">
                {item.title}
              </h3>

              <div className="w-12 h-1 bg-green-500 mb-6 shadow-[0_0_10px_#22c55e]" />

              <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8 drop-shadow-md font-medium">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-zinc-300 text-xs font-mono rounded-lg hover:border-green-500/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};