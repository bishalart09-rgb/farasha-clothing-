import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowUpRight } from 'lucide-react';
import { CategorySlug } from '../types';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const CategorySection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6]/60 border-y border-[#EDE6DC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RaiseUp yOffset={28} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
              DISCOVER BY SILHOUETTE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide">
              SIGNATURE CATEGORIES
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#736B60] max-w-md font-light">
            Each creation is an exquisite dialogue between age-old artisan craftsmanship and modern Dubai tailoring.
          </p>
        </RaiseUp>

        {/* 4 Large Editorial Category Cards with Staggered Raise Up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.14,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => navigateTo('collections', undefined, cat.categorySlug as CategorySlug)}
              className="group relative overflow-hidden bg-[#E8E2D6] cursor-pointer flex flex-col justify-end aspect-[3/4] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Category Info Overlay */}
              <div className="relative z-10 p-6 text-white flex flex-col justify-end h-full">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#DFC7A5] mb-1 font-light">
                  {cat.count}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl tracking-[0.08em] font-normal text-white group-hover:text-[#DFC7A5] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#C5A880] group-hover:text-[#171717] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-neutral-300 font-light mt-2 line-clamp-2 leading-relaxed opacity-90">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
