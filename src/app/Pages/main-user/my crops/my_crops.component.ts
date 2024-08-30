import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TerrenoCultivoService } from 'src/app/services/terreno_cultivo.service';
import { CultivoService } from 'src/app/services/cultivos.service';
import { startOfDay, endOfDay, addDays , subMonths, addMonths } from 'date-fns';
import { CalendarEvent, CalendarMonthViewDay  } from 'angular-calendar';
import  { Cultivo, TerrenoCultivo } from 'src/app/interfaces/interfaces';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-my_crops',
  templateUrl: './my_crops.component.html',
  styleUrls: ['./my_crops.component.css']
})
export class MyCropsComponent {
  terrenCulti: TerrenoCultivo[]=[];
  terren: TerrenoCultivo| null = null;
  cultivos: Cultivo[]=[];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedEvent: CalendarEvent | null = null;
  constructor(

    private route: ActivatedRoute,

    private terrenoscul: TerrenoCultivoService ,

    private router: Router,
    private cultis: CultivoService
  ) { }
  
  ngOnInit(): void {

  
    console.log('Eventos:', this.events);
    const idTerreno = this.route.snapshot.paramMap.get('id');
    if (idTerreno) {
      const idNumero = Number(idTerreno); // Convertir a número
      // Verificar si la conversión fue exitosa
      if (!isNaN(idNumero)) {
        // Hacer una solicitud para obtener los detalles de los terrenosCultivos
        this.terrenoscul.getAllTerrenoCultivoById(idNumero).subscribe(
          (data: TerrenoCultivo[]) => {
            this.terrenCulti = data; 
            this.updateEvents(); // Almacenar los detalles de terrenosCultivos
            // Extraer los IDs de los cultivos de cada terrenoCultivo y almacenarlos en un arreglo
            const cultivoIds: number[] = this.terrenCulti.map(
              (terrenoCultivo: TerrenoCultivo) => terrenoCultivo.ID_Cultivo
              
            );
            // Hacer una solicitud para obtener los detalles de los cultivos utilizando los IDs
            this.getCultivosDetails(cultivoIds);
            this.events;
            
            console.log('Eventos:', this.events);

           
          },
          (error) => {
            console.error('Error al obtener los terrenosCultivos:', error);
          }
        );
      } else {
        console.error('El ID del terreno no es un número válido:', idTerreno);
      }
    }
  }
  handleEventClicked(event: CalendarEvent): void {
    console.log('Evento clicado:', event);
    this.selectedEvent = event;
  }

  // Método para obtener los detalles de los cultivos utilizando los IDs
// Método para obtener los detalles de los cultivos utilizando los IDs
// Método para obtener los detalles de los cultivos utilizando los IDs
getCultivosDetails(cultivoIds: number[]): void {
  this.cultis.getAllCultivosByIds(cultivoIds).subscribe(
    (data: Cultivo[]) => {
      this.cultivos = data;
      this.updateEvents(); // Actualizar eventos una vez que se completen las operaciones asíncronas
    },
    (error) => {
      console.error('Error al obtener los cultivos:', error);
    }
  );
}
  
  // Método para ir al mes anterior
  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
    this.updateEvents();
  }

  // Método para ir al siguiente mes
  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
    this.updateEvents();
  }

  updateEvents(): void {
    this.events = [];
    this.terrenCulti.forEach((terrenoCultivo: TerrenoCultivo) => {
      const cultivo = this.cultivos.find(c => c.ID_Cultivo === terrenoCultivo.ID_Cultivo);
      
      if (cultivo) {
        // Construir los eventos de cultivo y cosecha
        const cultivoDate = new Date(terrenoCultivo.Fecha_Inicio);
        const cosechaDate = new Date(terrenoCultivo.Fecha_Cosecha);
        this.events.push({
          title: `Cultivo: ${cultivo.Nombre}`,
          start: startOfDay(cultivoDate),
          end: endOfDay(cultivoDate),
          color: { primary: '#322d01', secondary: '#6e4f16' }
        });
        this.events.push({
          title: `Cosecha: ${cultivo.Nombre}`,
          start: startOfDay(cosechaDate),
          end: endOfDay(cosechaDate),
          color: { primary: '#0e2901', secondary: '#5e8515' }
        });
      }
    });
  }
  
    
}