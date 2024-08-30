import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsuarioService } from 'src/app/services/usuarios.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  forma!: FormGroup;
  mensaje: { success: boolean, texto: string } | null = null;
  base64Imagen: string | null = null;
  mostrarPassword: boolean = false;
  contraseña: string = "";
  usuario: Usuario | null = null;
  

  constructor(private fb: FormBuilder, private userService: UsuarioService,    private route: ActivatedRoute,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private router: Router) {
  }
  ngOnInit(): void {

    this.crearFormulario();
    // Obtener el ID de la plaga de la URL
    const idUser = this.route.snapshot.paramMap.get('id');
    
    if (idUser) {
      const idNumero = Number(idUser); // Convertir a número
      
      // Verificar si la conversión fue exitosa
      if (!isNaN(idNumero)) {
        // Hacer una solicitud para obtener los detalles de la plaga
        this.userService.getUsuario(idNumero).subscribe(
          (data: Usuario) => {
            console.log('Valor del campo Nombre:', data.Nombre);
            // Al recibir los datos, asignarlos al formulario
            this.usuario = data;
            this.crearFormulario(); // Llamar al método para crear el formulario
            this.forma.patchValue(data); // Rellenar el formulario con los datos de la plaga
            this.base64Imagen = data.Fotoperfil; // Mostrar la imagen
          },
          (error) => {
            console.error('Error al obtener la plaga:', error);
          }
        );
      } else {
        console.error('El ID de la plaga no es un número válido:', idUser);
      }
    }
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
    mostrarContra() {
        this.mostrarPassword = !this.mostrarPassword;
      }
      get correoNoValido() {
        return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
      }
      get contraNoValido() {
        return this.forma.get('contraseña')?.invalid && this.forma.get('contraseña')?.touched
      }

    crearFormulario() {
      this.forma = this.fb.group({
        Nombre: ['', Validators.required],
        Apellido_Paterno: ['', Validators.required],
        Apellido_Materno: ['', Validators.required],
        Localidad: ['', Validators.required],
        Email: ['', Validators.required],
        Contraseña: ['', Validators.required],
        Fotoperfil: [''] // Nuevo campo en el formulario para la imagen
      });
    }
  guardar() {

    if (this.forma.valid) {
      const imagenActualizada = this.base64Imagen ? this.base64Imagen : this.usuario?.Fotoperfil;
      console.log('Base64 de la imagen actualizada:', imagenActualizada);

    // Combinar los datos del formulario con la imagen actualizada
    const datosActualizados = { ...this.forma.value, ID_Usuario: this.usuario?.ID_Usuario, Fotoperfil: imagenActualizada };
    console.log('Datos actualizados:', datosActualizados); 
      // Enviar los datos actualizados al servicio
      this.userService.actualizarUsuario(this.usuario?.ID_Usuario ?? 0, datosActualizados).subscribe(
        (response) => {
          this.mostrarMensaje('Plaga guardada exitosamente', true);
          
        },
        error => {
          this.mostrarMensaje('Error al guardar la plaga', false);
          console.error('Error al guardar la plaga:', error);
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

}
