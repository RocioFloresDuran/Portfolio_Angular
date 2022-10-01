import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { experiencia } from 'src/app/model/experiencia.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: experiencia[] = [];
  experiencia: experiencia = new experiencia('','',0,0,'');
  private date: Date = new Date();
  private anio_actual = this.date.getFullYear();

  public isLogged: boolean;
  formEdit: FormGroup;


  constructor(public experienciaService: ExperienciaService, private router: Router, public autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.isLogged = false;

    this.formEdit = this.formBuilder.group({
      nombre_org: ['', Validators.required],
      area_cargo: ['', Validators.required],
      anio_inicio: ['',[Validators.required, Validators.min(1900), Validators.max(this.anio_actual)]],
      anio_fin: ['',[Validators.min(1900), Validators.max(this.anio_actual)]],
      url_imagen: ['', Validators.required]
    })

   }

  ngOnInit(): void {

    this.cargarExperiencias();
    this.isLogged = this.autenticacionService.usuarioLogueado();
  
  }

  cargarExperiencias():void{
    this.experienciaService.getExperiencias().subscribe(data => {this.experiencias = data});
  }
  
  
  onEditar(event: Event): void {

    event.preventDefault;

    if (this.formEdit.valid) {
      this.experienciaService.editarExperiencia(this.experiencia.id,this.formEdit.value).subscribe(
        data => {
          this.cargarExperiencias();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  buscarExperiencia(expId: number): void {
    this.experienciaService.getExperiencia(expId).subscribe(
      data => {
        this.experiencia = data;
        this.formEdit.patchValue(this.experiencia);
      })
  }

  onAgregar(event: Event): void {

    const expe = this.formEdit.value;

    event.preventDefault;

    if (this.formEdit.valid) {
      this.experienciaService.agregarExperiencia(expe).subscribe(
        data => {
          this.cargarExperiencias();
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
      this.experienciaService.borrarExperiencia(id).subscribe(
        data => {
          this.cargarExperiencias();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  get Nombre_org(){
    return this.formEdit.get('nombre_org');
  }

  get Area_cargo(){
    return this.formEdit.get('area_cargo');
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
