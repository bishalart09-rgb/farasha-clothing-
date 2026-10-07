import React from 'react';
import { boutiqueImg } from '../data/products';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, Sparkles } from 'lucide-react';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const AboutStorySection: React.FC = () => {
  const { openContactModal } = useShop();

  return (
    <section className="py-20 lg:py-28 bg-[#F4EFEA]/70 border-t border-[#EAE3D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Narrative Column with Raise Up */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9E7D4E]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium">
                OUR HERITAGE & ATELIER
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-wide mb-6">
              THE FARASHA STORY
            </h2>

            <div className="w-16 h-[1.5px] bg-[#C5A880] mb-8" />

            <div className="space-y-5 text-sm sm:text-base text-[#5C554B] font-light leading-relaxed">
              <p className="font-serif text-xl sm:text-2xl text-[#2B2723] italic leading-normal">
                Farasha Clothing brings together timeless elegance, refined craftsmanship and contemporary fashion for the modern woman.
              </p>
              <p>
                From graceful sarees to sophisticated kurtis and modest silhouettes, every piece is selected to celebrate confidence, individuality and effortless style. Born out of a deep reverence for authentic South Asian needlecraft and Middle Eastern luxury aesthetics, Farasha curates garments that transition effortlessly from daytime poise to grand celebrations.
              </p>
              <p>
                Our boutiques in Dubai and Sharjah serve as serene private spaces where clients receive personalized styling, customized alterations, and a warm cup of traditional hospitality.
              </p>
            </div>

            {/* Location & Contact Marker */}
            <div className="mt-8 pt-6 border-t border-[#DFD7CB] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#171717] font-medium">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Dubai | Sharjah, United Arab Emirates</span>
              </div>

              <button
                onClick={() => openContactModal('dubai')}
                className="text-xs tracking-[0.2em] uppercase font-semibold text-[#9E7D4E] hover:text-[#171717] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Boutique</span>
              </button>
            </div>
          </motion.div>

          {/* Editorial Image Column with Raise Up */}
          <motion.div
            initial={{ opacity: 0, y: 52 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden shadow-2xl bg-[#E8E2D6] group hover:-translate-y-1.5 transition-transform duration-500">
              <img
                src={boutiqueImg}
                alt="Inside Farasha Boutique Showroom Dubai"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-[11px] tracking-widest uppercase flex items-center justify-between font-light">
                <span>Farasha Showroom Experience</span>
                <span className="text-[#DFC7A5]">Dubai · Sharjah</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
