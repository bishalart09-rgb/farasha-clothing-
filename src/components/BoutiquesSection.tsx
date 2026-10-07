import React from 'react';
import { MapPin, Phone, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { BOUTIQUES_DATA } from '../data/products';
import { useShop } from '../context/ShopContext';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const BoutiquesSection: React.FC = () => {
  const { openContactModal } = useShop();

  const handleOpenMap = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="boutiques" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Header with Raise Up */}
      <RaiseUp yOffset={28} className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
          FLAGSHIP DESTINATIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-wide mb-3">
          VISIT FARASHA
        </h2>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-4" />
        <p className="text-base text-[#665F54] font-light">
          Dubai &nbsp;|&nbsp; Sharjah
        </p>
        <p className="mt-2 text-xs sm:text-sm text-[#82786B] font-light max-w-lg mx-auto">
          Immerse yourself in our private fitting suites, explore the tactile touch of handcrafted silks, and enjoy bespoke alterations by our resident master tailors.
        </p>
      </RaiseUp>

      {/* Two Elegant Boutique Cards with Staggered Raise Up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {BOUTIQUES_DATA.map((store, idx) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: idx * 0.16,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="bg-[#F5EFE6]/50 border border-[#E8DFD3] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 group hover:-translate-y-2"
          >
            {/* Store Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE4D8]">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#171717]/90 text-[#DFC7A5] text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-medium">
                {store.city.toUpperCase()} FLAGSHIP
              </div>
            </div>

            {/* Store Details */}
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal tracking-wide mb-2">
                  {store.name}
                </h3>
                <span className="text-xs text-[#9E7D4E] font-medium tracking-widest uppercase block mb-4">
                  {store.area}
                </span>

                <div className="space-y-3 text-xs sm:text-sm text-[#575046] font-light mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#9E7D4E] shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#9E7D4E] shrink-0 mt-0.5" />
                    <span>{store.timings}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#9E7D4E] shrink-0" />
                    <span className="font-medium text-[#171717]">UAE Orders & Queries: {store.phone}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t border-[#E5DDD0] pt-4 mb-6">
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#696156]">
                    {store.features.map((f) => (
                      <span key={f} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleOpenMap(store.address)}
                  className="py-3 px-4 border border-[#171717] hover:border-[#9E7D4E] text-[#171717] hover:text-[#9E7D4E] text-xs tracking-wider uppercase font-medium transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View Location</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openContactModal(store.id)}
                  className="py-3 px-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs tracking-wider uppercase font-medium transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contact Store</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
