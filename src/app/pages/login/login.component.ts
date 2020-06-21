import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
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
