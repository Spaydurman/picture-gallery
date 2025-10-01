import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextScaleUpProps {
  text: string;
  duration?: number;
  delay?: number;
  scaleFrom?: number;
  scaleTo?: number;
  color?: string;
  fontSize?: string;
  className?: string;
  stagger?: boolean;
  staggerDuration?: number;
  staggerDelay?: number;
  ease?: string;
}

const TextScaleUp: React.FC<TextScaleUpProps> = ({
  text,
  duration = 1.5,
  delay = 0,
  scaleFrom = 0,
  scaleTo = 1,
  color = '#000',
  fontSize = '2rem',
  className = '',
  stagger = false,
  staggerDuration = 0.1,
  staggerDelay = 0.1,
  ease = 'elastic.out(1, 0.8)'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      if (stagger) {
        // Split text into individual characters for staggered animation
        const chars = text.split('');
        textRef.current.innerHTML = chars.map(char =>
          char === ' ' ? '<span style="margin: 0 2px;">&nbsp;</span>' : `<span style="display: inline-block;">${char}</span>`
        ).join('');
        
        const spans = textRef.current.querySelectorAll('span');
        
        // Set initial state for all characters
        gsap.set(spans, {
          scale: scaleFrom,
          opacity: scaleFrom,
          color: color
        });

        // Create staggered animation
        gsap.to(spans, {
          scale: scaleTo,
          opacity: 1,
          duration: duration,
          delay: delay,
          stagger: {
            each: staggerDuration,
            from: 'start',
            grid: 'auto'
          },
          ease: ease,
          onStart: () => {
            if (textRef.current) {
              textRef.current.style.visibility = 'visible';
            }
          }
        });
      } else {
        // Set initial state
        gsap.set(textRef.current, {
          scale: scaleFrom,
          opacity: scaleFrom,
          color: color
        });

        // Create the scale up animation
        gsap.to(textRef.current, {
          scale: scaleTo,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: ease,
          onStart: () => {
            if (textRef.current) {
              textRef.current.style.visibility = 'visible';
            }
          }
        });
      }
    }
  }, [text, scaleFrom, scaleTo, duration, delay, color, stagger, staggerDuration, ease]);

  return (
    <div
      ref={textRef}
      className={`text-center ${className}`}
      style={{
        fontSize: fontSize,
        fontWeight: 'bold',
        visibility: 'hidden',
        transformOrigin: 'center center',
        display: 'inline-block'
      }}
    >
      {text}
    </div>
  );
};

export default TextScaleUp;