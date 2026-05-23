import { create } from 'zustand';
import { Product } from '@/types/product.type';

interface CartItem extends Product {
  cartQuantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(
        (item) => item.ProductId === product.ProductId,
      );

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.ProductId === product.ProductId
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, cartQuantity: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.ProductId !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.ProductId === id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item,
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.ProductId === id
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item,
        )
        // Optional feature: automatically removes the item from the cart if quantity hits 0
        .filter((item) => item.cartQuantity > 0),
    })),
}));