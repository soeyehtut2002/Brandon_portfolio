import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  X, Clock, Wine, Sparkles, UtensilsCrossed,
  Quote, CheckCircle2, CalendarCheck
} from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDishModal, setSelectedDishModal } = usePortfolio();
  if (!selectedDishModal) return null;

  const dish = selectedDishModal;

  const handleBookShortcut = () => {
    setSelectedDishModal(null);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl glass-card border border-theme rounded-3xl overflow-hidden shadow-2xl my-4 sm:my-8 max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={() => setSelectedDishModal(null)}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-theme-card text-theme-secondary hover:text-orange-500 border border-theme shadow-sm transition-all"
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-grow">
          {/* Hero Image */}
          <div className="relative h-56 sm:h-80 lg:h-96 w-full shrink-0">
            <img src={dish.image} alt={dish.name}
              className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white">
                  {dish.category}
                </span>
                {dish.badge && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-orange-500 border border-orange-200">
                    {dish.badge}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">{dish.name}</h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-theme-muted border border-theme">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-theme-muted">Price</div>
                <div className="text-lg sm:text-xl font-serif font-bold text-orange-500">{dish.price}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-theme-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" /> Prep Time
                </div>
                <div className="text-sm font-semibold text-theme-primary mt-0.5">{dish.prepTime}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[11px] uppercase tracking-wider text-theme-muted mb-1">Dietary</div>
                <div className="flex flex-wrap gap-1.5">
                  {dish.dietary?.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-theme-card text-orange-500 border border-theme">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-theme-primary mb-2 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-orange-400" /> About this Dish
              </h3>
              <p className="text-theme-secondary text-sm leading-relaxed font-light">{dish.fullDescription || dish.shortDescription}</p>
            </div>

            {/* Flavor Profile */}
            {dish.flavorProfile && (
              <div className="p-4 sm:p-6 rounded-2xl bg-theme-muted border border-theme">
                <h3 className="text-sm font-serif font-bold text-theme-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" /> Flavor Profile
                </h3>
                <div className="space-y-3">
                  {Object.entries(dish.flavorProfile).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="capitalize text-theme-secondary">{key}</span>
                        <span className="text-orange-500">{val}%</span>
                      </div>
                      <div className="w-full bg-theme-card h-2 rounded-full overflow-hidden border border-theme">
                        <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {dish.ingredients && (
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-theme-primary mb-3">Key Ingredients</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dish.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl glass-card border border-theme text-xs text-theme-primary">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pairing & Chef Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {dish.pairing && (
                <div className="p-4 sm:p-5 rounded-2xl bg-theme-muted border border-theme flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-theme-card text-orange-500 shrink-0 border border-theme">
                    <Wine className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1">Wine Pairing</h4>
                    <p className="text-xs text-theme-secondary font-serif leading-relaxed">{dish.pairing}</p>
                  </div>
                </div>
              )}
              {dish.chefNote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-theme-muted border border-theme relative">
                  <Quote className="w-6 h-6 text-orange-200 dark:text-orange-900/40 absolute top-3 right-3" />
                  <h4 className="text-xs uppercase tracking-wider text-orange-500 font-semibold mb-1">Chef's Note</h4>
                  <p className="text-xs italic text-theme-secondary font-serif leading-relaxed">"{dish.chefNote}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-5 bg-theme-muted border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-theme-muted hidden sm:block">
            {dish.name} — Chef's Signature Creation
          </div>
          <button onClick={handleBookShortcut}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-orange-500 text-white font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-orange-600 transition-all">
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
