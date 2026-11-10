import { Router } from "express";
import { TripController } from "../controllers/trip.controller.js";
import { publishTripValidator } from "../validators/trip.validator.js";
import { validate } from "../middlewares/validateData.js";

const tripController = new TripController();

export class TripRoutes {
  static get router(): Router {
    const router = Router();

    router.post(
      "/",
      publishTripValidator,
      validate,
      tripController.publishTrip,
    );

    return router;
  }
}