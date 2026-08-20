import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Sparkles, MapPin, Award } from 'lucide-react';

export default function ChefBio() {
  const { chefProfile, sections } = usePortfolio();

  if (!sections.bio?.visible) return null;

  return (
    <section id="bio" className="py-24 relative bg-theme-secondary border-y border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{sections.bio.title || "About the Chef"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">
            Meet the Chef
          </h2>
          <div className="divider-orange" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-300/30 via-transparent to-orange-200/20 blur-xl opacity-70" />
              <div className="relative rounded-2xl overflow-hidden border border-theme shadow-2xl group">
                <img
                  src={chefProfile.bioPortrait}
                  alt={chefProfile.name}
                  className="w-full h-[420px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                {/* Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-theme-card/90 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-theme shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-orange-500 font-semibold">Our Restaurant</p>
                    <p className="text-sm text-theme-primary font-serif font-semibold">{chefProfile.socials.restaurant}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-theme-muted text-orange-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-theme-primary font-semibold leading-snug">
              "Good food is made with care, skill, and the best ingredients."
            </h3>
            <p className="text-theme-secondary font-light leading-relaxed text-sm sm:text-base">
              Chef {chefProfile.name} trained in France and worked in top kitchens across Tokyo, Osaka, and Copenhagen. He brings a creative and modern style to every dish.
            </p>
            <p className="text-theme-muted font-light leading-relaxed text-sm">
              Every dish uses fresh, seasonal ingredients and is cooked with care and skill. The result is food that is beautiful to look at and wonderful to taste.
            </p>

            {/* Philosophy Card */}
            <div className="bg-theme-muted border border-theme p-5 sm:p-6 rounded-2xl border-l-4 border-l-orange-500 relative mt-2">
              <Quote className="w-7 h-7 text-orange-200 absolute top-4 right-4" />
              <p className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-2">Chef's Belief</p>
              <p className="text-sm italic text-theme-secondary leading-relaxed font-serif">"{chefProfile.philosophy}"</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl">
                <div className="p-2 bg-theme-muted text-orange-500 rounded-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-orange-400 uppercase tracking-wider">Awards</div>
                  <div className="text-sm font-semibold text-theme-primary">3 Michelin Stars</div>
                </div>
              </div>
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl">
                <div className="p-2 bg-theme-muted text-orange-500 rounded-lg shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-orange-400 uppercase tracking-wider">Style</div>
                  <div className="text-sm font-semibold text-theme-primary">Modern Fine Dining</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
