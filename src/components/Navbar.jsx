import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { UtensilsCrossed, Menu, X, Sun, Moon, Download } from 'lucide-react';

export default function Navbar() {
  const { chefProfile, sections, darkMode, toggleDarkMode } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Story',       href: '#bio',        visible: sections.bio?.visible },
    { name: 'Dishes',      href: '#dishes',     visible: sections.dishes?.visible },
    { name: 'Experience',  href: '#experience', visible: sections.experience?.visible },
    { name: 'Gallery',     href: '#gallery',    visible: sections.gallery?.visible },
    { name: 'Reviews',     href: '#reviews',    visible: sections.reviews?.visible },
    { name: 'Contact',     href: '#contact',    visible: sections.contact?.visible },
  ].filter(l => l.visible);

  const handleCVDownload = () => {
    const cvUrl = chefProfile.cvUrl || '#';
    if (cvUrl === '#') {
      // Generate a simple text CV as blob download
      const cvContent = `
CURRICULUM VITAE
================
${chefProfile.name}
${chefProfile.title}

CONTACT
-------
Email:      ${chefProfile.socials?.email || ''}
Phone:      ${chefProfile.socials?.phone || ''}
Restaurant: ${chefProfile.socials?.restaurant || ''}

PROFILE
-------
${chefProfile.philosophy || ''}

ACHIEVEMENTS
------------
• ${chefProfile.yearsExperience}+ Years of Culinary Mastery
• ${chefProfile.signatureDishesCount}+ Signature Recipes Created
      `.trim();

      const blob = new Blob([cvContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Chef_${chefProfile.name.replace(' ', '_')}_CV.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      window.open(cvUrl, '_blank');
    }
  };

  const navbarBg = scrolled
    ? 'bg-theme-card/95 backdrop-blur-md shadow-md border-b border-theme'
    : 'bg-theme-card/80 backdrop-blur-sm border-b border-theme';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navbarBg} ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Brand / Logo ── */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 p-[1.5px] shadow-lg shadow-orange-300/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-theme-card rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base tracking-wider text-theme-primary group-hover:text-orange-500 transition-colors uppercase font-bold">
                Chef {chefProfile.name.split(' ')[0]}
              </span>
              <span className="text-[9px] tracking-widest text-orange-400 uppercase hidden sm:block">
                {chefProfile.title || 'Executive Chef'}
              </span>
            </div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] uppercase tracking-widest text-theme-muted hover:text-orange-500 transition-colors font-medium relative py-1
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
                  after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none
                border border-theme flex items-center px-1
                bg-theme-muted hover:border-orange-400"
              aria-label="Toggle dark mode"
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                  ${darkMode
                    ? 'translate-x-5 bg-orange-500'
                    : 'translate-x-0 bg-orange-400'
                  }`}
              >
                {darkMode
                  ? <Moon className="w-2.5 h-2.5 text-white" />
                  : <Sun className="w-2.5 h-2.5 text-white" />
                }
              </span>
            </button>

            {/* CV Download — hidden on very small screens */}
            <button
              onClick={handleCVDownload}
              title="Download CV"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-orange-50 dark:bg-orange-500/10 text-orange-500 border border-orange-200 dark:border-orange-500/30
                hover:bg-orange-500 hover:text-white hover:border-orange-500
                text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download CV</span>
            </button>


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-theme-secondary hover:text-orange-500 hover:bg-theme-muted transition-all"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ══ Mobile Drawer ══ */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-theme-card border-t border-theme px-4 py-5 space-y-1 shadow-xl">

          {/* Nav Links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm text-theme-secondary hover:text-orange-500 hover:bg-theme-muted transition-all uppercase tracking-widest font-medium"
            >
              {link.name}
            </a>
          ))}

          {/* Divider */}
          <div className="border-t border-theme my-3" />

          {/* Mobile Actions Row */}
          <div className="flex items-center gap-2 px-1">

            {/* Dark mode label + toggle */}
            <div className="flex items-center gap-2 flex-1">
              {darkMode ? <Moon className="w-4 h-4 text-orange-400" /> : <Sun className="w-4 h-4 text-orange-400" />}
              <span className="text-xs text-theme-muted uppercase tracking-wider">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggleDarkMode}
                className={`ml-auto relative w-11 h-5.5 rounded-full border border-theme flex items-center px-0.5 transition-colors duration-300 bg-theme-muted`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${darkMode ? 'translate-x-5 bg-orange-500' : 'translate-x-0 bg-orange-400'}`}>
                  {darkMode ? <Moon className="w-2.5 h-2.5 text-white" /> : <Sun className="w-2.5 h-2.5 text-white" />}
                </span>
              </button>
            </div>
          </div>

          <div className="flex gap-2 px-1 mt-2">
            {/* CV Download */}
            <button
              onClick={() => { handleCVDownload(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                bg-orange-50 dark:bg-orange-500/10 text-orange-500 border border-orange-200 dark:border-orange-500/30
                hover:bg-orange-500 hover:text-white hover:border-orange-500
                text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>


          </div>
        </div>
      </div>
    </header>
  );
}
