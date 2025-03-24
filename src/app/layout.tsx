// import "~/styles/globals.css";
// import { Toaster } from "@/components/ui/sonner";
// import { GeistSans } from "geist/font/sans";
// import { type Metadata } from "next";

// import { TRPCReactProvider } from "~/trpc/react";

// export const metadata: Metadata = {
//   title: "Wyfrezuj to",
//   description: "Złóż zamóweinie na blachy!",
//   icons: [{ rel: "icon", url: "/electris.png" }],
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={`${GeistSans.variable}`}>
//       <body>
//         <TRPCReactProvider>{children}</TRPCReactProvider>
//         <Toaster className="" />
//       </body>
//     </html>
//   );
// }

import "~/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Wyfrezuj to",
  description: "Złóż zamówienie na blachy!",
  icons: [{ rel: "icon", url: "/electris.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
