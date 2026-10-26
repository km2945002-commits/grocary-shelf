/**
 * GROCARY SHELF — Live Order Tracking & Management View
 */

import React, { useState } from 'react';
import { Package, Search, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderTrackingView: React.FC = () => {
  const { orders, formatPKR, cancelOrder, showToast } = useStore();
  const [searchOrderNo, setSearchOrderNo] = useState('');

  const displayedOrders = searchOrderNo.trim()
    ? orders.filter((o) =>
        o.orderNumber.toLowerCase().includes(searchOrderNo.toLowerCase().trim()) ||
        o.customer.phone.includes(searchOrderNo.trim())
      )
    : orders;

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Search */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#075C3B] block mb-1">
            Nationwide Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#151515] mb-3">
            Track Your Cash on Delivery Order
          </h1>
          <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6">
            Enter your order reference code (e.g. <strong>GS-89241</strong>) or your 11-digit mobile phone number to check live courier status.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search by Order # or Mobile Phone..."
              value={searchOrderNo}
              onChange={(e) => setSearchOrderNo(e.target.value)}
              className="w-full pl-10 pr-24 py-3 bg-white border border-neutral-300 rounded-xl text-xs font-semibold shadow-xs focus:outline-none focus:ring-2 focus:ring-[#075C3B]"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchOrderNo && (
              <button
                onClick={() => setSearchOrderNo('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Orders List */}
        {displayedOrders.length > 0 ? (
          <div className="space-y-6">
            {displayedOrders.map((order) => {
              // Status steps logic
              const steps = [
                { label: 'Order Placed', completed: true, date: order.date },
                { label: 'Phone Verification', completed: true, date: 'Verified via SMS' },
                { label: 'Dispatched with Courier', completed: order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered', date: order.courierName },
                { label: 'Out for Delivery', completed: order.status === 'Out for Delivery' || order.status === 'Delivered', date: order.estimatedDeliveryDate || 'Pending rider dispatch' },
                { label: 'Delivered (COD Paid)', completed: order.status === 'Delivered', date: 'Doorstep completion' }
              ];

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="p-5 bg-neutral-100/70 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#075C3B]" />
                        <span className="font-mono text-base font-extrabold text-neutral-900">
                          {order.orderNumber}
                        </span>
                        <span className="bg-[#E9F4EE] text-[#075C3B] font-bold text-[11px] px-2 py-0.5 rounded-full">
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500 mt-0.5 block">Placed on {order.date}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Payable via COD</span>
                      <span className="text-base font-bold text-[#075C3B]">{formatPKR(order.total)}</span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="p-6 border-b border-neutral-100 bg-white">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-6">
                      Parcel Journey ({order.courierName} · Tracking: {order.courierTrackingNo || 'Assigned'})
                    </h4>

                    <div className="relative flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-2">
                      {steps.map((step, idx) => (
                        <div key={idx} className="flex-1 flex sm:flex-col items-center gap-3 sm:gap-2 relative z-10 text-left sm:text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold transition-colors ${
                              step.completed ? 'bg-[#075C3B]' : 'bg-neutral-200 text-neutral-500'
                            }`}
                          >
                            {step.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : idx + 1}
                          </div>
                          <div>
                            <span className={`text-xs font-bold block ${step.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>
                              {step.label}
                            </span>
                            <span className="text-[10px] text-neutral-400 block mt-0.5">{step.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Destination Summary */}
                  <div className="p-6 bg-neutral-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Shipping Address
                      </span>
                      <p className="font-semibold text-neutral-900">{order.customer.fullName} ({order.customer.phone})</p>
                      <p className="text-neutral-600 mt-0.5 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#075C3B] shrink-0 mt-0.5" />
                        <span>{order.customer.address}, {order.customer.city}, {order.customer.province}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        Package Contents
                      </span>
                      {order.items.map((it, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-neutral-800 line-clamp-1">
                            {it.quantity}x {it.productName} ({it.size})
                          </span>
                          <span className="font-semibold text-neutral-900">{formatPKR(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
                    <button
                      onClick={() => window.print()}
                      className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Dispatch Voucher</span>
                    </button>

                    {order.status === 'Processing' && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this order?')) {
                            cancelOrder(order.id);
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:underline"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-neutral-200 shadow-xs max-w-md mx-auto">
            <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-neutral-800 mb-1">No Orders Found</h3>
            <p className="text-xs text-neutral-500 mb-4">
              We couldn&apos;t find any order matching &ldquo;{searchOrderNo}&rdquo;. Double check your order reference number or place a new order.
            </p>
            <button
              onClick={() => setSearchOrderNo('')}
              className="px-4 py-2 bg-[#075C3B] text-white text-xs font-bold rounded-lg"
            >
              Show All Orders
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
