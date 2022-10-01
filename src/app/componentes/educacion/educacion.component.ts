import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { educacion } from 'src/app/model/educacion.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: educacion[] = [];
  educacion: educacion = new educacion('','','',0,0,'');
  private date: Date = new Date();
  private anio_actual = this.date.getFullYear();

  public isLogged: boolean;
  formEdit: FormGroup;

  constructor(public educacionService: EducacionService, private router: Router, public autenticacionService: AutenticacionService,  private formBuilder: FormBuilder) { 
    this.isLogged = false;

    this.formEdit = this.formBuilder.group({
      escuela: ['', Validators.required],
      titulo: ['', Validators.required],
      carrera: ['', Validators.required],
      anio_inicio: ['',[Validators.required, Validators.min(1900), Validators.max(this.anio_actual)]],
      anio_fin: ['',[Validators.min(1900), Validators.max(this.anio_actual)]],
      url_imagen: ['', Validators.required]
    })

  }

  ngOnInit(): void {

    this.cargarEducaciones();
    this.isLogged = this.autenticacionService.usuarioLogueado();

  }

  cargarEducaciones():void{
    this.educacionService.getEducaciones().subscribe(data => {this.educaciones = data});
  }
  
  
  onEditar(event: Event): void {

    event.preventDefault;

    if (this.formEdit.valid) {
      this.educacionService.editarEducacion(this.educacion.id, this.formEdit.value).subscribe(
        data => {
          this.cargarEducaciones();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  buscarEducacion(educId: number): void {
    this.educacionService.getEducacion(educId).subscribe(
      data => {
        this.educacion = data;
        this.formEdit.patchValue(this.educacion);
      })
  }

  onAgregar(event: Event): void {

    const educ = this.formEdit.value;

    event.preventDefault;

    if (this.formEdit.valid) {
      this.educacionService.agregarEducacion(educ).subscribe(
        data => {
          this.cargarEducaciones();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  borrar(id: number) {
    if (confirm('Seguro desea eliminar el elemento?')) {
      this.educacionService.borrarEducacion(id).subscribe(
        data => {
          this.cargarEducaciones();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  get Escuela(){
    return this.formEdit.get('escuela');
  }

  get Titulo(){
    return this.formEdit.get('titulo');
  }

  get Carrera(){
    return this.formEdit.get('carrera');
  }

  get Anio_inicio(){
    return this.formEdit.get('anio_inicio');
  }

  get Anio_fin(){
    return this.formEdit.get('anio_fin');
  }

  get Url_imagen(){
    return this.formEdit.get('url_imagen');
  }

}
