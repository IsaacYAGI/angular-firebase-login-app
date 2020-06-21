import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

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
    
      const result = await this.auth.login(this.usuario);
      console.log(result);
  
    } catch (error) {
      console.error(error.error.error.message)
    }
    
  }
}
