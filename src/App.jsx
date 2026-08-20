import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import PortfolioSite from './pages/PortfolioSite';
import AdminPage from './pages/AdminPage';
import Toast from './components/Toast';

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioSite />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
