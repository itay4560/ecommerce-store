"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../models/Product";

// Define the interface of the Cart state
interface State {
  data: {
    users: { email: string; token: string }[] | null;
    orders: any[];
    products: Product[];
  };
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  setData: (_data: any) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  data: {
    users: [],
    orders: [],
    products: [],
  },
};

// Create the store with Zustand, combining the status interface and actions
export const useAdminShoppingStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      setData(_data) {
        set((state) => ({
          data: _data,
        }));
      },
      data: INITIAL_STATE.data,
    }),
    {
      name: "shopping-admin-store-storage",
    }
  )
);
