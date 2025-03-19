"use client"

import SelectGroup from "./SelectGroup"
import RadioElements from "./RadioElements"
import TextAreaElement from "./TextAreaElement"
import UploadElement from "./UploadElement"
import QuantityElement from "./QuantityElement"
import SelectMaterial from "./SelectMaterial"

// import type { UploadedFile } from "~/lib/UploadedFileType"
import type { FilledValueType } from "~/lib/FilledValueType"
import { Button } from "~/components/ui/button"
import { useFormContext } from "~/lib/FormContext"

// type FormSectionProps = {
//   uploadedFiles: UploadedFile[]
// { uploadedFiles }: FormSectionProps
// }

const FormSection = () => {
  // Get form state and functions from context instead of props
  const { generateForm, formDataToGenerate, formCurrentState, setFormCurrentState } = useFormContext()

  const defaultMaterial = {
    image: "",
    name: "Unknown",
    infoLink: "#",
    rate: 0,
    rates: 0,
  }
  const defaultData = {
    alertMesage: "",
    categories: [],
    tiles: [],
  }

  const handleChange = (id: number, value: FilledValueType["value"]) => {
    setFormCurrentState((prev) => ({
      ...prev,
      values: prev.values.map((item) => (item.id === id ? { ...item, value } : item)),
    }))
  }

  return (
    <div className="xl:pr-16">
      {formDataToGenerate.values.map((el, index) => {
        const filledValue = formCurrentState.values.find((item) => item.id === el.id)?.value
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
            )
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
            )
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
            )
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
            )
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
            )
          case "selectMaterial":
            return (
              <SelectMaterial
                id={el.id}
                onChange={handleChange}
                filled={
                  typeof filledValue === "object" && filledValue !== null && !Array.isArray(filledValue)
                    ? filledValue
                    : {}
                }
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            )

          default:
            return (
              <p key={index} className="bg-red-600">
                Błędny element
              </p>
            )
        }
      })}
      <pre className="rounded-md bg-purple-300 p-2">{JSON.stringify(formCurrentState, null, 2)}</pre>
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
                  options: ["0.8mm", "1.0mm", "1.2mm", "1.5mm", "2.0mm", "2.5mm", "3.0mm", "4.0mm"],
                  isImportant: true,
                },
                {
                  id: 777,
                  type: "selectMaterial",
                  selectedMaterial: {
                    image: "https://pcbwayfile.s3-us-west-2.amazonaws.com/web/20/12/10/2226459873337t.jpg",
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
                {
                  id: 8,
                  type: "uploadElement",
                  name: "Rysunek techiczny",
                  info: "",
                  description: "",
                  options: [],
                  isImportant: false,
                },
                {
                  id: 9,
                  type: "radioElements",
                  name: "Czy Twoje części wymagają gwintowania?",
                  info: "",
                  description:
                    "Proszę określić, czy Twoja część ma gwinty wewnętrzne lub zewnętrzne.Nie ponosimy żadnego ryzyka montażowego, jeśli jest to niestandardowy gwint, chyba że wszystkie części montażowe są tutaj produkowane i montowane.",
                  options: ["Nie", "Tak"],
                  isImportant: true,
                },
                {
                  id: 10,
                  type: "radioElements",
                  name: "Wkładki",
                  info: "",
                  description: "Proszę podać standardowe wkładki stosowane w  części.",
                  options: ["Nie", "Tak"],
                  isImportant: true,
                },
                {
                  id: 11,
                  type: "radioElements",
                  name: "Tolerancja",
                  info: "",
                  description:
                    "Tolerancje będą kontrolowane zgodnie z normą ISO 2768-1. W przypadku innych, węższych tolerancji, wymagany będzie rysunek techniczny w celu wskazania krytycznych wymiarów.",
                  options: ["Nie są wymagane żadne węższe tolerancje (ISO 2768-1)", "Wymagane są węższe tolerancje"],
                  isImportant: true,
                },
                {
                  id: 12,
                  type: "radioElements",
                  name: "Spawanie",
                  info: "",
                  description: "",
                  options: ["Nie", "Tak"],
                  isImportant: true,
                },
                {
                  id: 13,
                  type: "radioElements",
                  name: "Oznaczenie części",
                  info: "Proszę wyraźnie oznaczyć zawartość sitodruku lub grawerunku laserowego w pliku CAD (DWG lub DXF). Wymagany jest również plik graficzny (Ai lub SVG).",
                  description: "",
                  options: ["Sitodruk", "Grawerowanie laserowe"],
                  isImportant: false,
                },
                {
                  id: 14,
                  type: "radioElements",
                  name: "Montaż części",
                  info: "Jeśli wybierzesz [Test montażu], wymagany jest rysunek 2D z instrukcjami montażu. Wyniki testu montażu zostaną przesłane e-mailem. Domyślnie zostanie wykonany tylko test. Jeśli musisz wysłać je po montażu, wybierz [Wyślij w montażu].",
                  description:
                    "Proszę określić wymagania dotyczące montażu. PCBWay nie ponosi żadnego ryzyka związanego z montażem, jeśli wybierzesz opcję Brak wymagań dotyczących montażu.",
                  options: ["Nie", "Testy montażowe", "Dostawa w formie zmontowanej"],
                  isImportant: true,
                },
                {
                  id: 15,
                  type: "radioElements",
                  name: "Wygląd końcowy",
                  info: "",
                  description: "",
                  options: ["Standard", "Premium (dodatkowe opłaty)"],
                  isImportant: false,
                },
                {
                  id: 16,
                  type: "radioElements",
                  name: "Kontrola",
                  info: "",
                  description:
                    "Raport z inspekcji nie zostanie wysłany wraz z częściami, chyba że będzie Ci potrzebny.",
                  options: [
                    "Standardowa inspekcja (brak raportu)",
                    "Standardowa inspekcja z formalnym raportem",
                    "Inspekcja CMM z formalnym raportem",
                    "Certyfikacja materiału źródłowego",
                  ],
                  isImportant: false,
                },
                {
                  id: 17,
                  type: "selectGroup",
                  name: "Opis produktu",
                  info: "Opis produktu wymagany do odprawy celnej:1. Przestrzegaj zasad handlu międzynarodowego i podaj opisy produktów do odprawy celnej.2. Wybierz prawidłowy opis produktu zgodnie z rzeczywistym zastosowaniem produktu. Jeśli nie ma pasującego elementu, wybierz Inne.",
                  description: "",
                  options: [
                    "Sprzęt biurowy i akcesoria",
                    "Pojazdy i akcesoria",
                    "Rozrywka DIY",
                    "Sprzęt audio i wideo",
                  ],
                  isImportant: true,
                },
                {
                  id: 18,
                  type: "textArea",
                  name: "Inne specjalne wymagania",
                  info: "",
                  description: "Wypełnij wymaganiami dotyczącymi produkcji, pakowania i dostarczenia",
                  options: [],
                  isImportant: false,
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
                  {
                    id: 8,
                    value: [],
                  },
                  {
                    id: 9,
                    value: "Tak",
                  },
                  {
                    id: 10,
                    value: "Tak",
                  },
                  {
                    id: 11,
                    value: "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
                  },
                  {
                    id: 12,
                    value: "Tak",
                  },
                  {
                    id: 13,
                    value: "Grawerowanie laserowe",
                  },
                  {
                    id: 14,
                    value: "Testy montażowe",
                  },
                  {
                    id: 15,
                    value: "Premium (dodatkowe opłaty)",
                  },
                  {
                    id: 16,
                    value: "Standardowa inspekcja (brak raportu)",
                  },
                  {
                    id: 17,
                    value: "Sprzęt biurowy i akcesoria",
                  },
                  {
                    id: 18,
                    value: "ewqeqwe",
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
                  value: 100,
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
                    color: "beige",
                  },
                },
                {
                  id: 8,
                  value: [
                    {
                      name: "Dokument bez tytułu.pdf",
                      size: 11419,
                      url: "https://p6s5bqqmdlpwrmuu.public.blob.vercel-storage.com/uploads/Dokument%20bez%20tytu%C5%82u-N16iBmmMuihVzbQUSJel6XOEybhF4J.pdf",
                    },
                    {
                      name: "jasperBagiBagi-4x.gif",
                      size: 760780,
                      url: "https://p6s5bqqmdlpwrmuu.public.blob.vercel-storage.com/uploads/jasperBagiBagi-4x-0QSVhtTHRlS2iHAlSLKWwOPVixtido.gif",
                    },
                  ],
                },
                {
                  id: 9,
                  value: "Tak",
                },
                {
                  id: 10,
                  value: "Tak",
                },
                {
                  id: 11,
                  value: "Wymagane są węższe tolerancje",
                },
                {
                  id: 12,
                  value: "Tak",
                },
                {
                  id: 13,
                  value: "Grawerowanie laserowe",
                },
                {
                  id: 14,
                  value: "Dostawa w formie zmontowanej",
                },
                {
                  id: 15,
                  value: "Premium (dodatkowe opłaty)",
                },
                {
                  id: 16,
                  value: "Certyfikacja materiału źródłowego",
                },
                {
                  id: 17,
                  value: "Sprzęt audio i wideo",
                },
                {
                  id: 18,
                  value: "cos  specjalnego",
                },
              ],
            },
          )
        }}
      >
        generuj formularz
      </Button>
    </div>
  )
}

export default FormSection

