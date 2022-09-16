import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url = 'http://localhost:8080/personas/experiencia/'
  idPersona = '2'

  constructor(private http: HttpClient) { }

  public getExperiencias(): Observable<experiencia[]>{
    return this.http.get<experiencia[]>(this.url + 'ver');
  }

  public getExperiencia(id:any): Observable<experiencia>{
    return this.http.get<experiencia>(this.url + `${id}`);
  }

  public editarExperiencia(experiencia: experiencia): Observable<any>{
    return this.http.put<any>(this.url + 'editar', experiencia);
  }

  public agregarExperiencia(experiencia: experiencia): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, experiencia);
  }


}
