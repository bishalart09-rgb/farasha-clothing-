import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Ruler, Truck, RotateCcw, ShieldCheck, MapPin, Share2, Check, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen,
    openContactModal,
    formatPrice,
    showToast
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');
  const [copiedLink, setCopiedLink] = useState(false);

  const isSaved = isInWishlist(product.id);

  const images = product.images && product.images.length > 0 ? product.images : [product.primaryImage];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Link copied to clipboard');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Back button & Breadcrumb */}
      <RaiseUp yOffset={16} duration={0.5} className="flex items-center justify-between text-xs text-[#736B60] mb-8 pb-4 border-b border-[#EAE3D8]">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 hover:text-[#171717] transition-colors cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collections</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] tracking-wider uppercase font-light">
          <span>Farasha</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#171717] font-medium truncate max-w-[160px] sm:max-w-none">{product.name}</span>
        </div>
      </RaiseUp>

      {/* Main PDP Grid: Gallery on Left, Purchase Module on Right with Staggered Raise Up */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
        {/* Left Column: Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4"
        >
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all cursor-pointer bg-[#F5EFE6] shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#EAE3D8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3ECE1] shadow-lg group">
            <img
              src={images[selectedImageIndex] || product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-[#171717] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                NEW ARRIVAL
              </span>
            )}
          </div>
        </motion.div>

        {/* Right Column: Contiguous Purchase Module */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28"
        >
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-[#8C8275] uppercase mb-2">
            <span>{product.category}</span>
            <span className="text-[#A69B8D] font-mono">SKU: {product.sku}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide leading-tight mb-3">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-serif text-2xl sm:text-3xl text-[#171717] font-semibold tabular-nums">
              {formatPrice(product.priceAed)}
            </span>
            {product.compareAtPriceAed && (
              <span className="text-sm sm:text-base text-neutral-400 line-through tabular-nums">
                {formatPrice(product.compareAtPriceAed)}
              </span>
            )}
            <span className="text-[11px] tracking-wider text-[#9E7D4E] uppercase font-medium">
              Inclusive of 5% UAE VAT
            </span>
          </div>

          {/* Availability Indicators */}
          <div className="bg-[#F8F5F0] border border-[#EAE3D8] p-3.5 mb-6 text-xs text-[#524B40] space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-[#1E4738]">
              <span className="w-2 h-2 rounded-full bg-[#1E4738] inline-block animate-pulse" />
              <span>In Stock — Ready for Immediate UAE Dispatch</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#736B60] pt-1 border-t border-[#EDE6DC]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#9E7D4E]" />
                Boutique Availability:
              </span>
              <span className="text-[#171717] font-medium">
                Dubai {product.outletAvailability.dubai ? '✓' : '—'} &nbsp;|&nbsp; Sharjah {product.outletAvailability.sharjah ? '✓' : '—'}
              </span>
            </div>
          </div>

          {/* Short Narrative */}
          <p className="text-sm text-[#5C554B] font-light leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest font-medium text-[#171717]">
                SELECT SIZE: <span className="font-bold text-[#9E7D4E]">{selectedSize}</span>
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#9E7D4E] hover:text-[#171717] transition-colors cursor-pointer font-medium tracking-wide"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] h-11 px-3 text-xs tracking-wider font-medium transition-all duration-200 cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'bg-white border border-[#DCD5C9] text-[#171717] hover:border-[#171717]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-widest font-medium text-[#171717]">
              QUANTITY:
            </span>
            <div className="flex items-center border border-[#DCD5C9] bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium hover:bg-[#F3EFEA] transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center text-xs font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium hover:bg-[#F3EFEA] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#171717] hover:bg-[#2C2926] text-white text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 border transition-colors flex items-center justify-center cursor-pointer ${
                  isSaved
                    ? 'border-[#C5A880] bg-[#FAF6F0] text-[#C5A880]'
                    : 'border-[#DCD5C9] hover:border-[#171717] text-[#171717] bg-white'
                }`}
                title={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="w-14 border border-[#DCD5C9] hover:border-[#171717] bg-white text-[#171717] transition-colors flex items-center justify-center cursor-pointer"
                title="Share this item"
              >
                {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-[#C5A880] hover:bg-[#D9C4A2] text-[#171717] text-xs tracking-[0.25em] uppercase font-bold transition-all duration-200 shadow-md cursor-pointer"
            >
              BUY NOW · INSTANT CHECKOUT
            </button>
          </div>

          {/* Boutique Concierge Note */}
          <div className="border-t border-[#EAE3D8] pt-4 mb-6 text-xs text-[#736B60] flex items-center justify-between">
            <span>Need advice or custom fitting?</span>
            <button
              onClick={() => openContactModal('dubai')}
              className="text-[#9E7D4E] hover:underline font-medium cursor-pointer"
            >
              Ask Boutique Stylist
            </button>
          </div>

          {/* Accordion Details */}
          <div className="border-t border-[#EAE3D8] divide-y divide-[#EAE3D8]">
            {/* Fabric & Details */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('fabric')}
                className="w-full flex items-center justify-between text-left text-xs tracking-[0.18em] uppercase font-medium text-[#171717] cursor-pointer"
              >
                <span>FABRIC & DETAILS</span>
                {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'fabric' && (
                <div className="mt-3 text-xs text-[#635B50] font-light leading-relaxed">
                  <p>{product.fabricDetails}</p>
                </div>
              )}
            </div>

            {/* Size & Fit */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('size-fit')}
                className="w-full flex items-center justify-between text-left text-xs tracking-[0.18em] uppercase font-medium text-[#171717] cursor-pointer"
              >
                <span>SIZE & FIT</span>
                {openAccordion === 'size-fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'size-fit' && (
                <div className="mt-3 text-xs text-[#635B50] font-light leading-relaxed">
                  <p>{product.sizeAndFit}</p>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#9E7D4E] underline mt-2 block font-medium"
                  >
                    View Comprehensive Size Matrix
                  </button>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between text-left text-xs tracking-[0.18em] uppercase font-medium text-[#171717] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#9E7D4E]" />
                  <span>SHIPPING INFORMATION</span>
                </span>
                {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="mt-3 text-xs text-[#635B50] font-light leading-relaxed">
                  <p>{product.shippingInfo}</p>
                  <p className="mt-2 text-[#9E7D4E]">
                    UAE Hotline: 0505016078 &nbsp;·&nbsp; International: 00971507325758
                  </p>
                </div>
              )}
            </div>

            {/* Returns & Exchange */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('returns')}
                className="w-full flex items-center justify-between text-left text-xs tracking-[0.18em] uppercase font-medium text-[#171717] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-[#9E7D4E]" />
                  <span>RETURNS & EXCHANGE</span>
                </span>
                {openAccordion === 'returns' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === 'returns' && (
                <div className="mt-3 text-xs text-[#635B50] font-light leading-relaxed">
                  <p>{product.returnsInfo}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products Section with Raise Up */}
      {relatedProducts.length > 0 && (
        <RaiseUp delay={0.2} yOffset={36} className="pt-16 border-t border-[#EAE3D8]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-1">
              COMPLETE YOUR WARDROBE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal tracking-wide">
              YOU MAY ALSO ADMIRE
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </RaiseUp>
      )}
    </div>
  );
};
