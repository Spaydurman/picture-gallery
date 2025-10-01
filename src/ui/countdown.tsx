import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
 onCountdownComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onCountdownComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        if (onCountdownComplete) {
          onCountdownComplete();
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (100 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && 
          newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && 
          newTimeLeft.seconds === 0) {
        setIsComplete(true);
        if (onCountdownComplete) {
          onCountdownComplete();
        }
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onCountdownComplete]);

  if (isComplete) {
    return null; // Countdown is complete, don't render anything
  }

  return (
    <div className="countdown-container bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative z-20">
      <h2 className="text-2xl font-bold text-center text-sky-300 mb-6">Countdown to Our Special Day</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-pink-600">{timeLeft.days}</div>
          <div className="text-sm text-gray-600 mt-1">Days</div>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-pink-600">{timeLeft.hours}</div>
          <div className="text-sm text-gray-600 mt-1">Hours</div>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-pink-600">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-600 mt-1">Minutes</div>
        </div>
        <div className="bg-pink-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-pink-600">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-600 mt-1">Seconds</div>
        </div>
      </div>
      <p className="text-center mt-6 text-gray-600">
        Please wait until our special day arrives to access the anniversary form.
      </p>
    </div>
  );
};

export default Countdown;