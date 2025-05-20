import { Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { prisma } from "../client";
import { randomUUID } from "crypto";

type Turbine = Prisma.TurbineGetPayload<object>;

const csvFilePath = path.join(process.cwd(), "seed/turbines.csv");

async function seedTurbines() {
  const turbines: Array<Turbine> = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        turbines.push({
          id: randomUUID(),
          manufacturerSerialId: row["Manufacturer Serial ID"],
          location: row["Location"],
          installationDate: new Date(row["Installation Date"]),
          lastMaintenance: new Date(row["Last Maintenance"]),
          nextMaintenance: new Date(row["Next Maintenance"]),
          status: row["Status"],
          powerOutput: parseInt(row["Power Output (kW)"], 10),
          issueReported: row["Issue Reported"] || "",
          technicianAssigned: row["Technician Assigned"] || "",
        });
      })
      .on("end", async () => {
        // Validate data before inserting into database
        for (const turbine of turbines) {
          await prisma.turbine.upsert({
            where: { id: turbine.id },
            update: {},
            create: turbine,
          });
        }
        console.log("Turbines seeding completed");
        resolve(undefined);
      })
      .on("error", reject);
  });
}

export { seedTurbines };
