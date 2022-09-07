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
  url2  = 'http://localhost:8080/domicilios/editar';

  constructor(private http:HttpClient) { }

  public getPersona(): Observable<persona>{
    return this.http.get<persona>(this.url + 2);
  }

  public editarPersona(persona: persona): Observable<any>{
    return this.http.put<any>(this.url + 'editar', persona);
  }

  public editarDomicilio(domicilio: domicilio): Observable<any>{
    return this.http.put<any>(this.url2, domicilio);
  }

}
