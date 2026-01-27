import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/config';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Fondo sólido - Eliminada la grilla */}
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50 pointer-events-auto">
        
        {/* Línea de acento superior */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        {/* Efecto de "código flowing" mantenido */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: 'linear',
            repeatType: 'loop'
          }}
          className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent blur-xl"
        />
      </div>

      <div className="relative px-6 py-4 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative pointer-events-auto">
          
          {/* --- LADO IZQUIERDO: LOGO HUD --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-2 border-l border-t border-cyan-500/30 w-3 h-3 transition-all group-hover:w-full group-hover:h-full group-hover:opacity-50" />
            <div className="absolute -inset-2 border-r border-b border-cyan-500/30 w-3 h-3 ml-auto mt-auto left-auto top-auto transition-all group-hover:w-full group-hover:h-full group-hover:opacity-50" />
            
            <div className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <div className="hidden md:flex flex-col border-l border-cyan-500/20 pl-4">
                <span className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-[0.2em] leading-none">
                  System_Operator
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none mt-1">
                  {profile.name.split(' ')[0]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* --- CENTRO: BREADCRUMBS TIPO TERMINAL --- */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center gap-3 font-mono text-[9px] text-zinc-500"
          >
            <motion.span 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cyan-500"
            >
              ●
            </motion.span>
            <span className="hover:text-cyan-400 transition-colors cursor-help uppercase tracking-widest">Net_Status: Secure</span>
            <span className="text-zinc-700">/</span>
            <span className="hover:text-cyan-400 transition-colors cursor-help uppercase tracking-widest">Loc: AR_BUE</span>
            <span className="text-zinc-700">/</span>
            <span className="text-cyan-500/80 uppercase tracking-widest bg-cyan-500/10 px-2 py-1 border border-cyan-500/20">v2.0.26</span>
          </motion.div>

          {/* --- LADO DERECHO: CONTACTO HACKER --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <a
              href={`mailto:${profile.email}`}
              className="relative flex items-center gap-3 px-8 py-3 bg-zinc-900/80 backdrop-blur-sm border border-cyan-500/20 group overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-shadow"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase group-hover:text-cyan-400 transition-colors">
                [ Init_Contact ]
              </span>
              <div className="relative w-1.5 h-1.5">
                <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75" />
                <div className="relative bg-cyan-500 rounded-full w-1.5 h-1.5" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* --- LÍNEA BASE CON SCANNING EFFECT --- */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative"
          />
        </div>
      </div>
    </nav>
  );
};