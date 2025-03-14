

import React, { useEffect, useState } from "react";

import SelectGroup from "./SelectGroup";
import RadioElements from "./RadioElements";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import formData from "~/lib/formData";

type FormResultState = {
  id: number;
  values: Record<number, string>[]; 
};

type FilledFormData = {
  id: number;
  values: Array<Record<string, string>>;
};

type FormSectionProps = {
  filledFormData: FilledFormData;
};

const FormSection = ({ filledFormData }: FormSectionProps) => {
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

  const [formResult, setFormResult] = useState<FormResultState>({
    id: formData.id,
    values: [],
  });

 
  useEffect(() => {
    const initialState: FormResultState = {
      id: formData.id,
      values: formData.formElements.map((element) => {

        const filledValue = filledFormData.values.find(
          (item) => item[element.id],
        );
        return {
          [element.id]: filledValue ? (filledValue[element.id] ?? "") : "", 
        };
      }),
    };

    setFormResult(initialState);
  }, [filledFormData]);


  const handleChange = (id: number, value: string) => {
    setFormResult((prev) => ({
      ...prev,
      values: prev.values.map((item) =>
        item[id] !== undefined ? { ...item, [id]: value } : item,
      ),
    }));
  };

  return (
    <div className="xl:pr-16">
      {formData.formElements.map((el, index) => {
        const filledValue =
          filledFormData.values.find((item) => item[el.id])?.[el.id] ?? ""; 

        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                id={el.id}
                onChange={handleChange}
                filled={filledValue}
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
                filled={filledValue}
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
                filled={filledValue}
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
                filled={filledValue}
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
                filled={filledValue}
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
                filled={filledValue}
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            );
          default:
            return <p className="bg-red-600">Błędny element</p>;
        }
      })}

      <pre className="bg-purple-300">{JSON.stringify(formResult, null, 2)}</pre>
    </div>
  );
};

export default FormSection;
