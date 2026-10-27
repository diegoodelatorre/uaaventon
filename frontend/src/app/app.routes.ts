import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';  

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'vehicle-register', component: VehicleRegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];