"use server";

import { createParser, VariableMap } from "@adifkz/exp-p";

// Definiujemy typ dla FilledFormType
interface FilledFormType {
  id: number;
  uploadedFiles: Array<unknown>;
  values: Array<{
    id: number;
    value: unknown;
  }>;
}

// Definiujemy typ dla danych formularza
interface FormDataToGenerateType {
  id: number;
  calculation?: {
    price?: string;
    deliveryDate?: string;
  };
  values: Array<{
    id: number;
    type?: string;
    name?: string;
    info?: string;
    description?: string;
    options?: string[];
    isImportant?: boolean;
  }>;
  defaultFilledFormData?: FilledFormType;
}

// Definiujemy typ dla wyniku obliczeń
interface PriceResult {
  totalPrice: number;
  deliveryDate: number;
  unitPrice: number;
}

// Definiujemy typ dla zmiennych parsera
type ParserVariables = Record<
  string,
  number | string | boolean | null | undefined
>;

// Tworzymy parser
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const parserInstance = createParser();

// Definiujemy niestandardowe funkcje dla parsera
const customFunctions = {
  IF: (
    _: unknown,
    predicate: boolean,
    valueIfTrue: number | string | boolean | undefined,
    valueIfFalse: number | string | boolean | undefined,
  ): number | string | boolean | undefined =>
    predicate ? valueIfTrue : valueIfFalse,
  ISNAN: (_: unknown, value: unknown): boolean => isNaN(Number(value)),
  MOD: (_: unknown, value: number, divider: number): number => value % divider,
};

// Bezpiecznie ustawiamy funkcje parsera
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  parserInstance.setFunctions(customFunctions);
} catch {
  // Ignorujemy błąd, parser będzie używał domyślnych funkcji
}

// Zmienne wbudowane
const builtinVariables: ParserVariables = {
  nan: Number.NaN,
};

// Funkcja do pobierania wartości z formularza
function getFormValue(
  form: FilledFormType | null | undefined,
  id: number,
  defaultValue: unknown = null,
): unknown {
  if (!form?.values) return defaultValue;

  const valueObj = form.values.find((v) => v.id === id);
  return valueObj?.value ?? defaultValue;
}

// Bezpieczna funkcja do ewaluacji wyrażeń
function safeEvaluate(
  expr: string,
  variables: Record<string, unknown>,
): number | string | boolean | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return parserInstance.evaluate(expr, variables as VariableMap) as
      | number
      | string
      | boolean
      | undefined;
  } catch {
    return Number.NaN;
  }
}

// Funkcja do obliczania ceny
export async function calculatePrice(
  filledForm: FilledFormType | null | undefined,
  formData: FormDataToGenerateType | null | undefined,
): Promise<PriceResult> {
  // Domyślny wynik w przypadku błędu
  const defaultResult: PriceResult = {
    totalPrice: 0,
    deliveryDate: 14,
    unitPrice: 0,
  };

  // Sprawdzamy czy mamy dane wejściowe
  if (!filledForm || !formData) {
    return defaultResult;
  }

  try {
    // Pobieramy wartości z formularza
    const quantity = Number(getFormValue(filledForm, 1, 0));
    const units = String(getFormValue(filledForm, 2, "mm"));

    // Pobieramy informacje o obróbce powierzchni
    const surfaceTreatmentValue = getFormValue(filledForm, 777, {
      option: "standard",
    });

    // Pobieramy informacje o materiale
    const materialType = String(getFormValue(filledForm, 20, "Miedź"));

    // Pobieramy informacje o wymiarach i grubości
    const thickness = String(getFormValue(filledForm, 6, "0.8mm"));
    const thicknessValue = Number.parseFloat(thickness);

    // Pobieramy informacje o gwintowaniu, wkładkach i gięciach
    const hasThreads = getFormValue(filledForm, 9, "Nie") === "Tak";
    const threadsCount = hasThreads
      ? Number(getFormValue(filledForm, 9999, 0))
      : 0;

    const hasInserts = getFormValue(filledForm, 10, "Nie") === "Tak";
    const insertsCount = hasInserts
      ? Number(getFormValue(filledForm, 112312, 0))
      : 0;

    const bendsCount = Number(getFormValue(filledForm, 11123232323232, 0));

    // Pobieramy informacje o tolerancji, pakowaniu i kontroli jakości
    const tolerances = String(
      getFormValue(
        filledForm,
        11,
        "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)",
      ),
    );
    const packaging = String(getFormValue(filledForm, 15, "Standard"));
    const qualityControl = String(
      getFormValue(filledForm, 16, "Standardowa inspekcja (brak raportu)"),
    );

    // Przygotowujemy zmienne wejściowe dla parsera
    const formInput: ParserVariables = {
      width: 60.0, // Przykładowa wartość, można dostosować
      len: 400.0, // Przykładowa wartość, można dostosować
      thickness: thicknessValue,
      units: units,
      surfaceType:
        typeof surfaceTreatmentValue === "object" &&
        surfaceTreatmentValue !== null
          ? ((surfaceTreatmentValue as { option?: string }).option ??
            "standard")
          : "standard",
      tolerances:
        tolerances === "Nie są wymagane żadne węższe tolerancje (ISO 2768-1)"
          ? "standard"
          : "custom",
      packaging: packaging === "Standard" ? "standard" : "custom",
      qualityControl:
        qualityControl === "Standardowa inspekcja (brak raportu)"
          ? "standard"
          : "custom",
      materialType: materialType,
      threads: threadsCount,
      bends: bendsCount,
      inserts: insertsCount,
      quantity: quantity,
    };

    // Definiujemy formuły do obliczania ceny
    const formulas: [string, string][] = [
      ["dimMul", "IF(units == 'mm', 1.0, 25.4)"],
      ["isThickMaterial", "thickness >= 8"],
      ["isStandardThickness", "MOD(thickness, 0.2) == 0"],
      ["isStandardSurface", "surfaceType == 'standard'"],
      ["isStandardTolerances", "tolerances == 'standard'"],
      ["isStandardPackaging", "packaging == 'standard'"],
      ["isStandardQC", "qualityControl == 'standard'"],
      [
        "materialVolume",
        "(width * dimMul) * (len * dimMul) * (thickness * dimMul)",
      ], // in mm3
      ["materialPerimeter", "(2 * width * dimMul) + (2 * len * dimMul)"], // in mm
      [
        "materialPrice",
        "IF(materialType == 'Miedź', 0.009355, IF(materialType == 'Aluminium', 0.002426, IF(materialType == 'Stal', 0.000878, NaN)))",
      ], // EUR per gram
      [
        "materialDensity",
        "IF(materialType == 'Miedź', 0.0089, IF(materialType == 'Aluminium', 0.0027, IF(materialType == 'Stal', 0.0079, NaN)))",
      ], // g/mm3
      [
        "isStandardProduct",
        "!isThickMaterial and isStandardThickness and isStandardSurface and isStandardTolerances and isStandardPackaging and isStandardQC",
      ],
      ["isStandardMaterial", "materialPrice != NaN and materialDensity != NaN"],
      ["materialCost", "materialVolume * materialDensity * materialPrice"],
      ["materialPriceTotal", "materialCost * 1.25"],
      ["cuttingPrice", "0.02"], // price per mm
      ["bendingPrice", "0.23"],
      ["threadingPrice", "0.50"],
      ["insertPrice", "0.8 + 0.2"], // material + work
      ["packagingPrice", "0.4"], // materials + work
      [
        "productionCost",
        "cuttingPrice * materialPerimeter + bendingPrice * bends + threadingPrice * threads + insertPrice * inserts + packagingPrice",
      ],
      ["productionPrice", "productionCost * 1.25"],
      ["totalUnitPrice", "materialPriceTotal + productionPrice"],
      ["totalPrice", "totalUnitPrice * quantity"],
      [
        "deliveryDate",
        "IF(!isStandardProduct or !isStandardMaterial or ISNAN(totalPrice), nan, 14)",
      ],
    ];

    // Inicjalizujemy zmienne robocze
    const workingVariables: ParserVariables = { ...builtinVariables };

    // Dodajemy zmienne wejściowe do zmiennych roboczych
    Object.entries(formInput).forEach(([key, value]) => {
      workingVariables[key] = value;
    });

    // Obliczamy cenę
    const results: ParserVariables = {};

    for (const [key, expr] of formulas) {
      if (expr) {
        const value = safeEvaluate(expr, workingVariables);
        workingVariables[key] = value;
        results[key] = value;
      } else {
        workingVariables[key] = Number.NaN;
        results[key] = Number.NaN;
      }
    }

    // Zwracamy obliczoną cenę i datę dostawy
    const totalPrice =
      typeof results.totalPrice === "number" && !isNaN(results.totalPrice)
        ? results.totalPrice
        : 0;

    const deliveryDate =
      typeof results.deliveryDate === "number" && !isNaN(results.deliveryDate)
        ? results.deliveryDate
        : 14;

    const unitPrice =
      typeof results.totalUnitPrice === "number" &&
      !isNaN(results.totalUnitPrice)
        ? results.totalUnitPrice
        : 0;

    return {
      totalPrice,
      deliveryDate,
      unitPrice,
    };
  } catch {
    // W przypadku błędu zwracamy domyślne wartości
    return defaultResult;
  }
}

// Funkcja do obliczania daty dostawy
export async function calculateDeliveryDate(
  filledForm: FilledFormType | null | undefined,
  formData: FormDataToGenerateType | null | undefined,
): Promise<number> {
  // Sprawdzamy czy mamy dane wejściowe
  if (!filledForm || !formData) {
    return 14; // Domyślna wartość
  }

  try {
    const quantity = Number(getFormValue(filledForm, 1, 0));

    // Prosta implementacja formuły z formData
    if (formData.calculation?.deliveryDate) {
      // Używamy parsera do obliczenia daty dostawy
      const result = safeEvaluate(formData.calculation.deliveryDate, {
        quantity,
      });
      return typeof result === "number" && !isNaN(result)
        ? result
        : quantity < 100
          ? 14
          : 31;
    }

    return quantity < 100 ? 14 : 31; // Domyślna wartość
  } catch {
    return 14; // Domyślna wartość w przypadku błędu
  }
}
