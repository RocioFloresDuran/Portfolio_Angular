import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { proyecto } from 'src/app/model/proyecto.model';
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

  constructor(public proyectoService: ProyectoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarProyectos(); 
  }

  cargarProyectos():void{
    this.proyectoService.getProyectos().subscribe(data => {this.proyectos = data});
  }
  
  
  onEditar():void{
    this.proyectoService.editarProyecto(this.proyecto).subscribe(
      data => { 
        this.router.navigate(['']);
        this.cargarProyectos();
      }
    )  
  }

  buscarProyecto(proyId:number):void{
    this.proyectoService.getProyecto(proyId).subscribe(
      data => {
        this.proyecto = data;
        console.log(JSON.stringify(this.proyecto) + 'buscar');
        console.log(proyId);
      })
  }

  onAgregar(): void {
    const proye = new proyecto(this.nombre, this.descripcion);
    this.proyectoService.agregarProyecto(proye).subscribe(
      data => {
        alert("Proyecto añadido");
        this.router.navigate(['']);
        this.cargarProyectos();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

}
