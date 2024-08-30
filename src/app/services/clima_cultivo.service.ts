import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { ClimaCultivo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClimaCultivoService {
  private myAppUrl: string;
  private climaCultivoApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.climaCultivoApiUrl = 'api/ClimaCultivo/';
  }

  // Obtener todos los registros de ClimaCultivo
  getAllClimaCultivo(): Observable<ClimaCultivo[]> {
    return this.http.get<ClimaCultivo[]>(`${this.myAppUrl}${this.climaCultivoApiUrl}`);
  }
  // Obtener los registros de ClimaCultivo por ID de Cultivo y Localidad
  getClimaCultivoByCultivoIdAndLocalidad(idCultivo: number, localidad: string): Observable<ClimaCultivo[]> {
    return this.http.get<ClimaCultivo[]>(`${this.myAppUrl}${this.climaCultivoApiUrl}${idCultivo}/${localidad}`);
  }

  // Obtener los registros de ClimaCultivo por ID de Cultivo
  getClimaCultivoByCultivoId(id: number): Observable<ClimaCultivo[]> {
    return this.http.get<ClimaCultivo[]>(`${this.myAppUrl}${this.climaCultivoApiUrl}${id}`);
  }

  // Crear un nuevo registro en ClimaCultivo
  createClimaCultivo(climaCultivo: ClimaCultivo[]): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.climaCultivoApiUrl}`, climaCultivo);
  }

  // Eliminar un registro de ClimaCultivo por ID de Cultivo y Clima
  deleteClimaCultivo(idCultivo: number, idClima: number): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.climaCultivoApiUrl}${idCultivo}/${idClima}`);
  }
}
