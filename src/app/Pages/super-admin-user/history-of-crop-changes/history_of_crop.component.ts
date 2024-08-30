import { Component } from '@angular/core';
import  { HistorialCultivo } from 'src/app/interfaces/interfaces';
import {  HistorialCultivoService } from 'src/app/services/historial_cultivo.service';

@Component({
  selector: 'app-history_of_crop.component',
  templateUrl: './history_of_crop.component.html',
  styleUrls: ['./history_of_crop.component.css']
})

export class HitoryCropComponent {
  cultivos: HistorialCultivo[] = [];
  filtro: string = '';
  filtroMenuVisible: boolean = false;
  selectedFiltro: string = 'Nombre';
  constructor(private historial: HistorialCultivoService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  
  }
  cargarHistorial(): void {
    this.historial.getAllHistorialCultivo().subscribe(
      cultivos => {
        this. cultivos=  cultivos;
      },
      error => {
        console.error(error);
      }
    );
  }
  
toggleFiltroMenu() {
    this.filtroMenuVisible = !this.filtroMenuVisible;
}

cerrarFiltroMenu() {
  this.filtroMenuVisible = false;
}

filtrarHistorial(): HistorialCultivo[] {
  if (!this.filtro.trim()) {
      return this.cultivos;
  }

  switch (this.selectedFiltro) {
      case 'Usuario':
          return this.cultivos.filter(cultivo => cultivo.Usuario.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Accion':
          return this.cultivos.filter(cultivo  => cultivo.Accion.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Cultivo':
          return this.cultivos.filter(cultivo  => cultivo.Cultivo_Modificada.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Fecha':
            return this.cultivos.filter(cultivo => {
                const fechaCultivo = cultivo.Fecha.toLocaleDateString(); // Suponiendo que 'Fecha' es un objeto Date
                return fechaCultivo.includes(this.filtro.toLocaleLowerCase());
            });
          default:
          return this.cultivos;
  }
}
}