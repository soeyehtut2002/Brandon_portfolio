import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Landmark, Star, Trophy, Sparkles, MapPin } from 'lucide-react';

/* Badge → icon mapping */
const BADGE_ICONS = {
  default: Trophy,
  'michelin': Star,
  'star': Star,
  'award': Award,
  'artisan': Sparkles,
};

function getBadgeIcon(badge) {
  if (!badge) return BADGE_ICONS.default;
  const lower = badge.toLowerCase();
  for (const key of Object.keys(BADGE_ICONS)) {
    if (lower.includes(key)) return BADGE_ICONS[key];
  }
  return BADGE_ICONS.default;
}

/* Badge color variants cycling */
const BADGE_STYLES = [
  'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-500/15 dark:text-orange-400 dark:border-orange-500/30',
  'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30',
  'bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30',
  'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
  'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-400 dark:border-violet-500/30',
];

/* ── Single Experience Card ── */
function ExperienceCard({ item, index }) {
  const BadgeIcon = getBadgeIcon(item.badge);
  const badgeStyle = BADGE_STYLES[index % BADGE_STYLES.length];

  return (
    <div className="group relative glass-card border border-theme rounded-2xl sm:rounded-3xl overflow-hidden hover:border-orange-400/50 transition-all duration-400 flex flex-col">

      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

      {/* Card body */}
      <div className="p-5 sm:p-7 flex flex-col flex-grow gap-4">

        {/* Row 1: Year + Badge */}
        <div className="flex items-start justify-between gap-3">
          {/* Year */}
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-theme-muted font-semibold">Period</span>
            <span className="text-lg font-serif font-bold text-orange-500 leading-tight">{item.year}</span>
          </div>

          {/* Badge chip */}
          {item.badge && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle} shrink-0`}>
              <BadgeIcon className="w-3 h-3" />
              {item.badge}
            </span>
          )}
        </div>

        {/* Row 2: Role */}
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-theme-primary leading-snug group-hover:text-orange-500 transition-colors">
            {item.role}
          </h3>
        </div>

        {/* Row 3: Establishment */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-theme-muted border border-theme shrink-0">
            <Landmark className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <span className="text-xs font-semibold text-theme-secondary">{item.establishment}</span>
        </div>

        {/* Row 4: Description */}
        <p className="text-xs text-theme-muted leading-relaxed font-light flex-grow">
          {item.description}
        </p>
      </div>

      {/* Decorative large year in background */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 right-4 text-[72px] sm:text-[90px] font-serif font-black pointer-events-none select-none leading-none opacity-[0.035] text-orange-500"
      >
        {item.year?.split(' ')[0]?.replace('-', '')}
      </div>
    </div>
  );
}

/* ── Section ── */
export default function ExperienceAwards() {
  const { experience, sections } = usePortfolio();
  const [showAll, setShowAll] = useState(false);

  if (!sections.experience?.visible) return null;

  const PREVIEW_COUNT = 4;
  const displayed = showAll ? experience : experience.slice(0, PREVIEW_COUNT);
  const hasMore = experience.length > PREVIEW_COUNT;

  return (
    <section id="experience" className="py-24 relative bg-theme-secondary border-y border-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Award className="w-4 h-4" />
            <span>{sections.experience?.title || 'Recognitions'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">
            Awards & Career
          </h2>
          <p className="text-sm text-theme-muted mt-3 font-light max-w-lg mx-auto">
            A look at Chef Antoine's career journey, the restaurants he has worked at, and the awards he has earned.
          </p>
          <div className="divider-orange" />
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-12 sm:mb-16">
          {[
            { value: experience.length, label: 'Milestones' },
            { value: '3★',             label: 'Michelin Stars' },
            { value: '20+',            label: 'Years Cooking' },
          ].map(({ value, label }) => (
            <div key={label} className="glass-card border border-theme rounded-xl sm:rounded-2xl p-4 text-center hover:border-orange-300 transition-all">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-orange-500">{value}</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-theme-muted mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Card Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {displayed.map((item, idx) => (
            <ExperienceCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* ── Show More / Less ── */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(v => !v)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-orange-300 text-orange-500 text-xs font-semibold uppercase tracking-wider hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 glass-card"
            >
              <Sparkles className="w-4 h-4" />
              {showAll ? 'Show Less' : `View All ${experience.length} Milestones`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
