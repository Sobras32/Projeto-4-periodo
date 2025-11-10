// src/app/admin-users/admin-users.page.ts

import { Component, OnInit } from '@angular/core';
// IMPORTANTE: Imports para o componente standalone
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // <-- Importa o ReactiveForms

// Imports para a lógica
import { AlertController, ModalController } from '@ionic/angular';

// Interface para o usuário (baseada no seu doc)
interface User {
  id: string; // ID do Firebase
  nome: string;
  email: string;
  telefone?: string;
  role: 'admin' | 'user'; // <-- ALTERAÇÃO AQUI
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule // <-- Adiciona o ReactiveFormsModule aqui
  ]
})
export class AdminUsersPage implements OnInit {

  users: User[] = [];
  userForm: FormGroup;
  isModalOpen = false;
  modalTitle = '';
  currentUserId: string | null = null; // Para saber se estamos editando ou criando

  constructor(
    private alertController: AlertController,
    private fb: FormBuilder
    // TODO: Injete seu serviço do Firebase
  ) {
    // Inicializa o formulário
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  // 1. CARREGAR (Read)
  loadUsers() {
    // TODO: Substitua pelo Firebase
    // Quando você buscar do Firebase, certifique-se de trazer o campo 'role'
    this.users = [
      { id: '1', nome: 'Vilmar Longo', email: 'vilmar@email.com', telefone: '(21) 98877-6655', role: 'admin' }, // <-- ALTERAÇÃO AQUI
      { id: '2', nome: 'João Giffoni', email: 'joao@email.com', telefone: '(11) 91122-3344', role: 'user' }, // <-- ALTERAÇÃO AQUI
      { id: '3', nome: 'Ramon Barbosa', email: 'ramon@email.com', telefone: '', role: 'user' }, // <-- ALTERAÇÃO AQUI
    ];
  }

  // 2. ABRIR MODAL (Para Criar ou Editar)
  openUserModal(user: User | null) {
    if (user) {
      // Editando: Preenche o formulário
      this.modalTitle = 'Editar Usuário';
      this.currentUserId = user.id;
      this.userForm.patchValue(user);
    } else {
      // Criando: Limpa o formulário
      this.modalTitle = 'Novo Usuário';
      this.currentUserId = null;
      this.userForm.reset();
    }
    this.isModalOpen = true;
  }

  // 3. FECHAR MODAL
  closeUserModal() {
    this.isModalOpen = false;
  }

  // 4. SALVAR (Create / Update)
  saveUser() {
    if (this.userForm.invalid) {
      return; // Não faz nada se o formulário for inválido
    }

    const formData = this.userForm.value;

    if (this.currentUserId) {
      // Lógica de ATUALIZAR (Update)
      // TODO: Chamar seu serviço Firebase: firebaseService.updateUser(this.currentUserId, formData)
      
      // Mock
      const index = this.users.findIndex(u => u.id === this.currentUserId);
      if (index > -1) {
        // Recriamos o objeto para garantir que 'role' não seja perdido (se não estiver no form)
        const oldUser = this.users[index];
        this.users[index] = { ...oldUser, ...formData };
      }
      console.log('Usuário atualizado (mock):', this.users[index]);

    } else {
      // Lógica de CRIAR (Create)
      const newId = new Date().toISOString(); // Mock de ID
      // TODO: Chamar seu serviço Firebase: firebaseService.createUser(formData)
      // (Lembre-se que o Auth é separado, aqui você cria o perfil no Firestore)

      // Mock
      // Definimos um novo usuário como 'user' por padrão
      const newUser: User = { id: newId, ...formData, role: 'user' }; 
      this.users.push(newUser);
      console.log('Novo usuário (mock):', newUser);
    }

    this.closeUserModal();
  }

  // 5. DELETAR (Delete)
  async deleteUserConfirm(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir <strong>${user.nome}</strong>? Esta ação não pode ser desfeita.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          cssClass: 'alert-button-danger',
          handler: () => {
            // TODO: Chamar seu serviço Firebase: firebaseService.deleteUser(user.id)
            
            // Mock
            this.users = this.users.filter(u => u.id !== user.id);
            console.log('Usuário deletado (mock):', user.id);
          }
        }
      ]
    });
    await alert.present();
  }
}