import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Verificamos si es conductor para mostrarle opciones distintas después
  isDriver = this.authService.isDriver();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}