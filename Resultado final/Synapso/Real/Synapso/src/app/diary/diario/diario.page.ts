import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; // <-- 1. REMOVIDO
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router'; 
import { DiarioService, EntradaDiario } from '../../services/diario.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    // FormsModule, // <-- 2. REMOVIDO
    IonicModule,
    RouterLink 
  ]
})
export class DiarioPage implements OnInit {

  public dataSelecionada: string = new Date().toISOString();
  public diasDestacados: any[] = [];
  public humorAtual: string = '';
  public textoAtual: string = '';

  public humores = [
    { nome: 'feliz', icone: 'happy-outline', cor: '#FFD700' },
    { nome: 'bem', icone: 'leaf-outline', cor: '#90EE90' },
    { nome: 'ok', icone: 'thumbs-up-outline', cor: '#B0C4DE' },
    { nome: 'triste', icone: 'sad-outline', cor: '#ADD8E6' },
    { nome: 'ansioso', icone: 'flash-outline', cor: '#E5A88C' }
  ];

  constructor(
    private diarioService: DiarioService,
    private toastCtrl: ToastController
  ) { }

  ionViewWillEnter() {
    this.carregarEntradaParaData(this.dataSelecionada);
    this.atualizarDiasDestacados();
  }

  ngOnInit() {
    this.carregarEntradaParaData(this.dataSelecionada);
    this.atualizarDiasDestacados();
  }

  // --- 3. NOVAS FUNÇÕES PARA SUBSTITUIR O NGMODEL ---

  /**
   * Chamado quando o valor do segment (humor) muda.
   */
  onHumorChange(event: any) {
    this.humorAtual = event.detail.value;
  }

  /**
   * Chamado a cada vez que o usuário digita no textarea.
   */
  onTextoChange(event: any) {
    this.textoAtual = event.target.value;
  }

  // --- O resto das suas funções (sem mudanças) ---

  private getDataKey(isoString: string): string {
    return isoString.split('T')[0];
  }

  private carregarEntradaParaData(dataISO: string) {
    const dataKey = this.getDataKey(dataISO);
    const entrada = this.diarioService.getEntradaPorData(dataKey);

    if (entrada) {
      this.humorAtual = entrada.mood;
      this.textoAtual = entrada.texto;
    } else {
      this.humorAtual = '';
      this.textoAtual = '';
    }
  }

  public async salvarEntrada() {
    if (!this.humorAtual && !this.textoAtual.trim()) {
      return; 
    }

    const dataKey = this.getDataKey(this.dataSelecionada);
    const novaEntrada: EntradaDiario = {
      dataKey: dataKey,
      mood: this.humorAtual,
      texto: this.textoAtual
    };

    this.diarioService.salvarEntrada(novaEntrada);
    this.atualizarDiasDestacados();

    const toast = await this.toastCtrl.create({
      message: 'Diário salvo!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  private atualizarDiasDestacados() {
    const entradas = this.diarioService.getEntradasOrdenadas();
    this.diasDestacados = entradas.map(entrada => ({
      date: entrada.dataKey,
      textColor: '#800080',
      backgroundColor: 'rgba(128, 0, 128, 0.1)',
    }));
  }

  public onDataChange(event: any) {
    const dataISO = event.detail.value;
    this.dataSelecionada = dataISO;
    this.carregarEntradaParaData(dataISO);
  }
}