import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domicilio } from '../model/domicilio.model';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = 'https://backendportfolio2022.herokuapp.com/personas/';
  url2  = 'https://backendportfolio2022.herokuapp.com/domicilios/editar/1';

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
