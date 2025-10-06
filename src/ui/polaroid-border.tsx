import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import img1 from '../assets/images/us/IMG_20240707_210839_408@1052067932.jpg';
import img2 from '../assets/images/us/IMG_20240710_200110_345@375800557.jpg';
import img3 from '../assets/images/us/received_2015712372224994.jpeg';
import img4 from '../assets/images/us/received_614069474608436.jpeg';

type Side = 'left' | 'right';

type Polaroid = {
  id: number;
  side: Side;
  rotation: number;
  scale: number;
  img: string;
  positionY: number;
};

const DEFAULT_IMAGES = [img1, img2, img3, img4].filter(Boolean) as string[];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const PolaroidBorder: React.FC<{
  images?: string[];
  children?: React.ReactNode;
}> = ({ images = DEFAULT_IMAGES, children }) => {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const idRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const generatePolaroids = (count: number) => {
    const newItems: Polaroid[] = [];

    for (let i = 0; i < count; i++) {
      const side: Side = Math.random() > 0.5 ? 'left' : 'right';
      const rotation = Math.floor(randomBetween(-25, 25)); // random both directions
      const scale = Number(randomBetween(0.85, 1.1).toFixed(2));
      const img = images[Math.floor(Math.random() * images.length)];
      const positionY = Math.random() * 90;

      newItems.push({
        id: idRef.current++,
        side,
        rotation,
        scale,
        img,
        positionY,
      });
    }

    setPolaroids((prev) => [...prev, ...newItems]);
  };

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScroll;

      if (isScrollingDown && Math.random() > 0.65) {
        generatePolaroids(1);
      }

      lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.polaroid-item');
    const lastItem = items[items.length - 1];

    if (lastItem) {
      gsap.fromTo(
        lastItem,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [polaroids]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-visible">
      <div className="absolute top-0 left-0 w-20 h-full pointer-events-none">
        {polaroids
          .filter((p) => p.side === 'left')
          .map((p) => (
            <div
              key={p.id}
              className="absolute polaroid-item"
              style={{
                top: `${p.positionY}%`,
                transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
              }}
            >
              <div
                className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-200"
                style={{ width: 132, height: 168 }}
              >
                <div style={{ width: '100%', height: '100%', padding: 10 }}>
                  <div
                    className="w-full h-full bg-gray-100 overflow-hidden"
                    style={{ borderRadius: 4 }}
                  >
                    <img
                      src={p.img}
                      alt="polaroid"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="absolute top-0 right-0 w-20 h-full pointer-events-none">
        {polaroids
          .filter((p) => p.side === 'right')
          .map((p) => (
            <div
              key={p.id}
              className="absolute polaroid-item"
              style={{
                top: `${p.positionY}%`,
                transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
              }}
            >
              <div
                className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-200"
                style={{ width: 132, height: 168 }}
              >
                <div style={{ width: '100%', height: '100%', padding: 10 }}>
                  <div
                    className="w-full h-full bg-gray-100 overflow-hidden"
                    style={{ borderRadius: 4 }}
                  >
                    <img
                      src={p.img}
                      alt="polaroid"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full flex justify-center z-10">{children}</div>
    </div>
  );
};

export default PolaroidBorder;
