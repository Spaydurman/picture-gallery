import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggeredScaleUpProps {
  text: string;
  duration?: number;
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

const ScrollTriggeredScaleUp: React.FC<ScrollTriggeredScaleUpProps> = ({
  text,
  duration = 1.5,
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

        // Create scroll-triggered staggered animation
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top bottom',
          end: 'center center',
          onEnter: () => {
            gsap.to(spans, {
              scale: scaleTo,
              opacity: 1,
              duration: duration,
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
          },
          once: true
        });
      } else {
        // Set initial state
        gsap.set(textRef.current, {
          scale: scaleFrom,
          opacity: scaleFrom,
          color: color
        });

        // Create scroll-triggered animation
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top bottom',
          end: 'center center',
          onEnter: () => {
            gsap.to(textRef.current, {
              scale: scaleTo,
              opacity: 1,
              duration: duration,
              ease: ease,
              onStart: () => {
                if (textRef.current) {
                  textRef.current.style.visibility = 'visible';
                }
              }
            });
          },
          once: true
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, scaleFrom, scaleTo, duration, color, stagger, staggerDuration, staggerDelay, ease]);

  return (
    <div
      ref={textRef}
      className={`w-full h-screen flex items-center justify-center ${className}`}
      style={{
        fontSize: fontSize,
        fontWeight: 'bold',
        visibility: 'hidden',
        transformOrigin: 'center center'
      }}
    >
      <div className="text-center w-full">
        {text}
      </div>
    </div>
  );
};

export default ScrollTriggeredScaleUp;