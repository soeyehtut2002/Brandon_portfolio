import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Camera, Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const { gallery, sections } = usePortfolio();
  const [activeTab, setActiveTab] = useState('All');
  const [activeImageModal, setActiveImageModal] = useState(null);

  if (!sections.gallery?.visible) return null;

  const categories = ['All', ...new Set(gallery.map(g => g.category))];
  const filteredGallery = activeTab === 'All' ? gallery : gallery.filter(g => g.category === activeTab);

  return (
    <section id="gallery" className="py-24 relative bg-theme-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Camera className="w-4 h-4" />
            <span>{sections.gallery.title || "Visual Masterpieces"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">
            My Photos
          </h2>
          <div className="divider-orange" />
        </div>

        {/* Tabs - scrollable on mobile */}
        <div className="flex justify-start sm:justify-center gap-2 mb-10 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${activeTab === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'glass-card text-theme-secondary border border-theme hover:text-orange-500 hover:border-orange-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImageModal(item)}
              className="group relative h-56 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-theme shadow-md hover:shadow-orange-200/30 transition-all"
            >
              <img src={item.image} alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-orange-300 font-bold block mb-1">{item.category}</span>
                  <h3 className="text-sm font-serif font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-2 rounded-full bg-white/90 text-orange-500 border border-orange-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeImageModal && (
        <div onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full glass-card border border-theme rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveImageModal(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-theme-card text-theme-secondary hover:text-orange-500 border border-theme shadow-sm z-10">
              <X className="w-5 h-5" />
            </button>
            <img src={activeImageModal.image} alt={activeImageModal.title}
              className="w-full max-h-[75vh] object-contain bg-theme-secondary" />
            <div className="p-4 border-t border-theme flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-orange-500 font-semibold">{activeImageModal.category}</span>
                <h3 className="text-lg font-serif font-bold text-theme-primary">{activeImageModal.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
