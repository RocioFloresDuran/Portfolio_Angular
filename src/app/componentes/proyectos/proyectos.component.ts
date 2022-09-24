import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { proyecto } from 'src/app/model/proyecto.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: proyecto[] = [];
  proyecto: proyecto = new proyecto('','');
  nombre: string = '';
  descripcion: string = '';

  public isLogged: boolean;


  constructor(public proyectoService: ProyectoService, private router: Router, public autenticacionService: AutenticacionService) {
    this.isLogged = false;
   }

  ngOnInit(): void {
    this.cargarProyectos(); 
    this.isLogged = this.autenticacionService.usuarioLogueado();
  }

  cargarProyectos():void{
    this.proyectoService.getProyectos().subscribe(data => {this.proyectos = data});
  }
  

  onEditar(): void {
    this.proyectoService.editarProyecto(this.proyecto).subscribe(
      data => {
        this.cargarProyectos();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

  buscarProyecto(proyId: number): void {
    this.proyectoService.getProyecto(proyId).subscribe(
      data => {
        this.proyecto = data;
      })
  }

  onAgregar(): void {
    const proye = new proyecto(this.nombre, this.descripcion);
    this.proyectoService.agregarProyecto(proye).subscribe(
      data => {
        this.cargarProyectos();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
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

}
