import db from '../conf/db.js';

export class TripModel {
  static async verifyDriverStatus(driver_id: number) {
    const query = `SELECT is_driver FROM users WHERE id = ?`;
    const [rows]: any = await db.execute(query, [driver_id]);
    return rows[0];
  }

  static async getFirstVehicle(driver_id: number) {
    const query = `SELECT id FROM vehicles WHERE user_id = ? AND is_enabled = TRUE LIMIT 1`;
    const [rows]: any = await db.execute(query, [driver_id]);
    return rows[0];
  }

  static async create(tripData: any) {
    const query = `
      INSERT INTO trips (
        driver_id, vehicle_id, origin_point, destination_point, 
        total_seats, available_seats, price_per_seat, departure_datetime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      tripData.driver_id,
      tripData.vehicle_id,
      tripData.origin_point,
      tripData.destination_point,
      tripData.total_seats,
      tripData.total_seats, 
      tripData.price_per_seat,
      tripData.departure_datetime.replace('T', ' ')
    ];
    
    const [result] = await db.execute(query, values);
    return result;
  }
}