import React, { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoButton from "./InfoButton";
import { type formElementsInterface } from "~/lib/formElementsInterface";

const RadioElements: React.FC<formElementsInterface> = ({
  id,
  onChange,
  name,
  info = "",
  options = [""],
  isImportant = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const prevOption = useRef<string | null>(selectedOption);

  const handleChange = (value: string) => {
    if (prevOption.current !== value) {
      setSelectedOption(value);
    }
  };

  useEffect(() => {
    if (prevOption.current !== selectedOption) {
      onChange(id, selectedOption ?? "");
      prevOption.current = selectedOption;
    }
  }, [selectedOption, id, onChange]);

  return (
    <div className="mb-5 p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}
      </div>

      <RadioGroup
        className="ml-5 flex pt-2"
        value={selectedOption ?? ""}
        onValueChange={handleChange}
      >
        {options.map((option, index) => (
          <div key={index} className="mr-3 flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={`option-${index}`}
              checked={selectedOption === option}
            />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioElements;
