import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { UtensilsCrossed, Settings, Sun, Moon, Download } from 'lucide-react';

export default function Footer() {
  const { chefProfile, darkMode, toggleDarkMode } = usePortfolio();

  const handleCVDownload = () => {
    const cvContent = `
CURRICULUM VITAE
================
${chefProfile.name}
${chefProfile.title || 'Executive Chef'}

CONTACT
-------
Email:  ${chefProfile.socials?.email || ''}
Phone:  ${chefProfile.socials?.phone || ''}

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
  };

  return (
    <footer className="bg-charcoal-900 dark:bg-[#07080d] border-t border-white/10 text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/40">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg">Chef {chefProfile.name}</h3>
              <p className="text-xs text-orange-400">Fine Dining & Culinary Art</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs uppercase tracking-wider text-white/50">
            {[
              { label: 'Home',         href: '#hero' },
              { label: 'Story',        href: '#bio' },
              { label: 'Menu',         href: '#dishes' },
              { label: 'Accolades',    href: '#experience' },
              { label: 'Private Dining', href: '#contact' },
            ].map(l => (
              <a key={l.label} href={l.href} className="hover:text-orange-400 transition-colors">{l.label}</a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center md:items-end gap-3 text-xs">
            <p className="text-white/40">© {new Date().getFullYear()} Chef {chefProfile.name}. All Rights Reserved.</p>

            <div className="flex items-center gap-2">
              {/* CV Download */}
              <button onClick={handleCVDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all text-[11px] font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>

              {/* Dark Mode Toggle */}
              <button onClick={toggleDarkMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-all text-[11px]">
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>

              {/* Admin */}
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/10 hover:border-orange-500/50 hover:text-orange-400 transition-all text-[11px]">
                <Settings className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
