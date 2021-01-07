export interface DroneModel{
  droneId: string;
  lat: string;
  long: string;
  alt: number;
  course: number;
  speed: number;
  date: Date;
  satelites: number;
  carryingOrder: boolean;
  orderId: string;
  destinationLat: string;
  destinationLong: string;
}
