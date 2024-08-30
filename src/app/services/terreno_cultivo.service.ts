import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { TerrenoCultivo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TerrenoCultivoService {
  private myAppUrl: string;
  private terrenoCultivoApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.terrenoCultivoApiUrl = 'api/TerrenoCultivo/';
  }

  // Obtener todos los registros de TerrenoCultivo
  getAllTerrenoCultivo(): Observable<TerrenoCultivo[]> {
    return this.http.get<TerrenoCultivo[]>(`${this.myAppUrl}${this.terrenoCultivoApiUrl}`);
  }

 // Crear un nuevo registro en TerrenoCultivo
 createTerrenoCultivo(terrenoCultivo: TerrenoCultivo): Observable<any> {
  return this.http.post<any>(`${this.myAppUrl}${this.terrenoCultivoApiUrl}`, terrenoCultivo);
}
  // Eliminar un registro de TerrenoCultivo por ID de Terreno y Cultivo
  deleteTerrenoCultivo(idTerreno: number, idCultivo: number): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.terrenoCultivoApiUrl}${idTerreno}/${idCultivo}`);
  }

  // Obtener todos los registros de TerrenoCultivo por ID de Terreno
getAllTerrenoCultivoById(idTerreno: number): Observable<TerrenoCultivo[]> {
  return this.http.get<TerrenoCultivo[]>(`${this.myAppUrl}${this.terrenoCultivoApiUrl}/${idTerreno}`);
}

}
