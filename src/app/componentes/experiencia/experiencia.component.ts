import { Component, OnInit } from '@angular/core';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  experiencias: experiencia[] = [];

  constructor(public experienciaService: ExperienciaService) { }

  ngOnInit(): void {

    this.experienciaService.getExperiencias().subscribe(data => {this.experiencias = data});

  }

}
