"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import FloatingCartElement from "./FloatingCartElement";
import { CartProvider, useCartContext } from "~/lib/CartContext";

interface CartItem {
  id: string;
  name: string;
  image: string;
  properties: { name: string; value: string }[];
  quantity: number;
}
interface ResponseData {
  message: string; // Adjust according to the structure of your response data
}
const FloatingCartTemplate = () => {
   const { cartState } = useCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      "id": "1",
      "image": "/placeholder.svg?height=64&width=64",
      "name": "Jakiś produkt",
      "quantity": 2,
      "properties": [
        {
          "name": "Numer seryjny",
          "value": "213213"
        },
        {
          "name": "Jednostka miary",
          "value": "mm"
        },
        {
          "name": "Materiał główny",
          "value": "Stal nierdzewna"
        },
        {
          "name": "Materiał dodatkowy",
          "value": "Aluminium 5052"
        },
        {
          "name": "Kolor",
          "value": "Srebrno-biały"
        },
        {
          "name": "Grubość",
          "value": "1.0mm"
        },
        {
          "name": "Powierzchnia",
          "value": "surface;anodized;anodized-simple;purple"
        },
        {
          "name": "Pusty parametr",
          "value": ""
        },
        {
          "name": "Czy jest wodoodporny?",
          "value": "Tak"
        },
        {
          "name": "Czy jest ogniotrwały?",
          "value": "Tak"
        },
        {
          "name": "Tolerancje",
          "value": "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)"
        },
        {
          "name": "Czy wymaga certyfikatu?",
          "value": "Tak"
        },
        {
          "name": "Metoda znakowania",
          "value": "Grawerowanie laserowe"
        },
        {
          "name": "Testy jakości",
          "value": "Testy montażowe"
        },
        {
          "name": "Opcja premium",
          "value": "Premium (dodatkowe opłaty)"
        },
        {
          "name": "Rodzaj inspekcji",
          "value": "Standardowa inspekcja (brak raportu)"
        },
        {
          "name": "Zastosowanie",
          "value": "Sprzęt biurowy i akcesoria"
        },
        {
          "name": "Kod produktu",
          "value": "ewqeqwe"
        }
      ]
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

  const handleProceedToCheckout = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        alert('Wystąpił błąd przy wysyłaniu e-maila');
        return;
      }
      console.log("connection is OK")
      // Try parsing the JSON response
      const data: ResponseData = await response.json() as ResponseData;
  
      if (data.message) {
        alert(data.message);
      } else {
        alert('Wystąpił błąd przy wysyłaniu e-maila');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd przy wysyłaniu e-maila');
    }
  };
  



  return (
    <div className="sticky lg:top-[105px] h-min w-full max-w-4xl lg:max-w-sm  self-start  bg-card  lg:rounded-md lg:border">
      <div className="lg:rounded-t-lg lg:border-b lg:border-border p-4">
        <h2 className="flex items-center gap-2 font-medium text-card-foreground">
          <ShoppingCart size={18} />
          Koszyk{" "}
          <span className="text-sm text-muted-foreground">({totalItems})</span>
        </h2>
      </div>

      <div className="lg:p-4 px-4">
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
          <Button className="w-full"  onClick={handleProceedToCheckout}>Przejdź do kasy</Button>
        </div>
      </div>

      <pre className="rounded-md bg-purple-300 p-2">{JSON.stringify(cartState, null, 2)}</pre>

    </div>
  );
};

export default function FloatingCart() {

  return (
    <CartProvider>
      <FloatingCartTemplate />
    </CartProvider>
  );
}
