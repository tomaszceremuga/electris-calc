import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadSection from "./UploadSection";
import FormSection from "./FormSection";
import SummarySection from "./SummarySection";

export function MainAccordion() {
  return (
    <div>
      <Accordion type="single" collapsible>
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
