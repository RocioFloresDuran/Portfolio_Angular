import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educaciones: educacion[] = [];

  constructor(public educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getEducaciones().subscribe(data => {this.educaciones = data});
  }

}
