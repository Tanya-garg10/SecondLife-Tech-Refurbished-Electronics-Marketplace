import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, WishlistItem, Product } from '@/types';

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find(item => item.product.id === product.id)) {
          set({
            wishlist: [...wishlist, { product, addedAt: new Date().toISOString() }],
          });
        }
      },
      
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter(item => item.product.id !== productId),
        });
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.product.id === productId);
      },
      
      isInCart: (productId) => {
        return get().cart.some(item => item.product.id === productId);
      },
      
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'secondlife-store',
    }
  )
);
