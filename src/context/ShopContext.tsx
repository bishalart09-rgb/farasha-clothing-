import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ViewType, CategorySlug, OccasionType, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  // Navigation & Views
  activeView: ViewType;
  selectedProduct: Product | null;
  selectedCategoryFilter: CategorySlug;
  selectedOccasionFilter: OccasionType | null;
  navigateTo: (view: ViewType, product?: Product, categoryFilter?: CategorySlug, occasionFilter?: OccasionType | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalAed: number;
  shippingAed: number;
  freeShippingThresholdAed: number;
  totalAed: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistProducts: Product[];

  // Quick View & Modals
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  contactBoutiqueId: string;
  openContactModal: (boutiqueId?: string) => void;

  // Currency
  currency: 'AED' | 'USD' | 'SAR' | 'EUR';
  setCurrency: (c: 'AED' | 'USD' | 'SAR' | 'EUR') => void;
  formatPrice: (amountInAed: number) => string;

  // Orders
  latestOrder: OrderDetails | null;
  setLatestOrder: (order: OrderDetails | null) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES = {
  AED: { rate: 1, symbol: 'AED', decimals: 0 },
  USD: { rate: 0.272, symbol: '$', decimals: 0 },
  SAR: { rate: 1.02, symbol: 'SAR', decimals: 0 },
  EUR: { rate: 0.25, symbol: '€', decimals: 0 }
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategorySlug>('all');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<OccasionType | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('farasha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('farasha_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactBoutiqueId, setContactBoutiqueId] = useState('dubai');

  // Currency
  const [currency, setCurrency] = useState<'AED' | 'USD' | 'SAR' | 'EUR'>('AED');

  // Orders
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('farasha_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('farasha_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const navigateTo = (
    view: ViewType, 
    product?: Product, 
    categoryFilter?: CategorySlug, 
    occasionFilter?: OccasionType | null
  ) => {
    if (product) setSelectedProduct(product);
    if (categoryFilter !== undefined) setSelectedCategoryFilter(categoryFilter);
    if (occasionFilter !== undefined) setSelectedOccasionFilter(occasionFilter);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, selectedSize: string, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [...prev, {
        product,
        selectedSize,
        selectedColor: selectedColor || product.colors[0]?.name,
        quantity
      }];
    });

    showToast(`Added "${product.name}" (${selectedSize}) to your bag`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, selectedSize: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(`Saved "${product?.name || 'item'}" to your wishlist`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openContactModal = (boutiqueId = 'dubai') => {
    setContactBoutiqueId(boutiqueId);
    setIsContactModalOpen(true);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalAed = cart.reduce((acc, item) => acc + (item.product.priceAed * item.quantity), 0);
  const freeShippingThresholdAed = 300;
  const shippingAed = subtotalAed === 0 ? 0 : subtotalAed >= freeShippingThresholdAed ? 0 : 25;
  const totalAed = subtotalAed + shippingAed;

  const formatPrice = (amountInAed: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInAed * config.rate;
    if (currency === 'AED') {
      return `${Math.round(converted).toLocaleString('en-US')} AED`;
    }
    if (currency === 'USD') {
      return `$${Math.round(converted).toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      return `€${Math.round(converted).toLocaleString('en-US')}`;
    }
    return `${Math.round(converted).toLocaleString('en-US')} SAR`;
  };

  return (
    <ShopContext.Provider value={{
      activeView,
      selectedProduct,
      selectedCategoryFilter,
      selectedOccasionFilter,
      navigateTo,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      subtotalAed,
      shippingAed,
      freeShippingThresholdAed,
      totalAed,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistProducts,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      isSizeGuideOpen,
      setIsSizeGuideOpen,
      isContactModalOpen,
      setIsContactModalOpen,
      contactBoutiqueId,
      openContactModal,
      currency,
      setCurrency,
      formatPrice,
      latestOrder,
      setLatestOrder,
      toastMessage,
      showToast
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
