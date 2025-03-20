"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartElementType } from "./CartElementType";
import React from "react";

interface CartContextType {
  cartState: CartElementType[];
  setCartState: React.Dispatch<React.SetStateAction<CartElementType[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, setCartState] = useState<CartElementType[]>([]);

  const contextValue: CartContextType = {
    cartState,
    setCartState,
  };

  return React.createElement(
    CartContext.Provider,
    { value: contextValue },
    children,
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
