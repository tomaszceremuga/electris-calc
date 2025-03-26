"use client";

import { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import { Button } from "@/components/ui/button";
import { useFormContext } from "~/lib/FormContext";
import type { GeneralInformationType } from "~/lib/GeneralInformationType";
import { calculatePrice } from "~/lib/calculation";

interface SummarySectionProps {
  generalInformation: GeneralInformationType;
}

interface PriceInfo {
  totalPrice: number;
  deliveryDate: number;
  unitPrice: number;
}

interface OrderResponse {
  message?: string;
  error?: string;
}

export default function SummarySection({
  generalInformation,
}: SummarySectionProps) {
  // const { setCartState } = useCartContext();
  const { formCurrentState, formDataToGenerate } = useFormContext();
  const { filledForm } = formCurrentState; // Pobieramy tylko filledForm
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSending, setIsSending] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sendStatus, setSendStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const [priceInfo, setPriceInfo] = useState<PriceInfo>({
    totalPrice: 0,
    deliveryDate: 14,
    unitPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState("exw");

  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      if (!filledForm || !formDataToGenerate) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await calculatePrice(filledForm, formDataToGenerate);
        if (isMounted) {
          setPriceInfo(result);
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchPrice();

    return () => {
      isMounted = false;
    };
  }, [filledForm, formDataToGenerate]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getQuantity = (): number | string => {
    const value = filledForm.values.find((v) => v.id === 1)?.value;
    return typeof value === "string" || typeof value === "number" ? value : 0;
  };


  const handleSendEmail = async () => {
    if (formCurrentState.filledForm.values.length === 0) {
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
      // console.log("Wysyłane dane:", JSON.stringify({ cartItems: cartState }, null, 2))
      console.log('Cart state',formCurrentState)
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: formCurrentState,
          generalInformation: generalInformation,
          formDataToGenerate:formDataToGenerate
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
    <div className="grid gap-6 px-5 lg:grid-cols-2">
      <div className="p-1">
        <DeliveryOptions onOptionChange={setDeliveryOption} />
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
            <span className="font-medium">
              {isLoading ? "Obliczanie..." : getQuantity()}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="text-muted-foreground">Wartość produktów:</p>
            <span className="font-medium">
              {isLoading ? "Obliczanie..." : formatPrice(priceInfo.totalPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Koszt dostawy:</p>
            <span className="font-medium">
              {deliveryOption === "dap" ? "19,99 zł" : "0,00 zł"}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="font-medium">Razem:</p>
            <span className="text-xl font-bold">
              {isLoading
                ? "Obliczanie..."
                : formatPrice(
                    priceInfo.totalPrice +
                      (deliveryOption === "dap" ? 19.99 : 0),
                  )}
            </span>
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                {deliveryOption === "dap"
                  ? "Przewidywany czas dostawy:"
                  : "Czas odbioru:"}
              </p>
              <span className="font-medium">
                {deliveryOption === "dap"
                  ? `${priceInfo.deliveryDate} dni`
                  : "Do 14 dni"}
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          <sup className="font-medium">*</sup>W cenę wliczony jest podatek VAT
        </p>

        <Button
          className="w-full"
          size="lg"
          onClick={handleSendEmail}
        >
          {/* <Check className="mr-2 h-4 w-4" /> */}
          Złóż zamówienie
        </Button>
      </div>
    </div>
  );
}
