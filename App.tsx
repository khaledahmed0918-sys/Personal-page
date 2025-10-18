import React from 'react';
import { useTheme } from './hooks/useTheme';
import { PERSONAL_INFO, SKILLS, SERVERS, WEBHOOK_URL, FEATURE_FLAGS, PROJECTS } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Servers from './components/Servers';
import Ratings from './components/Ratings';
import ThemeToggle from './components/ThemeToggle';
import CursorTrail from './components/CursorTrail';
import FavPlayer from './components/FavPlayer';
import Projects from './components/Projects';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {FEATURE_FLAGS.modeTransition && <div id="theme-transition-overlay"></div>}
      {FEATURE_FLAGS.cursorTrail && <CursorTrail theme={theme} />}

      <AnimatedBackground theme={theme} />
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <main className="relative z-10">
        <div className="py-24 space-y-20 md:space-y-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Header name={PERSONAL_INFO.name} tagline={PERSONAL_INFO.tagline} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <About />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Servers servers={SERVERS} />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Skills skills={SKILLS} />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Projects projects={PROJECTS} />
          </div>

          <FavPlayer />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Ratings 
              servers={SERVERS} 
              webhookUrl={WEBHOOK_URL} 
              theme={theme} 
            />
          </div>
        </div>
      </main>
      
      <footer className="relative z-10 text-center py-8 text-xs text-gray-500 dark:text-gray-400">
        <p>Built with ❤️ and a lot of code. &copy; {new Date().getFullYear()} Mohammed. All rights reserved.</p>
        <p className="mt-2 text-gray-600 dark:text-gray-500 text-sm">This is an introductory site about me, feel free to add me on Discord .</p>
      </footer>
    </div>
  );
};

export default App;