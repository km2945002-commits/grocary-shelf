/**
 * GROCARY SHELF — Featured Peshawari Chappal Collection Spotlight
 */

import React from 'react';
import { Award, Hammer, Compass, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const PeshawariChappalSpotlight: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useStore();

  // Find all Peshawari items
  const peshawariProducts = products.filter(
    (p) => p.category === 'peshawari' || p.subcategory === 'peshawari'
  );

  const handleExplorePeshawari = () => {
    setSelectedCategory('peshawari');
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F1F7F1]/60 via-[#F1F7F1]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Craftsman Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#075C3B] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#075C3B]" />
              <span>Generational Khyber Heritage</span>
              <span aria-hidden="true">·</span>
              <span>100% Genuine Leather</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151515] leading-tight mb-4">
              The Legendary <span className="text-[#075C3B]">Peshawari Chappal</span>
            </h2>

            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6">
              Handcrafted in the legendary bazaars of Peshawar and Charsadda, each pair of GROCARY SHELF Peshawari chappals is individually lasted from premium cowhide leather. Hand-stitched with heavy wax-coated cords over authentic aircraft tyre double soles, delivering timeless dignity, royal posture, and indestructible longevity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200/80">
              <div className="flex items-start gap-2.5">
                <Hammer className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Hand-Lasted</h4>
                  <p className="text-[11px] text-neutral-500">Over 16 hours of artisan hand work per pair</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Double Tyre Sole</h4>
                  <p className="text-[11px] text-neutral-500">Recycled aerospace tyre for unmatched grip</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Arch Comfort</h4>
                  <p className="text-[11px] text-neutral-500">Padded memory foam insole reduces fatigue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 shadow-md">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
                alt="Peshawari Chappal Crafting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059]">Signature Model</span>
                <p className="text-xs font-bold">Kaptaan Double Tyre Sole (Mustard Tan)</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 block">Available in Sizes 7 to 12 UK</span>
                <span className="text-xs font-bold text-[#075C3B]">Cash on Delivery Nationwide</span>
              </div>
              <button
                onClick={handleExplorePeshawari}
                className="px-4 py-2 bg-[#075C3B] hover:bg-[#05462D] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
              >
                <span>View Full Line</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Chappal Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {peshawariProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
