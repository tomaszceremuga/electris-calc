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

  const [formResult, setFormResult] = useState<FormResultState>({
    id: formData.id,
    values: [],
  });

  useEffect(() => {
    const initialState: FormResultState = {
      id: formData.id,
      values: formData.formElements.map((element) => ({ [element.id]: "" })),
    };

    setFormResult(initialState);
  }, []);

  const handleChange = (id: number, value: string) => {
    setFormResult((prev) => ({
      ...prev,
      values: prev.values.map((item) =>
        item[id] !== undefined ? { ...item, [id]: value } : item,
      ),
    }));
  };

  return (
    <div className="pr-16">
      {formData.formElements.map((el, index) => {
        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                id={el.id}
                onChange={handleChange}
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
                id={el.id}
                onChange={handleChange}
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
                id={el.id}
                onChange={handleChange}
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
                id={el.id}
                onChange={handleChange}
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
                id={el.id}
                onChange={handleChange}
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
                id={el.id}
                onChange={handleChange}
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

      <pre className="bg-purple-300">{JSON.stringify(formResult, null, 2)}</pre>
    </div>
  );
};

export default FormSection;
