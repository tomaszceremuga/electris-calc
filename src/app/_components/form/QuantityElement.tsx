"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import InfoButton from "./InfoButton";
import QuantityTable from "./QuantityTable";
import { type formElementsInterface } from "~/lib/formElementsInterface";
import { X } from "lucide-react";

const QuantityElement: React.FC<formElementsInterface> = ({
  id,
  onChange,
  filled,
  name,
  info = "",
  isImportant = false,
}) => {
  const convertToNumber = (filled: string): number => {
    const result = Number(filled);
    return isNaN(result) ? 0 : result;
  };

  const [quantity, setQuantity] = useState<number>(
    convertToNumber(filled ?? ""),
  );
  const prevQuantity = useRef<number>(quantity);
  const [finalQuantity, setFinalQuantity] = useState<number>(
    convertToNumber(filled ?? ""),
  );

  useEffect(() => {
    if (prevQuantity.current !== quantity) {
      onChange(id, quantity);
      prevQuantity.current = quantity;
    }
  }, [quantity, id, onChange]);

  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-2">
        <div className="flex items-center">
          <p className="whitespace-nowrap p-[6px] text-base">
            {isImportant && <span className="mr-1 text-red-500">*</span>}
            {name}
          </p>
          {info && <InfoButton info={info} />}
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="inline-flex h-10 w-32 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              {quantity === 0 ? "" : quantity}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center justify-between">
                <AlertDialogTitle>Wybierz ilość</AlertDialogTitle>
                <AlertDialogCancel
                  className="w-min border-none"
                  onClick={() => setQuantity(finalQuantity)}
                >
                  <X />
                </AlertDialogCancel>
              </div>
              <div className="w-full max-w-[700px]">
                <QuantityTable
                  setQuantity={setQuantity}
                  filled={
                    typeof filled === "number" ? filled : Number(filled ?? 0)
                  }
                  finalQuantity={finalQuantity}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setQuantity(finalQuantity)}>
                Anuluj
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setFinalQuantity(quantity)}>
                Zapisz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default QuantityElement;
