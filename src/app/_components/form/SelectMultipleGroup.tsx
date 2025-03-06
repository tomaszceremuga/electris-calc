import React from "react";

import { Toggle } from "@/components/ui/toggle";

interface SelectGroupProps {
  name: string;
  options: string[];
  isImportant?: boolean;
}

const SelectMultipleGroup: React.FC<SelectGroupProps> = ({
  name,
  options,
  isImportant = false,
}) => {
  return (
    <div className="mb-3 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-2">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {options.map((option, index) => (
          <Toggle key={index} size="sm" variant={"outline"}>
            {option}
          </Toggle>
        ))}
      </div>
    </div>
  );
};

export default SelectMultipleGroup;
