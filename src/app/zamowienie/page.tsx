// import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";

import { HydrateClient } from "~/trpc/server";

import Navbar from "../_components/Navbar";
import AccordionWithNavigation from "../_components/AccordionWithNavigation";
import CustomCart from "../_components/cart/CustomCart";
import { CartProvider } from "~/lib/CartContext";
import { FormProvider } from "~/lib/FormContext";

export default async function Home() {
  return (
    <HydrateClient>
      <Navbar />

      <div className="flex flex-wrap justify-center p-4 pt-10 lg:min-h-screen lg:flex-nowrap lg:gap-x-5 lg:bg-gray-50">
        <FormProvider>
          <CartProvider>
            <AccordionWithNavigation />
            <CustomCart />
          </CartProvider>
        </FormProvider>
      </div>
    </HydrateClient>
  );
}
