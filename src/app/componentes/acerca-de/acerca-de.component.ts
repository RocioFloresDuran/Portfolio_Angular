import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public personaService: PersonaService, private router: Router) {}

  ngOnInit(): void {

    this.cargarPersona();
    
  }

  cargarPersona():void{
    this.personaService.getPersona().subscribe(data => {this.persona = data});
  }

  onEditar(): void {
    this.personaService.editarPersona(this.persona).subscribe(
      data => {
        this.router.navigate([''])
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

}
