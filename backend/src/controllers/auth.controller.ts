import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { hashPassword } from "../utils/password.util.js";

const userService = new UserService();

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
}