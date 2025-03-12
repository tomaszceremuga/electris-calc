import React from "react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import SelectGroup from "./SelectGroup";
// import SelectMultipleGroup from "./SelectMultipleGroup";

import RadioElements from "./RadioElements";
// import SelectElement from "./SelectElement";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import formData from "~/lib/formData";

const FormSection = () => {
  const defaultMaterial = {
    image: "",
    name: "Unknown",
    infoLink: "#",
    rate: 0,
    rates: 0,
  };
  const defaultData = {
    alertMesage: "",
    categories: [],
    tiles: [],
  };
  return (
    <div className="pr-16">
      {formData.formElements.map((el, index) => {
        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
            break;
          case "radioElements":
            return (
              <RadioElements
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
            break;
          case "textArea":
            return (
              <TextAreaElement
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
            break;
          case "quantity":
            return (
              <QuantityElement
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
            break;
          case "uploadElement":
            return (
              <UploadElement
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
            break;
          case "selectMaterial":
            return (
              <SelectMaterial
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            );
            break;

          default:
            return <p className="bg-red-600">Błędny element</p>;
        }
      })}
    </div>
  );
};

export default FormSection;
