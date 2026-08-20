import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Clock, Sparkles, ChevronRight, Eye } from 'lucide-react';

export default function DishCard({ dish }) {
  const { setSelectedDishModal } = usePortfolio();

  return (
    <div
      onClick={() => setSelectedDishModal(dish)}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-theme hover:border-orange-400/60 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-theme-secondary">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {dish.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-theme-card/90 text-orange-500 border border-theme backdrop-blur-md shadow-md">
              <Sparkles className="w-3 h-3" />
              {dish.badge}
            </span>
          )}
          <span className="ml-auto px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500 text-white shadow-md">
            {dish.price}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-orange-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-orange-500 text-xs font-bold uppercase tracking-wider shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-4 h-4" />
            <span>View Detail</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3 bg-theme-card">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="uppercase tracking-widest text-orange-500 font-semibold">{dish.category}</span>
            <div className="flex items-center gap-1 text-theme-muted">
              <Clock className="w-3.5 h-3.5" />
              <span>{dish.prepTime}</span>
            </div>
          </div>
          <h3 className="text-lg font-serif font-bold text-theme-primary group-hover:text-orange-500 transition-colors leading-snug line-clamp-2">
            {dish.name}
          </h3>
          <p className="text-xs text-theme-muted font-light mt-1.5 line-clamp-2 leading-relaxed">
            {dish.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-theme flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {dish.dietary?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-theme-muted text-orange-500 border border-theme">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-orange-500 text-xs font-semibold group-hover:translate-x-1 transition-transform">
            <span>View</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
