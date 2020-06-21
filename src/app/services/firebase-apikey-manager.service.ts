import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApikeyManagerService {

  apikey: string = "";
  constructor() { 
    this.cargarApiKey();
  }

  guardarApiKey(){
    console.log("Entre en guardar")
    Swal.fire({
      title: 'Ingresa tu apikey de firebase',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.value){
        localStorage.setItem('firebase_apikey', result.value);
        this.cargarApiKey();
      }
    })
  }

  cargarApiKey(){
    if (localStorage.getItem('firebase_apikey')){
      this.apikey = localStorage.getItem('firebase_apikey');
    }else{
      this.apikey = "";
    }
  }

  estaConfigurado(){
    return this.apikey == "";
  }
}
