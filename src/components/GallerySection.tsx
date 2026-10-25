import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  src: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'forecourt',
    title: 'Station Forecourt & Multi-Bay Canopy',
    category: 'Forecourt Infrastructure',
    src: '/images/forecourt_main.jpg',
    caption: 'Spacious entry and exit lanes designed for high-throughput passenger cars, buses, and commercial transport.',
  },
  {
    id: 'washroom_facility',
    title: 'Sanitized Washroom & Traveler Rest Facilities',
    category: 'Hygienic Amenities',
    src: '/images/dispensers_canopy.jpg',
    caption: 'Clean, dedicated washrooms with continuous running water, liquid soap, and sanitary facilities for travelers and families.',
  },
  {
    id: 'air_station',
    title: 'Free Digital Air Inflation Station',
    category: 'Tire Services',
    src: '/images/air_station.jpg',
    caption: 'Dedicated digital pressure gauges with dual nozzles for heavy duty commercial tires and two-wheelers.',
  },
  {
    id: 'urea_station',
    title: 'Certified DEF Urea (AUS 32) Stock & Depot',
    category: 'BS-VI Fleet Station',
    src: '/images/urea_station.jpg',
    caption: 'Premium quality diesel exhaust fluid (DEF) available in high-volume dispensing and certified sealed containers.',
  },
  {
    id: 'pump_evening',
    title: 'Illuminated 24/7 Evening Station Landmark',
    category: 'Night Operations',
    src: '/images/pump_evening.jpg',
    caption: 'Well-lit, secure highway sanctuary on the Mathura-Hathras highway corridor open round the clock.',
  },
];

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
              <Camera className="w-4 h-4" />
              <span>Verified On-Site Imagery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Station & Facility Gallery
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              Take a visual tour of our forecourt, computerized fueling bays, DEF urea storage, 
              and tire inflation amenities at Mehdipur Balaji Automobile.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl cursor-pointer bg-slate-900 h-64 sm:h-72 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={() => setActivePhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors z-20"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={GALLERY_ITEMS[activePhotoIndex].src}
                alt={GALLERY_ITEMS[activePhotoIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 text-white bg-slate-900">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                {GALLERY_ITEMS[activePhotoIndex].category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {GALLERY_ITEMS[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {GALLERY_ITEMS[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
