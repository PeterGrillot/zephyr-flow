-- CreateTable
CREATE TABLE "turbine" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "Installation Date" TIMESTAMP(3) NOT NULL,
    "Last Maintenance" TIMESTAMP(3) NOT NULL,
    "Next Maintenance Due" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "Power Output (kW)" INTEGER NOT NULL,
    "Issue Reported" TEXT,
    "Technician Assigned" TEXT,
    "manufacturerSerialId" TEXT NOT NULL,

    CONSTRAINT "turbine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "Manufacturer Serial ID" TEXT NOT NULL,
    "Manufacturer Name" TEXT NOT NULL,
    "Model Name" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "Description" TEXT,
    "Rated Power (kW)" INTEGER NOT NULL,
    "Offshore" BOOLEAN NOT NULL,
    "Onshore" BOOLEAN NOT NULL,

    CONSTRAINT "manufacturer_pkey" PRIMARY KEY ("Manufacturer Serial ID")
);

-- AddForeignKey
ALTER TABLE "turbine" ADD CONSTRAINT "turbine_manufacturerSerialId_fkey" FOREIGN KEY ("manufacturerSerialId") REFERENCES "manufacturer"("Manufacturer Serial ID") ON DELETE RESTRICT ON UPDATE CASCADE;
