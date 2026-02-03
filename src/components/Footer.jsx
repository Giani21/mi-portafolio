import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { social } from '../data/config';
import logo from '../assets/Logo.png';

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Función para scroll suave a las secciones
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-slate-950 pt-16 sm:pt-20 md:pt-24 pb-8 overflow-hidden border-t border-slate-800/50">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#60a5fa 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* Brand & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <img src={logo} alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
              </div>
              <div>
                <h3 className="text-slate-100 font-bold text-lg tracking-tight">
                  {t.profile.name}
                </h3>
                <p className="text-blue-400 text-xs font-bold tracking-wider uppercase">
                  Full-Stack Developer
                </p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t.profile.description}
            </p>
            
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-400 tracking-wide">
                {language === 'es' ? 'Disponible para proyectos' : 'Available for projects'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-100 font-bold text-sm mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              {language === 'es' ? 'Navegación' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'home', label: language === 'es' ? 'Inicio' : 'Home' },
                { id: 'stack', label: language === 'es' ? 'Habilidades' : 'Skills' },
                { id: 'projects', label: language === 'es' ? 'Proyectos' : 'Projects' },
                { id: 'contact', label: language === 'es' ? 'Contacto' : 'Contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)}
                    className="text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2 lg:col-span-4">
            <h4 className="text-slate-100 font-bold text-sm mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
              {language === 'es' ? 'Conecta' : 'Connect'}
            </h4>
            
            {/* Social buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <SocialButton href={social.github} icon={FaGithub} label="GitHub" />
              <SocialButton href={social.linkedin} icon={FaLinkedin} label="LinkedIn" />
              <SocialButton href="https://instagram.com/giani.cap" icon={FaInstagram} label="Instagram" gradient />
              
              {/* Email button - scrolls to contact form */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="group relative flex items-center justify-center w-11 h-11 bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-700/50 transition-all rounded-xl overflow-hidden"
                aria-label="Contact Form"
              >
                <FaEnvelope className="text-slate-400 group-hover:text-blue-400 text-lg relative z-10 transition-colors" />
              </button>
            </div>

            {/* Info card */}
            <div className="p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
              <p className="text-xs text-slate-500 mb-2 font-medium">
                {language === 'es' ? 'Ubicación' : 'Location'}
              </p>
              <p className="text-sm text-slate-300 font-medium">
                Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-slate-500 text-xs">
            © {currentYear} {t.profile.name}. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">
              {language === 'es' ? 'Hecho con' : 'Made with'} React + Tailwind
            </span>
            <div className="w-px h-4 bg-slate-800" />
            <span className="text-xs text-slate-600 font-mono">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton = ({ href, icon: Icon, label, gradient }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative flex items-center justify-center w-11 h-11 border transition-all rounded-xl overflow-hidden ${
      gradient 
        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-transparent hover:scale-105' 
        : 'bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-700/50'
    }`}
    aria-label={label}
  >
    <Icon className={`text-lg relative z-10 transition-all ${
      gradient 
        ? 'text-white' 
        : 'text-slate-400 group-hover:text-blue-400 group-hover:scale-110'
    }`} />
    {!gradient && (
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    )}
  </a>
);