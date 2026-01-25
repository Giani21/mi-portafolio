import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/config';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white">
          Proyectos Destacados
        </h2>
        <p className="text-zinc-400 text-lg">Soluciones que transforman ideas en realidad</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};