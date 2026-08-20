import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { UtensilsCrossed, Settings, Menu, X, Award, Eye } from 'lucide-react';

export default function Navbar() {
  const { chefProfile, sections, isAdminOpen, setIsAdminOpen } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#bio', visible: sections.bio?.visible },
    { name: 'Signature Dishes', href: '#dishes', visible: sections.dishes?.visible },
    { name: 'Accolades', href: '#experience', visible: sections.experience?.visible },
    { name: 'Gallery', href: '#gallery', visible: sections.gallery?.visible },
    { name: 'Reviews', href: '#reviews', visible: sections.reviews?.visible },
    { name: 'Private Dining', href: '#contact', visible: sections.contact?.visible },
  ].filter(l => l.visible);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-obsidian-950/90 backdrop-blur-md border-b border-obsidian-800 shadow-2xl py-3'
          : 'bg-gradient-to-b from-obsidian-950/90 via-obsidian-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 p-[1px] shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-wider text-stone-100 group-hover:text-gold-400 transition-colors uppercase font-bold">
              Chef {chefProfile.name.split(' ')[0]}
            </span>
            <span className="text-[10px] tracking-widest text-stone-400 uppercase">
              {chefProfile.michelinStars} Michelin Stars
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-stone-300 hover:text-gold-400 transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Admin Switch Button */}
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md ${
              isAdminOpen
                ? 'bg-gold-500 text-obsidian-950 hover:bg-gold-400 shadow-gold-500/30'
                : 'bg-obsidian-800 text-gold-400 hover:bg-obsidian-700 border border-gold-500/30 hover:border-gold-500'
            }`}
          >
            {isAdminOpen ? (
              <>
                <Eye className="w-4 h-4" />
                <span>View Portfolio</span>
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Admin Dashboard</span>
              </>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-300 hover:text-gold-400 p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-900/95 backdrop-blur-xl border-b border-obsidian-800 px-6 py-6 transition-all shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-stone-200 hover:text-gold-400 py-2 border-b border-obsidian-800/50"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
