import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlagaService } from 'src/app/services/plagas.service';
import {  Usuario } from 'src/app/interfaces/interfaces';
import { CookieService } from 'ngx-cookie-service';
import {UsuarioService} from 'src/app/services/usuarios.service';
import { HistorialPlagaService } from 'src/app/services/historial_plaga.service';

import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-add_pests',
  templateUrl: './add_pests.component.html',
  styleUrls: ['./add_pests.component.css']
})
export class AddPestsComponent {
  forma!: FormGroup;
  base64Imagen: string = '';
  mensaje: { texto: string, success: boolean } | null = null;
  name: string = '';
  plaga: string = '';
  ID_Usuario: number = -1;
  usuario: Usuario| null = null; 
  constructor(
    private fb: FormBuilder,
    private plagaService: PlagaService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private userdata:UsuarioService,
    private cookieService: CookieService, 
    private historialService: HistorialPlagaService // Agregamos Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    
    this.crearFormulario();
    this.ID_Usuario = this.obtenerIdUsuarioDesdeCookie();
    this.loadUser();
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
      Metodos_de_Control: ['', Validators.required],
      Ciclo_de_Vida: ['', Validators.required],
      Identificacion: ['', Validators.required],
      Medidas_Preventivas: ['', Validators.required],
      Imagen: [''] // Nuevo campo en el formulario para la imagen
    });
  }

  registrarAccion() {
    const fecha = new Date(); // Esto creará una instancia de Date con la fecha y hora actuales.
  
    const hora = fecha.toLocaleTimeString();
   
  
    const registro = {
      Usuario: this.name,
      Accion: "Creacion",
      Plaga_Modificada: this.plaga,
      Cambios_Realizados: "Se creo una nueva plaga",
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
    this.plaga= this.forma.value.Nombre;
   
    if (this.forma.valid) {
      const nuevaPlaga = {
        
        Nombre: this.forma.value.Nombre,
        Causa: this.forma.value.Causa,
        Efecto: this.forma.value.Efecto,
        Medidas_Preventivas: this.forma.value.Medidas_Preventivas,
        Metodos_de_Control: this.forma.value.Metodos_de_Control,
        Ciclo_de_Vida: this.forma.value.Ciclo_de_Vida,
        Identificacion: this.forma.value.Identificacion,
        Imagen: this.base64Imagen // Utilizamos directamente la cadena base64
      };

      this.plagaService.guardarPlaga(nuevaPlaga).subscribe(
        () => {
          this.mostrarMensaje('Plaga guardada exitosamente', true);
       
        },
        error => {
          this.mostrarMensaje('Error al guardar la plaga', false);
          console.error('Error al guardar la plaga:', error);
        }
      );
    } else {
      this.mostrarMensaje('El formulario no es válido', false);
      console.error('Por favor rellene todo los Campos');
    }
  }

  mostrarMensaje(texto: string, success: boolean) {
    this.mensaje = { texto, success };
  }

  limpiarMensaje() {
    this.mensaje = null;
  }
}
