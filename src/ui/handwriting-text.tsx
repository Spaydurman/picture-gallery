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
  // Use a unique id for each instance
  const containerId = useRef(`vara-container-${Math.random().toString(36).substr(2, 9)}`).current;
  const varaRef = useRef<Vara | null>(null);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
      varaRef.current = new Vara(
        `#${containerId}`,
        'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json',
        texts.map(obj => ({
          text: obj.text,
          fontSize: obj.fontSize ?? 40,
          color: obj.color ?? '#222',
          duration: obj.duration ?? 2000,
          textAlign: obj.textAlign ?? '',
        })),
        {
          strokeWidth: 2,
          fontWeight: 'normal',
        }
      );
    }
    return () => {
      if (container) container.innerHTML = '';
    };
  }, [texts]);


  return (
    <div >
      <div id={containerId} />
    </div>
  );
};

export default HandwritingText;
