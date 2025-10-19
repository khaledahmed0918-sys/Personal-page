import React, { forwardRef, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, className, animate = true, ...props }, ref) => {
  const [animationRef, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    (animationRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [ref, animationRef]);
  
  const animationClasses = animate
    ? `motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-8 scale-95 -rotate-3'}`
    : '';

  return (
    <section
      ref={setRefs}
      className={`${animationClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;