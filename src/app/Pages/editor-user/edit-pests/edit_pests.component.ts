import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlagaService } from 'src/app/services/plagas.service';
import { Plaga ,Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { HistorialPlagaService } from 'src/app/services/historial_plaga.service';

import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-edir:pests',
  templateUrl: './edit_pests.component.html',
  styleUrls: ['./edit_pests.component.css']
})

export class EditPestsComponent {
  forma!: FormGroup;
  name: string = '';
  plag: string = '';
  base64Imagen: string | null = null;
  plaga: Plaga | null = null;
  ID_Usuario: number = -1;
  usuario: Usuario| null = null; 
  mensaje: { success: boolean, texto: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private plagaService: PlagaService,
    private route: ActivatedRoute,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private router: Router,
    private userdata:UsuarioService,
    private cookieService: CookieService, 
    private historialService: HistorialPlagaService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadUser();
    // Obtener el ID de la plaga de la URL
    const idPlaga = this.route.snapshot.paramMap.get('id');
    
    if (idPlaga) {
      const idNumero = Number(idPlaga); // Convertir a número
      
      // Verificar si la conversión fue exitosa
      if (!isNaN(idNumero)) {
        // Hacer una solicitud para obtener los detalles de la plaga
        this.plagaService.getPlaga(idNumero).subscribe(
          (data: Plaga) => {
            console.log('Valor del campo Nombre:', data.Nombre);
            // Al recibir los datos, asignarlos al formulario
            this.plaga = data;
            this.plag = data.Nombre;
            this.crearFormulario(); // Llamar al método para crear el formulario
            this.forma.patchValue(data); // Rellenar el formulario con los datos de la plaga
            this.base64Imagen = data.Imagen; // Mostrar la imagen
          },
          (error) => {
            console.error('Error al obtener la plaga:', error);
          }
        );
      } else {
        console.error('El ID de la plaga no es un número válido:', idPlaga);
      }
    }
}
obtenerIdUsuarioDesdeCookie(): number {
  const userId = this.cookieService.get('userId');
  return userId ? +userId : -1; // Devuelve -1 si no se encuentra el ID de usuario en la cookie
}

loadUser(): void {

this.userdata.getUsuario(this.ID_Usuario).subscribe(
  (datas: Usuario ) => {
    this.usuario = datas;
    this.name = datas.Nombre;
  },
  (error) => {
    console.error('Error al cargar los Terrenos:', error);
  }
);
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
        console.log('Base64 de la imagen comprimida:', this.base64Imagen); // Agrega este mensaje de consola
      };
      reader.readAsDataURL(result); // Convertimos el archivo comprimido a base64
    },
    error => {
      console.error('Error al comprimir la imagen:', error);
    }
  );
}

  eliminarImagen() {
    this.base64Imagen = '';
  }

  crearFormulario() {
    this.forma = this.fb.group({
      Nombre: ['', Validators.required],
      Causa: ['', Validators.required],
      Efecto: ['', Validators.required],
      Ciclo_de_Vida: ['', Validators.required],
      Identificacion: ['', Validators.required],
      Metodos_de_Control: ['', Validators.required],
      Medidas_Preventivas: ['', Validators.required],
      Imagen: [''] // Nuevo campo en el formulario para la imagen
    });
  }
  registrarAccion() {
    const fecha = new Date(); // Esto creará una instancia de Date con la fecha y hora actuales.
  
    const hora = fecha.toLocaleTimeString();
   
  
    const registro = {
      Usuario: this.name,
      Accion: "Edicion",
      Plaga_Modificada: this.plag,
      Cambios_Realizados: "Se edito una plaga",
      Fecha: fecha,
      Hora: hora
    };
  
    this.historialService.createHistorialPlaga(registro).subscribe(
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
      const imagenActualizada = this.base64Imagen ? this.base64Imagen : this.plaga?.Imagen;
      console.log('Base64 de la imagen actualizada:', imagenActualizada);

    // Combinar los datos del formulario con la imagen actualizada
    const datosActualizados = { ...this.forma.value, ID_Plaga: this.plaga?.ID_Plaga, Imagen: imagenActualizada };
    console.log('Datos actualizados:', datosActualizados); 
      // Enviar los datos actualizados al servicio
      this.plagaService.actualizarPlaga(this.plaga?.ID_Plaga ?? 0, datosActualizados).subscribe(
        (response) => {
          this.mostrarMensaje('Plaga guardada exitosamente', true);
          this.router.navigate(['/editor-nav/todos-las-plagas']);
        },
        error => {
          this.mostrarMensaje('Error al guardar la plaga', false);
          console.error('Error al guardar la plaga:', error);
        }
      );
    } else {
      this.mostrarMensaje('Debe llenar todos los Campos de la Plaga', false);
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
