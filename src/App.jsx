import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlassDeviceSkills } from './components/GlassDeviceSkills';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen overflow-x-hidden">
      <Hero />
      <GlassDeviceSkills />
    </div>
  );
}