import { Component } from '@angular/core';
import  { HistorialPlaga } from 'src/app/interfaces/interfaces';
import {  HistorialPlagaService } from 'src/app/services/historial_plaga.service';

@Component({
  selector: 'app-history_of_pests.component',
  templateUrl: './history_of_pests.component.html',
  styleUrls: ['./history_of_pests.component.css']
})

export class HitoryPestsComponent {
  plagas: HistorialPlaga[] = [];
  filtro: string = '';
  filtroMenuVisible: boolean = false;
  selectedFiltro: string = 'Nombre';
  constructor(private historial: HistorialPlagaService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  
  }
  cargarHistorial(): void {
    this.historial.getAllHistorialPlaga().subscribe(
      plagas => {
        this. plagas=  plagas;
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

filtrarHistorial(): HistorialPlaga[] {
  if (!this.filtro.trim()) {
      return this.plagas;
  }

  switch (this.selectedFiltro) {
      case 'Usuario':
          return this.plagas.filter(plagas => plagas.Usuario.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Accion':
          return this.plagas.filter(plagas => plagas.Accion.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Plaga':
          return this.plagas.filter(plagas  => plagas.Plaga_Modificada.toLowerCase().includes(this.filtro.toLowerCase()));
      case 'Fecha':
            return this.plagas.filter(plagas => {
                const fechaCultivo = plagas.Fecha.toLocaleDateString(); // Suponiendo que 'Fecha' es un objeto Date
                return fechaCultivo.includes(this.filtro.toLocaleLowerCase());
            });
          default:
          return this.plagas;
  }
}
}