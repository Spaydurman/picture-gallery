import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import ConfettiButton from '../../ui/confetti-button';
import HandwritingText from '../../ui/handwriting-text';
const AnniversarySuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isCorrect = sessionStorage.getItem('anniversaryCorrect');
    
    if (isCorrect !== 'true') {
      navigate('/');
    } else {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }, colors: ['#ec4899', '#f472b6', '#f9a8d4', '#0ea5e9', '#7dd3fc', '#bae6fd'] });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f472b6', '#f9a8d4', '#0ea5e9', '#7dd3fc'],
        });
      }, 300);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-full flex justify-center mb-4">
          <HandwritingText
            texts={[
              { text: "Happy Anniversary! My Love", fontSize: 48, color: "#e75480", duration: 2500, textAlign: "center" }
            ]}
          />
        </div>

        {/* <h1 className="text-3xl font-bold text-pink-600 mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-700 mb-6">You remembered our Anniversary!</p> */}
        <div className="text-6xl mb-6">🎉</div>
        <p className="text-gray-600 mb-6 items-center w-full flex justify-center">
            You remembered our Anniversary!
        </p>

        <ConfettiButton
          className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors shadow-lg cursor-pointer"
          confettiOptions={{
            particleCount: 100,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f472b6', '#f9a8d4', '#0ea5e9', '#7dd3fc', '#bae6fd'],
          }}
        >
          Celebrate Again! 🎊
        </ConfettiButton>
      </div>
    </div>
  );
};

export default AnniversarySuccess;