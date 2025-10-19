
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className, style }) => {
  return (
    <div
      className={`bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/10 dark:border-gray-700/50 rounded-2xl shadow-lg transition-shadow duration-300 dynamic-shadow-hover ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;