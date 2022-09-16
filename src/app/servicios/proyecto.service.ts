import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

url = 'http://localhost:8080/personas/proyecto/'
idPersona = '2'

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<proyecto[]>{
    return this.http.get<proyecto[]>(this.url + 'ver');
  }

  public getProyecto(id:any): Observable<proyecto>{
    return this.http.get<proyecto>(this.url + `${id}`);
  }

  public editarProyecto(proyecto: proyecto): Observable<any>{
    return this.http.put<any>(this.url + 'editar', proyecto);
  }

  public agregarProyecto(proyecto: proyecto): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, proyecto);
  }

}
