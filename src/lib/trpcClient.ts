import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./apiRouter";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
