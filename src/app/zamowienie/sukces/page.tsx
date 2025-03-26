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
        <div className="mt-[10vh] flex h-min flex-col items-center justify-center rounded-lg p-8 pt-14">
          <DeliveryAnimation />
          <p className="mt-8 text-center text-2xl font-semibold text-neutral-900">
            Otrzymaliśmy Twoje zamówienie!
          </p>

          <p className="mt-4 text-center text-lg text-neutral-600">
            Sprawdź swoją skrzynkę e-mail, aby zobaczyć potwierdzenie
            zamówienia.
          </p>
          <OrderAgainBtn />
        </div>
      </div>
    </HydrateClient>
  );
}
