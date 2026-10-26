/**
 * GROCARY SHELF — Special Offer Promotional Banner with Promo Code
 */

import React, { useState, useEffect } from 'react';
import { Tag, Copy, Check, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoBanner: React.FC = () => {
  const { applyCoupon, setActiveTab, setSelectedCategory, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  // Simple live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoCode = 'GROCARY25';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    applyCoupon(promoCode);
    showToast(`Code ${promoCode} copied & applied to your bag!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShopSale = () => {
    setSelectedCategory('all');
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-[#075C3B]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-[#C5A059]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#075C3B] to-[#043723] rounded-2xl p-8 md:p-12 border border-[#075C3B]/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Promo Details */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Time Festive Promo</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              Flat 25% Off Entire Family Collection
            </h2>

            <p className="text-sm sm:text-base text-neutral-200 mb-6 leading-relaxed">
              Upgrade your wardrobe with tailored shirts, chinos, kurtis, and handmade Peshawari chappals. Use coupon code at checkout for instant savings.
            </p>

            {/* Countdown timer blocks */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-semibold mr-1">
                <Clock className="w-4 h-4" />
                <span>Ends In:</span>
              </div>
              <div className="flex items-center gap-2 text-center">
                <div className="bg-black/40 px-3 py-1.5 rounded border border-white/10">
                  <span className="font-bold text-base block">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Days</span>
                </div>
                <span>:</span>
                <div className="bg-black/40 px-3 py-1.5 rounded border border-white/10">
                  <span className="font-bold text-base block">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Hours</span>
                </div>
                <span>:</span>
                <div className="bg-black/40 px-3 py-1.5 rounded border border-white/10">
                  <span className="font-bold text-base block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Mins</span>
                </div>
                <span>:</span>
                <div className="bg-black/40 px-3 py-1.5 rounded border border-white/10">
                  <span className="font-bold text-base block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400">Secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coupon Action Box */}
          <div className="w-full lg:w-auto bg-black/50 backdrop-blur-md p-6 rounded-xl border border-white/15 flex flex-col items-center gap-4 text-center shrink-0">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              Special Promo Code
            </span>

            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-lg border border-dashed border-white/30">
              <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-white">
                {promoCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 bg-[#075C3B] hover:bg-[#05462D] text-white rounded transition-colors"
                title="Copy and Apply Code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[11px] text-neutral-300">
              {copied ? '✓ Applied to your active bag!' : 'Click to copy & activate 25% discount.'}
            </p>

            <button
              onClick={handleShopSale}
              className="w-full py-3 px-6 bg-white hover:bg-[#F1F7F1] text-[#075C3B] text-xs font-bold rounded shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Sale Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
