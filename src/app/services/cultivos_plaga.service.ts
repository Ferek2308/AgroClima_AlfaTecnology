import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Cultivo_Plaga } from '../interfaces/interfaces'; // Asegúrate de importar la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class CultivoPlagaService {
  private myAppUrl: string;
  private cultivoPlagaApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.cultivoPlagaApiUrl = 'api/cultivos_plaga/';
  }

  // Obtener todas las relaciones CultivoPlaga
  getAllCultivoPlaga(): Observable<Cultivo_Plaga[]> {
    return this.http.get<Cultivo_Plaga[]>(`${this.myAppUrl}${this.cultivoPlagaApiUrl}`);
  }

// Obtener una relación CultivoPlaga por su ID de cultivo
getCultivoPlagaByCultivoId(id: number): Observable<Cultivo_Plaga[]> {
    return this.http.get<Cultivo_Plaga[]>(`${this.myAppUrl}${this.cultivoPlagaApiUrl}${id}`);
  }

 
// Servicio cultivosplagaService
createCultivoPlaga(ID_Cultivo: number, ID_Plaga: number): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.cultivoPlagaApiUrl}`, { ID_Cultivo, ID_Plaga });
  }
  

  // Eliminar una relación CultivoPlaga por su ID de cultivo y plaga
  deleteCultivoPlaga(idCultivo: number, idPlaga: number): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.cultivoPlagaApiUrl}${idCultivo}/${idPlaga}`);
  }
}
