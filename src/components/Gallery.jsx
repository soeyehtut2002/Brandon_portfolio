import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Camera, Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const { gallery, sections } = usePortfolio();
  const [activeTab, setActiveTab] = useState('All');
  const [activeImageModal, setActiveImageModal] = useState(null);

  if (!sections.gallery?.visible) return null;

  const categories = ['All', ...new Set(gallery.map((g) => g.category))];

  const filteredGallery =
    activeTab === 'All'
      ? gallery
      : gallery.filter((g) => g.category === activeTab);

  return (
    <section id="gallery" className="py-24 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Camera className="w-4 h-4" />
            <span>{sections.gallery.title || "Visual Masterpieces"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Atmosphere & Culinary Art
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === cat
                  ? 'bg-gold-500 text-obsidian-950 shadow-md'
                  : 'glass-panel text-stone-300 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImageModal(item)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-obsidian-800 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-serif font-bold text-stone-100">
                    {item.title}
                  </h3>
                </div>

                <div className="p-2 rounded-full bg-obsidian-950/80 text-gold-400 border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageModal && (
        <div
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-obsidian-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            className="relative max-w-4xl w-full bg-obsidian-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-950 text-stone-200 hover:text-gold-400"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImageModal.image}
              alt={activeImageModal.title}
              className="w-full max-h-[80vh] object-contain bg-obsidian-950"
            />
            <div className="p-4 bg-obsidian-900 border-t border-obsidian-800 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  {activeImageModal.category}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  {activeImageModal.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
