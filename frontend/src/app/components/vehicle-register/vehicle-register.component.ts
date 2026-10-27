import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle-register.component.html'
})
export class VehicleRegisterComponent {
  vehicleForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      user_id: [1],
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear() + 1)]],
      color: ['', Validators.required],
      license_plate: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]{5,10}$/)]],
      license_number: ['', Validators.required],
      terms_accepted: [false, Validators.requiredTrue] 
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.vehicleService.registerVehicle(this.vehicleForm.value).subscribe({
        next: (res) => {
          this.successMessage = '¡Felicidades! Tu vehículo ha sido registrado.';
          this.errorMessage = '';
          this.vehicleForm.reset({ user_id: 1, terms_accepted: false });
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al registrar vehículo.';
          this.successMessage = '';
        }
      });
    } else {
      this.vehicleForm.markAllAsTouched();
    }
  }
}
