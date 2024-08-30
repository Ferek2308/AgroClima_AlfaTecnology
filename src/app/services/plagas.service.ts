import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Plaga } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlagaService {
  private myAppUrl: string;
  private plagaApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.plagaApiUrl = 'api/plagas/';
  }

  getPlagas(): Observable<Plaga[]> {
    return this.http.get<Plaga[]>(`${this.myAppUrl}${this.plagaApiUrl}`);
  }

  eliminarPlaga(id: number): Observable<void> {


    return this.http.delete<void>(`${this.myAppUrl}${this.plagaApiUrl}${id}`);
  }

  guardarPlaga(plaga: Plaga): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.plagaApiUrl}`, plaga);
  }

  getPlaga(id: number): Observable<Plaga> {
    return this.http.get<Plaga>(`${this.myAppUrl}${this.plagaApiUrl}${id}`);
  }

  actualizarPlaga(id: number, plaga: Plaga): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.plagaApiUrl}${id}`, plaga);
  }
}
