import db from "../conf/db.js";
import { Vehicle, type IVehicle } from "../models/index.js";

export class VehicleService {
  public async registerVehicleAndUpgradeUser(
    vehicleData: IVehicle,
  ): Promise<boolean> {
    const vehicle = new Vehicle(vehicleData);
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const vehicleQuery = `
        INSERT INTO vehicles (user_id, make, model, year, color, license_plate) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const vehicleValues = [
        vehicle.user_id,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.license_plate,
      ];
      await connection.execute(vehicleQuery, vehicleValues);

      const userQuery = `
        UPDATE users 
        SET is_driver = TRUE, license_number = ? 
        WHERE id = ?
      `;
      await connection.execute(userQuery, [
        vehicle.license_number ?? null,
        vehicle.user_id,
      ]);

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}