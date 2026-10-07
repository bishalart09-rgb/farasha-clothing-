import React from 'react';
import { sareeSigImg } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const FeaturedSignatureSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Side: Large Editorial Saree Image with Raise Up */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative group"
        >
          <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#F0ECE4] shadow-xl hover:-translate-y-1.5 transition-transform duration-500">
            <img
              src={sareeSigImg}
              alt="Farasha Signature Saree Collection"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-104"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Subtle editorial watermark frame */}
            <div className="absolute inset-4 border border-white/30 pointer-events-none" />
          </div>

          {/* Floating Luxury Detail Badge with delayed raise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -right-4 sm:right-6 bg-[#171717] text-[#FAF8F5] p-5 shadow-2xl max-w-xs border-l-2 border-[#C5A880]"
          >
            <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase block mb-1">
              EXCLUSIVE TO UAE
            </span>
            <p className="font-serif text-sm italic text-neutral-300">
              "Every fold whispers heritage, sculpted for the modern woman of grace."
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: Editorial Narrative & Action with Raise Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:pl-4 mt-8 lg:mt-0 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9E7D4E]" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium">
              CURATED ATELIER
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-wide leading-tight mb-4">
            FARASHA SIGNATURE COLLECTION
          </h2>

          <div className="w-16 h-[1.5px] bg-[#C5A880] mb-6" />

          <p className="font-serif text-xl sm:text-2xl text-[#3A352F] italic mb-6 leading-relaxed">
            Timeless silhouettes. Refined details. Effortless elegance.
          </p>

          <p className="text-sm sm:text-base text-[#6E675D] font-light leading-relaxed mb-8">
            Created for women who appreciate understated opulence. Each garment is handcrafted using fine mulberry silks, hand-dyed organzas, and antique gold zardozi embroidery perfected over generations of master artisans.
          </p>

          {/* Key Attributes List */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#E8E2D8] py-6 mb-8 text-xs tracking-wider">
            <div>
              <span className="text-[#9E7D4E] font-medium block uppercase text-[10px] tracking-[0.2em] mb-1">CRAFT</span>
              <span className="text-[#262626]">Handcrafted Zari & Pearls</span>
            </div>
            <div>
              <span className="text-[#9E7D4E] font-medium block uppercase text-[10px] tracking-[0.2em] mb-1">FABRIC</span>
              <span className="text-[#262626]">Pure Silk & Georgette</span>
            </div>
            <div>
              <span className="text-[#9E7D4E] font-medium block uppercase text-[10px] tracking-[0.2em] mb-1">FITTING</span>
              <span className="text-[#262626]">Dubai Boutique Alterations</span>
            </div>
            <div>
              <span className="text-[#9E7D4E] font-medium block uppercase text-[10px] tracking-[0.2em] mb-1">DELIVERY</span>
              <span className="text-[#262626]">24h Express UAE Shipping</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('collections', undefined, 'collections')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-md hover:-translate-y-1 cursor-pointer group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
