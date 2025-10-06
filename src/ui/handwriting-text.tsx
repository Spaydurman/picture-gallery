import React, { useEffect, useRef, useState } from 'react';
import Vara from 'vara';

interface HandwritingTextObject {
  text: string;
  fontSize?: number;
  color?: string;
  durationPerChar?: number; // milliseconds per character
  textAlign?: 'left' | 'center' | 'right';
  lineGap?: number;
}

interface HandwritingTextProps {
  texts: HandwritingTextObject[];
  triggerOnce?: boolean;
}

const HandwritingText: React.FC<HandwritingTextProps> = ({
  texts = [],
  triggerOnce = true,
}) => {
  const containerId = useRef(
    `vara-container-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Intersection observer to trigger animation when visible
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [triggerOnce]);

  // Vara handwriting animation
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!isVisible || (triggerOnce && hasPlayed) || !container) return;

    container.innerHTML = '';

    let yPosition = 0;

    const expandedTexts = texts.flatMap((obj) => {
      const fontSize = obj.fontSize ?? 40;
      const gap = obj.lineGap ?? fontSize * 1.1; // smaller gap between lines
      const durationPerChar = obj.durationPerChar ?? 100; // constant speed
      const lines = obj.text.split('\n');

      return lines.map((line, index) => {
        const baseDuration = Math.max(line.length * durationPerChar, 1000); // ensures minimum duration
        return {
          text: line,
          y: yPosition + index * gap,
          fontSize,
          color: obj.color ?? '#222',
          duration: baseDuration,
          textAlign: obj.textAlign ?? 'left',
        };
      });
    });

    const vara = new Vara(
      `#${containerId}`,
      'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json',
      expandedTexts,
      { strokeWidth: 2, fontWeight: 'normal' }
    );

    vara.ready(() => {
      const svgs = container.querySelectorAll('svg');
      svgs.forEach((svg) => {
        const viewBox = svg.getAttribute('viewBox');
        if (viewBox) {
          const parts = viewBox.split(' ').map(Number);
          if (parts.length === 4) {
            parts[0] -= 20;
            parts[2] += 20;
            svg.setAttribute('viewBox', parts.join(' '));
          }
        }
        svg.style.overflow = 'visible';
      });
    });

    setHasPlayed(true);
  }, [isVisible, triggerOnce, hasPlayed, texts, containerId]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        overflow: 'visible',
        paddingLeft: '10px',
        minHeight: '100px',
      }}
    >
      <div id={containerId} />
    </div>
  );
};

export default HandwritingText;
