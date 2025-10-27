import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  caseId: string;
  name: string;
  price: number;
  imgUrl: string;
  color: string;
  quantity: number;
}
interface CartStore {
  cartItems: CartItem[];
  addToCart: (cartItems: CartItem) => void;
  minusCartItem: (id: string) => void;
  plusCartItem: (id: string) => void;
  removeCartItem: (id: string) => void;
  clearCartItems: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        cartItems: [],

        addToCart: (cartItems) => set((state) => ({ cartItems: [...state.cartItems, cartItems] })),
        removeCartItem: (id) =>
          set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
          })),
        plusCartItem: (id) =>
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })),
        minusCartItem: (id) =>
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  }
                : item,
            ),
          })),
        clearCartItems: () => set({ cartItems: [] }),
      }),

      {
        name: 'cart-storage',
      },
    ),
    { name: 'сartStore' },
  ),
);
