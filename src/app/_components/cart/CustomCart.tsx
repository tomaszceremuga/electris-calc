"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ItemDetailsAlert } from "./ItemDetailsAlert";
import { useCartContext } from "~/lib/CartContext";

interface OrderResponse {
  message?: string;
  error?: string;
}

export default function CustomCart() {
  const { cartState, setCartState } = useCartContext();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const removeItem = (id: number) => {
    setCartState((prev) => ({
      ...prev,
      values: prev.values.filter((item) => item.id !== id),
    }));
  };

  const editItem = (id: number) => {
    console.log(`Edit item ${id}`);
  };

  const showDetails = (id: number) => {
    setSelectedItem(id);
    setIsAlertOpen(true);
  };

  const handleSendEmail = async () => {
    // Sprawdzamy czy koszyk nie jest pusty
    if (cartState.values.length === 0) {
      setSendStatus({
        message: "Koszyk jest pusty",
        isError: true,
      });
      return;
    }

    setIsSending(true);
    setSendStatus(null);

    try {
      // Wysyłamy całą strukturę cartState bez modyfikacji
      console.log("Wysyłane dane:", JSON.stringify({ cartItems: cartState }, null, 2))

      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartState,
        }),
      });

      const responseText = await response.text();
      console.log("Odpowiedź serwera (tekst):", responseText);

      let data: OrderResponse;
      try {
        data = JSON.parse(responseText) as OrderResponse;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        throw new Error(`Nieprawidłowa odpowiedź serwera: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(
          `Błąd API: ${response.status} - ${data.error ?? response.statusText}`,
        );
      }

      setSendStatus({
        message: data.message ?? "E-mail wysłany pomyślnie!",
        isError: false,
      });
    } catch (error) {
      console.error("Błąd podczas wysyłania e-maila:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setSendStatus({
        message: `Wystąpił błąd: ${errorMessage}`,
        isError: true,
      });
    } finally {
      setIsSending(false);
    }
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
              {cartState.values.length}{" "}
              {cartState.values.length === 1 ? "element" : "elementy"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {cartState.values.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              Twój koszyk jest pusty
            </div>
          ) : (
            <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
              {cartState.values.map((item) => (
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

          {cartState.values.length > 0 && (
            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              {sendStatus && (
                <div
                  className={`rounded p-2 text-sm ${sendStatus.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                >
                  {sendStatus.message}
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleSendEmail}
                disabled={isSending}
              >
                {isSending ? "Wysyłanie..." : "Przejdź do zamówienia"}
              </Button>
              <Button className="w-full" onClick={handleSendEmail} >
                debug
              </Button>

        
         
            </div>
          )}
        </CardContent>
      </Card>
      {isAlertOpen && selectedItem !== null && (
        <ItemDetailsAlert
          item={cartState.values.find((item) => item.id === selectedItem)}
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
