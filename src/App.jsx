import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GlassDeviceSkills } from './components/GlassDeviceSkills';

export default function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <GlassDeviceSkills />
    </div>
  );
}