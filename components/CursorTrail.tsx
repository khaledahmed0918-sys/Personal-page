import React, { useEffect } from 'react';
import type { Theme } from '../types';

interface CursorTrailProps {
  theme: Theme;
}

const CursorTrail: React.FC<CursorTrailProps> = ({ theme }) => {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const particles: HTMLElement[] = [];
    const colors = theme === 'light' 
      ? ["#fb923c", "#f97316", "#ea580c"] // Oranges
      : ["#67e8f9", "#22d3ee", "#06b6d4"]; // Cyans
    const numParticles = 15;
    let currentParticle = 0;

    for (let i = 0; i < numParticles; i++) {
      let particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = '-100px'; // Start off-screen
      particle.style.top = '-100px';
      particle.style.pointerEvents = 'none';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.borderRadius = '50%';
      particle.style.zIndex = '999999';
      particle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      particle.style.transform = 'scale(0)';
      particle.style.opacity = '0';
      document.body.appendChild(particle);
      particles.push(particle);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const animateParticles = () => {
      let x = coords.x;
      let y = coords.y;

      const particle = particles[currentParticle];
      
      particle.style.left = x - 2.5 + 'px';
      particle.style.top = y - 2.5 + 'px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.transform = 'scale(1)';
      particle.style.opacity = '1';

      setTimeout(() => {
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '0';
      }, 300);

      currentParticle = (currentParticle + 1) % numParticles;
    }
    
    const animationInterval = setInterval(animateParticles, 30);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
      particles.forEach(p => p.remove());
    };
  }, [theme]);

  return null; // This component doesn't render anything itself
};

export default CursorTrail;
