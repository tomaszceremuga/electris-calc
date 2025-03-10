"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import OrderDetails from "./OrderDetails";

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState("option-one");

  const deliveryOptions = [
    { id: "option-one", days: "3 - 5 dni", price: 15.99 },
    { id: "option-two", days: "6 - 10 dni", price: 9.99 },
    { id: "option-three", days: "< 14 dni", price: 0 },
  ];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const EstimatedDeliveryDate = (option: string) => {
    const today = new Date();
    let day = 0;

    switch (option) {
      case "option-one":
        day = 5;
        break;
      case "option-two":
        day = 10;
        break;
      case "option-three":
        day = 14;
        break;
      default:
        day = 5;
    }

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + day);

    return deliveryDate.toLocaleDateString("pl-PL");
  };

  return (
    <div>
      <h3 className="mb-5 text-xl font-semibold text-neutral-700">
        Opcje Dostawy
      </h3>

      <RadioGroup
        defaultValue="option-one"
        value={selectedOption}
        onValueChange={handleOptionChange}
      >
        {deliveryOptions.map((option) => (
          <div key={option.id} className="mb-3 flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="text-lg font-semibold">
              {option.days}
              {option.price > 0 && (
                <span className="text-xs text-neutral-500">{`(+ ${option.price.toFixed(2)} zł)`}</span>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4 text-sm text-neutral-600">
        <p>
          Szacowana data dostawy:{" "}
          <span className="font-medium">
            {EstimatedDeliveryDate(selectedOption)}
          </span>
        </p>
      </div>
      {/* <OrderDetails /> */}
    </div>
  );
};

export default DeliveryOptions;
