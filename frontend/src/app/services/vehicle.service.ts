import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleRequest } from '../models/vehicle.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/vehicles`;

  registerVehicle(vehicleData: VehicleRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, vehicleData);
  }
}