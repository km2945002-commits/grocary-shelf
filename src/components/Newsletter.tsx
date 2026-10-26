/**
 * GROCARY SHELF — Newsletter & VIP Club Section
 */

import React, { useState } from 'react';
import { Mail, Check, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Newsletter: React.FC = () => {
  const { applyCoupon, showToast } = useStore();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setSubscribed(true);
    applyCoupon('WELCOME10');
    showToast('Subscribed! 10% discount coupon WELCOME10 applied to your bag.', 'success');
  };

  return (
    <section className="py-16 bg-[#075C3B] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-4">
          <Gift className="w-4 h-4" />
          <span>Exclusive Welcome Offer</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Join the GROCARY SHELF Insiders
        </h2>

        <p className="text-neutral-200 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Be the first to receive notifications on seasonal arrivals, limited handmade Peshawari chappal restocks, and secret VIP discount codes.
        </p>

        {subscribed ? (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-10 h-10 rounded-full bg-emerald-400 text-neutral-900 flex items-center justify-center mx-auto mb-2 font-bold">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-white text-base">You&apos;re on the list!</h4>
            <p className="text-xs text-[#E9F4EE] mt-1">
              Your 10% discount code <strong>WELCOME10</strong> has been automatically unlocked in your bag.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                required
                placeholder="Enter email or WhatsApp (03xx...)"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 placeholder-neutral-300 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:bg-white/20 transition-all"
              />
              <Mail className="w-4 h-4 text-neutral-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#b08e4d] text-[#151515] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all shrink-0 hover:scale-[1.02]"
            >
              Get 10% Off
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#E9F4EE]/60 mt-4">
          No spam ever. You can unsubscribe with one tap at any time.
        </p>
      </div>
    </section>
  );
};
