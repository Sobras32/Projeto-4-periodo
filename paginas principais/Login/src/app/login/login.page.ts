import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// IMPORTS NECESSÁRIOS
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html', // Nome do arquivo corrigido
  styleUrls: ['./login.page.scss'],   // Nome do arquivo corrigido
  standalone: true,
  imports: [
    // ADICIONE OS MÓDULOS AQUI
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('Dados do formulário para login:', this.loginForm.value);
  }
}