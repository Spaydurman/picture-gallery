import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnniversarySuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has successfully entered the correct date
    const isCorrect = sessionStorage.getItem('anniversaryCorrect');
    
    // If the flag is not present or is not 'true', redirect back to the form
    if (isCorrect !== 'true') {
      navigate('/');
    } else {
      // Optionally clear the flag so it can't be reused
      // sessionStorage.removeItem('anniversaryCorrect');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-700 mb-6">You remembered our anniversary date!</p>
        <div className="text-6xl mb-6">🎉</div>
        <p className="text-gray-600">Welcome to our special page.</p>
      </div>
    </div>
  );
};

export default AnniversarySuccess;