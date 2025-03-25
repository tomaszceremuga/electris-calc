import React, { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoButton from "./InfoButton";
import { type FormElementsType } from "~/lib/FormElementsType";
import { useFormContext } from "~/lib/FormContext";

const RadioElements: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  options = [""],
  isImportant = false,
  elementsToShow,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    typeof filled === "string" ? filled : null,
  );
  const prevOption = useRef<string | null>(selectedOption);

  const { setFormCurrentState } = useFormContext();

  const handleChange = (value: string) => {
    // Zaktualizuj selectedOption
    setSelectedOption(value);

    // Sprawdź, które elementy mają być pokazane lub ukryte
    elementsToShow?.forEach((el) => {
      if (el.option === value) {
        // Jeśli opcja jest wybrana, pokaż element
        setFormCurrentState((prev) => ({
          ...prev,
          hiddenElements: prev.hiddenElements.filter(
            (item) => item !== el.elementToShow,
          ),
        }));
      } else {
        // Jeśli opcja nie jest wybrana, ukryj element
        setFormCurrentState((prev) => ({
          ...prev,
          hiddenElements: [...prev.hiddenElements, el.elementToShow], // użyj spread operatora
        }));
      }
    });
  };

  useEffect(() => {
    if (prevOption.current !== selectedOption) {
      onChange(id, selectedOption ?? "");
      prevOption.current = selectedOption;
    }
  }, [selectedOption, id, onChange]);

  useEffect(() => {
    setSelectedOption(typeof filled === "string" ? filled : null);
  }, [filled]);

  return (
    <div className="mb-2 p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}
      </div>

      <RadioGroup
        className="ml-5 flex flex-wrap gap-3 pt-2"
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
