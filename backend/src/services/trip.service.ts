import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../conf/db.js";
import { Trip, type ITrip } from "../models/index.js";

export class TripService {
  public async verifyDriverStatus(
    driver_id: number,
  ): Promise<{ is_driver: number } | undefined> {
    const query = `SELECT is_driver FROM users WHERE id = ?`;
    const [rows] = await db.execute<RowDataPacket[]>(query, [driver_id]);
    return rows[0] as { is_driver: number } | undefined;
  }

  public async getFirstVehicle(
    driver_id: number,
  ): Promise<{ id: number } | undefined> {
    const query = `SELECT id FROM vehicles WHERE user_id = ? AND is_enabled = TRUE LIMIT 1`;
    const [rows] = await db.execute<RowDataPacket[]>(query, [driver_id]);
    return rows[0] as { id: number } | undefined;
  }

  public async create(tripData: ITrip): Promise<ResultSetHeader> {
    const trip = new Trip(tripData);
    const query = `
      INSERT INTO trips (
        driver_id, vehicle_id, origin_point, destination_point, 
        total_seats, available_seats, price_per_seat, departure_datetime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      trip.driver_id,
      trip.vehicle_id,
      trip.origin_point,
      trip.destination_point,
      trip.total_seats,
      trip.available_seats,
      trip.price_per_seat,
      trip.departure_datetime.replace("T", " "),
    ];

    const [result] = await db.execute<ResultSetHeader>(query, values);
    return result;
  }
}