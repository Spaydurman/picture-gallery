import React from 'react';
import ScrollCarousel from './scroll-carousel';

const CarouselTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Scroll Synced Carousel Test</h1>
        <p className="text-center text-lg mb-20">Scroll down to see the carousel in action</p>
      </div>
      
      <ScrollCarousel />
      
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold">End of Carousel Demo</h2>
        <p className="mt-4 text-lg">The carousel should have scrolled through all images</p>
      </div>
    </div>
  );
};

export default CarouselTest;