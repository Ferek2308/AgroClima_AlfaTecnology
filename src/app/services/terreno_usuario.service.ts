import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { TerrenoUsuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TerrenoUsuarioService {
  private myAppUrl: string;
  private terrenoUsuarioApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.terrenoUsuarioApiUrl = 'api/TerrenoUsuario/';
  }

  // Obtener todos los registros de TerrenoUsuario
  getAllTerrenoUsuario(): Observable<TerrenoUsuario[]> {
    return this.http.get<TerrenoUsuario[]>(`${this.myAppUrl}${this.terrenoUsuarioApiUrl}`);
  }

  // Crear un nuevo registro en TerrenoUsuario
  createTerrenoUsuario(terrenoUsuario: TerrenoUsuario): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.terrenoUsuarioApiUrl}`, terrenoUsuario);
  }

  // Eliminar un registro de TerrenoUsuario por ID de Terreno y Usuario
  deleteTerrenoUsuario(idTerreno: number, idUsuario: number): Observable<any> {
    return this.http.delete<any>(`${this.myAppUrl}${this.terrenoUsuarioApiUrl}${idTerreno}/${idUsuario}`);
  }
}
