import React, { useState, useEffect, useRef } from "react";
import InfoButton from "./InfoButton";
import { type FormElementsType } from "~/lib/FormElementsType";
// import { useFormContext } from "~/lib/FormContext";
import LoadedElement from "./LoadedElement";

const InputText: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  isLoaded,
  isImportant = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(
    typeof filled === "string" ? filled : "",
  );
  const prevValue = useRef<string>(inputValue);
  //   const { setFormCurrentState } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    if (prevValue.current !== inputValue) {
      onChange(id, inputValue);
      prevValue.current = inputValue;
    }
  }, [inputValue, id, onChange, filled]);

  useEffect(() => {
    setInputValue(typeof filled === "string" ? filled : "");
  }, [filled]);

  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-x-2">
        <div className="flex items-center">
          <p className="flex items-center whitespace-nowrap p-[6px] text-base">
            {isImportant && <span className="mr-1 text-red-500">*</span>}
            {name}
          </p>
          {isLoaded && <LoadedElement />} {info && <InfoButton info={info} />}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="rounded-md border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        />
      </div>
    </div>
  );
};

export default InputText;
