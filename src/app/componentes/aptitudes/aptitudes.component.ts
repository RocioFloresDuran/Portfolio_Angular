import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { aptitud } from 'src/app/model/aptitud.model';
import { AptitudService } from 'src/app/servicios/aptitud.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {

  aptitudes: aptitud[] = [];
  aptitud: aptitud = new aptitud('',0);
  nombre: string = '';
  porcentaje: number = 0;

  public isLogged: boolean;

  constructor(public aptitudService: AptitudService, private router: Router, public autenticacionService: AutenticacionService) {
    this.isLogged = false;
   }

  ngOnInit(): void {

    this.cargarAptitudes();
    this.isLogged = this.autenticacionService.usuarioLogueado();
    
  }

  cargarAptitudes():void{
    this.aptitudService.getAptitudes().subscribe(data => {this.aptitudes = data});
  }
  
  
  onEditar(): void {
    this.aptitudService.editarAptitud(this.aptitud).subscribe(
      data => {
        this.cargarAptitudes();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )

  }

  buscarAptitud(aptId: number): void {
    this.aptitudService.getAptitud(aptId).subscribe(
      data => {
        this.aptitud = data;
      })
  }

  onAgregar(): void {
    const apti = new aptitud(this.nombre, this.porcentaje);
    this.aptitudService.agregarAptitud(apti).subscribe(
      data => {
        this.cargarAptitudes();
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

  borrar(id: number) {
    if (confirm('Seguro desea eliminar el elemento?')) {
      this.aptitudService.borrarAptitud(id).subscribe(
        data => {
          this.cargarAptitudes();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

}
