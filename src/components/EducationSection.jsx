import React from 'react';
import { education } from '../data/config';

export const EducationSection = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 md:p-12 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-500 mb-2 block uppercase tracking-wider">Educación</span>
            <h3 className="text-3xl font-bold text-white mb-2">{education[0].degree}</h3>
            <p className="text-zinc-400 text-lg">{education[0].institution}</p>
          </div>
          <div className="text-right">
            <span className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-300 font-mono inline-block">
              {education[0].period}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};