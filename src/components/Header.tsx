/**
 * GROCARY SHELF — Header & Navigation Component
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Truck, 
  Code2, 
  FileText,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MainCategory } from '../types';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    cartSubtotal, 
    setIsCartDrawerOpen, 
    wishlist, 
    activeTab, 
    setActiveTab, 
    selectedCategory,
    setSelectedCategory,
    products,
    openQuickView,
    setIsToolkitOpen,
    isAdminModalOpen,
    setIsAdminModalOpen,
    adminAuth,
    formatPKR
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchInput.trim().length > 1
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleNavClick = (tab: string, cat?: MainCategory | 'all') => {
    setActiveTab(tab);
    if (cat) {
      setSelectedCategory(cat);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200/80 shadow-xs">
      {/* 1. Promotional Announcement Bar */}
      <div className="bg-[#075C3B] text-white text-xs font-medium py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-[#C5A059] text-[#151515] font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs">
              Ramadan & Eid Offer
            </span>
            <span className="text-[#F1F7F1]/95 text-xs">
              Free Nationwide Express Delivery on orders over <strong>Rs. 3,500</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#F1F7F1]/90">
            <span className="hidden md:inline-flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" /> Cash on Delivery (COD) Across Pakistan
            </span>
            <span className="text-[#F1F7F1]/40 hidden md:inline">|</span>
            <a 
              href="https://wa.me/923199774681?text=Assalam-o-Alaikum%20GROCARY%20SHELF%2C%20I%20have%20an%20inquiry." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" /> WhatsApp: <strong className="underline underline-offset-2">+92 319 9774681</strong>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-[#075C3B] rounded-md focus-visible:outline-[#075C3B]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* GROCARY SHELF Brand Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex flex-col group select-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#075C3B] flex items-center justify-center text-white font-serif font-black text-lg shadow-xs group-hover:bg-[#05462D] transition-colors">
                GS
              </div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#151515] group-hover:text-[#075C3B] transition-colors">
                GROCARY <span className="text-[#075C3B]">SHELF</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-500 font-semibold -mt-0.5 ml-10">
              Fashion for the Whole Family
            </span>
          </div>

          {/* Live Search Bar with Instant Autocomplete */}
          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search shirts, trousers, Peshawari chappal, kurtis..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C3B]/20 focus:border-[#075C3B] transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchInput.trim().length > 1 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-neutral-100">
                    <div className="px-3 py-2 bg-neutral-50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Matching Products ({searchResults.length})
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          openQuickView(product);
                          setIsSearchFocused(false);
                          setSearchInput('');
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-[#F1F7F1]/50 cursor-pointer transition-colors"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded border border-neutral-100 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-neutral-900 truncate">{product.name}</p>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                            <span>{product.categoryLabel}</span>
                            <span>·</span>
                            <span className="font-semibold text-[#075C3B]">{formatPKR(product.price)}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-300" />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        handleNavClick('shop');
                        setIsSearchFocused(false);
                      }}
                      className="w-full py-2.5 text-center text-xs font-semibold text-[#075C3B] hover:bg-[#F1F7F1] transition-colors"
                    >
                      View All Results in Store &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-500">
                    No products found matching &ldquo;{searchInput}&rdquo;. Try &ldquo;chappal&rdquo;, &ldquo;shirt&rdquo;, or &ldquo;kurti&rdquo;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Tools & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Dashboard Portal Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all shadow-2xs ${
                adminAuth.isAuthenticated
                  ? 'bg-emerald-100 text-[#075C3B] border-emerald-300 font-bold'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-300'
              }`}
              title="Admin Dashboard (Manage Products, Inventory, Database)"
            >
              <Lock className="w-3.5 h-3.5 text-[#075C3B]" />
              <span>Admin</span>
            </button>

            {/* WordPress / Elementor Developer Suite Shortcut */}
            <button
              onClick={() => setIsToolkitOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#075C3B] bg-[#E9F4EE] hover:bg-[#075C3B] hover:text-white rounded-md border border-[#075C3B]/20 transition-all shadow-2xs"
              title="Elementor HTML/CSS & WooCommerce Integration Kit"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>WP & Elementor Toolkit</span>
            </button>

            {/* Orders Tracker Link */}
            <button
              onClick={() => handleNavClick('orders')}
              className={`p-2 text-neutral-700 hover:text-[#075C3B] rounded-lg transition-colors relative flex items-center gap-1.5 text-xs font-medium ${
                activeTab === 'orders' ? 'text-[#075C3B] bg-[#F1F7F1]' : ''
              }`}
              title="Track Your Order"
            >
              <FileText className="w-5 h-5 text-neutral-600" />
              <span className="hidden sm:inline">Track Order</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('shop')}
              className="p-2 text-neutral-700 hover:text-[#075C3B] rounded-lg transition-colors relative"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg shadow-xs transition-all active:scale-95"
              aria-label="Open Cart Drawer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#C5A059] text-[#151515] rounded-full text-[10px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-200 leading-none">Bag</span>
                <span className="text-xs font-bold leading-tight">{formatPKR(cartSubtotal)}</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Primary Navigation Menu */}
      <nav className="hidden lg:block border-t border-neutral-100 bg-[#F1F7F1]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start gap-8 py-2.5 text-xs uppercase tracking-wider font-semibold text-neutral-700">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'home' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('shop', 'men')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'shop' && selectedCategory === 'men' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Men&apos;s Fashion
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('shop', 'women')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'shop' && selectedCategory === 'women' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Women&apos;s Fashion
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('shop', 'kids')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'shop' && selectedCategory === 'kids' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Kids&apos; Fashion
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('shop', 'footwear')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'shop' && selectedCategory === 'footwear' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Footwear
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => handleNavClick('shop', 'peshawari')}
                className={`transition-colors text-[#075C3B] font-bold py-1 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'shop' && selectedCategory === 'peshawari' ? 'border-[#075C3B]' : 'border-transparent'
                }`}
              >
                <span>Peshawari Chappal</span>
                <span className="bg-[#C5A059] text-[#151515] text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase">
                  Heritage
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('shop', 'all')}
                className="transition-colors hover:text-[#075C3B] py-1 border-b-2 border-transparent text-amber-700"
              >
                Sale &amp; Special Offers
              </button>
            </li>
            <li className="ml-auto">
              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors hover:text-[#075C3B] py-1 border-b-2 ${
                  activeTab === 'contact' ? 'text-[#075C3B] border-[#075C3B]' : 'border-transparent'
                }`}
              >
                Contact &amp; Support
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="p-4 space-y-3">
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search GROCARY SHELF products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <nav className="flex flex-col space-y-1 text-sm font-semibold text-neutral-800">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] hover:text-[#075C3B]"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop', 'men')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] hover:text-[#075C3B]"
              >
                Men&apos;s Fashion (Shirts, Pants, Footwear)
              </button>
              <button
                onClick={() => handleNavClick('shop', 'women')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] hover:text-[#075C3B]"
              >
                Women&apos;s Fashion (Pret, Trousers, Khussa)
              </button>
              <button
                onClick={() => handleNavClick('shop', 'kids')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] hover:text-[#075C3B]"
              >
                Kids&apos; Fashion (Boys, Girls, Junior Chappal)
              </button>
              <button
                onClick={() => handleNavClick('shop', 'footwear')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] hover:text-[#075C3B]"
              >
                Footwear &amp; Loafers
              </button>
              <button
                onClick={() => handleNavClick('shop', 'peshawari')}
                className="text-left px-3 py-2 rounded bg-[#E9F4EE] text-[#075C3B] font-bold flex items-center justify-between"
              >
                <span>Peshawari Chappal Collection</span>
                <span className="text-[10px] bg-[#C5A059] text-black px-1.5 py-0.5 rounded">Handmade</span>
              </button>
              <button
                onClick={() => handleNavClick('orders')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] text-neutral-600 flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#075C3B]" />
                <span>Track Your COD Order</span>
              </button>
              <button
                onClick={() => {
                  setIsAdminModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded bg-emerald-50 text-[#075C3B] font-bold flex items-center gap-2 border border-emerald-200"
              >
                <Lock className="w-4 h-4 text-[#075C3B]" />
                <span>Admin Dashboard &amp; Product Manager</span>
              </button>
              <button
                onClick={() => {
                  setIsToolkitOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded bg-neutral-100 text-neutral-700 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#075C3B]" />
                <span>WordPress / Elementor Toolkit</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left px-3 py-2 rounded hover:bg-[#F1F7F1] text-neutral-600"
              >
                Customer Support &amp; Policies
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
