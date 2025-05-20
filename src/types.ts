export interface Manufacturer {
  manufacturerSerialId: string;
  manufacturerName: string;
  modelName: string;
  country: string;
  description: string;
  ratedPower: number;
  offshore: boolean;
  onshore: boolean;
}

export enum TurbineStatus {
  Operational = "Operational",
  Offline = "Offline",
  Pending = "Pending",
}

export interface Turbine {
  turbineId: string;
  manufacturerSerialId: string;
  location: string;
  lastMaintenance: string;
  status: TurbineStatus;
  powerOutput: number;
  serialId: Manufacturer;
}
