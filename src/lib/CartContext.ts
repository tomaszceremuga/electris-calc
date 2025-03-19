// "use client";

// import { createContext, useContext, useState, type ReactNode } from "react";
// import type { cartElementType } from "./CartElementType";
// import React from "react";

// // Tworzymy kontekst z domyślną wartością `null`
// interface CartContextType {
//   cartState:  [];
//   setCartState: React.Dispatch<React.SetStateAction<[]>>;
// }

// const CartContext = createContext<CartContextType | null>(null);

// // Tworzymy dostawcę kontekstu (provider)
// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cartState, setCartState] = useState<[]>([]);

//   const contextValue: CartContextType = {
//     cartState,
//     setCartState,
//   };

//   return React.createElement(
//     CartContext.Provider,
//     { value: contextValue },
//     children,
//   );
// }

// // Tworzymy hook do używania kontekstu
// export function useCartContext() {
//   const context = useContext(CartContext);
//   return context;
// }
"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { cartElementType } from "./CartElementType"
import React from "react"

// Tworzymy kontekst z domyślną wartością `null`
interface CartContextType {
  cartState: cartElementType[]
  setCartState: React.Dispatch<React.SetStateAction<cartElementType[]>>
}

const CartContext = createContext<CartContextType | null>(null)

// Tworzymy dostawcę kontekstu (provider)
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartState, setCartState] = useState<cartElementType[]>([])

  const contextValue: CartContextType = {
    cartState,
    setCartState,
  }

  return React.createElement(CartContext.Provider, { value: contextValue }, children)
}

// Tworzymy hook do używania kontekstu
export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}

