import React from 'react';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const WishlistView: React.FC = () => {
  const { wishlistProducts, navigateTo } = useShop();

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Breadcrumb */}
      <RaiseUp yOffset={16} duration={0.4} className="flex items-center gap-2 text-xs text-[#736B60] mb-8 pb-4 border-b border-[#EAE3D8]">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-[#171717] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="uppercase text-[#171717] font-medium tracking-wider">Wishlist</span>
      </RaiseUp>

      {/* Header Banner with Raise Up */}
      <RaiseUp yOffset={28} className="text-center max-w-xl mx-auto mb-12">
        <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#EAE3D8] flex items-center justify-center mx-auto mb-4 text-[#C5A880]">
          <Heart className="w-6 h-6 fill-[#C5A880]" />
        </div>
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-1">
          PERSONAL ATELIER SAVED PIECES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide mb-3">
          YOUR WISHLIST ({wishlistProducts.length})
        </h1>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-3" />
        <p className="text-xs sm:text-sm text-[#736B60] font-light">
          Review your favored sarees, kurtis, and modest silhouettes before booking a boutique fitting or ordering online.
        </p>
      </RaiseUp>

      {wishlistProducts.length === 0 ? (
        <RaiseUp delay={0.15} yOffset={24} className="py-16 text-center text-[#736B60] max-w-md mx-auto">
          <p className="font-serif text-2xl text-[#171717] mb-3">Your wishlist is currently empty</p>
          <p className="text-xs font-light mb-8">
            Click the heart icon on any Farasha creation to save it to your personal wardrobe collection.
          </p>
          <button
            onClick={() => navigateTo('collections', undefined, 'all')}
            className="px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer hover:-translate-y-0.5"
          >
            DISCOVER PIECES
          </button>
        </RaiseUp>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {wishlistProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: (idx % 4) * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
