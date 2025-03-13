import React from "react";

import { Toggle } from "@/components/ui/toggle";
import InfoButton from "./InfoButton";
import { type formElementsInterface } from "~/lib/formElementsInterface";

const SelectMultipleGroup: React.FC<formElementsInterface> = ({
  id,
  onChange,
  name,
  info = "",
  options = [""],
  isImportant = false,
}) => {
  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-2">
        <div className="flex items-center">
          <p className="whitespace-nowrap p-[6px] text-base">
            {isImportant && <span className="mr-1 text-red-500">*</span>}
            {name}
          </p>
          {info && <InfoButton info={info} />}{" "}
        </div>
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
