import React from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const NewArrivalsSection: React.FC = () => {
  const { navigateTo } = useShop();

  // Pick new arrivals or top items
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 8);

  return (
    <section id="new-arrivals" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Editorial Section Header */}
      <RaiseUp yOffset={32} className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
          CURATED DUBAI COLLECTION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-wide mb-4">
          NEW ARRIVALS
        </h2>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-4" />
        <p className="text-sm sm:text-base text-[#6B645A] font-light leading-relaxed text-balance">
          Discover our latest pieces, designed to make every occasion memorable.
        </p>
      </RaiseUp>

      {/* 4-column desktop, 2-column mobile grid with Staggered Raise Up */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
        {newArrivals.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.75,
              delay: (idx % 4) * 0.12,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* View All CTA */}
      <RaiseUp delay={0.2} yOffset={24} className="mt-16 text-center">
        <button
          onClick={() => navigateTo('collections', undefined, 'new-arrivals')}
          className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#171717] hover:border-[#9E7D4E] text-[#171717] hover:text-[#9E7D4E] text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:bg-[#FAF8F5] hover:-translate-y-1 cursor-pointer group shadow-xs hover:shadow-md"
        >
          <span>VIEW ALL NEW ARRIVALS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </RaiseUp>
    </section>
  );
};
