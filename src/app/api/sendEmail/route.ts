import { ServerClient } from "postmark";
import { NextResponse } from "next/server";

// Interfejs dla pliku
interface FileValue {
  name: string;
  url: string;
}

// Interfejs dla wartości wykończenia
interface FinishingValue {
  category: string;
  option: string;
  tile: string;
  color: string;
}

interface FormValue {
  id: number;
  value: string | FinishingValue | FileValue[] | undefined;
}

interface FormDataValue {
  id: number;
  name: string;
  data?: {
    categories?: Array<{
      id: string;
      name: string;
      options: Array<{
        id: string;
        name: string;
      }>;
    }>;
    tiles?: Array<{
      id: string;
      name: string;
    }>;
  };
}

interface FilledForm {
  values: FormValue[];
}

interface FormDataToGenerate {
  values: FormDataValue[];
}

interface GeneralInformation {
  name: string;
  company: string;
  email: string;
}

interface CartItemValue {
  id: number;
  filledForm?: FilledForm;
  formDataToGenerate?: FormDataToGenerate;
}

interface CartItems {
  values: CartItemValue[];
  generalInformation: GeneralInformation;
}

interface RequestData {
  cartItems: CartItems;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const requestData: RequestData = (await request.json()) as RequestData;
    const cartItems = requestData.cartItems;

    const postmarkToken = process.env.POSTMARK_TOKEN;
    if (!postmarkToken) {
      return NextResponse.json(
        { error: "Brak tokena Postmark w konfiguracji serwera" },
        { status: 500 },
      );
    }

    const postmarkClient = new ServerClient(postmarkToken);

    // 🔹 Generowanie treści HTML e-maila
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: auto; }
        h2 { color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Szczegóły zamówienia</h2>
    `;

    // 🔹 Dane kontaktowe
    htmlContent += `
        <h3>Dane kontaktowe</h3>
        <p><strong>Imię i nazwisko:</strong> ${cartItems.generalInformation.name}</p>
        <p><strong>Nazwa firmy:</strong> ${cartItems.generalInformation.company}</p>
        <p><strong>Adres email:</strong> ${cartItems.generalInformation.email}</p>
    `;

    // 🔹 Przetwarzanie zamówień
    if (Array.isArray(cartItems.values)) {
      cartItems.values.forEach((item) => {
        htmlContent += `<h3>Numer zamówienia: ${item.id}</h3>`;

        // Sprawdź, czy mamy dostęp do danych kategorii
        const formDataValues = item.formDataToGenerate?.values;
        const surfaceData = formDataValues?.[5]?.data;

        const optionsArray = new Map<string, string>();
        surfaceData?.categories?.[0]?.options.forEach((el) => {
          optionsArray.set(el.id, el.name);
        });

        const tilesArray = new Map<string, string>();
        surfaceData?.tiles?.forEach((el) => {
          tilesArray.set(el.id, el.name);
        });

        // Tworzymy mapę ID -> Name dla łatwego wyszukiwania
        const idToNameMap = new Map<number, string>();
        if (formDataValues) {
          formDataValues.forEach((el) => {
            idToNameMap.set(el.id, el.name);
          });
        }

        htmlContent += `
          <table>
            <thead>
              <tr>
                <th>Parametr</th>
                <th>Wartość</th>
              </tr>
            </thead>
            <tbody>
        `;

        if (
          Array.isArray(item.filledForm?.values) &&
          item.filledForm.values.length > 0
        ) {
          item.filledForm.values.forEach((el) => {
            const displayName = idToNameMap.get(el.id) ?? `ID: ${el.id}`;

            if (
              el.id === 777 &&
              typeof el.value === "object" &&
              el.value !== null
            ) {
              // Rzutowanie na konkretny typ dla wartości wykończenia
              const finishingValue = el.value as FinishingValue;

              // Bezpieczne pobieranie tłumaczeń
              const optionTranslation = finishingValue.option
                ? (optionsArray.get(finishingValue.option) ??
                  finishingValue.option)
                : "";

              const tilesTranslation = finishingValue.tile
                ? (tilesArray.get(finishingValue.tile) ?? finishingValue.tile)
                : "";

              const colorChoice = finishingValue.color
                ? translateColor(finishingValue.color)
                : "";

              // Sprawdź, czy mamy dostęp do kategorii
              let categoryName = "";
              if (
                surfaceData?.categories?.[0] &&
                finishingValue.category === surfaceData.categories[0].id
              ) {
                categoryName = surfaceData.categories[0].name;
              }

              htmlContent += `
                <tr>
                  <td>Wykończenie</td>
                  <td>
                      ${categoryName && `<p><strong>Kategoria:</strong> ${categoryName}</p>`}
                      ${optionTranslation && `<p><strong>Opcja:</strong> ${optionTranslation}</p>`}
                      ${tilesTranslation && `<p><strong>Typ płytek:</strong> ${tilesTranslation}</p>`}
                      ${colorChoice && `<p><strong>Kolor:</strong> ${colorChoice}</p>`}
                  </td>
                </tr>
              `;
            } else if (
              el.id === 8 &&
              Array.isArray(el.value) &&
              el.value.length > 0
            ) {
              // Rzutowanie na konkretny typ dla plików
              const fileValues = el.value;

              htmlContent += `
                <tr>
                  <td>${displayName}</td>
                  <td>
                  ${fileValues.map((el)=>
                    `<p><strong>Nazwa pliku: </strong> ${el.name ?? ""}</p>
                    <p><strong>URL: </strong> ${el.url ?? ""}</p>`
                  ).join("")}
                  </td>
                </tr>
              `;
            } else {
              htmlContent += `
                <tr>
                  <td>${displayName}</td>
                  <td>${typeof el.value === "object" ? JSON.stringify(el.value) : String(el.value)}</td>
                </tr>
              `;
            }
          });
        } else {
          htmlContent += `<tr><td colspan="2">Brak danych</td></tr>`;
        }

        htmlContent += `</tbody></table>`;
      });
    }

    htmlContent += `</div></body></html>`;

    // 🔹 Wysłanie e-maila przez Postmark
    await postmarkClient.sendEmail({
      From: "mateusz.knapik@electris.pl",
      To: cartItems.generalInformation.email || "szymonosielec@gmail.com",
      Subject: "Zamówienie",
      HtmlBody: htmlContent,
    });

    return NextResponse.json({ success: true, message: "E-mail wysłany!" });
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json(
      {
        error: "Błąd podczas przetwarzania zamówienia",
        details: error instanceof Error ? error.message : "Nieznany błąd",
      },
      { status: 500 },
    );
  }
}

const translateColor = (color: string): string => {
  switch (color) {
    case "blue":
      return "Niebieski";
    case "black":
      return "Czarny";
    case "gray":
      return "Szary";
    case "yellow":
      return "Żółty";
    case "orange":
      return "Pomarańczowy";
    case "red":
      return "Czerwony";
    case "teal":
      return "Morski";
    case "purple":
      return "Fioletowy";
    case "brown":
      return "Brązowy";
    case "beige":
      return "Beżowy";
    default:
      return "Nieznany kolor";
  }
};
