import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import DishCarousel from './DishCarousel';
import { Search, Utensils, Sparkles } from 'lucide-react';

export default function DishGrid() {
  const { dishes, sections, setSelectedDishModal } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!sections.dishes?.visible) return null;

  const categories = useMemo(() => ['All', ...new Set(dishes.map(d => d.category))], [dishes]);

  const filteredDishes = useMemo(() => dishes.filter(dish => {
    const matchCat = selectedCategory === 'All' || dish.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      dish.name.toLowerCase().includes(q) ||
      dish.shortDescription?.toLowerCase().includes(q) ||
      dish.ingredients?.some(i => i.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [dishes, selectedCategory, searchQuery]);

  return (
    <section id="dishes" className="py-24 relative bg-theme-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Utensils className="w-4 h-4" />
            <span>{sections.dishes?.title || 'Our Menu'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">
            Our Signature Dishes
          </h2>
          <p className="text-sm sm:text-base text-theme-muted mt-3 font-light max-w-xl mx-auto">
            Explore our dishes made with fresh, quality ingredients and real cooking skill.
          </p>
          <div className="divider-orange" />
        </div>

        {/* Filter + Search Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">

          {/* Category Pills — scrollable on mobile */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <div className="flex items-center gap-2 min-w-max sm:min-w-0 bg-theme-card border border-theme rounded-full p-1.5 shadow-sm">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-theme-secondary hover:text-orange-500 hover:bg-theme-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-orange-300 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search dish, ingredient..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-theme w-full rounded-full pl-10 pr-4 py-2.5 text-xs shadow-sm"
            />
          </div>
        </div>

        {/* Carousel or Empty State */}
        {filteredDishes.length > 0 ? (
          <DishCarousel dishes={filteredDishes} onOpen={setSelectedDishModal} />
        ) : (
          <div className="glass-card border border-theme p-10 text-center rounded-2xl max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-orange-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-semibold text-theme-primary">No Dishes Found</h3>
            <p className="text-xs text-theme-muted mt-1">Try a different category or search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
