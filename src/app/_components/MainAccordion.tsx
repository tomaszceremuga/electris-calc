import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadSection from "./upload/UploadSection";
import FormSection from "./form/FormSection";
import SummarySection from "./summary/SummarySection";

export function MainAccordion() {
  return (
    <div className="h-min w-full max-w-4xl rounded-lg border bg-white p-8 shadow-sm">
      <Accordion defaultValue="item-1" type="single" collapsible>
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger>Pliki</AccordionTrigger>
          <AccordionContent>
            <UploadSection />
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
