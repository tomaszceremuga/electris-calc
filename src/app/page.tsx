import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

import { MainAccordion } from "./_components/MainAccordion";
import FloatingCart from "./_components/FloatingCart";
import Navbar from "./_components/Navbar";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <div className="relative flex min-h-screen justify-center gap-5 bg-gray-50 p-4 pt-10">
        <MainAccordion />
        <FloatingCart />
      </div>
    </HydrateClient>
  );
}
