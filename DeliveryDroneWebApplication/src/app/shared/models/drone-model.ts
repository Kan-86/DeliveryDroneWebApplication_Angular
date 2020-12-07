export interface DroneModel{
  droneId: number,
  lat: number,
  long: number,
  alt: number,
  course: number,
  speed: number,
  date: Date,
  satelites: number,
  carryingOrder: boolean
}
