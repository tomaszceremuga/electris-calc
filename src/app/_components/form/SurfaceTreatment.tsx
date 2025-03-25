"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectedSurfaceType } from "~/lib/SelectedSurfaceType";
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

interface SurfaceTreatmentProps {
  setSelectedSurface: React.Dispatch<React.SetStateAction<SelectedSurfaceType>>;
  filled: SelectedSurfaceType;
  data: {
    alertMesage: string;
    treatments: {
      id: string;
      name: string;
      description: string;
      image: string;
      hasColors?: boolean;
      hasCoatings?: boolean;
      colors?: string[];
      coatings?: {
        id: string;
        name: string;
      }[];
    }[];
  };
}

const colorMap: Record<string, { bg: string; name: string }> = {
  blue: { bg: "bg-blue-500", name: "Niebieski" },
  black: { bg: "bg-black", name: "Czarny" },
  gray: { bg: "bg-gray-400", name: "Szary" },
  yellow: { bg: "bg-yellow-400", name: "Żółty" },
  orange: { bg: "bg-orange-500", name: "Pomarańczowy" },
  red: { bg: "bg-red-500", name: "Czerwony" },
  teal: { bg: "bg-teal-500", name: "Morski" },
  purple: { bg: "bg-purple-500", name: "Fioletowy" },
  brown: { bg: "bg-amber-800", name: "Brązowy" },
  beige: { bg: "bg-amber-200", name: "Beżowy" },
};

const SurfaceTreatment: React.FC<SurfaceTreatmentProps> = ({
  setSelectedSurface,
  filled,
  data = {
    treatments: [],
  },
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    () => {
      return filled.treatment ?? null;
    },
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    return filled.color ?? null;
  });

  const [selectedCoating, setSelectedCoating] = useState<string | null>(() => {
    return filled.coating ?? null;
  });

  const selectedTreatmentData = selectedTreatment
    ? data?.treatments?.find((treatment) => treatment.id === selectedTreatment)
    : null;

  useEffect(() => {
    setSelectedSurface({
      treatment: selectedTreatment ?? "",
      color: selectedColor ?? "",
      coating: selectedCoating ?? "",
    });
  }, [selectedTreatment, selectedColor, selectedCoating, setSelectedSurface]);

  useEffect(() => {
    setSelectedTreatment(filled.treatment ?? null);
    setSelectedColor(filled.color ?? null);
    setSelectedCoating(filled.coating ?? null);
  }, [filled]);

  const getDisplayText = () => {
    if (!selectedTreatment) return "Wybierz obróbkę powierzchni";

    let text = selectedTreatmentData?.name ?? "";

    if (selectedColor && selectedTreatmentData?.hasColors) {
      text += ` - ${colorMap[selectedColor]?.name ?? ""}`;
    }

    if (selectedCoating && selectedTreatmentData?.hasCoatings) {
      text += ` - ${selectedTreatmentData?.coatings?.find((c) => c.id === selectedCoating)?.name ?? ""}`;
    }

    return text;
  };

  return (
    <div className="w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className={cn(
              "w-full rounded-lg border p-4 text-left transition-all hover:border-primary/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
              selectedTreatment ? "bg-background" : "bg-muted/30",
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  selectedTreatment ? "font-medium" : "text-muted-foreground"
                }
              >
                {getDisplayText()}
              </span>
              <span className="text-xs text-muted-foreground">
                {selectedTreatment ? "Zmień" : "Wybierz"}
              </span>
            </div>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0 sm:max-w-[600px] md:max-w-[800px]">
          <AlertDialogHeader className="border-b p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <AlertDialogTitle className="text-xl">
                Wybierz obróbkę powierzchni
              </AlertDialogTitle>
              <AlertDialogCancel className="h-8 w-8 rounded-full p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Zamknij</span>
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <div className="flex max-h-[calc(90vh-10rem)] flex-col overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-lg border transition-all",
                    selectedTreatment === treatment.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "hover:border-primary/50 hover:shadow-md",
                  )}
                  onClick={() => {
                    setSelectedTreatment(treatment.id);
                    setSelectedColor(null);
                    setSelectedCoating(null);
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={treatment.image || "/placeholder.svg"}
                      alt={treatment.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {selectedTreatment === treatment.id && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{treatment.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {treatment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedTreatmentData && (
              <div className="mt-8 rounded-lg border p-4">
                <h3 className="text-lg font-medium">
                  {selectedTreatmentData.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedTreatmentData.description}
                </p>

                {selectedTreatmentData.hasColors &&
                  selectedTreatmentData.colors &&
                  selectedTreatmentData.colors.length > 0 && (
                    <div className="mt-6">
                      <h4 className="mb-3 font-medium">Wybierz kolor</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedTreatmentData.colors.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "group relative h-12 w-12 rounded-full border transition-all hover:shadow-md",
                              colorMap[color]?.bg,
                              selectedColor === color
                                ? "ring-2 ring-primary ring-offset-2"
                                : "",
                            )}
                            onClick={() => setSelectedColor(color)}
                            aria-label={colorMap[color]?.name}
                          >
                            {selectedColor === color && (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <Check className="h-6 w-6 text-white drop-shadow-md" />
                              </span>
                            )}
                            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 transition-opacity group-hover:opacity-100">
                              {colorMap[color]?.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedTreatmentData.hasCoatings &&
                  selectedTreatmentData.coatings &&
                  selectedTreatmentData.coatings.length > 0 && (
                    <div className="mt-6">
                      <h4 className="mb-3 font-medium">Wybierz powłokę</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTreatmentData.coatings.map((coating) => (
                          <button
                            key={coating.id}
                            className={cn(
                              "relative rounded-full px-4 py-2 transition-all",
                              selectedCoating === coating.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80",
                            )}
                            onClick={() => setSelectedCoating(coating.id)}
                          >
                            {coating.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          <AlertDialogFooter className="border-t p-4 sm:p-6">
            <AlertDialogCancel className="mt-0">Anuluj</AlertDialogCancel>
            <AlertDialogAction
              disabled={
                !selectedTreatment ||
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                (selectedTreatmentData?.hasColors && !selectedColor) ||
                (selectedTreatmentData?.hasCoatings && !selectedCoating)
              }
            >
              Zatwierdź
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SurfaceTreatment;
