import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

// Imports de tus compañeros
import { RegisterComponent } from './components/register/register.component';
import { VehicleRegisterComponent } from './components/vehicle-register/vehicle-register.component';
import { PublishTripComponent } from './components/publish-trip/publish-trip.component';

export const routes: Routes = [
  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vehicle-register', component: VehicleRegisterComponent },
  
  // Rutas protegidas (tu parte)
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard] 
  },
  { path: 'publish-trip', component: PublishTripComponent },

  // Redirecciones por defecto (SIEMPRE HASTA EL FINAL)
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];