/**
 * GROCARY SHELF — Store State Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ProductColor, MainCategory } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  appliedCoupon: string | null;
  discountAmount: number;
  cartTotal: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  orders: Order[];
  placeOrder: (customer: Order['customer'], paymentMethod: 'cod' | 'bank_transfer') => Order;
  cancelOrder: (orderId: string) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: MainCategory | 'all';
  setSelectedCategory: (cat: MainCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  isSizeGuideOpen: boolean;
  sizeGuideCategory: string;
  openSizeGuide: (category?: string) => void;
  closeSizeGuide: () => void;

  latestOrder: Order | null;
  isOrderConfirmOpen: boolean;
  setIsOrderConfirmOpen: (isOpen: boolean) => void;

  isToolkitOpen: boolean;
  setIsToolkitOpen: (isOpen: boolean) => void;

  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  formatPKR: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  
  // Persisted cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gs_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persisted wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gs_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persisted orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gs_orders');
      if (saved) return JSON.parse(saved);
      // Sample realistic initial confirmed order for demo tracking
      return [
        {
          id: 'ord-sample-1',
          orderNumber: 'GS-89241',
          date: 'Yesterday at 3:45 PM',
          customer: {
            fullName: 'Zainab Qureshi',
            phone: '0321-4567890',
            email: 'zainab.q@gmail.com',
            province: 'Punjab',
            city: 'Lahore',
            address: 'House # 42, Sector Y, Phase 3, DHA',
            postalCode: '54792',
            orderNotes: 'Please call before arriving.'
          },
          items: [
            {
              productId: 'peshawari-kaptaan-double-sole',
              productName: 'Kaptaan Peshawari Chappal (Double Tyre Sole)',
              image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
              size: '9',
              colorName: 'Mustard Tan',
              price: 5450,
              quantity: 1
            }
          ],
          subtotal: 5450,
          shippingFee: 0,
          discount: 0,
          total: 5450,
          paymentMethod: 'cod',
          status: 'Shipped',
          courierName: 'TCS Express Pakistan',
          courierTrackingNo: 'TCS-774928104',
          estimatedDeliveryDate: 'Tomorrow by 5:00 PM'
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState('men');
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isOrderConfirmOpen, setIsOrderConfirmOpen] = useState(false);
  const [isToolkitOpen, setIsToolkitOpen] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gs_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const formatPKR = (amount: number): string => {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  };

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.name}`.toLowerCase().replace(/\s+/g, '-');
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });
    showToast(`Added "${product.name}" (${size}) to your cart!`);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const freeShippingThreshold = 3500;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GROCARY25') {
      setAppliedCoupon('GROCARY25');
      showToast('Coupon GROCARY25 applied! 25% discount activated.', 'success');
      return { success: true, message: '25% discount applied successfully!' };
    }
    if (clean === 'WELCOME10') {
      setAppliedCoupon('WELCOME10');
      showToast('Coupon WELCOME10 applied! 10% discount activated.', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try "GROCARY25" or "WELCOME10"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  let discountAmount = 0;
  if (appliedCoupon === 'GROCARY25') {
    discountAmount = Math.round(cartSubtotal * 0.25);
  } else if (appliedCoupon === 'WELCOME10') {
    discountAmount = Math.round(cartSubtotal * 0.10);
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (customer: Order['customer'], paymentMethod: 'cod' | 'bank_transfer') => {
    const randNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `GS-${randNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        image: c.product.images[0],
        size: c.selectedSize,
        colorName: c.selectedColor.name,
        price: c.product.price,
        quantity: c.quantity
      })),
      subtotal: cartSubtotal,
      shippingFee,
      discount: discountAmount,
      couponCode: appliedCoupon || undefined,
      total: cartTotal,
      paymentMethod,
      status: 'Confirmed',
      courierName: 'TCS Express Pakistan',
      courierTrackingNo: `TCS-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDeliveryDate: '2-3 Business Days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderConfirmOpen(true);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Order cancelled', 'info');
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openSizeGuide = (category?: string) => {
    if (category) setSizeGuideCategory(category);
    setIsSizeGuideOpen(true);
  };
  const closeSizeGuide = () => setIsSizeGuideOpen(false);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        freeShippingThreshold,
        appliedCoupon,
        discountAmount,
        cartTotal,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        cancelOrder,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSizeGuideOpen,
        sizeGuideCategory,
        openSizeGuide,
        closeSizeGuide,
        latestOrder,
        isOrderConfirmOpen,
        setIsOrderConfirmOpen,
        isToolkitOpen,
        setIsToolkitOpen,
        toast,
        showToast,
        formatPKR
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
