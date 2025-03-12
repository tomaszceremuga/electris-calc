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

export default function AccordionWithNavigation() {
  const [activeIndex, setActiveIndex] = useState<string>("item-0");

  const handleNavigation = (targetIndex: string) => {
    setActiveIndex(targetIndex);
  };

  return (
    <Accordion
      type="single"
      value={activeIndex}
      onValueChange={setActiveIndex}
      collapsible
      className="w-full max-w-4xl"
    >
      {/* Upload Section */}
      <AccordionItem
        value="item-0"
        className="mb-2 rounded-md border bg-white p-2"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Prześlij pliki</span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <UploadSection />
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
        className="mb-2 rounded-md border bg-white p-2"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Formularz</span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <FormSection />
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
        className="mb-2 rounded-md border bg-white p-2"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Podsumowanie</span>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
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
