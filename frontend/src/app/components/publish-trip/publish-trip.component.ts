import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { TripRequest } from '../../models/trip.model';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-publish-trip',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './publish-trip.component.html'
})
export class PublishTripComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly tripService = inject(TripService);

  successMessage = '';
  errorMessage = '';

  tripForm = this.fb.group({
    driver_id: [1],
    origin_point: ['', Validators.required],
    destination_point: ['', Validators.required],
    total_seats: [3, [Validators.required, Validators.min(1), Validators.max(8)]],
    price_per_seat: [35, [Validators.required, Validators.min(0)]],
    departure_datetime: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.tripForm.valid) {
      const payload: TripRequest = this.tripForm.getRawValue();
      this.tripService.publishTrip(payload).subscribe({
        next: (res: ApiResponse) => {
          this.successMessage = res.message || 'Tu viaje ha sido publicado';
          this.errorMessage = '';
          this.tripForm.reset({ driver_id: 1, total_seats: 3, price_per_seat: 35 });
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Error al publicar el viaje.';
          this.successMessage = '';
        }
      });
    } else {
      this.tripForm.markAllAsTouched();
    }
  }
}