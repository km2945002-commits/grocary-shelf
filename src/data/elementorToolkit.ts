/**
 * GROCARY SHELF — WordPress, WooCommerce & Elementor Production Toolkit
 * Complete copyable code snippets, Elementor HTML/CSS, functions.php hooks,
 * WooCommerce CSV product import template, and step-by-step setup documentation.
 */

export const ELEMENTOR_SNIPPETS = {
  promotionalBar: {
    title: '1. Elementor Promotional Announcement Bar (HTML/CSS)',
    description: 'Paste into an Elementor "HTML" widget at the top of the header template.',
    html: `<!-- GROCARY SHELF Promotional Announcement Bar -->
<div class="gs-announcement-bar">
  <div class="gs-container">
    <div class="gs-bar-content">
      <span class="gs-badge">RAMADAN & EID SPECIAL</span>
      <p class="gs-text">
        <strong>Free Nationwide Delivery</strong> across Pakistan on orders over Rs. 3,500 
        <span class="gs-sep">|</span> 
        Cash on Delivery Available 
        <span class="gs-sep">|</span>
        <a href="https://wa.me/923199774681" target="_blank" class="gs-wa-link">
          Direct WhatsApp Support: <strong>+92 319 9774681</strong>
        </a>
      </p>
    </div>
  </div>
</div>`,
    css: `<style>
.gs-announcement-bar {
  background-color: #075C3B;
  color: #FFFFFF;
  padding: 8px 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.gs-container {
  max-width: 1280px;
  margin: 0 auto;
}
.gs-bar-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  flex-wrap: wrap;
}
.gs-badge {
  background: #C5A059;
  color: #151515;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
}
.gs-text {
  margin: 0;
  color: #F1F7F1;
  font-size: 12.5px;
}
.gs-sep {
  opacity: 0.5;
  margin: 0 6px;
}
.gs-wa-link {
  color: #FFFFFF;
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 768px) {
  .gs-announcement-bar { font-size: 11.5px; padding: 6px 10px; }
  .gs-sep { display: none; }
}
</style>`
  },

  heroSection: {
    title: '2. Homepage Hero Banner (Elementor HTML & Scoped CSS)',
    description: 'Insert into the top container of your Elementor Homepage.',
    html: `<!-- GROCARY SHELF Homepage Hero Section -->
<section class="gs-hero-section">
  <div class="gs-hero-overlay"></div>
  <div class="gs-hero-container">
    <div class="gs-hero-content">
      <div class="gs-hero-kicker">
        <span class="gs-dot"></span>
        ELEGANT PAKISTANI COUTURE & HANDCRAFTED FOOTWEAR
      </div>
      <h1 class="gs-hero-title">
        Style for Every Generation.
      </h1>
      <p class="gs-hero-subtitle">
        Discover stylish clothing and footwear for men, women, and kids — all in one place. 
        Featuring authentic handcrafted Peshawari chappals and modern fabrics with Cash on Delivery across Pakistan.
      </p>
      
      <div class="gs-hero-actions">
        <a href="/shop/" class="gs-btn gs-btn-primary">Shop Now &rarr;</a>
        <a href="#collections" class="gs-btn gs-btn-secondary">Explore Collections</a>
      </div>

      <div class="gs-hero-stats">
        <div class="gs-stat-item">
          <strong>100%</strong>
          <span>Pure Leather & Cotton</span>
        </div>
        <div class="gs-stat-divider"></div>
        <div class="gs-stat-item">
          <strong>150+</strong>
          <span>Cities COD Delivery</span>
        </div>
        <div class="gs-stat-divider"></div>
        <div class="gs-stat-item">
          <strong>7-Day</strong>
          <span>Size Exchange Guarantee</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    css: `<style>
.gs-hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #075C3B 0%, #043622 60%, #151515 100%);
  color: #FFFFFF;
  padding: 60px 24px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.gs-hero-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  width: 100%;
}
.gs-hero-content {
  max-width: 680px;
}
.gs-hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C5A059;
  font-weight: 700;
  margin-bottom: 20px;
}
.gs-dot {
  width: 8px;
  height: 8px;
  background: #C5A059;
  border-radius: 50%;
  display: inline-block;
}
.gs-hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 56px;
  line-height: 1.1;
  font-weight: 700;
  margin: 0 0 20px 0;
  color: #FFFFFF;
}
.gs-hero-subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: #E2ECE5;
  margin: 0 0 32px 0;
}
.gs-hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.gs-btn {
  padding: 14px 32px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.25s ease;
  display: inline-block;
}
.gs-btn-primary {
  background: #FFFFFF;
  color: #075C3B;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.gs-btn-primary:hover {
  background: #F1F7F1;
  transform: translateY(-2px);
}
.gs-btn-secondary {
  background: transparent;
  color: #FFFFFF;
  border: 1.5px solid rgba(255,255,255,0.4);
}
.gs-btn-secondary:hover {
  border-color: #FFFFFF;
  background: rgba(255,255,255,0.1);
}
.gs-hero-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.15);
}
.gs-stat-item strong {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #C5A059;
}
.gs-stat-item span {
  font-size: 12px;
  color: #B2D1C1;
}
.gs-stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.2);
}
@media (max-width: 768px) {
  .gs-hero-title { font-size: 38px; }
  .gs-hero-subtitle { font-size: 15px; }
  .gs-hero-stats { flex-direction: column; align-items: flex-start; gap: 12px; }
  .gs-stat-divider { display: none; }
}
</style>`
  },

  peshawariShowcase: {
    title: '3. Handcrafted Peshawari Chappal Spotlight Section',
    description: 'Heritage craftsmanship showcase for traditional Kaptaan and Norozi chappal with pure leather guarantees.',
    html: `<!-- Peshawari Chappal Heritage Showcase -->
<section class="gs-peshawari-section">
  <div class="gs-container">
    <div class="gs-pesh-grid">
      <div class="gs-pesh-text">
        <span class="gs-tag">AUTHENTIC HERITAGE FOOTWEAR</span>
        <h2 class="gs-pesh-heading">Peshawari Chappal Master Craftsmanship</h2>
        <p class="gs-pesh-desc">
          Rooted in the historic bazaars of Khyber Pakhtunkhwa, every pair in our collection 
          is individually shaped by generational artisan cobblers. Made with 100% genuine full-grain 
          cowhide leather, durable aircraft tyre soles, and hand-waxed heavy thread stitching.
        </p>
        <ul class="gs-pesh-points">
          <li><strong>Original Tyre Double Sole:</strong> Maximum grip, superior arch elevation, and lifelong resilience.</li>
          <li><strong>Memory Foam Insole:</strong> Padded arch support prevents foot fatigue during weddings and everyday wear.</li>
          <li><strong>Pure Cow Leather:</strong> Breathable, natural leather that softens and conforms to your foot.</li>
        </ul>
        <div class="gs-pesh-cta">
          <a href="/product-category/peshawari-chappal/" class="gs-pesh-btn">View Full Chappal Collection &rarr;</a>
        </div>
      </div>
      <div class="gs-pesh-badge-card">
        <div class="gs-craft-box">
          <div class="gs-craft-icon">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <h3>The Royal Kaptaan Cut</h3>
          <p>Handcrafted in Peshawar & Charsadda</p>
          <div class="gs-price-tag">Starting from Rs. 4,850</div>
          <span class="gs-cod-badge">Cash on Delivery Across Pakistan</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    css: `<style>
.gs-peshawari-section {
  background: #F1F7F1;
  padding: 80px 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #151515;
}
.gs-pesh-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 48px;
  align-items: center;
}
.gs-tag {
  color: #075C3B;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}
.gs-pesh-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 38px;
  color: #075C3B;
  margin: 12px 0 18px 0;
}
.gs-pesh-desc {
  font-size: 16px;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 24px;
}
.gs-pesh-points {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
}
.gs-pesh-points li {
  margin-bottom: 12px;
  padding-left: 20px;
  position: relative;
  font-size: 14.5px;
  color: #1F2937;
}
.gs-pesh-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #075C3B;
  font-weight: bold;
}
.gs-pesh-btn {
  background: #075C3B;
  color: #FFFFFF;
  padding: 14px 28px;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.2s;
}
.gs-pesh-btn:hover { background: #05462D; }
.gs-craft-box {
  background: #FFFFFF;
  border: 2px solid #075C3B;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(7, 92, 59, 0.08);
}
.gs-craft-icon { color: #C5A059; font-size: 20px; margin-bottom: 8px; }
.gs-craft-box h3 { font-family: 'Playfair Display', serif; font-size: 24px; color: #151515; margin: 0 0 6px 0; }
.gs-craft-box p { color: #4B5563; font-size: 14px; margin-bottom: 20px; }
.gs-price-tag { font-size: 22px; font-weight: 800; color: #075C3B; margin-bottom: 16px; }
.gs-cod-badge { display: inline-block; background: #E9F4EE; color: #075C3B; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 20px; }
@media (max-width: 768px) {
  .gs-pesh-grid { grid-template-columns: 1fr; }
  .gs-pesh-heading { font-size: 28px; }
}
</style>`
  }
};

export const WOOCOMMERCE_PHP_SNIPPETS = `<?php
/**
 * GROCARY SHELF — WooCommerce Customizations for Pakistan & COD
 * Add these functions to your child theme's functions.php or via WPCode plugin.
 */

// 1. Set Pakistani Rupee (PKR) Currency Symbol Formatting
add_filter( 'woocommerce_currency_symbol', 'gs_custom_pkr_symbol', 10, 2 );
function gs_custom_pkr_symbol( $currency_symbol, $currency ) {
    if ( $currency === 'PKR' ) {
        $currency_symbol = 'Rs. ';
    }
    return $currency_symbol;
}

// 2. Add Pakistan Provinces and Major Cities to Checkout
add_filter( 'woocommerce_states', 'gs_pakistan_states' );
function gs_pakistan_states( $states ) {
    $states['PK'] = array(
        'PB' => 'Punjab',
        'SD' => 'Sindh',
        'KP' => 'Khyber Pakhtunkhwa',
        'BA' => 'Balochistan',
        'IS' => 'Islamabad Capital Territory',
        'AK' => 'Azad Kashmir',
        'GB' => 'Gilgit-Baltistan',
    );
    return $states;
}

// 3. Set Cash on Delivery (COD) as Default Payment Method
add_action( 'woocommerce_before_checkout_form', 'gs_set_default_payment_gateway' );
function gs_set_default_payment_gateway() {
    if ( WC()->session ) {
        WC()->session->set( 'chosen_payment_method', 'cod' );
    }
}

// 4. Validate Pakistani Mobile Phone Number (03xx-xxxxxxx)
add_action( 'woocommerce_checkout_process', 'gs_validate_pakistani_phone' );
function gs_validate_pakistani_phone() {
    $phone = sanitize_text_field( $_POST['billing_phone'] );
    // Normalize format
    $clean_phone = preg_replace( '/[^0-9]/', '', $phone );
    
    // Check if phone starts with 03 and has 11 digits (e.g. 03001234567 or 923001234567)
    $is_valid = preg_match( '/^(03[0-9]{9}|923[0-9]{9}|\+923[0-9]{9})$/', $clean_phone );
    if ( ! $is_valid ) {
        wc_add_notice( __( 'Please enter a valid Pakistani mobile number (e.g., 0300-1234567). Riders require this for Cash on Delivery coordination.', 'grocary-shelf' ), 'error' );
    }
}

// 5. Add "Order on WhatsApp" Button to Single Product Page
add_action( 'woocommerce_after_add_to_cart_button', 'gs_whatsapp_order_button' );
function gs_whatsapp_order_button() {
    global $product;
    $product_name = urlencode( $product->get_name() );
    $product_price = 'Rs. ' . number_format( $product->get_price() );
    $product_url = urlencode( get_permalink( $product->get_id() ) );
    $whatsapp_number = '923199774681'; // Client WhatsApp number
    
    $message = "Assalam-o-Alaikum GROCARY SHELF team, I want to order this product via Cash on Delivery:\n\n*Product:* {$product_name}\n*Price:* {$product_price}\n*Link:* {$product_url}";
    $wa_link = "https://wa.me/{$whatsapp_number}?text=" . $message;
    
    echo '<a href="' . esc_url( $wa_link ) . '" target="_blank" class="button gs-wa-order-btn" style="display:block;margin-top:10px;background:#25D366;color:#fff;text-align:center;padding:12px;font-weight:700;border-radius:4px;text-decoration:none;">📱 Quick Order via WhatsApp (COD)</a>';
}
`;

export const WOOCOMMERCE_CSV_IMPORT_TEMPLATE = `ID,Type,SKU,Name,Published,"Is featured?","Visibility in catalog","Short description",Description,"In stock?","Stock",Price,"Sale price","Categories","Tags","Images"
,simple,GS-MSH-001,"Tailored Supima Cotton Oxford Shirt",1,1,visible,"100% Supima cotton tailored shirt","A gentleman's staple engineered with 100% long-staple Supima cotton. Cut in a modern tailored silhouette.",1,14,4200,3450,"Men's Fashion > Shirts","Men, Shirts, Cotton, Oxford, Supima","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
,simple,GS-PESH-001,"Kaptaan Peshawari Chappal (Double Tyre Sole)",1,1,visible,"Authentic handcrafted Peshawar Kaptaan Chappal with double tyre sole","The iconic Pakistani Kaptaan Chappal, handmade by generational master craftsmen in Peshawar. 100% full-grain cowhide leather.",1,18,6500,5450,"Peshawari Chappal, Footwear","Peshawari Chappal, Kaptaan, Traditional, Leather, Tyre Sole","https://images.unsplash.com/photo-1549298916-b41d501d3772"
,simple,GS-PESH-002,"Charsadda Traditional Hand-Stitched Chappal",1,1,visible,"Pure leather Charsadda chappal with padded foam comfort","Renowned Charsadda craftsmanship with soft hand-milled leather upper and flexible tyre sole.",1,12,5800,4850,"Peshawari Chappal, Footwear","Charsadda, Peshawari, Traditional, Leather","https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
,simple,GS-WKN-001,"Hand-Embroidered Linen Pret Kurti",1,1,visible,"Pure slub linen kurti with delicate contrast embroidery","An elegant pret tunic crafted from pure breathable slub-linen. Adorned with delicate threadwork along neckline.",1,16,5200,4250,"Women's Fashion > Shirts","Women, Kurti, Linen, Pret, Embroidered","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b"
,simple,GS-MPN-001,"Comfort-Stretch Chino Trousers",1,1,visible,"Mid-rise stretch cotton chinos with tailored tapered leg","Essential everyday trousers crafted with 98% compact cotton twill and 2% elastane for unrestricted movement.",1,22,3200,3200,"Men's Fashion > Pants","Men, Chinos, Pants, Stretch Cotton","https://images.unsplash.com/photo-1624378439575-d8705ad7ae80"
,simple,GS-KID-001,"Junior Artisan Peshawari Chappal (Ages 4-12)",1,1,visible,"Comfortable lightweight pure leather Peshawari chappal for boys","Handcrafted traditional Peshawari Chappal scaled down for kids. Extra soft leather straps and light rubber sole.",1,17,3800,3200,"Kids' Fashion > Peshawari Chappal","Kids, Boys, Peshawari Chappal, Leather, Eid","https://images.unsplash.com/photo-1560769629-975ec94e6a86"
`;

export const SEO_SCHEMA_MARKUP = {
  organization: `{
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "GROCARY SHELF",
  "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  "url": "https://grocaryshelf.com",
  "telephone": "+923199774681",
  "email": "km2945002@gmail.com",
  "priceRange": "Rs. 2,000 - Rs. 15,000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Suhan",
    "addressLocality": "Islamabad",
    "addressRegion": "Islamabad Capital Territory",
    "postalCode": "44000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "31.5204",
    "longitude": "74.3587"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "22:00"
  },
  "paymentAccepted": "Cash on Delivery, Bank Transfer, EasyPaisa, JazzCash",
  "currenciesAccepted": "PKR"
}`,

  productExample: `{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Kaptaan Peshawari Chappal (Double Tyre Sole)",
  "image": [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772"
  ],
  "description": "Authentic handcrafted Peshawar Kaptaan Chappal with double tyre sole and pure cow leather.",
  "sku": "GS-PESH-001",
  "brand": {
    "@type": "Brand",
    "name": "GROCARY SHELF"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://grocaryshelf.com/product/kaptaan-peshawari-chappal/",
    "priceCurrency": "PKR",
    "price": "5450",
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "GROCARY SHELF"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "89"
  }
}`
};

export const WORDPRESS_SETUP_GUIDE = [
  {
    step: 'Step 1: Domain & Hosting Setup',
    details: 'Choose reliable NVMe SSD WordPress hosting (Hostinger, Namecheap, or Cloudways) with PHP 8.2+ and free SSL enabled.'
  },
  {
    step: 'Step 2: Theme Installation',
    details: 'Install "Astra", "Hello Elementor", or "GeneratePress" (fastest lightweight base themes with complete WooCommerce hooks).'
  },
  {
    step: 'Step 3: Core Plugins Installation',
    details: 'Install & activate: WooCommerce, Elementor (Free/Pro), Rank Math SEO, Variation Swatches for WooCommerce, Checkout Field Editor for WooCommerce, WPCode for custom PHP snippets.'
  },
  {
    step: 'Step 4: WooCommerce Pakistan Configuration',
    details: 'Set General Store Currency to "Pakistani Rupee (₨)", Selling Location to "Pakistan", Shipping Zone for Standard TCS/Leopards flat rate, and Enable "Cash on Delivery".'
  },
  {
    step: 'Step 5: Import Catalog & Template Deployment',
    details: 'Use WooCommerce > Products > Import to upload the provided CSV file with categories, sizes, and attributes. Import Elementor JSON templates or paste custom HTML/CSS widgets.'
  },
  {
    step: 'Step 6: Payment & Order Testing',
    details: 'Place a test order using Cash on Delivery with a Pakistani phone number (03xx-xxxxxxx) and verify order confirmation emails and SMS/WhatsApp notifications.'
  }
];
