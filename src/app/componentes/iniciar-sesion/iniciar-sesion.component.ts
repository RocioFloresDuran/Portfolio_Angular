import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.formLogin = this.formBuilder.group({
      
      email:['',[Validators.required, Validators.email]],
      contraseña:['',[Validators.required, Validators.minLength(8)]]

    })
  }

  ngOnInit(): void {
  }

  get Email(){
    return this.formLogin.get('email');
  }

  get Password(){
    return this.formLogin.get('contraseña');
  }

}
