import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripRequest } from '../models/trip.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/trips`;

  publishTrip(tripData: TripRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, tripData);
  }
}