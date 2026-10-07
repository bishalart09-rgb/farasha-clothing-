import React from 'react';
import { Globe, PhoneCall, Plane, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const InternationalOrdersSection: React.FC = () => {
  const { navigateTo } = useShop();

  const handleInternationalContact = () => {
    const text = encodeURIComponent("Hello Farasha Clothing, I am shopping from outside the UAE and would like to inquire about international delivery and ordering.");
    window.open(`https://wa.me/971507325758?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-[#1A1816] text-[#FAF8F5] relative overflow-hidden border-y border-[#332E28]">
      {/* Subtle luxury background radial tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <RaiseUp yOffset={36} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-4 text-[#DFC7A5] text-[11px] tracking-[0.3em] uppercase">
          <Globe className="w-4 h-4 text-[#C5A880]" />
          <span>WORLDWIDE COURIER DELIVERY</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white mb-4">
          FARASHA, WHEREVER YOU ARE.
        </h2>

        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-6" />

        <p className="font-serif text-xl sm:text-2xl text-[#E5DDD0] italic mb-6">
          We welcome fashion lovers beyond the UAE.
        </p>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
          From London and New York to Riyadh, Doha, and Mumbai, our personal styling concierge assists our global patrons with sizing, video consultations, and express insured DHL/FedEx worldwide delivery.
        </p>

        {/* International Phone Box with Raise */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-white/5 border border-white/10 px-8 py-4 mb-10 backdrop-blur-sm transition-transform hover:-translate-y-0.5">
          <div className="flex items-center gap-2 text-[#DFC7A5] text-xs tracking-widest uppercase font-medium">
            <PhoneCall className="w-4 h-4 text-[#C5A880]" />
            <span>International Orders Concierge:</span>
          </div>
          <a
            href="tel:00971507325758"
            className="font-serif text-xl sm:text-2xl tracking-wider text-white hover:text-[#C5A880] transition-colors tabular-nums"
          >
            00971507325758
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleInternationalContact}
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#D9C4A2] text-[#171717] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-lg hover:-translate-y-1 cursor-pointer whitespace-nowrap"
          >
            SHOP INTERNATIONALLY
          </button>

          <button
            onClick={() => navigateTo('collections', undefined, 'all')}
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white text-white hover:bg-white/5 text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:-translate-y-1 cursor-pointer whitespace-nowrap"
          >
            EXPLORE THE STORE
          </button>
        </div>

        {/* Quiet Trust Points */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-neutral-400 font-light">
          <div className="flex items-center justify-center gap-2">
            <Plane className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Express GCC & Global Transit</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Fully Insured Packaging</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>Multi-Currency Checkout</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>Dedicated WhatsApp Stylist</span>
          </div>
        </div>
      </RaiseUp>
    </section>
  );
};
