import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  async login(form: NgForm){
    if (form.invalid) return;

    try {
      Swal.fire({
        allowOutsideClick:false,
        type:'info',
        text:'Espere por favor...'
      });

      Swal.showLoading();

      const result = await this.auth.login(this.usuario);
      Swal.close();
      console.log(result);
  
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
