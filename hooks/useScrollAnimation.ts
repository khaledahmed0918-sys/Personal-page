
import React, { useState, useEffect, useRef } from 'react';

type ObserverOptions = {
  threshold?: number;
  triggerOnce?: boolean;
};

export const useScrollAnimation = <T extends HTMLElement,>(
  options: ObserverOptions = { threshold: 0.1, triggerOnce: true }
): [React.RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: options.threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, options.threshold, options.triggerOnce]);

  return [elementRef, isVisible];
};