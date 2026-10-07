import React from 'react';
import { OCCASIONS_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { OccasionType } from '../types';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const ShopByOccasion: React.FC = () => {
  const { navigateTo } = useShop();

  const handleOccasionClick = (occasion: OccasionType) => {
    navigateTo('collections', undefined, 'all', occasion);
  };

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header with Raise Up */}
      <RaiseUp yOffset={28} className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
          CURATED FOR YOUR CALENDAR
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-wide mb-3">
          SHOP BY OCCASION
        </h2>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-4" />
        <p className="text-sm text-[#6E675D] font-light">
          Whether attending an Emirati grand wedding or welcoming guests for intimate tea, explore silhouettes tailored to the moment.
        </p>
      </RaiseUp>

      {/* Horizontal / Grid of 5 Occasion Cards with Staggered Raise Up */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {OCCASIONS_DATA.map((occ, idx) => (
          <motion.div
            key={occ.name}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.75,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            onClick={() => handleOccasionClick(occ.type)}
            className="group relative aspect-[3/4] overflow-hidden bg-[#ECE6DC] cursor-pointer flex flex-col justify-end p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Background Image */}
            <img
              src={occ.image}
              alt={occ.name}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Content */}
            <div className="relative z-10 text-white flex flex-col">
              <span className="text-[9px] tracking-[0.2em] text-[#DFC7A5] uppercase font-light mb-1">
                OCCASION
              </span>
              <h3 className="font-serif text-base sm:text-lg font-medium leading-snug tracking-wide group-hover:text-[#DFC7A5] transition-colors mb-1">
                {occ.name}
              </h3>
              <p className="text-[11px] text-neutral-300 font-light line-clamp-2 leading-relaxed hidden sm:block opacity-80 mb-2">
                {occ.description}
              </p>
              <div className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-[#C5A880] font-semibold mt-1">
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
