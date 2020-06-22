import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FirebaseApikeyManagerService } from 'src/app/services/firebase-apikey-manager.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    public firebaseApikeyConfigurator: FirebaseApikeyManagerService
  ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
  }

  async onSubmit(form: NgForm){
    if (form.invalid) return;
    try {
      Swal.fire({
        allowOutsideClick:false,
        type:'info',
        text:'Espere por favor...'
      });

      Swal.showLoading();
      const result = await this.auth.nuevoUsuario(this.usuario);
      Swal.close();
      if (this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    } catch (error) {
      console.error(error.error.error.message);
      Swal.fire({
        type:'error',
        title:'Error al autenticar',
        text:error.error.error.message
      });
    }
  }

}
