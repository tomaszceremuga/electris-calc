"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadSection from "./upload/UploadSection";
import FormSection from "./form/FormSection";
import SummarySection from "./summary/SummarySection";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function MainAccordion() {
  const [openedItem, setOpenedItem] = useState(1);

  return (
    <div className="h-min w-full max-w-4xl rounded-lg border bg-white p-8 shadow-sm">
      <Accordion
        value={`item-${openedItem}`}
        defaultValue="item-1"
        type="single"
        collapsible
      >
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger>Pliki</AccordionTrigger>
          <AccordionContent>
            <UploadSection setOpenedItem={setOpenedItem} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-b">
          <AccordionTrigger>Formularz</AccordionTrigger>
          <AccordionContent>
            <FormSection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Podsumowanie</AccordionTrigger>
          <AccordionContent>
            <SummarySection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
