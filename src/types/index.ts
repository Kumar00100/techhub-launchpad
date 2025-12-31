export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  vendorId: string;
  vendorName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  subcategory?: string;
  description?: string;
  specifications?: Record<string, string>;
  discount?: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  location?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartVendorGroup {
  vendor: Vendor;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  image?: string;
  services: string[];
  rating: number;
  reviewCount: number;
  priceRange: { min: number; max: number };
  distance: number;
  location: { lat: number; lng: number };
  availableSlots: string[];
  experience: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  image?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  vendor: Vendor;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  deliveryAddress: Address;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  productCount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'service' | 'promo' | 'system';
  read: boolean;
  createdAt: string;
}
