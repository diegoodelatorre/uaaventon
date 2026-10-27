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
    const { first_name, last_name, uaa_email, password } = req.body;

    const existingUser = await UserModel.findByEmail(uaa_email);
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya está registrado' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await UserModel.create({
      first_name,
      last_name,
      uaa_email,
      password_hash
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};