export type ProductCategory = 'KURTIS' | 'SAREES' | 'MODEST WEAR' | 'PREMIUM COLLECTION';

export type CategorySlug = 'all' | 'new-arrivals' | 'kurtis' | 'sarees' | 'modest-wear' | 'collections';

export type OccasionType = 'WEDDING GUEST' | 'FESTIVE' | 'PARTY' | 'EVERYDAY ELEGANCE' | 'MODEST & SOPHISTICATED';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categorySlug: 'kurtis' | 'sarees' | 'modest-wear' | 'collections';
  priceAed: number;
  compareAtPriceAed?: number;
  images: string[];
  primaryImage: string;
  secondaryImage?: string;
  occasions: OccasionType[];
  description: string;
  fabricDetails: string;
  sizeAndFit: string;
  shippingInfo: string;
  returnsInfo: string;
  sizes: string[];
  colors: ProductColor[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  sku: string;
  inStock: boolean;
  outletAvailability: {
    dubai: boolean;
    sharjah: boolean;
  };
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  emirateOrCountry: string;
  address: string;
  city: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: 'card' | 'apple_pay' | 'cod' | 'card_on_delivery';
  createdAt: string;
  estimatedDelivery: string;
}

export type ViewType = 
  | 'home' 
  | 'new-arrivals' 
  | 'kurtis' 
  | 'sarees' 
  | 'modest-wear' 
  | 'collections' 
  | 'about' 
  | 'cart' 
  | 'checkout' 
  | 'product-detail' 
  | 'wishlist' 
  | 'boutiques';

export interface ReelItem {
  id: string;
  title: string;
  caption: string;
  views: string;
  likes: string;
  duration: string;
  thumbnail: string;
  audioTrack: string;
  videoUrl?: string; // Structured for future Admin Panel video/Reel URL integration
}

