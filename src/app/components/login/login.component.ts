import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;
  loading = false;
  loggedIn = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn();
    if (this.router.url === '/logout' && this.loggedIn) {
      this.auth.logout().subscribe({
        next: () => {
          this.loggedIn = false;
          this.router.navigate(['/login']);
        },
        error: () => {
          this.loggedIn = false;
          this.router.navigate(['/login']);
        },
      });
    }
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { user, pass } = this.loginForm.value;
    this.auth.login(user, pass).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.loading = false;
        this.router.navigate(['/cattle']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
        this.loading = false;
      },
    });
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.loggedIn = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loggedIn = false;
        this.router.navigate(['/login']);
      },
    });
  }
}
