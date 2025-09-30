import React, { useState, useEffect } from 'react';
import AnniversarySuccess from '../components/anniversary-success';
import ImageTrail from '../../ui/image-trail';

const Anniversary: React.FC = () => {
  const [timestampKey, setTimestampKey] = useState<number>(Date.now());
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Load images from the assets directory
    const imagePaths = [
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
      '/src/assets/images/us/received_232618227723580.jpeg'
    ];
    setImages(imagePaths);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
      <AnniversarySuccess />

      <ImageTrail
        key={`image-trail-${timestampKey}`}
        items={images}
        variant={1}
      />
    </div>
  );
};

export default Anniversary;