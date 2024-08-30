import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { DatosClimaticos } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
  })
export class DatosClimaticosService {
    private myAppUrl: string;
    private DatoCApiUrl: string;
  
    constructor(private http: HttpClient) { 
      this.myAppUrl = environment.endpoint;
      this.DatoCApiUrl = 'api/DatosClima/';
  }
  getDatosClimaticos(): Observable<DatosClimaticos[]> {
    return this.http.get<DatosClimaticos[]>(`${this.myAppUrl}${this.DatoCApiUrl}`);
  }

  deleteDatosClimaticos(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.DatoCApiUrl}${id}`);
  }

  createDatosClimaticos(cultivo: DatosClimaticos): Observable<DatosClimaticos> {
    return this.http.post<DatosClimaticos>(`${this.myAppUrl}${this.DatoCApiUrl}`, cultivo);
  }
  

  updateDatosClimaticos(id: number, cultivo: DatosClimaticos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.DatoCApiUrl}${id}`, cultivo);
  }
  getDatosClimaticosPorEstado(estado: string): Observable<DatosClimaticos[]> {
    return this.http.get<DatosClimaticos[]>(`${this.myAppUrl}${this.DatoCApiUrl}I/estado/${estado}`);
  }

  getDatosClimaticosPorId(id: number): Observable<DatosClimaticos> {
    return this.http.get<DatosClimaticos>(`${this.myAppUrl}${this.DatoCApiUrl}${id}`);
}
}
