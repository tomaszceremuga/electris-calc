import React from "react";
import { Textarea } from "@/components/ui/textarea";
import InfoButton from "./InfoButton";
import { type formElementsInterface } from "~/lib/FormElementsType";

const TextAreaElement: React.FC<formElementsInterface> = ({
  id,
  onChange,
  filled,
  name,
  info = "",
  isImportant = false,
}) => {
  return (
    <div className="p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}{" "}
      </div>
      <Textarea
        onChange={(e) => onChange(id, e.target.value)}
        defaultValue={filled}
        className="my-[8px] xl:ml-[20px]"
      />
    </div>
  );
};

export default TextAreaElement;
