import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
gsap.registerPlugin(ScrollTrigger);

// Import all images from the polaroid folder
import img1 from '../assets/images/polaroid/dji_mimo_20250911_191834_0_1757937928922_photo@1178921917.jpg';
import img2 from '../assets/images/polaroid/dji_mimo_20250914_130020_0_1757937898321_photo@-966419285.jpg';
import img3 from '../assets/images/polaroid/dji_mimo_20250920_135118_0_1758666494976_photo@1394066523.jpg';
import img4 from '../assets/images/polaroid/dji_mimo_20250920_145648_0_1758666384845_photo@857286591.jpg';
import img5 from '../assets/images/polaroid/dji_mimo_20250927_165112_0_1759049211117_photo@525445867.jpg';
import img6 from '../assets/images/polaroid/IMG_6454@-1826141758.JPG';
import img7 from '../assets/images/polaroid/IMG_20250221_164149_505.JPG';
import img8 from '../assets/images/polaroid/IMG_20250221_164156_946.JPG';
import img9 from '../assets/images/polaroid/IMG_20250501_225106_561.jpg';
import img10 from '../assets/images/polaroid/IMG_20250601_204631_626.jpg';
import img11 from '../assets/images/polaroid/IMG_20250801_213353_834.jpg';
import img12 from '../assets/images/polaroid/IMG_20250905_174348_303@45280689.jpg';
import img13 from '../assets/images/polaroid/received_576547451958733.jpeg';
import img14 from '../assets/images/polaroid/received_2038403359995674.jpeg';

type Side = 'left' | 'right';

type Polaroid = {
  id: number;
  side: Side;
  rotation: number;
  scale: number;
  img: string;
  positionY: number;
};

const DEFAULT_IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14].filter(Boolean) as string[];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const PolaroidBorder: React.FC<{
  images?: string[];
  children?: React.ReactNode;
}> = ({ images = DEFAULT_IMAGES, children }) => {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  // Card-pick preview animation variants
  const previewVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { type: 'spring' as const, stiffness: 120, damping: 12 },
    },
    exit: { opacity: 0, scale: 0.8, rotateY: 90 },
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-visible">
      {/* Left Polaroids */}
      <div className="absolute top-0 left-0 w-20 h-full pointer-events-none">
        {polaroids
          .filter((p) => p.side === 'left')
          .map((p) => (
            <div
              key={p.id}
              className="absolute polaroid-item pointer-events-auto cursor-pointer"
              onClick={() => setPreviewImage(p.img)}
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

      {/* Right Polaroids */}
      <div className="absolute top-0 right-0 w-20 h-full pointer-events-none">
        {polaroids
          .filter((p) => p.side === 'right')
          .map((p) => (
            <div
              key={p.id}
              className="absolute polaroid-item pointer-events-auto cursor-pointer"
              onClick={() => setPreviewImage(p.img)}
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

      {/* Center Content */}
      <div className="w-full flex justify-center z-10">{children}</div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              key={previewImage}
              src={previewImage}
              alt="preview"
              className="rounded-xl shadow-2xl cursor-pointer w-[500px] h-auto"
              variants={previewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // prevent closing on image click
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PolaroidBorder;
