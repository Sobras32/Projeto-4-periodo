// src/app/home/home.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router'; // <-- ESTA LINHA ESTAVA FALTANDO
import { AuthService } from '../services/auth.service'; // <-- Esta linha você já devia ter

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false, // Mantendo como estava no seu original
})
export class HomePage {

  // Este é o construtor correto, com as injeções
  constructor(
    public auth: AuthService,
    private router: Router // Agora o 'Router' é reconhecido por causa da importação
  ) {}

  // Estas são as funções que adicionamos
  goToLogin() {
    // Coloque a rota da sua página de login
    this.router.navigateByUrl('/login'); 
  }

  goToProfile() {
    // Coloque a rota da sua página de perfil
    this.router.navigateByUrl('/perfil'); 
  }

  goToDiary() {
    // Troque '/diario' pela rota correta da sua página de diário
    this.router.navigateByUrl('/diario');
  }

}