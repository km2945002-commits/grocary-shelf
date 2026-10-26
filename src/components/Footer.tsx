/**
 * GROCARY SHELF — Footer Component
 */

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Truck, Code2, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MainCategory } from '../types';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setIsToolkitOpen, setIsAdminModalOpen, adminAuth } = useStore();

  const handleCategoryClick = (cat: MainCategory) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151515] text-neutral-300 pt-16 pb-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#075C3B] flex items-center justify-center text-white font-serif font-black text-lg">
                GS
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GROCARY <span className="text-[#C5A059]">SHELF</span>
              </span>
            </div>
            
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#075C3B]">
              Fashion for the Whole Family
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Pakistan&apos;s premier multi-generational fashion destination. Providing impeccably tailored shirts, stretch trousers, elegant women&apos;s pret, and authentic generational Peshawari chappals with Cash on Delivery nationwide.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href="https://wa.me/923199774681?text=Assalam-o-Alaikum%20GROCARY%20SHELF%2C%20I%20want%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-lg text-xs font-bold transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#151515]" />
                <span>Chat on WhatsApp: +92 319 9774681</span>
              </a>
            </div>
          </div>

          {/* Column 2: Department Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#075C3B] pl-2.5">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button 
                  onClick={() => handleCategoryClick('men')} 
                  className="hover:text-white transition-colors"
                >
                  Men&apos;s Shirts &amp; Trousers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('women')} 
                  className="hover:text-white transition-colors"
                >
                  Women&apos;s Pret &amp; Kurtis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('kids')} 
                  className="hover:text-white transition-colors"
                >
                  Kids&apos; Festive Kurta Sets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('footwear')} 
                  className="hover:text-white transition-colors"
                >
                  Italian Leather Loafers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('peshawari')} 
                  className="hover:text-[#C5A059] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Peshawari Chappal (Double Sole)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#075C3B] pl-2.5">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => handleTabClick('orders')} className="hover:text-white transition-colors">
                  Track Your COD Order
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('contact')} className="hover:text-white transition-colors">
                  Cash on Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('contact')} className="hover:text-white transition-colors">
                  7-Day Size Exchange Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('contact')} className="hover:text-white transition-colors">
                  Nationwide Courier Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleTabClick('contact')} className="hover:text-white transition-colors">
                  Privacy Policy &amp; Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#075C3B] pl-2.5">
              Store &amp; Dispatch
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Suhan, Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a 
                  href="https://wa.me/923199774681" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  +92 319 9774681
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a 
                  href="mailto:km2945002@gmail.com" 
                  className="hover:text-white transition-colors"
                >
                  km2945002@gmail.com
                </a>
              </li>
              <li className="pt-2 space-y-2">
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="w-full py-2 px-3 bg-[#075C3B]/80 hover:bg-[#075C3B] text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#075C3B]"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{adminAuth.isAuthenticated ? 'Admin Dashboard (Active)' : 'Admin Portal & Add Products'}</span>
                </button>
                <button
                  onClick={() => setIsToolkitOpen(true)}
                  className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Elementor &amp; WooCommerce Kit</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Payment & Delivery badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-4 text-center md:text-left">
            <span>&copy; {new Date().getFullYear()} <strong>GROCARY SHELF</strong>. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-neutral-400">Fashion for the Whole Family</span>
          </div>

          {/* Payment & Logistics Trust Badges */}
          <div className="flex items-center gap-2">
            <span className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-neutral-700">
              Cash on Delivery (COD)
            </span>
            <span className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-neutral-700">
              TCS Express
            </span>
            <span className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-neutral-700">
              Leopards
            </span>
            <span className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-neutral-700">
              Bank Transfer
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
