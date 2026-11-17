import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// --- Regla Arquitectónica: Tipado estricto (Cero 'any') ---
export interface RegisterCredentials {
  first_name: string;
  last_name: string;
  uaa_email: string;
  password?: string;
}

export interface UserPayload {
  id: number;
  uaa_email: string;
  is_driver: boolean; // Vital para la US06
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: UserPayload;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Regla Arquitectónica: Inyección vía inject(), prohibido constructor
  private readonly http = inject(HttpClient);

  // Regla Arquitectónica: URL dinámica desde environment
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'uaaventon_token';

  // Mantenemos tu método de registro pero ahora con tipado estricto
  register(userData: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData);
  }

  // Nuevo método de Login que guarda el JWT automáticamente
  login(credentials: { uaa_email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Verificamos si el token ya expiró
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  isDriver(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Extraemos el rol directamente del payload del token JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Boolean(payload.is_driver);
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
