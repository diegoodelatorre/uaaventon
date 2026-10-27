import { Router } from 'express';
import { body } from 'express-validator';
import { registerUser } from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  [
    body('first_name').notEmpty().withMessage('El nombre es obligatorio'),
    body('last_name').notEmpty().withMessage('El apellido es obligatorio'),
    body('uaa_email')
      .isEmail().withMessage('Debe ser un correo válido')
      .custom((value) => {
        if (!value.endsWith('@edu.uaa.mx')) {
          throw new Error('El correo debe ser institucional (@edu.uaa.mx)');
        }
        return true;
      }),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
  ],
  registerUser
);

export default router;