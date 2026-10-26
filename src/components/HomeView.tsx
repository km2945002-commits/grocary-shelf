/**
 * GROCARY SHELF — Complete Homepage View
 * Implements all 14 required homepage sections
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Hero } from './Hero';
import { CategoryBanners } from './CategoryBanners';
import { FeaturedCategories } from './FeaturedCategories';
import { PeshawariChappalSpotlight } from './PeshawariChappalSpotlight';
import { PromoBanner } from './PromoBanner';
import { TrustBenefits } from './TrustBenefits';
import { CustomerReviews } from './CustomerReviews';
import { Newsletter } from './Newsletter';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { MainCategory } from '../types';

export const HomeView: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useStore();

  const [arrivalsFilter, setArrivalsFilter] = useState<MainCategory | 'all'>('all');
  const [bestsellerFilter, setBestsellerFilter] = useState<MainCategory | 'all'>('all');

  // Filtered New Arrivals
  const newArrivals = products.filter((p) => {
    if (!p.isNew) return false;
    if (arrivalsFilter !== 'all') {
      if (arrivalsFilter === 'peshawari') {
        return p.category === 'peshawari' || p.subcategory === 'peshawari';
      }
      return p.category === arrivalsFilter;
    }
    return true;
  });

  // Filtered Best Sellers
  const bestSellers = products.filter((p) => {
    if (!p.isBestSeller) return false;
    if (bestsellerFilter !== 'all') {
      if (bestsellerFilter === 'peshawari') {
        return p.category === 'peshawari' || p.subcategory === 'peshawari';
      }
      return p.category === bestsellerFilter;
    }
    return true;
  });

  const handleViewAllProducts = (cat: MainCategory | 'all' = 'all') => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* 4. Hero Banner */}
      <Hero />

      {/* 5. Three Category Banners (Men, Women, Kids) */}
      <CategoryBanners />

      {/* 6. Featured Product Categories */}
      <FeaturedCategories />

      {/* 7. New Arrivals Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#075C3B] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Fresh Off the Loom</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#151515]">
                New Arrivals
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(['all', 'men', 'women', 'kids', 'peshawari'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setArrivalsFilter(cat)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    arrivalsFilter === cat
                      ? 'bg-[#075C3B] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat === 'all'
                    ? 'All New'
                    : cat === 'men'
                    ? 'Men'
                    : cat === 'women'
                    ? 'Women'
                    : cat === 'kids'
                    ? 'Kids'
                    : 'Peshawari'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleViewAllProducts('all')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 hover:border-[#075C3B] text-neutral-800 hover:text-[#075C3B] rounded-lg text-xs font-bold transition-all"
            >
              <span>Explore All New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Featured Peshawari Chappal Collection Spotlight */}
      <PeshawariChappalSpotlight />

      {/* 8. Best Sellers Product Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#075C3B] mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Patron Favorites</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#151515]">
                Best Sellers
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(['all', 'men', 'women', 'kids', 'peshawari'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBestsellerFilter(cat)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                    bestsellerFilter === cat
                      ? 'bg-[#075C3B] text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat === 'all'
                    ? 'All Bestsellers'
                    : cat === 'men'
                    ? 'Men'
                    : cat === 'women'
                    ? 'Women'
                    : cat === 'kids'
                    ? 'Kids'
                    : 'Peshawari'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleViewAllProducts('all')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              <span>Shop All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Special Offer Promotional Banner */}
      <PromoBanner />

      {/* 11. Shopping Benefits (COD nationwide, courier, support) */}
      <TrustBenefits />

      {/* 12. Genuine Customer Reviews */}
      <CustomerReviews />

      {/* 13. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};
