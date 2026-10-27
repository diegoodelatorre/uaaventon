import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-publish-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './publish-trip.component.html'
})
export class PublishTripComponent {
  tripForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private tripService: TripService) {
    this.tripForm = this.fb.group({
      driver_id: [1], 
      origin_point: ['', Validators.required],
      destination_point: ['', Validators.required],
      total_seats: ['', [Validators.required, Validators.min(1), Validators.max(8)]],
      price_per_seat: ['', [Validators.required, Validators.min(0)]],
      departure_datetime: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      this.tripService.publishTrip(this.tripForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Tu viaje ha sido publicado';
          this.errorMessage = '';
          this.tripForm.reset({ driver_id: 1 });
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Error al publicar el viaje.';
          this.successMessage = '';
        }
      });
    } else {
      this.tripForm.markAllAsTouched();
    }
  }
}