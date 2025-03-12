import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

// import { MainAccordion } from "./_components/MainAccordion";
import FloatingCart from "./_components/FloatingCart";
import Navbar from "./_components/Navbar";
import AccordionWithNavigation from "./_components/AccordionWithNavigation";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <div className="flex min-h-screen justify-center gap-5 bg-gray-50 p-4 pt-10">
        {/* <MainAccordion /> */}
        <AccordionWithNavigation />
        <FloatingCart />
      </div>
    </HydrateClient>
  );
}
