// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean = false;
  public user: any = null; // Vai guardar { nome, email, photoURL }

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    // Tenta carregar um usuário salvo quando o app abre
    const savedUser = await this.storage.get('synapso_user');
    if (savedUser) {
      this.user = savedUser;
      this.isLoggedIn = true;
    }
  }

  // Chame isso na sua PÁGINA DE LOGIN quando o login for um SUCESSO
  async loginComSucesso(dadosDoUsuario: any) {
    this.user = dadosDoUsuario;
    this.isLoggedIn = true;
    // Salva no armazenamento local para "lembrar"
    await this.storage.set('synapso_user', dadosDoUsuario);
  }

  // Chame isso quando o usuário clicar em "Sair"
  async logout() {
    this.user = null;
    this.isLoggedIn = false;
    await this.storage.remove('synapso_user');
  }
}