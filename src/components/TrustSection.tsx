import React, { useState } from 'react';
import { Sparkles, Crown, MapPin, Globe, ArrowRight, X, Phone, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';

interface PillarItem {
  id: string;
  icon: typeof Crown;
  title: string;
  subtitle: string;
  badge: string;
  detailHeadline: string;
  detailBody: string;
  detailBullets: string[];
  ctaLabel: string;
  ctaAction: 'collections' | 'boutique' | 'international' | 'sarees';
}

export const TrustSection: React.FC = () => {
  const { navigateTo, openContactModal } = useShop();
  const [selectedPillar, setSelectedPillar] = useState<PillarItem | null>(null);

  const pillars: PillarItem[] = [
    {
      id: 'quality',
      icon: Crown,
      title: 'PREMIUM QUALITY',
      subtitle: 'Artisanal handlooms, pure mulberry silks & master zardozi',
      badge: 'Certified Craft',
      detailHeadline: 'Master Artisan Craftsmanship & Pure Silks',
      detailBody: 'Every Farasha piece is woven from hand-selected pure mulberry georgette, Katan silk, and authentic Chanderi fabrics. Our master zardozi embroiderers apply antique metallic zari and freshwater pearls with centuries-old needle techniques.',
      detailBullets: [
        '100% genuine silk & pure tissue handlooms',
        'Hand-embroidered zardozi, mukaish & French knots',
        'Pre-shrunk, skin-friendly natural voiles & linings',
        'Rigorous 5-point boutique quality inspection'
      ],
      ctaLabel: 'EXPLORE SIGNATURE PIECES',
      ctaAction: 'collections'
    },
    {
      id: 'collections',
      icon: Sparkles,
      title: 'CURATED COLLECTIONS',
      subtitle: 'Limited runs crafted exclusively for Farasha women',
      badge: 'Limited Runs',
      detailHeadline: 'Exclusive Silhouettes, Never Mass-Produced',
      detailBody: 'We produce strictly limited editions of our sarees, kurtis, and modest silhouettes to protect your exclusivity at Gulf weddings, galas, and private gatherings.',
      detailBullets: [
        'Strictly limited small-batch creations',
        'Bespoke color palettes tailored to Gulf aesthetics',
        'Fluid drape tailored for modern contemporary wear',
        'Seasonal signature capsules released quarterly'
      ],
      ctaLabel: 'VIEW NEW ARRIVALS',
      ctaAction: 'collections'
    },
    {
      id: 'boutiques',
      icon: MapPin,
      title: 'UAE BOUTIQUES',
      subtitle: 'Visit our flagship salons in Dubai & Sharjah',
      badge: 'Dubai & Sharjah',
      detailHeadline: 'Private Dressing Suites in Dubai & Sharjah',
      detailBody: 'Immerse yourself in our serene flagship boutiques. Enjoy personalized styling, complimentary Arabic coffee, and on-site master tailors for precision fitting.',
      detailBullets: [
        'Dubai Flagship: Villa 14, Al Wasl Road, Jumeirah 1',
        'Sharjah Boutique: Corniche Plaza, Al Majaz 2',
        'Private VIP dressing salons & custom alteration suites',
        'UAE Order Hotline: 0505016078'
      ],
      ctaLabel: 'CONTACT BOUTIQUE DIRECTLY',
      ctaAction: 'boutique'
    },
    {
      id: 'international',
      icon: Globe,
      title: 'INTERNATIONAL ORDERS',
      subtitle: 'White-glove worldwide shipping & personal concierge',
      badge: 'Worldwide DHL',
      detailHeadline: 'White-Glove Worldwide Express Shipping',
      detailBody: 'We deliver worldwide across Saudi Arabia, Qatar, Kuwait, the UK, the US, and beyond with tracked, insured express couriers and a dedicated WhatsApp concierge.',
      detailBullets: [
        '2-3 days express delivery across GCC countries',
        '3-5 business days tracked worldwide shipping',
        'Multi-currency pricing (AED, USD, SAR, EUR)',
        'International Hotline: 00971507325758'
      ],
      ctaLabel: 'WHATSAPP GLOBAL CONCIERGE',
      ctaAction: 'international'
    }
  ];

  const handleCta = (pillar: PillarItem) => {
    setSelectedPillar(null);
    if (pillar.ctaAction === 'boutique') {
      openContactModal('dubai');
    } else if (pillar.ctaAction === 'international') {
      const text = encodeURIComponent('Hello Farasha Clothing, I would like to inquire about international ordering and shipping.');
      window.open(`https://wa.me/971507325758?text=${text}`, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo('collections', undefined, 'all');
    }
  };

  return (
    <section className="bg-[#FAF8F5] border-y border-[#EAE3D8] py-14 lg:py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-1.5">
            THE FARASHA PROMISE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal tracking-wide">
            STANDARDS OF DISTINCTION
          </h2>
          <div className="w-10 h-[1px] bg-[#C5A880] mx-auto mt-2.5" />
        </div>

        {/* 4 Cards Grid with Spring Pop-Up Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.85, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 20,
                  delay: idx * 0.1
                }}
                whileHover={{
                  scale: 1.035,
                  y: -8,
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPillar(pillar)}
                className="bg-white border border-[#EAE3D8] hover:border-[#C5A880] p-7 rounded-sm shadow-xs hover:shadow-xl transition-colors duration-300 flex flex-col items-center text-center relative group cursor-pointer"
              >
                {/* Top Badge */}
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#9E7D4E] font-medium mb-4 bg-[#FAF5EE] px-2.5 py-0.5 border border-[#EFE5D5]">
                  {pillar.badge}
                </span>

                {/* Pop-up Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#E8DFC5] flex items-center justify-center text-[#9E7D4E] mb-5 group-hover:bg-[#C5A880] group-hover:text-white group-hover:border-[#C5A880] group-hover:scale-110 transition-all duration-300 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.4]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-base sm:text-lg tracking-[0.16em] uppercase font-medium text-[#171717] group-hover:text-[#9E7D4E] transition-colors mb-2.5">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-[#736B60] font-light leading-relaxed mb-6 flex-1">
                  {pillar.subtitle}
                </p>

                {/* Card Action Link */}
                <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-[#9E7D4E] font-semibold group-hover:text-[#171717] transition-colors pt-3 border-t border-[#F0EAE1] w-full justify-center">
                  <span>DISCOVER DETAILS</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pop-Up Detail Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            {/* Backdrop click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedPillar(null)}
            />

            {/* Modal Card with Pop-Up Spring Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 26
              }}
              className="relative bg-[#FAF8F5] text-[#171717] w-full max-w-lg overflow-hidden shadow-2xl border border-[#EAE3D8] p-7 sm:p-9 z-10 rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-[#171717] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Title */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#E8DFC5] flex items-center justify-center text-[#9E7D4E] shrink-0">
                  <selectedPillar.icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E7D4E] font-medium block">
                    {selectedPillar.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#171717] font-medium tracking-wide">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-[#C5A880] mb-5" />

              {/* Headline & Body */}
              <h4 className="font-serif text-base text-[#2C2722] font-semibold mb-2">
                {selectedPillar.detailHeadline}
              </h4>
              <p className="text-xs text-[#5C554B] font-light leading-relaxed mb-6">
                {selectedPillar.detailBody}
              </p>

              {/* Bullets */}
              <div className="bg-white border border-[#EAE3D8] p-4 mb-6 space-y-2.5 text-xs text-[#4A433A]">
                {selectedPillar.detailBullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9E7D4E] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCta(selectedPillar)}
                  className="flex-1 py-3.5 px-5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{selectedPillar.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedPillar(null)}
                  className="py-3.5 px-4 border border-[#DCD5C9] text-[#5C554B] hover:text-[#171717] hover:border-[#171717] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
