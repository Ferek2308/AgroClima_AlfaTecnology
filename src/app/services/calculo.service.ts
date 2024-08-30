import { Injectable } from '@angular/core';
import { ClimaCultivo, Cultivo, DatosClimaticos
 } from '../interfaces/interfaces';
 import { CultivoService } from 'src/app/services/cultivos.service'; // Importa el servicio CultivoService

@Injectable({
    providedIn: 'root'
  })
  export class CalculadoraClimaticaService {
  
    constructor(private cultivoService: CultivoService) { } 

    calcularMesOptimoYFechaCosecha(cultivo: Cultivo, datosClimaticos: DatosClimaticos[]): ClimaCultivo[] {
      const resultados: ClimaCultivo[] = [];
      console.log(cultivo.ID_Cultivo);
      for (const clima of datosClimaticos) {
        const climaCultivo: ClimaCultivo = this.calcularParaUbicacion(cultivo, clima);
        resultados.push(climaCultivo);
      }
  
      return resultados;
    }
  
    private calcularParaUbicacion(cultivo: Cultivo, datoClimatico: DatosClimaticos): ClimaCultivo {
       
        console.log(datoClimatico.ID);
        console.log(cultivo.TemperaturaMinima);
      let mesOptimo: string = ""; 
      let temperaturaOptima: number = cultivo.TemperaturaOptima ?? 0;
      let cicloCultivo: number = cultivo.CicloCultivo ?? 0;
      let mesCosecha: string;
      let minDistancia: number = Number.MAX_VALUE;
      // Iterar sobre los meses en los datos climáticos
      const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
      for (let i = 0; i < meses.length; i++) {
        const mesActual = meses[i];
       
        // Obtener la temperatura máxima promedio del mes actual
        const temperaturaMaxPromedio: number = Number(datoClimatico[`${mesActual}_Temp_Max_Promedio` as keyof DatosClimaticos]);
        const temperaturaMinPromedio: number = Number(datoClimatico[`${mesActual}_Temp_Min_Promedio` as keyof DatosClimaticos]);
        const temperaturaPromedio: number = (temperaturaMaxPromedio + temperaturaMinPromedio) / 2;

        // Calcular la distancia absoluta entre la temperatura óptima y la temperatura promedio
        const distancia = Math.abs(temperaturaOptima - temperaturaPromedio);
        console.log('promedio',temperaturaPromedio, mesActual);
        // Actualizar el mes óptimo si encontramos una distancia menor
        if (distancia < minDistancia) {
            console.log('distance',distancia);
            console.log('mD',minDistancia);
            minDistancia = distancia;
            mesOptimo = mesActual;
        }
      }
      console.log("El mes óptimo es:", mesOptimo);
      const diasPorMes: { [key: string]: number } = {
        'ENE': 31,
        'FEB': 28,
        'MAR': 31,
        'ABR': 30,
        'MAY': 31,
        'JUN': 30,
        'JUL': 31,
        'AGO': 31,
        'SEP': 30,
        'OCT': 31,
        'NOV': 30,
        'DIC': 31
    };
    
    
    let diasAcumulados = 0;
    let indexMesOptimo = meses.indexOf(mesOptimo); // Obtén el índice del mes óptimo
    let indexMesCosecha = indexMesOptimo; // Comienza desde el mes óptimo
    for (let i = indexMesOptimo; i < meses.length + indexMesOptimo; i++) { // Ajusta el inicio del bucle
        const mesActual = meses[i % meses.length]; // Utiliza el módulo para manejar el ciclo de los meses
        const diasMes = diasPorMes[mesActual];
        diasAcumulados += diasMes;
        if (diasAcumulados >= cicloCultivo) {
            indexMesCosecha = i;
            break;
        }
    }
    
    mesCosecha = meses[indexMesCosecha % meses.length]; // Utiliza el módulo para manejar el ciclo de los meses
    console.log("El mes de cosecha es:", mesCosecha);

      // Crear objeto ClimaCultivo con los resultados y devolverlo
      const climaCultivo: ClimaCultivo = {
        ID_Cultivo: cultivo.ID_Cultivo ?? 0,
        ID_Clima: datoClimatico.ID,
        Localidad: datoClimatico.Estado,
        Mes_Optimo_Siembra: mesOptimo,
        Mes_Cosecha: mesCosecha,
      };
  
      return climaCultivo;
    }
  }