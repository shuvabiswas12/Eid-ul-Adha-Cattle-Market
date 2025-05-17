import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Eid-ul-Adha-Cattle-Market';

  constructor(public auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  // goToAddCattle() {
  //   this.router.navigate(['/add']);
  // }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToLogout() {
    this.router.navigate(['/logout']);
  }
}
