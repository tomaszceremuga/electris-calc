import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

import { MainAccordion } from "./_components/MainAccordion";
import FloatingCart from "./_components/FloatingCart";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen items-center justify-center gap-5 bg-gray-50 p-4">
        <MainAccordion />
        <FloatingCart />
      </div>
    </HydrateClient>
  );
}
