import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Regla Arquitectónica: Inyección moderna con inject()
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si el token existe y es válido
  if (authService.isAuthenticated()) {
    return true; // Puerta abierta
  } else {
    // Si no está autenticado, lo pateamos de vuelta al login
    router.navigate(['/login']);
    return false; // Puerta cerrada
  }
};