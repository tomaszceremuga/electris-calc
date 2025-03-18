import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { TriangleAlert } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SurfaceTreatment from "./SurfaceTreatment";
import { type SelectedSurfaceType } from "~/lib/SelectedSurfaceType";

interface SurfaceTreatmentProps {
  id: number;
  onChange: (id: number, value: SelectedSurfaceType) => void;
  filled: SelectedSurfaceType | object;

  selectedMaterial: {
    image: string;
    name: string;
    infoLink: string;
    rate: number;
    rates: number;
  };
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

interface SelectedSurfaceInterface {
  category?: string;
  option?: string;
  tile?: string;
  color?: string;
}

const SelectMaterial: React.FC<SurfaceTreatmentProps> = ({
  id,
  onChange,
  filled,
  selectedMaterial,
  data,
}) => {
  const [selectedSurface, setSelectedSurface] =
    useState<SelectedSurfaceInterface>({});

  const prevSurface = useRef<SelectedSurfaceInterface | null>(selectedSurface);

  useEffect(() => {
    if (prevSurface.current !== selectedSurface) {
      onChange(id, selectedSurface);
      prevSurface.current = selectedSurface;
    }
  }, [selectedSurface, id, onChange]);

  return (
    <div className="flex h-min w-full flex-wrap p-3 sm:flex-nowrap">
      <div className="w-full">
        <p className="">Wybrany materiał</p>
        <div className="flex h-full items-center sm:border-r">
          <div className="flex h-full items-center">
            <Image
              src={selectedMaterial.image}
              width={120}
              height={120}
              alt="Materiał"
            />
          </div>
          <div className="h-fit w-full">
            <p className="mb-1 font-bold">{selectedMaterial.name}</p>
            <a href="#" className="hover:underline">
              Pokaż więcej informacji
            </a>
            <div className="mt-3 flex items-center gap-[6px]">
              <Star className="w-4" />
              <p className="font-semibold">{selectedMaterial.rate} </p>
              <p className="ml-1">({selectedMaterial.rates} ocen)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid min-h-full w-full py-1 md:px-6">
        <div className="flex items-center gap-2">
          <p>Wykończenie - {data.tiles.length} opcje</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="link"
                size="icon"
                className="h-6 w-6 rounded-full bg-background p-0 px-2 text-neutral-500 hover:bg-neutral-500 hover:text-primary-foreground"
                aria-label="Information"
              >
                <TriangleAlert className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p>{data.alertMesage}</p>
            </PopoverContent>
          </Popover>
        </div>
        <SurfaceTreatment
          setSelectedSurface={setSelectedSurface}
          data={data}
          filled={filled}
        />
      </div>
    </div>
  );
};

export default SelectMaterial;
