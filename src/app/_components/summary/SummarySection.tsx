// "use client";

// import DeliveryOptions from "./DeliveryOptions";
// import { Button } from "@/components/ui/button";
// import { ShoppingBag } from "lucide-react";
// import { useCartContext } from "~/lib/CartContext";
// import { useFormContext } from "~/lib/FormContext";
// import { type GeneralInformationType } from "~/lib/GeneralInformationType";

// interface SummarySectionProps {
//   generalInformation: GeneralInformationType;
// }

// export default function SummarySection({
//   generalInformation,
// }: SummarySectionProps) {
//   const { setCartState } = useCartContext();
//   const { formCurrentState, formDataToGenerate } = useFormContext();

//   return (
//     <div className="grid gap-6 px-5 lg:grid-cols-2">
//       <div className="p-1">
//         <DeliveryOptions />
//       </div>

//       <div className="space-y-6 p-1">
//         <div>
//           <h3 className="text-xl font-semibold">Podsumowanie zamówienia</h3>
//           <p className="text-sm text-muted-foreground">
//             Sprawdź szczegóły przed złożeniem zamówienia
//           </p>
//         </div>

//         <div className="space-y-4 rounded-lg bg-accent/50 p-4">
//           <div className="flex items-center justify-between">
//             <p className="text-muted-foreground">Ilość elementów:</p>
//             <span className="font-medium">0</span>
//           </div>

//           <div className="flex items-center justify-between border-t border-border pt-4">
//             <p className="text-muted-foreground">Wartość produktów:</p>
//             <span className="font-medium">0,00 zł</span>
//           </div>

//           <div className="flex items-center justify-between">
//             <p className="text-muted-foreground">Koszt dostawy:</p>
//             <span className="font-medium">19,99 zł</span>
//           </div>

//           <div className="flex items-center justify-between border-t border-border pt-4">
//             <p className="font-medium">Razem:</p>
//             <span className="text-xl font-bold">19,99 zł</span>
//           </div>
//         </div>

//         <p className="text-sm text-muted-foreground">
//           <sup className="font-medium">*</sup>W cenę wliczony jest podatek VAT
//         </p>

//         <Button
//           className="w-full"
//           size="lg"
//           onClick={() => {
//             // setCartState((prev) => [
//             //   ...prev,
//             //   {
//             //     id: Date.now(),
//             //     filledForm: formCurrentState,
//             //     formDataToGenerate: formDataToGenerate,
//             //   },
//             // ]);
//             setCartState((prev) => ({
//               generalInformation: {
//                 name: generalInformation.name,
//                 company: generalInformation.company,
//                 email: generalInformation.email,
//               },
//               values: [
//                 ...prev.values, // Rozpakowujemy poprzednią tablicę wartości
//                 {
//                   id: Date.now(),
//                   filledForm: formCurrentState,
//                   formDataToGenerate: formDataToGenerate,
//                 },
//               ],
//             }));
//           }}
//         >
//           <ShoppingBag className="mr-2 h-4 w-4" />
//           Dodaj do zamówienia
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartContext } from "~/lib/CartContext";
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

export default function SummarySection({
  generalInformation,
}: SummarySectionProps) {
  const { setCartState } = useCartContext();
  const { formCurrentState, formDataToGenerate } = useFormContext();
  const { filledForm } = formCurrentState; // Pobieramy tylko filledForm

  const [priceInfo, setPriceInfo] = useState<PriceInfo>({
    totalPrice: 0,
    deliveryDate: 14,
    unitPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

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
            <span className="font-medium">19,99 zł</span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="font-medium">Razem:</p>
            <span className="text-xl font-bold">
              {isLoading
                ? "Obliczanie..."
                : formatPrice(priceInfo.totalPrice + 19.99)}
            </span>
          </div>

          {!isLoading && (
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Przewidywany czas dostawy:
              </p>
              <span className="font-medium">{priceInfo.deliveryDate} dni</span>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          <sup className="font-medium">*</sup>W cenę wliczony jest podatek VAT
        </p>

        <Button
          className="w-full"
          size="lg"
          onClick={() => {
           


            // setCartState((prev) => [
            //   ...prev,
            //   {
            //     id: Date.now(),
            //     filledForm: formCurrentState,
            //     formDataToGenerate: formDataToGenerate,
            //   },
            // ]);

            setCartState((prev) => ({
              generalInformation: {
                name: generalInformation.name,
                company: generalInformation.company,
                email: generalInformation.email,
              },
              values: [
                ...prev.values, // Rozpakowujemy poprzednią tablicę wartości
                {
                  id: Date.now(),
                  filledForm: formCurrentState,
                  formDataToGenerate: formDataToGenerate,
                },
              ],
            }));
          }}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Dodaj do zamówienia
        </Button>
      </div>
    </div>
  );
}
