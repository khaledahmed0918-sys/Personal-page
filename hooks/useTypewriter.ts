import { useState, useEffect } from 'react';

/**
 * A custom hook for creating a typewriter effect.
 * @param text The full string to be typed out.
 * @param speed The delay between each character in milliseconds.
 * @param delay The initial delay before typing starts in milliseconds.
 * @returns The currently visible portion of the string.
 */
export const useTypewriter = (text: string, speed: number = 50, delay: number = 0): string => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let typingTimeout: number;
    let typingInterval: number;

    // Start typing after the initial delay
    typingTimeout = window.setTimeout(() => {
      let i = 0;
      setDisplayText(''); // Reset text before starting
      typingInterval = window.setInterval(() => {
        if (i < text.length) {
          setDisplayText(prevText => prevText + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
    }, delay);

    // Cleanup function to clear interval and timeout on component unmount or re-render
    return () => {
      clearTimeout(typingTimeout);
      clearInterval(typingInterval);
    };
  }, [text, speed, delay]);

  return displayText;
};
