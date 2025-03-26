"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryOptionsProps {
  onOptionChange?: (option: string) => void;
}

const DeliveryOptions = ({ onOptionChange }: DeliveryOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState("exw");

  const deliveryOptions = [
    {
      id: "exw",
      days: "Odbiór własny",
      price: 0,
      icon: Package,
      label: "EXW (Ex Works)",
      description: "Odbiór własny z naszego magazynu",
    },
    {
      id: "dap",
      days: "2 - 5 dni roboczych",
      price: 19.99,
      icon: Truck,
      label: "DAP (Delivered at Place)",
      description: "Dostawa do wskazanego miejsca",
    },
  ];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (onOptionChange) {
      onOptionChange(value);
    }
  };

  const EstimatedDeliveryDate = (option: string) => {
    const today = new Date();
    let days = 0;

    switch (option) {
      case "exw":
        return "Dostępne od zaraz";
      case "dap":
        days = 5;
        break;
      default:
        days = 3;
    }

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + days);

    return deliveryDate.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Wybierz sposób dostawy</h3>
        <p className="text-sm text-muted-foreground">
          Wszystkie przesyłki są ubezpieczone
        </p>
      </div>

      <RadioGroup
        defaultValue="exw"
        value={selectedOption}
        onValueChange={handleOptionChange}
        className="space-y-3"
      >
        {deliveryOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex cursor-pointer items-start rounded-lg border-2 p-4 transition-all hover:bg-accent",
                selectedOption === option.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border",
              )}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="sr-only"
              />
              <Icon
                className={cn(
                  "mt-1 h-5 w-5 shrink-0",
                  selectedOption === option.id
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              />
              <div className="ml-4 flex flex-1 flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{option.label}</p>
                  {/* <div className="text-right">
                    {option.price > 0 ? (
                      <p className="font-medium">
                        {option.price.toFixed(2)} zł
                      </p>
                    ) : (
                      <p className="font-medium text-primary">Za darmo</p>
                    )}
                  </div> */}
                </div>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Czas dostawy: {option.days}
                </p>
              </div>
            </Label>
          );
        })}
      </RadioGroup>

      <div className="rounded-lg bg-accent/50 p-4">
        <p className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Przewidywana data dostawy:
          </span>
          <span className="font-medium">
            {EstimatedDeliveryDate(selectedOption)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryOptions;
