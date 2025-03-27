// import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";

import { HydrateClient } from "~/trpc/server";

// import Navbar from "./_components/Navbar";

import Image from "next/image";
import RouterBtn from "./_components/RouterBtn";

export default function Home() {
  return (
    <HydrateClient>
      {/* <Navbar /> */}

      <div className="relative min-h-[100vh] w-full">
        <Image
          src="/LandingPage.png"
          alt="Landing Page"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-white">
          <h1 className="text-2xl font-bold md:text-4xl">Zapytaj o wycenę</h1>
          <p className="mt-2 text-lg md:text-xl">
            Chcesz nawiązać z nami współpracę?
          </p>
          <RouterBtn />
        </div>
      </div>
    </HydrateClient>
  );
}
