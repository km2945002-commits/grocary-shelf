/**
 * GROCARY SHELF — Curated Fashion & Footwear Catalog
 * All prices in Pakistani Rupees (PKR)
 */

import { Product, CustomerReview } from '../types';

export const PRODUCTS: Product[] = [
  // --- MEN'S FASHION ---
  {
    id: 'men-oxford-shirt-forest',
    name: 'Tailored Supima Cotton Oxford Shirt',
    slug: 'tailored-supima-cotton-oxford-shirt',
    category: 'men',
    subcategory: 'shirts',
    categoryLabel: "Men's Fashion",
    price: 3450,
    regularPrice: 4200,
    onSale: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A gentleman’s staple engineered with 100% long-staple Supima cotton. Cut in a modern tailored silhouette that holds its shape from morning meetings to evening dinners. Features mother-of-pearl buttons, a reinforced button-down collar, and breathable weave perfected for the Pakistani climate.',
    shortDescription: '100% Supima cotton tailored fit shirt with button-down collar.',
    fabric: '100% Long-Staple Supima Cotton',
    fit: 'Modern Tailored Fit',
    careInstructions: 'Machine wash cold with like colors. Warm iron if needed. Do not bleach.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest Green', hex: '#075C3B' },
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Navy Blue', hex: '#1E293B' }
    ],
    sku: 'GS-MSH-001',
    inStock: true,
    stockCount: 14,
    origin: 'Manufactured in Faisalabad, Pakistan'
  },
  {
    id: 'men-linen-casual-shirt',
    name: 'Pure Flax Linen Relaxed Summer Shirt',
    slug: 'pure-flax-linen-relaxed-summer-shirt',
    category: 'men',
    subcategory: 'shirts',
    categoryLabel: "Men's Fashion",
    price: 3850,
    regularPrice: 4500,
    onSale: true,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Woven from airy European flax linen, this relaxed-fit casual shirt offers unmatched breathability during hot Pakistani summers. Featuring a band collar and washed softness.',
    shortDescription: '100% airy pure flax linen relaxed shirt with grandad mandarin collar.',
    fabric: '100% Pure Flax Linen',
    fit: 'Relaxed Casual Fit',
    careInstructions: 'Gentle hand or machine wash in cold water. Line dry in shade.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Beige', hex: '#D2B48C' },
      { name: 'Sage Green', hex: '#8A9A86' },
      { name: 'Off-White', hex: '#F8F9FA' }
    ],
    sku: 'GS-MSH-002',
    inStock: true,
    stockCount: 9,
    origin: 'Crafted in Lahore, Pakistan'
  },
  {
    id: 'men-stretch-chino-trousers',
    name: 'Comfort-Stretch Chino Trousers',
    slug: 'comfort-stretch-chino-trousers',
    category: 'men',
    subcategory: 'pants',
    categoryLabel: "Men's Fashion",
    price: 3200,
    regularPrice: 3200,
    onSale: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Essential everyday trousers crafted with 98% compact cotton twill and 2% elastane for unrestricted all-day movement. Tailored mid-rise waist with slanted front pockets and secure welted back pockets.',
    shortDescription: 'Mid-rise stretch cotton chinos with tailored tapered leg.',
    fabric: '98% Cotton Twill, 2% Elastane',
    fit: 'Slim-Straight Fit',
    careInstructions: 'Machine wash warm inside out. Tumble dry low.',
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Khaki', hex: '#C3B091' },
      { name: 'Charcoal Black', hex: '#1F2937' },
      { name: 'Deep Olive', hex: '#3B443B' }
    ],
    sku: 'GS-MPN-001',
    inStock: true,
    stockCount: 22,
    origin: 'Karachi, Pakistan'
  },
  {
    id: 'men-formal-dress-trousers',
    name: 'Executive Wool-Blend Formal Trousers',
    slug: 'executive-wool-blend-formal-trousers',
    category: 'men',
    subcategory: 'formal',
    categoryLabel: "Men's Fashion",
    price: 4600,
    regularPrice: 5500,
    onSale: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sharp, wrinkle-resistant dress trousers featuring a permanent front crease, concealed hook-and-bar waistband, and lined inner crotch for long-lasting boardroom durability.',
    shortDescription: 'Crease-resistant formal trousers for business and events.',
    fabric: '70% Poly-Viscose, 30% Fine Wool',
    fit: 'Classic Tailored Fit',
    careInstructions: 'Dry clean recommended. Steam iron on medium setting.',
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Charcoal Slate', hex: '#374151' },
      { name: 'Midnight Navy', hex: '#111827' }
    ],
    sku: 'GS-MPN-002',
    inStock: true,
    stockCount: 11
  },

  // --- PESHAWARI CHAPPAL (HERITAGE PAKISTANI CRAFT) ---
  {
    id: 'peshawari-kaptaan-double-sole',
    name: 'Kaptaan Peshawari Chappal (Double Tyre Sole)',
    slug: 'kaptaan-peshawari-chappal-double-tyre-sole',
    category: 'peshawari',
    subcategory: 'peshawari',
    categoryLabel: 'Peshawari Chappal',
    price: 5450,
    regularPrice: 6500,
    onSale: true,
    isFeatured: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The iconic Pakistani Kaptaan Chappal, handmade by generational master craftsmen in Peshawar. Made from 100% full-grain cowhide leather with robust hand-stitched welt and recycled aircraft tyre double sole for lifelong durability and royal posture.',
    shortDescription: 'Authentic handcrafted Peshawar Kaptaan Chappal with double tyre sole.',
    fabric: '100% Full-Grain Genuine Cow Leather & Recycled Tyre Sole',
    fit: 'Standard Pakistan/UK Footwear Fit (Arch Support Insole)',
    careInstructions: 'Wipe clean with a damp cloth. Apply high-grade natural wax leather polish.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Mustard Tan', hex: '#C28941' },
      { name: 'Matte Jet Black', hex: '#151515' },
      { name: 'Dark Oxblood', hex: '#4A151B' }
    ],
    sku: 'GS-PESH-001',
    inStock: true,
    stockCount: 18,
    origin: 'Handmade in Peshawar, Khyber Pakhtunkhwa'
  },
  {
    id: 'peshawari-charsadda-single-sole',
    name: 'Charsadda Traditional Hand-Stitched Chappal',
    slug: 'charsadda-traditional-hand-stitched-chappal',
    category: 'peshawari',
    subcategory: 'peshawari',
    categoryLabel: 'Peshawari Chappal',
    price: 4850,
    regularPrice: 5800,
    onSale: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Renowned Charsadda craftsmanship characterized by its soft hand-milled leather upper, memory foam footbed, and flexible single tyre sole. Perfect for Jummah prayers, weddings, and everyday heritage elegance.',
    shortDescription: 'Pure leather Charsadda chappal with padded foam comfort.',
    fabric: 'Soft Cow Leather Upper & Natural Rubber Sole',
    fit: 'True to Size (Wide Comfort Cut)',
    careInstructions: 'Store in dust bag. Polish with neutral leather cream.',
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Camel Brown', hex: '#A26D3F' },
      { name: 'Jet Black', hex: '#151515' }
    ],
    sku: 'GS-PESH-002',
    inStock: true,
    stockCount: 12,
    origin: 'Charsadda Bazaar, KPK, Pakistan'
  },
  {
    id: 'peshawari-norozi-classic',
    name: 'Norozi Royal Heritage Peshawari Chappal',
    slug: 'norozi-royal-heritage-peshawari-chappal',
    category: 'peshawari',
    subcategory: 'peshawari',
    categoryLabel: 'Peshawari Chappal',
    price: 6200,
    regularPrice: 7200,
    onSale: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The heavyweight Norozi silhouette favored across Baluchistan and KPK. Features bold heavy-gauge wax thread stitching, reinforced cross-straps, and double leather welting for unmatched presence.',
    shortDescription: 'Heavy-gauge hand-sewn Norozi cut with royal profile.',
    fabric: 'Premium Pull-Up Leather & Compressed Tyre Rubber',
    fit: 'Traditional High-Arch Fit',
    careInstructions: 'Condition monthly with leather balm.',
    sizes: ['8', '9', '10', '11'],
    colors: [
      { name: 'Dark Chocolate', hex: '#3B2317' },
      { name: 'Charcoal Black', hex: '#151515' }
    ],
    sku: 'GS-PESH-003',
    inStock: true,
    stockCount: 8,
    origin: 'Quetta & Peshawar Artisans, Pakistan'
  },

  // --- FOOTWEAR (MEN & WOMEN) ---
  {
    id: 'men-italian-leather-loafers',
    name: 'Artisan Hand-Burnished Leather Loafers',
    slug: 'artisan-hand-burnished-leather-loafers',
    category: 'footwear',
    subcategory: 'footwear',
    categoryLabel: 'Footwear',
    price: 6900,
    regularPrice: 8500,
    onSale: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sophisticated penny loafers crafted with full-grain calfskin leather, hand-burnished for rich tonal depth. Features cushioned insole with moisture-wicking sheepskin lining.',
    shortDescription: 'Handcrafted genuine leather penny loafers with cushioned footbed.',
    fabric: 'Full-Grain Calfskin Leather with Rubber Grip Heel',
    fit: 'Medium Width (Sizes 7-11 UK)',
    careInstructions: 'Polish regularly and use cedar shoe trees.',
    sizes: ['7', '8', '9', '10', '11'],
    colors: [
      { name: 'Cognac Tan', hex: '#8B4513' },
      { name: 'Midnight Black', hex: '#151515' }
    ],
    sku: 'GS-FTW-001',
    inStock: true,
    stockCount: 7
  },

  // --- WOMEN'S FASHION ---
  {
    id: 'women-embroidered-kurti',
    name: 'Hand-Embroidered Linen Pret Kurti',
    slug: 'hand-embroidered-linen-pret-kurti',
    category: 'women',
    subcategory: 'shirts',
    categoryLabel: "Women's Fashion",
    price: 4250,
    regularPrice: 5200,
    onSale: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 63,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An elegant pret tunic crafted from pure breathable slub-linen. Adorned with delicate threadwork along the neckline, sleeves, and daman with scalloped lace finishes. Pairs seamlessly with trousers or culottes for both office wear and festive gatherings.',
    shortDescription: 'Pure slub linen kurti with delicate contrast embroidery.',
    fabric: '100% Breathable Slub Linen',
    fit: 'Contemporary Straight Cut',
    careInstructions: 'Hand wash in cold water or dry clean to preserve embroidery.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Emerald Forest', hex: '#075C3B' },
      { name: 'Pearl Ivory', hex: '#FDFBF7' },
      { name: 'Blush Rose', hex: '#D8A0A6' }
    ],
    sku: 'GS-WKN-001',
    inStock: true,
    stockCount: 16,
    origin: 'Multan & Lahore Artisans'
  },
  {
    id: 'women-chiffon-floral-shirt',
    name: 'Botanical Print Silk-Chiffon Tunic',
    slug: 'botanical-print-silk-chiffon-tunic',
    category: 'women',
    subcategory: 'shirts',
    categoryLabel: "Women's Fashion",
    price: 3800,
    regularPrice: 4600,
    onSale: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 29,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Light-as-air silk chiffon tunic featuring a bespoke botanical print inspired by northern gardens. Comes with an attached inner soft cotton lining and ruffled collar detailing.',
    shortDescription: 'Silk-chiffon printed tunic with inner cotton slip.',
    fabric: 'Silk-Blend Chiffon with 100% Cotton Lining',
    fit: 'Fluid A-Line Silhouette',
    careInstructions: 'Gentle hand wash in mild detergent.',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Olive Green', hex: '#556B2F' },
      { name: 'Soft Cream', hex: '#FFFDD0' }
    ],
    sku: 'GS-WKN-002',
    inStock: true,
    stockCount: 10
  },
  {
    id: 'women-cotton-flare-pants',
    name: 'Tailored Cotton-Lawn Cigarette Pants',
    slug: 'tailored-cotton-lawn-cigarette-pants',
    category: 'women',
    subcategory: 'pants',
    categoryLabel: "Women's Fashion",
    price: 2450,
    regularPrice: 2800,
    onSale: true,
    rating: 4.7,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tailored cigarette pants in premium mercerized cotton with a comfortable elasticated back waist and flat front band. Designed with subtle pintucks and pearl buttons at the ankle hem.',
    shortDescription: 'Mercerized cotton cigarette pants with pin-tuck ankle.',
    fabric: '100% Mercerized Cotton Lawn',
    fit: 'Cropped Cigarette Cut',
    careInstructions: 'Machine wash cold. Iron on medium heat.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Pitch Black', hex: '#151515' },
      { name: 'Beige', hex: '#EEDC82' }
    ],
    sku: 'GS-WPN-001',
    inStock: true,
    stockCount: 26
  },
  {
    id: 'women-leather-khussa-peshawari',
    name: 'Traditional Gold-Tilla Leather Khussa',
    slug: 'traditional-gold-tilla-leather-khussa',
    category: 'footwear',
    subcategory: 'footwear',
    categoryLabel: "Footwear",
    price: 3650,
    regularPrice: 4200,
    onSale: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handmade pure leather khussa enriched with intricate gold tilla embroidery and soft double-padded insole to eliminate heel bites. Designed to soften and mold gracefully to the contours of your feet.',
    shortDescription: 'Genuine leather khussa with gold tilla thread embroidery.',
    fabric: 'Genuine Leather Upper & Leather Sole with Double Cushioning',
    fit: 'Snug Initial Fit (Molds to Foot Shape within 1-2 Wears)',
    careInstructions: 'Avoid direct moisture. Wipe gently with dry cloth.',
    sizes: ['6', '7', '8', '9', '10'],
    colors: [
      { name: 'Antique Gold', hex: '#C5A059' },
      { name: 'Emerald Velvet', hex: '#075C3B' },
      { name: 'Burgundy', hex: '#65000B' }
    ],
    sku: 'GS-WFT-001',
    inStock: true,
    stockCount: 15,
    origin: 'Bahawalpur & Lahore Artisans'
  },
  {
    id: 'women-block-heel-mules',
    name: 'Minimalist Leather Block Heel Mules',
    slug: 'minimalist-leather-block-heel-mules',
    category: 'footwear',
    subcategory: 'footwear',
    categoryLabel: 'Footwear',
    price: 4400,
    regularPrice: 5200,
    onSale: true,
    rating: 4.8,
    reviewCount: 18,
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clean geometric 2-inch block heel mules with supple faux-nappa leather straps and arch-support cushioning. Perfect height for effortless all-day events.',
    shortDescription: '2-inch block heel mules with padded insole.',
    fabric: 'Supple Nappa Finish with Anti-Slip Resin Sole',
    fit: 'Standard Width',
    careInstructions: 'Spot clean with mild soapy water.',
    sizes: ['6', '7', '8', '9'],
    colors: [
      { name: 'Nude Tan', hex: '#E0AC69' },
      { name: 'Jet Black', hex: '#151515' }
    ],
    sku: 'GS-WFT-002',
    inStock: true,
    stockCount: 11
  },

  // --- KIDS' FASHION ---
  {
    id: 'kids-junior-peshawari-chappal',
    name: 'Junior Artisan Peshawari Chappal (Ages 4-12)',
    slug: 'junior-artisan-peshawari-chappal',
    category: 'kids',
    subcategory: 'peshawari',
    categoryLabel: "Kids' Fashion",
    price: 3200,
    regularPrice: 3800,
    onSale: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 44,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted traditional Peshawari Chappal scaled down for kids. Built with extra soft leather straps and an ultra-lightweight flexible rubber sole so youngsters can run freely at family celebrations and Eid.',
    shortDescription: 'Comfortable lightweight pure leather Peshawari chappal for boys.',
    fabric: 'Extra-Soft Cow Leather with Lightweight EVA/Rubber Sole',
    fit: 'Children UK/Pakistan Sizes (Kid 8 to Kid 2)',
    careInstructions: 'Wipe with soft damp cloth.',
    sizes: ['Kid 8', 'Kid 9', 'Kid 10', 'Kid 11', 'Kid 12', 'Kid 1'],
    colors: [
      { name: 'Tan Mustard', hex: '#C28941' },
      { name: 'Classic Black', hex: '#151515' }
    ],
    sku: 'GS-KID-001',
    inStock: true,
    stockCount: 17,
    origin: 'Peshawar Master Craftsmen'
  },
  {
    id: 'kids-boys-linen-kurta-set',
    name: "Boys' Festive Linen Kurta & Shalwar Set",
    slug: 'boys-festive-linen-kurta-and-shalwar-set',
    category: 'kids',
    subcategory: 'boys',
    categoryLabel: "Kids' Fashion",
    price: 3100,
    regularPrice: 3800,
    onSale: true,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Two-piece festive set featuring a soft linen-cotton kurta with minimal embroidery on the ban collar and placket, accompanied by a relaxed cotton shalwar with elasticated waist for easy dressing.',
    shortDescription: '2-piece breathable linen-cotton kurta set for boys.',
    fabric: '85% Cotton, 15% Linen',
    fit: 'Relaxed Kid Fit',
    careInstructions: 'Machine wash gentle. Iron on cotton setting.',
    sizes: ['3-4 Y', '5-6 Y', '7-8 Y', '9-10 Y', '11-12 Y'],
    colors: [
      { name: 'Forest Green', hex: '#075C3B' },
      { name: 'Ivory Cream', hex: '#F7F4EB' }
    ],
    sku: 'GS-KID-002',
    inStock: true,
    stockCount: 14
  },
  {
    id: 'kids-girls-embroidered-frock',
    name: "Girls' Embroidered Cotton Frock & Trousers",
    slug: 'girls-embroidered-cotton-frock-and-trousers',
    category: 'kids',
    subcategory: 'girls',
    categoryLabel: "Kids' Fashion",
    price: 3350,
    regularPrice: 3950,
    onSale: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Charming festive frock featuring vibrant thread embroidery across the yoke and soft gathers at the waistline. Crafted from 100% breathable combed cotton with matching printed straight trousers.',
    shortDescription: 'Embroidered combed cotton dress set for girls.',
    fabric: '100% Combed Cotton',
    fit: 'Comfort Fit with Adjustable Back Tie',
    careInstructions: 'Hand wash cold or gentle machine cycle.',
    sizes: ['3-4 Y', '5-6 Y', '7-8 Y', '9-10 Y'],
    colors: [
      { name: 'Pistachio Green', hex: '#93C572' },
      { name: 'Blush Coral', hex: '#E78587' }
    ],
    sku: 'GS-KID-003',
    inStock: true,
    stockCount: 12
  },
  {
    id: 'kids-boys-oxford-shirt-pants',
    name: "Boys' Casual Button-Down & Chino Shorts Set",
    slug: 'boys-casual-button-down-and-chino-shorts-set',
    category: 'kids',
    subcategory: 'boys',
    categoryLabel: "Kids' Fashion",
    price: 2750,
    regularPrice: 3200,
    onSale: true,
    rating: 4.7,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Smart casual pairing for active days: crisp Oxford short-sleeve shirt with wooden buttons matched with stretch chino shorts featuring an adjustable inner elastic waistband.',
    shortDescription: 'Short-sleeve oxford shirt and chino shorts combo.',
    fabric: '100% Breathable Cotton',
    fit: 'Standard Regular Fit',
    careInstructions: 'Machine wash warm with like colors.',
    sizes: ['4-5 Y', '6-7 Y', '8-9 Y', '10-11 Y'],
    colors: [
      { name: 'Sky Blue & Khaki', hex: '#87CEEB' },
      { name: 'White & Navy', hex: '#1E293B' }
    ],
    sku: 'GS-KID-004',
    inStock: true,
    stockCount: 15
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Tariq',
    city: 'Lahore, Punjab',
    rating: 5,
    date: '3 days ago',
    title: 'Kaptaan Chappal quality is unmatched!',
    comment: 'Ordered the Mustard Kaptaan chappal with double tyre sole. The leather thickness and stitching quality rival bespoke shops on Peshawar’s Namak Mandi. Delivered in 2 days to Gulberg, paid COD at doorstep. 10/10.',
    verified: true,
    productName: 'Kaptaan Peshawari Chappal (Double Tyre Sole)'
  },
  {
    id: 'rev-2',
    author: 'Ayesha Siddiqui',
    city: 'Karachi, Sindh',
    rating: 5,
    date: '1 week ago',
    title: 'Sublime linen fabric and fit',
    comment: 'The embroidered green kurti is gorgeous in real life. Fabric is pure slub linen, perfectly breathable for Karachi weather. Sizing was exact according to their size guide table.',
    verified: true,
    productName: 'Hand-Embroidered Linen Pret Kurti'
  },
  {
    id: 'rev-3',
    author: 'Brig. (R) Usman Malik',
    city: 'Islamabad, ICT',
    rating: 5,
    date: '2 weeks ago',
    title: 'Proper gentleman’s shirts',
    comment: 'Supima cotton shirt in Forest Green is exceptional. Holds collar crease well, fabric does not shrink after wash. Impressed by the neat packaging and swift TCS delivery.',
    verified: true,
    productName: 'Tailored Supima Cotton Oxford Shirt'
  },
  {
    id: 'rev-4',
    author: 'Fatima Noor',
    city: 'Peshawar, KPK',
    rating: 5,
    date: '3 weeks ago',
    title: 'Kids junior chappal is so soft!',
    comment: 'Bought junior Peshawari chappals for my two sons for Eid. Usually kids complain about leather biting, but these have soft inner padding and light soles. They wore them all day happily.',
    verified: true,
    productName: 'Junior Artisan Peshawari Chappal'
  },
  {
    id: 'rev-5',
    author: 'Saad Farooq',
    city: 'Faisalabad, Punjab',
    rating: 5,
    date: '1 month ago',
    title: 'Easy Cash on Delivery & Fast Confirmation',
    comment: 'Received a confirmation WhatsApp message within 15 minutes of placing my order on GROCARY SHELF. Rider arrived with parcel in 48 hours. Seamless shopping experience.',
    verified: true,
    productName: 'Comfort-Stretch Chino Trousers'
  }
];

export const PAKISTAN_PROVINCES = [
  { code: 'punjab', name: 'Punjab' },
  { code: 'sindh', name: 'Sindh' },
  { code: 'kpk', name: 'Khyber Pakhtunkhwa (KPK)' },
  { code: 'balochistan', name: 'Balochistan' },
  { code: 'ict', name: 'Islamabad Capital Territory' },
  { code: 'ajk', name: 'Azad Jammu & Kashmir (AJK)' },
  { code: 'gb', name: 'Gilgit-Baltistan' }
];

export const MAJOR_PAKISTAN_CITIES: Record<string, string[]> = {
  punjab: [
    'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 
    'Sialkot', 'Sargodha', 'Bahawalpur', 'Sheikhupura', 'Jhelum', 
    'Gujrat', 'Sahiwal', 'Kasur', 'Rahim Yar Khan'
  ],
  sindh: [
    'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah', 
    'Mirpur Khas', 'Thatta', 'Jacobabad'
  ],
  kpk: [
    'Peshawar', 'Mardan', 'Abbottabad', 'Swat', 'Charsadda', 
    'Nowshera', 'Dera Ismail Khan', 'Kohat', 'Haripur', 'Mansehra'
  ],
  balochistan: [
    'Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Chaman', 'Sibi'
  ],
  ict: [
    'Islamabad'
  ],
  ajk: [
    'Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli'
  ],
  gb: [
    'Gilgit', 'Skardu', 'Hunza', 'Diamer'
  ]
};
