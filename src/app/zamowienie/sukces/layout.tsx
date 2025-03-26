import "~/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Wyfrezuj to",
  description: "Złóż zamóweinie na blachy!",
  icons: [{ rel: "icon", url: "/electris.png" }],
};

export default function ZamowienieLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
