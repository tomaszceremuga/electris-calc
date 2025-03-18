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

import { ChevronRight, File } from "lucide-react";

import formData from "~/lib/formData";
import { type UploadedFile } from "~/lib/UploadedFileType";
import { type FilledFormType } from "~/lib/FilledFormType";
import { type FormDataToGenerateType } from "~/lib/FormDataToGenerateType";

export default function AccordionWithNavigation() {
  const [activeIndex, setActiveIndex] = useState<string>("item-0");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleNavigation = (targetIndex: string) => {
    setActiveIndex(targetIndex);
  };

  const [formCurrentState, setFormCurrentState] = useState<FilledFormType>(
    formData.defaultFilledFormData,
  );
  const [formDataToGenerate, setFormDataToGenerate] =
    useState<FormDataToGenerateType>(formData);

  useEffect(() => {
    setFormCurrentState((prevState) => ({
      ...prevState,
      uploadedFiles: uploadedFiles,
    }));
  }, [uploadedFiles]);

  const generateForm = (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => {
    setFormDataToGenerate(data);
    setFormCurrentState(filledData ?? data.defaultFilledFormData);
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
            generateForm={generateForm}
            formDataToGenerate={formDataToGenerate}
            uploadedFiles={uploadedFiles}
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
