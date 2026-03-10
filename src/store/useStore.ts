import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
  isResale?: boolean;
}

interface WishlistItem {
  id: string;
  name?: string;
  price?: number;
  image?: string;
}

interface AppState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;

  /* wishlist helpers */
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      addToCart: (item) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id && i.size === item.size);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        });
      },
      removeFromCart: (id, size) => {
        set((state) => ({
          cart: state.cart.filter((i) => !(i.id === id && i.size === size)),
        }));
      },
      updateQuantity: (id, size, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((i) => !(i.id === id && i.size === size)),
            };
          }
          return {
            cart: state.cart.map((i) =>
              i.id === id && i.size === size ? { ...i, quantity } : i
            ),
          };
        });
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      /* wishlist implementation */
      addToWishlist: (item) => {
        set((state) => {
          if (state.wishlist.find((w) => w.id === item.id)) return {};
          return { wishlist: [...state.wishlist, item] };
        });
      },
      removeFromWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((w) => w.id !== id),
        }));
      },
      isInWishlist: (id) => {
        return !!get().wishlist.find((w) => w.id === id);
      },
    }),
    {
      name: 'ai-fashion-storage',
    }
  )
);
