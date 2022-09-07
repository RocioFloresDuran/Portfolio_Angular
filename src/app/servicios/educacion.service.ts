import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url = 'http://localhost:8080/personas/educacion/'

  constructor(private http: HttpClient) { }

  public getEducaciones(): Observable<educacion[]>{
    return this.http.get<educacion[]>(this.url + 'ver');
  }

  public getEducacion(id:any): Observable<educacion>{
    return this.http.get<educacion>(this.url + `${id}`);
  }

  public editarEducacion(educacion: educacion): Observable<any>{
    return this.http.put<any>(this.url + 'editar', educacion);
  }

}
