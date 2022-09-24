import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { educacion } from 'src/app/model/educacion.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: educacion[] = [];
  educacion: educacion = new educacion('','','',0,0,'');
  escuela: string = '';
  titulo: string = '';
  carrera: string = '';
  anioInicio: number = 0;
  anioFin: number = 0;
  urlImg: string = '';

  public isLogged: boolean;

  constructor(public educacionService: EducacionService, private router: Router, public autenticacionService: AutenticacionService) { 
    this.isLogged = false;
  }

  ngOnInit(): void {

    this.cargarEducaciones();
    this.isLogged = this.autenticacionService.usuarioLogueado();

  }

  cargarEducaciones():void{
    this.educacionService.getEducaciones().subscribe(data => {this.educaciones = data});
  }
  
  
  onEditar(): void {
    this.educacionService.editarEducacion(this.educacion).subscribe(
      data => {
        this.cargarEducaciones();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )

  }

  buscarEducacion(educId: number): void {
    this.educacionService.getEducacion(educId).subscribe(
      data => {
        this.educacion = data;
      })
  }

  onAgregar(): void {
    const educ = new educacion(this.escuela, this.titulo, this.carrera, this.anioInicio, this.anioFin, this.urlImg);
    this.educacionService.agregarEducacion(educ).subscribe(
      data => {
        this.cargarEducaciones();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
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

}
