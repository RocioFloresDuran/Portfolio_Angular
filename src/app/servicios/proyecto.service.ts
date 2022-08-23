import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

url = 'http://localhost:8080/personas/proyecto/ver'

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<proyecto[]>{
    return this.http.get<proyecto[]>(this.url);
  }

}
