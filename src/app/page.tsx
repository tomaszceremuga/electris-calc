import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

import { Button } from "@/components/ui/button";
import { MainAccordion } from "./_components/MainAccordion";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="mx-auto w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <MainAccordion />
        </div>
      </div>
    </HydrateClient>
  );
}
