import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AnniversaryForm from './assets/page/AnniversaryForm';
import AnniversaryPage from './assets/page/Anniversary';

function App() {
  const [timestampKey] = useState(Date.now());

  // Check if countdown has completed before allowing access to anniversary routes
  const isCountdownComplete = () => {
    const countdownCompleted = sessionStorage.getItem('countdownCompleted');
    const targetDate = new Date('2025-10-14T00:00:00');
    const currentDate = new Date();
    return countdownCompleted === 'true' || currentDate >= targetDate;
  };

  // Protected route component
  const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return isCountdownComplete() ? children : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<AnniversaryForm />} />
      <Route path="/anniversary-success" element={
        <ProtectedRoute>
          <AnniversaryPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
