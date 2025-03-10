import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrderDetails from "./OrderDetails";

const DeliveryOptions = () => {
  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold text-neutral-700">
        Opcje Dostawy
      </h3>

      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one" className="text-lg font-semibold">
            3 - 5 dni <span className="text-xs text-neutral-500">(+ x zł)</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two" className="text-lg font-semibold">
            6 - 10 dni
            <span className="text-xs text-neutral-500">(+ x zł)</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three" className="md: text-lg font-semibold">
            &lt; 14 dni
          </Label>
        </div>
      </RadioGroup>
      <OrderDetails />
    </div>
  );
};

export default DeliveryOptions;
