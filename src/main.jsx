import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import TempleBound from './TempleBound';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/TempleBound" element={<TempleBound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
