// import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";

import { HydrateClient } from "~/trpc/server";

import FloatingCart from "./_components/FloatingCart";
import Navbar from "./_components/Navbar";
import AccordionWithNavigation from "./_components/AccordionWithNavigation";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <div className="flex flex-wrap justify-center p-4 pt-10 lg:min-h-screen lg:flex-nowrap lg:gap-x-5 lg:bg-gray-50">
        <AccordionWithNavigation />
        <FloatingCart />
      </div>
    </HydrateClient>
  );
}