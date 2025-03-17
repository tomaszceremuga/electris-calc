"use client";

import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import FormSection from "./form/FormSection";
import UploadSection from "./upload/UploadSection";
import SummarySection from "./summary/SummarySection";

import { ChevronRight } from "lucide-react";

import formData from "~/lib/formData";
import { type UploadedFile } from "~/lib/UploadedFileType";
import { type FilledFormType } from "~/lib/FilledFormType";

export default function AccordionWithNavigation() {
  const [activeIndex, setActiveIndex] = useState<string>("item-0");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleNavigation = (targetIndex: string) => {
    setActiveIndex(targetIndex);
  };

  const [formCurrentState, setFormCurrentState] = useState<FilledFormType>({
    id: formData.id,
    uploadedFiles: [],
    values: [],
  });

  useEffect(() => {
    setFormCurrentState((prevState) => ({
      ...prevState,
      uploadedFiles: uploadedFiles,
    }));
  }, [uploadedFiles]);

  const filledFormData: FilledFormType = {
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
        "8": [],
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

  useEffect(() => {
    const initialState: FilledFormType = {
      id: formData.id,
      uploadedFiles: uploadedFiles,
      values: formData.formElements.map((element) => {
        const filledValue = filledFormData.values.find(
          (item) => item[element.id],
        );
        return {
          [element.id]: filledValue ? (filledValue[element.id] ?? "") : "",
        };
      }),
    };
    setFormCurrentState(initialState);
  }, []);

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
          <FormSection
            uploadedFiles={uploadedFiles}
            filledFormData={formCurrentState}
            formCurrentState={formCurrentState}
            setFormCurrentState={setFormCurrentState}
          />
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
