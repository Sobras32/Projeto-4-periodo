// Em src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // ... outras rotas
  {
    path: '',
    redirectTo: 'novo-login', // Redireciona para a nova página de login
    pathMatch: 'full',
  },
  {
    path: 'novo-login', // A rota para a sua nova página
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
];