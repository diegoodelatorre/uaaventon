import db from '../conf/db.js';

export class VehicleModel {
  static async registerVehicleAndUpgradeUser(vehicleData: any) {
    
    const connection = await db.getConnection(); 
    
    try {
      await connection.beginTransaction();

      
      const vehicleQuery = `
        INSERT INTO vehicles (user_id, make, model, year, color, license_plate) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const vehicleValues = [
        vehicleData.user_id, 
        vehicleData.make, 
        vehicleData.model, 
        vehicleData.year, 
        vehicleData.color, 
        vehicleData.license_plate
      ];
      await connection.execute(vehicleQuery, vehicleValues);

      
      const userQuery = `
        UPDATE users 
        SET is_driver = TRUE, license_number = ? 
        WHERE id = ?
      `;
      await connection.execute(userQuery, [vehicleData.license_number, vehicleData.user_id]);

      
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