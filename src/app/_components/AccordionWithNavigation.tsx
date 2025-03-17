"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FormSection from "./form/FormSection";
import UploadSection from "./upload/UploadSection";
import SummarySection from "./summary/SummarySection";
import { type UploadedFile } from "./upload/UploadArea";

type SelectedSurfaceInterface = {
  category?: string;
  option?: string;
  tile?: string;
  color?: string;
};

type FilledFormData = {
  id: number;
  uploadedFiles: UploadedFile[];
  values: Array<
    Record<string, string | SelectedSurfaceInterface | UploadedFile[]>
  >;
};

export default function AccordionWithNavigation() {
  const [activeIndex, setActiveIndex] = useState<string>("item-0");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleNavigation = (targetIndex: string) => {
    setActiveIndex(targetIndex);
  };

  const filledFormData: FilledFormData = {
    id: 1,
    uploadedFiles: [],
    values: [
      {
        "1": "13213",
      },
      {
        "2": "mm",
      },
      {
        "3": "Stal nierdzewna",
      },
      {
        "4": "Aluminium 5052",
      },
      {
        "5": "Srebrno-biały",
      },
      {
        "6": "1.0mm",
      },
      {
        "777": {
          category: "surface",
          option: "anodized",
          tile: "anodized-simple",
          color: "black",
        },
      },
      {
        "8": {},
      },
      {
        "9": "Tak",
      },
      {
        "10": "Tak",
      },
      {
        "11": "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
      },
      {
        "12": "Tak",
      },
      {
        "13": "Grawerowanie laserowe",
      },
      {
        "14": "Testy montażowe",
      },
      {
        "15": "Premium (dodatkowe opłaty)",
      },
      {
        "16": "Standardowa inspekcja (brak raportu)",
      },
      {
        "17": "Sprzęt biurowy i akcesoria",
      },
      {
        "18": "ewqeqwe",
      },
    ],
  };

  return (
    <Accordion
      type="single"
      value={activeIndex}
      onValueChange={setActiveIndex}
      collapsible
      className="h-min w-full max-w-4xl"
    >
      {/* Upload Section */}
      <AccordionItem
        value="item-0"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Prześlij pliki</span>
          {uploadedFiles.map((el: UploadedFile, index) => (
            <span key={index}>{el.name}</span>
          ))}
        </AccordionTrigger>
        <AccordionContent className="pb-4 xl:px-4">
          <UploadSection
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-1")}
              className="flex items-center"
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Form Section */}
      <AccordionItem
        value="item-1"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Formularz</span>
        </AccordionTrigger>
        <AccordionContent className="pb-4 xl:px-4">
          <FormSection filledFormData={filledFormData} />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-0")}
              variant="outline"
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Wróć
            </Button>
            <Button
              onClick={() => handleNavigation("item-2")}
              className="flex items-center"
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Summary Section */}
      <AccordionItem
        value="item-2"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Podsumowanie</span>
        </AccordionTrigger>
        <AccordionContent className="pb-4 xl:px-4">
          <SummarySection />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-1")}
              variant="outline"
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Wróć
            </Button>
            <Button variant="outline">Złóż zamówienie</Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
