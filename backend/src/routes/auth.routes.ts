import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { 
  registerUserValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validateData.js";
import { verifyToken, requireDriver } from "../middlewares/auth.middleware.js";

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

    router.post(
      "/login",
      loginValidator,
      validate,
      authController.loginUser,
    );

    router.get("/me", verifyToken, (req, res) => {
      res.status(200).json({ user: req.user });
    });

    router.get("/driver-check", verifyToken, requireDriver, (req, res) => {
      res.status(200).json({
        message: "Acceso de conductor verificado",
        user: req.user,
      });
    });

    return router;
  }
}