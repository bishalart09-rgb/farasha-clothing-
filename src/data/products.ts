import { Product, ReelItem } from '../types';

import heroImg from '../assets/images/hero_farasha_editorial_1791224341219.jpg';
import sareeSigImg from '../assets/images/farasha_saree_signature_1791224358584.jpg';
import kurtiEditImg from '../assets/images/farasha_kurti_editorial_1791224370257.jpg';
import modestWearImg from '../assets/images/farasha_modest_wear_1791224381966.jpg';
import boutiqueImg from '../assets/images/farasha_boutique_dubai_1791224394344.jpg';
import zariSareeImg from '../assets/images/product_zari_saree_1791224420048.jpg';
import anarkaliImg from '../assets/images/product_anarkali_gown_1791224435854.jpg';
import modestKaftanImg from '../assets/images/product_modest_kaftan_1791224445892.jpg';
import chikankariImg from '../assets/images/product_chikankari_kurti_1791224457689.jpg';

export { heroImg, sareeSigImg, kurtiEditImg, modestWearImg, boutiqueImg, zariSareeImg, anarkaliImg, modestKaftanImg, chikankariImg };

// Official Farasha UAE WhatsApp Business Concierge & Orders Hotline
export const FARASHA_WHATSAPP_NUMBER = '971505016078';

export const PRODUCTS: Product[] = [
  {
    id: 'farasha-01',
    name: 'Al-Noor Champagne Zardozi Saree',
    category: 'SAREES',
    categorySlug: 'sarees',
    priceAed: 1450,
    compareAtPriceAed: 1750,
    primaryImage: sareeSigImg,
    images: [sareeSigImg, zariSareeImg],
    occasions: ['WEDDING GUEST', 'FESTIVE'],
    description: 'An ethereal creation woven from pure silk georgette in warm champagne ivory. Hand-embroidered with delicate zardozi threadwork, pearl clusters, and antique gold scalloped borders. Drapes with peerless fluidity for milestone celebrations in Dubai and beyond.',
    fabricDetails: 'Pure Mulberry Silk Georgette with handcrafted copper-gold Zari and fine seed pearl detailing. Comes with unstitched matching designer blouse piece.',
    sizeAndFit: 'Standard saree length 5.5 meters with 0.8 meter blouse fabric. Flowing drape suitable for all heights.',
    shippingInfo: 'Complimentary white-glove courier across UAE within 24-48 hours. Express GCC delivery within 3-4 business days.',
    returnsInfo: 'Boutique exchange within 7 days at our Dubai or Sharjah stores, or complimentary courier return pickup.',
    sizes: ['Free Size'],
    colors: [
      { name: 'Champagne Ivory', hex: '#EBE5D8' },
      { name: 'Antique Gold', hex: '#C5A880' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    sku: 'FARA-SAR-0101',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  },
  {
    id: 'farasha-02',
    name: 'Jumeirah Handloom Chikankari Kurti Set',
    category: 'KURTIS',
    categorySlug: 'kurtis',
    priceAed: 890,
    compareAtPriceAed: 1100,
    primaryImage: chikankariImg,
    secondaryImage: kurtiEditImg,
    images: [chikankariImg, kurtiEditImg],
    occasions: ['EVERYDAY ELEGANCE', 'FESTIVE'],
    description: 'Masterfully hand-embroidered Lucknowi Chikankari tunic paired with tailored cigarette pants and organza dupatta. Embellished with subtle real mukaish metallic accents that catch the soft Gulf daylight.',
    fabricDetails: '100% Breathable Fine Georgette with soft mulmul inner lining and artisanal cotton shadow-work.',
    sizeAndFit: 'Tailored feminine silhouette with side slits. Model is 176cm wearing size Small.',
    shippingInfo: 'Delivered in signature Farasha magnetic keepsake box. Next-day Dubai delivery available.',
    returnsInfo: 'Seamless 7-day returns or exchanges across all UAE outlets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Ivory', hex: '#FAF8F5' },
      { name: 'Pearl Sand', hex: '#E7DFD5' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    sku: 'FARA-KUR-0204',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  },
  {
    id: 'farasha-03',
    name: 'Aura Emerald Silk Modest Kaftan Gown',
    category: 'MODEST WEAR',
    categorySlug: 'modest-wear',
    priceAed: 1250,
    compareAtPriceAed: 1450,
    primaryImage: modestKaftanImg,
    secondaryImage: modestWearImg,
    images: [modestKaftanImg, modestWearImg],
    occasions: ['MODEST & SOPHISTICATED', 'PARTY'],
    description: 'A regal floor-sweeping modest silhouette crafted in fluid jewel-tone emerald silk crepe. Features hand-placed champagne crystal trimmings along the neckline and cuffs, with an optional inner sash for bespoke cinch.',
    fabricDetails: 'Heavyweight Silk Crepe de Chine with matte lustre and anti-crease drape. Dry clean only.',
    sizeAndFit: 'Modest relaxed fit. Available in length 56" and 58". Accommodates sizes XS to XL comfortably.',
    shippingInfo: 'Standard 24-48 hour delivery throughout Dubai, Sharjah, Abu Dhabi, and the Northern Emirates.',
    returnsInfo: 'Complimentary exchanges available at Dubai Mall area or Sharjah boutique.',
    sizes: ['54 (S)', '56 (M)', '58 (L)', '60 (XL)'],
    colors: [
      { name: 'Emerald Jewel', hex: '#1E4738' },
      { name: 'Midnight Onyx', hex: '#1A1A1A' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    sku: 'FARA-MOD-0312',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: false
    }
  },
  {
    id: 'farasha-04',
    name: 'Farasha Signature Rose Champagne Anarkali',
    category: 'PREMIUM COLLECTION',
    categorySlug: 'collections',
    priceAed: 1850,
    compareAtPriceAed: 2200,
    primaryImage: anarkaliImg,
    secondaryImage: heroImg,
    images: [anarkaliImg, heroImg],
    occasions: ['WEDDING GUEST', 'PARTY', 'FESTIVE'],
    description: 'An architectural 24-kali flared Anarkali ensemble rendered in delicate rose champagne raw silk. Graced with intricate gota patti border work, French knots, and accompanied by a featherlight embroidered tissue dupatta.',
    fabricDetails: 'Pure Chanderi Silk with Banarasi Tissue border and hand-dyed organza veil.',
    sizeAndFit: 'Structured bodice with dramatic flowing flare. Concealed side zipper. True to luxury size.',
    shippingInfo: 'Specially pressed and packaged in dust bag. Express GCC & Worldwide shipping available.',
    returnsInfo: 'Boutique exchange within 7 days. Made-to-measure alterations supported in-store.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Rose Champagne', hex: '#D8BBA8' },
      { name: 'Muted Gold', hex: '#C5A880' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    sku: 'FARA-COL-0408',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  },
  {
    id: 'farasha-05',
    name: 'Qasr Al-Bahar Royal Banarasi Saree',
    category: 'SAREES',
    categorySlug: 'sarees',
    priceAed: 1680,
    compareAtPriceAed: 1950,
    primaryImage: zariSareeImg,
    secondaryImage: sareeSigImg,
    images: [zariSareeImg, sareeSigImg],
    occasions: ['WEDDING GUEST', 'FESTIVE'],
    description: 'An ode to royal heritage, woven on traditional handlooms with real metallic gold brocade weft. Depicts intricate floral jaal motifs and regal kadiyal borders, celebrating timeless grace.',
    fabricDetails: 'Pure Katan Silk with certified Gold and Silver tested Zari weave.',
    sizeAndFit: 'Traditional 6.3m drape including contrast brocade blouse fabric piece.',
    shippingInfo: 'Ships within 24 hours. UAE orders: 0505016078. International orders: 00971507325758.',
    returnsInfo: '7-day boutique returns. Authenticity certificate included with purchase.',
    sizes: ['Free Size'],
    colors: [
      { name: 'Imperial Sapphire', hex: '#1C2E4A' },
      { name: 'Champagne Zari', hex: '#C8A97E' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    sku: 'FARA-SAR-0520',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  },
  {
    id: 'farasha-06',
    name: 'Al-Wasl Contemporary Embellished Kurti',
    category: 'KURTIS',
    categorySlug: 'kurtis',
    priceAed: 760,
    compareAtPriceAed: 920,
    primaryImage: kurtiEditImg,
    secondaryImage: chikankariImg,
    images: [kurtiEditImg, chikankariImg],
    occasions: ['EVERYDAY ELEGANCE', 'PARTY'],
    description: 'Modern fusion elegance at its finest. Clean architectural cut with statement asymmetric hemline, accented by subtle matte beadwork and metallic thread detailing at the mandarin collar.',
    fabricDetails: 'Premium Raw Silk blend with breathable cotton voile interior.',
    sizeAndFit: 'Straight contemporary silhouette. Side slits allow effortless movement.',
    shippingInfo: 'Free UAE delivery over 300 AED. Delivered in eco-luxury Farasha parcel.',
    returnsInfo: 'Easy return policy. Exchange sizes seamlessly at our Dubai or Sharjah stores.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Taupe', hex: '#C4B8A5' },
      { name: 'Warm Ivory', hex: '#F9F6F0' }
    ],
    isNewArrival: true,
    isBestSeller: false,
    sku: 'FARA-KUR-0615',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  },
  {
    id: 'farasha-07',
    name: 'Sharjah Heritage Pearl Kimono Abaya Dress',
    category: 'MODEST WEAR',
    categorySlug: 'modest-wear',
    priceAed: 1120,
    compareAtPriceAed: 1350,
    primaryImage: modestWearImg,
    secondaryImage: modestKaftanImg,
    images: [modestWearImg, modestKaftanImg],
    occasions: ['MODEST & SOPHISTICATED', 'EVERYDAY ELEGANCE'],
    description: 'Inspired by the cultural poetry of Sharjah and the Arabian Gulf. A minimalist open-front modest kimono dress embellished with genuine freshwater pearls on the cuffs and delicate concealed magnet closures.',
    fabricDetails: 'Imported Japanese Nida Silk with fluid drape, wrinkle-resistant and breathable in warm climates.',
    sizeAndFit: 'Modest length 56-58. Wide bell sleeves. Includes coordinating soft chiffon sheila wrap.',
    shippingInfo: 'Same-day courier dispatch across Sharjah and Dubai on orders before 2 PM.',
    returnsInfo: 'Hassle-free 7-day in-store or courier exchange.',
    sizes: ['54 (S)', '56 (M)', '58 (L)'],
    colors: [
      { name: 'Desert Dune', hex: '#C8BEAF' },
      { name: 'Charcoal Black', hex: '#212121' }
    ],
    isNewArrival: false,
    isBestSeller: true,
    sku: 'FARA-MOD-0719',
    inStock: true,
    outletAvailability: {
      dubai: false,
      sharjah: true
    }
  },
  {
    id: 'farasha-08',
    name: 'Farasha Sovereign Bridal Brocade Ensemble',
    category: 'PREMIUM COLLECTION',
    categorySlug: 'collections',
    priceAed: 2450,
    compareAtPriceAed: 2900,
    primaryImage: heroImg,
    secondaryImage: anarkaliImg,
    images: [heroImg, anarkaliImg, sareeSigImg],
    occasions: ['WEDDING GUEST', 'PARTY'],
    description: 'A masterpiece created for high-society weddings and grand evening galas. Woven with dual-tone antique gold and platinum threads, enriched with handset Swarvoski elements and fine cutdana embroidery.',
    fabricDetails: 'Handcrafted Heritage Tissue Brocade with pure Silk Organza dupatta and handcrafted tassels.',
    sizeAndFit: 'Tailored luxury fit with padded cups and side zipper closure. Fits true to size.',
    shippingInfo: 'Delivered in personal Farasha garment bag via boutique private courier.',
    returnsInfo: 'Exclusive concierge exchange within 7 days at our flagship boutiques.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gold Champagne', hex: '#D2B78D' },
      { name: 'Rosewater Glow', hex: '#DEC5B5' }
    ],
    isNewArrival: true,
    isBestSeller: true,
    sku: 'FARA-COL-0830',
    inStock: true,
    outletAvailability: {
      dubai: true,
      sharjah: true
    }
  }
];

export const CATEGORIES_DATA = [
  {
    title: 'KURTIS',
    subtitle: 'Elegant everyday & occasion kurtis',
    categorySlug: 'kurtis',
    image: kurtiEditImg,
    count: '24 Designs'
  },
  {
    title: 'SAREES',
    subtitle: 'Timeless elegance for every celebration',
    categorySlug: 'sarees',
    image: sareeSigImg,
    count: '32 Silhouettes'
  },
  {
    title: 'MODEST WEAR',
    subtitle: 'Sophisticated modest fashion',
    categorySlug: 'modest-wear',
    image: modestWearImg,
    count: '18 Creations'
  },
  {
    title: 'PREMIUM COLLECTION',
    subtitle: 'Statement pieces for special occasions',
    categorySlug: 'collections',
    image: anarkaliImg,
    count: '15 Exclusives'
  }
];

export const OCCASIONS_DATA: { name: string; type: import('../types').OccasionType; description: string; image: string }[] = [
  {
    name: 'WEDDING GUEST',
    type: 'WEDDING GUEST',
    description: 'Regal ensembles designed to captivate every grand reception.',
    image: anarkaliImg
  },
  {
    name: 'FESTIVE',
    type: 'FESTIVE',
    description: 'Rich silks and intricate handwork for Eid, Diwali, and seasonal joy.',
    image: zariSareeImg
  },
  {
    name: 'PARTY',
    type: 'PARTY',
    description: 'Sophisticated silhouettes with subtle shimmer for evening soirees.',
    image: heroImg
  },
  {
    name: 'EVERYDAY ELEGANCE',
    type: 'EVERYDAY ELEGANCE',
    description: 'Effortless luxury kurtis with breathability for daytime sophistication.',
    image: chikankariImg
  },
  {
    name: 'MODEST & SOPHISTICATED',
    type: 'MODEST & SOPHISTICATED',
    description: 'Graceful flowing lines with refined modern modest aesthetics.',
    image: modestKaftanImg
  }
];

export const BOUTIQUES_DATA = [
  {
    id: 'dubai',
    name: 'FARASHA CLOTHING – DUBAI',
    city: 'Dubai',
    area: 'Al Wasl Road / Jumeirah',
    address: 'Villa 14, Al Wasl Road, Jumeirah 1, Dubai, UAE',
    timings: 'Saturday – Thursday: 10:00 AM – 10:00 PM | Friday: 2:00 PM – 10:00 PM',
    phone: '0505016078',
    whatsapp: '971505016078',
    image: boutiqueImg,
    mapQuery: 'Dubai+Al+Wasl+Road+Farasha+Clothing',
    features: ['Private VIP Fitting Salons', 'Bespoke Alteration Suite', 'Valet Parking', 'Personal Stylist Booking']
  },
  {
    id: 'sharjah',
    name: 'FARASHA CLOTHING – SHARJAH',
    city: 'Sharjah',
    area: 'Al Majaz Waterfront',
    address: 'Showroom 4, Corniche Plaza, Al Majaz 2, Sharjah, UAE',
    timings: 'Saturday – Thursday: 10:00 AM – 10:00 PM | Friday: 2:00 PM – 10:00 PM',
    phone: '0505016078',
    whatsapp: '971505016078',
    image: boutiqueImg,
    mapQuery: 'Sharjah+Al+Majaz+Farasha+Clothing',
    features: ['Full Heritage Collection', 'Express In-Store Hemming', 'Complimentary Arabic Coffee & Dates', 'Direct Curbside Pickup']
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    handle: '@farashaclothing',
    caption: 'Draped in champagne grace at Dubai Opera. The Al-Noor Saree.',
    image: sareeSigImg
  },
  {
    id: 'ig-2',
    handle: '@farashaclothing',
    caption: 'Effortless afternoons along Jumeirah. Fine Chikankari craftsmanship.',
    image: chikankariImg
  },
  {
    id: 'ig-3',
    handle: '@farashaclothing',
    caption: 'Sublime modest silhouettes woven for Dubai evenings.',
    image: modestKaftanImg
  },
  {
    id: 'ig-4',
    handle: '@farashaclothing',
    caption: 'The Sovereign Collection. Timeless elegance redefined.',
    image: heroImg
  },
  {
    id: 'ig-5',
    handle: '@farashaclothing',
    caption: 'Artisanal Banarasi silk threads catching golden hour rays.',
    image: zariSareeImg
  },
  {
    id: 'ig-6',
    handle: '@farashaclothing',
    caption: 'Inside our Dubai flagship boutique. Pure tranquility and bespoke luxury.',
    image: boutiqueImg
  }
];

export const REELS_DATA: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'The Art of Saree Draping',
    caption: 'Draping our Al-Noor Champagne Zardozi Saree with modern Gulf poise.',
    views: '142K',
    likes: '12.4K',
    duration: '0:28',
    thumbnail: sareeSigImg,
    audioTrack: 'Farasha Atelier · Original Sound',
    videoUrl: '' // Configurable via future Admin Panel
  },
  {
    id: 'reel-2',
    title: 'Chikankari in Motion',
    caption: 'Handcrafted Lucknowi shadow-work catching the afternoon Dubai sun.',
    views: '98K',
    likes: '8.9K',
    duration: '0:19',
    thumbnail: kurtiEditImg,
    audioTrack: 'Jumeirah Breeze · Acoustic',
    videoUrl: '' // Configurable via future Admin Panel
  },
  {
    id: 'reel-3',
    title: 'Emerald Kaftan Silhouette',
    caption: 'Flowing heavyweight silk crepe crafted for evening galas and celebrations.',
    views: '215K',
    likes: '19.2K',
    duration: '0:34',
    thumbnail: modestWearImg,
    audioTrack: 'Oud & Strings · Dubai Nights',
    videoUrl: '' // Configurable via future Admin Panel
  },
  {
    id: 'reel-4',
    title: 'Royal Banarasi Gold Jaal',
    caption: 'Centuries-old kadiyal weave techniques on pure mulberry katan silk.',
    views: '176K',
    likes: '15.6K',
    duration: '0:24',
    thumbnail: zariSareeImg,
    audioTrack: 'Heritage Handloom · Classical',
    videoUrl: '' // Configurable via future Admin Panel
  },
  {
    id: 'reel-5',
    title: 'Rose Champagne Anarkali Flare',
    caption: '360° twirl showing dramatic handcrafted zardozi motifs and organza drape.',
    views: '110K',
    likes: '10.8K',
    duration: '0:22',
    thumbnail: anarkaliImg,
    audioTrack: 'Atelier Serenade · Instrumental',
    videoUrl: '' // Configurable via future Admin Panel
  }
];

