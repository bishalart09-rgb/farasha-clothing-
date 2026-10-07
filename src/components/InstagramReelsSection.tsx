import React, { useState, useRef } from 'react';
import { Play, Clapperboard, Eye, Heart, Music2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { REELS_DATA } from '../data/products';
import { ReelItem } from '../types';
import { RaiseUp } from './RaiseUp';
import { motion, AnimatePresence } from 'motion/react';

export const InstagramReelsSection: React.FC = () => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D8] overflow-hidden relative">
      {/* Subtle luxury ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RaiseUp yOffset={28} className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>EDITORIAL IN MOTION</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide mb-2">
            AS SEEN ON INSTAGRAM
          </h2>

          {/* Instagram Account Name */}
          <div className="text-xs sm:text-sm font-medium tracking-[0.25em] text-[#9E7D4E] uppercase mb-3">
            @farasha_clothing
          </div>

          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-3.5" />

          <p className="text-xs sm:text-sm text-[#736B60] font-light leading-relaxed">
            Graceful drapes, bespoke styling sessions, and timeless couture moments captured from our Dubai and Sharjah ateliers.
          </p>
        </RaiseUp>

        {/* Desktop Carousel Controls */}
        <div className="hidden lg:flex items-center justify-end gap-2 mb-4 -mt-6">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-[#DCD5C9] bg-white text-[#5C554B] hover:text-[#171717] hover:border-[#171717] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous reels"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-[#DCD5C9] bg-white text-[#5C554B] hover:text-[#171717] hover:border-[#171717] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next reels"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 9:16 Vertical Reel Showcase */}
        {/* Mobile: Horizontally swipeable with snap scroll | Desktop: Clean 5-card row */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-5 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {REELS_DATA.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              onClick={() => setActiveReel(reel)}
              className="group relative aspect-[9/16] w-[220px] sm:w-[250px] lg:w-auto shrink-0 lg:shrink snap-center rounded-lg overflow-hidden bg-[#1E1C1A] border border-[#E8DFD3] hover:border-[#C5A880] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer select-none"
            >
              {/* Vertical Video Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Multi-stage Editorial Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 transition-opacity duration-300 pointer-events-none" />

              {/* Top Header Bar: Reel Badge & Duration */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white z-10 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[9px] tracking-wider uppercase font-medium">
                  <Clapperboard className="w-3 h-3 text-[#DFC7A5]" />
                  <span>Reel</span>
                </div>

                <div className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-wider">
                  {reel.duration}
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-13 h-13 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-115 group-hover:bg-[#C5A880] group-hover:border-[#C5A880] transition-all duration-300">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Caption & Audio Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-white z-10 flex flex-col justify-end">
                {/* Title */}
                <h3 className="font-serif text-sm sm:text-base font-normal tracking-wide text-white line-clamp-1 mb-1 group-hover:text-[#DFC7A5] transition-colors">
                  {reel.title}
                </h3>

                {/* Caption preview */}
                <p className="text-[10px] sm:text-[11px] text-neutral-300 font-light leading-snug line-clamp-2 mb-2.5">
                  {reel.caption}
                </p>

                {/* Metadata Row: Views & Audio */}
                <div className="flex items-center justify-between text-[10px] text-neutral-300 pt-2 border-t border-white/15 font-light">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#DFC7A5]" />
                    <span>{reel.views} views</span>
                  </span>

                  <span className="flex items-center gap-1 text-[9px] text-neutral-400 truncate max-w-[100px]">
                    <Music2 className="w-2.5 h-2.5 shrink-0 text-[#C5A880]" />
                    <span className="truncate">Audio</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 text-[10px] text-[#8C8275] mt-2 font-light tracking-wider uppercase">
          <span>Swipe to explore reels</span>
          <span className="text-neutral-400">→</span>
        </div>
      </div>

      {/* Reel Video Placeholder Preview Modal */}
      <AnimatePresence>
        {activeReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs">
            {/* Backdrop click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setActiveReel(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-sm aspect-[9/16] max-h-[85vh] rounded-xl overflow-hidden bg-black shadow-2xl border border-white/20 z-10 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Thumbnail */}
              <img
                src={activeReel.thumbnail}
                alt={activeReel.title}
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

              {/* Modal Top Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#C5A880] flex items-center justify-center text-[#171717] font-serif font-bold text-xs">
                    F
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider block leading-tight">
                      @farasha_clothing
                    </span>
                    <span className="text-[10px] text-neutral-300 font-light">
                      Official Reel Showcase
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveReel(null)}
                  className="w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Close reel preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Center Play Simulation Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white mb-4 animate-pulse">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[10px] tracking-widest uppercase text-[#DFC7A5]">
                  Video Placeholder
                </div>
                <p className="text-xs text-neutral-300 font-light mt-2 max-w-[240px]">
                  Configurable through Admin Panel when actual Reel videos are ready.
                </p>
              </div>

              {/* Bottom Metadata & Controls */}
              <div className="relative z-10 p-4 sm:p-5 text-white">
                <h4 className="font-serif text-base sm:text-lg font-normal mb-1">
                  {activeReel.title}
                </h4>
                <p className="text-xs text-neutral-200 font-light leading-relaxed mb-3">
                  {activeReel.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-2.5 border-t border-white/20">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#DFC7A5]" />
                    <span>{activeReel.likes}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#DFC7A5]" />
                    <span>{activeReel.views} views</span>
                  </span>
                  <span className="flex items-center gap-1.5 truncate max-w-[120px] text-[10px] text-neutral-400">
                    <Music2 className="w-3 h-3 text-[#C5A880]" />
                    <span className="truncate">{activeReel.audioTrack}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
