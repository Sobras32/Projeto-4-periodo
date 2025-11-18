// src/app/admin-users/admin-users.page.ts (Versão Conectada)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

// Importa o serviço e a interface
import { UsuarioService, UserProfile } from '../services/usuario.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule
  ]
})
export class AdminUsersPage implements OnInit {

  users: UserProfile[] = []; // Usando a Interface
  userForm: FormGroup;
  isModalOpen = false;
  modalTitle = '';
  currentUserId: string | null = null; 

  constructor(
    private alertController: AlertController,
    private fb: FormBuilder,
    private usuarioService: UsuarioService // Injete o serviço
  ) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      // Adicione o campo 'role' para poder editar
      role: ['user', Validators.required] 
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  // 1. CARREGAR (Read) - DO FIREBASE
  loadUsers() {
    this.usuarioService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // 2. ABRIR MODAL
  openUserModal(user: UserProfile | null) {
    if (user) {
      this.modalTitle = 'Editar Usuário';
      this.currentUserId = user.uid;
      this.userForm.patchValue(user); // Preenche o form
    } else {
      // (Não permitimos criar usuário por aqui, só pelo cadastro)
      // (Mas se quisesse, seria aqui)
       this.modalTitle = 'Novo Usuário (Não implementado)';
       this.currentUserId = null;
       this.userForm.reset({ role: 'user' });
       // Vamos desabilitar o botão de add por enquanto
       // Ou podemos implementar a criação de usuário admin
    }
    this.isModalOpen = true;
  }

  // 3. FECHAR MODAL
  closeUserModal() {
    this.isModalOpen = false;
  }

  // 4. SALVAR (Update) - NO FIREBASE
  async saveUser() {
    if (this.userForm.invalid || !this.currentUserId) {
      return; 
    }

    const formData = this.userForm.value;

    try {
      await this.usuarioService.updateUser(this.currentUserId, formData);
      this.closeUserModal();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  // 5. DELETAR (Delete) - NO FIREBASE
  async deleteUserConfirm(user: UserProfile) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Tem certeza que deseja excluir <strong>${user.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          cssClass: 'alert-button-danger',
          handler: async () => {
            try {
              // ATENÇÃO: Isso deleta do Firestore, mas NÃO deleta
              // do Firebase Auth. Deletar do Auth é mais complexo
              // e requer Cloud Functions. Por enquanto, só deletamos o perfil.
              await this.usuarioService.deleteUser(user.uid);
            } catch (error) {
              console.error("Erro ao deletar usuário:", error);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}