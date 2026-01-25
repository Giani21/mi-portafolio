import React from 'react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500"
    >
      {/* Visual Preview */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 p-8 flex items-center justify-center overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative z-10 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-zinc-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-zinc-700 shadow-lg">
            <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-zinc-400 text-sm">{project.subtitle}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-zinc-400 mb-6 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-medium group/link"
        >
          Ver repositorio
          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};