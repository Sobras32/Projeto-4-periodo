// src/app/home/home.page.ts (Versão com mais funções)

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class HomePage {

  constructor(
    public auth: AutenticacaoService, // O service agora é público
    private router: Router
  ) { }

  // Função de Logout
  fazerLogout() {
    this.auth.logout()
      .then(() => {
        console.log("Usuário deslogado");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  }

  // --- FUNÇÕES QUE FALTAVAM ---

  // Função para o botão de Login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Função para o avatar de perfil (exemplo)
  goToProfile() {
    // Você ainda não tem uma página de perfil,
    // então vamos mandar para o dashboard por enquanto.
    this.router.navigate(['/dashboard']); 
  }

  // --- Funções de navegação ---
  irParaDiario() {
    this.router.navigate(['/diario']);
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
}