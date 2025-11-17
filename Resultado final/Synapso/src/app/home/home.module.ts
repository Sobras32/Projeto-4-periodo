// src/app/home/home.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. IMPORTE AQUI
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule, // <-- 2. ADICIONE AQUI
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}