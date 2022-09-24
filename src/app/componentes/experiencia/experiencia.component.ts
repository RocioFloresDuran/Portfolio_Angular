import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { experiencia } from 'src/app/model/experiencia.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: experiencia[] = [];
  experiencia: experiencia = new experiencia('','',0,0,'');
  nombreOrg: String = '';
  areaCargo: String = '';
  anioInicio: number = 0;
  anioFin: number = 0;
  urlImg: String = '';

  public isLogged: boolean;


  constructor(public experienciaService: ExperienciaService, private router: Router, public autenticacionService: AutenticacionService) {
    this.isLogged = false;
   }

  ngOnInit(): void {

    this.cargarExperiencias();
    this.isLogged = this.autenticacionService.usuarioLogueado();
  
  }

  cargarExperiencias():void{
    this.experienciaService.getExperiencias().subscribe(data => {this.experiencias = data});
  }
  
  
  onEditar(): void {
    this.experienciaService.editarExperiencia(this.experiencia).subscribe(
      data => {
        this.cargarExperiencias();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

  buscarExperiencia(expId: number): void {
    this.experienciaService.getExperiencia(expId).subscribe(
      data => {
        this.experiencia = data;
      })
  }

  onAgregar(): void {
    const expe = new experiencia(this.nombreOrg, this.areaCargo, this.anioInicio, this.anioFin, this.urlImg);
    this.experienciaService.agregarExperiencia(expe).subscribe(
      data => {
        this.cargarExperiencias();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
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

}
