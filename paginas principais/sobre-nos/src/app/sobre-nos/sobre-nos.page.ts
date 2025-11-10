// src/app/sobre-nos/sobre-nos.page.ts

// ADICIONE ESTES IMPORTS NO TOPO
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { IonicModule } from '@ionic/angular';   // Importe o IonicModule

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
  standalone: true, // <-- Isso confirma que é um componente standalone
  imports: [
    IonicModule,   // <-- ADICIONE ISSO
    CommonModule   // <-- E ISSO
  ] 
})
export class SobreNosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}