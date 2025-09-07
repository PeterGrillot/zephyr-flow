import { router, publicProcedure } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getManufacturers: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.manufacturer.findMany(); // Fetch manufacturers from the database
  }),
  getTurbines: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.turbine.findMany(); // Fetch turbines from the database
  }),
});

export type AppRouter = typeof appRouter;
