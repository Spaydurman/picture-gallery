import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HandwritingText from '../../ui/handwriting-text';
import PolaroidBorder from '../../ui/polaroid-border';

const Message: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isCorrect = sessionStorage.getItem('anniversaryCorrect');
    
    if (isCorrect !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="h-auto min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">

      <PolaroidBorder>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-[80%] w-full text-center z-index-99999">
          <div className="w-full flex justify-center">
            <HandwritingText
            texts={[
              {
                text: `My Dearest,\n
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum vel mi at cursus. Proin laoreet, justo eu imperdiet gravida, eros lorem finibus mauris, nec blandit lectus lorem nec libero. Suspendisse eget augue sed arcu hendrerit dictum in nec magna.\n
          Curabitur ultricies velit sit amet lorem tempus, in sodales lacus bibendum. Mauris egestas, ante in tempor tincidunt, nisl est ultrices libero, non commodo velit nibh id nisi. Nulla facilisi. Sed sit amet diam in augue tristique fermentum sed quis purus.\nForever yours,\nLorem Ipsum.`,
                fontSize: 32,
                color: "blue",
                duration: 2500,
                textAlign: "left",
                lineGap: 1, // optional tighter spacing
              },
            ]}
          />

          </div>
        </div>
      </PolaroidBorder>
    </div>
  );
};

export default Message;