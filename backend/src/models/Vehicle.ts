export interface IVehicle {
  id?: number | undefined;
  user_id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  is_enabled?: boolean | undefined;
  license_number?: string | null | undefined;
}

export class Vehicle implements IVehicle {
  public id?: number | undefined;
  public user_id: number;
  public make: string;
  public model: string;
  public year: number;
  public color: string;
  public license_plate: string;
  public is_enabled: boolean;
  public license_number?: string | null | undefined;

  constructor(data: IVehicle) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.make = data.make;
    this.model = data.model;
    this.year = data.year;
    this.color = data.color;
    this.license_plate = data.license_plate;
    this.is_enabled = data.is_enabled ?? true;
    this.license_number = data.license_number;
  }
}

export default Vehicle;