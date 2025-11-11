// src/main.ts (O CÓDIGO CORRIGIDO)

import { enableProdMode, importProvidersFrom } from '@angular/core'; // <-- 1. ADICIONE importProvidersFrom
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router'; // <-- Você já deve ter o provideRouter
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// <-- 2. IMPORTE O STORAGE AQUI
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// É AQUI que a configuração é feita
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),

    // <-- 3. ADICIONE ESSA LINHA AQUI
    importProvidersFrom(IonicStorageModule.forRoot()),
    // ---

    provideRouter(routes) // <-- Você já deve ter esta linha
  ],
});