import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  // FIX: Updated the type for `toggleTheme` to accept a `React.MouseEvent`.
  // The function passed from the `useTheme` hook requires the mouse event
  // to calculate the origin point for the theme transition animation.
  toggleTheme: (event: React.MouseEvent) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-yellow-400 dark:text-yellow-300 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transform active:scale-90 active:rotate-12"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-indigo-500" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;