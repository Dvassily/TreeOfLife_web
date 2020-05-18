import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginPageComponent} from './app-pages/login-page/login-page.component';
import {RegisterPageComponent} from './app-pages/register-page/register-page.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';

export const AppRoutes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },

  {
    path: 'auth/register',
    component: RegisterPageComponent,
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuardGuard],
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    canActivate: [AuthGuardGuard],
    redirectTo: 'dashboard'
  }
]
