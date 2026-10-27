import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/user.model.js';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { nombre, apellido_paterno, apellido_materno, email, password } = req.body;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya está registrado' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};