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
  positionY: number; // Y position percentage (0-10)
};

const DEFAULT_IMAGES = [img1, img2, img3, img4].filter(Boolean) as string[];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const PolaroidBorder: React.FC<{
  images?: string[];
  maxItems?: number;
  children?: React.ReactNode; // Allow children to be passed in
}> = ({ images = DEFAULT_IMAGES, maxItems = 140, children }) => {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const idRef = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);

 // Function to check if bottom areas need more polaroids
 function needsMorePolaroidsAtBottom(): Side | null {
    // Check if we have any polaroids in the bottom 20% (80-100%) for left and right sides
    const bottomPolaroids = polaroids.filter(p => p.positionY > 80);
    const leftBottomPolaroids = bottomPolaroids.filter(p => p.side === 'left');
    const rightBottomPolaroids = bottomPolaroids.filter(p => p.side === 'right');
    
    // If we have less than 2 polaroids in either bottom area, we need more
    if (leftBottomPolaroids.length < 2 && Math.random() > 0.5) {
      return 'left';
    } else if (rightBottomPolaroids.length < 2) {
      return 'right';
    }
    
    return null; // No need for more polaroids
  }

  // Function to generate a batch of polaroids
  function generatePolaroids(count: number) {
    const newItems: Polaroid[] = [];
    for (let i = 0; i < count; i++) {
      // Check if we need polaroids specifically in bottom areas
      const neededSide = needsMorePolaroidsAtBottom();
      const side: Side = neededSide || (Math.random() > 0.5 ? 'left' : 'right');
      const rotation = Math.floor(randomBetween(-28, 28));
      const scale = Number(randomBetween(0.86, 1.12).toFixed(2));
      const img = images[Math.floor(Math.random() * images.length)];
      
      // If we need a polaroid in the bottom area, give it a higher Y position
      let positionY: number;
      if (neededSide && Math.random() > 0.5) { // 50% chance to place in bottom if needed
        positionY = 80 + Math.random() * 19; // Between 80-99%
      } else {
        positionY = Math.random() * 90; // Random Y position (0-90%)
      }
      
      newItems.push({ id: idRef.current++, side, rotation, scale, img, positionY });
    }

    setPolaroids((prev) => {
      const merged = [...prev, ...newItems];
      // keep the newest items but cap to maxItems
      return merged.slice(-maxItems);
    });
  }

 useEffect(() => {
   let ticking = false;
   let lastScrollTop = 0;
   let scrollEndTimer: number;
   
   // Don't generate initial polaroids - only generate when scrolling

   const handleScroll = () => {
     if (!ticking) {
       requestAnimationFrame(() => {
         const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
         const isScrollingDown = currentScrollTop > lastScrollTop;
         
         // Only generate polaroids when scrolling down
         if (isScrollingDown) {
           // Check if bottom areas need more polaroids and generate them if needed
           const neededSide = needsMorePolaroidsAtBottom();
           if (neededSide) { // If bottom areas need polaroids, always generate one
             generatePolaroids(1);
           } else if (Math.random() > 0.7) { // Otherwise, 30% chance to generate when not specifically needed
             generatePolaroids(1);
           }
         }
         
         lastScrollTop = currentScrollTop;
         ticking = false;
       });
       
       ticking = true;
     }
     
     // Clear the previous timer and set a new one
     clearTimeout(scrollEndTimer);
     scrollEndTimer = setTimeout(() => {
       // Reset the scroll state after a short delay
     }, 150);
   };

   // Add scroll event listener
   window.addEventListener('scroll', handleScroll, { passive: true });

   return () => {
     // Clean up event listener
     window.removeEventListener('scroll', handleScroll);
     clearTimeout(scrollEndTimer);
   };
 }, []);

   return (
     <div ref={containerRef} className="relative h-full w-full">
       {/* Left side polaroids container */}
       <div className="absolute top-0 left-0 w-20 h-full pointer-events-none">
         {polaroids
           .filter(p => p.side === 'left')
           .map((p) => (
             <div
               key={p.id}
               className="absolute transition-transform duration-700 ease-out"
               style={{
                 top: `${p.positionY}%`, // Use the stored Y position
                 zIndex: 99,
                 transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
               }}
             >
               <div
                 className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-200"
                 style={{ width: 132, height: 168 }}
               >
                 <div style={{ width: '100%', height: '100%', padding: 10, boxSizing: 'border-box' }}>
                   <div className="w-full h-full bg-gray-100 overflow-hidden" style={{ borderRadius: 4 }}>
                     <img src={p.img} alt="polaroid" className="w-full h-full object-cover" />
                   </div>
                 </div>
               </div>
             </div>
           ))}
       </div>
       
       {/* Right side polaroids container */}
       <div className="absolute top-0 right-0 w-20 h-full pointer-events-none">
         {polaroids
           .filter(p => p.side === 'right')
           .map((p) => (
             <div
               key={p.id}
               className="absolute transition-transform duration-700 ease-out"
               style={{
                 top: `${p.positionY}%`, // Use the stored Y position
                 zIndex: 99,
                 transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
               }}
             >
               <div
                 className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-200"
                 style={{ width: 132, height: 168 }}
               >
                 <div style={{ width: '100%', height: '100%', padding: 10, boxSizing: 'border-box' }}>
                   <div className="w-full h-full bg-gray-100 overflow-hidden" style={{ borderRadius: 4 }}>
                     <img src={p.img} alt="polaroid" className="w-full h-full object-cover" />
                   </div>
                 </div>
               </div>
             </div>
           ))}
       </div>
       
       {/* Render any children passed to the component in the center */}
       <div className="w-full flex justify-center z-10">
         {children}
       </div>
     </div>
  );
 };

export default PolaroidBorder;
