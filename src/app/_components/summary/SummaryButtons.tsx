import { Button } from "@/components/ui/button";
import OrderDetails from "./OrderDetails";

const SummaryButtons = () => {
  return (
    <div className="flex flex-col gap-2">
      <OrderDetails />
      <Button variant="default">DODAJ KOLEJNY ELEMENT</Button>
      <Button variant="default">PRZEJDŹ DO PŁATNOŚCI</Button>
    </div>
  );
};

export default SummaryButtons;
