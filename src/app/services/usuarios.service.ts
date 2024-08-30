import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Usuario, UsuarioValidadoResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string;
  private myApiUrl: string;
  private userId: number | null = null;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/'
  }

  getListaUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  guardarUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, usuario)
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario);
  }
 // Nuevo método para validar el usuario
 validarUsuario(email: string, password: string): Observable<Usuario> {
  return this.http.post<Usuario>(`${this.myAppUrl}${this.myApiUrl}login`, { email, password });
}
  // Método para guardar el ID del usuario
  guardarIdUsuario(id: number): void {
    this.userId = id;
  }

  // Método para obtener el ID del usuario
  obtenerIdUsuario(): number | null {
    return this.userId;
  
  }
}
