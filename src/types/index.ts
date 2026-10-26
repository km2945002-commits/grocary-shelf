/**
 * GROCARY SHELF — E-commerce & WordPress Types
 */

export type MainCategory = 'men' | 'women' | 'kids' | 'footwear' | 'peshawari';

export type SubCategory = 
  | 'shirts' 
  | 'pants' 
  | 'formal' 
  | 'casual' 
  | 'footwear' 
  | 'peshawari' 
  | 'girls' 
  | 'boys' 
  | 'traditional';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: MainCategory;
  subcategory: SubCategory;
  categoryLabel: string;
  price: number; // in PKR
  regularPrice: number; // in PKR
  onSale: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  fabric: string;
  fit: string;
  careInstructions: string;
  sizes: string[];
  colors: ProductColor[];
  sku: string;
  inStock: boolean;
  stockCount: number;
  origin?: string; // e.g., "Handcrafted in Charsadda, Pakistan"
}

export interface CartItem {
  id: string; // unique item id based on product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  address: string;
  postalCode?: string;
  orderNotes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  image: string;
  size: string;
  colorName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  courierName?: string;
  courierTrackingNo?: string;
  estimatedDeliveryDate?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName: string;
}
