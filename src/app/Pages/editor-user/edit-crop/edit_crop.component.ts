import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  CultivoService } from 'src/app/services/cultivos.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { PlagaService } from 'src/app/services/plagas.service';
import { CultivoPlagaService } from 'src/app/services/cultivos_plaga.service';
import  { Cultivo, Plaga, Cultivo_Plaga, Usuario } from 'src/app/interfaces/interfaces';
import { HistorialCultivoService } from 'src/app/services/historial_cultivo.service';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-edit-crop',
  templateUrl: './edit_crop.component.html',
  styleUrls: ['./edit_crop.component.css']
})
export class EditCropComponent {
    forma!: FormGroup;
    name: string = '';
    culti: string = '';
    base64Imagen: string | null = null;
    mensaje: { texto: string, success: boolean } | null = null;
    plagas: Plaga[] = []; // Lista de plagas disponibles
    plagasref: Cultivo_Plaga[] = [];
    plagaSeleccionada: string = ''; // Plaga seleccionada por el usuario
    plagasSeleccionadas: string[] = []; 
    plagasRelacionadas: number[] = []; 
    cultivo: Cultivo | null =null;
    usuario: Usuario | null =null;
    ID_Usuario: number = -1;

    constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private cultivoService: CultivoService,
      private ng2ImgMaxService: Ng2ImgMaxService,
      private plagaService: PlagaService,
      private cultivosplagaService: CultivoPlagaService,
      private router: Router,
      private historialService: HistorialCultivoService,
      private userdata:UsuarioService,
      private cookieService: CookieService
    ) { }
  
    ngOnInit(): void {
      this.crearFormulario();
      this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
      this.loadUser();
      this.loadPlagas();
      this.obtenerPlagasRelacionadas();

      const idCultivo = this.route.snapshot.paramMap.get('id');
      if (idCultivo) {
        const idNumero = Number(idCultivo); // Convertir a número
        
        // Verificar si la conversión fue exitosa
        if (!isNaN(idNumero)) {
          
          // Hacer una solicitud para obtener los detalles de la plaga
          this.cultivoService.getCultivo(idNumero).subscribe(
            (data: Cultivo) => {
              this.culti=data.Nombre;
              console.log('Valor del campo Nombre:', data.Nombre);
              // Al recibir los datos, asignarlos al formulario
              this.cultivo = data;
              this.crearFormulario(); // Llamar al método para crear el formulario
              this.forma.patchValue(data); // Rellenar el formulario con los datos de la plaga
              this.base64Imagen = data.Imagen; // Mostrar la imagen
             
            },
            
            (error) => {
              console.error('Error al obtener la plaga:', error);
            }
            
          );
        } else {
          console.error('El ID de la plaga no es un número válido:', idCultivo);
        }
      }
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
  
    obtenerPlagasRelacionadas(): void {
      const idCultivo = this.route.snapshot.paramMap.get('id');
      if (idCultivo) {
          const idNumero = Number(idCultivo);

          if (!isNaN(idNumero)) {
              this.cultivosplagaService.getCultivoPlagaByCultivoId(idNumero).subscribe(
                  (data: Cultivo_Plaga[]) => {
                      this.plagasRelacionadas = data.map(item => item.ID_Plaga); 
                      console.log('IDs de las plagas relacionadas:', this.plagasRelacionadas);
                      const nombresPlagas = this.obtenerNombresPlagas(); 
                      console.log('Nombres de las plagas relacionadas:', nombresPlagas);// Almacena los ID de las plagas relacionadas
                      this.plagasSeleccionadas = nombresPlagas;
                  },
                  (error) => {
                      console.error('Error al obtener las plagas relacionadas:', error);
                  }
              );
          } else {
              console.error('El ID del cultivo no es un número válido:', idCultivo);
          }
      }
  }
    agregarPlaga(): void {
      const selectElement = document.getElementById('plagas') as HTMLSelectElement;
      const selectedPlagaId = selectElement.value; 
  

console.log('agregando',this.cultivo?.ID_Cultivo);
  
  // Verificar si se ha seleccionado una plaga y si el ID del cultivo está disponible
  if (selectedPlagaId && this.cultivo && this.cultivo.ID_Cultivo) {
    // Convertir el ID de la plaga seleccionada en un número
    const plagaIdNumber = parseInt(selectedPlagaId, 10); // O puedes usar Number(selectedPlagaId);
    console.log('agregando',selectedPlagaId);
    // Llamar al servicio para agregar la relación entre el cultivo y la plaga
    this.cultivosplagaService.createCultivoPlaga(this.cultivo.ID_Cultivo, plagaIdNumber).subscribe(
      (response) => {
        // Agregar la plaga seleccionada a la lista de plagas asociadas al cultivo
        this.plagasSeleccionadas.push(selectedPlagaId);
        // Mensaje de éxito u otras acciones si es necesario
      },
      (error) => {
        console.error('Error al agregar la plaga al cultivo:', error);
        // Manejar el error según sea necesario
      }
    );
  } else {
    console.error('No se ha seleccionado ninguna plaga o no se dispone del ID del cultivo.');
    // Manejar la situación en la que no se ha seleccionado una plaga o no se dispone del ID del cultivo
  }
}
eliminarPlaga(index: number): void {
  // Obtener el ID del cultivo y el ID de la plaga correspondientes al índice
  const idCultivo = this.cultivo?.ID_Cultivo;
  const idPlaga = this.plagasRelacionadas[index];

  // Verificar si se tienen los IDs necesarios
  if (idCultivo && idPlaga) {
      // Llamar al servicio para eliminar la relación
      this.cultivosplagaService.deleteCultivoPlaga(idCultivo, idPlaga).subscribe(
          (response) => {
              // Eliminar la plaga del array de plagas seleccionadas
              this.plagasSeleccionadas.splice(index, 1);
          },
          (error) => {
              console.error('Error al eliminar la relación Cultivo-Plaga:', error);
          }
      );
  } else {
      console.error('No se pudo eliminar la plaga: IDs no disponibles');
  }
}
  
  obtenerNombrePlaga(idPlaga: string): string {
    // Convierte idPlaga a número
    const idPlagaNumber = parseInt(idPlaga, 10);

    // Busca la plaga por su ID (ahora de tipo number)
    const plaga = this.plagas.find(plaga => plaga.ID_Plaga === idPlagaNumber);

    // Devuelve el nombre de la plaga si se encuentra, de lo contrario, una cadena vacía
    return plaga ? plaga.Nombre : '';
}
obtenerNombresPlagas(): string[] {
  
  const nombresPlagas: string[] = [];

  this.plagasRelacionadas.forEach(idPlaga => {
      // Convierte el ID de la plaga a número para que coincida con el tipo de datos en el array de plagas
      const idPlagaNumber = Number(idPlaga);

      // Busca la plaga por su ID convertido a número
      const plaga = this.plagas.find(plaga => plaga.ID_Plaga === idPlagaNumber);

      // Si se encuentra la plaga, añade su nombre al array de nombres
      if (plaga) {
          nombresPlagas.push(plaga.Nombre);
      }
  });

  return nombresPlagas;
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
        Manera_de_Cosechar: ['', Validators.required],
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
   
  
    const registro = {
      Usuario: this.name,
      Accion: "Edicion",
      Cultivo_Modificada: this.culti,
      Cambios_Realizados: "Se Edito un Cultivo",
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
      this.registrarAccion();
      if (this.forma.valid) {
        const imagenActualizada = this.base64Imagen ? this.base64Imagen : this.cultivo?.Imagen;
        console.log('Base64 de la imagen actualizada:', imagenActualizada);
  
      // Combinar los datos del formulario con la imagen actualizada
      const datosActualizados = { ...this.forma.value, ID_Cultivo: this.cultivo?.ID_Cultivo, Imagen: imagenActualizada };
      console.log('Datos actualizados:', datosActualizados); 
        // Enviar los datos actualizados al servicio
        this.cultivoService.actualizarCultivo(this.cultivo?.ID_Cultivo?? 0, datosActualizados).subscribe(
          (response) => {
            this.mostrarMensaje('Cultivo Actualizado Correctamente', true);
            this.router.navigate(['/editor-nav/todos-los-cultivos']);
          },
          error => {
            this.mostrarMensaje('Error al Actualizar el cultivo', false);
            console.error('Error al Actualizar el Cultivo:', error);
          }
        );
      } else {
        this.mostrarMensaje('Debe llenar todos los Campos del Cultivo', false);
        console.error('El formulario no es válido');
      }
    }
    mostrarMensaje(texto: string, success: boolean) {
      this.mensaje = { texto, success };
    }
  
    limpiarMensaje() {
      this.mensaje = null;
    }
    
  }
  