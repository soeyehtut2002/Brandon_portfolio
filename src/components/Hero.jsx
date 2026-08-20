import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, CalendarCheck, Utensils, Download, Award } from 'lucide-react';

export default function Hero() {
  const { chefProfile, sections } = usePortfolio();

  const handleCVDownload = () => {
    const cvContent = `CURRICULUM VITAE\n${'='.repeat(40)}\nChef ${chefProfile.name}\n${chefProfile.title || 'Executive Chef'}\n\nPhilosophy:\n${chefProfile.philosophy || ''}\n\nAchievements:\n• ${chefProfile.yearsExperience}+ Years Experience\n• ${chefProfile.signatureDishesCount}+ Signature Recipes`.trim();
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Chef_${chefProfile.name.replace(' ', '_')}_CV.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!sections.hero?.visible) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={chefProfile.heroImage}
          alt={chefProfile.name}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.55]"
        />
        {/* Warm orange-tinted overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-800/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-orange-800/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Intern / Graduate Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 bg-white/15 border border-white/30 backdrop-blur-md shadow-lg">
          <div className="flex text-orange-300 gap-1">
            <Award className="w-4 h-4 text-orange-300" />
          </div>
          <span className="text-xs uppercase tracking-widest text-orange-100 font-semibold">
            Culinary Graduate & Aspiring Intern
          </span>
        </div>

        {/* Title & Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.15] mb-4 drop-shadow-lg">
          Chef <span className="orange-gradient-text" style={{ WebkitTextFillColor: 'unset', background: 'none', color: '#ffb87a' }}>{chefProfile.name}</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-orange-100 font-serif italic max-w-3xl mb-6 drop-shadow">
          "{chefProfile.tagline}"
        </p>

        <p className="text-sm sm:text-base text-white/75 max-w-2xl font-light mb-10 leading-relaxed">
          {chefProfile.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <a
            href="#dishes"
            className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-400 transition-all shadow-xl shadow-orange-500/30 hover:scale-105"
          >
            <Utensils className="w-4 h-4" />
            <span>My Creations</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/40 font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 backdrop-blur-sm"
          >
            <CalendarCheck className="w-4 h-4 text-orange-200" />
            <span>Contact Me</span>
          </a>

          <button
            onClick={handleCVDownload}
            className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/30 font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 backdrop-blur-sm"
          >
            <Download className="w-4 h-4 text-orange-200" />
            <span>Get Resume / CV</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 w-full max-w-3xl bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/25 shadow-xl">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-orange-200">
              {chefProfile.yearsExperience}+
            </span>
            <span className="text-xs uppercase tracking-widest text-white/70 mt-1">
              Years of Cooking
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-white/20 px-4">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-orange-200">
              Fine
            </span>
            <span className="text-xs uppercase tracking-widest text-white/70 mt-1">
              Dining Cuisine
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-orange-200">
              {chefProfile.signatureDishesCount}+
            </span>
            <span className="text-xs uppercase tracking-widest text-white/70 mt-1">
              Created Recipes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
