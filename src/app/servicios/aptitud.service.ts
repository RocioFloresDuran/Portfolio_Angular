import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { aptitud } from '../model/aptitud.model';

@Injectable({
  providedIn: 'root'
})
export class AptitudService {

  url = 'http://localhost:8080/personas/aptitud/'
  idPersona = '2'

  constructor(private http: HttpClient) { }

  public getAptitudes(): Observable<aptitud[]>{
    return this.http.get<aptitud[]>(this.url + 'ver');
  }

  public getAptitud(id:any): Observable<aptitud>{
    return this.http.get<aptitud>(this.url + `${id}`);
  }

  public editarAptitud(aptitud: aptitud): Observable<any>{
    return this.http.put<any>(this.url + 'editar', aptitud);
  }

  public agregarAptitud(aptitud: aptitud): Observable<any>{
    return this.http.post<any>(this.url + 'new/' + this.idPersona, aptitud);
  }

  public borrarAptitud(id:any): Observable<any>{
    return this.http.delete<any>(this.url + 'delete/' + `${id}`);
  }

}
