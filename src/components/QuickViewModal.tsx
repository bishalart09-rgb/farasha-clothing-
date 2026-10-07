import React, { useState } from 'react';
import { X, Heart, Ruler, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    setIsSizeGuideOpen,
    formatPrice
  } = useShop();

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    closeQuickView();
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateTo('product-detail', product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="relative bg-[#FAF8F5] text-[#171717] w-full max-w-3xl overflow-hidden shadow-2xl border border-[#EAE3D8] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-[#171717] bg-white/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-[3/4] md:h-full bg-[#F3ECE1]">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 bg-[#171717] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
              {product.category}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#9E7D4E] block mb-1">
                FARASHA DUBAI ATELIER
              </span>

              <h2 className="font-serif text-2xl text-[#171717] font-medium leading-snug mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif text-xl font-bold text-[#171717] tabular-nums">
                  {formatPrice(product.priceAed)}
                </span>
                {product.compareAtPriceAed && (
                  <span className="text-xs text-neutral-400 line-through tabular-nums">
                    {formatPrice(product.compareAtPriceAed)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#635B50] font-light leading-relaxed line-clamp-3 mb-6">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium text-[#171717]">
                    Size: <strong>{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#9E7D4E] hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] h-10 px-2.5 text-xs tracking-wider transition-colors cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#171717] text-white'
                          : 'bg-white border border-[#DCD5C9] text-[#171717] hover:border-[#171717]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs uppercase tracking-wider font-medium text-[#171717]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#DCD5C9] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-[#EAE3D8]">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs font-semibold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 border transition-colors flex items-center justify-center cursor-pointer ${
                    isSaved
                      ? 'border-[#C5A880] bg-[#FAF6F0] text-[#C5A880]'
                      : 'border-[#DCD5C9] text-[#171717] bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full py-2.5 text-xs tracking-wider uppercase text-[#736B60] hover:text-[#171717] flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full Garment Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
