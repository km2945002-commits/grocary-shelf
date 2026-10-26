/**
 * GROCARY SHELF — Premium Product Card Component
 */

import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPKR, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const discountPercent = product.onSale && product.regularPrice > product.price
    ? Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div 
      className="group relative flex flex-col bg-white border border-neutral-200/80 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges & Quick Action Floating Bar */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={() => openQuickView(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Uncluttered, professional) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.onSale && discountPercent > 0 && (
            <span className="bg-[#075C3B] text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#151515] text-white font-semibold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-xs shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist 
              ? 'bg-rose-50 text-rose-600 shadow-md' 
              : 'bg-white/80 backdrop-blur-xs text-neutral-700 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Hover Bar (Desktop) */}
        <div className="hidden sm:flex absolute bottom-3 left-3 right-3 items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-xs hover:bg-[#075C3B] hover:text-white text-neutral-800 text-xs font-semibold rounded shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category & Origin kicker */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
          <span className="uppercase tracking-wider font-semibold text-[#075C3B]">
            {product.categoryLabel}
          </span>
          <span className="text-[10px] text-neutral-400">COD Available</span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => openQuickView(product)}
          className="font-medium text-neutral-900 text-sm leading-snug hover:text-[#075C3B] transition-colors cursor-pointer line-clamp-1 mb-1.5"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Rating & Review count */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-neutral-800 ml-1">{product.rating}</span>
          </div>
          <span className="text-neutral-300 text-xs">·</span>
          <span className="text-[11px] text-neutral-500">({product.reviewCount} reviews)</span>
        </div>

        {/* Color Swatch Selector */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === c.name 
                    ? 'ring-2 ring-offset-1 ring-[#075C3B] scale-110' 
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">{selectedColor.name}</span>
          </div>
        )}

        {/* Size chips */}
        <div className="flex flex-wrap items-center gap-1 mb-3">
          {product.sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border transition-colors ${
                selectedSize === size
                  ? 'bg-[#075C3B] text-white border-[#075C3B]'
                  : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {size}
            </button>
          ))}
          {product.sizes.length > 5 && (
            <span className="text-[10px] text-neutral-400">+{product.sizes.length - 5}</span>
          )}
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-[#151515]">
              {formatPKR(product.price)}
            </div>
            {product.onSale && product.regularPrice > product.price && (
              <span className="text-[11px] text-neutral-400 line-through">
                {formatPKR(product.regularPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isAdding
                ? 'bg-emerald-700 text-white'
                : 'bg-[#075C3B] hover:bg-[#05462D] text-white active:scale-95'
            }`}
            title="Add to shopping bag"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
