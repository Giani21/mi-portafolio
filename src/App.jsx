import React, { useState } from 'react'; // Importamos useState
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlassDeviceSkills } from './components/GlassDeviceSkills';
import { Projects } from './components/Projects';
import { FocusAccordion } from './components/FocusAccordion';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [mobileSection, setMobileSection] = useState('home');

  return (
    <LanguageProvider>
      <div className="bg-zinc-900 text-zinc-100 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col">

        <Navbar onMobileNav={setMobileSection} />
        
        <main className="flex-grow">
          
          <div 
            id="home" 
            className={mobileSection === 'home' ? 'block' : 'hidden lg:block'}
          >
            <Hero />
          </div>

          <div 
            id="projects" 
            className={mobileSection === 'projects' ? 'block' : 'hidden lg:block'}
          >
            <Projects />
          </div>

          <div 
            id="stack" 
            className={mobileSection === 'stack' ? 'block' : 'hidden lg:block'}
          >
            <GlassDeviceSkills />
          </div>

          <div 
            id="focus" 
            className={mobileSection === 'focus' ? 'block' : 'hidden lg:block'}
          >
            <FocusAccordion />
          </div>

          <div 
            id="contact" 
            className={(mobileSection === 'contact' || mobileSection === 'home') ? 'block' : 'hidden lg:block'}
          >
            <Contact />
          </div>

        </main>

        <div className={mobileSection === 'home' ? 'block' : 'hidden lg:block'}>
             <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}