// src/app/login/login.page.spec.ts (O CÓDIGO CORRIGIDO)

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms'; // <-- Importar
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Criamos um "dublê" do Router para o teste
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    // Configura o dublê
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      // Como é standalone, importamos o componente e suas dependências
      imports: [
        LoginPage,
        IonicModule.forRoot(),
        CommonModule,
        ReactiveFormsModule
      ],
      // Fornecemos os serviços que o construtor precisa
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});