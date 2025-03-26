"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";
import { useFormContext } from "~/lib/FormContext";

const SelectGroup: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  description = "",
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
    <div className="mb-2 flex items-center p-2">
      <div className="flex items-center">
        <p className="items-center whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
          {info && <InfoButton info={info} />}
        </p>
      </div>
      <div className="ml-2">
        <Select value={selectedOption ?? ""} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wybierz opcję" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {description && (
        <p className="ml-5 pt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SelectGroup;
