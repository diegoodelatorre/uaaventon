import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      uaa_email: ['', [Validators.required, Validators.email, this.uaaEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  uaaEmailValidator(control: AbstractControl) {
    const email = control.value as string;
    if (email && !email.endsWith('@edu.uaa.mx')) {
      return { nonInstitutionalEmail: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Registro exitoso.';
          this.errorMessage = '';
          this.registerForm.reset();
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error en el registro.';
          this.successMessage = '';
        }
      });
    }
  }
}
