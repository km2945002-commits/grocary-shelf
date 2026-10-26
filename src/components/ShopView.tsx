/**
 * GROCARY SHELF — Shop & Catalog Page View
 */

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { MainCategory } from '../types';

export const ShopView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    formatPKR 
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(9000);
  const [onlySale, setOnlySale] = useState(false);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string | null>(null);

  const categories: { id: MainCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'men', label: "Men's Fashion" },
    { id: 'women', label: "Women's Fashion" },
    { id: 'kids', label: "Kids' Fashion" },
    { id: 'peshawari', label: 'Peshawari Chappal' },
    { id: 'footwear', label: 'Footwear & Loafers' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'peshawari') {
          if (p.category !== 'peshawari' && p.subcategory !== 'peshawari') return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // Sale filter
      if (onlySale && !p.onSale) return false;

      // Size filter
      if (selectedSizeFilter && !p.sizes.includes(selectedSizeFilter)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // default featured
    });
  }, [products, selectedCategory, maxPrice, onlySale, selectedSizeFilter, sortBy]);

  const allAvailableSizes = ['S', 'M', 'L', 'XL', '7', '8', '9', '10', '11'];

  return (
    <div className="py-10 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#075C3B] font-semibold">Store Catalog</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize text-neutral-800 font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#151515]">
                {selectedCategory === 'all'
                  ? 'All Collections'
                  : selectedCategory === 'peshawari'
                  ? 'Authentic Peshawari Chappal Collection'
                  : `${categories.find((c) => c.id === selectedCategory)?.label}`}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Showing {filteredProducts.length} premium handcrafted &amp; tailored garments with Cash on Delivery across Pakistan.
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <ArrowUpDown className="w-4 h-4 text-neutral-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-xl border border-neutral-200/80 shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#075C3B] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Bar Strip */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Price Range Slider */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-700">Max Price:</span>
            <input
              type="range"
              min="2000"
              max="9000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#075C3B] w-28 sm:w-36 cursor-pointer"
            />
            <span className="font-bold text-[#075C3B]">{formatPKR(maxPrice)}</span>
          </div>

          {/* Quick Size Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-neutral-700 mr-1">Size:</span>
            <button
              onClick={() => setSelectedSizeFilter(null)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                selectedSizeFilter === null
                  ? 'bg-[#075C3B] text-white border-[#075C3B]'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              All
            </button>
            {allAvailableSizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSizeFilter(selectedSizeFilter === s ? null : s)}
                className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                  selectedSizeFilter === s
                    ? 'bg-[#075C3B] text-white border-[#075C3B]'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sale Only Toggle */}
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-700">
            <input
              type="checkbox"
              checked={onlySale}
              onChange={(e) => setOnlySale(e.target.checked)}
              className="w-4 h-4 text-[#075C3B] accent-[#075C3B] rounded"
            />
            <span>Sale Items Only</span>
          </label>

          {(maxPrice < 9000 || onlySale || selectedSizeFilter !== null) && (
            <button
              onClick={() => {
                setMaxPrice(9000);
                setOnlySale(false);
                setSelectedSizeFilter(null);
              }}
              className="text-[#075C3B] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 max-w-lg mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-neutral-800 mb-2">No matching products found</h3>
            <p className="text-xs text-neutral-500 mb-6">
              Try adjusting your price range or clearing size filters to view more items.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(9000);
                setOnlySale(false);
                setSelectedSizeFilter(null);
              }}
              className="px-6 py-2.5 bg-[#075C3B] hover:bg-[#05462D] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
