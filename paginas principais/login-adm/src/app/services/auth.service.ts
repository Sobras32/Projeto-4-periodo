import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Importa o Storage

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean = false;
  public user: any = null; // Vai guardar { nome, email, photoURL }

  private storageInicializado: boolean = false;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    // Inicializa o storage (necessário apenas uma vez)
    await this.storage.create();
    this.storageInicializado = true;
    
    // Tenta carregar um usuário "salvo" quando o app abre
    const savedUser = await this.storage.get('synapso_user');
    if (savedUser) {
      this.user = savedUser;
      this.isLoggedIn = true;
    }
  }

  // Garante que o storage foi inicializado antes de usar
  private async aguardarStorage() {
    while (!this.storageInicializado) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  // Você chama isso na sua PÁGINA DE LOGIN quando o login for um SUCESSO
  async loginComSucesso(dadosDoUsuario: any) {
    await this.aguardarStorage(); // Espera o storage estar pronto
    this.user = dadosDoUsuario; // Salva os dados no serviço
    this.isLoggedIn = true;
    
    // Salva no armazenamento local para "lembrar"
    await this.storage.set('synapso_user', dadosDoUsuario);
  }

  // Você chama isso quando o usuário clicar em "Sair"
  async logout() {
    await this.aguardarStorage(); // Espera o storage estar pronto
    this.user = null;
    this.isLoggedIn = false;
    
    // Limpa do armazenamento
    await this.storage.remove('synapso_user');
  }
}