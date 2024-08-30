import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivoSeleccionadoService {
  private idCultivoSeleccionadoSource = new BehaviorSubject<number>(-1);
  idCultivoSeleccionado$ = this.idCultivoSeleccionadoSource.asObservable();

  constructor() { }

  setIdCultivoSeleccionado(idCultivo: number) {
    this.idCultivoSeleccionadoSource.next(idCultivo);
  }
}
