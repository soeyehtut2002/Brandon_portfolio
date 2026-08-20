import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Clock, Wine, Sparkles, UtensilsCrossed, Quote, CheckCircle2, Leaf } from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDishModal, setSelectedDishModal } = usePortfolio();
  if (!selectedDishModal) return null;

  const dish = selectedDishModal;

  const ingredientsList = Array.isArray(dish.ingredients)
    ? dish.ingredients
    : (dish.ingredients || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md"
      onClick={() => setSelectedDishModal(null)}
    >
      <div
        className="relative w-full max-w-3xl bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-2xl my-4 sm:my-8 max-h-[92vh] flex flex-col transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Top Header Bar (matches screenshots) ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-theme-card shrink-0">
          <h2 className="text-lg font-serif font-bold text-theme-primary tracking-wide">
            About
          </h2>
          <button
            onClick={() => setSelectedDishModal(null)}
            className="p-1.5 rounded-full text-theme-muted hover:text-orange-500 hover:bg-theme-muted transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-8 leading-relaxed">
          {/* Section 1: About Description */}
          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
              {dish.name}
            </h3>
            <p className="text-sm sm:text-base text-theme-secondary font-light leading-relaxed">
              {dish.fullDescription || dish.shortDescription}
            </p>
          </div>

          {/* Section 2: Visual Presentation & Ingredients (matches screenshot layout) */}
          <div className="py-4 border-y border-theme">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Dish Image (Left side) */}
              <div className="sm:col-span-7 relative">
                <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg aspect-[4/3]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white shadow-md">
                      {dish.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Ingredients List with Icons (Right side) */}
              <div className="sm:col-span-5 space-y-2.5">
                <h4 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-3 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Key Ingredients</span>
                </h4>
                <ul className="space-y-2">
                  {ingredientsList.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-theme-primary uppercase">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variation Subtitle (matches screenshot "*This is a variation on...") */}
            <p className="text-center text-xs italic text-theme-muted mt-4">
              *This is a signature variation on {dish.name}.
            </p>
          </div>

          {/* Section 3: Recipe Guide (matches screenshot) */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-theme-primary">
              Recipe Guide
            </h3>
            <p className="text-sm text-theme-secondary font-light leading-relaxed">
              {dish.chefNote
                ? dish.chefNote
                : `At its foundation, ${dish.name} is crafted using fresh, seasonal ingredients cooked with precision. The consistency and flavor profile are carefully balanced using proprietary culinary techniques to deliver a dish that is both visually stunning and rich in flavor.`}
            </p>
          </div>

          {/* Section 4: Dietary & Wine Pairing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dish.dietary && dish.dietary.length > 0 && (
              <div className="p-4 rounded-xl bg-theme-muted border border-theme">
                <div className="text-xs uppercase tracking-wider text-orange-500 font-bold mb-2">Dietary Notes</div>
                <div className="flex flex-wrap gap-1.5">
                  {dish.dietary.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-theme-card text-theme-primary border border-theme">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {dish.pairing && (
              <div className="p-4 rounded-xl bg-theme-muted border border-theme flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-500 shrink-0 border border-orange-500/30">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-orange-500 font-bold mb-0.5">Recommended Pairing</div>
                  <div className="text-xs text-theme-primary font-serif font-semibold">{dish.pairing}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer Bar with Red Close Button (matches screenshot 1) ── */}
        <div className="p-4 bg-theme-card border-t border-theme flex items-center justify-between shrink-0">
          <span className="text-xs text-theme-muted hidden sm:inline">
            {dish.category} — {dish.name}
          </span>
          <button
            onClick={() => setSelectedDishModal(null)}
            className="ml-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
