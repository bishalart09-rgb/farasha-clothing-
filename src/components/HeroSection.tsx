import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { heroImg } from '../data/products';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();

  const handleScrollDown = () => {
    const el = document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#121110]">
      {/* Background Editorial Fashion Campaign Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Farasha Clothing Luxury Editorial Campaign"
          className="w-full h-full object-cover object-[center_28%]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Measured Luxury Scrim: Deep warm charcoal gradient overlay to ensure WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
      </motion.div>

      {/* Hero Content with Staggered Raise Up */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center text-[#FAF8F5]">
        {/* Subtle Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-4 tracking-[0.35em] text-[11px] sm:text-xs uppercase text-[#DFC7A5] font-light"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>DUBAI · SHARJAH · UNITED ARAB EMIRATES</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
        </motion.div>

        {/* Brand Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] uppercase font-light text-white mb-3"
        >
          FARASHA CLOTHING
        </motion.h2>

        {/* Campaign Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wide text-[#FAF8F5] mb-6 leading-tight italic"
        >
          Elegance, Woven With Grace.
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-neutral-200/90 leading-relaxed mb-10 tracking-wide text-balance"
        >
          Discover timeless Indian and contemporary fashion, curated for the modern woman.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => navigateTo('collections', undefined, 'new-arrivals')}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#171717] hover:bg-[#D9C4A2] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer whitespace-nowrap"
          >
            SHOP NEW ARRIVALS
          </button>

          <button
            onClick={() => navigateTo('collections', undefined, 'all')}
            className="w-full sm:w-auto px-8 py-4 border border-white/70 hover:border-white text-white hover:bg-white/10 text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 cursor-pointer whitespace-nowrap"
          >
            EXPLORE COLLECTION
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-300 hover:text-[#C5A880] transition-colors cursor-pointer group"
        aria-label="Scroll to new arrivals"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-light group-hover:text-white transition-colors">
          DISCOVER
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A880]" />
      </motion.button>
    </section>
  );
};

