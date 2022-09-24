import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { domicilio } from 'src/app/model/domicilio.model';
import { persona } from 'src/app/model/persona.model';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  persona: persona = new persona('','',new Date(),'','','','','','', new domicilio('',''));
  public isLogged: boolean;
  

  constructor(public personaService: PersonaService, private router: Router, public autenticacionService: AutenticacionService) { 
    this.isLogged = false;
   }

  ngOnInit(): void {

    this.cargarPersona();
    this.isLogged = this.autenticacionService.usuarioLogueado();

  }

  cargarPersona(): void {
    this.personaService.getPersona().subscribe(data => { this.persona = data });
  }

  editarDomicilio(): void {
    this.personaService.editarDomicilio(this.persona.domicilio).subscribe(
      data => {
        this.router.navigate(['']);
      }
    )
  }
  
  onEditar(): void {
    this.editarDomicilio();
    this.personaService.editarPersona(this.persona).subscribe(
      data => {
        this.router.navigate([''])
      }, err => {
        alert("Ocurrió un error");
        this.router.navigate(['']);
      }
    )
  }

  onClick(){
    this.autenticacionService.logout()
    .then(() =>{
      localStorage.removeItem('user');
      window.location.reload();
    })
    .catch(error => console.log(error))
  }

}

  


