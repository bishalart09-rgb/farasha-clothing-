import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotalAed,
    shippingAed,
    freeShippingThresholdAed,
    totalAed,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    navigateTo,
    formatPrice
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const progressPct = Math.min(100, (subtotalAed / freeShippingThresholdAed) * 100);
  const remainingForFree = Math.max(0, freeShippingThresholdAed - subtotalAed);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewBag = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#171717] shadow-2xl flex flex-col justify-between border-l border-[#EAE3D8]">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E7D4E]" />
              <h2 className="font-serif text-xl tracking-wider uppercase font-medium">
                YOUR SHOPPING BAG ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-neutral-500 hover:text-[#171717] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F3ECE1] px-6 py-3 border-b border-[#E8DFD1] text-xs">
            {subtotalAed >= freeShippingThresholdAed ? (
              <span className="text-[#1E4738] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1E4738]" />
                You have qualified for complimentary UAE express delivery!
              </span>
            ) : (
              <div>
                <p className="text-[#6B6357] mb-1.5">
                  Add <span className="font-semibold text-[#171717]">{formatPrice(remainingForFree)}</span> more for Free UAE Shipping
                </p>
                <div className="w-full bg-[#E5DBCB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C5A880] h-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EAE3D8]">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#736B60]">
                <ShoppingBag className="w-12 h-12 stroke-[1] mx-auto mb-4 text-[#C5A880]" />
                <p className="font-serif text-xl text-[#171717] mb-2">Your bag is empty</p>
                <p className="text-xs font-light mb-6">Discover our curated Dubai collections and select your signature pieces.</p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('collections', undefined, 'all');
                  }}
                  className="px-6 py-3 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#C5A880] hover:text-[#171717] transition-colors"
                >
                  START BROWSING
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-5 flex gap-4">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top bg-[#F0EAE1] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-base text-[#171717] font-medium leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-[#999] hover:text-rose-700 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#736B60] mt-1 space-x-2">
                        <span>Size: <strong className="text-[#171717]">{item.selectedSize}</strong></span>
                        {item.selectedColor && (
                          <span>· Color: <strong className="text-[#171717]">{item.selectedColor}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#DCD5C9] bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs tabular-nums font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs hover:bg-[#F3EFEA]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#171717] tabular-nums">
                        {formatPrice(item.product.priceAed * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F6F1EA] border-t border-[#EAE3D8] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#6B6357]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171717] tabular-nums">{formatPrice(subtotalAed)}</span>
                </div>
                <div className="flex justify-between text-[#6B6357]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#171717]">
                    {shippingAed === 0 ? 'Complimentary' : formatPrice(shippingAed)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif text-[#171717] pt-2 border-t border-[#E2D9CC] font-semibold">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(totalAed)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs font-semibold tracking-[0.25em] uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleViewBag}
                  className="w-full py-2.5 border border-[#171717] text-[#171717] text-xs font-medium tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer"
                >
                  VIEW FULL BAG
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
