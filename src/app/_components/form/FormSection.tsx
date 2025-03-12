import React from "react";

import SelectGroup from "./SelectGroup";
import SelectMultipleGroup from "./SelectMultipleGroup";

import RadioElements from "./RadioElements";
import SelectElement from "./SelectElement";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

const FormSection = () => {
  return (
    <div className="pr-16">
      <SelectGroup
        name="jestesmy na devie 12211212"
        info="jakas informacja wazna"
        options={["cos", "cos1", "cos2", "cos3"]}
      />
      <SelectGroup
        name="Wybierz cosia"
        info="jakas informacja wazna"
        options={["cos", "cos1", "cos2", "cos3"]}
      />
      <RadioElements
        name="Wybierz opcje"
        info="no spoko"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis libero in ullamcorper iaculis."
        options={["cos", "cos1", "cos2"]}
      />
      <SelectMultipleGroup
        name="Wybierz kilka cosiów"
        options={["cos", "cos1", "cos2", "cos3"]}
        isImportant={true}
      />
      <SelectElement
        name="cos"
        options={["cos", "cos1", "cos2", "cos3"]}
        info="cos cos cos"
        isImportant={true}
      />
      <TextAreaElement name="wpisz cos" info="no" />
      <SelectMaterial data={[]} />
      <UploadElement
        name="Prześlij rysunek"
        info="cos tu jest cos tu jest cos tu jest"
        description="Prześlij jakiś bardzo fajny rysunek"
      />
      <QuantityElement name="Podaj ilość" />
    </div>
  );
};

export default FormSection;
