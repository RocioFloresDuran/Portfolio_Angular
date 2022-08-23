import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { aptitud } from '../model/aptitud.model';

@Injectable({
  providedIn: 'root'
})
export class AptitudService {

  url = 'http://localhost:8080/personas/aptitud/ver'

  constructor(private http: HttpClient) { }

  public getAptitudes(): Observable<aptitud[]>{
    return this.http.get<aptitud[]>(this.url);
  }
}
