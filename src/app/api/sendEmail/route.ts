import { ServerClient } from "postmark"
import { NextResponse } from "next/server"

interface CartField {
  name: string
  value: string
  color?: string
}

interface CartItem {
  id: number
  fields: CartField[]
}

interface RequestData {
  cartItems?: CartItem[]
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Pobieramy dane z żądania z poprawnym typowaniem
    const data: RequestData = await request.json().catch(() => ({ cartItems: [] }))

    // Pobieramy token Postmark
    const postmarkToken = process.env.POSTMARK_TOKEN
    if (!postmarkToken) {
      console.error("Brak tokena Postmark w zmiennych środowiskowych")
      return NextResponse.json({ error: "Brak tokena Postmark w konfiguracji serwera" }, { status: 500 })
    }

    // Inicjalizacja klienta Postmark
    const postmarkClient = new ServerClient(postmarkToken)

    // Przygotowanie treści e-maila
    const cartItems = data.cartItems || []

    // Tworzenie treści e-maila na podstawie elementów koszyka
    let emailContent = "Szczegóły zamówienia:\n\n"

    if (cartItems.length > 0) {
      cartItems.forEach((item: CartItem, index: number) => {
        const itemDetails = item.fields
          ? item.fields.map((field: CartField) => `${field.name}: ${field.value}`).join(", ")
          : "Brak szczegółów"

        emailContent += `${index + 1}. ID: ${item.id}, ${itemDetails}\n`
      })
    } else {
      emailContent += "Brak elementów w koszyku."
    }

    // WAŻNE: Użyj zweryfikowanego adresu email w Postmark
    // Musisz dodać i zweryfikować ten adres w panelu Postmark jako "Sender Signature"
    // const fromEmail = " mateusz.knapik@electris.pl" // Zmień na swój zweryfikowany adres email w Postmark
    const fromEmail = " adres"
    // Wysyłka e-maila
    const response = await postmarkClient.sendEmail({
      From: fromEmail, // Używamy zweryfikowanego adresu email
      To: "szymonosielec@gmail.com", // Adres, na który chcesz wysłać e-mail
      Subject: "Nowe zamówienie",
      TextBody: emailContent,
    })

    console.log("Odpowiedź z Postmark:", JSON.stringify(response))

    // Zwracamy sukces
    return NextResponse.json({ message: "E-mail wysłany pomyślnie!" })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("Błąd przy wysyłaniu e-maila:", errorMessage)
    return NextResponse.json({ error: "Błąd przy wysyłaniu e-maila: " + errorMessage }, { status: 500 })
  }
}

