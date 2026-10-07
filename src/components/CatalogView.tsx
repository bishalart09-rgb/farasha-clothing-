import React, { useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { CategorySlug, OccasionType } from '../types';
import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import { RaiseUp } from './RaiseUp';
import { motion } from 'motion/react';

export const CatalogView: React.FC = () => {
  const {
    selectedCategoryFilter,
    selectedOccasionFilter,
    navigateTo
  } = useShop();

  const [activeCategory, setActiveCategory] = useState<CategorySlug>(selectedCategoryFilter || 'all');
  const [activeOccasion, setActiveOccasion] = useState<OccasionType | null>(selectedOccasionFilter || null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories: { label: string; slug: CategorySlug }[] = [
    { label: 'ALL COLLECTIONS', slug: 'all' },
    { label: 'NEW ARRIVALS', slug: 'new-arrivals' },
    { label: 'KURTIS', slug: 'kurtis' },
    { label: 'SAREES', slug: 'sarees' },
    { label: 'MODEST WEAR', slug: 'modest-wear' },
    { label: 'PREMIUM COLLECTION', slug: 'collections' }
  ];

  const occasions: OccasionType[] = [
    'WEDDING GUEST',
    'FESTIVE',
    'PARTY',
    'EVERYDAY ELEGANCE',
    'MODEST & SOPHISTICATED'
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory === 'new-arrivals') {
      list = list.filter((p) => p.isNewArrival);
    } else if (activeCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    if (activeOccasion) {
      list = list.filter((p) => p.occasions.includes(activeOccasion));
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceAed - b.priceAed);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceAed - a.priceAed);
    }

    return list;
  }, [activeCategory, activeOccasion, sortBy]);

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'new-arrivals':
        return 'NEW ARRIVALS';
      case 'kurtis':
        return 'KURTIS & SUITS';
      case 'sarees':
        return 'SAREES';
      case 'modest-wear':
        return 'MODEST WEAR & KAFTANS';
      case 'collections':
        return 'FARASHA ATELIER SIGNATURES';
      default:
        return 'ALL CREATIONS';
    }
  };

  const getCategorySubtitle = () => {
    switch (activeCategory) {
      case 'new-arrivals':
        return 'The newest additions to our Dubai and Sharjah boutiques.';
      case 'kurtis':
        return 'Tailored Chikankari, handloom raw silks, and modern architectural tunics.';
      case 'sarees':
        return 'Handwoven Banarasi silk, georgette, and pure zari heirlooms.';
      case 'modest-wear':
        return 'Contemporary kimono abayas and jewel-tone flowing modest silhouettes.';
      case 'collections':
        return 'Opulent statement Anarkalis and limited bridal brocades.';
      default:
        return 'Explore timeless Indian and contemporary Gulf fashion, curated for the modern woman.';
    }
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Breadcrumb */}
      <RaiseUp yOffset={16} duration={0.5} className="flex items-center gap-2 text-xs text-[#736B60] mb-8 pb-4 border-b border-[#EAE3D8]">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-[#171717] transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="uppercase text-[#171717] font-medium tracking-wider">Collections</span>
        <span>/</span>
        <span className="uppercase text-[#9E7D4E] font-medium tracking-wider">{activeCategory}</span>
      </RaiseUp>

      {/* Header Banner with Raise Up */}
      <RaiseUp yOffset={28} className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#9E7D4E] font-medium block mb-2">
          FARASHA WARDROBE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-wide mb-3">
          {getCategoryTitle()}
        </h1>
        <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mb-3" />
        <p className="text-sm text-[#6E675D] font-light max-w-lg mx-auto">
          {getCategorySubtitle()}
        </p>
      </RaiseUp>

      {/* Category Tabs */}
      <RaiseUp delay={0.1} yOffset={20} className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8 border-b border-[#EAE3D8]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white border border-[#DCD5C9] text-[#5C554B] hover:text-[#171717] hover:border-[#171717]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </RaiseUp>

      {/* Filter and Sort Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-[#EAE3D8] text-xs">
        {/* Occasions Filter Bar */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="flex items-center gap-1.5 text-[#888] uppercase tracking-wider text-[11px] mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E7D4E]" />
            Occasion:
          </span>

          {activeOccasion && (
            <button
              onClick={() => setActiveOccasion(null)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#171717] text-white text-[11px] uppercase tracking-wider"
            >
              <span>{activeOccasion}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {!activeOccasion &&
            occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setActiveOccasion(occ)}
                className="px-2.5 py-1 text-[11px] tracking-wider uppercase bg-white border border-[#E0D7CB] text-[#555] hover:text-[#171717] hover:border-[#171717] transition-colors"
              >
                {occ}
              </button>
            ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[#888] uppercase tracking-wider text-[11px]">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#DCD5C9] px-3 py-1.5 text-xs text-[#171717] focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid with Staggered Raise Up */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-[#736B60]">
          <p className="font-serif text-2xl text-[#171717] mb-2">No garments found</p>
          <p className="text-xs font-light mb-6">Try clearing your filters to explore our full boutique selection.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveOccasion(null);
            }}
            className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
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
