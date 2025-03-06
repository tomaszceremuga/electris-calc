import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UploadSection from "./UploadSection";

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
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Podsumowanie</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
