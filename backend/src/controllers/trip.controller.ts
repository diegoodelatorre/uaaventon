import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { TripModel } from '../models/trip.model.js';

export const publishTrip = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { driver_id } = req.body;

    const user = await TripModel.verifyDriverStatus(driver_id);
    if (!user || user.is_driver === 0) {
      res.status(403).json({ message: 'Acceso denegado: Debes registrarte como conductor primero.' });
      return;
    }

    const vehicle = await TripModel.getFirstVehicle(driver_id);
    if (!vehicle) {
      res.status(403).json({ message: 'Acceso denegado: No tienes ningun vehiculo registrado.' });
      return;
    }

    req.body.vehicle_id = vehicle.id;
    await TripModel.create(req.body);

    res.status(201).json({ message: 'Viaje publicado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};