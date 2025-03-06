import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SelectGroup from "./SelectGroup";
import SelectMultipleGroup from "./SelectMultipleGroup";

import RadioElements from "./RadioElements";

const FormSection = () => {
  return (
    <div className="pr-16">
      <SelectGroup
        name="Wybierz cosia"
        options={["cos", "cos1", "cos2", "cos3"]}
      />
      <RadioElements
        name="Wybierz opcje"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis libero in ullamcorper iaculis."
        options={["cos", "cos1", "cos2"]}
      />
      <SelectMultipleGroup
        name="Wybierz kilka cosiów"
        options={["cos", "cos1", "cos2", "cos2"]}
        isImportant={true}
      />
    </div>
  );
};

export default FormSection;
