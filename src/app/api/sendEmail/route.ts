import { ServerClient } from "postmark";
import { NextResponse } from "next/server";

interface FormValue {
  id: number;
  value: string;
}

interface FormDataValue {
  id: number;
  name: string;
}

interface FilledForm {
  values: FormValue[];
}

interface FormDataToGenerate {
  values: FormDataValue[];
}

interface CartItem {
  id: number;
  filledForm?: FilledForm;
  formDataToGenerate?: FormDataToGenerate;
}

interface RequestData {
  cartItems?: CartItem[];
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const requestData: RequestData = await request.json() as RequestData;
    const cartItems = requestData.cartItems ?? [];

    const postmarkToken = process.env.POSTMARK_TOKEN;
    if (!postmarkToken) {
      return NextResponse.json(
        { error: "Brak tokena Postmark w konfiguracji serwera" },
        { status: 500 }
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
        <p><strong>Imię i nazwisko:</strong> Jan Kowalski</p>
        <p><strong>Nazwa firmy:</strong> Electris</p>
        <p><strong>Adres email:</strong> firma@gmail.com</p>
    `;

    // 🔹 Przetwarzanie zamówień
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        htmlContent += `<h3>Element ID: ${item.id}</h3>`;

        // Tworzymy mapę ID -> Name dla łatwego wyszukiwania
        const idToNameMap = new Map<number, string>();
        item.formDataToGenerate?.values.forEach((el) => {
          idToNameMap.set(el.id, el.name);
        });

        htmlContent += `
          <table>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Wartość</th>
              </tr>
            </thead>
            <tbody>
        `;

        if (Array.isArray(item.filledForm?.values) && item.filledForm.values.length > 0) {
          item.filledForm.values.forEach((el) => {
            const displayName = idToNameMap.get(el.id) || `ID: ${el.id}`;
            htmlContent += `
              <tr>
                <td>${displayName}</td>
                <td>${el.value}</td>
              </tr>
            `;
          });
        } else {
          htmlContent += `<tr><td colspan="2">Brak danych</td></tr>`;
        }

        htmlContent += `</tbody></table>`;
      });
    } else {
      htmlContent += `<p>Brak zamówień do wyświetlenia.</p>`;
    }

    htmlContent += `</div></body></html>`;

    // // 🔹 Wysłanie e-maila przez Postmark
    const response = await postmarkClient.sendEmail({
      From: "mateusz.knapik@electris.pl",
      To: "szymonosielec@gmail.com",
      Subject: "Zamówienie",
      HtmlBody: htmlContent,
    });

    return NextResponse.json({ success: true, message: "E-mail wysłany!" });
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json({ error: "Błąd podczas przetwarzania zamówienia" }, { status: 500 });
  }
}
