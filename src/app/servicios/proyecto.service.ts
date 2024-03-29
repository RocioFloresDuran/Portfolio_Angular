import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyecto } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

url = 'https://backendportfolio2022.herokuapp.com/personas/proyecto/'
idPersona = '2'

  constructor(private http: HttpClient) { }

  public getProyectos(): Observable<proyecto[]>{
    return this.http.get<proyecto[]>(this.url + 'ver');
  }

  public getProyecto(id:any): Observable<proyecto>{
    return this.http.get<proyecto>(this.url + `${id}`);
  }

  public editarProyecto(id: any, proyecto: proyecto): Observable<any>{
    return this.http.put<any>(this.url + `editar/${id}`, proyecto);
  }

  public agregarProyecto(proyecto: proyecto): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, proyecto);
  }

  public borrarProyecto(id:any): Observable<any>{
    return this.http.delete<any>(this.url + 'delete/' + `${id}`);
  }

}
