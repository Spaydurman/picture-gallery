import React from 'react';

const TailwindDemo = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Tailwind CSS Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Card 1</h2>
          <p className="text-gray-600">This is a sample card using Tailwind CSS classes for styling.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-3 text-green-60">Card 2</h2>
          <p className="text-gray-600">Another example of Tailwind styling with different colors.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-20 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-3 text-purple-600">Card 3</h2>
          <p className="text-gray-600">Responsive grid using Tailwind's grid and responsive classes.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button className="px-6 py-3 bg-blue-50 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Primary Button
        </button>
        <button className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-300">
          Secondary Button
        </button>
        <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-300">
          Success Button
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Gradient Background</h2>
        <p className="mb-6">This uses Tailwind's gradient utilities for a beautiful background effect.</p>
      </div>
    </div>
  );
};

export default TailwindDemo;