// import Link from "next/link";

// import { api, HydrateClient } from "~/trpc/server";

import DeliveryAnimation from "~/app/_components/DeliveryAnimation";
import OrderAgainBtn from "~/app/_components/OrderAgainBtn";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      {/* <Navbar /> */}

      <div className="flex flex-wrap justify-center p-4 pt-10 lg:min-h-screen lg:flex-nowrap lg:gap-x-5 lg:bg-gray-50">
        <div className="flex flex-col items-center justify-center">
          <DeliveryAnimation />
          <p className="mt-8 text-xl">Otrzymaliśmy twoje zamówienie!</p>

          <p className="mt-4 text-lg text-neutral-700">
            Sprawdź swoją skrzynkę e-mail, aby zobaczyć potwierdzenie
            zamówienia.
          </p>
          <OrderAgainBtn />
        </div>
      </div>
    </HydrateClient>
  );
}
