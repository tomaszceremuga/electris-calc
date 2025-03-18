"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Clock, Package, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState("express");

  const deliveryOptions = [
    {
      id: "express",
      days: "1 - 2 dni robocze",
      price: 19.99,
      icon: Zap,
      label: "Dostawa ekspresowa",
      description:
        "Dostawa następnego dnia roboczego dla zamówień złożonych do 14:00",
    },
    {
      id: "courier",
      days: "2 - 3 dni robocze",
      price: 14.99,
      icon: Truck,
      label: "Kurier",
      description: "Standardowa przesyłka kurierska",
    },
    {
      id: "parcel",
      days: "2 - 3 dni robocze",
      price: 9.99,
      icon: Package,
      label: "Paczkomat",
      description: "Odbiór w najbliższym paczkomacie",
    },
    {
      id: "economy",
      days: "3 - 5 dni roboczych",
      price: 0,
      icon: Clock,
      label: "Darmowa dostawa",
      description: "Dla zamówień powyżej 200 zł",
    },
  ];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const EstimatedDeliveryDate = (option: string) => {
    const today = new Date();
    let days = 0;

    switch (option) {
      case "express":
        days = 2;
        break;
      case "courier":
      case "parcel":
        days = 3;
        break;
      case "economy":
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
        defaultValue="express"
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
                  <div className="text-right">
                    {option.price > 0 ? (
                      <p className="font-medium">
                        {option.price.toFixed(2)} zł
                      </p>
                    ) : (
                      <p className="font-medium text-primary">Za darmo</p>
                    )}
                  </div>
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
