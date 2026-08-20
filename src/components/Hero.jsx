import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Star, Award, Compass, CalendarCheck, Utensils } from 'lucide-react';

export default function Hero() {
  const { chefProfile, sections } = usePortfolio();

  if (!sections.hero?.visible) return null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Ambient Glows */}
      <div className="absolute inset-0 z-0">
        <img
          src={chefProfile.heroImage}
          alt={chefProfile.name}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.4] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/60 to-obsidian-950/40" />
        <div className="absolute inset-0 bg-radial-gradient from-gold-500/10 via-transparent to-transparent opacity-80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Michelin Star Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-gold mb-6 border border-gold-500/30 shadow-lg shadow-gold-500/10">
          <div className="flex text-gold-400 gap-1">
            {[...Array(chefProfile.michelinStars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400 animate-pulse" />
            ))}
          </div>
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            {chefProfile.michelinStars}-Star Michelin Honoree
          </span>
        </div>

        {/* Title & Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-stone-100 tracking-tight leading-[1.15] mb-4">
          Chef <span className="gold-gradient-text">{chefProfile.name}</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-stone-300 font-serif italic max-w-3xl mb-6">
          "{chefProfile.tagline}"
        </p>

        <p className="text-sm sm:text-base text-stone-400 max-w-2xl font-light mb-10 leading-relaxed">
          {chefProfile.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
          <a
            href="#dishes"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:from-gold-400 hover:to-gold-500 transition-all shadow-xl shadow-gold-500/20 hover:scale-105"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Dishes</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-full glass-panel text-stone-200 hover:text-gold-400 border border-stone-700 hover:border-gold-500/50 font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4 text-gold-400" />
            <span>Book Private Dining</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 w-full max-w-3xl glass-panel p-6 rounded-2xl border border-obsidian-800">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
              {chefProfile.yearsExperience}+
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400 mt-1">
              Years of Mastery
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-obsidian-800/80 px-4">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
              {chefProfile.michelinStars} Stars
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400 mt-1">
              Michelin Guide
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-gold-400">
              {chefProfile.signatureDishesCount}+
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400 mt-1">
              Created Recipes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
