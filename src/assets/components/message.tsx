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
    <div className="h-[200vh] min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">

      <PolaroidBorder>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-full flex justify-center">
            <HandwritingText
            texts={[
              {
                text: "Hello World\nThis is multi-line\nHandwriting animation",
                fontSize: 32,
                color: "blue",
                duration: 2500,
                textAlign: "left",
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