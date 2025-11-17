// src/app/login/login.page.ts (COM A LÓGICA DE LOGIN)

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// <-- ADIÇÃO 1: Importar o AuthService
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  // <-- ADIÇÃO 2: Injetar o AuthService no construtor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService // <-- Adicionado
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // <-- ADIÇÃO 3: Modificamos a função login
  async login() { // A função agora é 'async'
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Tentando logar com:', this.loginForm.value);

    try {
      // 1. (FUTURO) É AQUI QUE VOCÊ CHAMA O FIREBASE
      // ex: await this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.password)
      
      // 2. (POR ENQUANTO) Vamos simular os dados do usuário
      // Quando tiver Firebase, você vai pegar isso do banco de dados
      const dadosDoUsuarioSimulado = {
        nome: "Usuário Synapso",
        email: this.loginForm.value.email,
        // Usando uma foto padrão do Ionic como placeholder
        photoURL: "https://ionicframework.com/docs/img/demos/avatar.svg" 
      };

      // 3. CHAMAMOS O AUTHSERVICE (como planejamos)
      await this.auth.loginComSucesso(dadosDoUsuarioSimulado);

      // 4. Navegamos de volta para a home
      this.router.navigateByUrl('/home');

    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);
      // (Opcional) Aqui você pode mostrar um Alerta/Toast dizendo "Email ou senha inválidos"
    }
  }
}