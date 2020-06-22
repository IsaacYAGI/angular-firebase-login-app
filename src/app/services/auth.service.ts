import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { FirebaseApikeyManagerService } from './firebase-apikey-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Create new users
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Sign in users
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = "https://identitytoolkit.googleapis.com/v1/accounts";
  private userToken: string;
  constructor(
    private http: HttpClient,
    private firebaseApiKeyManager: FirebaseApikeyManagerService
  ) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.firebaseApiKeyManager.apikey}`,
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
      `${this.url}:signUp?key=${this.firebaseApiKeyManager.apikey}`,
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

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
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

    if (this.userToken.length < 2) return false;

    // const expira = Number(localStorage.getItem('item'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);
    // if (expiraDate > new Date()){
    //   return true;
    // }else return false;
    return true;
  }

}
