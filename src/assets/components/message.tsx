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

    const message = `Dear My Love,\n
    It's been two years since sinagot mo po ako. Two years na maraming adventures, kulitan, tampuhan, tawanan, away, di pagkakaunawaan, ups and down. Pero kahit ano man mangyari, ano man ang panahon, ano man ang pagsubok, ikaw pa rin ang aking pinili at pipiliin.\n
    I thank God kasi ibinigay ka Niya sa'kin. I prayed for you to Him and He answered. You are such a blessing sa buhay ko. You've given more joy and colors sa buhay ko. You've given me comfort kaya gano'n na lang din ako kakalmado at mabilis makatulog kapag kasama ka.\n
    I pray and hope na soon makasama kita sa iisang tahanan at magkatabi sa bawat pagtulog. I also pray and hope na makasama na kita ulit mag praise and worship kay Lord.\n
    I love you soooo muchhh my loveee. May we continue this journey and love for the rest of our life. Happy 2nd Anniversary my loveee. Muuahhhh\n
    Love,\n
    Clark, Dadduy.`;

  return (
    <div className="h-auto min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">

      <PolaroidBorder>
        <div className="old-paper-bg rounded-2xl shadow-xl p-8 max-w-[80%] w-full text-center z-index-99999 border border-amber-100">
          <div className="w-full flex justify-center">
            <HandwritingText
            texts={[
              {
                text: message,
                fontSize: 32,
                color: "blue",
                durationPerChar: 100,
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