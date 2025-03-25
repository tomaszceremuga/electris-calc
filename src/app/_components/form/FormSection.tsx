"use client";

import SelectGroup from "./SelectGroup";
import RadioElements from "./RadioElements";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import type { FilledValueType } from "~/lib/FilledValueType";
import { useFormContext } from "~/lib/FormContext";
import InputNumber from "./InputNumber";
import { useEffect } from "react";
import InputText from "./InputText";

const FormSection = () => {
  const { formDataToGenerate, formCurrentState, setFormCurrentState } =
    useFormContext();

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

  const handleChange = (id: number, value: FilledValueType["value"]) => {
    setFormCurrentState((prev) => ({
      ...prev,
      filledForm: {
        ...prev.filledForm,
        values: prev.filledForm.values.map((item) =>
          item.id === id ? { ...item, value } : item,
        ),
      },
    }));
  };

  useEffect(() => {
    setFormCurrentState((prev) => ({
      ...prev,
      hiddenElements: formDataToGenerate.hiddenElements,
    }));
  }, [formDataToGenerate.hiddenElements, setFormCurrentState]);

  return (
    <div className="xl:pr-16">
      {formDataToGenerate.values.map((el, index) => {
        const filledValue = formCurrentState.filledForm.values.find(
          (item) => item.id === el.id,
        )?.value;

        if (formCurrentState.hiddenElements.includes(el.id)) return null;

        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
                elementsToShow={el.elementsToShow}
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
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
                elementsToShow={el.elementsToShow}
              />
            );
          case "inputNumber":
            return (
              <InputNumber
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
              />
            );
          case "inputText":
            return (
              <InputText
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
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
                description={el.description}
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
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
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
                description={el.description}
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
                filled={
                  typeof filledValue === "object" &&
                  filledValue !== null &&
                  !Array.isArray(filledValue)
                    ? filledValue
                    : {}
                }
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            );

          default:
            return (
              <p key={index} className="bg-red-600">
                Błędny element
              </p>
            );
        }
      })}
      <pre className="bg-yellow-200">
        {JSON.stringify(formCurrentState, null, 2)}
      </pre>
    </div>
  );
};

export default FormSection;
