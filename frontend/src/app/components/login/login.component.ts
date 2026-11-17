import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // Ya no importamos CommonModule gracias a @if
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Regla Arquitectónica: Inyección de dependencias moderna
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage = '';
  isLoading = false;

  // Regla Arquitectónica: Formularios reactivos estrictos
  loginForm = this.fb.group({
    uaa_email: ['', [Validators.required, Validators.email, this.uaaEmailValidator]],
    password: ['', [Validators.required]]
  });

  // Validador personalizado para el correo institucional
  uaaEmailValidator(control: AbstractControl) {
    const email = control.value as string;
    if (email && !email.endsWith('@edu.uaa.mx')) {
      return { nonInstitutionalEmail: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.isLoading = false;
        // Redirige al dashboard (lo configuraremos en las rutas después)
        this.router.navigate(['/dashboard']); 
      },
      error: (err: HttpErrorResponse) => { // Regla Arquitectónica: Cero 'any', tipado estricto de errores
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Error al intentar iniciar sesión.';
      }
    });
  }
}