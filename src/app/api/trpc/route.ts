import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../lib/apiRouter";
import { prisma } from "../../../lib/prisma/client";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({ prisma }), // Provide Prisma client in the context
});
