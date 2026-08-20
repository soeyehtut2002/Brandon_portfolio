import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, Sparkles, ChevronRight, Eye, ChevronLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

/* ─────────────────────────────────────────
   Slide Card
───────────────────────────────────────── */
function SlideCard({ dish, onOpen }) {
  return (
    <div
      onClick={() => onOpen(dish)}
      className="group relative flex flex-col h-full cursor-pointer overflow-hidden rounded-2xl border border-theme bg-theme-card shadow-md hover:shadow-xl transition-all duration-500 select-none"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-theme-secondary" style={{ height: 220 }}>
        <img
          src={dish.image}
          alt={dish.name}
          draggable="false"
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          {dish.badge ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-theme-card/90 text-orange-500 border border-theme backdrop-blur-md shadow">
              <Sparkles className="w-3 h-3" /> {dish.badge}
            </span>
          ) : <span />}
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-500 text-white shadow-md">
            {dish.price}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-orange-900/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-orange-500 text-xs font-bold uppercase tracking-wider shadow-xl translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" /> View Detail
          </span>
        </div>

        {/* Name on image */}
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] uppercase tracking-widest text-orange-300 font-bold block mb-0.5">{dish.category}</span>
          <h3 className="text-base font-serif font-bold text-white leading-snug line-clamp-2 group-hover:text-orange-200 transition-colors">
            {dish.name}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-theme-card">
        <p className="text-xs text-theme-muted font-light leading-relaxed line-clamp-2">
          {dish.shortDescription}
        </p>
        <div className="pt-3 border-t border-theme flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {dish.dietary?.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-theme-muted text-orange-500 border border-theme">{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-theme-muted text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{dish.prepTime}</span>
            <ChevronRight className="w-4 h-4 text-orange-500 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Carousel
───────────────────────────────────────── */
export default function DishCarousel({ dishes, onOpen }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  // drag / touch state
  const dragStartX = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  /* ── measure container & compute visible cards ── */
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    setContainerWidth(w);
    const v = w < 640 ? 1 : w < 1024 ? 2 : 3;
    setVisible(v);
    setCurrentIndex(idx => Math.min(idx, Math.max(0, dishes.length - v)));
  }, [dishes.length]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const cardWidth = containerWidth > 0 ? containerWidth / visible : 0;
  const gap = 12; // px — matches px-1.5 padding on each side
  const maxIndex = Math.max(0, dishes.length - visible);

  const go = useCallback((dir) => {
    setCurrentIndex(i => Math.max(0, Math.min(maxIndex, i + dir)));
    setDragOffset(0);
  }, [maxIndex]);

  /* ── drag helpers ── */
  const startDrag = (x) => { dragStartX.current = x; isDragging.current = true; };
  const moveDrag = (x) => {
    if (!isDragging.current || dragStartX.current === null) return;
    setDragOffset(x - dragStartX.current);
  };
  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = cardWidth * 0.25;
    if (dragOffset < -threshold) go(1);
    else if (dragOffset > threshold) go(-1);
    setDragOffset(0);
    dragStartX.current = null;
  };

  const translateX = -(currentIndex * cardWidth) + dragOffset;

  return (
    <div className="relative px-0 sm:px-8 lg:px-10">
      {/* ── Overflow window ── */}
      <div
        ref={containerRef}
        className="overflow-hidden w-full"
        /* Mouse */
        onMouseDown={e => startDrag(e.clientX)}
        onMouseMove={e => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        /* Touch */
        onTouchStart={e => startDrag(e.touches[0].clientX)}
        onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX); }}
        onTouchEnd={endDrag}
        style={{ touchAction: 'pan-y' }}
      >
        {/* ── Track (exact pixel width) ── */}
        <div
          className="flex"
          style={{
            width: `${dishes.length * cardWidth}px`,
            transform: `translateX(${translateX}px)`,
            transition: isDragging.current ? 'none' : 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
            willChange: 'transform',
          }}
        >
          {dishes.map(dish => (
            <div
              key={dish.id}
              style={{ width: `${cardWidth}px`, flexShrink: 0, paddingLeft: gap / 2, paddingRight: gap / 2 }}
            >
              <SlideCard dish={dish} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop Arrow Buttons ── */}
      {['left', 'right'].map(dir => {
        const isLeft = dir === 'left';
        const disabled = isLeft ? currentIndex === 0 : currentIndex >= maxIndex;
        return (
          <button
            key={dir}
            onClick={() => go(isLeft ? -1 : 1)}
            disabled={disabled}
            aria-label={isLeft ? 'Previous' : 'Next'}
            className={`
              hidden sm:flex absolute top-1/2 -translate-y-1/2
              ${isLeft ? 'left-0' : 'right-0'}
              w-10 h-10 rounded-full items-center justify-center z-20
              border border-theme bg-theme-card shadow-lg transition-all duration-200
              ${disabled
                ? 'text-theme-muted opacity-25 cursor-not-allowed'
                : 'text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110'}
            `}
          >
            {isLeft ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        );
      })}

      {/* ── Mobile: dots + prev/next ── */}
      <div className="flex sm:hidden items-center justify-between mt-5 px-1">
        <button onClick={() => go(-1)} disabled={currentIndex === 0}
          className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${currentIndex === 0 ? 'text-theme-muted opacity-30' : 'text-orange-500'}`}>
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <div className="flex items-center gap-1.5">
          {dishes.map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 h-2 bg-orange-500' : 'w-2 h-2 bg-theme-muted hover:bg-orange-300'}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        <button onClick={() => go(1)} disabled={currentIndex >= maxIndex}
          className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${currentIndex >= maxIndex ? 'text-theme-muted opacity-30' : 'text-orange-500'}`}>
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Desktop: progress bar ── */}
      {dishes.length > visible && (
        <div className="hidden sm:flex items-center justify-center gap-3 mt-8">
          <div className="relative w-48 h-1 bg-theme-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((currentIndex + visible) / dishes.length) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-theme-muted tabular-nums">
            {currentIndex + 1}–{Math.min(currentIndex + visible, dishes.length)}&nbsp;/&nbsp;{dishes.length}
          </span>
        </div>
      )}
    </div>
  );
}
