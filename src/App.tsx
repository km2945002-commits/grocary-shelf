/**
 * GROCARY SHELF — Fashion for the Whole Family
 * Premium E-commerce Storefront & WordPress / WooCommerce Suite
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ElementorToolkitModal } from './components/ElementorToolkitModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MessageCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, toast } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#151515] font-sans antialiased selection:bg-[#075C3B] selection:text-white relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 border bg-neutral-900 text-white border-neutral-700">
          {toast.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Persistent WhatsApp Floating Concierge */}
      <a
        href="https://wa.me/923199774681?text=Assalam-o-Alaikum%20GROCARY%20SHELF%2C%20I%20have%20an%20order%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 group"
        aria-label="Direct WhatsApp Ordering Support"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-1">
          Order on WhatsApp
        </span>
      </a>

      {/* Main Header & Nav */}
      <Header />

      {/* Main Page Content Views */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'orders' && <OrderTrackingView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <QuickViewModal />
      <SizeGuideModal />
      <ElementorToolkitModal />
      <AdminDashboardModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
