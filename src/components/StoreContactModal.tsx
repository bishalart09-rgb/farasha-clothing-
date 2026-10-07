import React, { useState } from 'react';
import { X, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BOUTIQUES_DATA } from '../data/products';

export const StoreContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen, contactBoutiqueId } = useShop();
  const [selectedBoutique, setSelectedBoutique] = useState<'dubai' | 'sharjah'>(
    contactBoutiqueId === 'sharjah' ? 'sharjah' : 'dubai'
  );

  if (!isContactModalOpen) return null;

  const currentStore = BOUTIQUES_DATA.find((b) => b.id === selectedBoutique) || BOUTIQUES_DATA[0];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello Farasha Clothing, I would like to inquire about the ${currentStore.name} collection.`);
    window.open(`https://wa.me/${currentStore.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="relative bg-[#FAF8F5] text-[#171717] w-full max-w-xl overflow-hidden shadow-2xl border border-[#EAE3D8] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8] mb-6">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E7D4E] font-medium block">
              BOUTIQUE CONCIERGE
            </span>
            <h2 className="font-serif text-2xl text-[#171717] font-medium tracking-wide">
              CONNECT WITH FARASHA
            </h2>
          </div>
          <button
            onClick={() => setIsContactModalOpen(false)}
            className="p-1 text-neutral-500 hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boutique Switcher Tabs */}
        <div className="flex border border-[#DCD5C9] bg-white p-1 mb-6">
          <button
            onClick={() => setSelectedBoutique('dubai')}
            className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              selectedBoutique === 'dubai' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#736B60] hover:text-[#171717]'
            }`}
          >
            DUBAI FLAGSHIP
          </button>
          <button
            onClick={() => setSelectedBoutique('sharjah')}
            className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
              selectedBoutique === 'sharjah' ? 'bg-[#171717] text-white shadow-xs' : 'text-[#736B60] hover:text-[#171717]'
            }`}
          >
            SHARJAH BOUTIQUE
          </button>
        </div>

        {/* Store Info Card */}
        <div className="bg-[#F6F1EA] p-5 border border-[#E8DFD1] space-y-3 text-xs text-[#554E44] mb-6">
          <h3 className="font-serif text-lg text-[#171717] font-medium">
            {currentStore.name}
          </h3>
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#9E7D4E] shrink-0 mt-0.5" />
            <span>{currentStore.address}</span>
          </p>
          <p className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#9E7D4E] shrink-0 mt-0.5" />
            <span>{currentStore.timings}</span>
          </p>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="tel:0505016078"
            className="py-3 px-4 border border-[#171717] text-[#171717] hover:border-[#9E7D4E] hover:text-[#9E7D4E] text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#9E7D4E]" />
            <span>CALL 0505016078</span>
          </a>

          <button
            onClick={handleWhatsApp}
            className="py-3 px-4 bg-[#1E4738] hover:bg-[#255C49] text-white text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WHATSAPP STORE</span>
          </button>
        </div>

        {/* International Ordering Line */}
        <div className="p-3.5 bg-white border border-[#EAE3D8] flex items-center justify-between text-xs text-[#666]">
          <span>International Patron Line:</span>
          <a
            href="tel:00971507325758"
            className="font-mono font-semibold text-[#171717] hover:text-[#9E7D4E]"
          >
            00971507325758
          </a>
        </div>
      </div>
    </div>
  );
};
