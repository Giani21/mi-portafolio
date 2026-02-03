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

  const tapText = {
    expand: language === 'es' ? '[ TOCAR PARA EXPANDIR ]' : '[ TAP TO EXPAND ]',
    close: language === 'es' ? '[ TOCAR PARA CERRAR ]' : '[ TAP TO CLOSE ]'
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header - Responsive */}
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-1 sm:px-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse" />
          <h2 className="text-slate-400 font-mono text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            {focus.title} // {focus.subtitle}
          </h2>
        </div>

        {/* Desktop Accordion (lg+) */}
        <div className="hidden lg:flex gap-4 h-[450px]">
          {focus.cards.map((card, index) => (
            <AccordionPanel 
              key={card.id}
              item={card}
              index={index}
              isActive={activeCard === index}
              onActivate={() => setActiveCard(index)}
              desktop={true}
            />
          ))}
        </div>

        {/* Tablet Accordion (md to lg) */}
        <div className="hidden md:flex lg:hidden flex-col gap-4">
          {focus.cards.map((card, index) => (
            <AccordionPanel 
              key={card.id}
              item={card}
              index={index}
              isActive={activeCard === index}
              onActivate={() => setActiveCard(index)}
              tablet={true}
            />
          ))}
        </div>

        {/* Mobile Cards Stack (< md) */}
        <div className="md:hidden flex flex-col gap-4">
          {focus.cards.map((card, index) => (
            <MobileCard 
              key={card.id}
              item={card}
              index={index}
              tapText={tapText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Desktop & Tablet Accordion Panel
const AccordionPanel = ({ item, index, isActive, onActivate, desktop, tablet }) => {
  return (
    <motion.div
      layout
      transition={{ 
        layout: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.5 
      }}
      onClick={onActivate}
      onMouseEnter={desktop ? onActivate : undefined}
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-500
        ${tablet 
          ? (isActive 
              ? 'h-[300px] bg-slate-800/50 border-slate-700/50 shadow-2xl backdrop-blur-sm' 
              : 'h-[100px] bg-slate-800/40 border-slate-700/40 hover:border-slate-600/50 hover:bg-slate-800/50')
          : (isActive 
              ? 'flex-[10] bg-slate-800/50 border-slate-700/50 shadow-2xl backdrop-blur-sm' 
              : 'flex-[2] bg-slate-800/40 border-slate-700/40 hover:border-slate-600/50 hover:bg-slate-800/50')
        }
      `}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          layout
          src={item.image} 
          alt={item.area}
          className={`w-full h-full object-cover transition-transform duration-1000
            ${isActive ? 'scale-110 opacity-30' : 'scale-100 opacity-20 grayscale'}
          `}
        />
        <div className={`absolute inset-0 transition-colors duration-500
          ${isActive ? 'bg-slate-900/80' : 'bg-slate-900/70'}
        `} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col p-5 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
        
        {/* Header */}
        <motion.div 
          layout
          className={`flex items-center transition-all duration-500 
            ${tablet 
              ? (isActive ? 'justify-between mb-4' : 'justify-between') 
              : (isActive ? 'justify-between mb-6 lg:mb-8' : 'justify-center h-full flex-col gap-3 lg:gap-4')
            }
          `}
        >
          <span className={`font-mono text-xs sm:text-sm transition-colors duration-300 backdrop-blur-sm
            ${isActive ? 'text-blue-400 bg-slate-950/50 border border-blue-500/20 px-2 py-1 rounded' : 'text-slate-500 mb-auto mt-2'}`}>
            0{index + 1}
          </span>

          <motion.div 
            layout="position"
            className={`transition-all duration-500
               ${isActive 
                 ? 'text-slate-200 text-2xl sm:text-3xl' 
                 : tablet 
                   ? 'text-slate-600 text-3xl hover:text-slate-400'
                   : 'text-slate-600 text-4xl lg:text-5xl xl:text-6xl group-hover:text-slate-400 scale-110'}
            `}
          >
            {icons[index]}
          </motion.div>

          {!isActive && !tablet && (
             <motion.span layout className="mt-auto w-1 h-6 lg:h-8 bg-slate-800/50 rounded-full" />
          )}
        </motion.div>

        {/* Expandable Info */}
        <div className="flex-grow flex flex-col justify-end">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative"
              >
                <h3 className={`font-black text-slate-100 uppercase tracking-tighter mb-3 lg:mb-4 leading-none drop-shadow-lg
                  ${tablet ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl'}
                `}>
                  {item.title}
                </h3>

                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: tablet ? 32 : 48 }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 mb-4 lg:mb-6 shadow-[0_0_10px_#3b82f6]" 
                />

                <p className={`text-slate-300 leading-relaxed max-w-2xl mb-4 lg:mb-8 drop-shadow-md font-medium
                  ${tablet ? 'text-sm line-clamp-2' : 'text-sm md:text-base lg:text-lg'}
                `}>
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.tech.map((tech, i) => (
                    <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-950/40 backdrop-blur-md border border-slate-700/50 text-slate-300 text-[9px] sm:text-[10px] md:text-xs font-mono rounded-lg hover:border-blue-500/50 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile Card Component
const MobileCard = ({ item, index, tapText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="relative rounded-xl overflow-hidden cursor-pointer border border-slate-700/40 bg-slate-800/40 hover:border-slate-600/50 transition-colors backdrop-blur-sm"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={item.image} 
          alt={item.area}
          className={`w-full h-full object-cover transition-all duration-700
            ${isExpanded ? 'scale-110 opacity-30' : 'scale-100 opacity-15 grayscale'}
          `}
        />
        <div className={`absolute inset-0 transition-colors duration-500
          ${isExpanded ? 'bg-slate-900/85' : 'bg-slate-900/70'}
        `} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-blue-400 bg-slate-950/50 border border-blue-500/20 px-2 py-1 rounded backdrop-blur-sm">
            0{index + 1}
          </span>
          <div className="text-slate-400 text-2xl">
            {icons[index]}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl xs:text-3xl font-black text-slate-100 uppercase tracking-tighter mb-3 leading-tight drop-shadow-lg">
          {item.title}
        </h3>

        {/* Divider */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: isExpanded ? 48 : 32 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 mb-4 shadow-[0_0_10px_#3b82f6]" 
        />

        {/* Description - Expandable */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-4 drop-shadow-md">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-950/40 backdrop-blur-md border border-slate-700/50 text-slate-300 text-[9px] font-mono rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap indicator */}
        <div className="mt-4 text-center">
          <span className="inline-block text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            {isExpanded ? tapText.close : tapText.expand}
          </span>
        </div>
      </div>
    </motion.div>
  );
};