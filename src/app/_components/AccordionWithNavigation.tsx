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

import { ChevronRight, File, X } from "lucide-react";

import formData from "~/lib/formData";
import { type UploadedFile } from "~/lib/UploadedFileType";
import { type FilledFormType } from "~/lib/FilledFormType";
import { SelectedSurfaceType } from "~/lib/SelectedSurfaceType";

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
      { id: 1, value: 5 },
      { id: 2, value: "mm" },
      { id: 3, value: "Stal nierdzewna" },
      { id: 4, value: "Aluminium 5052" },
      { id: 5, value: "Srebrno-biały" },
      { id: 6, value: "1.0mm" },
      {
        id: 777,
        value: {
          category: "surface",
          option: "anodized",
          tile: "anodized-simple",
          color: "black",
        } as SelectedSurfaceType,
      },
      { id: 8, value: [] as UploadedFile[] },
      { id: 9, value: "Tak" },
      { id: 10, value: "Tak" },
      { id: 11, value: "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)" },
      { id: 12, value: "Tak" },
      { id: 13, value: "Grawerowanie laserowe" },
      { id: 14, value: "Testy montażowe" },
      { id: 15, value: "Premium (dodatkowe opłaty)" },
      { id: 16, value: "Standardowa inspekcja (brak raportu)" },
      { id: 17, value: "Sprzęt biurowy i akcesoria" },
      { id: 18, value: "ewqeqwe" },
    ],
  };

  useEffect(() => {
    const initialState: FilledFormType = {
      id: formData.id,
      uploadedFiles: uploadedFiles,
      values: formData.formElements.map((element) => {
        const filledValue = filledFormData.values.find(
          (item) => item.id === element.id,
        );
        return {
          id: element.id,
          value: filledValue ? filledValue.value : "",
        };
      }),
    };
    setFormCurrentState(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {/* <AccordionTrigger className="flex justify-between px-4 hover:no-underline">
          <div className="flex w-2/3 bg-blue-200">
            <span className="mr-5 w-auto text-nowrap text-left font-medium">
              Prześlij pliki
            </span>
            <div className="flex w-1/2 justify-start gap-2 bg-purple-200">
              {uploadedFiles.map((el: UploadedFile, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <a
                    href={el.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[150px] truncate hover:underline"
                  >
                    {el.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AccordionTrigger> */}
        <AccordionTrigger className="flex w-full justify-between px-4 pr-8 hover:no-underline">
          <div className="flex w-full items-center">
            <span className="mr-5 shrink-0 font-medium">Prześlij pliki</span>
            <div className="relative flex-1 overflow-hidden pr-8">
              <div className="flex items-center gap-2 overflow-x-hidden whitespace-nowrap pr-4">
                {uploadedFiles.map((el: UploadedFile, index) => (
                  <div
                    key={index}
                    className="flex shrink-0 items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <a
                      href={el.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[150px] truncate hover:underline"
                    >
                      {el.name}
                    </a>
                  </div>
                ))}
              </div>
              {/* Gradient overlay that creates the fade-out effect */}
              <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-background"></div>
            </div>
          </div>
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
