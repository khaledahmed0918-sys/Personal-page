import React, { forwardRef, useCallback } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, className, ...props }, ref) => {
  const [animationRef, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

  // This callback ref will be attached to the <section> element.
  // It ensures that both the parent's ref (if provided) and the hook's internal ref are updated with the DOM node.
  const setRefs = useCallback((node: HTMLDivElement | null) => {
    // Set the ref for the scroll animation hook
    // We cast here because the hook's return type is RefObject (readonly) but useRef provides a MutableRefObject.
    (animationRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    
    // Forward the ref to the parent component
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [ref, animationRef]);

  return (
    <section
      ref={setRefs}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      } ${className || ''}`}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
