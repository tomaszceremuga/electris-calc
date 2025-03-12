import React from "react";

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

interface selectMaterialProps {
  data: object;
}

const SelectMaterial: React.FC<selectMaterialProps> = ({ data }) => {
  return (
    <div className="flex h-min w-full p-3">
      <div className="w-full">
        <p className="">Wybrany materiał</p>
        <div className="flex h-full items-center border-r-[1px]">
          <div className="flex h-full items-center">
            <Image
              src="https://pcbwayfile.s3-us-west-2.amazonaws.com/web/20/12/10/2226459873337t.jpg"
              width={120}
              height={120}
              alt="Materiał"
            />
          </div>
          <div className="h-fit w-full">
            <p className="mb-1 font-bold">Aluminum 5052</p>
            <a href="#" className="hover:underline">
              Pokaż więcej informacji
            </a>
            <div className="mt-3 flex items-center gap-[6px]">
              <Star className="w-4" />
              <p className="font-semibold">4.9</p>
              <p className="ml-1">(207 ocen)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid min-h-full w-full px-6 py-1">
        <div className="flex items-center gap-2">
          <p>Wykończenie - 24 opcje</p>
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
              <p>tekst ?</p>
            </PopoverContent>
          </Popover>
        </div>
        <SurfaceTreatment />
      </div>
    </div>
  );
};

export default SelectMaterial;
