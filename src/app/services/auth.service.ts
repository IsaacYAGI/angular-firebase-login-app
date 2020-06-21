import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Create new users
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Sign in users
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = "https://identitytoolkit.googleapis.com/v1/accounts";
  private apikey = "FIREBASE_TOKEN";
  constructor(
    private http: HttpClient
  ) { }

  logout(){

  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apikey}`,
      authData
    ).toPromise();
  }
  

  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apikey}`,
      authData
    ).toPromise();
  }
  
}
