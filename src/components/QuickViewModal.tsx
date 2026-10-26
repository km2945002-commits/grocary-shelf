/**
 * GROCARY SHELF — Product Quick View & Details Modal
 */

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  MessageCircle, 
  Ruler, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    formatPKR,
    addToCart,
    openSizeGuide,
    setIsCheckoutOpen
  } = useStore();

  const product = quickViewProduct;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'fabric' | 'shipping'>('desc');
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, currentColor, quantity);
    setTimeout(() => {
      setIsAdding(false);
      closeQuickView();
    }, 600);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, currentColor, quantity);
    closeQuickView();
    setIsCheckoutOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum GROCARY SHELF, I want to order this product via Cash on Delivery:\n\n*Product:* ${product.name}\n*Size:* ${selectedSize}\n*Color:* ${currentColor.name}\n*Price:* Rs. ${product.price.toLocaleString()}\n*SKU:* ${product.sku}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 relative">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-neutral-900 bg-white/80 hover:bg-neutral-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left: Product Images */}
          <div className="p-6 bg-neutral-50 flex flex-col items-center justify-between">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4 border border-neutral-200/80">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex gap-2 w-full justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded border-2 overflow-hidden transition-all ${
                      activeImageIdx === idx ? 'border-[#075C3B] scale-105' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                <span className="uppercase tracking-widest font-bold text-[#075C3B]">
                  {product.categoryLabel}
                </span>
                <span className="font-mono text-neutral-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-[#151515] leading-snug mb-2">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 text-xs mb-4">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-neutral-900 ml-1">{product.rating}</span>
                  <span className="text-neutral-400 ml-1">({product.reviewCount} customer reviews)</span>
                </div>
                <span>·</span>
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  ✓ In Stock ({product.stockCount} left)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-extrabold text-[#151515]">
                  {formatPKR(product.price)}
                </span>
                {product.onSale && product.regularPrice > product.price && (
                  <>
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPKR(product.regularPrice)}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Save {Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-700">
                    Selected Color: <strong className="text-neutral-900">{currentColor.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs transition-all ${
                        currentColor.name === c.name
                          ? 'border-[#075C3B] bg-[#F1F7F1] font-semibold text-[#075C3B]'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-neutral-300" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection + Size Guide Link */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-neutral-700">
                    Select Size: <strong className="text-neutral-900">{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => openSizeGuide(product.category)}
                    className="text-[#075C3B] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded border transition-all ${
                        selectedSize === size
                          ? 'bg-[#075C3B] text-white border-[#075C3B] shadow-xs'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-l-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-neutral-900">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-r-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 py-3 px-4 bg-[#075C3B] hover:bg-[#05462D] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center justify-center gap-2"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3 px-4 bg-[#151515] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all"
                  >
                    Buy via COD
                  </button>
                </div>

                {/* Direct WhatsApp Order Button */}
                <a
                  href={`https://wa.me/923199774681?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp (Instant Confirmation)</span>
                </a>
              </div>

            </div>

            {/* Tabbed Specs: Fabric, Fit & Shipping */}
            <div className="pt-4 border-t border-neutral-200 text-xs">
              <div className="flex border-b border-neutral-200 mb-3 gap-4">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-1.5 font-bold transition-colors border-b-2 ${
                    activeTab === 'desc' ? 'border-[#075C3B] text-[#075C3B]' : 'border-transparent text-neutral-500'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1.5 font-bold transition-colors border-b-2 ${
                    activeTab === 'fabric' ? 'border-[#075C3B] text-[#075C3B]' : 'border-transparent text-neutral-500'
                  }`}
                >
                  Fabric &amp; Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1.5 font-bold transition-colors border-b-2 ${
                    activeTab === 'shipping' ? 'border-[#075C3B] text-[#075C3B]' : 'border-transparent text-neutral-500'
                  }`}
                >
                  Delivery &amp; COD
                </button>
              </div>

              {activeTab === 'desc' && (
                <p className="text-neutral-600 leading-relaxed text-xs">
                  {product.description}
                </p>
              )}

              {activeTab === 'fabric' && (
                <div className="space-y-1 text-neutral-600 text-xs">
                  <p><strong>Material:</strong> {product.fabric}</p>
                  <p><strong>Fit:</strong> {product.fit}</p>
                  <p><strong>Care:</strong> {product.careInstructions}</p>
                  {product.origin && <p><strong>Origin:</strong> {product.origin}</p>}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2 text-neutral-600 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Nationwide delivery in 2-4 business days via TCS &amp; Leopards.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#075C3B]" />
                    <span>Pay Cash on Delivery. Free delivery on orders over Rs. 3,500.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-[#075C3B]" />
                    <span>7-day easy size exchange available nationwide.</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
