"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";

const InputNumber: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  isImportant = false,
}) => {
  const [currentValue, setCurrentValue] = useState<number | "">("");

  useEffect(() => {
    if (typeof filled === "number") {
      setCurrentValue(filled);
    } else if (
      typeof filled === "string" &&
      !isNaN(Number.parseInt(filled, 10))
    ) {
      setCurrentValue(Number.parseInt(filled, 10));
    } else {
      setCurrentValue("");
    }
  }, [filled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setCurrentValue("");
    } else {
      const numValue = Number.parseInt(value, 10);
      if (!isNaN(numValue)) {
        setCurrentValue(numValue);
      }
    }
  };

  const handleBlur = () => {
    onChange(id, currentValue);
  };

  return (
    <div className="p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}{" "}
      </div>
      <Input
        type="number"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        step="1"
        className="mb-[8px] mt-1 w-32 xl:ml-[20px]"
      />
    </div>
  );
};

export default InputNumber;
