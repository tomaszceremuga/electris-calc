import React, { useState, useEffect, useRef } from "react";
import InfoButton from "./InfoButton";
import { type FormElementsType } from "~/lib/FormElementsType";

const SelectGroup: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  options = [""],
  isImportant = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    typeof filled == "string" ? filled : null,
  );
  const prevOption = useRef<string | null>(selectedOption);

  const handleClick = (option: string) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  useEffect(() => {
    if (prevOption.current !== selectedOption) {
      onChange(id, selectedOption ?? "");
      prevOption.current = selectedOption;
    }
  }, [selectedOption, id, onChange, filled]);

  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-x-2">
        <div className="flex items-center">
          <p className="flex items-center whitespace-nowrap p-[6px] text-base">
            {isImportant && <span className="mr-1 text-red-500">*</span>}
            {name}
          </p>
          {info && <InfoButton info={info} />}
        </div>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={`${
              selectedOption === option
                ? "bg-accent-foreground text-accent"
                : "hover:bg-muted hover:text-muted-foreground"
            } my-1 inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectGroup;
