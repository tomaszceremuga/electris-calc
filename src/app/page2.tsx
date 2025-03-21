// import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";

import { HydrateClient } from "~/trpc/server";

import Navbar from "./_components/Navbar";
import AccordionWithNavigation from "./_components/AccordionWithNavigation";
import CustomCart from "./_components/cart/CustomCart";
import { CartProvider } from "~/lib/CartContext";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />

      <div className="relative h-[40vh] w-full md:h-[60vh] lg:h-[80vh]">
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
          <Button variant="default" className="mt-4 px-6 py-3 text-lg">
            KLIK
          </Button>
        </div>
      </div>
      {/* 
       <div className="flex flex-wrap justify-center p-4 pt-10 lg:min-h-screen lg:flex-nowrap lg:gap-x-5 lg:bg-gray-50">
         <CartProvider>
           <AccordionWithNavigation />
           <CustomCart />
         </CartProvider>
       </div> */}
    </HydrateClient>
  );
}
