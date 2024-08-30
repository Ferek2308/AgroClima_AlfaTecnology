import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { HistorialPlaga } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HistorialPlagaService {
  private myAppUrl: string;
  private historialPlagaApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.historialPlagaApiUrl = 'api/HistorialPlaga/';
  }

  // Obtener todos los registros de HistorialPlaga
  getAllHistorialPlaga(): Observable<HistorialPlaga[]> {
    return this.http.get<HistorialPlaga[]>(`${this.myAppUrl}${this.historialPlagaApiUrl}`);
  }

  // Crear un nuevo registro en HistorialPlaga
  createHistorialPlaga(historialPlaga: HistorialPlaga): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.historialPlagaApiUrl}`, historialPlaga);
  }
}
