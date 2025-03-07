import React from "react";

import InfoButton from "./InfoButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectGroupProps {
  name: string;
  info?: string;
  options: string[];
  isImportant?: boolean;
}

const SelectElement: React.FC<SelectGroupProps> = ({
  name,
  info = "",
  options,
  isImportant = false,
}) => {
  return (
    <div>
      <div className="mb-3 mt-2 flex flex-wrap items-center">
        <div className="ml-2 w-full">
          <div className="flex items-center">
            <p className="flex flex-wrap items-center whitespace-nowrap text-wrap p-[6px] text-base">
              {isImportant && <span className="mr-1 text-red-500">*</span>}
              {name}
            </p>
            {info != "" && <InfoButton info={info} />}
          </div>
          <div className="ml-5 w-full max-w-80">
            <Select>
              <SelectTrigger className="w-full max-w-80">
                <SelectValue placeholder="Wybierz opcję..." />
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
        </div>
      </div>
    </div>
  );
};

export default SelectElement;
