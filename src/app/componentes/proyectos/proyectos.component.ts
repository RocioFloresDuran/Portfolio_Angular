import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { proyecto } from 'src/app/model/proyecto.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: proyecto[] = [];
  proyecto: proyecto = new proyecto('','');

  public isLogged: boolean;
  formEdit: FormGroup;

  constructor(public proyectoService: ProyectoService, private router: Router, public autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.isLogged = false;

    this.formEdit = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.cargarProyectos(); 
    this.isLogged = this.autenticacionService.usuarioLogueado();
  }

  cargarProyectos():void{
    this.proyectoService.getProyectos().subscribe(data => {this.proyectos = data});
  }
  

  onEditar(event: Event): void {

    event.preventDefault;

    if (this.formEdit.valid) {
      this.proyectoService.editarProyecto(this.proyecto.id, this.formEdit.value).subscribe(
        data => {
          this.cargarProyectos();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  buscarProyecto(proyId: number): void {
    this.proyectoService.getProyecto(proyId).subscribe(
      data => {
        this.proyecto = data;
        this.formEdit.patchValue(this.proyecto);
      })
  }

  onAgregar(event: Event): void {

    const proye = this.formEdit.value;

    event.preventDefault;

    if (this.formEdit.valid) {
      this.proyectoService.agregarProyecto(proye).subscribe(
        data => {
          this.cargarProyectos();
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
      this.proyectoService.borrarProyecto(id).subscribe(
        data => {
          this.cargarProyectos();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  get Nombre(){
    return this.formEdit.get('nombre');
  }

  get Descripcion(){
    return this.formEdit.get('descripcion');
  }

}
