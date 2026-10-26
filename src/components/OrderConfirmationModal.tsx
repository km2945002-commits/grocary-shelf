/**
 * GROCARY SHELF — Order Confirmation & Digital Invoice Modal
 */

import React from 'react';
import { CheckCircle2, Printer, MessageCircle, Truck, Package, ArrowRight, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const {
    isOrderConfirmOpen,
    setIsOrderConfirmOpen,
    latestOrder,
    formatPKR,
    setActiveTab
  } = useStore();

  if (!isOrderConfirmOpen || !latestOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleTrack = () => {
    setIsOrderConfirmOpen(false);
    setActiveTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum GROCARY SHELF, I have placed order ${latestOrder.orderNumber} for Rs. ${latestOrder.total.toLocaleString()} via Cash on Delivery. Please confirm dispatch.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Success Banner */}
        <div className="bg-[#075C3B] text-white p-6 text-center relative">
          <button
            onClick={() => setIsOrderConfirmOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
          </div>
          <h3 className="font-serif text-2xl font-bold">Shukriya! Order Confirmed</h3>
          <p className="text-xs text-[#E9F4EE] mt-1">
            Order Reference: <strong className="font-mono text-white text-sm">{latestOrder.orderNumber}</strong>
          </p>
        </div>

        {/* Invoice Summary Body */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          
          {/* Important COD Cash Instruction Box */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 block text-xs">Cash on Delivery Notice:</strong>
              <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
                Please keep exact cash of <strong>{formatPKR(latestOrder.total)}</strong> ready. Our rider from {latestOrder.courierName} will call your mobile (<strong>{latestOrder.customer.phone}</strong>) before arrival.
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[11px] text-neutral-400 block uppercase font-bold tracking-wider">Recipient</span>
              <p className="font-semibold text-neutral-900 mt-0.5">{latestOrder.customer.fullName}</p>
              <p className="text-neutral-600">{latestOrder.customer.phone}</p>
            </div>
            <div>
              <span className="text-[11px] text-neutral-400 block uppercase font-bold tracking-wider">Destination</span>
              <p className="font-semibold text-neutral-900 mt-0.5">{latestOrder.customer.city}, {latestOrder.customer.province}</p>
              <p className="text-neutral-600 line-clamp-1">{latestOrder.customer.address}</p>
            </div>
          </div>

          {/* Itemized list */}
          <div>
            <span className="text-[11px] text-neutral-400 block uppercase font-bold tracking-wider mb-2">
              Purchased Items ({latestOrder.items.length})
            </span>
            <div className="divide-y divide-neutral-100">
              {latestOrder.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={item.image} 
                      alt={item.productName} 
                      className="w-10 h-12 object-cover rounded border border-neutral-200" 
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 text-xs">{item.productName}</p>
                      <span className="text-[11px] text-neutral-500">
                        Size: {item.size} · Color: {item.colorName} · Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-800">{formatPKR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPKR(latestOrder.subtotal)}</span>
            </div>
            {latestOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Festive Discount</span>
                <span>-{formatPKR(latestOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Nationwide Delivery</span>
              <span>{latestOrder.shippingFee === 0 ? 'FREE' : formatPKR(latestOrder.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-900 pt-2 border-t border-neutral-200">
              <span>Total Payable at Doorstep</span>
              <span className="text-base text-[#075C3B]">{formatPKR(latestOrder.total)}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/923199774681?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-semibold rounded-lg flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

          <button
            onClick={handleTrack}
            className="w-full py-2.5 bg-[#075C3B] hover:bg-[#05462D] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Track Order Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
