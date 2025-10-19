import React from 'react';

interface AnimatedBearProps {
  isPeeking: boolean;
  isClimbing: boolean;
  expression: 'neutral' | 'smiling' | 'angry';
  isCelebrating: boolean;
}

const Confetti: React.FC = () => (
  <div className="absolute inset-0">
    {Array.from({ length: 30 }).map((_, i) => {
      const duration = Math.random() * 1.0 + 0.8; // Varied speed
      const delay = Math.random() * 0.2; // Tighter burst start
      const endX = (Math.random() - 0.5) * 400; // Wider horizontal spread
      const endY = -(Math.random() * 200 + 250); // Varied height
      const endRot = (Math.random() - 0.5) * 1080; // More rotation

      return (
        <div
          key={i}
          className="confetti"
          style={{
            '--end-x': `${endX}px`,
            '--end-y': `${endY}px`,
            '--end-rot': `${endRot}deg`,
            backgroundColor: `hsl(${Math.random() * 360}, 90%, 65%)`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties}
        />
      );
    })}
  </div>
);

const BearSvg: React.FC<{ expression: 'neutral' | 'smiling' | 'angry' }> = ({ expression }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
    <g>
      {/* Body */}
      <ellipse cx="50" cy="95" rx="32" ry="25" fill="#D2691E" />

      {/* Head */}
      <circle cx="50" cy="55" r="30" fill="#D2691E" />
      
      {/* Ears */}
      <circle cx="25" cy="33" r="12" fill="#A0522D" />
      <circle cx="75" cy="33" r="12" fill="#A0522D" />
      <circle cx="27" cy="35" r="8" fill="#CD853F" />
      <circle cx="73" cy="35" r="8" fill="#CD853F" />
      
      {/* Snout */}
      <ellipse cx="50" cy="63" rx="15" ry="12" fill="#F4A460" />
      
      {/* Eyes & Eyebrows */}
      <g>
          <circle cx="40" cy="53" r="4" fill="#2C1E12" className="bear-eye" />
          <circle cx="60"cy="53" r="4" fill="#2C1E12" className="bear-eye" style={{ animationDelay: '0.2s' }} />
          {expression === 'angry' && (
            <>
              <path d="M 35 47 L 45 50" stroke="#2C1E12" strokeWidth="2" strokeLinecap="round" />
              <path d="M 65 47 L 55 50" stroke="#2C1E12" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
      </g>
      
      {/* Nose & Mouth */}
      <ellipse cx="50" cy="61" rx="6" ry="4" fill="#2C1E12" />
      
      {/* Conditional Mouth Shapes */}
      {expression === 'neutral' && (
        <>
          <path d="M 50 65 Q 50 67 45 68" stroke="#2C1E12" strokeWidth="1" fill="none" />
          <path d="M 50 65 Q 50 67 55 68" stroke="#2C1E12" strokeWidth="1" fill="none" />
        </>
      )}
      {expression === 'smiling' && (
        <path d="M 42 67 Q 50 73 58 67" stroke="#2C1E12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      {expression === 'angry' && (
        <path d="M 44 70 Q 50 65 56 70" stroke="#2C1E12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      
      {/* Paws - To make it look like it's hanging */}
      <g>
        <ellipse cx="30" cy="25" rx="15" ry="12" fill="#A0522D" transform="rotate(-15 30 25)" />
        <ellipse cx="70" cy="25" rx="15" ry="12" fill="#A0522D" transform="rotate(15 70 25)" />
      </g>
    </g>
  </svg>
);

const AnimatedBear: React.FC<AnimatedBearProps> = ({ isPeeking, isClimbing, expression, isCelebrating }) => {
  
  const animationClass = isClimbing
    ? 'animate-bear-climb'
    : isPeeking
    ? 'animate-bear-peek'
    : 'animate-bear-hide';

  return (
    <>
      {/* Corner Bear */}
      <div className={`w-full h-full transition-opacity duration-300 ${isCelebrating ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`w-full h-full ${animationClass}`}>
          <BearSvg expression={expression} />
        </div>
      </div>

      {/* Celebration Bear */}
      {isCelebrating && (
        <div className="celebration-container">
          <div className="relative w-full h-full celebration-bear-anim">
            <BearSvg expression="smiling" />
            <Confetti />
          </div>
        </div>
      )}
    </>
  );
};

export default AnimatedBear;