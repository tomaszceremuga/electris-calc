// import { ServerClient } from "postmark";
// import { NextResponse } from "next/server";

// // Dostosujmy typy do tego, co faktycznie może być w CartElementType
// interface CartField {
//   name: string;
//   value: string;
//   color?: string;
// }

// // Definiujemy typy dla filledForm zamiast używać any
// interface FormField {
//   [key: string]: string | number | boolean | null | undefined | string[] | number[] | FormField;
// }

// interface CartItem {
//   id: number;
//   fields: CartField[];
//   filledForm?: Record<string, FormField | string | number | boolean | null | undefined>;
//   values?: Record<string, unknown>;
// }

// interface RequestData {
//   cartItems?: CartItem[];
// }

// export async function POST(request: Request): Promise<NextResponse> {
//   try {
//     // Pobieramy dane z żądania
//     const requestData = (await request.json()) as RequestData;

//     // Logowanie otrzymanych danych do debugowania
//     console.log("Otrzymane surowe dane:", JSON.stringify(requestData, null, 2));
//     console.log("Otrzymane cartItems:", JSON.stringify(requestData.cartItems, null, 2));
//     console.log(
//       "Pierwszy element cartItems:",
//       requestData.cartItems && requestData.cartItems.length > 0
//         ? JSON.stringify(requestData.cartItems[0], null, 2)
//         : "brak elementów",
//     );

//     // Pobieramy token Postmark
//     const postmarkToken = process.env.POSTMARK_TOKEN;
//     if (!postmarkToken) {
//       console.error("Brak tokena Postmark w zmiennych środowiskowych");
//       return NextResponse.json({ error: "Brak tokena Postmark w konfiguracji serwera" }, { status: 500 });
//     }

//     // Inicjalizacja klienta Postmark
//     const postmarkClient = new ServerClient(postmarkToken);

//     // Przygotowanie treści e-maila
//     const cartItems = requestData.cartItems ?? [];

//     // Logowanie przetworzonych danych
//     console.log("Przetworzone cartItems:", JSON.stringify(cartItems, null, 2));

//     // Tworzenie treści e-maila HTML z tabelą
//     let htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { 
//           font-family: Arial, sans-serif;
//           color: #333;
//         }
//         table {
//           border-collapse: collapse;
//           width: 100%;
//           margin-bottom: 20px;
//           border: 1px solid #e0e0e0;
//         }
//         th, td {
//           text-align: left;
//           padding: 12px;
//           border-bottom: 1px solid #e0e0e0;
//         }
//         tr:nth-child(even) {
//           background-color: #f9f9f9;
//         }
//         th {
//           background-color: #f2f2f2;
//           font-weight: bold;
//           width: 40%;
//         }
//         td {
//           width: 60%;
//         }
//         .item-header {
//           background-color: #e6f2ff;
//           font-weight: bold;
//           padding: 15px;
//           margin-top: 30px;
//           margin-bottom: 15px;
//           border-radius: 4px;
//           border-left: 5px solid #0066cc;
//         }
//         .section-header {
//           background-color: #f8f9fa;
//           font-weight: bold;
//           padding: 10px 15px;
//           margin-top: 20px;
//           margin-bottom: 10px;
//           border-left: 4px solid #0066cc;
//         }
//       </style>
//     </head>
//     <body>
//       <h2>Szczegóły zamówienia</h2>
//     `;

//     if (cartItems.length > 0) {
//       cartItems.forEach((item) => {
//         // Dodaj nagłówek dla każdego elementu
//         htmlContent += `
//     <div class="item-header">Element ID: ${item.id}</div>
//     `;

//         // Wyświetl podstawowe pola (fields)
//         if (item.fields && Array.isArray(item.fields) && item.fields.length > 0) {
//           htmlContent += `
//       <div class="section-header">Podstawowe informacje</div>
//       <table>
//       `;

//           item.fields.forEach((field) => {
//             htmlContent += `
//         <tr>
//           <th>${escapeHtml(field.name || "")}</th>
//           <td>${escapeHtml(field.value || "")}</td>
//         </tr>
//         `;
//           });

//           htmlContent += `</table>`;
//         }

//         // Wyświetl filledForm - zawsze próbuj wyświetlić te dane
//         if (item.filledForm) {
//           htmlContent += `
//       <div class="section-header">Szczegółowy formularz</div>
//       <table>
//       `;

//           // Sprawdź typ filledForm i odpowiednio go wyświetl
//           if (typeof item.filledForm === "object" && item.filledForm !== null) {
//             Object.entries(item.filledForm).forEach(([key, value]) => {
//               // Próbuj znaleźć odpowiednią etykietę dla klucza
//               let label = key;

//               // Mapowanie kluczy na czytelne nazwy
//               const keyMapping: Record<string, string> = {
//                 "1": "Ilość",
//                 "2": "Jednostka",
//                 "4": "Materiał",
//                 "5": "Wykończenie",
//                 "6": "Grubość",
//                 "7": "Powierzchnia",
//                 "8": "Pliki",
//                 "9": "Gwintowanie",
//                 "10": "Wkładki",
//                 "11": "Tolerancja",
//                 "12": "Spawanie",
//                 "13": "Grawerowanie",
//                 "14": "Montaż części",
//                 "15": "Poziom usługi",
//                 "16": "Inspekcja",
//                 "17": "Opis produktu",
//                 "18": "Uwagi",
//               };

//               if (keyMapping[key]) {
//                 label = keyMapping[key];
//               }

//               const formattedValue = formatValue(value);

//               htmlContent += `
//           <tr>
//             <th>${escapeHtml(label)}</th>
//             <td>${escapeHtml(formattedValue)}</td>
//           </tr>
//           `;
//             });
//           } else {
//             // Jeśli filledForm nie jest obiektem
//             htmlContent += `
//         <tr>
//           <th>Formularz</th>
//           <td>${escapeHtml(String(item.filledForm))}</td>
//         </tr>
//         `;
//           }

//           htmlContent += `</table>`;
//         }

//         // Wyświetl values - zawsze próbuj wyświetlić te dane
//         if (item.values) {
//           htmlContent += `
//       <div class="section-header">Szczegóły produktu</div>
//       <table>
//       `;

//           try {
//             // Jeśli values jest stringiem, spróbuj go sparsować
//             const valuesObj = typeof item.values === "string" ? JSON.parse(item.values) : item.values;

//             // Jeśli values jest tablicą, wyświetl każdy element
//             if (Array.isArray(valuesObj)) {
//               valuesObj.forEach((val) => {
//                 if (typeof val === "object" && val !== null) {
//                   // Jeśli element ma id i value
//                   if ("id" in val && "value" in val) {
//                     let fieldName = String(val.id);
//                     const fieldValue = val.value;

//                     // Mapowanie ID na nazwy pól
//                     const fieldMapping: Record<string, string> = {
//                       "1": "Ilość",
//                       "2": "Jednostka",
//                       "4": "Materiał",
//                       "5": "Wykończenie",
//                       "6": "Grubość",
//                       "7": "Powierzchnia",
//                       "8": "Pliki",
//                       "9": "Gwintowanie",
//                       "10": "Wkładki",
//                       "11": "Tolerancja",
//                       "12": "Spawanie",
//                       "13": "Grawerowanie",
//                       "14": "Montaż części",
//                       "15": "Poziom usługi",
//                       "16": "Inspekcja",
//                       "17": "Opis produktu",
//                       "18": "Uwagi",
//                     };

//                     fieldName = fieldMapping[fieldName] || fieldName;

//                     htmlContent += `
//                 <tr>
//                   <th>${escapeHtml(fieldName)}</th>
//                   <td>${escapeHtml(formatValue(fieldValue))}</td>
//                 </tr>
//                 `;
//                   } else {
//                     // Jeśli element nie ma id i value, wyświetl wszystkie jego pola
//                     Object.entries(val).forEach(([key, value]) => {
//                       htmlContent += `
//                   <tr>
//                     <th>${escapeHtml(key)}</th>
//                     <td>${escapeHtml(formatValue(value))}</td>
//                   </tr>
//                   `;
//                     });
//                   }
//                 } else {
//                   // Jeśli element nie jest obiektem
//                   htmlContent += `
//               <tr>
//                 <th>Wartość</th>
//                 <td>${escapeHtml(formatValue(val))}</td>
//               </tr>
//               `;
//                 }
//               });
//             } else if (typeof valuesObj === "object" && valuesObj !== null) {
//               Object.entries(valuesObj).forEach(([key, value]) => {
//                 htmlContent += `
//           <tr>
//             <th>${escapeHtml(key)}</th>
//             <td>${escapeHtml(formatValue(value))}</td>
//           </tr>
//           `;
//               });
//             }
//           } catch (error) {
//             console.error("Błąd przy przetwarzaniu wartości", error);
//           }

//           htmlContent += `</table>`;
//         }
//       });
//     } else {
//       htmlContent += "<p>Brak produktów w zamówieniu.</p>";
//     }

//     htmlContent += "</body></html>";

//     // Wysyłanie e-maila
//     const response = await postmarkClient.sendEmail({
//       From: "szymonosielec@gmail.com",
//       To: "szymonosielec@gmail.com",
//       Subject: "Zamówienie",
//       HtmlBody: htmlContent,
//     });

//     console.log("E-mail wysłany pomyślnie:", response);

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Wystąpił błąd:", error);
//     return NextResponse.json({ error: "Wystąpił błąd przy przetwarzaniu" }, { status: 500 });
//   }
// }

// // Pomocnicze funkcje
// function escapeHtml(str: string): string {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// function formatValue(value: unknown): string {
//   if (value === null || value === undefined) {
//     return "";
//   }

//   if (typeof value === "boolean") {
//     return value ? "Tak" : "Nie";
//   }

//   if (Array.isArray(value)) {
//     return value.map(item => formatValue(item)).join(", ");
//   }

//   if (typeof value === "object") {
//     // Jeśli wartość to obiekt, przejdź po jego kluczach i wyświetl ich wartości w formie tekstu
//     const objectEntries = Object.entries(value);
//     const formattedObject = objectEntries.map(([key, val]) => `${key}: ${formatValue(val)}`).join(", ");
//     return `{ ${formattedObject} }`; // Formatowanie w postaci: { key1: value1, key2: value2 }
//   }

//   return String(value);  // Jeśli to nie jest obiekt ani tablica, po prostu konwertujemy wartość na string
// }
import { ServerClient } from "postmark";
import { NextResponse } from "next/server";

// Dostosujmy typy do tego, co faktycznie może być w CartElementType
interface CartField {
  name: string;
  value: string;
  color?: string;
}

// Definiujemy typy dla filledForm zamiast używać any
interface FormField {
  [key: string]: string | number | boolean | null | undefined | string[] | number[] | FormField;
}

interface CartItem {
  id: number;
  fields: CartField[];
  filledForm?: Record<string, FormField | string | number | boolean | null | undefined>;
  values?: Record<string, unknown>;
}

interface RequestData {
  cartItems?: CartItem[];
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Pobieramy dane z żądania
    const requestData = (await request.json()) as RequestData;

    // Logowanie otrzymanych danych do debugowania
    console.log("Otrzymane surowe dane:", JSON.stringify(requestData, null, 2));
    console.log("Otrzymane cartItems:", JSON.stringify(requestData.cartItems, null, 2));
    console.log(
      "Pierwszy element cartItems:",
      requestData.cartItems && requestData.cartItems.length > 0
        ? JSON.stringify(requestData.cartItems[0], null, 2)
        : "brak elementów",
    );

    // Pobieramy token Postmark
    const postmarkToken = process.env.POSTMARK_TOKEN;
    if (!postmarkToken) {
      console.error("Brak tokena Postmark w zmiennych środowiskowych");
      return NextResponse.json({ error: "Brak tokena Postmark w konfiguracji serwera" }, { status: 500 });
    }

    // Inicjalizacja klienta Postmark
    const postmarkClient = new ServerClient(postmarkToken);

    // Przygotowanie treści e-maila
    const cartItems = requestData.cartItems ?? [];

    // Logowanie przetworzonych danych
    console.log("Przetworzone cartItems:", JSON.stringify(cartItems, null, 2));

    // Tworzenie treści e-maila HTML z tabelą
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif;
          color: #333;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
          border: 1px solid #e0e0e0;
        }
        th, td {
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          width: 40%;
        }
        td {
          width: 60%;
        }
        .item-header {
          background-color: #e6f2ff;
          font-weight: bold;
          padding: 15px;
          margin-top: 30px;
          margin-bottom: 15px;
          border-radius: 4px;
          border-left: 5px solid #0066cc;
        }
        .section-header {
          background-color: #f8f9fa;
          font-weight: bold;
          padding: 10px 15px;
          margin-top: 20px;
          margin-bottom: 10px;
          border-left: 4px solid #0066cc;
        }
      </style>
    </head>
    <body>
      <h2>Szczegóły zamówienia</h2>
    `;

    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        // Dodaj nagłówek dla każdego elementu
        htmlContent += `
    <div class="item-header">Element ID: ${item.id}</div>
    `;

        // Wyświetl podstawowe pola (fields)
        if (item.fields && Array.isArray(item.fields) && item.fields.length > 0) {
          htmlContent += `
      <div class="section-header">Podstawowe informacje</div>
      <table>
      `;

          item.fields.forEach((field) => {
            htmlContent += `
        <tr>
          <th>${escapeHtml(field.name || "")}</th>
          <td>${escapeHtml(field.value || "")}</td>
        </tr>
        `;
          });

          htmlContent += `</table>`;
        }

        // Wyświetl filledForm - zawsze próbuj wyświetlić te dane
        if (item.filledForm) {
          htmlContent += `
      <div class="section-header">Szczegółowy formularz</div>
      <table>
      `;

          // Sprawdź typ filledForm i odpowiednio go wyświetl
          if (typeof item.filledForm === "object" && item.filledForm !== null) {
            Object.entries(item.filledForm).forEach(([key, value]) => {
              // Próbuj znaleźć odpowiednią etykietę dla klucza
              let label = key;

              // Mapowanie kluczy na czytelne nazwy
              const keyMapping: Record<string, string> = {
                "1": "Ilość",
                "2": "Jednostka",
                "4": "Materiał",
                "5": "Wykończenie",
                "6": "Grubość",
                "7": "Powierzchnia",
                "8": "Pliki",
                "9": "Gwintowanie",
                "10": "Wkładki",
                "11": "Tolerancja",
                "12": "Spawanie",
                "13": "Grawerowanie",
                "14": "Montaż części",
                "15": "Poziom usługi",
                "16": "Inspekcja",
                "17": "Opis produktu",
                "18": "Uwagi",
              };

              if (keyMapping[key]) {
                label = keyMapping[key];
              }

              const formattedValue = formatValue(value);

              htmlContent += `
          <tr>
            <th>${escapeHtml(label)}</th>
            <td>${escapeHtml(formattedValue)}</td>
          </tr>
          `;
            });
          } else {
            // Jeśli filledForm nie jest obiektem
            htmlContent += `
        <tr>
          <th>Formularz</th>
          <td>${escapeHtml(String(item.filledForm))}</td>
        </tr>
        `;
          }

          htmlContent += `</table>`;
        }

        // Wyświetl values - zawsze próbuj wyświetlić te dane
        if (item.values) {
          htmlContent += `
      <div class="section-header">Szczegóły produktu</div>
      <table>
      `;

          try {
            // Jeśli values jest stringiem, spróbuj go sparsować
            const valuesObj = typeof item.values === "string" ? JSON.parse(item.values) : item.values;

            // Jeśli values jest tablicą, wyświetl każdy element
            if (Array.isArray(valuesObj)) {
              valuesObj.forEach((val) => {
                if (typeof val === "object" && val !== null) {
                  // Jeśli element ma id i value
                  if ("id" in val && "value" in val) {
                    let fieldName = String(val.id);
                    const fieldValue = val.value;

                    // Mapowanie ID na nazwy pól
                    const fieldMapping: Record<string, string> = {
                      "1": "Ilość",
                      "2": "Jednostka",
                      "4": "Materiał",
                      "5": "Wykończenie",
                      "6": "Grubość",
                      "7": "Powierzchnia",
                      "8": "Pliki",
                      "9": "Gwintowanie",
                      "10": "Wkładki",
                      "11": "Tolerancja",
                      "12": "Spawanie",
                      "13": "Grawerowanie",
                      "14": "Montaż części",
                      "15": "Poziom usługi",
                      "16": "Inspekcja",
                      "17": "Opis produktu",
                      "18": "Uwagi",
                    };

                    fieldName = fieldMapping[fieldName] || fieldName;

                    htmlContent += `
                <tr>
                  <th>${escapeHtml(fieldName)}</th>
                  <td>${escapeHtml(formatValue(fieldValue))}</td>
                </tr>
                `;
                  } else {
                    // Jeśli element nie ma id i value, wyświetl wszystkie jego pola
                    Object.entries(val).forEach(([key, value]) => {
                      htmlContent += `
                  <tr>
                    <th>${escapeHtml(key)}</th>
                    <td>${escapeHtml(formatValue(value))}</td>
                  </tr>
                  `;
                    });
                  }
                } else {
                  // Jeśli element nie jest obiektem
                  htmlContent += `
              <tr>
                <th>Wartość</th>
                <td>${escapeHtml(formatValue(val))}</td>
              </tr>
              `;
                }
              });
            } else if (typeof valuesObj === "object" && valuesObj !== null) {
              Object.entries(valuesObj).forEach(([key, value]) => {
                htmlContent += `
          <tr>
            <th>${escapeHtml(key)}</th>
            <td>${escapeHtml(formatValue(value))}</td>
          </tr>
          `;
              });
            }
          } catch (error) {
            console.error("Błąd przy przetwarzaniu wartości", error);
          }

          htmlContent += `</table>`;
        }
      });
    } else {
      htmlContent += "<p>Brak produktów w zamówieniu.</p>";
    }

    htmlContent += "</body></html>";

    // Wysyłanie e-maila
    const response = await postmarkClient.sendEmail({
      From: "szymonosielec@gmail.com",
      To: "szymonosielec@gmail.com",
      Subject: "Zamówienie",
      HtmlBody: htmlContent,
    });

    // console.log("E-mail wysłany pomyślnie:", response);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Wystąpił błąd:", error);
    return NextResponse.json({ error: "Wystąpił błąd przy przetwarzaniu" }, { status: 500 });
  }
}

// // Pomocnicze funkcje
// function escapeHtml(str: string): string {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// function formatValue(value: unknown): string {
//   if (value === null || value === undefined) {
//     return "";
//   }

//   if (typeof value === "boolean") {
//     return value ? "Tak" : "Nie";
//   }

//   if (Array.isArray(value)) {
//     return value.map(item => formatValue(item)).join(", ");
//   }

//   if (typeof value === "object") {
//     // Jeśli wartość to obiekt, przejdź po jego kluczach i wyświetl ich wartości w formie tekstu
//     const objectEntries = Object.entries(value);
//     const formattedObject = objectEntries.map(([key, val]) => `${key}: ${formatValue(val)}`).join(", ");
//     return `{ ${formattedObject} }`; // Formatowanie w postaci: { key1: value1, key2: value2 }
//   }

//   return String(value);  // Jeśli to nie jest obiekt ani tablica, po prostu konwertujemy wartość na string
// }
