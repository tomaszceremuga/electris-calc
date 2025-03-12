"use client";

import React from "react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

const configuratorData = {
  categories: [
    {
      id: "surface",
      name: "Powierzchnia",
      options: [
        { id: "standard", name: "Standardowa (Frezowana)" },
        { id: "anodized", name: "Anodowana" },
        { id: "brushed", name: "Szczotkowana" },
        { id: "bead-blast", name: "Piaskowana" },
        { id: "spray-painting", name: "Malowanie natryskowe" },
        { id: "powder-coat", name: "Malowanie proszkowe" },
        { id: "spray-plating", name: "Natryskowe powlekanie" },
        { id: "detail-sanding", name: "Szlifowanie detali" },
      ],
    },
  ],
  tiles: [
    {
      id: "bead-blast-anodized",
      categoryId: "surface",
      name: "Piaskowanie + Anodowanie",
      description:
        "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium. A dzięki piaskowaniu powierzchnia części pozostaje gładka, z matowym wyglądem.",
      image: "/placeholder.svg?height=150&width=250",
      colors: [
        "blue",
        "black",
        "gray",
        "yellow",
        "orange",
        "red",
        "teal",
        "purple",
        "brown",
        "beige",
      ],
      requiredOption: "anodized",
    },
    {
      id: "anodized-simple",
      categoryId: "surface",
      name: "Anodowanie",
      description:
        "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium.",
      image: "/placeholder.svg?height=150&width=250",
      colors: [
        "blue",
        "black",
        "gray",
        "yellow",
        "orange",
        "red",
        "teal",
        "purple",
        "brown",
        "beige",
      ],
      requiredOption: "anodized",
    },
    {
      id: "standard-finish",
      categoryId: "surface",
      name: "Wykończenie standardowe",
      description:
        "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania.",
      image: "/placeholder.svg?height=150&width=250",
      colors: [],
      requiredOption: "standard",
    },
    {
      id: "brushed-finish",
      categoryId: "surface",
      name: "Wykończenie szczotkowane",
      description:
        "Wykończenie szczotkowane tworzy serię drobnych linii na powierzchni, nadając jej charakterystyczny wygląd i teksturę.",
      image: "/placeholder.svg?height=150&width=250",
      colors: [],
      requiredOption: "brushed",
    },
  ],
};

// Color mapping for display
const colorMap = {
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

const SurfaceTreatment = () => {
  const [selectedCategory, setSelectedCategory] = useState("surface");
  const [selectedOption, setSelectedOption] = useState("anodized");
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const currentCategory = configuratorData.categories.find(
    (cat) => cat.id === selectedCategory,
  );
  const availableTiles = configuratorData.tiles.filter(
    (tile) =>
      tile.categoryId === selectedCategory &&
      (tile.requiredOption === selectedOption || !tile.requiredOption),
  );
  const selectedTileData = selectedTile
    ? configuratorData.tiles.find((tile) => tile.id === selectedTile)
    : null;

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          {selectedTile || selectedColor ? (
            <div className="relative mt-2 gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 pr-12 text-left text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              <Pencil className="absolute right-3 top-3" />

              <div className="space-y-2">
                <p>
                  <span className="font-medium">Kategoria:</span>{" "}
                  {currentCategory?.name}
                </p>
                <p>
                  <span className="font-medium">Opcja:</span>{" "}
                  {
                    currentCategory?.options.find(
                      (o) => o.id === selectedOption,
                    )?.name
                  }
                </p>
                {selectedTileData && (
                  <p>
                    <span className="font-medium">Typ:</span>{" "}
                    {selectedTileData.name}
                  </p>
                )}
                {selectedColor && (
                  <p>
                    <span className="font-medium">Kolor:</span>{" "}
                    {colorMap[selectedColor].name}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              {selectedTile || selectedColor ? "Edytuj" : "Dodaj obróbkę"}
            </p>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full max-w-min">
          <AlertDialogHeader>
            <AlertDialogTitle></AlertDialogTitle>

            <AlertDialogDescription className="mx-auto h-[600px] w-[1000px]">
              <div className="flex h-[50px] items-center border-b px-4">
                <h1 className="text-xl font-semibold text-primary">
                  {currentCategory?.name}
                </h1>
              </div>

              <div className="grid h-[550px] grid-cols-[250px_1fr_300px]">
                <div className="border-r">
                  <div className="h-full overflow-auto">
                    {currentCategory?.options.map((option) => (
                      <button
                        key={option.id}
                        className={cn(
                          "h-[50px] w-full border-b px-4 py-3 text-left transition-colors last:border-b-0",
                          selectedOption === option.id
                            ? "bg-gray-200 font-medium"
                            : "hover:bg-gray-100",
                        )}
                        onClick={() => {
                          setSelectedOption(option.id);
                          setSelectedTile(null);
                          setSelectedColor(null);
                        }}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-full overflow-y-auto border-r p-4">
                  <div className="flex flex-wrap content-start gap-4">
                    {availableTiles.map((tile) => (
                      <div
                        key={tile.id}
                        className={cn(
                          "h-[200px] w-[calc(50%-8px)] cursor-pointer overflow-hidden rounded-lg border transition-all",
                          selectedTile === tile.id
                            ? "ring-2 ring-gray-400"
                            : "hover:shadow-md",
                        )}
                        onClick={() => {
                          setSelectedTile(tile.id);
                          setSelectedColor(null);
                        }}
                      >
                        <div className="relative h-[150px] w-full">
                          <Image
                            src={tile.image || "/placeholder.svg"}
                            alt={tile.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex h-[50px] items-center justify-center p-3 text-center">
                          <h3 className="font-medium">{tile.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col p-4">
                  {selectedTileData?.colors.length ? (
                    <>
                      <h3 className="mb-2 font-medium">Wybierz kolor</h3>
                      <div className="mb-6 grid grid-cols-5 gap-2">
                        {selectedTileData.colors.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "h-12 w-12 rounded-md border",
                              colorMap[color].bg,
                              selectedColor === color
                                ? "ring-2 ring-gray-500 ring-offset-2"
                                : "",
                            )}
                            onClick={() => setSelectedColor(color)}
                            aria-label={colorMap[color].name}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {selectedTileData && (
                    <div className="flex-1">
                      <h3 className="mb-2 font-medium">
                        Informacje o {selectedTileData.name}
                      </h3>
                      <p className="text-sm">{selectedTileData.description}</p>
                    </div>
                  )}

                  <AlertDialogFooter className="mt-auto flex justify-end gap-2">
                    <AlertDialogCancel>Zamknij</AlertDialogCancel>
                    <AlertDialogAction>Zatwierdź</AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SurfaceTreatment;
