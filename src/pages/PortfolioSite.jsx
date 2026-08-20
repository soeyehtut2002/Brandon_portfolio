import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ChefBio from '../components/ChefBio';
import DishGrid from '../components/DishGrid';
import ExperienceAwards from '../components/ExperienceAwards';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import ReservationSection from '../components/ReservationSection';
import Footer from '../components/Footer';
import DishDetailModal from '../components/DishDetailModal';

export default function PortfolioSite() {
  const { darkMode } = usePortfolio();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="relative min-h-screen bg-theme-primary text-theme-primary transition-colors duration-300">
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
      </div>
    </div>
  );
}
