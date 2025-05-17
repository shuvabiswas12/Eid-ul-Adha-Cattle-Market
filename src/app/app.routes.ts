import { Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';
import { AddCattleComponent } from './components/add-cattle/add-cattle.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  { path: '', redirectTo: 'cattle', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'cattle', component: CattleListComponent, canActivate: [authGuard] },
  { path: 'add', component: AddCattleComponent, canActivate: [authGuard] }
];
