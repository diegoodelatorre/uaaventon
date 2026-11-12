import sequelize from "../conf/db.js";
import { Vehicle, User, type IVehicle } from "../models/index.js";

export class VehicleService {
  public async registerVehicleAndUpgradeUser(
    vehicleData: IVehicle
  ): Promise<boolean> {
    return await sequelize.transaction(async (t) => {
      await Vehicle.create(
        {
          user_id: Number(vehicleData.user_id),
          make: vehicleData.make,
          model: vehicleData.model,
          year: Number(vehicleData.year),
          color: vehicleData.color,
          license_plate: vehicleData.license_plate,
        },
        { transaction: t }
      );

      await User.update(
        {
          is_driver: true,
          license_number: vehicleData.license_number ?? null,
        },
        {
          where: { id: Number(vehicleData.user_id) },
          transaction: t,
        }
      );

      return true;
    });
  }
}