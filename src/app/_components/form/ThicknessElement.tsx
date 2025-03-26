"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
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
import ThicknessTable from "./ThicknessTable";
import type { FormElementsType } from "~/lib/FormElementsType";
import { X } from "lucide-react";

const ThicknessElement: React.FC<FormElementsType> = ({
  id,
  onChange,
  filled,
  name,
  info = "",
  isImportant = false,
}) => {
  const convertToNumber = (filled: unknown): number => {
    const result = Number(filled);
    return isNaN(result) ? 0 : result;
  };

  const [thickness, setThickness] = useState<number>(
    convertToNumber(filled ?? ""),
  );
  const prevThickness = useRef<number>(thickness);
  const [finalThickness, setFinalThickness] = useState<number>(
    convertToNumber(filled ?? ""),
  );

  useEffect(() => {
    if (prevThickness.current !== thickness && onChange) {
      onChange(id, thickness);
      prevThickness.current = thickness;
    }
  }, [thickness, id, onChange]);

  useEffect(() => {
    const newThickness =
      typeof filled === "number"
        ? filled
        : typeof filled === "string"
          ? Number.parseFloat(filled)
          : 0;

    setThickness(isNaN(newThickness) ? 0 : newThickness);
    setFinalThickness(isNaN(newThickness) ? 0 : newThickness);
  }, [filled]);

  console.log("wartosc grubosc");
  console.log(filled);
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
              {thickness > 0 ? `${thickness} mm` : ""}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center justify-between">
                <AlertDialogTitle>Wybierz grubość</AlertDialogTitle>
                <AlertDialogCancel
                  className="w-min border-none"
                  onClick={() => setThickness(finalThickness)}
                >
                  <X />
                </AlertDialogCancel>
              </div>
              <div className="w-full max-w-[700px]">
                <ThicknessTable
                  setThickness={setThickness}
                  filled={
                    typeof filled === "number" ? filled : Number(filled ?? 0)
                  }
                  finalThickness={finalThickness}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setThickness(finalThickness)}>
                Anuluj
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => setFinalThickness(thickness)}>
                Zapisz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ThicknessElement;
