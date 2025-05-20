import { Prisma, PrismaClient } from "@prisma/client";
import { seedTurbines } from "./seeders/turbines";
import { prisma } from "./client";
import { seedManufacturers } from "./seeders/manufacturers";

async function main() {
  try {
    console.log("Seeding database...");

    await seedManufacturers();
    await seedTurbines();

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
