import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  const { reviews, sections } = usePortfolio();

  if (!sections.reviews?.visible) return null;

  return (
    <section id="reviews" className="py-24 relative bg-obsidian-900/60 border-y border-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>{sections.reviews.title || "Critical Acclaim"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            What Critics Say
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-8 rounded-2xl border border-obsidian-800 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-gold-500/20 absolute top-6 right-6" />

              <div>
                {/* Rating stars */}
                <div className="flex text-gold-400 gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                <p className="text-sm italic text-stone-300 font-serif leading-relaxed mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-obsidian-800/80">
                <img
                  src={rev.avatar}
                  alt={rev.critic}
                  className="w-12 h-12 rounded-full object-cover border border-gold-500/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-stone-100 font-serif">
                    {rev.critic}
                  </h3>
                  <p className="text-xs text-gold-400 font-semibold">
                    {rev.publication}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
