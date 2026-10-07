import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { CategorySection } from './components/CategorySection';
import { FeaturedSignatureSection } from './components/FeaturedSignatureSection';
import { ShopByOccasion } from './components/ShopByOccasion';
import { MostLovedSection } from './components/MostLovedSection';
import { AboutStorySection } from './components/AboutStorySection';
import { BoutiquesSection } from './components/BoutiquesSection';
import { InternationalOrdersSection } from './components/InternationalOrdersSection';
import { InstagramSection } from './components/InstagramSection';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { StatisticsSection } from './components/StatisticsSection';
import { Footer } from './components/Footer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { WishlistView } from './components/WishlistView';
import { CatalogView } from './components/CatalogView';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { StoreContactModal } from './components/StoreContactModal';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage } = useShop();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistView />;
      case 'new-arrivals':
      case 'kurtis':
      case 'sarees':
      case 'modest-wear':
      case 'collections':
        return <CatalogView />;
      case 'about':
        return (
          <>
            <AboutStorySection />
            <StatisticsSection />
            <BoutiquesSection />
            <InternationalOrdersSection />
          </>
        );
      case 'boutiques':
        return (
          <>
            <BoutiquesSection />
            <StatisticsSection />
            <AboutStorySection />
          </>
        );
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <TrustSection />
            <NewArrivalsSection />
            <CategorySection />
            <FeaturedSignatureSection />
            <ShopByOccasion />
            <MostLovedSection />
            <AboutStorySection />
            <StatisticsSection />
            <BoutiquesSection />
            <InternationalOrdersSection />
            <InstagramReelsSection />
            <InstagramSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#171717] selection:bg-[#C5A880]/20 selection:text-[#171717]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171717] text-white px-5 py-3.5 shadow-2xl border-l-3 border-[#C5A880] flex items-center gap-2.5 text-xs font-medium tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Page Body with Raise Up Transition */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full"
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <SizeGuideModal />
      <StoreContactModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
