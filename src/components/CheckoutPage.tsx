import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, CreditCard, Banknote, Smartphone, MapPin, Phone } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';
import { FARASHA_WHATSAPP_NUMBER } from '../data/products';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotalAed,
    shippingAed,
    totalAed,
    clearCart,
    navigateTo,
    formatPrice,
    setLatestOrder,
    latestOrder
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emirateOrCountry: 'Dubai',
    city: 'Dubai',
    address: '',
    apartment: '',
    deliveryNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod' | 'card_on_delivery'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // If already completed in this view
  if (orderComplete && latestOrder) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-[#F4EFE6] border border-[#C5A880] rounded-full flex items-center justify-center mx-auto mb-6 text-[#9E7D4E]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
          ORDER CONFIRMED
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide mb-3">
          Thank you, {latestOrder.customer.fullName}.
        </h1>

        <p className="text-sm text-[#6E675D] font-light max-w-md mx-auto mb-8">
          Your Farasha order <strong className="text-[#171717] font-mono">{latestOrder.orderNumber}</strong> has been received and is being prepared with white-glove care at our Dubai atelier.
        </p>

        {/* Order Details Card */}
        <div className="bg-white border border-[#EAE3D8] p-6 text-left text-xs text-[#524B40] space-y-4 mb-8 shadow-xs">
          <div className="flex justify-between border-b border-[#F0EAE1] pb-3">
            <span className="text-[#888]">Order Number:</span>
            <span className="font-mono font-bold text-[#171717]">{latestOrder.orderNumber}</span>
          </div>

          <div className="flex justify-between border-b border-[#F0EAE1] pb-3">
            <span className="text-[#888]">Estimated Delivery:</span>
            <span className="font-medium text-[#1E4738]">{latestOrder.estimatedDelivery}</span>
          </div>

          <div className="flex justify-between border-b border-[#F0EAE1] pb-3">
            <span className="text-[#888]">Destination:</span>
            <span className="text-[#171717] font-medium text-right max-w-xs">{latestOrder.customer.address}, {latestOrder.customer.emirateOrCountry}</span>
          </div>

          <div className="flex justify-between border-b border-[#F0EAE1] pb-3">
            <span className="text-[#888]">Payment Mode:</span>
            <span className="uppercase text-[#171717] font-medium">{latestOrder.paymentMethod.replace('_', ' ')}</span>
          </div>

          <div className="flex justify-between text-sm font-semibold pt-1 text-[#171717]">
            <span>Total Paid:</span>
            <span className="tabular-nums font-serif text-base">{formatPrice(latestOrder.total)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs tracking-[0.25em] uppercase font-semibold transition-colors"
          >
            RETURN TO BOUTIQUE
          </button>

          <a
            href="https://wa.me/971505016078"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 border border-[#171717] text-[#171717] hover:border-[#9E7D4E] hover:text-[#9E7D4E] text-xs tracking-wider uppercase font-medium transition-colors"
          >
            WhatsApp UAE Support
          </a>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <p className="font-serif text-2xl text-[#171717] mb-4">No items to checkout</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-[#171717] text-white text-xs tracking-widest uppercase font-medium"
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  const handleWhatsAppEnquiry = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    if (cart.length === 0) return;

    const deliveryText = shippingAed === 0 ? 'Complimentary' : `${shippingAed.toLocaleString('en-US')} AED`;
    const grandTotalText = `${totalAed.toLocaleString('en-US')} AED`;

    let itemsBlock = '';
    if (cart.length === 1) {
      const item = cart[0];
      const sizeSuffix = item.selectedSize && item.selectedSize !== 'Free Size' ? ` (${item.selectedSize})` : '';
      const unitPriceFormatted = `${item.product.priceAed.toLocaleString('en-US')} AED`;
      const subtotalFormatted = `${(item.product.priceAed * item.quantity).toLocaleString('en-US')} AED`;

      itemsBlock = [
        `Product: ${item.product.name}${sizeSuffix}`,
        `Quantity: ${item.quantity}`,
        `Unit Price: ${unitPriceFormatted}`,
        `Subtotal: ${subtotalFormatted}`
      ].join('\n');
    } else {
      itemsBlock = cart
        .map((item) => {
          const sizeSuffix = item.selectedSize && item.selectedSize !== 'Free Size' ? ` (${item.selectedSize})` : '';
          const unitPriceFormatted = `${item.product.priceAed.toLocaleString('en-US')} AED`;
          const subtotalFormatted = `${(item.product.priceAed * item.quantity).toLocaleString('en-US')} AED`;

          return [
            `Product: ${item.product.name}${sizeSuffix}`,
            `Quantity: ${item.quantity}`,
            `Unit Price: ${unitPriceFormatted}`,
            `Subtotal: ${subtotalFormatted}`
          ].join('\n');
        })
        .join('\n\n');
    }

    const messageLines = [
      'Hello Farasha Clothing,',
      '',
      'I would like to enquire about the following order:',
      '',
      itemsBlock,
      `Delivery: ${deliveryText}`,
      'VAT: Included',
      `Grand Total: ${grandTotalText}`,
      '',
      'Please confirm the availability and order details.',
      '',
      'Thank you.'
    ];

    const message = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/${FARASHA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 lg:py-16 max-w-2xl mx-auto px-4 sm:px-6 overflow-hidden">
      {/* Back button */}
      <RaiseUp yOffset={16} duration={0.4}>
        <button
          onClick={() => navigateTo('cart')}
          className="inline-flex items-center gap-2 text-xs text-[#736B60] hover:text-[#171717] transition-colors mb-6 uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping Bag</span>
        </button>
      </RaiseUp>

      {/* Header */}
      <RaiseUp yOffset={24} className="text-center mb-10 pb-6 border-b border-[#EAE3D8]">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-1">
          CONFIDENTIAL & SECURE CHECKOUT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-wide">
          FARASHA ATELIER CHECKOUT
        </h1>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-3" />
      </RaiseUp>

      <form onSubmit={handleWhatsAppEnquiry} className="space-y-10">
        {/* Section 1: Customer & Shipping Address */}
        <RaiseUp delay={0.1} yOffset={32} className="bg-white border border-[#EAE3D8] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#EAE3D8]">
            <MapPin className="w-4 h-4 text-[#9E7D4E]" />
            <h2 className="font-serif text-xl text-[#171717] font-medium tracking-wide">
              1. SHIPPING DESTINATION
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Sheikha Al-Mansoor"
                className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="For order tracking & receipt"
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                  Phone (WhatsApp Delivery updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 050 501 6078"
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                  Emirate / Country *
                </label>
                <select
                  value={formData.emirateOrCountry}
                  onChange={(e) => setFormData({ ...formData, emirateOrCountry: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                >
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="Sharjah">Sharjah, UAE</option>
                  <option value="Abu Dhabi">Abu Dhabi, UAE</option>
                  <option value="Ajman">Ajman, UAE</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah, UAE</option>
                  <option value="Fujairah">Fujairah, UAE</option>
                  <option value="Umm Al Quwain">Umm Al Quwain, UAE</option>
                  <option value="Saudi Arabia">Kingdom of Saudi Arabia (GCC)</option>
                  <option value="Qatar">Qatar (GCC)</option>
                  <option value="Kuwait">Kuwait (GCC)</option>
                  <option value="Bahrain">Bahrain (GCC)</option>
                  <option value="Oman">Oman (GCC)</option>
                  <option value="United Kingdom">United Kingdom (International)</option>
                  <option value="United States">United States (International)</option>
                  <option value="Other International">Other Worldwide</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                  City / Area *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Jumeirah 1 / Downtown / Al Majaz"
                  className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                Street Address & Villa / Apartment Number *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. Villa 24, Street 18B, Near City Walk"
                className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-3 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-medium text-[#171717] mb-1.5">
                Special Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.deliveryNotes}
                onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                placeholder="Gate code, convenient delivery hour, or concierge dropoff"
                className="w-full bg-[#FAF8F5] border border-[#DCD5C9] px-4 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
              />
            </div>
          </div>
        </RaiseUp>

        {/* Section 2: Payment Method with Raise Up */}
        <RaiseUp delay={0.15} yOffset={32} className="bg-white border border-[#EAE3D8] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#EAE3D8]">
            <CreditCard className="w-4 h-4 text-[#9E7D4E]" />
            <h2 className="font-serif text-xl text-[#171717] font-medium tracking-wide">
              2. PAYMENT PREFERENCE
            </h2>
          </div>

          <div className="space-y-3">
            {/* Credit / Debit Card */}
            <label
              className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                paymentMethod === 'card' ? 'border-[#171717] bg-[#FAF7F2]' : 'border-[#EAE3D8] hover:border-neutral-400'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Credit / Debit Card (Visa, MasterCard, Amex)
                  </span>
                  <CreditCard className="w-4 h-4 text-[#9E7D4E]" />
                </div>
                <p className="text-[11px] text-[#736B60] mt-0.5">
                  Processed via 3D Secure UAE banking gateway.
                </p>

                {paymentMethod === 'card' && (
                  <div className="mt-4 pt-4 border-t border-[#E8E0D4] space-y-3">
                    <input
                      type="text"
                      placeholder="Card Number (4000 1234 5678 9010)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#DCD5C9] px-3.5 py-2.5 text-xs text-[#171717] font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="bg-white border border-[#DCD5C9] px-3.5 py-2.5 text-xs text-[#171717] font-mono"
                      />
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="CVV"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="bg-white border border-[#DCD5C9] px-3.5 py-2.5 text-xs text-[#171717] font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </label>

            {/* Apple Pay / Digital Wallet */}
            <label
              className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                paymentMethod === 'apple_pay' ? 'border-[#171717] bg-[#FAF7F2]' : 'border-[#EAE3D8] hover:border-neutral-400'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'apple_pay'}
                onChange={() => setPaymentMethod('apple_pay')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Apple Pay / Google Pay
                  </span>
                  <Smartphone className="w-4 h-4 text-[#9E7D4E]" />
                </div>
                <p className="text-[11px] text-[#736B60] mt-0.5">
                  Instant biometric checkout with one touch.
                </p>
              </div>
            </label>

            {/* Card on Delivery (UAE Only) */}
            <label
              className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                paymentMethod === 'card_on_delivery' ? 'border-[#171717] bg-[#FAF7F2]' : 'border-[#EAE3D8] hover:border-neutral-400'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card_on_delivery'}
                onChange={() => setPaymentMethod('card_on_delivery')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Card Machine on Delivery (UAE Only)
                  </span>
                  <CreditCard className="w-4 h-4 text-[#9E7D4E]" />
                </div>
                <p className="text-[11px] text-[#736B60] mt-0.5">
                  Courier brings wireless terminal to your doorstep.
                </p>
              </div>
            </label>

            {/* Cash on Delivery (UAE Only) */}
            <label
              className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                paymentMethod === 'cod' ? 'border-[#171717] bg-[#FAF7F2]' : 'border-[#EAE3D8] hover:border-neutral-400'
              }`}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Cash on Delivery (UAE Only)
                  </span>
                  <Banknote className="w-4 h-4 text-[#9E7D4E]" />
                </div>
                <p className="text-[11px] text-[#736B60] mt-0.5">
                  Pay cash upon receiving and inspecting your Farasha package.
                </p>
              </div>
            </label>
          </div>
        </RaiseUp>

        {/* Section 3: Order Summary & Place Order with Raise Up */}
        <RaiseUp delay={0.2} yOffset={32} className="bg-[#FAF8F5] border border-[#EAE3D8] p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-xl text-[#171717] font-medium tracking-wide mb-4">
            3. FINAL REVIEW
          </h2>

          <div className="space-y-3 text-xs text-[#5C554B] pb-6 border-b border-[#EAE3D8]">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between items-center">
                <span>
                  {item.quantity}x {item.product.name} ({item.selectedSize})
                </span>
                <span className="font-mono font-medium text-[#171717] tabular-nums">
                  {formatPrice(item.product.priceAed * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="py-4 space-y-2 text-xs text-[#5C554B] border-b border-[#EAE3D8]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-[#171717] tabular-nums">{formatPrice(subtotalAed)}</span>
            </div>
            <div className="flex justify-between">
              <span>White-Glove Delivery</span>
              <span className="font-medium text-[#171717]">
                {shippingAed === 0 ? 'Complimentary' : formatPrice(shippingAed)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>UAE VAT (5%)</span>
              <span className="font-medium text-[#171717]">Included</span>
            </div>
          </div>

          <div className="py-4 flex justify-between items-baseline">
            <span className="font-serif text-lg font-medium text-[#171717]">Grand Total</span>
            <span className="font-serif text-2xl font-bold text-[#171717] tabular-nums">
              {formatPrice(totalAed)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppEnquiry}
            aria-label={`WhatsApp Enquiry · ${formatPrice(totalAed)}`}
            className="w-full py-4 mt-4 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>💬 WHATSAPP ENQUIRY · {formatPrice(totalAed)}</span>
          </button>

          <p className="text-[11px] text-center text-[#8C8275] mt-4 font-light">
            By clicking WhatsApp Enquiry, our boutique concierge will assist you immediately with bespoke delivery & availability.
          </p>
        </RaiseUp>
      </form>
    </div>
  );
};
