"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import FloatingCartElement from "./FloatingCartElement";

interface CartItem {
  id: string;
  name: string;
  image: string;
  properties: { name: string; value: string }[];
  quantity: number;
}

const FloatingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      image: "/placeholder.svg?height=64&width=64",
      name: "ewqewqeqwewqwqewqewqweq",
      quantity: 2,
      properties: [
        {
          name: "adssadasdas",
          value: "adsasdas",
        },
        {
          name: "asdsa",
          value: "asdasda",
        },
      ],
    },
    {
      id: "2",
      image: "/placeholder.svg?height=64&width=64",
      name: "eqwewqeqweqwqeweq",
      quantity: 1,
      properties: [
        {
          name: "asdas",
          value: "asdasdasdasssssssssss",
        },
        {
          name: "asdavsfsdfs",
          value: "sfdfsdfsdfsd",
        },
      ],
    },
    {
      id: "3",
      image: "/placeholder.svg?height=64&width=64",
      name: "hdgfhdgfdgfhg",
      quantity: 1,
      properties: [
        {
          name: "dfhfdghdfgh",
          value: "dfhfdhfdhfgd",
        },
        {
          name: "dfhfdghfdhgfd",
          value: "fdhfgdfhdssssssss",
        },
      ],
    },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-card shadow-sm">
      <div className="rounded-t-lg border-b border-border bg-muted/50 p-4">
        <h2 className="flex items-center gap-2 font-medium text-card-foreground">
          <ShoppingCart size={18} />
          Koszyk{" "}
          <span className="text-sm text-muted-foreground">({totalItems})</span>
        </h2>
      </div>

      <div className="p-4">
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <FloatingCartElement
                key={item.id}
                image={item.image}
                name={item.name}
                quantity={item.quantity}
                properties={item.properties}
                onQuantityChange={(newQuantity) =>
                  handleQuantityChange(item.id, newQuantity)
                }
                onRemove={() => handleRemoveItem(item.id)}
                isLast={index === cartItems.length - 1}
              />
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-muted-foreground">
            Twój koszyk jest pusty
          </p>
        )}

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full">
            Pokaż koszyk
          </Button>
          <Button className="w-full">Przejdź do kasy</Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCart;
