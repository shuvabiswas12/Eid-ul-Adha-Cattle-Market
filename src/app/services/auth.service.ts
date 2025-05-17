import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  constructor(private http: HttpClient) {}

  SECRET_KEY = 'D8F21E0D-EDD5-49E5-AAD7-AC4A31459C9F';
  EXPIRES_IN_MS = 3600000; // 1 hour

  login(user: string, pass: string): Observable<any> {
    if (user === 'admin' && pass === '1234') {
      const header = {
        alg: 'HS256',
        typ: 'JWT',
      };

      const payload = {
        username: user,
        exp: Math.floor((Date.now() + this.EXPIRES_IN_MS) / 1000),
      };

      const encodedHeader = btoa(JSON.stringify(header));
      const encodedPayload = btoa(JSON.stringify(payload));
      const fakeSignature = btoa('signature');

      const token = `${encodedHeader}.${encodedPayload}.${fakeSignature}`;

      return of({ token });
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.tokenKey);
    return of({ message: 'Logged out' });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
