const formData = {
  id: 1,
  calculation: {
    price: " id pola od ilosci * 1.2 + surfaceTreatment * 0.8",
    deliveryDate: "quantity < 100 ? 14 : 31",
  },
  hiddenElements: [112312, 9999, 21, 22, 23, 24],
  values: [
    {
      id: 1,
      type: "quantity",
      name: "Ilość",
      info: "",
      description: "",
      options: [],
      isImportant: false,
    },
    {
      id: 2,
      type: "",
      name: "Jednostka",
      info: "",
      description: "",
      options: ["mm", "inch"],
      isImportant: false,
    },
    // {
    //   id: 4,
    //   type: "selectGroup",
    //   name: "Rodzaj aluminium",
    //   info: "",
    //   description: "",
    //   options: ["Aluminium 5052", "Aluminium 6061"],
    //   isImportant: false,
    // },
    {
      id: 20,
      type: "selectGroup",
      name: "Materiał",
      info: "Wybierz materiał, z którego wykonana jest część.",
      description: "",
      options: ["Miedź", "Aluminium", "Stal", "Inne"],
      isImportant: false,
      elementsToShow: [
        { option: "Miedź", elementToShow: 21 },
        { option: "Aluminium", elementToShow: 22 },
        { option: "Stal", elementToShow: 23 },
        { option: "Inne", elementToShow: 24 },
      ],
    },
    {
      id: 21,
      type: "selectGroup",
      name: "Rodzaj Miedzi",
      info: "",
      options: ["CU-ETP", "CU-OFF"],
      isImportant: false,
      isLoaded: true,
    },
    {
      id: 22,
      type: "selectGroup",
      name: "Rodzaj Aluminium",
      info: "",
      options: ["1050", "6062"],
      isImportant: false,
      isLoaded: true,
    },
    {
      id: 23,
      type: "selectGroup",
      name: "Rodzaj Stali",
      info: "",
      options: ["Czarna", "Nierdzewna"],
      isImportant: false,
      isLoaded: true,
    },
    {
      id: 24,
      type: "inputText",
      name: "Podaj własny rodzaj",
      isLoaded: true,
      description: "Proszę podać własny rodzaj",
    },
    {
      id: 6,
      type: "tickness",
      name: "Grubość",
      info: "",
      description: "",
      isImportant: false,
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
      isImportant: false,
      elementsToShow: [{ option: "Tak", elementToShow: 9999 }],
    },
    {
      id: 9999,
      type: "inputNumber",
      name: "Ilość gwintowanych otowrów",
      isLoaded: true,

      description: "Proszę podać ilość gwintowanych otowrów",
    },
    {
      id: 10,
      type: "radioElements",
      name: "Wkładki wprasowywane",
      info: "",
      description: "Proszę podać standardowe wkładki stosowane w  części.",
      options: ["Nie", "Tak"],
      isImportant: false,
      elementsToShow: [{ option: "Tak", elementToShow: 112312 }],
    },
    {
      id: 112312,
      type: "inputNumber",
      name: "Ilość wkładek wprasowanych",
      info: "",
      isLoaded: true,
      description: "Proszę podać ilość wkładek wprasowanych",
      isImportant: false,
    },
    {
      id: 11123232323232,
      type: "inputNumber",
      name: "Ilość gięć",
      info: "",
      description: "Proszę podać ilość gięć",
      isImportant: false,
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
      isImportant: false,
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
        value: 1,
      },
      // to ma zmieniac select
      {
        id: 2,
        value: "mm",
      },
      {
        id: 6,
        value: 0.8,
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
        value: "Nie",
      },
      {
        id: 9999,
        value: 0,
      },
      {
        id: 10,
        value: "Nie",
      },
      {
        id: 112312,
        value: 0,
      },
      {
        id: 20,
        value: "Miedź",
      },
      {
        id: 21,
        value: "CU-ETP",
      },

      {
        id: 22,
        value: "1050",
      },
      {
        id: 23,
        value: "Czarna",
      },
      {
        id: 24,
        value: "",
      },

      {
        id: 11123232323232,
        Value: 0,
      },

      {
        id: 11,
        value: "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
      },
      {
        id: 15,
        value: "Standard",
      },
      {
        id: 16,
        value: "Standardowa inspekcja (brak raportu)",
      },
      {
        id: 18,
        value: "",
      },
    ],
  },
};

export default formData;
