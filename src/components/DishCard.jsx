import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Clock, Sparkles, ChevronRight, Eye, Flame } from 'lucide-react';

export default function DishCard({ dish }) {
  const { setSelectedDishModal } = usePortfolio();

  return (
    <div
      onClick={() => setSelectedDishModal(dish)}
      className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-obsidian-800 hover:border-gold-500/50 transition-all duration-500"
    >
      {/* Dish Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-obsidian-950">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-100"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {/* Badge Tag */}
          {dish.badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-obsidian-950/80 text-gold-400 border border-gold-500/40 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3 h-3 text-gold-400" />
              {dish.badge}
            </span>
          )}

          {/* Price Pill */}
          <span className="ml-auto px-3.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-md">
            {dish.price}
          </span>
        </div>

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-obsidian-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 text-obsidian-950 text-xs font-bold uppercase tracking-wider shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-4 h-4" />
            <span>Explore Detail</span>
          </button>
        </div>
      </div>

      {/* Dish Content Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Category & Prep Time */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span className="uppercase tracking-widest text-gold-400 font-semibold">
              {dish.category}
            </span>
            <div className="flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{dish.prepTime}</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-gold-400 transition-colors leading-snug line-clamp-2">
            {dish.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-400 font-light mt-2 line-clamp-2 leading-relaxed">
            {dish.shortDescription}
          </p>
        </div>

        {/* Footer info & tags */}
        <div className="pt-3 border-t border-obsidian-800/80 flex items-center justify-between">
          {/* Dietary badges preview */}
          <div className="flex flex-wrap gap-1.5">
            {dish.dietary?.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] bg-obsidian-800 text-stone-300 border border-obsidian-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-gold-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
            <span>View</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
