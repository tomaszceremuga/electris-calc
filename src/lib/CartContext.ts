"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartElementType } from "./CartElementType";
import React from "react";
import { type GeneralInformationType } from "./GeneralInformationType";

interface CartType {
  generalInformation: GeneralInformationType;
  values: CartElementType[];
}

interface CartContextType {
  cartState: CartType;
  setCartState: React.Dispatch<React.SetStateAction<CartType>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, setCartState] = useState<CartType>({
    generalInformation: { name: "", company: "", email: "" },
    values: [],
  });

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
