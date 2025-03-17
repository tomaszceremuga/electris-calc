import React, { useEffect, useState } from "react";

import SelectGroup from "./SelectGroup";
import RadioElements from "./RadioElements";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import formData from "~/lib/formData";
import { type UploadedFile } from "~/lib/UploadedFileType";
import { type FilledFormType } from "~/lib/FilledFormType";

type FormSectionProps = {
  filledFormData: FilledFormType;
  uploadedFiles: UploadedFile[];
  formCurrentState: FilledFormType;
  setFormCurrentState: React.Dispatch<React.SetStateAction<FilledFormType>>;
};

const FormSection = ({
  filledFormData,
  uploadedFiles,
  formCurrentState,
  setFormCurrentState,
}: FormSectionProps) => {
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

  const handleChange = (id: number, value: unknown) => {
    setFormCurrentState((prev) => ({
      ...prev,
      values: prev.values.map((item) =>
        item[id] !== undefined ? { ...item, [id]: value } : item,
      ),
    }));
  };

  return (
    <div className="xl:pr-16">
      {formData.formElements.map((el, index) => {
        const filledValue = filledFormData.values.find((item) => item[el.id])?.[
          el.id
        ];

        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "radioElements":
            return (
              <RadioElements
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "textArea":
            return (
              <TextAreaElement
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "quantity":
            return (
              <QuantityElement
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "uploadElement":
            return (
              <UploadElement
                id={el.id}
                onChange={handleChange}
                filled={Array.isArray(filledValue) ? filledValue : []}
                name={el.name}
                info={el.info}
                description={el.decription}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "selectMaterial":
            return (
              <SelectMaterial
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue == "object" ? filledValue : {}}
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            );

          default:
            return <p className="bg-red-600">Błędny element</p>;
        }
      })}

      <pre className="bg-purple-300">
        {JSON.stringify(formCurrentState, null, 2)}
      </pre>
    </div>
  );
};

export default FormSection;
