import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Cultivo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  private myAppUrl: string;
  private cultivoApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.cultivoApiUrl = 'api/cultivos/';
  }

  getCultivos(): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(`${this.myAppUrl}${this.cultivoApiUrl}`);
  }

  eliminarCultivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.cultivoApiUrl}${id}`);
  }

  guardarCultivo(cultivo: Cultivo): Observable<Cultivo> {
    return this.http.post<Cultivo>(`${this.myAppUrl}${this.cultivoApiUrl}`, cultivo);
  }
  
  getCultivo(id: number): Observable<Cultivo> {
    return this.http.get<Cultivo>(`${this.myAppUrl}${this.cultivoApiUrl}${id}`);
  }

  actualizarCultivo(id: number, cultivo: Cultivo): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.cultivoApiUrl}${id}`, cultivo);
  }
  getCultivoPorNombreYTemperatura(nombre: string, temperaturaOptima: number, temperaturaMaxima: number,temperaturaminima: number,ciclocultivo:number): Observable<Cultivo> {
    return this.http.get<Cultivo>(`${this.myAppUrl}${this.cultivoApiUrl}${nombre}/${temperaturaOptima}/${temperaturaMaxima}/${temperaturaminima}/${ciclocultivo}`);
  }
  getAllCultivosByIds(cultivoIds: number[]): Observable<Cultivo[]> {
    const ids = cultivoIds.join(','); // Convertir los IDs a una cadena separada por comas
    return this.http.get<Cultivo[]>(`${this.myAppUrl}${this.cultivoApiUrl}byIds/${ids}`);
  }
}
