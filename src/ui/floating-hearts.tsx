import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

 useEffect(() => {
    let intervalId: number | null = null;
    let heartId = 0;

    // Function to create a new heart
    const createHeart = (): Heart => {
      return {
        id: heartId++,
        top: window.innerHeight * 0.8, // Start from bottom 80% of screen
        left: Math.random() * window.innerWidth, // Random horizontal position
        size: Math.random() * 30 + 20, // Random size between 20-50px
        duration: Math.random() * 3 + 4, // Random duration between 4-7 seconds
      };
    };

    // Function to add a new heart periodically
    const addHeart = () => {
      const newHeart = createHeart();
      setHearts(prev => [...prev, newHeart]);

      // Remove heart after its animation duration
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, newHeart.duration * 1000);
    };

    // Add hearts at random intervals
    intervalId = window.setInterval(() => {
      if (Math.random() > 0.7) { // Randomly decide whether to add a heart (about 30% chance)
        addHeart();
      }
    }, 300); // Check every 500ms if we should add a heart

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
 }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-red-50 opacity-100 animate-floatUp"
          style={{
            top: `${heart.top}px`,
            left: `${heart.left}px`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-floatUp {
          animation: floatUp linear forwards;
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;