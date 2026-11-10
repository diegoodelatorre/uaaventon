import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  successMessage = '';
  errorMessage = '';

  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    uaa_email: ['', [Validators.required, Validators.email, this.uaaEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  uaaEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (email && !email.endsWith('@edu.uaa.mx')) {
      return { nonInstitutionalEmail: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: (res: ApiResponse) => {
          this.successMessage = res.message || 'Registro exitoso.';
          this.errorMessage = '';
          this.registerForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Error en el registro.';
          this.successMessage = '';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}