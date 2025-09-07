import { initTRPC } from "@trpc/server";
import { prisma } from "./prisma/client"; // Import your Prisma client

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<{ prisma: typeof prisma }>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
