"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";

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
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

export type SelectedSurfaceType = {
  category?: string;
  option?: string;
  tile?: string;
  color?: string;
};

interface SurfaceTreatmentProps {
  setSelectedSurface: React.Dispatch<React.SetStateAction<SelectedSurfaceType>>;
  filled: SelectedSurfaceType;
  data: {
    alertMesage: string;
    categories: {
      id: string;
      name: string;
      options: {
        id: string;
        name: string;
      }[];
    }[];
    tiles: {
      id: string;
      categoryId: string;
      name: string;
      description: string;
      image: string;
      colors: string[];
      requiredOption?: string;
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
    categories: [],
    tiles: [],
  },
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return filled.category ? filled.category : "surface";
  });

  const [selectedOption, setSelectedOption] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return filled.option ? filled.option : "anodized";
  });

  const [selectedTile, setSelectedTile] = useState<string | null>(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return filled.tile ? filled.tile : null;
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return filled.color ? filled.color : null;
  });

  const [optionsPanelExpanded, setOptionsPanelExpanded] = useState(true);

  const currentCategory = data?.categories?.find(
    (cat) => cat.id === selectedCategory,
  );

  const availableTiles =
    data?.tiles?.filter(
      (tile) =>
        tile.categoryId === selectedCategory &&
        (tile.requiredOption === selectedOption || !tile.requiredOption),
    ) || [];

  const selectedTileData = selectedTile
    ? data?.tiles?.find((tile) => tile.id === selectedTile)
    : null;

  useEffect(() => {
    setSelectedSurface({
      category: selectedCategory ?? "",
      option: selectedOption ?? "",
      tile: selectedTile ?? "",
      color: selectedColor ?? "",
    });
  }, [
    selectedCategory,
    selectedOption,
    selectedTile,
    selectedColor,
    setSelectedSurface,
  ]);

  console.log("OBECNY KAFELEK " + selectedTile);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          {selectedTile || selectedColor ? (
            <div className="relative mt-2 gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 pr-12 text-left text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              <Pencil className="absolute right-3 top-3" />

              <div className="space-y-2">
                <p>
                  <span className="font-medium">Kategoria</span>{" "}
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
                    {colorMap[selectedColor]?.name}
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
        <AlertDialogContent className="w-full max-w-[95vw] overflow-hidden pb-0 md:max-w-[90vw] lg:max-w-[1000px]">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <AlertDialogTitle>{currentCategory?.name}</AlertDialogTitle>
              <AlertDialogCancel className="w-min border-none">
                <X />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <div className="w-full overflow-hidden md:h-[600px]">
            <div className="flex h-[70vh] flex-col overflow-y-auto md:hidden">
              <div className="rounded border">
                <div
                  className="flex h-[50px] items-center justify-between px-4"
                  onClick={() => setOptionsPanelExpanded(!optionsPanelExpanded)}
                >
                  <span className="text-sm font-medium">
                    {
                      currentCategory?.options.find(
                        (o) => o.id === selectedOption,
                      )?.name
                    }
                  </span>
                  <button
                    className="rounded-md p-2"
                    onClick={() =>
                      setOptionsPanelExpanded(!optionsPanelExpanded)
                    }
                  >
                    {optionsPanelExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    optionsPanelExpanded ? "max-h-[300px]" : "max-h-0",
                  )}
                >
                  {currentCategory?.options.map((option) => (
                    <button
                      key={option.id}
                      className={cn(
                        "h-[50px] w-full border-b px-4 py-3 text-left transition-colors last:border-b-0",
                        selectedOption === option.id
                          ? "bg-gray-200 font-medium"
                          : "hover:bg-gray-100",
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption(option.id);
                        setSelectedTile(null);
                        setSelectedColor(null);
                        setOptionsPanelExpanded(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div
                  className={`${selectedTile != null && "align-center"} sm:baseline flex flex-wrap content-start gap-4 align-baseline`}
                >
                  {availableTiles.map((tile) => {
                    console.log(selectedTile);
                    console.log(tile);
                    return (
                      <div
                        key={tile.id}
                        className={cn(
                          `${selectedTile != tile.id && selectedTile != null && "hidden"} h-[200px] w-full cursor-pointer overflow-hidden rounded-lg border transition-all sm:visible md:w-[calc(50%-8px)]`,
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
                    );
                  })}
                </div>
              </div>

              {/* Details Section */}
              {selectedTileData && (
                <div className={`border-t p-4`}>
                  <h3 className="mb-3 font-medium">
                    Informacje o {selectedTileData.name}
                  </h3>
                  <p className="mb-4 break-words text-sm">
                    {selectedTileData.description}
                  </p>

                  {selectedTileData.colors.length > 0 && (
                    <>
                      <h3 className="mb-2 font-medium">Wybierz kolor</h3>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {selectedTileData.colors.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "h-12 w-12 rounded-md border",
                              colorMap[color]?.bg,
                              selectedColor === color
                                ? "ring-2 ring-gray-500 ring-offset-2"
                                : "",
                            )}
                            onClick={() => setSelectedColor(color)}
                            aria-label={colorMap[color]?.name}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <AlertDialogFooter className="sticky bottom-0 mt-auto flex items-center justify-end gap-2 border-t bg-background p-4">
                <AlertDialogAction>Zatwierdź</AlertDialogAction>
              </AlertDialogFooter>
            </div>

            <div className="hidden h-full grid-cols-[200px_1fr] md:grid lg:grid-cols-[250px_1fr_300px]">
              <div className="overflow-auto border-r">
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

              <div className="overflow-y-auto border-r p-4">
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
                    <div className="mb-6 grid grid-cols-3 gap-2 lg:grid-cols-4">
                      {selectedTileData.colors.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "h-10 w-10 rounded-md border",
                            colorMap[color]?.bg,
                            selectedColor === color
                              ? "ring-2 ring-gray-500 ring-offset-2"
                              : "",
                          )}
                          onClick={() => setSelectedColor(color)}
                          aria-label={colorMap[color]?.name}
                        />
                      ))}
                    </div>
                  </>
                ) : null}

                {selectedTileData && (
                  <div className="flex-1 overflow-y-auto">
                    <h3 className="mb-2 font-medium">
                      Informacje o {selectedTileData.name}
                    </h3>
                    <p className="break-words text-sm">
                      {selectedTileData.description}
                    </p>
                  </div>
                )}

                <AlertDialogFooter className="sticky bottom-0 mt-auto flex justify-end gap-2 bg-background py-2">
                  <AlertDialogCancel>Zamknij</AlertDialogCancel>
                  <AlertDialogAction>Zatwierdź</AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SurfaceTreatment;
