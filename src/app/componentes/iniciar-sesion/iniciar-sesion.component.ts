import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  formLogin: FormGroup;
  user: any;

  constructor(private formBuilder:FormBuilder, private autenticacionService: AutenticacionService, private ruta:Router) { 
    this.formLogin = this.formBuilder.group({
      
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]

    })
  }

  ngOnInit(): void {
  }

  get Email(){
    return this.formLogin.get('email');
  }

  get Password(){
    return this.formLogin.get('password');
  }

  onEnviar(event: Event) {

    event.preventDefault;

    if (this.formLogin.valid) {

      this.autenticacionService.login(this.formLogin.value)
        .then(response => {
          this.user = response;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.ruta.navigate(['']);
        })
        .catch(error => {
          console.log(error);
          alert("Email y/o Contraseña incorrectos");
        })

    } else {
      this.formLogin.markAllAsTouched();
    }

  }

  onClick(){
    this.ruta.navigate(['']);
  }
}
