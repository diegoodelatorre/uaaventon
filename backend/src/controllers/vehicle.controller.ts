import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { VehicleModel } from '../models/vehicle.model.js';

export const registerVehicle = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    await VehicleModel.registerVehicleAndUpgradeUser(req.body);
    res.status(201).json({ message: 'Vehículo registrado y perfil actualizado a conductor' });
  } catch (error: any) {
    
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Esa placa ya está registrada en el sistema' });
      return;
    }
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};