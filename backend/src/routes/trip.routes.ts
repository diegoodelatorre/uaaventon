import { Router } from 'express';
import { body } from 'express-validator';
import { publishTrip } from '../controllers/trip.controller.js';

const router = Router();

router.post(
  '/',
  [
    body('driver_id').isInt().withMessage('El ID del conductor es obligatorio'),
    body('origin_point').notEmpty().withMessage('El punto de origen es obligatorio'),
    body('destination_point').notEmpty().withMessage('El punto de destino es obligatorio'),
    body('total_seats').isInt({ min: 1, max: 8 }).withMessage('Los asientos deben ser entre 1 y 8'),
    body('price_per_seat').isFloat({ min: 0 }).withMessage('El precio no puede ser negativo'),
    body('departure_datetime').notEmpty().withMessage('La fecha y hora de salida es obligatoria')
  ],
  publishTrip
);

export default router;