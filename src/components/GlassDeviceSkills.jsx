import React, { useState } from 'react';
import { FaReact, FaServer, FaPalette, FaRocket, FaCogs, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { skills as skillsData } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = { FaReact, FaServer, FaPalette, FaRocket, FaCogs };

const categoryColors = {
  "Frontend": "blue",
  "Backend": "indigo",
  "UX/UI": "purple",
  "DevOps": "cyan",
  "Tooling": "violet"
};

const categoryDescriptions = {
  es: {
    "Frontend": "Lo que tus clientes ven y tocan. Me encargo de que tu web sea linda, rápida y funcione perfecto en celulares.",
    "Backend": "El cerebro de la web. Manejo la seguridad, las bases de datos y que todo el sistema interno funcione sin errores.",
    "UX/UI": "El diseño inteligente. Planifico cómo debe verse y sentirse la web para que sea fácil de usar para cualquier persona.",
    "DevOps": "La nube y el lanzamiento. Organizo las herramientas necesarias para que tu página esté siempre online y actualizada.",
    "Tooling": "Mis herramientas de trabajo. Uso software de última generación para asegurar que el código sea de máxima calidad."
  },
  en: {
    "Frontend": "What your customers see and touch. I make sure your site is beautiful, fast, and works perfectly on mobile phones.",
    "Backend": "The brain of the website. I handle security, databases, and ensure all internal systems run without errors.",
    "UX/UI": "Smart design. I plan how the site should look and feel so it's easy for anyone to use.",
    "DevOps": "Cloud and deployment. I organize the tools needed to keep your site always online and up to date.",
    "Tooling": "My workspace. I use cutting-edge software to ensure the code is of the highest quality."
  }
};

export const GlassDeviceSkills = () => {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const selectedSkill = skillsData.find(s => s.category === selectedId);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % skillsData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + skillsData.length) % skillsData.length);

  const colorClasses = {
    blue: {
      bg: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30",
      text: "text-blue-400",
      icon: "text-blue-400",
      hover: "hover:border-blue-500/50"
    },
    indigo: {
      bg: "from-indigo-500/20 to-indigo-600/20",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      icon: "text-indigo-400",
      hover: "hover:border-indigo-500/50"
    },
    purple: {
      bg: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30",
      text: "text-purple-400",
      icon: "text-purple-400",
      hover: "hover:border-purple-500/50"
    },
    cyan: {
      bg: "from-cyan-500/20 to-cyan-600/20",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      icon: "text-cyan-400",
      hover: "hover:border-cyan-500/50"
    },
    violet: {
      bg: "from-violet-500/20 to-violet-600/20",
      border: "border-violet-500/30",
      text: "text-violet-400",
      icon: "text-violet-400",
      hover: "hover:border-violet-500/50"
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-900 relative overflow-hidden flex items-center" id="stack">
      {/* Fondo sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#60a5fa 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight mb-4">
            {t.ui.stackTitle}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Mis tecnologías y herramientas que domino para crear soluciones digitales'
              : 'My technologies and tools I master to create digital solutions'}
          </p>
        </motion.div>

        {/* Carrusel Mobile */}
        <div className="md:hidden mb-12">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {skillsData.map((skill) => {
                const Icon = iconMap[skill.iconName];
                const color = categoryColors[skill.category];
                const colors = colorClasses[color];

                return (
                  <div key={skill.category} className="w-full flex-shrink-0 px-4">
                    <div
                      onClick={() => setSelectedId(skill.category)}
                      className={`group relative bg-slate-800/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-8 cursor-pointer transition-all duration-300 ${colors.hover} hover:bg-slate-800/70 max-w-sm mx-auto`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className={`mb-4 ${colors.icon} group-hover:scale-110 transition-transform`}>
                          {Icon && <Icon className="w-16 h-16" />}
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-100 mb-3">
                          {skill.category}
                        </h3>

                        <span className={`text-xs ${colors.text} font-medium`}>
                          {language === 'es' ? 'Toca para ver detalles' : 'Tap for details'}
                        </span>
                      </div>

                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controles del carrusel */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide} 
              className="w-10 h-10 flex items-center justify-center border border-slate-700/50 bg-slate-800/50 rounded-full hover:bg-slate-700/50 hover:border-blue-500/30 transition-all"
            >
              <FaChevronLeft className="text-blue-400 text-sm" />
            </button>
            
            <div className="flex gap-2">
              {skillsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === i ? 'bg-blue-400 w-8' : 'bg-slate-700 w-2'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide} 
              className="w-10 h-10 flex items-center justify-center border border-slate-700/50 bg-slate-800/50 rounded-full hover:bg-slate-700/50 hover:border-blue-500/30 transition-all"
            >
              <FaChevronRight className="text-blue-400 text-sm" />
            </button>
          </div>
        </div>

        {/* Grid de Skills - Tablet y Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12">
          {skillsData.map((skill, index) => {
            const Icon = iconMap[skill.iconName];
            const color = categoryColors[skill.category];
            const colors = colorClasses[color];

            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedId(skill.category)}
                className={`group relative bg-slate-800/50 backdrop-blur-sm border ${colors.border} rounded-2xl p-8 cursor-pointer transition-all duration-300 ${colors.hover} hover:bg-slate-800/70`}
              >
                {/* Gradiente superior */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                
                {/* Contenido */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className={`mb-4 ${colors.icon} group-hover:scale-110 transition-transform`}>
                    {Icon && <Icon className="w-12 h-12" />}
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-100 mb-3">
                    {skill.category}
                  </h3>

                  <span className={`text-xs ${colors.text} font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {language === 'es' ? 'Ver detalles →' : 'View details →'}
                  </span>
                </div>

                {/* Borde inferior con glow */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedSkill && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-[110]"
            >
              <div className="bg-slate-900 border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden h-full md:h-auto max-h-[90vh] flex flex-col">
                
                {/* Header del Modal */}
                <div className={`relative p-8 md:p-12 border-b border-slate-800/50 bg-gradient-to-br ${colorClasses[categoryColors[selectedId]].bg}`}>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full transition-all text-slate-400 hover:text-slate-200"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 flex items-center justify-center bg-slate-800/50 border ${colorClasses[categoryColors[selectedId]].border} rounded-2xl ${colorClasses[categoryColors[selectedId]].icon}`}>
                      {iconMap[selectedSkill.iconName] && React.createElement(iconMap[selectedSkill.iconName], {
                        className: "w-8 h-8"
                      })}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-black text-slate-100 mb-2">
                        {selectedSkill.category}
                      </h3>
                      <p className="text-slate-400 text-sm md:text-base max-w-2xl">
                        {categoryDescriptions[language][selectedId]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-8 md:p-12 overflow-y-auto flex-1">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">
                    {language === 'es' ? 'Tecnologías y herramientas' : 'Technologies & Tools'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedSkill.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:bg-slate-800/50 hover:border-slate-600/50 transition-all group"
                      >
                        <div className={`w-2 h-2 rounded-full ${colorClasses[categoryColors[selectedId]].text.replace('text-', 'bg-')}`} />
                        <span className="text-slate-200 font-medium group-hover:text-slate-100 transition-colors">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};