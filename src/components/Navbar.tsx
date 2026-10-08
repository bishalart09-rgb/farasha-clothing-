import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CategorySlug } from '../types';
import { farashaLogoImg } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    openContactModal,
    currency,
    setCurrency
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: import('../types').ViewType; categorySlug?: CategorySlug }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'NEW ARRIVALS', view: 'new-arrivals', categorySlug: 'new-arrivals' },
    { label: 'KURTIS', view: 'kurtis', categorySlug: 'kurtis' },
    { label: 'SAREES', view: 'sarees', categorySlug: 'sarees' },
    { label: 'MODEST WEAR', view: 'modest-wear', categorySlug: 'modest-wear' },
    { label: 'COLLECTIONS', view: 'collections', categorySlug: 'collections' },
    { label: 'ABOUT US', view: 'about' }
  ];

  const handleNavClick = (item: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);
    if (item.categorySlug) {
      navigateTo('collections', undefined, item.categorySlug);
    } else {
      navigateTo(item.view);
    }
  };

  return (
    <>
      {/* Top Micro-Bar: UAE Outlets & Orders Hotline */}
      <div className="bg-[#171717] text-[#EDE8DF] text-[11px] tracking-widest uppercase py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-light text-neutral-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              Dubai & Sharjah Boutiques
            </span>
            <span className="hidden md:inline text-neutral-600">·</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#C5A880]" />
              UAE Orders: 0505016078
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openContactModal('dubai')}
              className="text-[#C5A880] hover:text-white transition-colors cursor-pointer"
            >
              Book Boutique Appointment
            </button>
            <span className="text-neutral-600">·</span>
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#C5A880] transition-colors cursor-pointer text-[11px] tracking-wider font-medium"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-28 bg-[#1F1F1F] border border-[#333] shadow-xl py-1 z-50 rounded-sm"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {(['AED', 'USD', 'SAR', 'EUR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-[11px] tracking-wider transition-colors ${
                        currency === curr ? 'text-[#C5A880] font-semibold bg-white/5' : 'text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D8] py-4'
            : 'bg-[#FAF8F5] border-b border-[#EFEAE2] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-[#171717] hover:text-[#C5A880] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left: Brand Logo Lockup */}
            <div className="flex-shrink-0">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center text-left group cursor-pointer focus:outline-none py-1"
                aria-label="Farasha Clothing Home"
              >
                {/* Official Farasha Clothing Brand Logo Asset */}
                <img
                  src={farashaLogoImg}
                  alt="Farasha Clothing"
                  className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ imageRendering: 'auto' }}
                  loading="eager"
                  decoding="sync"
                />
              </button>
            </div>

            {/* Center: Desktop Navigation Links (Clean typography, no pills) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
              {navLinks.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`relative text-[12px] tracking-[0.2em] font-medium uppercase py-1 cursor-pointer transition-colors duration-200 ${
                      isActive ? 'text-[#171717] font-semibold' : 'text-[#5A554E] hover:text-[#171717]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Functional Action Icons */}
            <div className="flex items-center space-x-4 sm:space-x-5 text-[#171717]">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 hover:text-[#9E7D4E] transition-colors cursor-pointer"
                title="Search Collections"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="relative p-1.5 hover:text-[#9E7D4E] transition-colors cursor-pointer"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 stroke-[1.5] ${wishlist.length > 0 ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#171717] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-1.5 hover:text-[#9E7D4E] transition-colors cursor-pointer"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C5A880] text-[#171717] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account / Boutique Concierge */}
              <button
                onClick={() => openContactModal('dubai')}
                className="hidden sm:block p-1.5 hover:text-[#9E7D4E] transition-colors cursor-pointer"
                title="Boutique Concierge / Account"
                aria-label="Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FAF8F5] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-left text-sm tracking-[0.2em] uppercase font-medium text-[#171717] hover:text-[#9E7D4E] py-2 border-b border-[#F0EAE1]"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 flex flex-col gap-3 text-xs tracking-wider text-[#666]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('boutiques');
                  }}
                  className="text-left font-medium text-[#171717] hover:text-[#9E7D4E]"
                >
                  DUBAI & SHARJAH BOUTIQUES
                </button>
                <a
                  href="tel:0505016078"
                  className="text-[#9E7D4E] font-medium"
                >
                  UAE Hotline: 0505016078
                </a>
                <a
                  href="https://wa.me/971507325758"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#555] hover:text-[#171717]"
                >
                  International Concierge: 00971507325758
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
