import { useState } from 'react';
import ImageTrail from './ui/image-trail';
import HeartHover from './ui/heart-hover';
import HeartTrail from './ui/heart-trail';

// Sample images from the assets folder
const images = [
  '/src/assets/images/us/171542217425696.jpg',
  '/src/assets/images/us/171542218141616.jpg',
  '/src/assets/images/us/1715422182297050.jpg',
  '/src/assets/images/us/dji_mimo_20250911_191834_0_1757937928922_photo@1178921917.jpg',
  '/src/assets/images/us/dji_mimo_20250920_145826_0_1758666382433_photo@-2110650274.jpg',
  '/src/assets/images/us/dji_mimo_20250927_165108_0_1759049211064_photo@-5364695.jpg',
  '/src/assets/images/us/dji_mimo_20250927_165112_0_1759049211117_photo@525445867.jpg',
  '/src/assets/images/us/IMG_20240707_210839_408@1052067932.jpg',
  '/src/assets/images/us/IMG_20240710_200110_345@375800557.jpg',
  '/src/assets/images/us/IMG_20241220_133727_448.jpg',
  '/src/assets/images/us/IMG_20241220_133731_039.jpg',
  '/src/assets/images/us/IMG_20241220_133749_242.jpg',
  '/src/assets/images/us/IMG_20241220_133936_467.jpg',
  '/src/assets/images/us/IMG_20250103_155817_046.jpg',
  '/src/assets/images/us/IMG_20250905_174317_317@-1820368394.jpg',
  '/src/assets/images/us/IMG_20250905_174348_303@45280689.jpg',
  '/src/assets/images/us/Messenger_creation_3a8124d6-343e-452f-a0a3-8e677f60b58b.jpeg',
  '/src/assets/images/us/received_576547451958733.jpeg',
  '/src/assets/images/us/received_614069474608436.jpeg',
  '/src/assets/images/us/received_978533464089822.jpeg',
  '/src/assets/images/us/received_2015712372224994.jpeg',
  '/src/assets/images/us/received_2326182227723580.jpeg',
];

function App() {
  const [timestampKey] = useState(Date.now());

  return (
    <div className="h-screen relative overflow-hidden bg-gray-100">
      {/* <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 p-4 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-xl font-bold mb-2">Heart Shape Detection</h1>
        <p className="text-sm mb-2">Draw a heart shape with your mouse to trigger the detection!</p>
        <p className="text-xs text-gray-600">Start at the top, go down and around to form the heart shape.</p>
      </div> */}
      <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 100 100" className="opacity-20">
          <path
            d="M50,85 C30,65 15,50 15,30 C15,15 30,15 40,25 C50,15 65,15 65,30 C65,50 50,65 50,85 Z"
            fill="none"
            stroke="#e53e3e"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
        </svg>
      </div>
       {/* <HeartHover size={360} onHover={(inside) => console.log('inside?', inside)} /> */}
      {/* <ImageTrail
        key={`image-trail-${timestampKey}`}
        items={images}
        variant={1}
        // onHeartDetected={() => {
        //   console.log("Heart shape detected!");
        //   alert("Heart shape detected!");
        // }}
      /> */}
      <HeartTrail size={360} />
    </div>
  );
}

export default App;
