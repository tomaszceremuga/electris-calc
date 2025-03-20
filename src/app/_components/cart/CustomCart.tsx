"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ItemDetailsAlert } from "./ItemDetailsAlert";
import { useCartContext } from "~/lib/CartContext";

export type CartItemType = {
  id: number;
  fields: FieldType[];
};

export type FieldType = {
  name: string;
  value: string;
  color: string;
};

export default function CustomCart() {
  const { cartState, setCartState } = useCartContext();

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const removeItem = (id: number) => {
    setCartState(cartState.filter((item) => item.id !== id));
  };

  const editItem = (id: number) => {
    console.log(`Edit item ${id}`);
  };

  const showDetails = (id: number) => {
    setSelectedItem(id);
    setIsAlertOpen(true);
  };

  return (
    <div className="sticky h-min w-full max-w-4xl self-start bg-card lg:top-[105px] lg:max-w-sm lg:rounded-md lg:border">
      <Card className="border-none">
        <CardHeader className="pb-3">
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
              <Button className="w-full">Przejdź do zamówienia</Button>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
}
