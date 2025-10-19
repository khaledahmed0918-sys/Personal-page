import React, { useState, useEffect } from 'react';
import type { Theme } from '../types';

interface AnimatedBackgroundProps {
  theme: Theme;
}

const Star: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute rounded-full bg-slate-300 motion-safe:animate-star-twinkle"
    style={{ ...style, animationDuration: `${Math.random() * 3 + 2}s` }}
  ></div>
);

const DarkThemeBackground: React.FC = () => {
  const [moonClicked, setMoonClicked] = useState(false);
  const [showShootingStar, setShowShootingStar] = useState(false);

  const handleMoonClick = () => {
    setMoonClicked(true);
    setTimeout(() => setMoonClicked(false), 500); // Reset after animation
    
    // Trigger shooting star
    if (!showShootingStar) {
      setShowShootingStar(true);
      setTimeout(() => setShowShootingStar(false), 1200);
    }
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Nebula */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-3xl motion-safe:animate-[nebula-drift-1_25s_ease-in-out_infinite]"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500 rounded-full filter blur-3xl motion-safe:animate-[nebula-drift-2_30s_ease-in-out_infinite]"></div>

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
      
      {/* Shooting Star Easter Egg */}
      {showShootingStar && (
        <div className="shooting-star" style={{ top: '20%', right: '10%' }}></div>
      )}
      
      {/* Satellite */}
      <div className="absolute top-0 left-0 w-2 h-1 bg-slate-400 motion-safe:animate-satellite-orbit" style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

const LightThemeBackground: React.FC = () => {
    const [sunClicked, setSunClicked] = useState(false);
    const [flares, setFlares] = useState<{ id: number, angle: number }[]>([]);

    const handleSunClick = () => {
        setSunClicked(true);
        setTimeout(() => setSunClicked(false), 500);

        // Trigger solar flares
        const newFlares = Array.from({ length: 5 }).map((_, i) => ({
            id: Date.now() + i,
            angle: Math.random() * 360,
        }));
        setFlares(newFlares);
        setTimeout(() => setFlares([]), 600);
    };

    return (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-orange-200 to-yellow-200 overflow-hidden">
            {/* God Rays are positioned relative to the sun */}
            <div className="absolute -top-16 -right-16 w-64 h-64">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="god-ray" style={{
                        transform: `rotate(${i * 25 - 100}deg)`,
                        animationDelay: `${i * 2.5}s`,
                    }} />
                ))}
            </div>
            
            {/* Sun */}
            <div 
                className={`absolute -top-16 -right-16 w-64 h-64 bg-yellow-300 rounded-full motion-safe:animate-sun-pulse cursor-pointer ${sunClicked ? 'motion-safe:animate-sun-flash' : ''}`}
                onClick={handleSunClick}
            >
                {/* Solar Flare Easter Egg */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {flares.map(flare => (
                        <div key={flare.id} className="sun-flare" style={{ transform: `rotate(${flare.angle}deg)` }}></div>
                    ))}
                </div>
            </div>

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