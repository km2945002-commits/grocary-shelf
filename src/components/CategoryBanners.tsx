/**
 * GROCARY SHELF — Three Category Banners (Men, Women, Kids)
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MainCategory } from '../types';

export const CategoryBanners: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const handleSelectCategory = (cat: MainCategory) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      id: 'men' as MainCategory,
      title: "Men's Collection",
      subtitle: "Tailored Shirts, Stretch Chinos & Leather Loafers",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
      itemCount: "Stylish Shirts, Trousers & Shoes",
      badge: "New Season"
    },
    {
      id: 'women' as MainCategory,
      title: "Women's Collection",
      subtitle: "Embroidered Pret, Breathable Kurtis & Chic Mules",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      itemCount: "Contemporary Tunics & Trousers",
      badge: "Trending"
    },
    {
      id: 'kids' as MainCategory,
      title: "Kids' Collection",
      subtitle: "Festive Kurta Sets, Junior Chappal & Casuals",
      image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
      itemCount: "Boys, Girls & Junior Footwear",
      badge: "Festive Ready"
    }
  ];

  return (
    <section id="category-banners" className="py-16 bg-[#F1F7F1]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-[#075C3B] mb-1">
              Curated Wardrobe
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151515]">
              Shop by Department
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Thoughtfully engineered silhouettes for everyday comfort and ceremonial elegance across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative h-[420px] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/90 via-[#151515]/30 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#075C3B] text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {cat.badge}
                </span>
              </div>

              {/* Content bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                <p className="text-xs text-[#C5A059] font-medium tracking-wide mb-1">
                  {cat.itemCount}
                </p>
                <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-[#F1F7F1] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 mb-4 line-clamp-2">
                  {cat.subtitle}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white border-b border-white/60 pb-0.5 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all">
                  <span>Explore Department</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
