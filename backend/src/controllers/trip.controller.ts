import type { Request, Response } from "express";
import { TripService } from "../services/trip.service.js";

const tripService = new TripService();

export class TripController {
  constructor() {}

  public async publishTrip(req: Request, res: Response) {
    try {
      const { driver_id } = req.body;

      const user = await tripService.verifyDriverStatus(driver_id);
      if (!user || user.is_driver === 0) {
        return res.status(403).json({
          message: "Acceso denegado: Debes registrarte como conductor primero.",
        });
      }

      const vehicle = await tripService.getFirstVehicle(driver_id);
      if (!vehicle) {
        return res.status(403).json({
          message: "Acceso denegado: No tienes ningun vehiculo registrado.",
        });
      }

      req.body.vehicle_id = vehicle.id;
      await tripService.create(req.body);

      res.status(201).json({ message: "Viaje publicado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor", error });
    }
  }
}