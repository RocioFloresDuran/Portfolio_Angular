import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url = 'https://backendportfolio2022.herokuapp.com/personas/experiencia/'
  idPersona = '2'

  constructor(private http: HttpClient) { }

  public getExperiencias(): Observable<experiencia[]>{
    return this.http.get<experiencia[]>(this.url + 'ver');
  }

  public getExperiencia(id:any): Observable<experiencia>{
    return this.http.get<experiencia>(this.url + `${id}`);
  }

  public editarExperiencia(id:any, experiencia: experiencia): Observable<any>{
    return this.http.put<any>(this.url + `editar/${id}`, experiencia);
  }

  public agregarExperiencia(experiencia: experiencia): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, experiencia);
  }

  public borrarExperiencia(id:any): Observable<any>{
    return this.http.delete<any>(this.url + 'delete/' + `${id}`);
  }


}
