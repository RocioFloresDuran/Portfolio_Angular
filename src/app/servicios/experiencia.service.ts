import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url = 'http://localhost:8080/personas/experiencia/ver'

  constructor(private http: HttpClient) { }

  public getExperiencias(): Observable<experiencia[]>{
    return this.http.get<experiencia[]>(this.url);
  }

}
