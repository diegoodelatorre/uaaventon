export interface VehicleRequest {
  user_id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  license_number: string;
  terms_accepted?: boolean;
}