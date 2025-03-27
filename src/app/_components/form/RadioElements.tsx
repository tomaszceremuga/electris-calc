"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";
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

  const showElements = (value: string) => {
    console.log("pokazyheny element");
    if (!elementsToShow) return;

    const elementsToShowSet = new Set();
    elementsToShow.forEach((el) => {
      if (el.option === value) {
        elementsToShowSet.add(el.elementToShow);
      }
    });

    setFormCurrentState((prev) => {
      const newHiddenElements = [...prev.hiddenElements];

      elementsToShow.forEach((el) => {
        const elementId = el.elementToShow;
        const shouldShow = elementsToShowSet.has(elementId);

        if (shouldShow) {
          const index = newHiddenElements.indexOf(elementId);
          if (index !== -1) {
            newHiddenElements.splice(index, 1);
          }
        } else {
          if (!newHiddenElements.includes(elementId)) {
            newHiddenElements.push(elementId);
          }
        }
      });

      return {
        ...prev,
        hiddenElements: newHiddenElements,
      };
    });
  };

  const handleChange = (value: string) => {
    setSelectedOption(value);
    showElements(value);
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
        className="ml-2 flex flex-wrap gap-3 pt-2 md:ml-5"
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
