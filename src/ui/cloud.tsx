import React, { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  top: number;
  left: number;
  size: number;
  speed: number;
 opacity: number;
}

const Clouds: React.FC = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

 useEffect(() => {
    let intervalId: number | null = null;
    let cloudId = 0;

    // Function to create a new cloud
    const createCloud = (): Cloud => {
      return {
        id: cloudId++,
        top: Math.random() * 100, // Random position in top 100px
        left: -50, // Start from the left edge
        size: Math.random() * 60 + 40, // Random size between 40-100px
        speed: Math.random() * 30 + 20, // Random speed between 20-50s for full width
        opacity: Math.random() * 0.4 + 0.3, // Random opacity between 0.3-0.7
      };
    };

    // Function to add a new cloud periodically
    const addCloud = () => {
      const newCloud = createCloud();
      setClouds(prev => [...prev, newCloud]);

      // Remove cloud after it moves across the screen
      setTimeout(() => {
        setClouds(prev => prev.filter(cloud => cloud.id !== newCloud.id));
      }, newCloud.speed * 1000);
    };

    // Add clouds at random intervals
    intervalId = window.setInterval(() => {
      if (Math.random() > 0.6) { // Randomly decide whether to add a cloud (about 40% chance)
        addCloud();
      }
    }, 2000); // Check every 2 seconds if we should add a cloud

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-60 pointer-events-none z-0 overflow-hidden">
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className="absolute text-gray-300 opacity-100"
          style={{
            top: `${cloud.top}px`,
            left: `${cloud.left}px`,
            fontSize: `${cloud.size}px`,
            opacity: cloud.opacity,
            animation: `moveCloud ${cloud.speed}s linear forwards`,
          }}
        >
          ☁️
        </div>
      ))}
      <style>{`
        @keyframes moveCloud {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
      `}</style>
    </div>
  );
};

export default Clouds;