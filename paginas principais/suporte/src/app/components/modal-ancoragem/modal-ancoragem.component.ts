import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importe o SCHEMA
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-modal-ancoragem',
  templateUrl: './modal-ancoragem.component.html',
  styleUrls: ['./modal-ancoragem.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Adicione o SCHEMA para o Swiper
})
export class ModalAncoragemComponent {

  slideOpts: SwiperOptions = {
    pagination: {
      clickable: true,
    },
  };

  constructor(private modalCtrl: ModalController) { }

  fecharModal() {
    this.modalCtrl.dismiss();
  }
  
  onSlideChange(event: any) {
    console.log('Slide mudou', event);
  }
}