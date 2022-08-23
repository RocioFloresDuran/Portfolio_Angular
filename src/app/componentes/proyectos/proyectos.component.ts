import { Component, OnInit } from '@angular/core';
import { proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: proyecto[] = [];

  constructor(public proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe(data => {this.proyectos = data});
  }

}
