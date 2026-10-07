import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const kurtiSizes = [
    { size: 'XS', bustIn: '34', bustCm: '86', waistIn: '28', waistCm: '71', hipIn: '36', hipCm: '91', lengthIn: '44', lengthCm: '112' },
    { size: 'S', bustIn: '36', bustCm: '91', waistIn: '30', waistCm: '76', hipIn: '38', hipCm: '96', lengthIn: '44', lengthCm: '112' },
    { size: 'M', bustIn: '38', bustCm: '96', waistIn: '32', waistCm: '81', hipIn: '40', hipCm: '101', lengthIn: '45', lengthCm: '114' },
    { size: 'L', bustIn: '40', bustCm: '101', waistIn: '34', waistCm: '86', hipIn: '42', hipCm: '106', lengthIn: '45', lengthCm: '114' },
    { size: 'XL', bustIn: '42', bustCm: '106', waistIn: '36', waistCm: '91', hipIn: '44', hipCm: '111', lengthIn: '46', lengthCm: '116' },
    { size: 'XXL', bustIn: '44', bustCm: '112', waistIn: '38', waistCm: '96', hipIn: '46', hipCm: '117', lengthIn: '46', lengthCm: '116' }
  ];

  const modestSizes = [
    { size: '52', height: '5\'0" - 5\'2"', bustIn: '38 - 42', bustCm: '96 - 106', lengthIn: '52', lengthCm: '132' },
    { size: '54', height: '5\'2" - 5\'4"', bustIn: '40 - 44', bustCm: '101 - 111', lengthIn: '54', lengthCm: '137' },
    { size: '56', height: '5\'4" - 5\'6"', bustIn: '42 - 46', bustCm: '106 - 116', lengthIn: '56', lengthCm: '142' },
    { size: '58', height: '5\'6" - 5\'8"', bustIn: '44 - 48', bustCm: '111 - 122', lengthIn: '58', lengthCm: '147' },
    { size: '60', height: '5\'8"+', bustIn: '46 - 50', bustCm: '116 - 127', lengthIn: '60', lengthCm: '152' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div
        className="relative bg-[#FAF8F5] text-[#171717] w-full max-w-3xl overflow-hidden shadow-2xl border border-[#EAE3D8] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D8] mb-6">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#9E7D4E]" />
            <h2 className="font-serif text-2xl tracking-wide uppercase font-medium">
              FARASHA SIZE GUIDE & MEASUREMENTS
            </h2>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-neutral-500 hover:text-[#171717] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[#6B6357] font-light">
            All garments are handcrafted with 1.5 inch margins for effortless boutique alterations.
          </p>
          <div className="flex items-center border border-[#DCD5C9] bg-white p-0.5">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-semibold cursor-pointer ${
                unit === 'in' ? 'bg-[#171717] text-white' : 'text-[#736B60] hover:text-[#171717]'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-semibold cursor-pointer ${
                unit === 'cm' ? 'bg-[#171717] text-white' : 'text-[#736B60] hover:text-[#171717]'
              }`}
            >
              CENTIMETERS
            </button>
          </div>
        </div>

        {/* Kurtis & Suits Table */}
        <div className="mb-8">
          <h3 className="font-serif text-base tracking-wider uppercase font-medium text-[#171717] mb-3">
            KURTIS, ANARKALIS & SUITS
          </h3>
          <div className="overflow-x-auto border border-[#EAE3D8] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5F0] text-[#736B60] border-b border-[#EAE3D8] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">SIZE</th>
                  <th className="py-2.5 px-4 font-semibold">BUST</th>
                  <th className="py-2.5 px-4 font-semibold">WAIST</th>
                  <th className="py-2.5 px-4 font-semibold">HIPS</th>
                  <th className="py-2.5 px-4 font-semibold">LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D8] text-[#333] font-mono">
                {kurtiSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-2 px-4 font-bold text-[#171717] font-sans">{row.size}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.waistIn}"` : `${row.waistCm} cm`}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.hipIn}"` : `${row.hipCm} cm`}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modest Abaya & Kaftan Table */}
        <div className="mb-6">
          <h3 className="font-serif text-base tracking-wider uppercase font-medium text-[#171717] mb-3">
            MODEST WEAR & KAFTANS (GULF SIZING)
          </h3>
          <div className="overflow-x-auto border border-[#EAE3D8] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5F0] text-[#736B60] border-b border-[#EAE3D8] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">SIZE (LENGTH)</th>
                  <th className="py-2.5 px-4 font-semibold">RECOMMENDED HEIGHT</th>
                  <th className="py-2.5 px-4 font-semibold">CHEST SPAN</th>
                  <th className="py-2.5 px-4 font-semibold">GARMENT LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D8] text-[#333] font-mono">
                {modestSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-2 px-4 font-bold text-[#171717] font-sans">{row.size}</td>
                    <td className="py-2 px-4 font-sans">{row.height}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                    <td className="py-2 px-4">{unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Saree Note */}
        <div className="bg-[#F6F1EA] p-4 border border-[#E8DFD1] text-xs text-[#524B40] space-y-1 mb-6">
          <div className="flex items-center gap-1.5 font-medium text-[#171717]">
            <CheckCircle2 className="w-4 h-4 text-[#9E7D4E]" />
            <span>Sarees are Universal Free Size</span>
          </div>
          <p className="font-light">
            All Farasha sarees come with 5.5m pure drape fabric and 0.8m unstitched designer blouse piece that our Dubai/Sharjah boutiques can customize to your exact measurements.
          </p>
        </div>

        <div className="text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#171717] hover:bg-[#C5A880] text-white hover:text-[#171717] text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
