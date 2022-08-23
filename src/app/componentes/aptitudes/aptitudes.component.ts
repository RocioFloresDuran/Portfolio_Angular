import { Component, OnInit } from '@angular/core';
import { aptitud } from 'src/app/model/aptitud.model';
import { AptitudService } from 'src/app/servicios/aptitud.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {

  aptitudes: aptitud[] = [];

  constructor(public aptitudService: AptitudService) { }

  ngOnInit(): void {
    this.aptitudService.getAptitudes().subscribe(data => {this.aptitudes = data});
  }

  elseBlock = null;

}
