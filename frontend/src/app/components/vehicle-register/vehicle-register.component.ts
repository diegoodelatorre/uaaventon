import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleRequest } from '../../models/vehicle.model';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-vehicle-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vehicle-register.component.html'
})
export class VehicleRegisterComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly vehicleService = inject(VehicleService);

  successMessage = '';
  errorMessage = '';

  vehicleForm = this.fb.group({
    user_id: [1],
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
    color: ['', Validators.required],
    license_plate: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]{5,10}$/)]],
    license_number: ['', Validators.required],
    terms_accepted: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const payload: VehicleRequest = this.vehicleForm.getRawValue();
      this.vehicleService.registerVehicle(payload).subscribe({
        next: (res: ApiResponse) => {
          this.successMessage = res.message || 'Tu vehículo ha sido registrado.';
          this.errorMessage = '';
          this.vehicleForm.reset({ user_id: 1, year: new Date().getFullYear(), terms_accepted: false });
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Error al registrar vehículo.';
          this.successMessage = '';
        }
      });
    } else {
      this.vehicleForm.markAllAsTouched();
    }
  }
}