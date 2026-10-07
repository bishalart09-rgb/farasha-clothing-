import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPrice } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.occasions.some((occ) => occ.toLowerCase().includes(q))
      );
    });
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: import('../types').Product) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo('product-detail', product);
  };

  const popularSearches = ['Zardozi Saree', 'Chikankari Kurti', 'Modest Kaftan', 'Banarasi Silk', 'Anarkali Dress'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative bg-[#FAF8F5] text-[#171717] w-full max-w-2xl overflow-hidden shadow-2xl border border-[#EAE3D8] animate-in fade-in slide-in-from-top-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#9E7D4E]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, kurtis, modest wear, occasions..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#171717] placeholder:text-[#999] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#888] hover:text-[#171717] p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setQuery('');
            }}
            className="p-1.5 text-neutral-500 hover:text-[#171717] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C8275] block mb-3 font-medium">
              SUGGESTED DISCOVERIES
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 text-xs bg-white border border-[#E0D7CA] text-[#4A443B] hover:border-[#171717] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#EAE3D8]">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-[#736B60]">
                <p className="font-serif text-lg text-[#171717] mb-1">No garments match "{query}"</p>
                <p className="text-xs font-light">Try searching for "saree", "kurti", "modest", or "anarkali"</p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-[#F3ECE1]/60 px-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-12 h-16 object-cover object-top bg-[#EFE9DF] shrink-0"
                    />
                    <div>
                      <span className="text-[9px] tracking-widest uppercase text-[#9E7D4E] block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-base text-[#171717] font-medium leading-snug">
                        {product.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#171717] tabular-nums font-mono">
                        {formatPrice(product.priceAed)}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#8C8275]" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
