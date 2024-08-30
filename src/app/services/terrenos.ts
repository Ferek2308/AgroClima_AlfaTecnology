import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Terreno } from '../interfaces/interfaces'; // Asegúrate de importar la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class TerrenoService {
  private myAppUrl: string;
  private terrenoApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.terrenoApiUrl = 'api/terrenos/';
  }

  // Obtener todos los terrenos
  getAllTerrenos(): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(`${this.myAppUrl}${this.terrenoApiUrl}`);
  }

  // Obtener un terreno por su ID
  getTerrenoById(id: number): Observable<Terreno> {
    return this.http.get<Terreno>(`${this.myAppUrl}${this.terrenoApiUrl}${id}`);
  }

  // Crear un nuevo terreno
  createTerreno(terreno: Terreno): Observable<Terreno> {
    return this.http.post<Terreno>(`${this.myAppUrl}${this.terrenoApiUrl}`, terreno);
  }

  // Actualizar un terreno por su ID
  updateTerreno(id: number, terreno: Terreno): Observable<Terreno> {
    return this.http.put<Terreno>(`${this.myAppUrl}${this.terrenoApiUrl}${id}`, terreno);
  }

  // Eliminar un terreno por su ID
  deleteTerreno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.terrenoApiUrl}${id}`);
  }

  // Obtener todos los terrenos de un usuario por su ID de usuario
  getTerrenosByUserId(userId: number): Observable<Terreno[]> {
    return this.http.get<Terreno[]>(`${this.myAppUrl}${this.terrenoApiUrl}usuarios/${userId}`);
  }
}
