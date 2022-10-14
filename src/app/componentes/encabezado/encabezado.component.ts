import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { domicilio } from 'src/app/model/domicilio.model';
import { persona } from 'src/app/model/persona.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  persona: persona = new persona('','',new Date(),'','','','','','', new domicilio('',''));
  public isLogged: boolean;
  form: FormGroup;
  

  constructor(public personaService: PersonaService, private router: Router, public autenticacionService: AutenticacionService, private formBuilder: FormBuilder) { 
    this.isLogged = false;
    this.form = this.formBuilder.group({
      ocupacion: ['', Validators.required],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required]
    })
   }

  ngOnInit(): void {

    this.cargarPersona();
    this.isLogged = this.autenticacionService.usuarioLogueado();

  }

  cargarPersona(): void {
    this.personaService.getPersona().subscribe(
      data => {
        this.persona = data;
      })
  }

  editarDomicilio(): void {
    const nuevoDomicilio = new domicilio(this.form.get('provincia').value, this.form.get('localidad').value)
    this.personaService.editarDomicilio(nuevoDomicilio).subscribe(
      data => {

      }
    )
  }
  
  onEditar(event: Event): void {

    event.preventDefault;

    if (this.form.valid) {
      this.editarDomicilio();
      this.persona.ocupacion = this.form.get('ocupacion').value;
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

  editarUrl(): void {
      this.personaService.editarPersona(this.persona).subscribe(
        data => {
           this.cargarPersona();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
  }

  onClick(){
    this.autenticacionService.logout()
    .then(() =>{
      localStorage.removeItem('user');
      window.location.reload();
    })
    .catch(error => console.log(error))
  }

  cargarForm() {
    this.form.patchValue({
      ocupacion: this.persona.ocupacion, provincia: this.persona.domicilio.provincia,
      localidad: this.persona.domicilio.localidad
    })
  }

  get Ocupacion(){
    return this.form.get('ocupacion');
  }

  get Provincia(){
    return this.form.get('provincia');
  }

  get Localidad(){
    return this.form.get('localidad'); 
  }

}

  


