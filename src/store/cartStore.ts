import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, CartVendorGroup, Vendor } from '@/types';
import { vendors } from '@/data/mockData';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getGroupedByVendor: () => CartVendorGroup[];
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getGroupedByVendor: () => {
        const items = get().items;
        const vendorMap = new Map<string, CartVendorGroup>();

        items.forEach((item) => {
          const vendorId = item.product.vendorId;
          const vendor = vendors.find((v) => v.id === vendorId) || {
            id: vendorId,
            name: item.product.vendorName,
            rating: 4.5,
            reviewCount: 0,
            deliveryTime: '3-5 days',
          };

          if (!vendorMap.has(vendorId)) {
            vendorMap.set(vendorId, {
              vendor,
              items: [],
              subtotal: 0,
              deliveryFee: 49, // Base delivery fee
            });
          }

          const group = vendorMap.get(vendorId)!;
          group.items.push(item);
          group.subtotal += item.product.price * item.quantity;
        });

        // Free delivery above 999
        vendorMap.forEach((group) => {
          if (group.subtotal >= 999) {
            group.deliveryFee = 0;
          }
        });

        return Array.from(vendorMap.values());
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalAmount: () => {
        const groups = get().getGroupedByVendor();
        return groups.reduce(
          (total, group) => total + group.subtotal + group.deliveryFee,
          0
        );
      },
    }),
    {
      name: 'techhub-cart',
    }
  )
);
