/**
 * GROCARY SHELF — Contact & Customer Concierge View
 */

import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { showToast } = useStore();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: 'Sizing & Peshawari Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Your message has been sent to our customer care team!', 'success');
  };

  return (
    <div className="py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#075C3B] block mb-1">
            24/7 Dedicated Support
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#151515] mb-3">
            We&apos;re Here to Assist You
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Have questions regarding fabric, size fit, Cash on Delivery in your city, or customized Peshawari chappal orders? Reach out via WhatsApp, phone, or our online form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="p-6 bg-[#075C3B] text-white rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold">Direct WhatsApp Concierge</h3>
                  <span className="text-xs text-[#E9F4EE]">Fastest response under 10 minutes</span>
                </div>
              </div>

              <p className="text-xs text-neutral-200 leading-relaxed">
                Connect directly with our master stylists for sizing recommendations, real photos of fabric, and live courier tracking.
              </p>

              <a
                href="https://wa.me/923199774681?text=Assalam-o-Alaikum%20GROCARY%20SHELF%20Team%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Chat on WhatsApp (+92 319 9774681)</span>
              </a>
            </div>

            {/* Contact Information Cards */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-5 text-xs text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#075C3B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-bold mb-0.5">Headquarters &amp; Dispatch Facility:</strong>
                  <p className="text-neutral-600">Suhan, Islamabad, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#075C3B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-bold mb-0.5">Helpline &amp; WhatsApp:</strong>
                  <a href="https://wa.me/923199774681" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[#075C3B]">
                    +92 319 9774681
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#075C3B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-bold mb-0.5">Customer Support Email:</strong>
                  <a href="mailto:km2945002@gmail.com" className="text-neutral-600 hover:text-[#075C3B]">
                    km2945002@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#075C3B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-bold mb-0.5">Operating Hours:</strong>
                  <p className="text-neutral-600">Monday &ndash; Saturday: 10:00 AM &ndash; 10:00 PM PKT</p>
                </div>
              </div>
            </div>

            {/* COD & Exchange Policy Summary */}
            <div className="bg-[#F1F7F1] p-5 rounded-xl border border-[#075C3B]/20 text-xs text-neutral-800 space-y-2">
              <h4 className="font-bold text-[#075C3B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Customer Commitments</span>
              </h4>
              <p className="text-neutral-600 leading-relaxed">
                • <strong>Cash on Delivery:</strong> Available across 150+ Pakistani cities &amp; towns.<br />
                • <strong>7-Day Size Exchange:</strong> Hassle-free size replacement for shirts, trousers, and shoes.<br />
                • <strong>Express Dispatch:</strong> Packed and shipped via TCS/Leopards within 24 hours.
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Send an Online Inquiry
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Fill out the form below and our customer relationship representative will reach out via call or WhatsApp.
            </p>

            {sent ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Inquiry Successfully Received</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for contacting GROCARY SHELF. One of our team members will respond within 2-4 business hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-3 px-4 py-2 bg-[#075C3B] text-white rounded text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mortaza Khan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Mobile / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Inquiry Topic</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                  >
                    <option value="Sizing & Peshawari Inquiry">Peshawari Chappal Sizing &amp; Fitting Advice</option>
                    <option value="Order Tracking">Tracking Cash on Delivery Parcel</option>
                    <option value="Size Exchange">7-Day Size Exchange Request</option>
                    <option value="Bulk Order">Festive &amp; Wedding Bulk Orders</option>
                    <option value="Feedback">General Feedback &amp; Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please include your order number (if applicable) and your detailed question..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#075C3B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#075C3B] hover:bg-[#05462D] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
