import { Button } from "@/components/ui/button";

const SummaryButtons = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">DODAJ KOLEJNY ELEMENT</Button>
      <Button variant="default">PRZEJDŹ DO PŁATNOŚCI</Button>
    </div>
  );
};

export default SummaryButtons;
