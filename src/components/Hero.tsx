/**
 * GROCARY SHELF — Hero Banner Component
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const handleShopNow = () => {
    setSelectedCategory('all');
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToCollections = () => {
    const el = document.getElementById('category-banners');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#075C3B] text-white">
      {/* Background imagery with subtle overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
          alt="GROCARY SHELF Fashion Editorial"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#075C3B] via-[#05462D]/90 to-[#151515]/80 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          {/* Subtle unboxed kicker */}
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-[#C5A059]">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Premium Fashion &amp; Footwear Store</span>
            <span aria-hidden="true">·</span>
            <span>Est. Pakistan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Style for Every Generation.
          </h1>

          <p className="text-base sm:text-lg text-[#E9F4EE] leading-relaxed mb-8 max-w-xl">
            Discover stylish clothing and footwear for men, women, and kids — all in one place.
            Hand-stitched Peshawari chappals, breathable cotton shirts, and festive formals delivered with Cash on Delivery across Pakistan.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={handleShopNow}
              className="px-7 py-3.5 bg-white text-[#075C3B] hover:bg-[#F1F7F1] text-sm font-bold rounded-md shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleScrollToCollections}
              className="px-6 py-3.5 bg-transparent border border-white/40 hover:border-white text-white text-sm font-semibold rounded-md transition-colors hover:bg-white/10"
            >
              Explore Collections
            </button>
          </div>

          {/* Value Props / Trust Indicators */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Cash on Delivery</p>
                <p className="text-[11px] text-[#E9F4EE]/80 mt-0.5">Nationwide in 150+ cities</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Pure Materials</p>
                <p className="text-[11px] text-[#E9F4EE]/80 mt-0.5">100% Leather &amp; Supima Cotton</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <RefreshCw className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">7-Day Exchange</p>
                <p className="text-[11px] text-[#E9F4EE]/80 mt-0.5">Hassle-free size replacement</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
