/**
 * GROCARY SHELF — Shopping Benefits & Trust Indicators
 */

import React from 'react';
import { Truck, Banknote, RefreshCw, MessageSquare } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Banknote,
      title: 'Cash on Delivery (COD)',
      subtitle: 'Pay at your doorstep',
      description: 'Order with complete peace of mind. Pay cash directly to the rider upon receiving and inspecting your parcel.'
    },
    {
      icon: Truck,
      title: 'Fast Nationwide Delivery',
      subtitle: '150+ Pakistani cities',
      description: 'Dispatched via premium couriers (TCS & Leopards) with live SMS and tracking code updates.'
    },
    {
      icon: RefreshCw,
      title: '7-Day Easy Size Exchange',
      subtitle: 'Zero-hassle replacement',
      description: 'Wrong shoe or shirt size? We swap it at your address quickly without prolonged questions.'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Concierge Support',
      subtitle: '+92 319 9774681',
      description: 'Real human styling advice, order tracking, and custom Peshawari sizing assistance available daily.'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#075C3B] block mb-1">
            Why Shop With Us
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#151515]">
            Built on Pakistani Trust &amp; Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-xl bg-[#F1F7F1]/30 border border-neutral-100 hover:border-[#075C3B]/30 hover:bg-[#F1F7F1]/60 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-[#075C3B] text-white flex items-center justify-center mb-4 shadow-xs">
                  <Icon className="w-6 h-6 text-[#F1F7F1]" />
                </div>
                <h3 className="font-bold text-base text-neutral-900 mb-1">{item.title}</h3>
                <span className="text-xs font-semibold text-[#075C3B] mb-2">{item.subtitle}</span>
                <p className="text-xs text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
