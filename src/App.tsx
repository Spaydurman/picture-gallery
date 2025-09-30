import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AnniversaryForm from './assets/page/AnniversaryForm';
import AnniversaryPage from './assets/page/Anniversary';

function App() {
  const [timestampKey] = useState(Date.now());

  return (
    <Routes>
      <Route path="/" element={<AnniversaryForm />} />
      <Route path="/anniversary-success" element={<AnniversaryPage />} />
    </Routes>
  );
}

export default App;
