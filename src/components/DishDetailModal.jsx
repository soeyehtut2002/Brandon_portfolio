import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X,
  Clock,
  Wine,
  Sparkles,
  UtensilsCrossed,
  Quote,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDishModal, setSelectedDishModal } = usePortfolio();

  if (!selectedDishModal) return null;

  const dish = selectedDishModal;

  const handleBookShortcut = () => {
    setSelectedDishModal(null);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-obsidian-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDishModal(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian-950/80 text-stone-300 hover:text-gold-400 hover:bg-obsidian-950 border border-stone-700/60 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-grow">
          {/* Hero Image Section */}
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-obsidian-950">
                  {dish.category}
                </span>
                {dish.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-obsidian-950/80 text-gold-400 border border-gold-500/40 backdrop-blur-md">
                    {dish.badge}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                {dish.name}
              </h2>
            </div>
          </div>

          {/* Details Body Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-obsidian-800">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400">
                  Investment
                </div>
                <div className="text-xl font-serif font-bold text-gold-400">
                  {dish.price}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>Prep Time</span>
                </div>
                <div className="text-base font-semibold text-stone-200 mt-0.5">
                  {dish.prepTime}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-2">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                  Dietary Accommodations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dish.dietary?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-obsidian-800 text-stone-300 border border-obsidian-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-100 mb-2 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-gold-400" />
                <span>Culinary Story</span>
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed font-light">
                {dish.fullDescription || dish.shortDescription}
              </p>
            </div>

            {/* Flavor Profile Sliders */}
            {dish.flavorProfile && (
              <div className="p-6 rounded-2xl glass-panel border border-obsidian-800">
                <h3 className="text-sm font-serif font-bold text-stone-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Sensory Flavor Profile</span>
                </h3>

                <div className="space-y-3">
                  {Object.entries(dish.flavorProfile).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="capitalize text-stone-300">{key}</span>
                        <span className="text-gold-400">{val}%</span>
                      </div>
                      <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden border border-obsidian-800">
                        <div
                          className="bg-gradient-to-r from-gold-600 to-gold-400 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients List */}
            {dish.ingredients && (
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-100 mb-3">
                  Key Artisanal Ingredients
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dish.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-800 text-xs text-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wine Pairing & Chef Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dish.pairing && (
                <div className="p-5 rounded-2xl bg-obsidian-950 border border-obsidian-800 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 shrink-0">
                    <Wine className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      Sommelier Wine Pairing
                    </h4>
                    <p className="text-xs text-stone-300 font-serif leading-relaxed">
                      {dish.pairing}
                    </p>
                  </div>
                </div>
              )}

              {dish.chefNote && (
                <div className="p-5 rounded-2xl bg-obsidian-950 border border-obsidian-800 relative">
                  <Quote className="w-6 h-6 text-gold-500/20 absolute top-3 right-3" />
                  <h4 className="text-xs uppercase tracking-wider text-gold-400 font-semibold mb-1">
                    Chef's Craft Note
                  </h4>
                  <p className="text-xs italic text-stone-300 font-serif leading-relaxed">
                    "{dish.chefNote}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-6 bg-obsidian-950 border-t border-obsidian-800 flex items-center justify-between">
          <div className="text-xs text-stone-400">
            Experiencing Chef {dish.name}
          </div>

          <button
            onClick={handleBookShortcut}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reserve Table for This Creation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
