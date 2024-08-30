import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { DatosClimaticos } from 'src/app/interfaces/interfaces';
import {  DatosClimaticosService } from 'src/app/services/Datos_Climaticos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-/edit-climates',
  templateUrl: './edit-climates.component.html',
  styleUrls: ['./edit-climates.component.css']
})

export class EditClimatesComponent {
 
    forma!: FormGroup;
    meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    datosclima: DatosClimaticos | null = null;
    loading = false;
  
    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private datosClimaticosService: DatosClimaticosService
    ) {}
  
    ngOnInit(): void {

      this.crearFormulario();
      const idclima = this.route.snapshot.paramMap.get('id');
      if (idclima) {
        const idNumero = Number(idclima);
        if (!isNaN(idNumero)) {
          this.loading = true;
          console.log(idclima);
          this.datosClimaticosService.getDatosClimaticosPorId(idNumero).subscribe(
            (data: DatosClimaticos) => {
              this.datosclima = data;
              this.crearFormulario();
              this.cargarDatosAlFormulario(data); // Método para cargar los datos al formulario
              this.loading = false;
            },
            (error) => {
              console.error('Error al obtener los datos climáticos:', error);
              this.loading = false;
            }
          );
        } else {
          console.error('El ID de los datos climáticos no es un número válido:', idclima);
        }
      }
    }
  
    crearFormulario() {
      const formGroupObj: { [key: string]: any } = {
        Estado: ['', Validators.required]
      };
  
      this.meses.forEach(mes => {
        formGroupObj[`${mes}_Temp_Max_Promedio`] = ['', Validators.required];
        formGroupObj[`${mes}_Temp_Min_Promedio`] = ['', Validators.required];
        formGroupObj[`${mes}_Precipitacion_Promedio`] = ['', Validators.required];
      });
  
      this.forma = this.fb.group(formGroupObj);
    }
  
    cargarDatosAlFormulario(datos: DatosClimaticos) {
      // Iterar sobre los meses y asignar los datos correspondientes a cada control del formulario
      this.meses.forEach(mes => {
        this.forma.get(`${mes}_Temp_Max_Promedio`)?.setValue(datos[`${mes}_Temp_Max_Promedio` as keyof DatosClimaticos]);
        this.forma.get(`${mes}_Temp_Min_Promedio`)?.setValue(datos[`${mes}_Temp_Min_Promedio` as keyof DatosClimaticos]);
        this.forma.get(`${mes}_Precipitacion_Promedio`)?.setValue(datos[`${mes}_Precipitacion_Promedio` as keyof DatosClimaticos]);
      });
      // Asignar el valor del Estado
      this.forma.get('Estado')?.setValue(datos.Estado);
    }
  
    guardar() {
      if (this.forma.valid && this.datosclima !== null) {
        const nuevoDatoClima: DatosClimaticos = this.forma.value;
        this.loading = true;
        this.datosClimaticosService.updateDatosClimaticos(this.datosclima.ID, nuevoDatoClima).subscribe(
          response => {
            console.log('Datos climáticos actualizados correctamente:', response);
            this.loading = false;
            // Aquí podrías añadir lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página
          },
          error => {
            console.error('Error al actualizar los datos climáticos:', error);
            this.loading = false;
            // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje de error al usuario
          }
        );
      } else {
        console.error('Datos climáticos no disponibles o formulario inválido.');
      }
    }
  }