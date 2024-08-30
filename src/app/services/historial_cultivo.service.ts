import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { HistorialCultivo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HistorialCultivoService {
  private myAppUrl: string;
  private historialCultivoApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.historialCultivoApiUrl = 'api/HistorialCultivo/';
  }

  // Obtener todos los registros de HistorialCultivo
  getAllHistorialCultivo(): Observable<HistorialCultivo[]> {
    return this.http.get<HistorialCultivo[]>(`${this.myAppUrl}${this.historialCultivoApiUrl}`);
  }

  // Crear un nuevo registro en HistorialCultivo
  createHistorialCultivo(historialCultivo: HistorialCultivo): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.historialCultivoApiUrl}`, historialCultivo);
  }
}


