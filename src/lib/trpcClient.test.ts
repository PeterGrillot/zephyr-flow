import { trpc } from "./trpcClient";

async function testTRPCClient() {
  // Test getManufacturers
  const manufacturers = await trpc.getManufacturers.query();
  console.log("Manufacturers:", manufacturers);

  // Test getTurbines
  const turbines = await trpc.getTurbines.query();
  console.log("Turbines:", turbines);

  // TypeScript will enforce the correct types here
  manufacturers.forEach((manufacturer) => {
    console.log(manufacturer.manufacturerSerialId); // Should be type-safe
  });

  turbines.forEach((turbine) => {
    console.log(turbine.id); // Should be type-safe
  });
}

testTRPCClient().catch((err) => console.error(err));
