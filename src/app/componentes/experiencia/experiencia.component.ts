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

}
