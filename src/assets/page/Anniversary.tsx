import React, { useState, useEffect } from 'react';
import AnniversarySuccess from '../components/anniversary-success';
import ImageTrail from '../../ui/image-trail';
import ScrollTriggeredScaleUp from '../../ui/scroll-triggered-scale-up';
import ScrollCarousel from '../../ui/scroll-carousel';
import HandwritingText from '../../ui/handwriting-text';

// Import images
import image1 from '../../assets/images/us/171542217425696.jpg';
import image2 from '../../assets/images/us/171542218141616.jpg';
import image3 from '../../assets/images/us/1715422182297050.jpg';
import image4 from '../../assets/images/us/dji_mimo_20250911_191834_0_1757937928922_photo@1178921917.jpg';
import image5 from '../../assets/images/us/dji_mimo_20250920_145826_0_1758666382433_photo@-2110650274.jpg';
import image6 from '../../assets/images/us/dji_mimo_20250927_165108_0_1759049211064_photo@-5364695.jpg';
import image7 from '../../assets/images/us/dji_mimo_20250927_165112_0_1759049211117_photo@525445867.jpg';
import image8 from '../../assets/images/us/IMG_20240707_210839_408@1052067932.jpg';
import image9 from '../../assets/images/us/IMG_20240710_200110_345@375800557.jpg';
import image10 from '../../assets/images/us/IMG_20241220_133727_448.jpg';
import image11 from '../../assets/images/us/IMG_20241220_133731_039.jpg';
import image12 from '../../assets/images/us/IMG_20241220_133749_242.jpg';
import image13 from '../../assets/images/us/IMG_20241220_133936_467.jpg';
import image14 from '../../assets/images/us/IMG_20250103_155817_046.jpg';
import image15 from '../../assets/images/us/IMG_20250905_174317_317@-1820368394.jpg';
import image16 from '../../assets/images/us/IMG_20250905_174348_303@45280689.jpg';
import image17 from '../../assets/images/us/Messenger_creation_3a8124d6-343e-452f-a0a3-8e677f60b58b.jpeg';
import image18 from '../../assets/images/us/received_576547451958733.jpeg';
import image19 from '../../assets/images/us/received_614069474608436.jpeg';
import image20 from '../../assets/images/us/received_978533464089822.jpeg';
import image21 from '../../assets/images/us/received_2015712372224994.jpeg';

const Anniversary: React.FC = () => {
  const [timestampKey, setTimestampKey] = useState<number>(Date.now());
  const [images, setImages] = useState<string[]>([]);

 useEffect(() => {
    // Load images from the assets directory
    const imagePaths = [
      image1,
      image2,
      image3,
      image4,
      image5,
      image6,
      image7,
      image8,
      image9,
      image10,
      image11,
      image12,
      image13,
      image14,
      image15,
      image16,
      image17,
      image18,
      image19,
      image20,
      image21,
      // image22
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
      <ScrollTriggeredScaleUp
        text="Our Journey Together This Year"
        fontSize="4rem"
        color="#1678b9ff"
        scaleFrom={0.5}
        scaleTo={1}
        duration={1.5}
        stagger={true}
        staggerDuration={0.07}
      />
      <ScrollCarousel />
    </div>
  );
};

export default Anniversary;