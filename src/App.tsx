import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PeoplePage from './pages/PeoplePage';
import UploadPage from './pages/UploadPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeoplePage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
