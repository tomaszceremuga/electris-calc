"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

interface CartContextProps {
  cartItems: any[]; // Replace 'any' with your actual cart item type
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Initialize with an empty array

  const value: CartContextProps = {
    cartItems,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
