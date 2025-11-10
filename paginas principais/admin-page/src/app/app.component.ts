// src/app/app.component.ts

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// 1. Importe a função 'addIcons'
import { addIcons } from 'ionicons';

// 2. Importe CADA ÍCONE que você vai usar no app
import {
  sparklesOutline,
  personCircleOutline,
  schoolOutline,
  shieldCheckmark,
  personCircle,
  callOutline,
  pencil,
  trash,
  addCircle,
  people,
  peopleOutline,
  arrowBack // <- Importante para o <ion-back-button>
} from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  constructor() {
    
    // 3. Registre os ícones aqui no construtor
    addIcons({
      // Ícones da página "Sobre Nós"
      sparklesOutline,
      personCircleOutline,
      schoolOutline,

      // Ícones da página "Admin"
      shieldCheckmark,
      personCircle,
      callOutline,
      pencil,
      trash,
      addCircle,
      people,
      peopleOutline,
      arrowBack
    });
  }
}