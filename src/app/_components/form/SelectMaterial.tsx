// "use client";

// import type React from "react";
// import { useState, useRef, useEffect, useMemo } from "react";
// import { TriangleAlert } from "lucide-react";
// import { Button } from "~/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import SurfaceTreatment from "./SurfaceTreatment";
// import type { SelectedSurfaceType } from "~/lib/SelectedSurfaceType";

// export type OriginalDataStructure = {
//   alertMesage: string;
//   categories?: {
//     id: string;
//     name: string;
//     options: { id: string; name: string }[];
//   }[];
//   tiles?: {
//     // Zmieniamy na opcjonalne
//     id: string;
//     categoryId: string;
//     name: string;
//     description: string;
//     image: string;
//     colors: string[];
//     requiredOption?: string;
//   }[];
//   treatments?: {
//     // Zmieniamy na opcjonalne
//     id: string;
//     name: string;
//     description: string;
//     image: string;
//     hasColors?: boolean;
//     colors?: string[];
//     hasCoatings?: boolean;
//     coatings?: { id: string; name: string }[];
//   }[];
// };

// // New data structure expected by SurfaceTreatment
// interface TransformedDataStructure {
//   alertMesage: string;
//   treatments: {
//     id: string;
//     name: string;
//     description: string;
//     image: string;
//     hasColors?: boolean;
//     hasCoatings?: boolean;
//     colors?: string[];
//     coatings?: {
//       id: string;
//       name: string;
//     }[];
//   }[];
// }

// interface SurfaceTreatmentProps {
//   id: number;
//   onChange: (id: number, value: SelectedSurfaceType) => void;
//   filled: SelectedSurfaceType | object;
//   selectedMaterial: {
//     image: string;
//     name: string;
//     infoLink: string;
//     rate: number;
//     rates: number;
//   };
//   data: OriginalDataStructure;
// }

// // Function to transform the original data structure to the new one
// const transformData = (
//   originalData: OriginalDataStructure,
// ): TransformedDataStructure => {
//   // Map for galvanic coating options
//   const galvanicCoatings = [
//     { id: "zinc", name: "Cynowanie" },
//     { id: "silver", name: "Srebrzenie" },
//     { id: "nickel", name: "Niklowanie" },
//   ];

//   // Create treatments array
//   const treatments = [
//     {
//       id: "standard",
//       name: "Standardowa",
//       description:
//         "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania. Powierzchnia zachowuje naturalny wygląd materiału z widocznymi śladami obróbki mechanicznej.",
//       image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//       id: "powder-coat",
//       name: "Malowanie proszkowe",
//       description:
//         "Malowanie proszkowe tworzy trwałą, odporną na korozję powłokę dostępną w różnych kolorach. Proces ten zapewnia równomierną, wytrzymałą powłokę, która jest odporna na odpryski, zarysowania i blaknięcie.",
//       image: "/placeholder.svg?height=200&width=300",
//       hasColors: true,
//       colors: [
//         "blue",
//         "black",
//         "gray",
//         "yellow",
//         "orange",
//         "red",
//         "teal",
//         "purple",
//         "brown",
//         "beige",
//       ],
//     },
//     {
//       id: "galvanic-coat",
//       name: "Powłoka galwaniczna",
//       description:
//         "Powłoka galwaniczna to proces elektrochemiczny, który nakłada cienką warstwę metalu na powierzchnię, poprawiając jej właściwości. Zwiększa odporność na korozję, poprawia przewodność elektryczną i nadaje estetyczny wygląd.",
//       image: "/placeholder.svg?height=200&width=300",
//       hasCoatings: true,
//       coatings: galvanicCoatings,
//     },
//   ];

//   return {
//     alertMesage: originalData.alertMesage,
//     treatments,
//   };
// };

// // Function to transform the selected surface data back to the original format
// const transformSelectedSurface = (
//   selectedSurface: SelectedSurfaceType,
// ): { category: string; option: string; tile: string; color: string } => {
//   const category = "surface";
//   let option = "";
//   let tile = "";
//   const color = selectedSurface.color ?? "";

//   if (selectedSurface.treatment === "standard") {
//     option = "standard";
//     tile = "standard-finish";
//   } else if (selectedSurface.treatment === "powder-coat") {
//     option = "powder-coat";
//     tile = "powder-coat-finish";
//   } else if (selectedSurface.treatment === "galvanic-coat") {
//     option = "galvanic-coat";
//     tile = selectedSurface.coating ? `galvanic-${selectedSurface.coating}` : "";
//   }

//   return {
//     category,
//     option,
//     tile,
//     color,
//   };
// };

// const SelectMaterial: React.FC<SurfaceTreatmentProps> = ({
//   id,
//   onChange,
//   filled,
//   data,
// }) => {
//   // Transform the data structure
//   const transformedData = useMemo(() => transformData(data), [data]);

//   const [selectedSurface, setSelectedSurface] = useState<SelectedSurfaceType>(
//     {},
//   );
//   const prevSurface = useRef<SelectedSurfaceType>(selectedSurface);

//   // Transform the filled data if needed
//   const transformedFilled = useMemo(() => {
//     if (!filled || Object.keys(filled).length === 0) return {};

//     // If filled data is in the old format, transform it to the new format
//     if ("category" in filled && "option" in filled) {
//       const oldFormat = filled as {
//         category: string;
//         option: string;
//         tile: string;
//         color: string;
//       };

//       let treatment = "";
//       const color = oldFormat.color || "";
//       let coating = "";

//       if (oldFormat.option === "standard") {
//         treatment = "standard";
//       } else if (
//         oldFormat.option === "powder-coat" ||
//         oldFormat.tile?.includes("powder")
//       ) {
//         treatment = "powder-coat";
//       } else if (
//         oldFormat.option === "galvanic-coat" ||
//         oldFormat.tile?.includes("galvanic")
//       ) {
//         treatment = "galvanic-coat";

//         // Extract coating type from tile if available
//         if (oldFormat.tile) {
//           if (oldFormat.tile.includes("zinc")) coating = "zinc";
//           else if (oldFormat.tile.includes("silver")) coating = "silver";
//           else if (oldFormat.tile.includes("nickel")) coating = "nickel";
//         }
//       }

//       return { treatment, color, coating };
//     }

//     return filled;
//   }, [filled]);

//   useEffect(() => {
//     if (prevSurface.current !== selectedSurface) {
//       // Transform the selected surface back to the original format before sending it to onChange
//       const originalFormat = transformSelectedSurface(selectedSurface);
//       onChange(id, originalFormat);
//       prevSurface.current = selectedSurface;
//     }
//   }, [selectedSurface, id, onChange]);

//   return (
//     <div className="mb-5 w-full max-w-[400px] rounded-lg bg-card">
//       <div className="mb-2 flex items-center justify-between">
//         <div className="ml-2 flex items-center gap-2">
//           <p className="flex items-center whitespace-nowrap p-[6px] text-base">
//             Obróbka powierzchni
//           </p>

//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-6 w-6 rounded-full"
//                 aria-label="Informacje o obróbce powierzchni"
//               >
//                 <TriangleAlert className="h-4 w-4" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="max-w-xs text-sm">
//               <p>{data.alertMesage}</p>
//             </PopoverContent>
//           </Popover>
//           <span className="text-xs text-muted-foreground">
//             {transformedData.treatments.length} dostępne opcje
//           </span>
//         </div>
//       </div>

//       <div className="ml-2 md:ml-5 md:pl-2">
//         <SurfaceTreatment
//           setSelectedSurface={setSelectedSurface}
//           data={transformedData}
//           filled={transformedFilled}
//         />
//       </div>
//     </div>
//   );
// };

// export default SelectMaterial;
"use client";

import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SurfaceTreatment from "./SurfaceTreatment";
import type { SelectedSurfaceType } from "~/lib/SelectedSurfaceType";

export type OriginalDataStructure = {
  alertMesage: string;
  categories?: {
    id: string;
    name: string;
    options: { id: string; name: string }[];
  }[];
  tiles?: {
    id: string;
    categoryId: string;
    name: string;
    description: string;
    image: string;
    colors: string[];
    requiredOption?: string;
  }[];
  treatments?: {
    id: string;
    name: string;
    description: string;
    image: string;
    hasColors?: boolean;
    colors?: string[];
    hasCoatings?: boolean;
    coatings?: { id: string; name: string }[];
  }[];
};

interface TransformedDataStructure {
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
}

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
  data: OriginalDataStructure;
}

const transformData = (
  originalData: OriginalDataStructure,
): TransformedDataStructure => {
  const galvanicCoatings = [
    { id: "zinc", name: "Cynowanie" },
    { id: "silver", name: "Srebrzenie" },
    { id: "nickel", name: "Niklowanie" },
  ];

  const treatments = [
    {
      id: "standard",
      name: "Standardowa",
      description:
        "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania. Powierzchnia zachowuje naturalny wygląd materiału z widocznymi śladami obróbki mechanicznej.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "powder-coat",
      name: "Malowanie proszkowe",
      description:
        "Malowanie proszkowe tworzy trwałą, odporną na korozję powłokę dostępną w różnych kolorach. Proces ten zapewnia równomierną, wytrzymałą powłokę, która jest odporna na odpryski, zarysowania i blaknięcie.",
      image: "/placeholder.svg?height=200&width=300",
      hasColors: true,
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
    },
    {
      id: "galvanic-coat",
      name: "Powłoka galwaniczna",
      description:
        "Powłoka galwaniczna to proces elektrochemiczny, który nakłada cienką warstwę metalu na powierzchnię, poprawiając jej właściwości. Zwiększa odporność na korozję, poprawia przewodność elektryczną i nadaje estetyczny wygląd.",
      image: "/placeholder.svg?height=200&width=300",
      hasCoatings: true,
      coatings: galvanicCoatings,
    },
  ];

  return {
    alertMesage: originalData.alertMesage,
    treatments,
  };
};

const transformSelectedSurface = (
  selectedSurface: SelectedSurfaceType,
): { category: string; option: string; tile: string; color: string } => {
  const category = "surface";
  let option = "";
  let tile = "";
  const color = selectedSurface.color ?? "";

  if (selectedSurface.treatment === "standard") {
    option = "standard";
    tile = "standard-finish";
  } else if (selectedSurface.treatment === "powder-coat") {
    option = "powder-coat";
    tile = "powder-coat-finish";
  } else if (selectedSurface.treatment === "galvanic-coat") {
    option = "galvanic-coat";
    tile = selectedSurface.coating ? `galvanic-${selectedSurface.coating}` : "";
  }

  return {
    category,
    option,
    tile,
    color,
  };
};

const SelectMaterial: React.FC<SurfaceTreatmentProps> = ({
  id,
  onChange,
  filled,
  data,
}) => {
  const transformedData = useMemo(() => transformData(data), [data]);

  const [selectedSurface, setSelectedSurface] = useState<SelectedSurfaceType>(
    {},
  );
  const prevSurface = useRef<SelectedSurfaceType>(selectedSurface);

  const transformedFilled = useMemo(() => {
    if (!filled || Object.keys(filled).length === 0) return {};

    if ("category" in filled && "option" in filled) {
      const oldFormat = filled as {
        category: string;
        option: string;
        tile: string;
        color: string;
      };

      let treatment = "";
      const color = oldFormat.color || "";
      let coating = "";

      if (oldFormat.option === "standard") {
        treatment = "standard";
      } else if (
        oldFormat.option === "powder-coat" ||
        oldFormat.tile?.includes("powder")
      ) {
        treatment = "powder-coat";
      } else if (
        oldFormat.option === "galvanic-coat" ||
        oldFormat.tile?.includes("galvanic")
      ) {
        treatment = "galvanic-coat";

        if (oldFormat.tile) {
          if (oldFormat.tile.includes("zinc")) coating = "zinc";
          else if (oldFormat.tile.includes("silver")) coating = "silver";
          else if (oldFormat.tile.includes("nickel")) coating = "nickel";
        }
      }

      return { treatment, color, coating };
    }

    return filled;
  }, [filled]);

  useEffect(() => {
    if (prevSurface.current !== selectedSurface) {
      const originalFormat = transformSelectedSurface(selectedSurface);
      onChange(id, originalFormat);
      prevSurface.current = selectedSurface;
    }
  }, [selectedSurface, id, onChange]);

  return (
    <div className="mb-5 w-full max-w-[400px] rounded-lg bg-card">
      <div className="mb-2 flex items-center justify-between">
        <div className="ml-2 flex items-center gap-2">
          <p className="flex items-center whitespace-nowrap p-[6px] text-base">
            Obróbka powierzchni
          </p>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full"
                aria-label="Informacje o obróbce powierzchni"
              >
                <TriangleAlert className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-xs text-sm">
              <p>{data.alertMesage}</p>
            </PopoverContent>
          </Popover>
          <span className="text-xs text-muted-foreground">
            {transformedData.treatments.length} dostępne opcje
          </span>
        </div>
      </div>

      <div className="ml-2 md:ml-5 md:pl-2">
        <SurfaceTreatment
          setSelectedSurface={setSelectedSurface}
          data={transformedData}
          filled={transformedFilled}
        />
      </div>
    </div>
  );
};

export default SelectMaterial;
