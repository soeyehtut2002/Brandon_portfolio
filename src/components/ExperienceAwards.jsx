import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Calendar, Landmark, Sparkles } from 'lucide-react';

export default function ExperienceAwards() {
  const { experience, sections } = usePortfolio();

  if (!sections.experience?.visible) return null;

  return (
    <section id="experience" className="py-24 relative bg-obsidian-900/60 border-y border-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4" />
            <span>{sections.experience.title || "Career Milestones"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Accolades & Heritage
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-obsidian-800">
          {experience.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative mb-12 flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-obsidian-950 border-2 border-gold-500 flex items-center justify-center text-gold-400 z-10 shadow-lg shadow-gold-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                {/* Content Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 px-4 md:px-8 w-full">
                  <div className="glass-panel p-6 rounded-2xl border border-obsidian-800 hover:border-gold-500/40 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        <span>{item.year}</span>
                      </span>

                      {item.badge && (
                        <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-100 mb-1">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold mb-3">
                      <Landmark className="w-3.5 h-3.5" />
                      <span>{item.establishment}</span>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
