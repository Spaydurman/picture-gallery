import React, { useEffect, useRef } from 'react';
import Vara from 'vara';

interface HandwritingTextObject {
  text: string;
  fontSize?: number;
  color?: string;
  duration?: number;
  textAlign?: 'left' | 'center' | 'right';
}

interface HandwritingTextProps {
  texts: HandwritingTextObject[];
}

const HandwritingText: React.FC<HandwritingTextProps> = ({ texts = [] }) => {
  const containerId = useRef(
    `vara-container-${Math.random().toString(36).substr(2, 9)}`
  ).current;
  const varaRef = useRef<Vara | null>(null);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';

      const expandedTexts = texts.flatMap((obj) =>
        obj.text.split('\n').map((line) => ({
          text: line,
          fontSize: obj.fontSize ?? 40,
          color: obj.color ?? '#222',
          duration: obj.duration ?? 2000,
          textAlign: obj.textAlign ?? 'left',
        }))
      );

      varaRef.current = new Vara(
        `#${containerId}`,
        'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json',
        expandedTexts,
        {
          strokeWidth: 2,
          fontWeight: 'normal',
        }
      );

      varaRef.current.ready(() => {
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
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [texts]);

  return (
    <div>
      <div id={containerId} />
    </div>
  );
};

export default HandwritingText;
