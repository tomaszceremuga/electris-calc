// const formData = {
//   id: 1,
//   calculation: {
//     price: " id pola od ilosci * 1.2 + surfaceTreatment * 0.8",
//     deliveryDate: "quantity < 100 ? 14 : 31",
//   },
//   values: [
//     {
//       id: 1,
//       type: "quantity",
//       name: "Ilość",
//       info: "",
//       description: "",
//       options: [],
//       isImportant: true,
//     },
//     {
//       id: 2,
//       type: "selectGroup",
//       name: "Jednostki",
//       info: "",
//       description: "",
//       options: ["mm", "inch"],
//       isImportant: false,
//     },
//     {
//       id: 4,
//       type: "selectGroup",
//       name: "Rodzaj aluminium",
//       info: "",
//       description: "",
//       options: ["Aluminium 5052", "Aluminium 6061"],
//       isImportant: false,
//     },
//     {
//       id: 6,
//       type: "selectGroup",
//       name: "Grubość",
//       info: "",
//       description: "",
//       options: [
//         "0.8mm",
//         "1.0mm",
//         "1.2mm",
//         "1.5mm",
//         "2.0mm",
//         "2.5mm",
//         "3.0mm",
//         "4.0mm",
//       ],
//       isImportant: true,
//     },
//     {
//       id: 777,
//       type: "selectMaterial",
//       selectedMaterial: {
//         image:
//           "https://pcbwayfile.s3-us-west-2.amazonaws.com/web/20/12/10/2226459873337t.jpg",
//         name: "Aluminum 12125052",
//         infoLink: "#",
//         rate: 4.9,
//         rates: 2051,
//       },
//       data: {
//         alertMesage: "Uważaj aby wybrać coś tam",

//         categories: [
//           {
//             id: "surface",
//             name: "Powierzchnia",
//             options: [
//               { id: "standard", name: "Standardowa (Frezowana)" },
//               { id: "powder-coat", name: "Malowanie proszkowe" },
//               { id: "galvanic-coat", name: "Powłoka galwaniczna" },
//             ],
//           },
//         ],
//         tiles: [
//           {
//             id: "bead-blast-anodized",
//             categoryId: "surface",
//             name: "Piaskowanie + Anodowanie",
//             description:
//               "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium. A dzięki piaskowaniu powierzchnia części pozostaje gładka, z matowym wyglądem.",
//             image: "/placeholder.svg?height=150&width=250",
//             colors: [
//               "blue",
//               "black",
//               "gray",
//               "yellow",
//               "orange",
//               "red",
//               "teal",
//               "purple",
//               "brown",
//               "beige",
//             ],
//             requiredOption: "anodized",
//           },
//           {
//             id: "anodized-simple",
//             categoryId: "surface",
//             name: "Anodowanie",
//             description:
//               "Anodowanie tworzy powłokę odporną na korozję. Części mogą być anodowane w różnych kolorach — przezroczysty, czarny, czerwony i złoty są najczęściej spotykane — i zwykle jest związane z aluminium.",
//             image: "/placeholder.svg?height=150&width=250",
//             colors: [
//               "blue",
//               "black",
//               "gray",
//               "yellow",
//               "orange",
//               "red",
//               "teal",
//               "purple",
//               "brown",
//               "beige",
//             ],
//             requiredOption: "anodized",
//           },
//           {
//             id: "standard-finish",
//             categoryId: "surface",
//             name: "Wykończenie standardowe",
//             description:
//               "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania.",
//             image: "/placeholder.svg?height=150&width=250",
//             colors: [],
//             requiredOption: "standard",
//           },
//           {
//             id: "brushed-finish",
//             categoryId: "surface",
//             name: "Wykończenie szczotkowane",
//             description:
//               "Wykończenie szczotkowane tworzy serię drobnych linii na powierzchni, nadając jej charakterystyczny wygląd i teksturę.",
//             image: "/placeholder.svg?height=150&width=250",
//             colors: [],
//             requiredOption: "brushed",
//           },
//         ],
//       },
//     },
//     {
//       id: 8,
//       type: "uploadElement",
//       name: "Rysunek techiczny",
//       info: "",
//       description: "",
//       options: [],
//       isImportant: false,
//     },
//     {
//       id: 9,
//       type: "radioElements",
//       name: "Czy Twoje części wymagają gwintowania?",
//       info: "",
//       description:
//         "Proszę określić, czy Twoja część ma gwinty wewnętrzne lub zewnętrzne.Nie ponosimy żadnego ryzyka montażowego, jeśli jest to niestandardowy gwint, chyba że wszystkie części montażowe są tutaj produkowane i montowane.",
//       options: ["Nie", "Tak"],
//       isImportant: true,
//     },
//     {
//       id: 10,
//       type: "radioElements",
//       name: "Wkładki",
//       info: "",
//       description: "Proszę podać standardowe wkładki stosowane w  części.",
//       options: ["Nie", "Tak"],
//       isImportant: true,
//     },
//     {
//       id: 11,
//       type: "radioElements",
//       name: "Tolerancja",
//       info: "",
//       description:
//         "Tolerancje będą kontrolowane zgodnie z normą ISO 2768-1. W przypadku innych, węższych tolerancji, wymagany będzie rysunek techniczny w celu wskazania krytycznych wymiarów.",
//       options: [
//         "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
//         "Wymagane są węższe tolerancje",
//       ],
//       isImportant: true,
//     },

//     {
//       id: 15,
//       type: "radioElements",
//       name: "Pakowanie",
//       info: "",
//       description: "",
//       options: ["Standard", "Niestandardowe"],
//       isImportant: false,
//     },
//     {
//       id: 16,
//       type: "radioElements",
//       name: "Kontrola",
//       info: "",
//       description:
//         "Raport z inspekcji nie zostanie wysłany wraz z częściami, chyba że będzie Ci potrzebny.",
//       options: [
//         "Standardowa inspekcja (brak raportu)",
//         "Standardowa inspekcja z formalnym raportem",
//         "Inspekcja CMM z formalnym raportem",
//         "Certyfikacja materiału źródłowego",
//       ],
//       isImportant: false,
//     },
//     {
//       id: 18,
//       type: "textArea",
//       name: "Inne specjalne wymagania",
//       info: "",
//       description:
//         "Wypełnij wymaganiami dotyczącymi produkcji, pakowania i dostarczenia",
//       options: [],
//       isImportant: false,
//     },
//   ],
//   defaultFilledFormData: {
//     id: 1,
//     uploadedFiles: [],
//     values: [
//       {
//         id: 1,
//         value: 123,
//       },
//       {
//         id: 2,
//         value: "inch",
//       },
//       {
//         id: 4,
//         value: "Aluminium 5052",
//       },

//       {
//         id: 6,
//         value: "0.8mm",
//       },
//       {
//         id: 777,
//         value: {
//           category: "surface",
//           option: "anodized",
//           tile: "anodized-simple",
//           color: "black",
//         },
//       },
//       {
//         id: 8,
//         value: [],
//       },
//       {
//         id: 9,
//         value: "Tak",
//       },
//       {
//         id: 10,
//         value: "Tak",
//       },
//       {
//         id: 11,
//         value: "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
//       },
//       {
//         id: 15,
//         value: "Premium (dodatkowe opłaty)",
//       },
//       {
//         id: 16,
//         value: "Standardowa inspekcja (brak raportu)",
//       },
//       {
//         id: 18,
//         value: "ewqeqwe",
//       },
//     ],
//   },
// };

// export default formData;
const formData = {
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
      options: ["mm", "inch"],
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
        alertMesage:
          "Wybór obróbki powierzchni wpływa na wygląd, trwałość i właściwości produktu końcowego.",
        treatments: [
          {
            id: "standard",
            name: "Standardowa",
            description:
              "Standardowe wykończenie frezowane zapewnia podstawową obróbkę powierzchni bez dodatkowego przetwarzania. Powierzchnia zachowuje naturalny wygląd materiału z widocznymi śladami obróbki mechanicznej.",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "powder-coat",
            name: "Malowanie proszkowe",
            description:
              "Malowanie proszkowe tworzy trwałą, odporną na korozję powłokę dostępną w różnych kolorach. Proces ten zapewnia równomierną, wytrzymałą powłokę, która jest odporna na odpryski, zarysowania i blaknięcie.",
            image: "/placeholder.svg?height=200&width=300",
            hasColors: true,
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
          },
          {
            id: "galvanic-coat",
            name: "Powłoka galwaniczna",
            description:
              "Powłoka galwaniczna to proces elektrochemiczny, który nakłada cienką warstwę metalu na powierzchnię, poprawiając jej właściwości. Zwiększa odporność na korozję, poprawia przewodność elektryczną i nadaje estetyczny wygląd.",
            image: "/placeholder.svg?height=200&width=300",
            hasCoatings: true,
            coatings: [
              { id: "zinc", name: "Cynowanie" },
              { id: "silver", name: "Srebrzenie" },
              { id: "nickel", name: "Niklowanie" },
            ],
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
      id: 112312,
      type: "inputNumber",
      name: "Ilość gięć",
      info: "",
      description: "Proszę podać ilość wgięć stosowanych w części.",
      isImportant: true,
    },
    {
      id: 11,
      type: "radioElements",
      name: "Tolerancja",
      info: "",
      description:
        "Tolerancje będą kontrolowane zgodnie z normą ISO 2768-1. W przypadku innych, węższych tolerancji, wymagany będzie rysunek techniczny w celu wskazania krytycznych wymiarów.",
      options: [
        "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
        "Wymagane są węższe tolerancje",
      ],
      isImportant: true,
    },

    {
      id: 15,
      type: "radioElements",
      name: "Pakowanie",
      info: "",
      description: "",
      options: ["Standard", "Niestandardowe"],
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
      id: 18,
      type: "textArea",
      name: "Inne specjalne wymagania",
      info: "",
      description:
        "Wypełnij wymaganiami dotyczącymi produkcji, pakowania i dostarczenia",
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
        id: 6,
        value: "0.8mm",
      },
      {
        id: 777,
        value: {
          treatment: "standard",
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
        id: 15,
        value: "Premium (dodatkowe opłaty)",
      },
      {
        id: 16,
        value: "Standardowa inspekcja (brak raportu)",
      },
      {
        id: 18,
        value: "ewqeqwe",
      },
    ],
  },
};

export default formData;
