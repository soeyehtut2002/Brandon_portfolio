import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { UtensilsCrossed, Star, Settings } from 'lucide-react';

export default function Footer() {
  const { chefProfile, setIsAdminOpen } = usePortfolio();

  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-800 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 border border-gold-500/40">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-200 text-lg">
              Chef {chefProfile.name}
            </h3>
            <p className="text-xs text-gold-400">
              {chefProfile.michelinStars}-Star Michelin Gastronomy
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider text-stone-400">
          <a href="#hero" className="hover:text-gold-400">Home</a>
          <a href="#bio" className="hover:text-gold-400">Philosophy</a>
          <a href="#dishes" className="hover:text-gold-400">Menu</a>
          <a href="#experience" className="hover:text-gold-400">Accolades</a>
          <a href="#contact" className="hover:text-gold-400">Private Dining</a>
        </div>

        {/* Copyright & Admin shortcut */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs">
          <p>© {new Date().getFullYear()} Chef {chefProfile.name}. All Rights Reserved.</p>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 text-stone-500 hover:text-gold-400 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Portal Access</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
