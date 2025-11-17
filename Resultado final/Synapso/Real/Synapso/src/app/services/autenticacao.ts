import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Autenticacao {
  public isLoggedIn: boolean = false;
  public user: any = null;
}
