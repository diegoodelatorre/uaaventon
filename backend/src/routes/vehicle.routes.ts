import { Router } from 'express';
import { body } from 'express-validator';
import { registerVehicle } from '../controllers/vehicle.controller.js';

const router = Router();

router.post(
  '/',
  [
    body('user_id').isInt().withMessage('El ID del usuario es obligatorio'),
    body('make').notEmpty().withMessage('La marca es obligatoria'),
    body('model').notEmpty().withMessage('El modelo es obligatorio'),
    body('year').isInt({ min: 1990, max: new Date().getFullYear() + 1 }).withMessage('Año de vehículo inválido'),
    body('color').notEmpty().withMessage('El color es obligatorio'),
    body('license_plate')
      .matches(/^[A-Z0-9-]{5,10}$/i).withMessage('Formato de placa inválido')
      .toUpperCase(), 
    body('license_number').notEmpty().withMessage('El número de licencia es obligatorio')
  ],
  registerVehicle
);

export default router;