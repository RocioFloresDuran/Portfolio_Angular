import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { aptitud } from 'src/app/model/aptitud.model';
import { AptitudService } from 'src/app/servicios/aptitud.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {

  aptitudes: aptitud[] = [];
  aptitud: aptitud = new aptitud('',0);

  constructor(public aptitudService: AptitudService, private router: Router) { }

  ngOnInit(): void {

    this.cargarAptitudes();
    
  }

  // elseBlock = null;

  cargarAptitudes():void{
    this.aptitudService.getAptitudes().subscribe(data => {this.aptitudes = data});
  }
  
  
  onEditar():void{
    this.aptitudService.editarAptitud(this.aptitud).subscribe(
          data => { 
             this.router.navigate(['']);
             this.cargarAptitudes();
          }
      )
    
  }

  buscarAptitud(aptId:number):void{
    this.aptitudService.getAptitud(aptId).subscribe(
        data => {
          this.aptitud = data;
          console.log(JSON.stringify(this.aptitud) + 'buscar');
          console.log(aptId);
        })
    }


}
