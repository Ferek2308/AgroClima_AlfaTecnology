import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  CultivoService } from 'src/app/services/cultivos.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { PlagaService } from 'src/app/services/plagas.service';
import { CultivoPlagaService } from 'src/app/services/cultivos_plaga.service';
import{CalculadoraClimaticaService } from 'src/app/services/calculo.service';
import{ClimaCultivoService } from 'src/app/services/clima_cultivo.service';
import{DatosClimaticosService } from 'src/app/services/Datos_Climaticos.service';
import  { Plaga, Cultivo, ClimaCultivo, DatosClimaticos,Usuario} from 'src/app/interfaces/interfaces';
import { HistorialCultivoService } from 'src/app/services/historial_cultivo.service';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-add_crop',
  templateUrl: './add_crop.component.html',
  styleUrls: ['./add_crop.component.css']
})

export class AddCropComponent  {
  forma!: FormGroup;
  base64Imagen: string = '';
  name: string = '';
  culti: string = '';
  mensaje: { texto: string, success: boolean } | null = null;
  plagas: Plaga[] = []; // Lista de plagas disponibles
  plagaSeleccionada: string = ''; // Plaga seleccionada por el usuario
  plagasSeleccionadas: string[] = []; 
  ID_Usuario: number = -1;
  usuario: Usuario | null = null;
  constructor(
    private fb: FormBuilder,
    private cultivoService: CultivoService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private plagaService: PlagaService,
    private cultivosplagaService: CultivoPlagaService,
    private calculadoraClimatica: CalculadoraClimaticaService,
    private data: DatosClimaticosService,
    private climaCultivoService :ClimaCultivoService,
    private historialService: HistorialCultivoService,
    private userdata:UsuarioService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.crearFormulario();
    this.loadUser();
  
  }
  obtenerIdUsuarioDesdeCookie(): number {
    const userId = this.cookieService.get('userId');
    return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}
loadUser(): void {
  console.log(this.ID_Usuario);
  this.userdata.getUsuario(this.ID_Usuario).subscribe(
    (data: Usuario) => {
      this.usuario = data;
      this.name = data.Nombre;
    },
    (error) => {
      console.error('Error al cargar los Terrenos:', error);
    }
  );
}
  loadPlagas(): void {
    this.plagaService.getPlagas().subscribe(
      (data: Plaga[]) => {
        this.plagas = data;
      },
      (error) => {
        console.error('Error al cargar las plagas:', error);
      }
    );
  }

  agregarPlaga(): void {
    const selectElement = document.getElementById('plagas') as HTMLSelectElement;
    const selectedPlaga = selectElement.value;
    if (selectedPlaga && !this.plagasSeleccionadas.includes(selectedPlaga)) {
      this.plagasSeleccionadas.push(selectedPlaga);
    }
  }
  eliminarPlaga(index: number): void {
    this.plagasSeleccionadas.splice(index, 1);
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 1048576) {
        this.compressImage(file); // Llamamos a la función para comprimir la imagen
      } else {
        console.error('La imagen es demasiado grande. Por favor, seleccione una imagen de menos de 1 MB.');
      }
    }
  }

  compressImage(file: File) {
    this.ng2ImgMaxService.compressImage(file, 0.5).subscribe(
      result => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.base64Imagen = e.target.result;
        };
        reader.readAsDataURL(result); // Convertimos el archivo comprimido a base64
      },
      error => {
        console.error('Error al comprimir la imagen:', error);
      }
    );
  }

  eliminarImagen() {
    this.base64Imagen = ''; // Limpiar la imagen en la interfaz
    // Aquí puedes agregar lógica adicional si es necesario
  }

  crearFormulario() {
    this.forma = this.fb.group({
      Nombre: ['', Validators.required],
      Metodo_Optimo_Siembra: ['', Validators.required],
      Metodo_de_Cosechar: ['', Validators.required],
      Recomendaciones_De_Riego: ['', Validators.required],
      Tipo_De_Suelo: ['', Validators.required],
      Precio_En_El_Mercado: ['', Validators.required],
      Cantidad_Por_Metro_Cuadrado: ['', Validators.required],
      Manejo_Post_Cosecha: ['', Validators.required],

      Cuidado: ['', Validators.required],
      Recomendaciones: ['', Validators.required],
      
      TemperaturaOptima: ['', Validators.required],
      TemperaturaMinima: ['', Validators.required],
      TemperaturaMaxima: ['', Validators.required],
      CicloCultivo: ['', Validators.required],
      Imagen: [''], // Nuevo campo en el formulario para la imagen
      plagaSeleccionada: [''] 
    });
  }
  registrarAccion() {
    const fecha = new Date(); // Esto creará una instancia de Date con la fecha y hora actuales.

    const hora = fecha.toLocaleTimeString();
   
  console.log('registro',fecha,hora)
    const registro = {
      Usuario: this.name,
      Accion: "Creacion",
      Cultivo_Modificada: this.culti,
      Cambios_Realizados: "Se creo un nuevo cultivo",
      Fecha: fecha,
      Hora: hora
    };
  
    this.historialService.createHistorialCultivo(registro).subscribe(
      () => {
        console.log('Cambio registrado en el historial.');
      },
      error => {
        console.error('Error al registrar el cambio en el historial:', error);
      }
    );
  }
  

  guardar() {
    this.culti= this.forma.value.Nombre;
   
    if (this.forma.valid) {
      const nuevoCultivo = {
      
        Nombre: this.forma.value.Nombre,
        Metodo_Optimo_Siembra: this.forma.value.Metodo_Optimo_Siembra,
        Manera_de_Cosechar: this.forma.value.Metodo_de_Cosechar,
        Tipo_De_Suelo: this.forma.value.Tipo_De_Suelo,
        Recomendaciones_De_Riego: this.forma.value.Recomendaciones_De_Riego,
        Cantidad_Por_Metro_Cuadrado: this.forma.value.Cantidad_Por_Metro_Cuadrado,
        Precio_En_El_Mercado: this.forma.value.Precio_En_El_Mercado,
        Manejo_Post_Cosecha: this.forma.value.Manejo_Post_Cosecha,
        Cuidado: this.forma.value.Cuidado,
        Recomendaciones: this.forma.value.Recomendaciones,
        Estacion: this.forma.value.Estacion,
        TemperaturaOptima: this.forma.value.TemperaturaOptima,
        TemperaturaMinima: this.forma.value.TemperaturaMinima,
        TemperaturaMaxima: this.forma.value.TemperaturaMaxima,
        CicloCultivo: this.forma.value.CicloCultivo,
        Imagen: this.base64Imagen ? this.base64Imagen : null,
        Plagas: this.plagasSeleccionadas.map(plaga => ({ ID_Plaga: plaga }))
      };
      console.log('Cultivos seleccionadas:', nuevoCultivo.Plagas);
      this.cultivoService.guardarCultivo(nuevoCultivo).subscribe(
        () => {
          this.cultivosplagaService.createCultivoPlaga
          this.mostrarMensaje('Cultivo guardado exitosamente', true);
      

          this.crearCultivoClima(nuevoCultivo);
          this.registrarAccion();
        },
        error => {
          this.mostrarMensaje('Error al guardar el cultivo', false);
          console.error('Error al guardar el cultivo:', error);
        }
      );
    } else {
      this.mostrarMensaje('El formulario no es válido', false);
      console.error('El formulario no es válido');
    }
  }
  mostrarMensaje(texto: string, success: boolean) {
    this.mensaje = { texto, success };
  }

  limpiarMensaje() {
    this.mensaje = null;
  }
 
  crearCultivoClima(nuevoCultivo: Cultivo) {
    // Obtener los datos climáticos primero suscribiéndote al observable

    this.data.getDatosClimaticos().subscribe(
      (datosClimaticos: DatosClimaticos[]) => {
        // Una vez que obtengas los datos climáticos, calcular el clima para el nuevo cultivo
        console.log(datosClimaticos, nuevoCultivo);
        this.cultivoService.getCultivoPorNombreYTemperatura(nuevoCultivo.Nombre,nuevoCultivo.TemperaturaOptima,nuevoCultivo.TemperaturaMaxima,nuevoCultivo.TemperaturaMinima,nuevoCultivo.CicloCultivo).subscribe(
          (cultivos: Cultivo) => {
            const resultados: ClimaCultivo[] = this.calculadoraClimatica.calcularMesOptimoYFechaCosecha(cultivos, datosClimaticos);
            // Manejar los resultados del cálculo del clima aquí
            this.guardarResultadosClima(resultados);
            console.log('Resultados del cálculo del clima:', resultados);
          },
          error => {
            console.error('Error al obtener los datos climáticos:', error);
          }
        );
        // Aquí podrías hacer algo más con los resultados, como guardarlos en la base de datos
      },
      error => {
        console.error('Error al obtener los datos climáticos:', error);
      }
    );
  }

  guardarResultadosClima(resultados: ClimaCultivo[]) {
    // Iterar sobre los resultados y enviar cada uno al servidor
    this.climaCultivoService.createClimaCultivo(resultados).subscribe(
      () => {
        console.log('ClimaCultivos creados exitosamente');
       
      },
      error => {
        console.error('Error al crear ClimaCultivos:', error);
      }
    );
  }
}
