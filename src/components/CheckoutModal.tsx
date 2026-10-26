/**
 * GROCARY SHELF — Pakistan Cash on Delivery (COD) Checkout Modal
 */

import React, { useState } from 'react';
import { X, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PAKISTAN_PROVINCES, MAJOR_PAKISTAN_CITIES } from '../data/products';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    cartTotal,
    formatPKR,
    placeOrder,
    showToast
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: 'punjab',
    city: 'Lahore',
    address: '',
    postalCode: '',
    orderNotes: '',
    shippingOption: 'standard' // 'standard' or 'express'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const currentCities = MAJOR_PAKISTAN_CITIES[formData.province] || ['Lahore', 'Karachi', 'Islamabad'];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    
    // Pakistani mobile number validation: 03xx-xxxxxxx (11 digits)
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile Phone Number is required.';
    } else if (!cleanPhone.startsWith('03') && !cleanPhone.startsWith('923')) {
      errs.phone = 'Must be a valid Pakistani mobile number starting with 03xx.';
    } else if (cleanPhone.length < 11) {
      errs.phone = 'Please enter a complete 11-digit mobile number.';
    }

    if (!formData.address.trim()) errs.address = 'Complete street/house address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct the highlighted errors in your delivery information.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedProvinceObj = PAKISTAN_PROVINCES.find((p) => p.code === formData.province);
      const provinceName = selectedProvinceObj ? selectedProvinceObj.name : 'Pakistan';

      placeOrder(
        {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || `${formData.phone.replace(/[^0-9]/g, '')}@grocaryshelf.pk`,
          province: provinceName,
          city: formData.city,
          address: formData.address,
          postalCode: formData.postalCode || '54000',
          orderNotes: formData.orderNotes
        },
        'cod'
      );

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#075C3B] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold">Cash on Delivery Checkout</span>
              <span className="bg-[#C5A059] text-[#151515] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Pakistan Wide
              </span>
            </div>
            <p className="text-xs text-[#E9F4EE]/90 mt-0.5">
              Pay cash to the courier upon delivery at your doorstep. No advance card needed.
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Order Summary Strip */}
          <div className="bg-[#F1F7F1] p-3.5 rounded-lg border border-[#075C3B]/20 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-neutral-900 block">
                {cart.length} {cart.length === 1 ? 'Product' : 'Products'} in Order
              </span>
              <span className="text-[11px] text-neutral-600">
                Subtotal: {formatPKR(cartSubtotal)} {shippingFee === 0 ? '· Free Shipping' : `· Shipping: ${formatPKR(shippingFee)}`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Payable at Doorstep</span>
              <span className="text-base font-bold text-[#075C3B]">{formatPKR(cartTotal)}</span>
            </div>
          </div>

          {/* Section: Customer Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075C3B] mb-3 pb-1 border-b border-neutral-100 flex items-center gap-2">
              <span>1. Contact &amp; Delivery Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mortaza Khan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none ${
                    errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-neutral-300 focus:ring-1 focus:ring-[#075C3B]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Mobile Phone Number (for Courier Rider) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none ${
                    errors.phone ? 'border-rose-500 bg-rose-50' : 'border-neutral-300 focus:ring-1 focus:ring-[#075C3B]'
                  }`}
                />
                {errors.phone ? (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                ) : (
                  <p className="text-[10px] text-neutral-400 mt-0.5">TCS/Leopards riders call before delivery.</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-700 mb-1">
                  Email Address (Optional, for digital receipt)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>
            </div>
          </div>

          {/* Section: Province, City, and Address */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075C3B] mb-3 pb-1 border-b border-neutral-100">
              2. Shipping Address &amp; Destination
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Province <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => {
                    const newProv = e.target.value;
                    const citiesForProv = MAJOR_PAKISTAN_CITIES[newProv] || ['Lahore'];
                    setFormData({ ...formData, province: newProv, city: citiesForProv[0] });
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                >
                  {PAKISTAN_PROVINCES.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                      {prov.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                >
                  {currentCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-neutral-700 mb-1">
                  Complete Street / House Address &amp; Landmark <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Street #, Mohallah / Sector, Landmark (e.g. near Jamia Masjid)"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none ${
                    errors.address ? 'border-rose-500 bg-rose-50' : 'border-neutral-300 focus:ring-1 focus:ring-[#075C3B]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Postal / Zip Code (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 54000"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Special Rider Delivery Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Call before coming, deliver between 2-5pm"
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                />
              </div>
            </div>
          </div>

          {/* Section: Payment Method Option */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#075C3B] mb-3 pb-1 border-b border-neutral-100">
              3. Payment Selection
            </h4>

            <div className="p-3.5 rounded-lg border-2 border-[#075C3B] bg-[#F1F7F1]/50 flex items-start gap-3">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="mt-1 text-[#075C3B] focus:ring-[#075C3B]"
              />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-neutral-900 font-bold text-sm">Cash on Delivery (COD)</strong>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Default &amp; Recommended
                  </span>
                </div>
                <p className="text-neutral-600 mt-1">
                  Pay with exact Pakistani currency to the courier rider when your parcel arrives. You can open and verify the parcel tag.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-200">
            <div className="text-xs text-neutral-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#075C3B]" />
              <span>Free 7-Day Size Exchange Guarantee</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Generating Order...</span>
                ) : (
                  <>
                    <span>Confirm Order ({formatPKR(cartTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
