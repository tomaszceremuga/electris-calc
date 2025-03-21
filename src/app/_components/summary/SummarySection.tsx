"use client";

import DeliveryOptions from "./DeliveryOptions";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartContext } from "~/lib/CartContext";
import { useFormContext } from "~/lib/FormContext";

export default function SummarySection() {
  const { setCartState } = useCartContext();
  const { formCurrentState, formDataToGenerate } = useFormContext();

  return (
    <div className="grid gap-6 px-5 lg:grid-cols-2">
      <div className="p-1">
        <DeliveryOptions />
      </div>

      <div className="space-y-6 p-1">
        <div>
          <h3 className="text-xl font-semibold">Podsumowanie zamówienia</h3>
          <p className="text-sm text-muted-foreground">
            Sprawdź szczegóły przed złożeniem zamówienia
          </p>
        </div>

        <div className="space-y-4 rounded-lg bg-accent/50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Ilość elementów:</p>
            <span className="font-medium">0</span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-muted-foreground">Wartość produktów:</p>
            <span className="font-medium">0,00 zł</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Koszt dostawy:</p>
            <span className="font-medium">19,99 zł</span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="font-medium">Razem:</p>
            <span className="text-xl font-bold">19,99 zł</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          <sup className="font-medium">*</sup>W cenę wliczony jest podatek VAT
        </p>

        <Button
          className="w-full"
          size="lg"
          onClick={() => {
            setCartState((prev) => [
              ...prev,
              {
                id: Date.now(),
                filledForm: formCurrentState,
                formDataToGenerate: formDataToGenerate,
              },
            ]);
          }}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Dodaj do zamówienia
        </Button>
      </div>
    </div>
  );
}
