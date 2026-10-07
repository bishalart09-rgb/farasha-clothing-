import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    formatPrice
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage;

  const handleCardClick = () => {
    navigateTo('product-detail', product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // default to first available size
    const defaultSize = product.sizes[0] || 'Free Size';
    addToCart(product, defaultSize, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group flex flex-col bg-transparent cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EFEA] mb-4">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Button (Always visible on mobile, hover on desktop) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10 cursor-pointer ${
            isSaved
              ? 'bg-white text-[#C5A880] shadow-md'
              : 'bg-white/80 hover:bg-white text-[#171717] hover:text-[#C5A880] backdrop-blur-sm'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
        </button>

        {/* Subtle Stock Tag (Quiet, non-pill text) */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 bg-[#171717]/90 text-white text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium backdrop-blur-xs">
            NEW
          </div>
        )}

        {/* Quick View and Add to Bag Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-[#171717] text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 px-1">
        {/* Category & Outlet indicator (Unboxed text) */}
        <div className="flex items-center justify-between text-[11px] tracking-[0.18em] text-[#8C8275] uppercase mb-1">
          <span>{product.category}</span>
          <span className="text-[10px] text-[#A69B8D] font-light">Dubai · Sharjah</span>
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-base sm:text-lg text-[#171717] font-medium leading-snug line-clamp-1 group-hover:text-[#9E7D4E] transition-colors mb-2">
          {product.name}
        </h3>

        {/* Price & Colors */}
        <div className="flex items-baseline justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#171717] tabular-nums">
              {formatPrice(product.priceAed)}
            </span>
            {product.compareAtPriceAed && (
              <span className="text-xs text-[#999] line-through tabular-nums">
                {formatPrice(product.compareAtPriceAed)}
              </span>
            )}
          </div>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
