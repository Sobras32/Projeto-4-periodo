import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Imports que estavam faltando
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    // Este array corrigido resolve todos os erros
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CadastroPage {
  // O resto do seu código, que já estava correto
  credentials = {
    name: '',
    nickname: '',
    birthdate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  passwordsDoNotMatch = false;

  constructor(private router: Router) { }
  
  onPhoneInput(event: any) {
    const value = event.target.value;
    const filteredValue = value.replace(/[^0-9]/g, '');
    this.credentials.phone = filteredValue;
    event.target.value = filteredValue;
  }

  register() {
    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.passwordsDoNotMatch = false;
    
    console.log('Dados para cadastro:', this.credentials);
  }
}