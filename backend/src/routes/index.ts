import { Router } from "express";
import { AuthRoutes } from "./auth.routes.js";
import { VehicleRoutes } from "./vehicle.routes.js";
import { TripRoutes } from "./trip.routes.js";

export class AppRoutes {
  static get router(): Router {
    const router = Router();

    router.use("/auth", AuthRoutes.router);
    router.use("/vehicles", VehicleRoutes.router);
    router.use("/trips", TripRoutes.router);

    return router;
  }
}