import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
   {
    path: '',
    
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'sobre-nos',
    loadChildren: () => import('./sobre-nos/sobre-nos.module').then( m => m.SobreNosPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'desafios',
    loadChildren: () => import('./desafios/desafios.module').then( m => m.DesafiosPageModule)
  },
  {
    path: 'suporte',
    loadComponent: () => import('./suporte/app/pages/suporte/suporte.page').then( m => m.SuportePage)
  },
  {
    path: 'diario',
    loadComponent: () => import('./diary/diario/diario.page').then( m => m.DiarioPage)
  },
  {
    path: 'diario-lista',
    loadComponent: () => import('./diary/diario-lista/diario-lista.page').then( m => m.DiarioListaPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
