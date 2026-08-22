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
    const cvUrl = chefProfile.cvUrl || '';

    if (cvUrl.startsWith('data:application/pdf')) {
      // base64 PDF — trigger direct download
      const a = document.createElement('a');
      a.href = cvUrl;
      a.download = `Chef_${chefProfile.name.replace(/ /g, '_')}_CV.pdf`;
      a.click();
    } else if (cvUrl && cvUrl !== '#') {
      // External URL — open in new tab
      window.open(cvUrl, '_blank');
    } else {
      // Fallback — generate plain text CV
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
      a.download = `Chef_${chefProfile.name.replace(/ /g, '_')}_CV.txt`;
      a.click();
      URL.revokeObjectURL(url);
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

      {/* ══ Mobile Menu Backdrop ══ */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ══ Mobile Menu Dropdown Panel ══ */}
      <div
        className={`lg:hidden fixed top-[60px] left-0 right-0 z-40 bg-theme-card/95 backdrop-blur-2xl border-b border-theme shadow-2xl transition-all duration-300 ease-out transform ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto p-5 space-y-3">
          {/* Nav Grid Links */}
          <nav className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-theme-muted/60 border border-theme/80 hover:border-orange-500/50 hover:bg-orange-500/10 text-theme-primary hover:text-orange-500 transition-all font-semibold text-xs uppercase tracking-wider"
              >
                <span>{link.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/60" />
              </a>
            ))}
          </nav>

          {/* Theme & CV Action Row */}
          <div className="pt-3 border-t border-theme flex items-center gap-3">
            <div className="flex-1 flex items-center justify-between p-3 rounded-2xl bg-theme-muted/60 border border-theme">
              <span className="text-[11px] font-bold uppercase tracking-wider text-theme-muted">Theme</span>
              <button
                onClick={toggleDarkMode}
                className="relative w-11 h-6 rounded-full bg-theme-secondary border border-theme flex items-center px-1"
              >
                <span
                  className={`w-4 h-4 rounded-full bg-orange-500 shadow-md transition-transform duration-300 flex items-center justify-center ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {darkMode ? <Moon className="w-2.5 h-2.5 text-white" /> : <Sun className="w-2.5 h-2.5 text-white" />}
                </span>
              </button>
            </div>

            <button
              onClick={() => { handleCVDownload(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>CV</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
