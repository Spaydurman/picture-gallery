import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../../ui/floating-hearts';
import Clouds from '../../ui/cloud';

const AnniversaryForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Define the correct anniversary date (in YYYY-MM-DD format)
  const correctAnniversaryDate = '2025-10-14'; // Example date

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      setError('Please select a date');
      return;
    }

    // Check if the selected date matches the correct anniversary date
    if (selectedDate === correctAnniversaryDate) {
      // Store a flag in sessionStorage to indicate the correct date was entered
      sessionStorage.setItem('anniversaryCorrect', 'true');
      // Redirect to a different page when the correct date is entered
      navigate('/anniversary-success');
    } else {
      setError('Incorrect date. Please try again.');
    }
  };

 return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-pink-300 to-sky-300 p-4 relative">
     <Clouds />
     <FloatingHearts />
     <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative z-20">
       <h1 className="text-3xl font-bold text-center text-sky-300 mb-6">Our Anniversary</h1>
       <p className="text-gray-60 text-center mb-8">
         When is our anniversary? Select the date to find out!
       </p>
       
       <form onSubmit={handleSubmit} className="space-y-6">
         <div className="flex flex-col">
           <label htmlFor="anniversary-date" className="text-lg font-medium text-gray-700 mb-2">
             Select Anniversary Date
           </label>
           <input
             id="anniversary-date"
             type="date"
             value={selectedDate}
             onChange={(e) => setSelectedDate(e.target.value)}
             className="border-2 border-pink-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
           />
         </div>
         
         {error && (
           <div className="text-red-400 text-center font-medium">
             {error}
           </div>
         )}
         
         <button
           type="submit"
           className="w-full bg-pink-50 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300 transform hover:scale-105"
         >
           Submit
         </button>
       </form>
     </div>
   </div>
 );
};

export default AnniversaryForm;