// Em: src/app/desafios/desafios.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

interface Desafio {
  id: number;
  titulo: string;
  descricao: string;
  categoria: 'Mente' | 'Corpo' | 'Social';
  icone: string;
  concluido: boolean;
}

// ==========================================================
// 1. NOSSA "FONTE" DE DESAFIOS
// ==========================================================
// Todos os desafios possíveis moram aqui.
const LISTA_MESTRA_DESAFIOS: Omit<Desafio, 'concluido'>[] = [
  // Mente
  { id: 1, titulo: 'Respiração Consciente', descricao: 'Tire 3 minutos para focar apenas na sua respiração.', categoria: 'Mente', icone: 'leaf-outline' },
  { id: 2, titulo: 'Nota de Gratidão', descricao: 'Anote 3 coisas pelas quais você é grato hoje.', categoria: 'Mente', icone: 'heart-outline' },
  { id: 3, titulo: 'Pausa Digital', descricao: 'Fique 15 minutos longe das redes sociais.', categoria: 'Mente', icone: 'eye-off-outline' },
  { id: 4, titulo: 'Ler 10 Páginas', descricao: 'Leia 10 páginas de um livro que você gosta.', categoria: 'Mente', icone: 'book-outline' },
  { id: 5, titulo: 'Aprender Algo Novo', descricao: 'Assista um vídeo curto (Ted, etc) sobre um novo tópico.', categoria: 'Mente', icone: 'bulb-outline' },
  // Corpo
  { id: 6, titulo: 'Hidratação Plena', descricao: 'Beba 2 litros de água durante o dia.', categoria: 'Corpo', icone: 'water-outline' },
  { id: 7, titulo: 'Mova o Corpo', descricao: 'Faça um alongamento de 10 minutos.', categoria: 'Corpo', icone: 'barbell-outline' },
  { id: 8, titulo: 'Caminhada Leve', descricao: 'Dê uma volta de 15 minutos (dentro ou fora de casa).', categoria: 'Corpo', icone: 'walk-outline' },
  { id: 9, titulo: 'Comer uma Fruta', descricao: 'Coma uma peça de fruta de forma consciente.', categoria: 'Corpo', icone: 'nutrition-outline' },
  { id: 10, titulo: 'Dormir Cedo', descricao: 'Prepare-se para dormir 30 min mais cedo hoje.', categoria: 'Corpo', icone: 'moon-outline' },
  // Social
  { id: 11, titulo: 'Pequena Gentileza', descricao: 'Envie uma mensagem positiva para um amigo ou familiar.', categoria: 'Social', icone: 'send-outline' },
  { id: 12, titulo: 'Elogio Sincero', descricao: 'Elogie alguém (online ou pessoalmente).', categoria: 'Social', icone: 'happy-outline' },
  { id: 13, titulo: 'Ouvir Ativamente', descricao: 'Pergunte a alguém "Como você está?" e ouça sem interromper.', categoria: 'Social', icone: 'ear-outline' },
  { id: 14, titulo: 'Bom Dia!', descricao: 'Dê um "bom dia" animado para a primeira pessoa que encontrar.', categoria: 'Social', icone: 'sparkles-outline' },
  { id: 15, titulo: 'Contato Visual', descricao: 'Tente manter um contato visual gentil na sua próxima conversa.', categoria: 'Social', icone: 'eye-outline' },
];


@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.page.html',
  styleUrls: ['./desafios.page.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, FormsModule ]
})
export class DesafiosPage implements OnInit {

  public desafiosDiarios: Desafio[] = [];
  public categorias: string[] = ['Mente', 'Corpo', 'Social'];
  
  // Nomes das "chaves" que usaremos no localStorage
  private readonly CHAVE_DATA = 'synapso-challenge-date';
  private readonly CHAVE_DESAFIOS = 'synapso-desafios-diarios';

  constructor() { }

  ngOnInit() {
    this.verificarAtualizacaoDiaria();
  }

  verificarAtualizacaoDiaria() {
    const hoje = new Date().toLocaleDateString(); // Pega a data de hoje, ex: "10/11/2025"
    const dataSalva = localStorage.getItem(this.CHAVE_DATA);

    if (dataSalva === hoje) {
      // É O MESMO DIA: Apenas carrega o progresso salvo
      console.log('Carregando desafios de hoje...');
      this.carregarDesafiosDoStorage();
    } else {
      // É UM NOVO DIA: Gera novos desafios
      console.log('NOVO DIA! Gerando novos desafios...');
      this.gerarNovosDesafios(8); // Sorteia 8 desafios
      
      // Salva a lista nova e a data de hoje
      this.salvarDesafiosNoStorage(); 
      localStorage.setItem(this.CHAVE_DATA, hoje);
    }
  }

  // ==========================================================
  // 2. FUNÇÕES DE SORTEIO E STORAGE
  // ==========================================================

  gerarNovosDesafios(quantidade: number) {
    // Embaralha a lista mestra
    const listaEmbaralhada = [...LISTA_MESTRA_DESAFIOS].sort(() => 0.5 - Math.random());
    
    // Pega os X primeiros itens da lista embaralhada
    const desafiosSorteados = listaEmbaralhada.slice(0, quantidade);

    // Mapeia para o formato final, garantindo que 'concluido: false'
    this.desafiosDiarios = desafiosSorteados.map(desafio => ({
      ...desafio,
      concluido: false 
    }));
  }

  carregarDesafiosDoStorage() {
    const desafiosSalvos = localStorage.getItem(this.CHAVE_DESAFIOS);
    if (desafiosSalvos) {
      this.desafiosDiarios = JSON.parse(desafiosSalvos);
    } else {
      // Se não achar nada (ex: primeiro uso), gera uma lista nova
      this.gerarNovosDesafios(8);
      this.salvarDesafiosNoStorage();
    }
  }

  // Esta função agora é PÚBLICA, pois será chamada pelo HTML
  public salvarDesafiosNoStorage() {
    // Salva a lista ATUAL (com o progresso) no localStorage
    localStorage.setItem(this.CHAVE_DESAFIOS, JSON.stringify(this.desafiosDiarios));
  }

  // ==========================================================
  // 3. FUNÇÕES DA BARRA DE PROGRESSO (sem alteração)
  // ==========================================================

  getDesafiosConcluidos(): number {
    return this.desafiosDiarios.filter(d => d.concluido).length;
  }

  calcularProgresso(): number {
    if (this.desafiosDiarios.length === 0) return 0;
    return this.getDesafiosConcluidos() / this.desafiosDiarios.length;
  }

  getCorProgresso(): string {
    const progresso = this.calcularProgresso();
    if (progresso < 0.4) return 'warning';
    if (progresso < 1) return 'primary';
    return 'success';
  }
}