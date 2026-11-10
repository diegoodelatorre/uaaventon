export interface ITrip {
  id?: number | undefined;
  driver_id: number;
  vehicle_id: number;
  origin_point: string;
  destination_point: string;
  total_seats: number;
  available_seats?: number | undefined;
  price_per_seat: number;
  departure_datetime: string;
  status?: "scheduled" | "in_progress" | "completed" | "cancelled" | undefined;
}

export class Trip implements ITrip {
  public id?: number | undefined;
  public driver_id: number;
  public vehicle_id: number;
  public origin_point: string;
  public destination_point: string;
  public total_seats: number;
  public available_seats: number;
  public price_per_seat: number;
  public departure_datetime: string;
  public status: "scheduled" | "in_progress" | "completed" | "cancelled";

  constructor(data: ITrip) {
    this.id = data.id;
    this.driver_id = data.driver_id;
    this.vehicle_id = data.vehicle_id;
    this.origin_point = data.origin_point;
    this.destination_point = data.destination_point;
    this.total_seats = data.total_seats;
    this.available_seats = data.available_seats ?? data.total_seats;
    this.price_per_seat = data.price_per_seat;
    this.departure_datetime = data.departure_datetime;
    this.status = data.status ?? "scheduled";
  }
}

export default Trip;