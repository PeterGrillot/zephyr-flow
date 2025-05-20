import { Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { prisma } from "../client";

const csvFilePath = path.join(process.cwd(), "seed/manufacturers.csv"); // Ensure correct file path

type Manufacturer = Prisma.ManufacturerGetPayload<object>;

async function seedManufacturers() {
  const manufacturers: Array<Manufacturer> = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        manufacturers.push({
          manufacturerSerialId: row["Manufacturer Serial ID"]?.trim(),
          manufacturerName: row["Manufacturer Name"]?.trim(),
          modelName: row["Model Name"]?.trim() || "Unknown Model",
          country: row["Country"]?.trim() || "Unknown Country",
          description: row["Description"]?.trim() || null,
          ratedPower: row["Rated Power (kW)"]
            ? parseInt(row["Rated Power (kW)"].replace(/,/g, ""), 10)
            : 0,
          offshore: row["Offshore"]?.trim().toLowerCase() === "yes",
          onshore: row["Onshore"]?.trim().toLowerCase() === "yes",
        });
      })
      .on("end", async () => {
        for (const spec of manufacturers) {
          await prisma.manufacturer.upsert({
            where: { manufacturerSerialId: spec.manufacturerSerialId },
            update: {},
            create: spec,
          });
        }
        console.log("Manufacturers seeding completed");
        resolve(undefined);
      })
      .on("error", reject);
  });
}

export { seedManufacturers };
