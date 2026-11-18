export interface TripRequest {
  driver_id: number;
  origin_point: string;
  destination_point: string;
  total_seats: number;
  price_per_seat: number;
  departure_datetime: string;
}