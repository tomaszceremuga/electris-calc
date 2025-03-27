import { ServerClient } from "postmark"
import { NextResponse } from "next/server"
import {type FormElementsType } from "~/lib/FormElementsType"
import {type FilledFormType } from "~/lib/FilledFormType"

// Interfejs dla pliku
interface FileValue {
  name: string
  url: string
}

// Interfejs dla wartości wykończenia
interface FinishingValue {
  category: string
  option: string
  tile: string
  color: string
}

interface FormValue {
  id: number
  value: string | FinishingValue | FileValue[] | undefined
}

interface FormDataValue {
  id: number
  name: string
  data?: {
    categories?: Array<{
      id: string
      name: string
      options: Array<{
        id: string
        name: string
      }>
    }>
    tiles?: Array<{
      id: string
      name: string
    }>
  }
}

interface FilledForm {
  values: FormValue[]
  uploadedFiles?: FileValue[];
}

interface FormDataToGenerate {
  values: FormDataValue[]
}

interface generalInformation {
  name: string
  company: string
  email: string
}
interface formDataToGenerate{
  id: number;
    hiddenElements: Array<number>;
    calculation: {
      price: string;
      deliveryDate: string;
    };
    values: Array<FormElementsType>;
    defaultFilledFormData: FilledFormType;
}

interface CartItemValue {
  id: number
  filledForm?: {
    filledForm: FilledForm
  }
  formDataToGenerate?: FormDataToGenerate
}

interface CartItems {
  filledForm: FilledForm
  values: CartItemValue[]
  generalInformation: generalInformation
}

interface priceInfo{
    totalPrice: number,
    deliveryDate: number,
    unitPrice: number,
}

interface RequestData {
  cartItems: CartItems
  generalInformation:generalInformation
  formDataToGenerate:formDataToGenerate
  priceInfo:priceInfo
  
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const requestData: RequestData = (await request.json()) as RequestData
    const cartItems = requestData.cartItems
    const generalInformation = requestData.generalInformation
    const formDataToGenerate=requestData.formDataToGenerate
    const price=requestData.priceInfo

    const data={
      
      generalInformation:generalInformation,
      values:[
        {
        filledForm:cartItems,
        formDataToGenerate:formDataToGenerate
      }
      ]
    }

    

    const postmarkToken = process.env.POSTMARK_TOKEN
    if (!postmarkToken) {
      return NextResponse.json({ error: "Brak tokena Postmark w konfiguracji serwera" }, { status: 500 })
    }
 

    const postmarkClient = new ServerClient(postmarkToken)

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
    `

    // 🔹 Dane kontaktowe
    htmlContent += `
        <h3>Dane kontaktowe</h3>
        <p><strong>Imię i nazwisko:</strong> ${data.generalInformation.name}</p>
        <p><strong>Nazwa firmy:</strong> ${data.generalInformation.company}</p>
        <p><strong>Adres email:</strong> ${data.generalInformation.email}</p>
    `
    console.log(price)
    // 🔹 Przetwarzanie zamówień
    if (Array.isArray(data.values)) {
      
      data.values.forEach((item) => {
        // console.log(item.formDataToGenerate.values)
        // htmlContent += `<h3>Numer zamówienia: ${item.id}</h3>`
          
        // Sprawdź, czy mamy dostęp do danych kategorii
        const formDataValues = item.formDataToGenerate?.values
        // const surfaceData = formDataValues[8].data.treatments
        const surfaceData = formDataValues[8]?.data?.treatments ?? []
        // console.log(item.filledForm.filledForm.uploadedFiles)
        
        
        const optionsArray = new Map<string, string>()
        surfaceData.forEach((el) => {
          optionsArray.set(el.id, el.name)
        })
        
        const tilesArray = new Map<string, string>()
        surfaceData[2]?.coatings?.forEach((el) => {
          tilesArray.set(el.id, el.name)
        })
      
        // Tworzymy mapę ID -> Name dla łatwego wyszukiwania
        const idToNameMap = new Map<number, string>()
        if (formDataValues) {
          formDataValues.forEach((el) => {
            idToNameMap.set(el.id, el.name ?? "")
          })
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
        `
        
        if (Array.isArray(item.filledForm?.filledForm.values) && item.filledForm?.filledForm.values.length > 0) {
          // Znajdź wartości dla pól gwintowania i wkładek
          let requiresThreading: string | undefined
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          let threadingCount: string | number | undefined
          let requiresInserts: string | undefined
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          let insertsCount: string | number | undefined
          let customThickness: string | undefined
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          let selectedThickness: string | undefined

          // Znajdź wybrany materiał
          let selectedMaterial: string | undefined

          // Przeszukaj wartości, aby znaleźć odpowiednie pola
          item.filledForm.filledForm.values.forEach((field) => {
            // Pole "Czy Twoje części wymagają gwintowania?"
            if (idToNameMap.get(field.id) === "Czy Twoje części wymagają gwintowania?") {
              requiresThreading = field.value as string
            }
            // Pole "Ilość gwintowanych otworów"
            else if (idToNameMap.get(field.id) === "Ilość gwintowanych otworów") {
              if (typeof field.value === "string" || typeof field.value === "number") {
                threadingCount = field.value
              } else {
                threadingCount = undefined // lub inna wartość domyślna
              }
            }
            // Pole "Wkładki wprasowywane"
            else if (idToNameMap.get(field.id) === "Wkładki wprasowywane") {
              requiresInserts = field.value as string
            }
            // Pole "Ilość wkładek wprasowanych"
            else if (idToNameMap.get(field.id) === "Ilość wkładek wprasowanych") {
              if (typeof field.value === "string" || typeof field.value === "number") {
                insertsCount = field.value
              } else {
                insertsCount = undefined // lub inna wartość domyślna
              }
              
            }
            // Pole "Materiał" - zakładamy, że to pole określa wybrany materiał
            else if (idToNameMap.get(field.id) === "Materiał") {
              selectedMaterial = field.value as string
            }
            // Pole "Grubość" - standardowa grubość
            else if (idToNameMap.get(field.id) === "Grubość") {
              selectedThickness = field.value as string
            }
            // Pole "Własna grubość" - niestandardowa grubość
            else if (idToNameMap.get(field.id) === "Własna grubość") {
              customThickness = field.value as string
            }
          })
         
          item.filledForm.filledForm.values.forEach((el) => {
            const displayName = idToNameMap.get(el.id) ?? `ID: ${el.id}`
            
            // Pomiń pole "Ilość gwintowanych otworów" jeśli gwintowanie jest ustawione na "Nie"
            if (displayName === "Ilość gwintowanych otworów" && requiresThreading === "Nie") {
          
              return
            }

            // Pomiń pole "Ilość wkładek wprasowanych" jeśli wkładki są ustawione na "Nie"
            if (displayName === "Ilość wkładek wprasowanych" && requiresInserts === "Nie") {
              return
            }
            if (displayName === "Ilość gięć" && (!el.value || el.value === "")) {
              el.value = "0"
            }

            // Pomiń pola rodzajów materiałów, które nie zostały wybrane
            if (displayName === "Rodzaj Miedzi" && selectedMaterial !== "Miedź") {
              return
            }

            if (displayName === "Rodzaj Aluminium" && selectedMaterial !== "Aluminium") {
              return
            }

            if (displayName === "Rodzaj Stali" && selectedMaterial !== "Stal") {
              return
            }

            // Pomiń pole "Podaj własny rodzaj" jeśli nie wybrano "Inny materiał"
            if (displayName === "Podaj własny rodzaj" && selectedMaterial !== "Inny materiał") {
              return
            }

            // Obsługa własnej grubości
            if (displayName === "Grubość" && customThickness && customThickness.trim() !== "") {
              // Jeśli jest własna grubość, wyświetl ją zamiast standardowej
              htmlContent += `
                <tr>
                  <td>${displayName}</td>
                  <td>${customThickness} mm (wartość niestandardowa)</td>
                </tr>
              `
              return
            }

            // Pomiń pole "Własna grubość" jeśli jest puste
            if (displayName === "Własna grubość" && (!customThickness || customThickness.trim() === "")) {
              return
            }

            if (el.id === 777 && typeof el.value === "object" && el.value !== null) {
              // Rzutowanie na konkretny typ dla wartości wykończenia
              const finishingValue = el.value as FinishingValue
           
              // Bezpieczne pobieranie tłumaczeń
              const optionTranslation = finishingValue.option
                ? (optionsArray.get(finishingValue.option) ?? finishingValue.option)
                : ""
              
              

              const tilesTranslation = finishingValue.tile
              ? (tilesArray.get(finishingValue.tile.replace(/^.*-/, "")) ?? finishingValue.tile)
              : "";

              const colorChoice = finishingValue.color ? translateColor(finishingValue.color) : ""

         

              htmlContent += `
                <tr>
                  <td>Wykończenie</td>
                  <td>
                      ${optionTranslation && `<p><strong>Opcja:</strong> ${optionTranslation}</p>`}
                      ${tilesTranslation && `<p><strong>Typ płytek:</strong> ${tilesTranslation}</p>`}
                      ${colorChoice && `<p><strong>Kolor:</strong> ${colorChoice}</p>`}
                  </td>
                </tr>
              `
            } else if (el.id === 8 && Array.isArray(el.value) && el.value.length > 0) {
              // Rzutowanie na konkretny typ dla plików
              const fileValues = el.value

              htmlContent += `
                <tr>
                  <td>${displayName}</td>
                  <td>
                  ${fileValues
                    .map(
                      (el) =>
                        `<p><strong>Nazwa pliku: </strong> ${el.name ?? ""}</p>
                    <p><strong>URL: </strong> ${el.url ?? ""}</p>`,
                    )
                    .join("")}
                  </td>
                </tr>
              `
            } else {
              htmlContent += `
                <tr>
                  <td>${displayName}</td>
                  <td>${typeof el.value === "object" ? JSON.stringify(el.value) : String(el.value)}</td>
                </tr>
              `
            }
          })
        } else {
          htmlContent += `<tr><td colspan="2">Brak danych</td></tr>`
        }
        
        
        htmlContent += `</tbody></table>`
      })
    }
    htmlContent+=`
      <p>
      Załączone pliki
      <ul>
    
    `
    if (data.values[0]?.filledForm.filledForm.uploadedFiles) {
      data.values[0]?.filledForm.filledForm.uploadedFiles.forEach((el:FileValue) => {
        // console.log(el.name)
        // console.log(el.url)
        htmlContent+=`
        <li><a href=${el.url}>${el.name}</a></li>
      `
      })
    }
    htmlContent+=`
    </ul></p>`

    htmlContent+=`
      <h3>Podsumumowanie zamówienia</h3>
      <p>Cena zamówienia: ${price.totalPrice.toFixed(2)} zł</p>
      <p>Cena za sztukę towaru: ${price.unitPrice.toFixed(2)} zł</p>
      <p>Czas dostawy: ${price.deliveryDate} dni</p>
     
    `

    htmlContent += `</div></body></html>`

    // 🔹 Wysłanie e-maila przez Postmark
    await postmarkClient.sendEmail({
      From: "mateusz.knapik@electris.pl",
      To: generalInformation.email || "szymonosielec@gmail.com",
      Subject: "Zamówienie",
      HtmlBody: htmlContent,
    })

    return NextResponse.json({ success: true, message: "E-mail wysłany!" })
  } catch (error) {
    console.error("Błąd:", error)
    return NextResponse.json(
      {
        error: "Błąd podczas przetwarzania zamówienia",
        details: error instanceof Error ? error.message : "Nieznany błąd",
      },
      { status: 500 },
    )
  }
}

const translateColor = (color: string): string => {
  switch (color) {
    case "blue":
      return "Niebieski"
    case "black":
      return "Czarny"
    case "gray":
      return "Szary"
    case "yellow":
      return "Żółty"
    case "orange":
      return "Pomarańczowy"
    case "red":
      return "Czerwony"
    case "teal":
      return "Morski"
    case "purple":
      return "Fioletowy"
    case "brown":
      return "Brązowy"
    case "beige":
      return "Beżowy"
    default:
      return "Nieznany kolor"
  }
}

