/**
 * GROCARY SHELF — Featured Categories Carousel/Grid
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { MainCategory } from '../types';

export const FeaturedCategories: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const handleCategory = (cat: MainCategory) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    {
      name: "Men's Oxford Shirts",
      cat: 'men' as MainCategory,
      count: '4 Styles',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Stretch Chinos & Pants',
      cat: 'men' as MainCategory,
      count: '3 Colors',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kaptaan Chappals',
      cat: 'peshawari' as MainCategory,
      count: 'Double Tyre Sole',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: "Women's Slub Pret",
      cat: 'women' as MainCategory,
      count: 'Hand-Embroidered',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: "Boys' Festive Kurtas",
      cat: 'kids' as MainCategory,
      count: 'Ages 3-12',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Artisan Loafers & Khussa',
      cat: 'footwear' as MainCategory,
      count: 'Pure Leather',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#075C3B] block mb-1">
              Top Picks
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
              Featured Collections
            </h3>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('shop');
            }}
            className="text-xs font-bold text-[#075C3B] hover:underline"
          >
            Browse All &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c, i) => (
            <div
              key={i}
              onClick={() => handleCategory(c.cat)}
              className="group cursor-pointer flex flex-col items-center text-center p-3 rounded-xl border border-neutral-100 hover:border-[#075C3B]/30 hover:shadow-md transition-all duration-200"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-neutral-100 mb-3 border border-neutral-200 group-hover:scale-105 transition-transform duration-300">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-xs text-neutral-900 group-hover:text-[#075C3B] transition-colors leading-tight">
                {c.name}
              </h4>
              <span className="text-[11px] text-neutral-400 mt-0.5">{c.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
