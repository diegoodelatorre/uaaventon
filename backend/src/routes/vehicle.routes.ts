import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller.js";
import { registerVehicleValidator } from "../validators/vehicle.validator.js";
import { validate } from "../middlewares/validateData.js";

const vehicleController = new VehicleController();

export class VehicleRoutes {
  static get router(): Router {
    const router = Router();

    router.post(
      "/",
      registerVehicleValidator,
      validate,
      vehicleController.registerVehicle,
    );

    return router;
  }
}