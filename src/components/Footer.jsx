import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaTerminal, FaCode } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { social } from '../data/config';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* --- DECORACIÓN DE FONDO (Corregido a Verde) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-900 to-transparent" />
        <div className="absolute -top-[100px] left-1/4 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMNA 1: IDENTIDAD */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-sm">
                <FaTerminal className="text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wider text-lg">GIANFRANCO_A</h3>
                <p className="text-green-500/70 text-[10px] font-mono tracking-widest">FULL_STACK_DEV // OPERATOR</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {t.profile.description}
            </p>
            
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono text-green-500 font-bold tracking-wider">
                {t.ui.serverStatus || "SYSTEMS ONLINE"}
              </span>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-green-500 rounded-sm" />
              {t.ui.footerNav || "NAVIGATION"}
            </h4>
            <ul className="space-y-4">
              {['home', 'stack', 'projects'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item)}
                    className="text-zinc-400 hover:text-green-400 hover:translate-x-2 transition-all duration-300 flex items-center gap-2 text-sm group"
                  >
                    <FaCode className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="uppercase tracking-wider font-mono text-xs">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: CONECTAR */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-sm" />
              {t.ui.footerConnect || "CONNECT"}
            </h4>
            
            <div className="flex flex-wrap gap-4">
              <SocialButton href={social.github} icon={FaGithub} label="GitHub" />
              <SocialButton href={social.linkedin} icon={FaLinkedin} label="LinkedIn" />
              <SocialButton href={`mailto:${social.email}`} icon={FaEnvelope} label="Email" />
            </div>

            {/* Decoración extra */}
            <div className="mt-8 p-4 bg-zinc-900/50 border border-white/5 rounded-sm">
              <code className="text-[10px] text-zinc-500 font-mono block">
                $ git commit -m "Initial_Commit"<br/>
                $ git push origin master<br/>
                <span className="text-green-500">Success...</span>
              </code>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs font-mono">
            © {currentYear} Gianfranco Andreachi. {t.ui.footerRights || "All rights reserved"}.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Componente auxiliar para botones sociales (Corregido a Verde)
const SocialButton = ({ href, icon: Icon, label }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center w-12 h-12 bg-zinc-900 border border-zinc-800 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 rounded-sm overflow-hidden"
    aria-label={label}
  >
    <Icon className="text-zinc-400 group-hover:text-green-400 text-xl relative z-10 transition-transform group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);