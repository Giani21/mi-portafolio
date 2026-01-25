import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/config';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Sutil gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-zinc-800/60 backdrop-blur-sm border border-zinc-700 rounded-full text-xs font-mono text-cyan-400">
              {profile.role}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none text-white">
            {profile.name}
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-8 font-light">
            {profile.description}
          </p>

          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-zinc-900 rounded-full font-medium hover:bg-cyan-400 transition-colors"
          >
            Hablemos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};