import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../../ui/floating-hearts';
import Clouds from '../../ui/cloud';
import Countdown from '../../ui/countdown';

const AnniversaryForm: React.FC = () => {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const navigate = useNavigate();

  const targetDate = new Date('2025-10-14T00:00:00');

  useEffect(() => {
    const countdownCompleted = sessionStorage.getItem('countdownCompleted');
    if (countdownCompleted === 'true') {
      setIsCountdownComplete(true);
    } else {
      const currentDate = new Date();
      if (currentDate >= targetDate) {
        sessionStorage.setItem('countdownCompleted', 'true');
        setIsCountdownComplete(true);
      }
    }
  }, [targetDate]);

  const handleCountdownComplete = () => {
    sessionStorage.setItem('countdownCompleted', 'true');
    setIsCountdownComplete(true);
  };

  useEffect(() => {
    if (isCountdownComplete) {
      sessionStorage.setItem('anniversaryCorrect', 'true');
      navigate('/anniversary-success');
    }
  }, [isCountdownComplete, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-pink-300 to-sky-300 p-4 relative overflow-hidden">
      <Clouds />
      <FloatingHearts />
      {!isCountdownComplete && (
        <Countdown targetDate={targetDate} onCountdownComplete={handleCountdownComplete} />
      )}
      {isCountdownComplete && (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative z-20 animate-pulse">
          <h1 className="text-3xl font-bold text-center text-sky-300 mb-6">Access Granted!</h1>
          <p className="text-gray-600 text-center mb-8">
            The countdown has ended. Redirecting to the anniversary page...
          </p>
        </div>
      )}
    </div>
  );
}

export default AnniversaryForm;