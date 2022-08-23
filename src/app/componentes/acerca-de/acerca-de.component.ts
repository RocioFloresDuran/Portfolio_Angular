import { Component, OnInit } from '@angular/core';
import { domicilio } from 'src/app/model/domicilio.model';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  persona: persona = new persona('','',new Date(),'','','','','','',new domicilio('',''));

  constructor(public personaService: PersonaService) { }

  ngOnInit(): void {

    this.personaService.getPersona().subscribe(data => {this.persona = data});
    
  }

}
