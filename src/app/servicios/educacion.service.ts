import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url = 'http://localhost:8080/personas/educacion/'
  idPersona = '2'

  constructor(private http: HttpClient) { }

  public getEducaciones(): Observable<educacion[]>{
    return this.http.get<educacion[]>(this.url + 'ver');
  }

  public getEducacion(id:any): Observable<educacion>{
    return this.http.get<educacion>(this.url + `${id}`);
  }

  public editarEducacion(id: any, educacion: educacion): Observable<any>{
    return this.http.put<any>(this.url + `editar/${id}`, educacion);
  }

  public agregarEducacion(educacion: educacion): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, educacion);
  }

  public borrarEducacion(id:any): Observable<any>{
    return this.http.delete<any>(this.url + 'delete/' + `${id}`);
  }

}
