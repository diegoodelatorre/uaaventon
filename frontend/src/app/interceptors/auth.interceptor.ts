import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Regla Arquitectónica: Inyección de dependencias con inject()
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si hay un token guardado, clonamos la petición y le inyectamos el header de Autorización
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Si no hay token (ej. al hacer login o registro), dejamos pasar la petición tal cual
  return next(req);
};