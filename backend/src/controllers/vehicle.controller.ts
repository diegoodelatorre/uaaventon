import type { Request, Response } from "express";
import { VehicleService } from "../services/vehicle.service.js";

const vehicleService = new VehicleService();

export class VehicleController {
  constructor() {}

  public async registerVehicle(req: Request, res: Response) {
    try {
      await vehicleService.registerVehicleAndUpgradeUser(req.body);
      res.status(201).json({
        message: "Vehículo registrado y perfil actualizado a conductor",
      });
    } catch (error: any) {
      if (
        error?.name === "SequelizeUniqueConstraintError" ||
        error?.parent?.code === "ER_DUP_ENTRY"
      ) {
        return res
          .status(400)
          .json({ message: "Esa placa ya está registrada en el sistema" });
      }
      res.status(500).json({ message: "Error interno del servidor", error });
    }
  }
}