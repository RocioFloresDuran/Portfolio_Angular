import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { domicilio } from 'src/app/model/domicilio.model';
import { persona } from 'src/app/model/persona.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  persona: persona = new persona('','',new Date(),'','','','','','',new domicilio('',''));
  public isLogged: boolean;
  form: FormGroup;

  constructor(public personaService: PersonaService, private router: Router, public autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.isLogged = false;
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.cargarPersona();
    this.isLogged = this.autenticacionService.usuarioLogueado();
    
  }

  cargarPersona(): void {
    this.personaService.getPersona().subscribe(data => {
      this.persona = data;
    });
  }

  onEditar(event: Event): void {

    event.preventDefault;

    if (this.form.valid) {
      this.persona.descripcion = this.form.get('descripcion').value;
      this.personaService.editarPersona(this.persona).subscribe(
        data => {
          this.cargarPersona();
          this.form.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  cargarForm(){
    this.form.patchValue({descripcion: this.persona.descripcion});
  }

  get Descripcion(){
    return this.form.get('descripcion');
  }

}
