"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";

interface Property {
  name: string;
  value: string;
}

interface FloatingCartElementProps {
  name: string;
  image: string;
  properties: Property[];
  quantity: number;
  isLast?: boolean;
  onQuantityChange?: (newQuantity: number) => void;
  onRemove?: () => void;
}

const FloatingCartElement: React.FC<FloatingCartElementProps> = ({
  name,
  image,
  properties,
  quantity,
  isLast = false,
  onQuantityChange,
  onRemove,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [showDetails, setShowDetails] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value));
    setLocalQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className={`py-3 ${!isLast ? "border-b border-border" : ""}`}>
      <div className="flex items-center gap-4">
        <div className="relative size-16 overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={image || "/placeholder.svg?height=64&width=64"}
            alt={name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="whitespace-normal break-words text-sm font-medium text-foreground">
            {name}
          </h3>

          {properties.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 h-6 px-2 text-xs text-muted-foreground"
              onClick={toggleDetails}
            >
              {showDetails ? (
                <span className="flex items-center gap-1">
                  Ukryj szczegóły <ChevronUp size={14} />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Pokaż szczegóły <ChevronDown size={14} />
                </span>
              )}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor={`quantity-${name.replace(/\s+/g, "-")}`}
            className="sr-only"
          >
            Ilość
          </label>
          <button
            className="text-muted-foreground transition hover:text-foreground"
            aria-label="Edytuj element"
          >
            <PencilLine size={16} />
          </button>
          <input
            id={`quantity-${name.replace(/\s+/g, "-")}`}
            type="number"
            min="1"
            value={localQuantity}
            onChange={handleQuantityChange}
            className="h-8 w-14 rounded border border-input bg-background p-0 text-center text-sm [-moz-appearance:_textfield] focus:border-primary focus:ring-1 focus:ring-ring [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />

          <button
            onClick={onRemove}
            className="text-muted-foreground transition hover:text-destructive"
            aria-label="Usuń element"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {showDetails && properties.length > 0 && (
        <div className="mt-2 rounded border border-muted p-4">
          <dl className="space-y-1">
            {properties.map((prop, index) => (
              <div key={index} className="flex text-xs text-muted-foreground">
                <dt className="mr-1 w-1/2 whitespace-normal break-words font-semibold">
                  {prop.name}:
                </dt>
                <dd className="w-1/2 whitespace-normal break-words">
                  {prop.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      )}
      
    </li>
    
  );
};

export default FloatingCartElement;
