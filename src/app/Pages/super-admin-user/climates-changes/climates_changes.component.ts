import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DatosClimaticos } from 'src/app/interfaces/interfaces';
import {  DatosClimaticosService } from 'src/app/services/Datos_Climaticos.service';
@Component({
  selector: 'app-climates_changes',
  templateUrl: './climates_changes.component.html',
  styleUrls: ['./climates_changes.component.css']
})

export class ClimatesChangesComponent {

  forma!: FormGroup;
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    // Instancia de DatosClimaticos, puedes inicializarla con los valores necesarios

  constructor(private fb: FormBuilder,private datosClimaticosService: DatosClimaticosService) {}

  ngOnInit(): void {
    this.crearFormulario();
 
  
  }
  crearFormulario() {
    const formGroupObj: { [key: string]: any } = {
      Estado: ['', Validators.required] // Aquí inicializamos 'Estado'
    };

    this.meses.forEach(mes => {
      formGroupObj[`${mes}_Temp_Max_Promedio`] = ['', Validators.required];
      formGroupObj[`${mes}_Temp_Min_Promedio`] = ['', Validators.required];
      formGroupObj[`${mes}_Precipitacion_Promedio`] = ['', Validators.required];
    });

    this.forma = this.fb.group(formGroupObj);
  }

  guardar() {
    if (this.forma.valid) {
      const nuevoDatoClima: DatosClimaticos = this.forma.value;
      console.log(nuevoDatoClima.Estado);
      this.datosClimaticosService.createDatosClimaticos(nuevoDatoClima)
        .subscribe(
          response => {
            console.log('Datos climáticos guardados correctamente:', response);
            // Aquí podrías añadir lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página
          },
          error => {
            console.error('Error al guardar los datos climáticos:', error);
            // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje de error al usuario
          }
        );
    } else {
      // Mostrar los errores de validación en los campos
    Object.keys(this.forma.controls).forEach(field => {
      const control = this.forma.get(field);
      if (control && control.invalid) {
        const mensajesError = control.getError('required') ?
                              'Campo obligatorio' :
                              control.getError('otroTipoDeValidacion'); // Reemplaza 'otroTipoDeValidacion' con el nombre de tu validador personalizado
        console.log(`Error en el campo ${field}: ${mensajesError}`);
      }
    });
      console.log('El formulario no es válido. Por favor, corrige los campos marcados.');
    }
  
}}