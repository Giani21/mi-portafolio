import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/config';

export const BentoSkills = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Stack Tecnológico
          </span>
        </h2>
        <p className="text-gray-400 text-lg">Herramientas que domino para crear experiencias excepcionales</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 ${
              idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
          >
            {/* Gradient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-sm font-mono text-cyan-400 mb-6 uppercase tracking-wider">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};