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

  constructor(private formBuilder:FormBuilder, private autenticacionService: AutenticacionService, private ruta:Router) { 
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

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticacionService.IniciarSesion(this.formLogin.value).subscribe(data =>{
      console.log("DATA:", JSON.stringify(data));
      this.ruta.navigate(['/portfolio'])
    })

  }

}
