
import React, { useState } from 'react';
import type { Theme } from '../types';

interface AnimatedBackgroundProps {
  theme: Theme;
}

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute rounded-full bg-slate-300 motion-safe:animate-star-twinkle"
    style={style}
  ></div>
);

const DarkThemeBackground: React.FC = () => {
  const [moonClicked, setMoonClicked] = useState(false);

  const handleMoonClick = () => {
    setMoonClicked(true);
    setTimeout(() => setMoonClicked(false), 500); // Reset after animation
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Nebula */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      {/* Moon */}
      <div 
        className="absolute top-[15%] left-[10%] w-16 h-16 bg-gray-300 rounded-full cursor-pointer transition-transform hover:scale-110"
        onClick={handleMoonClick}
      >
        <div className={`absolute w-full h-full rounded-full ${moonClicked ? 'motion-safe:animate-moon-wink' : ''}`}>
            <div className="absolute top-[25%] left-[20%] w-4 h-4 bg-gray-400/50 rounded-full"></div>
            <div className="absolute top-[50%] left-[55%] w-6 h-6 bg-gray-400/50 rounded-full"></div>
        </div>
      </div>
      
      {/* Satellite */}
      <div className="absolute top-0 left-0 w-2 h-1 bg-slate-400 motion-safe:animate-satellite-orbit" style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

const LightThemeBackground: React.FC = () => {
    const [sunClicked, setSunClicked] = useState(false);

    const handleSunClick = () => {
        setSunClicked(true);
        setTimeout(() => setSunClicked(false), 500);
    };

    return (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-orange-200 to-yellow-200 overflow-hidden">
            {/* Sun */}
            <div 
                className={`absolute -top-16 -right-16 w-64 h-64 bg-yellow-300 rounded-full motion-safe:animate-sun-pulse cursor-pointer ${sunClicked ? 'motion-safe:animate-sun-flash' : ''}`}
                onClick={handleSunClick}
            ></div>

            {/* Clouds */}
            <div className="absolute top-1/4 -left-1/4 w-96 h-32 bg-white/50 rounded-full filter blur-xl motion-safe:animate-cloud-drift-1 opacity-80"></div>
            <div className="absolute top-1/2 -right-1/4 w-80 h-24 bg-white/40 rounded-full filter blur-lg motion-safe:animate-cloud-drift-2 opacity-70" style={{animationDelay: '-15s'}}></div>
        </div>
    );
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <DarkThemeBackground />
      </div>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        <LightThemeBackground />
      </div>
    </div>
  );
};

export default AnimatedBackground;
