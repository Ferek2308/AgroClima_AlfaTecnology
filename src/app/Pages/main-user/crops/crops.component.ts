import { Component } from '@angular/core';
import { CultivoService } from 'src/app/services/cultivos.service';
import { Cultivo } from 'src/app/interfaces/interfaces';
import { CultivoSeleccionadoService } from 'src/app/services/selec.service';
@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.css']
})
export class CropsComponent {
  cultivos: Cultivo[] = [];
  showadd: boolean = false;
  filtro: string = '';
  constructor(private cultivoService: CultivoService, private cultivoSeleccionadoService: CultivoSeleccionadoService) { }

  ngOnInit(): void {
    this.loadPlagas();
  }

  loadPlagas(): void {
    this.cultivoService.getCultivos().subscribe(
      (data: Cultivo[]) => {
        this.cultivos = data;
      },
      (error) => {
        console.error('Error al cargar las plagas:', error);
      }
    );
  }

  cerrarAgregar() {
    this.showadd = false;
    window.location.reload(); 
  }
  mostraradd(idCultivo: number | undefined): void {
    if (idCultivo !== undefined) {
      this.cultivoSeleccionadoService.setIdCultivoSeleccionado(idCultivo);
      this.showadd = !this.showadd;
      console.log('showLogin:', this.showadd);
    }
 
  }
  // Método para filtrar los cultivos
  filtrarCultivos(): Cultivo[] {
    if (!this.filtro.trim()) {
        return this.cultivos;
    }
    return this.cultivos.filter(cultivo =>
        cultivo.Nombre.toLowerCase().includes(this.filtro.trim().toLowerCase())
    );
}
}