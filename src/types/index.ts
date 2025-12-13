export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: 'phones' | 'laptops' | 'accessories';
  brand: string;
  condition: 'excellent' | 'good' | 'fair';
  images: string[];
  specs: Record<string, string>;
  seller: Seller;
  rating: number;
  reviewCount: number;
  stock: number;
  qualityScore: number;
  createdAt: string;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  joinedDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  total: number;
  shippingAddress: Address;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export type CategoryType = 'phones' | 'laptops' | 'accessories' | 'all';
