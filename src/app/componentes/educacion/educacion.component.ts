import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: educacion[] = [];
  educacion: educacion = new educacion('','','',0,0,'');

  constructor(public educacionService: EducacionService, private router: Router) { }

  ngOnInit(): void {

    this.cargarEducaciones();

  }

  cargarEducaciones():void{
    this.educacionService.getEducaciones().subscribe(data => {this.educaciones = data});
  }
  
  
    onEditar():void{
      this.educacionService.editarEducacion(this.educacion).subscribe(
          data => { 
             this.router.navigate(['']);
             this.cargarEducaciones();
          }
      )
    
     }

     buscarEducacion(educId:number):void{
      this.educacionService.getEducacion(educId).subscribe(
        data => {
          this.educacion = data;
          console.log(JSON.stringify(this.educacion) + 'buscar');
          console.log(educId);
        })
    }


}
