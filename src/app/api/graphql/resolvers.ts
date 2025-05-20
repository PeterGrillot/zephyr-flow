import { prisma } from "@/lib/prisma/client";

export const resolvers = {
  Query: {
    turbines: async () => {
      return await prisma.turbine.findMany({
        include: {
          serialId: {
            select: {
              manufacturerSerialId: true,
              manufacturerName: true,
              modelName: true,
              ratedPower: true,
            },
          },
        },
      });
    },
    manufacturers: async () => await prisma.manufacturer.findMany(),
    turbine: async (_: unknown, { id }: { id: string }) =>
      await prisma.turbine.findUnique({ where: { id: id } }),
    manufacturer: async (_: unknown, { id }: { id: string }) =>
      await prisma.manufacturer.findUnique({
        where: { manufacturerSerialId: id },
      }),
  },
};
