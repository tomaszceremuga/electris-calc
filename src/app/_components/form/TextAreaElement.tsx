import React from "react";
import { Textarea } from "@/components/ui/textarea";
import InfoButton from "./InfoButton";
import { formElementsInterfaces } from "@/lib/formElementsInterfaces";

const TextAreaElement: React.FC<formElementsInterfaces> = ({
  name,
  info = "",
  options = [""],
  isImportant = false,
  description = [""],
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
      <Textarea className="my-[8px] ml-[20px]" />
    </div>
  );
};

export default TextAreaElement;
