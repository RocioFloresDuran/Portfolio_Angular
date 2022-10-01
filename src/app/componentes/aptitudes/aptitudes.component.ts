import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { aptitud } from 'src/app/model/aptitud.model';
import { AptitudService } from 'src/app/servicios/aptitud.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {

  aptitudes: aptitud[] = [];
  aptitud: aptitud = new aptitud('',0);

  public isLogged: boolean;
  formEdit: FormGroup;

  constructor(public aptitudService: AptitudService, private router: Router, public autenticacionService: AutenticacionService, private formBuilder: FormBuilder) {
    this.isLogged = false;

    this.formEdit = this.formBuilder.group({
      nombre: ['', Validators.required],
      porcentaje: ['',[Validators.required, Validators.min(1), Validators.max(100)]]
    })
   }

  ngOnInit(): void {

    this.cargarAptitudes();
    this.isLogged = this.autenticacionService.usuarioLogueado();
    
  }

  cargarAptitudes():void{
    this.aptitudService.getAptitudes().subscribe(data => {this.aptitudes = data});
  }
  
  
  onEditar(event: Event): void {

    event.preventDefault;

    if (this.formEdit.valid) {
      this.aptitudService.editarAptitud(this.aptitud.id, this.formEdit.value).subscribe(
        data => {
          this.cargarAptitudes();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  buscarAptitud(aptId: number): void {
    this.aptitudService.getAptitud(aptId).subscribe(
      data => {
        this.aptitud = data;
        this.formEdit.patchValue(this.aptitud);
      })
  }

  onAgregar(event: Event): void {

    const apti = this.formEdit.value;

    event.preventDefault;

    if (this.formEdit.valid) {
      this.aptitudService.agregarAptitud(apti).subscribe(
        data => {
          this.cargarAptitudes();
          this.formEdit.reset();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  borrar(id: number) {
    if (confirm('Seguro desea eliminar el elemento?')) {
      this.aptitudService.borrarAptitud(id).subscribe(
        data => {
          this.cargarAptitudes();
        }, err => {
          alert("Ocurrió un error");
          this.router.navigate(['']);
        }
      )
    }
  }

  get Nombre(){
    return this.formEdit.get('nombre');
  }

  get Porcentaje(){
    return this.formEdit.get('porcentaje');
  }

}
