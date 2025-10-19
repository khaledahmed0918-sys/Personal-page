import React, { useState, useEffect, useCallback } from 'react';
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
import AnimatedBear from './components/AnimatedBear';

const palettes = [
  { start: '#22d3ee', end: '#a855f7' }, // Cyan -> Purple
  { start: '#f97316', end: '#ec4899' }, // Orange -> Pink
  { start: '#22c55e', end: '#3b82f6' }, // Green -> Blue
  { start: '#facc15', end: '#ef4444' }, // Yellow -> Red
];

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [bearState, setBearState] = useState({ isPeeking: false, isClimbing: false, expression: 'neutral' as const, isCelebrating: false });


  // Cycle through color palettes on any click
  const handleGlobalClick = useCallback((event: React.MouseEvent) => {
    // Prevent color change when clicking on interactive elements like buttons, links
    if (event.target instanceof HTMLElement) {
      const targetTag = event.target.tagName.toLowerCase();
      const parentTag = event.target.parentElement?.tagName.toLowerCase();
      if (['button', 'a', 'input', 'textarea', 'select', 'svg', 'path'].includes(targetTag) || 
          ['button', 'a'].includes(parentTag || '') ||
          event.target.closest('[role="button"]')) { // Prevent on bear click
        return;
      }
    }
    setPaletteIndex(prev => (prev + 1) % palettes.length);
  }, []);

  // Apply the selected color palette to CSS variables
  useEffect(() => {
    const { start, end } = palettes[paletteIndex];
    document.documentElement.style.setProperty('--color-primary-start', start);
    document.documentElement.style.setProperty('--color-primary-end', end);
    document.documentElement.style.setProperty('--color-primary', start);
    document.documentElement.style.setProperty('--color-primary-stronger', end);
    document.documentElement.style.setProperty('--color-glow', start + '40');
  }, [paletteIndex]);

  // Scroll handler for Animated Bear
  useEffect(() => {
    if (!FEATURE_FLAGS.animatedBear) return;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Avoid division by zero if pageHeight is 0
        const scrollPercentage = pageHeight > 0 ? (scrollY / pageHeight) * 100 : 0;

        if (scrollPercentage > 85) {
            setBearState(prev => ({ ...prev, isClimbing: true, isPeeking: false }));
        } else if (scrollY > 200) { // Start peeking after scrolling down a bit
            setBearState(prev => ({ ...prev, isClimbing: false, isPeeking: true }));
        } else {
            setBearState(prev => ({ ...prev, isClimbing: false, isPeeking: false }));
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBearClick = () => {
    if (bearState.isCelebrating) return; // Prevent re-triggering while animating
    setBearState(prev => ({ ...prev, isCelebrating: true, expression: 'smiling' }));
    
    setTimeout(() => {
        setBearState(prev => ({ ...prev, isCelebrating: false, expression: 'neutral' }));
    }, 3000); // Duration of the celebration animation
  };


  return (
    <div className="relative min-h-screen overflow-x-hidden" onClick={handleGlobalClick}>
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
            <Ratings webhookUrl={WEBHOOK_URL} theme={theme} />
          </div>
        </div>
      </main>
      
      <footer className="relative z-10 text-center py-8 text-xs text-gray-500 dark:text-gray-400">
        <p>Built with ❤️ and a lot of code. &copy; {new Date().getFullYear()} Mohammed. All rights reserved.</p>
        <p className="mt-2 text-gray-600 dark:text-gray-500 text-sm">This is an introductory site about me, feel free to add me on Discord .</p>
      </footer>

      {/* Animated Bear Component */}
      {FEATURE_FLAGS.animatedBear && (
        <div 
            className="fixed bottom-0 right-5 w-36 h-36 z-40 pointer-events-auto cursor-pointer"
            onClick={handleBearClick}
            aria-label="Animated bear"
            role="button"
        >
          <AnimatedBear 
            isPeeking={bearState.isPeeking}
            isClimbing={bearState.isClimbing}
            expression={bearState.expression}
            isCelebrating={bearState.isCelebrating}
          />
        </div>
      )}
    </div>
  );
};

export default App;