import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

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
  private userToken: string;
  constructor(
    private http: HttpClient
  ) {
    this.leerToken();
   }

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
    ).pipe(
      map(resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
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
    ).pipe(
      map(resp =>{
        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
    .toPromise();
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
  }
  
  leerToken(){
    if (localStorage.getItem("token")){
      this.userToken = localStorage.getItem("token");
    }else{
      this.userToken = "";
    }
   
    return this.userToken;
  }
  
  estaAutenticado(): boolean{
    return this.userToken.length > 2
  }

}
