import React from "react";

import SelectGroup from "./SelectGroup";
import RadioElements from "./RadioElements";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import { type UploadedFile } from "~/lib/UploadedFileType";
import { type FilledFormType } from "~/lib/FilledFormType";
import { type FilledValueType } from "~/lib/FilledValueType";
import { type FormDataToGenerateType } from "~/lib/FormDataToGenerateType";
import { Button } from "~/components/ui/button";

type FormSectionProps = {
  generateForm: (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => void;

  formDataToGenerate: FormDataToGenerateType;
  uploadedFiles: UploadedFile[];
  formCurrentState: FilledFormType;
  setFormCurrentState: React.Dispatch<React.SetStateAction<FilledFormType>>;
};

const FormSection = ({
  generateForm,
  formDataToGenerate,
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

  const handleChange = (id: number, value: FilledValueType["value"]) => {
    setFormCurrentState((prev) => ({
      ...prev,
      values: prev.values.map((item) =>
        item.id === id ? { ...item, value } : item,
      ),
    }));
  };

  return (
    <div className="xl:pr-16">
      {formDataToGenerate.values.map((el, index) => {
        const filledValue = formCurrentState.values.find(
          (item) => item.id === el.id,
        )?.value;
        console.log("");
        console.log("");
        console.log("");

        console.log("wartość do wypełnieina ");
        console.log(filledValue);

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
      <pre className="rounded-md bg-purple-300 p-2">
        {JSON.stringify(formCurrentState, null, 2)}
      </pre>
      <Button
        onClick={() => {
          generateForm(
            {
              id: 1,
              calculation: {
                price: " id pola od ilosci * 1.2 + surfaceTreatment * 0.8",
                deliveryDate: "quantity < 100 ? 14 : 31",
              },
              values: [
                {
                  id: 1,
                  type: "quantity",
                  name: "Ilość",
                  info: "",
                  description: "",
                  options: [],
                  isImportant: true,
                },
                {
                  id: 2,
                  type: "selectGroup",
                  name: "Jednostki",
                  info: "",
                  description: "",
                  options: ["mm", "inch", "cm"],
                  isImportant: false,
                },
                {
                  id: 4,
                  type: "selectGroup",
                  name: "Rodzaj aluminium",
                  info: "",
                  description: "",
                  options: ["Aluminium 5052", "Aluminium 6061"],
                  isImportant: false,
                },
                {
                  id: 5,
                  type: "selectGroup",
                  name: "Kolory",
                  info: "",
                  description: "",
                  options: ["Srebrno-biały"],
                  isImportant: false,
                },
                {
                  id: 6,
                  type: "selectGroup",
                  name: "Grubość",
                  info: "",
                  description: "",
                  options: [
                    "0.8mm",
                    "1.0mm",
                    "1.2mm",
                    "1.5mm",
                    "2.0mm",
                    "2.5mm",
                    "3.0mm",
                    "4.0mm",
                  ],
                  isImportant: true,
                },
                {
                  id: 777,
                  type: "selectMaterial",
                  selectedMaterial: {
                    image:
                      "https://pcbwayfile.s3-us-west-2.amazonaws.com/web/20/12/10/2226459873337t.jpg",
                    name: "Aluminum 12125052",
                    infoLink: "#",
                    rate: 4.9,
                    rates: 2051,
                  },
                  data: {
                    alertMesage: "Uważaj aby wybrać coś tam",

                    categories: [
                      {
                        id: "surface",
                        name: "Powierzchnia",
                        options: [
                          { id: "standard", name: "Standardowa (Frezowana)" },
                          { id: "anodized", name: "Anodowana" },
                          { id: "brushed", name: "Szczotkowana" },
                          { id: "bead-blast", name: "Piaskowana" },
                          {
                            id: "spray-painting",
                            name: "Malowanie natryskowe",
                          },
                          { id: "powder-coat", name: "Malowanie proszkowe" },
                          {
                            id: "spray-plating",
                            name: "Natryskowe powlekanie",
                          },
                          { id: "detail-sanding", name: "Szlifowanie detali" },
                        ],
                      },
                    ],
                    tiles: [
                      {
                        id: "bead-blast-anodized",
                        categoryId: "surface",
                        name: "Piaskowanie + Anodowanie",
                        description:
                          "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium. A dzięki piaskowaniu powierzchnia części pozostaje gładka, z matowym wyglądem.",
                        image: "/placeholder.svg?height=150&width=250",
                        colors: [
                          "blue",
                          "black",
                          "gray",
                          "yellow",
                          "orange",
                          "red",
                          "teal",
                          "purple",
                          "brown",
                          "beige",
                        ],
                        requiredOption: "anodized",
                      },
                      {
                        id: "bead-blast-anodized12",
                        categoryId: "surface",
                        name: "Piaskowanie + b;lblblblb",
                        description:
                          "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium. A dzięki piaskowaniu powierzchnia części pozostaje gładka, z matowym wyglądem.",
                        image: "/placeholder.svg?height=150&width=250",
                        colors: [
                          "blue",
                          "black",
                          "gray",
                          "yellow",
                          "orange",
                          "red",
                          "teal",
                          "purple",
                          "brown",
                          "beige",
                        ],
                        requiredOption: "anodized",
                      },

                      {
                        id: "anodized-simple",
                        categoryId: "surface",
                        name: "Anodowanie",
                        description:
                          "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium.",
                        image: "/placeholder.svg?height=150&width=250",
                        colors: [
                          "blue",
                          "black",
                          "gray",
                          "yellow",
                          "orange",
                          "red",
                          "teal",
                          "purple",
                          "brown",
                          "beige",
                        ],
                        requiredOption: "anodized",
                      },
                      {
                        id: "standard-finish",
                        categoryId: "surface",
                        name: "Wykończenie standardowe",
                        description:
                          "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania.",
                        image: "/placeholder.svg?height=150&width=250",
                        colors: [],
                        requiredOption: "standard",
                      },
                      {
                        id: "brushed-finish",
                        categoryId: "surface",
                        name: "Wykończenie szczotkowane",
                        description:
                          "Wykończenie szczotkowane tworzy serię drobnych linii na powierzchni, nadając jej charakterystyczny wygląd i teksturę.",
                        image: "/placeholder.svg?height=150&width=250",
                        colors: [],
                        requiredOption: "brushed",
                      },
                    ],
                  },
                },
              ],
              defaultFilledFormData: {
                id: 1,
                uploadedFiles: [],
                values: [
                  {
                    id: 1,
                    value: 123,
                  },
                  {
                    id: 2,
                    value: "inch",
                  },
                  {
                    id: 4,
                    value: "Aluminium 5052",
                  },
                  {
                    id: 5,
                    value: "Srebrno-biały",
                  },
                  {
                    id: 6,
                    value: "0.8mm",
                  },
                  {
                    id: 777,
                    value: {
                      category: "surface",
                      option: "anodized",
                      tile: "anodized-simple",
                      color: "black",
                    },
                  },
                ],
              },
            },

            {
              id: 1,
              uploadedFiles: [],
              values: [
                {
                  id: 1,
                  value: 5,
                },
                {
                  id: 2,
                  value: "cm",
                },
                {
                  id: 4,
                  value: "Aluminium 6061",
                },
                {
                  id: 5,
                  value: "Srebrno-biały",
                },
                {
                  id: 6,
                  value: "4.0mm",
                },
                {
                  id: 777,
                  value: {
                    category: "surface",
                    option: "anodized",
                    tile: "anodized-simple",
                    color: "yellow",
                  },
                },
              ],
            },
          );
        }}
      >
        generuj formularz
      </Button>
    </div>
  );
};

export default FormSection;
