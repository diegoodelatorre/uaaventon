import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { registerUserValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validateData.js";

const authController = new AuthController();

export class AuthRoutes {
  static get router(): Router {
    const router = Router();

    router.post(
      "/register",
      registerUserValidator,
      validate,
      authController.registerUser,
    );

    return router;
  }
}