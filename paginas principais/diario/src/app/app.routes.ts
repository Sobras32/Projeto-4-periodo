import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'diario',
    loadComponent: () => import('./diario/diario.page').then( m => m.DiarioPage)
  },
  {
    path: 'diario-lista',
    loadComponent: () => import('./diario-lista/diario-lista.page').then( m => m.DiarioListaPage)
  },
];
