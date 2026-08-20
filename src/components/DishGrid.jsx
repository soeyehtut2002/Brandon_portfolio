import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import DishCard from './DishCard';
import { Search, Utensils, Sparkles } from 'lucide-react';

export default function DishGrid() {
  const { dishes, sections } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!sections.dishes?.visible) return null;

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(dishes.map((d) => d.category))];
    return cats;
  }, [dishes]);

  // Filtered dishes logic
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'All' || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, searchQuery]);

  return (
    <section id="dishes" className="py-24 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Utensils className="w-4 h-4" />
            <span>{sections.dishes.title || "Gastronomic Creations"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Signature Menu & Creations
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 font-light">
            Explore our multi-course creations crafted with precision, seasonal purity, and artistic balance.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-obsidian-900/80 p-1.5 rounded-full border border-obsidian-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-md shadow-gold-500/20'
                    : 'text-stone-300 hover:text-gold-400 hover:bg-obsidian-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ingredient, dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian-900 border border-obsidian-800 focus:border-gold-500/50 rounded-full pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid Display */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-2xl max-w-md mx-auto border border-obsidian-800">
            <Sparkles className="w-10 h-10 text-gold-500/40 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-semibold text-stone-200">
              No Dishes Found
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Try adjusting your category selection or search query.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
