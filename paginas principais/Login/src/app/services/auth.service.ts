// src/app/services/auth.service.ts (COLE ESTE CÓDIGO)

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // <-- Importe o Storage

@Injectable({
  providedIn: 'root'
})
export class AuthService { // <-- Esta é a linha que o erro diz que está faltando

  public isLoggedIn: boolean = false;
  public user: any = null; // Vai guardar { nome, email, photoURL }

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    // Inicializa o storage (necessário)
    await this.storage.create();
    
    // Tenta carregar um usuário "salvo" quando o app abre
    const savedUser = await this.storage.get('synapso_user');
    if (savedUser) {
      this.user = savedUser;
      this.isLoggedIn = true;
    }
  }

  // Você vai chamar isso na sua PÁGINA DE LOGIN quando o login for um SUCESSO
  async loginComSucesso(dadosDoUsuario: any) {
    this.user = dadosDoUsuario; // Salva os dados no serviço
    this.isLoggedIn = true;
    
    // Salva no armazenamento local para "lembrar"
    await this.storage.set('synapso_user', dadosDoUsuario);
  }

  // Você chama isso quando o usuário clicar em "Sair"
  async logout() {
    this.user = null;
    this.isLoggedIn = false;
    
    // Limpa do armazenamento
    await this.storage.remove('synapso_user');
  }
}