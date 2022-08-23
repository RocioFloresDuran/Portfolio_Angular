import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domicilio } from '../model/domicilio.model';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'http://localhost:8080/personas/';
  // url2 = 'http://localhost:8080/domicilios/';

  constructor(private http:HttpClient) { }

  public getPersona(): Observable<persona>{
    return this.http.get<persona>(this.url + 2);
  }

  // public getDomicilio(idDomicilio: number): Observable<domicilio>{
  //   return this.http.get<domicilio>(this.url2 + idDomicilio);
  // }

}
