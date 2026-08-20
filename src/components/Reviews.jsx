import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  const { reviews, sections } = usePortfolio();
  if (!sections.reviews?.visible) return null;

  return (
    <section id="reviews" className="py-24 relative bg-theme-secondary border-y border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>{sections.reviews.title || "Critical Acclaim"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">What People Say</h2>
          <div className="divider-orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map(rev => (
            <div key={rev.id} className="glass-card p-6 sm:p-8 rounded-2xl border border-theme flex flex-col justify-between relative group hover:border-orange-300 transition-all">
              <Quote className="w-10 h-10 text-orange-100 dark:text-orange-900/40 absolute top-5 right-5" />
              <div>
                <div className="flex text-orange-400 gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm italic text-theme-secondary font-serif leading-relaxed mb-6">"{rev.quote}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-theme">
                <img src={rev.avatar} alt={rev.critic}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-200" />
                <div>
                  <h3 className="text-sm font-bold text-theme-primary font-serif">{rev.critic}</h3>
                  <p className="text-xs text-orange-500 font-semibold">{rev.publication}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
