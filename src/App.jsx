import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlassDeviceSkills } from './components/GlassDeviceSkills';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="bg-zinc-900 text-zinc-100 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col"> {/* flex-col para asegurar que el footer baje */}
        <Navbar />
        
        <main className="flex-grow">
          <div id="home">
            <Hero />
          </div>

          <div id="stack">
            <GlassDeviceSkills />
          </div>

          <div id="projects">
            <Projects />
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}