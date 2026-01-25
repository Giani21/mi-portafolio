import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/config';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 bg-gradient-to-b from-zinc-900/90 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black"
        >
          <span className="text-cyan-400">GA</span>
        </motion.div>
        
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href={`mailto:${profile.email}`}
          className="px-6 py-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-full text-sm text-zinc-300 hover:bg-zinc-800 hover:border-cyan-500/50 transition-all font-medium"
        >
          Contacto
        </motion.a>
      </div>
    </nav>
  );
};