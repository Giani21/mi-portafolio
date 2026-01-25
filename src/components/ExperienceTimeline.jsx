import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/config';

export const ExperienceTimeline = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Experiencia
        </h2>
      </motion.div>

      {experience.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative pl-8 border-l-2 border-zinc-700 hover:border-cyan-500 transition-colors duration-300"
        >
          <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
          
          <div className="pb-12">
            <span className="text-xs font-mono text-cyan-500 mb-2 block">{exp.period}</span>
            <h3 className="text-3xl font-bold text-white mb-2">{exp.company}</h3>
            <p className="text-xl text-zinc-400 mb-6">{exp.role}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exp.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-zinc-400 text-sm bg-zinc-900/50 p-3 rounded-lg border border-zinc-800"
                >
                  <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};