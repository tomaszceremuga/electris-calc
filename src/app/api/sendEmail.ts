import type { NextApiRequest, NextApiResponse } from 'next';
import { ServerClient } from 'postmark';

// Define types for cart items and their properties
interface CartProperty {
  name: string;
  value: string;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  properties: CartProperty[];
}

const postmarkClient = new ServerClient(process.env.POSTMARK_TOKEN!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Type the request body to match the expected structure
    const { cartItems } = req.body as { cartItems: CartItem[] };


    // Przetwarzanie danych do treści e-maila
    let emailBody = `
      <h2>Twoje Zamówienie</h2>
      <table border="1">
        <tr><th>Nazwa</th><th>Wartość</th></tr>
    `;

    cartItems.forEach((item) => {
      item.properties.forEach((property) => {
        emailBody += `
          <tr>
            <td>${property.name}</td>
            <td>${property.value}</td>
          </tr>
        `;
      });
    });

    emailBody += '</table>';

    try {
      await postmarkClient.sendEmail({
        From: 'tstowyemailto123@gmail.com', // Adres nadawcy
        To: 'tstowyemailto123@gmail.com', // Adres odbiorcy
        Subject: 'Twoje Zamówienie',
        HtmlBody: emailBody,
        TextBody: 'Proszę sprawdzić szczegóły zamówienia.',
      });

      return res.status(200).json({ message: 'Email wysłany pomyślnie!' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ error: 'Błąd przy wysyłaniu e-maila' });
    }
  } else {
    res.status(405).json({ error: 'Metoda nieobsługiwana' });
  }
}
