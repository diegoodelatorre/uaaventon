import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { hashPassword } from "../utils/password.util.js";
import { AuthService } from "../services/auth.service.js";

const userService = new UserService();
const authService = new AuthService();

export class AuthController {
  constructor() {}

  public async registerUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, uaa_email, password } = req.body;

      const existingUser = await userService.findByEmail(uaa_email);
      if (existingUser) {
        return res.status(400).json({ message: "El usuario ya está registrado" });
      }

      const password_hash = await hashPassword(password);

      await userService.create({
        first_name,
        last_name,
        uaa_email,
        password_hash,
      });

      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const { uaa_email, password } = req.body;
      const result = await authService.login(uaa_email, password);

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        ...result,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        return res
          .status(401)
          .json({ message: "Correo institucional o contraseña incorrectos" });
      }
      res.status(500).json({ message: "Error en el servidor", error });
    }
  }
}