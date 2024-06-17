"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../models/Product";

// Define the interface of the Cart state
interface State {
  user: { email: string; token: string; isAdmin: boolean } | null;
  cart: Product[];
  products: Product[];
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (Item: any) => void;
  removeFromCart: (Item: any) => void;
  clearCart: () => void;
  setProducts: (_products: Product[]) => void;
  setUser: (_data: any) => void;
  logOut: () => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  user: null,
  cart: [],
  products: [],
};

// Create the store with Zustand, combining the status interface and actions
export const useShoppingStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      clearCart() {
        set((state) => ({
          cart: [],
        }));
      },
      logOut() {
        set((state) => ({
          user: INITIAL_STATE.user,
          products: [],
          cart: [],
        }));
      },
      setUser(_data) {
        set((state) => ({
          user: _data,
        }));
      },
      user: INITIAL_STATE.user,
      products: INITIAL_STATE.products,
      cart: INITIAL_STATE.cart,
      setProducts(_products) {
        set((state) => ({
          products: _products,
        }));
      },
      addToCart: (product: Product) => {
        const _cart = get().cart;
        _cart.push(product);

        set((state) => ({
          cart: _cart,
        }));
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.productId !== product.productId
          ),
        }));
      },
    }),
    {
      name: "shopping-store-storage",
    }
  )
);
