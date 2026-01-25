import React from 'react';
import { certifications } from '../data/config';

export const CertificationSection = () => (
  <section className="py-20 border-t border-white/5">
    <h2 className="text-[10px] font-black text-slate-600 tracking-[0.4em] uppercase mb-12 italic">Certificaciones</h2>
    <div className="space-y-6">
      {certifications.map((cert, i) => (
        <div key={i} className="flex justify-between items-center group">
          <p className="text-slate-400 group-hover:text-white transition-colors">{cert.name} [cite: 106]</p>
          <span className="text-[10px] font-mono text-cyan-500/50">{cert.period}</span>
        </div>
      ))}
    </div>
  </section>
);