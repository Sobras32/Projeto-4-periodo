// src/app/app.routes.ts (CORRIGIDO)

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-admin', // <-- MUDANÇA: Mande para a página que existe
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    // Esta é a rota que você chamava de 'novo-login'
    // Vamos fazê-la carregar a página login-admin
    path: 'login-admin', 
    loadComponent: () =>
      import('./login-admin/login-admin.page').then(m => m.LoginAdminPage),
  },
  
  // A rota para './login/login.page' foi REMOVIDA porque a pasta não existe
];