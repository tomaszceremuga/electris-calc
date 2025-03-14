import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

import FloatingCart from "./_components/FloatingCart";
import Navbar from "./_components/Navbar";
import AccordionWithNavigation from "./_components/AccordionWithNavigation";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />
      <div className="flex flex-wrap lg:flex-nowrap lg:min-h-screen justify-center lg:gap-x-5  lg:bg-gray-50 p-4 pt-10">
        <AccordionWithNavigation />
        <FloatingCart />
      </div>
    </HydrateClient>
  );
}
