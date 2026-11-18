import { Trip, User, Vehicle, type ITrip } from "../models/index.js";

export class TripService {
  public async verifyDriverStatus(driver_id: number): Promise<User | null> {
    return await User.findByPk(driver_id, {
      attributes: ["id", "is_driver"],
    });
  }

  public async getFirstVehicle(driver_id: number): Promise<Vehicle | null> {
    return await Vehicle.findOne({
      where: {
        user_id: driver_id,
        is_enabled: true,
      },
      attributes: ["id"],
    });
  }

  public async create(tripData: ITrip): Promise<Trip> {
    const formattedDate =
      typeof tripData.departure_datetime === "string"
        ? tripData.departure_datetime.replace("T", " ")
        : tripData.departure_datetime;

    return await Trip.create({
      driver_id: Number(tripData.driver_id),
      vehicle_id: Number(tripData.vehicle_id),
      origin_point: tripData.origin_point,
      destination_point: tripData.destination_point,
      total_seats: Number(tripData.total_seats),
      available_seats: Number(tripData.available_seats ?? tripData.total_seats),
      price_per_seat: Number(tripData.price_per_seat),
      departure_datetime: formattedDate,
    });
  }
}