/**
 * GROCARY SHELF — WordPress, WooCommerce & Elementor Developer Suite Modal
 */

import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  Download, 
  BookOpen, 
  Database, 
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { 
  ELEMENTOR_SNIPPETS, 
  WOOCOMMERCE_PHP_SNIPPETS, 
  WOOCOMMERCE_CSV_IMPORT_TEMPLATE, 
  SEO_SCHEMA_MARKUP, 
  WORDPRESS_SETUP_GUIDE 
} from '../data/elementorToolkit';

export const ElementorToolkitModal: React.FC = () => {
  const { isToolkitOpen, setIsToolkitOpen, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'elementor' | 'php' | 'csv' | 'seo' | 'guide'>('elementor');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isToolkitOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadCSV = () => {
    const blob = new Blob([WOOCOMMERCE_CSV_IMPORT_TEMPLATE], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'grocary_shelf_woocommerce_products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded grocary_shelf_woocommerce_products.csv', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 backdrop-blur-xs p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#075C3B] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Code2 className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold">GROCARY SHELF — WordPress &amp; Elementor Suite</h3>
                <span className="bg-[#C5A059] text-neutral-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Production Ready
                </span>
              </div>
              <p className="text-xs text-[#E9F4EE] mt-0.5">
                Complete HTML/CSS Elementor widgets, WooCommerce Pakistan PHP hooks, CSV catalog import, and SEO Schema.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsToolkitOpen(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-4 py-2 bg-neutral-100 border-b border-neutral-200 text-xs font-semibold overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('elementor')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              activeTab === 'elementor' ? 'bg-[#075C3B] text-white' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Elementor HTML/CSS</span>
          </button>

          <button
            onClick={() => setActiveTab('php')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              activeTab === 'php' ? 'bg-[#075C3B] text-white' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>WooCommerce PHP (PKR &amp; COD)</span>
          </button>

          <button
            onClick={() => setActiveTab('csv')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              activeTab === 'csv' ? 'bg-[#075C3B] text-white' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Product Import CSV</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              activeTab === 'seo' ? 'bg-[#075C3B] text-white' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>SEO &amp; Schema JSON-LD</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              activeTab === 'guide' ? 'bg-[#075C3B] text-white' : 'text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Installation &amp; Testing Guide</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-neutral-800">
          
          {/* TAB 1: Elementor HTML/CSS */}
          {activeTab === 'elementor' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F1F7F1] rounded-lg border border-[#075C3B]/20 text-neutral-700">
                <h4 className="font-bold text-[#075C3B] text-sm mb-1">How to use in Elementor:</h4>
                <p>
                  1. Add an <strong>Elementor HTML Widget</strong> anywhere in your page or theme template.<br />
                  2. Paste the HTML combined with the Scoped CSS block below into the widget.<br />
                  3. All CSS classes are prefixed with <code className="bg-white px-1 py-0.5 rounded border font-mono">gs-</code> so they will never conflict with your WordPress theme.
                </p>
              </div>

              {Object.entries(ELEMENTOR_SNIPPETS).map(([key, item]) => {
                const combinedCode = `${item.html}\n\n${item.css}`;
                return (
                  <div key={key} className="border border-neutral-200 rounded-xl overflow-hidden shadow-2xs">
                    <div className="p-3.5 bg-neutral-100 flex items-center justify-between border-b border-neutral-200">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">{item.title}</h4>
                        <p className="text-[11px] text-neutral-500">{item.description}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(combinedCode, key)}
                        className="px-3 py-1.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        {copiedKey === key ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Widget Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 bg-neutral-900 text-neutral-100 font-mono text-[11px] overflow-x-auto max-h-60 leading-relaxed">
                      {combinedCode}
                    </pre>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: WooCommerce PHP Customizations */}
          {activeTab === 'php' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                <h4 className="font-bold text-sm mb-1">WooCommerce Pakistan Snippets (functions.php)</h4>
                <p className="text-xs">
                  Copy and paste into your WordPress theme&apos;s <code className="bg-white px-1 rounded font-mono">functions.php</code> or via the free <strong>WPCode</strong> plugin.
                  Configures PKR symbol formatting, Pakistan provinces, default Cash on Delivery, phone validation, and instant WhatsApp ordering.
                </p>
              </div>

              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="p-3 bg-neutral-100 flex items-center justify-between border-b border-neutral-200">
                  <span className="font-mono font-bold text-xs">functions.php (WooCommerce Pakistan Customizations)</span>
                  <button
                    onClick={() => handleCopy(WOOCOMMERCE_PHP_SNIPPETS, 'php')}
                    className="px-3 py-1.5 bg-[#075C3B] hover:bg-[#05462D] text-white rounded text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedKey === 'php' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'php' ? 'Copied!' : 'Copy PHP Code'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-96 leading-relaxed">
                  {WOOCOMMERCE_PHP_SNIPPETS}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Product Import CSV */}
          {activeTab === 'csv' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F1F7F1] rounded-lg border border-[#075C3B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-neutral-700">
                <div>
                  <h4 className="font-bold text-[#075C3B] text-sm mb-1">Standard WooCommerce CSV Import Format</h4>
                  <p className="text-xs">
                    Ready to import into <strong>WooCommerce &gt; Products &gt; Import</strong>. Includes prices in PKR, images, SKUs, and categories.
                  </p>
                </div>
                <button
                  onClick={handleDownloadCSV}
                  className="px-4 py-2 bg-[#075C3B] hover:bg-[#05462D] text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shrink-0 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .CSV File</span>
                </button>
              </div>

              <div className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="p-3 bg-neutral-100 flex items-center justify-between border-b border-neutral-200">
                  <span className="font-mono text-xs font-bold">woocommerce_products.csv</span>
                  <button
                    onClick={() => handleCopy(WOOCOMMERCE_CSV_IMPORT_TEMPLATE, 'csv')}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-black text-white rounded text-xs font-semibold flex items-center gap-1.5"
                  >
                    {copiedKey === 'csv' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Raw CSV</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-900 text-neutral-200 font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed">
                  {WOOCOMMERCE_CSV_IMPORT_TEMPLATE}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & Schema JSON-LD */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                <h4 className="font-bold text-sm mb-1">Search Engine Optimization (SEO) Architecture</h4>
                <p className="text-xs">
                  Target search phrases: <em>Online clothing store Pakistan, Peshawari chappal online Pakistan, Men shirts and pants online, Kids clothes online Pakistan</em>.
                  Use Rank Math SEO or Yoast SEO to configure titles, breadcrumbs, and OpenGraph share cards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="p-3 bg-neutral-100 flex items-center justify-between border-b border-neutral-200">
                    <span className="font-bold text-xs">Organization &amp; Store Schema (JSON-LD)</span>
                    <button
                      onClick={() => handleCopy(SEO_SCHEMA_MARKUP.organization, 'schema-org')}
                      className="px-2.5 py-1 bg-[#075C3B] text-white rounded text-[11px]"
                    >
                      {copiedKey === 'schema-org' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-3 bg-neutral-900 text-amber-300 font-mono text-[10px] overflow-x-auto max-h-60">
                    {SEO_SCHEMA_MARKUP.organization}
                  </pre>
                </div>

                <div className="border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="p-3 bg-neutral-100 flex items-center justify-between border-b border-neutral-200">
                    <span className="font-bold text-xs">Product Schema (Peshawari Chappal)</span>
                    <button
                      onClick={() => handleCopy(SEO_SCHEMA_MARKUP.productExample, 'schema-prod')}
                      className="px-2.5 py-1 bg-[#075C3B] text-white rounded text-[11px]"
                    >
                      {copiedKey === 'schema-prod' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-3 bg-neutral-900 text-emerald-300 font-mono text-[10px] overflow-x-auto max-h-60">
                    {SEO_SCHEMA_MARKUP.productExample}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WordPress Setup & Testing Checklist */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-neutral-900 border-b pb-2">
                  Step-by-Step WordPress &amp; WooCommerce Launch Roadmap
                </h4>
                {WORDPRESS_SETUP_GUIDE.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
                    <h5 className="font-bold text-xs text-[#075C3B] mb-1">{item.step}</h5>
                    <p className="text-xs text-neutral-600">{item.details}</p>
                  </div>
                ))}
              </div>

              {/* Recommended Plugins */}
              <div className="p-4 bg-neutral-100 rounded-xl border border-neutral-200">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3">
                  Recommended WordPress Plugins (Free &amp; Pro)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <strong>1. WooCommerce (Free)</strong>
                    <p className="text-neutral-500 text-[11px] mt-0.5">Core e-commerce catalog, cart, and Pakistan COD engine.</p>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <strong>2. Elementor &amp; Elementor Pro</strong>
                    <p className="text-neutral-500 text-[11px] mt-0.5">Drag-and-drop page builder for homepage and header/footer templates.</p>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <strong>3. Variation Swatches for WooCommerce</strong>
                    <p className="text-neutral-500 text-[11px] mt-0.5">Displays color circles and size chips instead of dull select dropdowns.</p>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-neutral-200">
                    <strong>4. Rank Math SEO (Free)</strong>
                    <p className="text-neutral-500 text-[11px] mt-0.5">Schema.org generator, sitemaps, OpenGraph cards, and Core Web Vitals.</p>
                  </div>
                </div>
              </div>

              {/* Responsiveness & Cross-Device Checklist */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2">
                  Responsive &amp; Cross-Device Testing Checklist
                </h4>
                <ul className="space-y-1.5 text-xs">
                  <li>✓ <strong>Mobile Phones (320px–767px):</strong> Touch targets 44px or larger, sticky bottom COD bar, hamburger menu.</li>
                  <li>✓ <strong>Tablets (768px–1024px):</strong> 2-column product grid, accessible filters, responsive header.</li>
                  <li>✓ <strong>Desktop (1025px+):</strong> 4-column product grid, hover zoom previews, full mega-navigation.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
