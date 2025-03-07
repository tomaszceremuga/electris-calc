import React from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoButton from "./InfoButton";

interface RadioElementsProps {
  name: string;
  description?: string;
  info?: string;
  options: string[];
  isImportant?: boolean;
}

const RadioElements: React.FC<RadioElementsProps> = ({
  name,
  description = "",
  info = "",
  options,
  isImportant = false,
}) => {
  return (
    <div className="mb-5 p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info != "" && <InfoButton info={info} />}{" "}
      </div>
      {description != "" && (
        <p className="ml-5 pb-1 text-neutral-500">{description}</p>
      )}
      <RadioGroup className="ml-5 flex pt-2" defaultValue="option-0">
        {options.map((option, index) => (
          <div key={index} className="mr-3 flex items-center space-x-2">
            <RadioGroupItem value={`option-${index}`} id={`option-${index}`} />
            <Label htmlFor="option-two">{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioElements;
