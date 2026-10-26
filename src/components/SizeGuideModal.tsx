/**
 * GROCARY SHELF — Interactive Size Guide Modal
 */

import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide, sizeGuideCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'shirts' | 'trousers' | 'peshawari' | 'women' | 'kids'>(
    sizeGuideCategory === 'peshawari' || sizeGuideCategory === 'footwear' 
      ? 'peshawari' 
      : sizeGuideCategory === 'women'
      ? 'women'
      : sizeGuideCategory === 'kids'
      ? 'kids'
      : 'shirts'
  );
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[#075C3B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif text-xl font-bold">GROCARY SHELF Official Sizing Guide</h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Unit Switcher */}
        <div className="p-4 sm:p-6 space-y-5 text-xs max-h-[80vh] overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveTab('shirts')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeTab === 'shirts' ? 'bg-[#075C3B] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Men&apos;s Shirts
              </button>
              <button
                onClick={() => setActiveTab('trousers')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeTab === 'trousers' ? 'bg-[#075C3B] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Men&apos;s Pants
              </button>
              <button
                onClick={() => setActiveTab('peshawari')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeTab === 'peshawari' ? 'bg-[#075C3B] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Peshawari Chappal &amp; Shoes
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeTab === 'women' ? 'bg-[#075C3B] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Women&apos;s Kurti
              </button>
              <button
                onClick={() => setActiveTab('kids')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  activeTab === 'kids' ? 'bg-[#075C3B] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Kids
              </button>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-md self-end sm:self-auto">
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  unit === 'in' ? 'bg-white text-[#075C3B] shadow-xs' : 'text-neutral-500'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  unit === 'cm' ? 'bg-white text-[#075C3B] shadow-xs' : 'text-neutral-500'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Sizing Tables */}
          {activeTab === 'shirts' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                    <th className="p-2.5 border border-neutral-200">Size</th>
                    <th className="p-2.5 border border-neutral-200">Chest ({unit})</th>
                    <th className="p-2.5 border border-neutral-200">Length ({unit})</th>
                    <th className="p-2.5 border border-neutral-200">Shoulder ({unit})</th>
                    <th className="p-2.5 border border-neutral-200">Sleeve ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">S (Small)</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '38"' : '96.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '28"' : '71 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '17.5"' : '44.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '24.5"' : '62 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">M (Medium)</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '40"' : '101.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '29"' : '73.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '18"' : '45.7 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '25"' : '63.5 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">L (Large)</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '42"' : '106.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '30"' : '76 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '18.75"' : '47.6 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '25.5"' : '64.8 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">XL (Extra Large)</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '44"' : '111.7 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '31"' : '78.7 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '19.5"' : '49.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '26"' : '66 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">XXL</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '46"' : '116.8 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '31.5"' : '80 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '20.25"' : '51.4 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '26.5"' : '67.3 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'trousers' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                    <th className="p-2.5 border border-neutral-200">Waist Size</th>
                    <th className="p-2.5 border border-neutral-200">Waist Circumference</th>
                    <th className="p-2.5 border border-neutral-200">Hip Circumference</th>
                    <th className="p-2.5 border border-neutral-200">Inseam Length</th>
                    <th className="p-2.5 border border-neutral-200">Leg Opening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {['30', '32', '34', '36', '38'].map((w, idx) => (
                    <tr key={w} className={idx % 2 === 1 ? 'bg-neutral-50' : ''}>
                      <td className="p-2.5 font-bold border border-neutral-200">{w}</td>
                      <td className="p-2.5 border border-neutral-200">{unit === 'in' ? `${w}"` : `${Math.round(Number(w) * 2.54)} cm`}</td>
                      <td className="p-2.5 border border-neutral-200">{unit === 'in' ? `${Number(w) + 8}"` : `${Math.round((Number(w) + 8) * 2.54)} cm`}</td>
                      <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '31"' : '78.7 cm'}</td>
                      <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '6.75"' : '17 cm'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'peshawari' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                    <th className="p-2.5 border border-neutral-200">Pak / UK Footwear Size</th>
                    <th className="p-2.5 border border-neutral-200">European (EU) Size</th>
                    <th className="p-2.5 border border-neutral-200">US Size</th>
                    <th className="p-2.5 border border-neutral-200">Foot Length ({unit})</th>
                    <th className="p-2.5 border border-neutral-200">Fit Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {[
                    { uk: '7', eu: '41', us: '8', inLength: '10.1"', cmLength: '25.7 cm' },
                    { uk: '8', eu: '42', us: '9', inLength: '10.5"', cmLength: '26.7 cm' },
                    { uk: '9', eu: '43', us: '10', inLength: '10.8"', cmLength: '27.4 cm' },
                    { uk: '10', eu: '44', us: '11', inLength: '11.1"', cmLength: '28.2 cm' },
                    { uk: '11', eu: '45', us: '12', inLength: '11.4"', cmLength: '29.0 cm' },
                    { uk: '12', eu: '46', us: '13', inLength: '11.8"', cmLength: '30.0 cm' },
                  ].map((row, idx) => (
                    <tr key={row.uk} className={idx % 2 === 1 ? 'bg-neutral-50' : ''}>
                      <td className="p-2.5 font-bold border border-neutral-200">{row.uk} UK</td>
                      <td className="p-2.5 border border-neutral-200">{row.eu}</td>
                      <td className="p-2.5 border border-neutral-200">{row.us}</td>
                      <td className="p-2.5 border border-neutral-200">{unit === 'in' ? row.inLength : row.cmLength}</td>
                      <td className="p-2.5 border border-neutral-200 text-neutral-600">Standard fit; genuine cow leather naturally stretches to foot width within 2 wears.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'women' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                    <th className="p-2.5 border border-neutral-200">Size</th>
                    <th className="p-2.5 border border-neutral-200">Bust / Chest</th>
                    <th className="p-2.5 border border-neutral-200">Waist</th>
                    <th className="p-2.5 border border-neutral-200">Hip</th>
                    <th className="p-2.5 border border-neutral-200">Shirt Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">XS</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '36"' : '91 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '32"' : '81 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '39"' : '99 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '38"' : '96.5 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">S</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '38"' : '96.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '34"' : '86.4 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '41"' : '104 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '39"' : '99 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">M</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '40"' : '101.5 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '36"' : '91.4 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '43"' : '109 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '40"' : '101.6 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">L</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '43"' : '109 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '39"' : '99 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '46"' : '116.8 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '41"' : '104 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'kids' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                    <th className="p-2.5 border border-neutral-200">Age Group</th>
                    <th className="p-2.5 border border-neutral-200">Height</th>
                    <th className="p-2.5 border border-neutral-200">Chest</th>
                    <th className="p-2.5 border border-neutral-200">Kurta / Shirt Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">3-4 Years</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '38-41"' : '96-104 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '24"' : '61 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '21"' : '53 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">5-6 Years</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '42-45"' : '106-114 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '26"' : '66 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '23"' : '58 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border border-neutral-200">7-8 Years</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '46-49"' : '116-124 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '28"' : '71 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '25"' : '63.5 cm'}</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="p-2.5 font-bold border border-neutral-200">9-10 Years</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '50-54"' : '127-137 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '30"' : '76 cm'}</td>
                    <td className="p-2.5 border border-neutral-200">{unit === 'in' ? '27"' : '68.5 cm'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Advice callout */}
          <div className="p-3 bg-[#F1F7F1] rounded-lg border border-[#075C3B]/20 flex items-start gap-2.5 text-neutral-700">
            <HelpCircle className="w-4 h-4 text-[#075C3B] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Need measuring assistance?</strong> Send a quick message to our styling concierge on WhatsApp at <strong>+92 319 9774681</strong> with your height and shoe size for personalized sizing recommendations prior to dispatch!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
