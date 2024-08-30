import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DatosClimaticos } from 'src/app/interfaces/interfaces';
import {  DatosClimaticosService } from 'src/app/services/Datos_Climaticos.service';

@Component({
  selector: 'app-all-climates',
  templateUrl: './all-climates.component.html',
  styleUrls: ['./all-climates.component.css']
})

export class AllClimatesComponent {
    datosClimaticos: DatosClimaticos[] = [];

  
    constructor(private datosclima: DatosClimaticosService) { }
  
    ngOnInit(): void {
      this.cargarClimas();
    }
  
    cargarClimas(): void {
      this.datosclima.getDatosClimaticos().subscribe(
        datosClimaticos => {
          this. datosClimaticos =  datosClimaticos;
        },
        error => {
          console.error(error);
        }
      );
    }
  

    
    
    eliminar(idClima?: number): void {
      this.datosclima.deleteDatosClimaticos(idClima).subscribe(
        () => {
          // Si la eliminación fue exitosa, actualiza la lista de usuarios en la interfaz
          this.datosClimaticos = this.datosClimaticos.filter(clima => clima.ID !== idClima);
        },
        error => {
          console.error('Error al eliminar el Clima:', error);
          // Aquí podrías mostrar un mensaje de error o realizar cualquier otra acción adecuada
        }
      );
    }
  
    
  }