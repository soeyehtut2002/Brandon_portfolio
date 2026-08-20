import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ChefBio from './components/ChefBio';
import DishGrid from './components/DishGrid';
import DishDetailModal from './components/DishDetailModal';
import ExperienceAwards from './components/ExperienceAwards';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ReservationSection from './components/ReservationSection';
import AdminDashboard from './components/Admin/AdminDashboard';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-obsidian-950 text-stone-200">
        <Navbar />
        <main>
          <Hero />
          <ChefBio />
          <DishGrid />
          <ExperienceAwards />
          <Gallery />
          <Reviews />
          <ReservationSection />
        </main>
        <Footer />
        <DishDetailModal />
        <AdminDashboard />
        <Toast />
      </div>
    </PortfolioProvider>
  );
}
