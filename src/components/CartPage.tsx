import React from 'react';
import { Trash2, ArrowRight, ArrowLeft, ShieldCheck, Lock, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotalAed,
    shippingAed,
    freeShippingThresholdAed,
    totalAed,
    navigateTo,
    formatPrice
  } = useShop();

  const remainingForFree = Math.max(0, freeShippingThresholdAed - subtotalAed);

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-3xl mx-auto px-4 text-center">
        <ShoppingBag className="w-14 h-14 stroke-[1] mx-auto text-[#C5A880] mb-4" />
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal mb-3">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-sm text-[#736B60] font-light max-w-md mx-auto mb-8">
          Explore our timeless collections of sarees, kurtis, and modest silhouettes crafted for Dubai elegance.
        </p>
        <button
          onClick={() => navigateTo('collections', undefined, 'all')}
          className="px-8 py-4 bg-[#171717] text-white text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#C5A880] hover:text-[#171717] transition-colors"
        >
          EXPLORE COLLECTIONS
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header with Raise Up */}
      <RaiseUp yOffset={20} className="mb-10 pb-6 border-b border-[#EAE3D8]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-1">
              REVIEW YOUR ORDER
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide">
              SHOPPING BAG ({cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('collections', undefined, 'all')}
            className="hidden sm:inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#736B60] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </RaiseUp>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bag Items Table with Raise Up */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 bg-white border border-[#EAE3D8] shadow-xs divide-y divide-[#EAE3D8]"
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-[#F8F5F0] text-[11px] uppercase tracking-widest text-[#82786B] font-medium">
            <span className="col-span-6">PRODUCT</span>
            <span className="col-span-2 text-center">SIZE</span>
            <span className="col-span-2 text-center">QUANTITY</span>
            <span className="col-span-2 text-right">TOTAL</span>
          </div>

          {/* Item Rows */}
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}`} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Product Info */}
              <div className="sm:col-span-6 flex items-center gap-4">
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  className="w-20 h-24 sm:w-24 sm:h-28 object-cover object-top bg-[#F3ECE1] shrink-0"
                />
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-[#9E7D4E] block">
                    {item.product.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#171717] font-medium leading-tight">
                    {item.product.name}
                  </h3>
                  <span className="text-xs text-[#666] font-mono mt-1 block">
                    {formatPrice(item.product.priceAed)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#A69B8D] hover:text-rose-700 transition-colors mt-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Size */}
              <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                <span className="text-xs uppercase text-[#888] sm:hidden">Size:</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#F8F5F0] border border-[#EAE3D8]">
                  {item.selectedSize}
                </span>
              </div>

              {/* Quantity */}
              <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                <span className="text-xs uppercase text-[#888] sm:hidden">Quantity:</span>
                <div className="flex items-center border border-[#DCD5C9] bg-white">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                    className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-medium tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                    className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-2 text-right">
                <span className="font-semibold text-sm sm:text-base text-[#171717] tabular-nums">
                  {formatPrice(item.product.priceAed * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Column: Order Summary with Raise Up */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 bg-[#F8F5F0] border border-[#EAE3D8] p-6 sm:p-8 shadow-xs"
        >
          <h2 className="font-serif text-2xl text-[#171717] font-medium tracking-wide mb-6">
            ORDER SUMMARY
          </h2>

          <div className="space-y-3.5 text-xs text-[#6B6357] pb-6 border-b border-[#E2D9CC]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#171717] font-medium tabular-nums">{formatPrice(subtotalAed)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping (UAE Express)</span>
              <span className="text-[#171717] font-medium">
                {shippingAed === 0 ? 'Complimentary' : formatPrice(shippingAed)}
              </span>
            </div>

            {shippingAed > 0 && (
              <p className="text-[11px] text-[#9E7D4E]">
                Add {formatPrice(remainingForFree)} more to enjoy free UAE delivery.
              </p>
            )}

            <div className="flex justify-between">
              <span>UAE VAT (5%)</span>
              <span className="text-[#171717] font-medium">Included</span>
            </div>
          </div>

          <div className="py-5 flex justify-between items-baseline border-b border-[#E2D9CC]">
            <span className="font-serif text-lg text-[#171717] font-medium">Estimated Total</span>
            <span className="font-serif text-2xl font-bold text-[#171717] tabular-nums">
              {formatPrice(totalAed)}
            </span>
          </div>

          {/* Proceed to checkout button */}
          <button
            onClick={() => navigateTo('checkout')}
            className="w-full mt-6 py-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Guarantees */}
          <div className="mt-6 pt-6 border-t border-[#EAE3D8] space-y-3 text-[11px] text-[#736B60]">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#9E7D4E]" />
              <span>Encrypted & secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D4E]" />
              <span>100% Authentic Farasha garments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E7D4E]" />
              <span>Free returns or exchanges across Dubai & Sharjah boutiques</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
