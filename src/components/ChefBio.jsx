import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, Sparkles, MapPin, Award } from 'lucide-react';

export default function ChefBio() {
  const { chefProfile, sections } = usePortfolio();

  if (!sections.bio?.visible) return null;

  return (
    <section id="bio" className="py-24 relative bg-obsidian-900/60 border-y border-obsidian-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{sections.bio.title || "The Culinary Journey"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Artistry & Gastronomy
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-gold-500/20 via-transparent to-gold-400/10 blur-xl opacity-70" />

              <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl group">
                <img
                  src={chefProfile.bioPortrait}
                  alt={chefProfile.name}
                  className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

                {/* Bottom Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-obsidian-700/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                      Flagship Establishment
                    </p>
                    <p className="text-sm text-stone-200 font-serif font-semibold">
                      {chefProfile.socials.restaurant}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-gold-500/20 text-gold-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif text-stone-100 font-semibold leading-snug">
              "Cooking is an intimate conversation between nature's harvest and human emotion."
            </h3>

            <p className="text-stone-300 font-light leading-relaxed text-base">
              Trained under legendary French culinary masters and seasoned across the vibrant markets of Tokyo, Osaka, and Copenhagen, Chef {chefProfile.name} brings an avant-garde approach to fine dining.
            </p>

            <p className="text-stone-400 font-light leading-relaxed text-sm">
              Each dish is designed as a multisensory masterpiece—combining pristine seasonal ingredients, precise thermal technique, and artistic plating that honours the natural purity of every element.
            </p>

            {/* Philosophy Card */}
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-gold-500 relative mt-4">
              <Quote className="w-8 h-8 text-gold-500/20 absolute top-4 right-4" />
              <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-2">
                Chef's Philosophy
              </p>
              <p className="text-sm italic text-stone-300 leading-relaxed font-serif">
                "{chefProfile.philosophy}"
              </p>
            </div>

            {/* Signature Metrics List */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 glass-panel p-3 rounded-xl">
                <div className="p-2 bg-gold-500/10 text-gold-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider">Accolades</div>
                  <div className="text-sm font-semibold text-stone-200">3 Michelin Stars</div>
                </div>
              </div>

              <div className="flex items-center gap-3 glass-panel p-3 rounded-xl">
                <div className="p-2 bg-gold-500/10 text-gold-400 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-400 uppercase tracking-wider">Style</div>
                  <div className="text-sm font-semibold text-stone-200">Modern Avant-Garde</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
