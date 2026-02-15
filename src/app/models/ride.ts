export type VehicleType = 'Car' | 'Bike';

export interface Ride {
  id: string;
  employeeId: string;
  vehicleType: VehicleType;
  vehicleNo: string;
  seats: number;
  time: string;
  pickup: string;
  destination: string;
}