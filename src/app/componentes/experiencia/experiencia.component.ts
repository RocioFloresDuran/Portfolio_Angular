import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { experiencia } from 'src/app/model/experiencia.model';
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


  constructor(public experienciaService: ExperienciaService, private router: Router) { }

  ngOnInit(): void {

    this.cargarExperiencias();
  
  }

  cargarExperiencias():void{
    this.experienciaService.getExperiencias().subscribe(data => {this.experiencias = data});
  }
  
  
    onEditar():void{
      this.experienciaService.editarExperiencia(this.experiencia).subscribe(
          data => { 
             this.router.navigate(['']);
             this.cargarExperiencias();
          }
      )
    
     }

     buscarExperiencia(expId:number):void{
      this.experienciaService.getExperiencia(expId).subscribe(
        data => {
          this.experiencia = data;
          console.log(JSON.stringify(this.experiencia) + 'buscar');
          console.log(expId);
        })
    }

  onAgregar():void{
    const expe = new experiencia(this.nombreOrg,this.areaCargo,this.anioInicio,this.anioFin,this.urlImg);
    this.experienciaService.agregarExperiencia(expe).subscribe(
      data =>{
        alert("Experiencia añadida");
        this.router.navigate(['']);
        this.cargarExperiencias();
      }, err =>{
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

}
