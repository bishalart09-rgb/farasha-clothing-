import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const MostLovedSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#EAE3D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <RaiseUp yOffset={28} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
              CLIENT TESTED FAVORITES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-wide">
              MOST LOVED
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <span className="text-xs text-[#82786B] tracking-wider hidden md:inline">
              Curated Dubai & Sharjah Bestsellers
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 border border-[#D8CEBE] hover:border-[#171717] text-[#171717] rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
                aria-label="Previous best sellers"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 border border-[#D8CEBE] hover:border-[#171717] text-[#171717] rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
                aria-label="Next best sellers"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </RaiseUp>

        {/* Carousel / Scroll Area with Raise Up */}
        <RaiseUp delay={0.15} yOffset={36}>
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory pt-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </RaiseUp>
      </div>
    </section>
  );
};
