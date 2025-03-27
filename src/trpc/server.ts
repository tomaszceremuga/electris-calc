// "use server";
// import "server-only";

// import { createHydrationHelpers } from "@trpc/react-query/rsc";
// import { headers } from "next/headers";
// import { cache } from "react";

// import { createCaller, type AppRouter } from "~/server/api/root";
// import { createTRPCContext } from "~/server/api/trpc";
// import { createQueryClient } from "./query-client";

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a tRPC call from a React Server Component.
//  */
// const createContext = cache(async () => {
//   const heads = new Headers(await headers());
//   heads.set("x-trpc-source", "rsc");

//   return createTRPCContext({
//     headers: heads,
//   });
// });

// const getQueryClient = cache(createQueryClient);
// const caller = createCaller(createContext);

// export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
//   caller,
//   getQueryClient,
// );

// "use server";
// import "server-only";

// import { createHydrationHelpers } from "@trpc/react-query/rsc";
// import { headers } from "next/headers";
// import { cache } from "react";

// import { createCaller, type AppRouter } from "~/server/api/root";
// import { createTRPCContext } from "~/server/api/trpc";
// import { createQueryClient } from "./query-client";

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a tRPC call from a React Server Component.
//  */
// const createContext = cache(async () => {
//   const heads = headers(); // Poprawione: usunięto `await` i `new Headers()`
//   heads.set("x-trpc-source", "rsc");

//   return createTRPCContext({
//     headers: heads,
//   });
// });

// const getQueryClient = cache(createQueryClient);
// const caller = createCaller(createContext);

// export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
//   caller,
//   getQueryClient,
// );

"use server";
import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * Tworzy kontekst dla tRPC w React Server Components.
 */
const createContext = cache(async () => {
  const rawHeaders = await headers(); // Pobieramy nagłówki (ReadonlyHeaders)
  const heads = new Headers(rawHeaders); // Konwertujemy na edytowalne Headers

  heads.set("x-trpc-source", "rsc"); // Teraz działa poprawnie

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
