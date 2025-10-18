
import React, { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

export const useTheme = (): { theme: Theme; toggleTheme: (event: React.MouseEvent) => void } => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setTheme(storedTheme ?? (prefersDark ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback((event: React.MouseEvent) => {
    if (isTransitioning) return;

    const overlay = document.getElementById('theme-transition-overlay');
    const isAnimationSupported = overlay && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (!isAnimationSupported) {
      setTheme(nextTheme);
      return;
    }
    
    setIsTransitioning(true);

    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 100;
    const y = (clientY / window.innerHeight) * 100;
    overlay.style.setProperty('--clip-x', `${x}%`);
    overlay.style.setProperty('--clip-y', `${y}%`);
    
    // Use the opposite theme for the overlay color
    overlay.style.backgroundColor = nextTheme === 'dark'
      ? 'rgb(17 24 39)' // bg-gray-900
      : 'rgb(255 255 255)'; // bg-white

    overlay.classList.add('active');
    
    // After expand animation (700ms)
    setTimeout(() => {
      setTheme(nextTheme);
      
      // Wait for React render + browser paint before starting the reveal
      setTimeout(() => {
        overlay.classList.remove('active');
        // After shrink animation (700ms), unlock the button
        setTimeout(() => {
          setIsTransitioning(false);
        }, 700);
      }, 50); 
    }, 700);
  }, [theme, isTransitioning]);

  return { theme, toggleTheme };
};