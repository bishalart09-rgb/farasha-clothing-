import React, { useState } from 'react';
import { Instagram, Facebook, ArrowRight, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategorySlug } from '../types';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen, openContactModal } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#141312] text-[#EDE8DF] border-t border-[#292521] pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Newsletter Section with Raise Up */}
        <RaiseUp yOffset={32} className="border-b border-white/10 pb-16 mb-16 text-center max-w-2xl mx-auto">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-medium block mb-2">
            PRIVATE MAILING LIST
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-wide mb-3">
            JOIN THE FARASHA WORLD
          </h3>
          <p className="text-sm text-neutral-300 font-light leading-relaxed mb-8">
            Be the first to discover new collections, exclusive launches and special offers.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-2 text-sm text-[#DFC7A5] bg-white/5 px-6 py-3 border border-[#C5A880]/30 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
              <span>Welcome to Farasha. Your exclusive preview invitation has been registered.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/15 px-4 py-3.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#D9C4A2] text-[#141312] text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </RaiseUp>

        {/* 4-Column Footer Grid with Raise Up */}
        <RaiseUp delay={0.15} yOffset={28} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/10 text-xs font-light">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => navigateTo('home')}>
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-medium text-white block">
                FARASHA
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#C5A880] block -mt-1">
                CLOTHING
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Premium Women's Fashion<br />
              Dubai | Sharjah, United Arab Emirates
            </p>

            <p className="text-neutral-400 text-[11px] leading-relaxed max-w-sm">
              Curating elevated sarees, handcrafted kurtis, and modest silhouettes honoring Gulf elegance and South Asian couture traditions.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-neutral-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors hover:-translate-y-0.5"
                aria-label="TikTok"
              >
                <span className="text-[11px] font-bold">Tk</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-white font-medium mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#C5A880] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections', undefined, 'new-arrivals')} className="hover:text-[#C5A880] transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections', undefined, 'kurtis')} className="hover:text-[#C5A880] transition-colors">
                  Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections', undefined, 'sarees')} className="hover:text-[#C5A880] transition-colors">
                  Sarees
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections', undefined, 'modest-wear')} className="hover:text-[#C5A880] transition-colors">
                  Modest Wear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections', undefined, 'collections')} className="hover:text-[#C5A880] transition-colors">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#C5A880] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => openContactModal('dubai')} className="hover:text-[#C5A880] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-white font-medium mb-5">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-neutral-300">
              <li>
                <button onClick={() => openContactModal('dubai')} className="hover:text-[#C5A880] transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => openContactModal('dubai')} className="hover:text-[#C5A880] transition-colors">
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#C5A880] transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => openContactModal('dubai')} className="hover:text-[#C5A880] transition-colors">
                  Boutique FAQs
                </button>
              </li>
              <li>
                <button onClick={() => openContactModal('dubai')} className="hover:text-[#C5A880] transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Numbers */}
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-white font-medium mb-5">
              CONTACT
            </h4>
            <div className="space-y-4 text-neutral-300">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#C5A880] block mb-0.5">
                  UAE ORDERS:
                </span>
                <a
                  href="tel:0505016078"
                  className="text-white hover:text-[#C5A880] transition-colors font-medium text-sm flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>0505016078</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#C5A880] block mb-0.5">
                  INTERNATIONAL ORDERS:
                </span>
                <a
                  href="tel:00971507325758"
                  className="text-white hover:text-[#C5A880] transition-colors font-medium text-sm flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>00971507325758</span>
                </a>
              </div>

              <div className="pt-2">
                <span className="text-[10px] tracking-widest uppercase text-[#C5A880] block mb-0.5">
                  BOUTIQUE OUTLETS:
                </span>
                <span className="text-neutral-400 block text-[11px] leading-relaxed">
                  • Dubai: Jumeirah 1, Al Wasl Rd<br />
                  • Sharjah: Corniche Plaza, Al Majaz
                </span>
              </div>
            </div>
          </div>
        </RaiseUp>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Farasha Clothing LLC. All rights reserved. Dubai | Sharjah, UAE.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
