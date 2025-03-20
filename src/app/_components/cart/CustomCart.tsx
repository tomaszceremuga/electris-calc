"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ItemDetailsAlert } from "./ItemDetailsAlert";
import { CartProvider, useCartContext } from "~/lib/CartContext";

export type CartItemType = {
  id: number;
  fields: FieldType[];
};

export type FieldType = {
  name: string;
  value: string;
  color: string;
};

function CustomCartTemplate() {
  const { cartState, setCartState } = useCartContext();
  const [counter, setCounter] = useState(0);

  // Currently selected item for details dialog
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const removeItem = (id: number) => {
    setCartState(cartState.filter((item) => item.id !== id));
  };

  // This function would be implemented later
  const editItem = (id: number) => {
    console.log(`Edit item ${id}`);
  };

  // Show details in alert
  const showDetails = (id: number) => {
    setSelectedItem(id);
    setIsAlertOpen(true);
  };

  useEffect(() => {
    console.log("Cart state updated:", cartState);
  }, [cartState]);

  console.log("render komponentu");
  console.log(cartState);
  return (
    <div className="sticky h-min w-full max-w-4xl self-start bg-card lg:top-[105px] lg:max-w-sm lg:rounded-md lg:border">
      <Card className="border-none">
        <CardHeader className="pb-3">
          <p>{counter}</p>
          <Button
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            qweqwe
          </Button>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <ShoppingCart className="h-5 w-5" />
              Koszyk
            </CardTitle>
            <Badge variant="outline" className="px-3">
              {cartState.length}{" "}
              {cartState.length === 1 ? "element" : "elementy"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {cartState.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              Twój koszyk jest pusty
            </div>
          ) : (
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
              {cartState.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onEdit={editItem}
                  onRemove={removeItem}
                  onShowDetails={showDetails}
                />
              ))}
            </div>
          )}

          {cartState.length > 0 && (
            <div className="mt-4 flex justify-end border-t pt-4">
              <Button className="w-full sm:w-auto">
                Przejdź do zamówienia
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert for showing all details */}
      {isAlertOpen && selectedItem !== null && (
        <ItemDetailsAlert
          item={cartState.find((item) => item.id === selectedItem)}
          onClose={() => setIsAlertOpen(false)}
          onEdit={() => {
            editItem(selectedItem);
            setIsAlertOpen(false);
          }}
        />
      )}
      <pre className="rounded-md bg-purple-300 p-2">
        {JSON.stringify(cartState, null, 2)}
      </pre>
    </div>
  );
}
export default function SummarySection() {
  return (
    <CartProvider>
      <CustomCartTemplate />
    </CartProvider>
  );
}
